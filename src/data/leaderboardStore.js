/* =====================================================================
   leaderboardStore.js — scores hybrides Supabase (connecté) + localStorage (anonyme)

   Utilise la vue Supabase "scores_with_names" pour le leaderboard public.
   Import supabase depuis '../lib/supabase' (même instance que AuthContext).

   NOUVEAU : prise en charge de `difficulty` et `arena` (Rage Hockey survival).
   - Si ces champs sont fournis, la déduplication du meilleur score se fait
     par combinaison game + mode + difficulty + arena (donc un joueur peut
     figurer dans plusieurs classements croisés).
   - Si absents (ex : STAQ), comportement inchangé : 1 meilleur score par
     game + mode.
   ===================================================================== */

import { supabase } from '../lib/supabase'

/* ---- localStorage helpers ---- */
// La clé localStorage inclut difficulty/arena quand ils existent, pour que
// les classements anonymes soient aussi séparés par combinaison.
const LS_KEY = (game, mode, difficulty, arena) => {
  const suffix = (difficulty || arena) ? `_${difficulty || 'x'}_${arena || 'x'}` : ''
  return `rq_lb_${game}_${mode}${suffix}`
}
const LS_NAME_KEY = 'rq_player_name'

export function getPlayerName()     { return localStorage.getItem(LS_NAME_KEY) || '' }
export function setPlayerName(name) { localStorage.setItem(LS_NAME_KEY, name.trim()) }

export function formatTime(ms) {
  if (!ms && ms !== 0) return '—'
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Applique les filtres difficulty/arena à une requête Supabase, seulement
// si les valeurs sont fournies (sinon on n'ajoute pas le filtre).
function applyVariantFilters(q, difficulty, arena) {
  if (difficulty) q = q.eq('difficulty', difficulty)
  if (arena)      q = q.eq('arena', arena)
  return q
}

/* =====================================================================
   submitScore — Supabase si connecté, localStorage sinon.
   N'insère/update que si c'est un nouveau meilleur score du joueur POUR
   cette combinaison (game + mode + difficulty + arena).
   payload : { game, mode, score (number), scoreLabel, difficulty?, arena? }
   ===================================================================== */
export async function submitScore({ game, mode, score, scoreLabel, difficulty = null, arena = null }) {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // Cherche le meilleur score existant de ce joueur pour cette combinaison exacte
    let q = supabase
      .from('scores')
      .select('id, score')
      .eq('user_id', user.id)
      .eq('game_id', game)
      .eq('mode', mode)
    q = applyVariantFilters(q, difficulty, arena)
    const { data: existing } = await q
      .order('score', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!existing) {
      // Première partie pour cette combinaison : insert
      await supabase.from('scores').insert({
        user_id: user.id, game_id: game, mode, score, score_label: scoreLabel,
        difficulty, arena,
      })
    } else if (score > existing.score) {
      // Nouveau meilleur score : update
      await supabase.from('scores')
        .update({ score, score_label: scoreLabel, created_at: new Date().toISOString() })
        .eq('id', existing.id)
    }
  } else {
    // Anonyme : localStorage (clé séparée par combinaison)
    const key  = LS_KEY(game, mode, difficulty, arena)
    const name = getPlayerName() || 'Anonymous'
    const list = JSON.parse(localStorage.getItem(key) || '[]')
    const idx  = list.findIndex(e => e.name === name)
    if (idx >= 0) {
      if (score > list[idx].score) list[idx] = { name, score, scoreLabel, ts: Date.now() }
    } else {
      list.push({ name, score, scoreLabel, ts: Date.now() })
    }
    list.sort((a, b) => b.score - a.score)
    localStorage.setItem(key, JSON.stringify(list.slice(0, 100)))
  }
}

/* =====================================================================
   getLeaderboard — top N pour une combinaison jeu/mode(/difficulté/arène)
   ===================================================================== */
export async function getLeaderboard(game, mode, limit = 20, difficulty = null, arena = null) {
  try {
    let q = supabase
      .from('scores_with_names')
      .select('score, score_label, username, difficulty, arena')
      .eq('game_id', game)
      .eq('mode', mode)
    q = applyVariantFilters(q, difficulty, arena)
    const { data, error } = await q
      .order('score', { ascending: false })
      .limit(limit)

    if (!error && data && data.length > 0) {
      // Sécurité : ne garder que le meilleur score par joueur (évite tout doublon
      // d'affichage même si la table contient d'anciennes lignes en double).
      // data est déjà trié par score décroissant, donc la première occurrence
      // d'un nom est son meilleur score.
      const seen = new Set()
      const deduped = []
      for (const row of data) {
        const key = row.username || 'Anonymous'
        if (seen.has(key)) continue
        seen.add(key)
        deduped.push(row)
      }
      return deduped.map((row, i) => ({
        rank:       i + 1,
        name:       row.username || 'Anonymous',
        score:      row.score,
        scoreLabel: row.score_label || String(row.score),
      }))
    }
  } catch (e) { /* Supabase indisponible, fallback */ }

  // Fallback localStorage
  const key  = LS_KEY(game, mode, difficulty, arena)
  const list = JSON.parse(localStorage.getItem(key) || '[]')
  return list.slice(0, limit).map((e, i) => ({
    rank:       i + 1,
    name:       e.name || 'Anonymous',
    score:      e.score,
    scoreLabel: e.scoreLabel || String(e.score),
  }))
}

/* =====================================================================
   getPlayerBest — meilleur score + rang du joueur courant pour la combinaison
   ===================================================================== */
export async function getPlayerBest(game, mode, difficulty = null, arena = null) {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    try {
      let bq = supabase
        .from('scores')
        .select('score, score_label')
        .eq('user_id', user.id)
        .eq('game_id', game)
        .eq('mode', mode)
      bq = applyVariantFilters(bq, difficulty, arena)
      const { data: best } = await bq
        .order('score', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!best) return null

      // Rang = nombre de joueurs avec un meilleur score + 1 (même combinaison)
      let cq = supabase
        .from('scores')
        .select('id', { count: 'exact', head: true })
        .eq('game_id', game)
        .eq('mode', mode)
        .gt('score', best.score)
      cq = applyVariantFilters(cq, difficulty, arena)
      const { count } = await cq

      return {
        score:      best.score,
        scoreLabel: best.score_label || String(best.score),
        rank:       (count ?? 0) + 1,
      }
    } catch (e) { return null }
  }

  // Anonyme : localStorage
  const name = getPlayerName()
  if (!name) return null
  const key  = LS_KEY(game, mode, difficulty, arena)
  const list = JSON.parse(localStorage.getItem(key) || '[]')
  const idx  = list.findIndex(e => e.name === name)
  if (idx < 0) return null
  return {
    score:      list[idx].score,
    scoreLabel: list[idx].scoreLabel,
    rank:       idx + 1,
  }
}
