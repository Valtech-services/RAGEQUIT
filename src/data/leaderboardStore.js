/* =====================================================================
   leaderboardStore.js — scores hybrides Supabase (connecté) + localStorage (anonyme)

   Utilise la vue Supabase "scores_with_names" pour le leaderboard public.
   Import supabase depuis '../lib/supabase' (même instance que AuthContext).
   ===================================================================== */

import { supabase } from '../lib/supabase'

/* ---- localStorage helpers ---- */
const LS_KEY      = (game, mode) => `rq_lb_${game}_${mode}`
const LS_NAME_KEY = 'rq_player_name'

export function getPlayerName()        { return localStorage.getItem(LS_NAME_KEY) || '' }
export function setPlayerName(name)    { localStorage.setItem(LS_NAME_KEY, name.trim()) }

export function formatTime(ms) {
  if (!ms && ms !== 0) return '—'
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/* =====================================================================
   submitScore — Supabase si connecté, localStorage sinon.
   N'insère que si c'est un nouveau meilleur score du joueur.
   payload : { game, mode, score (number), scoreLabel }
   ===================================================================== */
export async function submitScore({ game, mode, score, scoreLabel }) {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // Cherche le meilleur score existant de ce joueur pour ce jeu/mode
    const { data: existing } = await supabase
      .from('scores')
      .select('id, score')
      .eq('user_id', user.id)
      .eq('game_id', game)
      .eq('mode', mode)
      .order('score', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!existing) {
      // Première partie : insert
      await supabase.from('scores').insert({
        user_id: user.id, game_id: game, mode, score, score_label: scoreLabel,
      })
    } else if (score > existing.score) {
      // Nouveau meilleur score : update
      await supabase.from('scores')
        .update({ score, score_label: scoreLabel, created_at: new Date().toISOString() })
        .eq('id', existing.id)
    }
  } else {
    // Anonyme : localStorage
    const key  = LS_KEY(game, mode)
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
   getLeaderboard — top N pour un jeu/mode depuis Supabase (ou localStorage)
   ===================================================================== */
export async function getLeaderboard(game, mode, limit = 20) {
  try {
    const { data, error } = await supabase
      .from('scores_with_names')
      .select('score, score_label, username')
      .eq('game_id', game)
      .eq('mode', mode)
      .order('score', { ascending: false })
      .limit(limit)

    if (!error && data && data.length > 0) {
      return data.map((row, i) => ({
        rank:       i + 1,
        name:       row.username || 'Anonymous',
        score:      row.score,
        scoreLabel: row.score_label || String(row.score),
      }))
    }
  } catch (e) { /* Supabase indisponible, fallback */ }

  // Fallback localStorage
  const key  = LS_KEY(game, mode)
  const list = JSON.parse(localStorage.getItem(key) || '[]')
  return list.slice(0, limit).map((e, i) => ({
    rank:       i + 1,
    name:       e.name || 'Anonymous',
    score:      e.score,
    scoreLabel: e.scoreLabel || String(e.score),
  }))
}

/* =====================================================================
   getPlayerBest — meilleur score + rang du joueur courant
   ===================================================================== */
export async function getPlayerBest(game, mode) {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    try {
      const { data: best } = await supabase
        .from('scores')
        .select('score, score_label')
        .eq('user_id', user.id)
        .eq('game_id', game)
        .eq('mode', mode)
        .order('score', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!best) return null

      // Rang = nombre de joueurs avec un meilleur score + 1
      const { count } = await supabase
        .from('scores')
        .select('id', { count: 'exact', head: true })
        .eq('game_id', game)
        .eq('mode', mode)
        .gt('score', best.score)

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
  const key  = LS_KEY(game, mode)
  const list = JSON.parse(localStorage.getItem(key) || '[]')
  const idx  = list.findIndex(e => e.name === name)
  if (idx < 0) return null
  return {
    score:      list[idx].score,
    scoreLabel: list[idx].scoreLabel,
    rank:       idx + 1,
  }
}
