/* =====================================================================
   feedbackStore.js — votes (pouce haut/bas) et signalements de jeux
   - Vote : un par visiteur (via rq_visitor_id du localStorage) et par jeu.
     Revoter m-et-à-jour le vote existant (pas de doublon).
   - Report : réservé aux utilisateurs connectés (objet + commentaire).
   ===================================================================== */
import { supabase } from '../lib/supabase'

// Récupère (ou crée) l'identifiant visiteur anonyme, le même que l'analytics.
function getVisitorId() {
  try {
    let id = localStorage.getItem('rq_visitor_id')
    if (!id) {
      id = (crypto?.randomUUID?.() ||
            'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36))
      localStorage.setItem('rq_visitor_id', id)
    }
    return id
  } catch (e) {
    return 'v_anon'
  }
}

/* ---- VOTE : enregistre ou met à jour le vote du visiteur pour un jeu ----
   vote = 'up' ou 'down'. Un visiteur = un vote par jeu (upsert sur la
   contrainte unique game_id + visitor_id). Renvoie true si ok. */
export async function submitVote(gameId, vote) {
  if (!gameId || (vote !== 'up' && vote !== 'down')) return false
  const visitorId = getVisitorId()
  try {
    const { error } = await supabase.from('game_votes').upsert({
      game_id: gameId,
      visitor_id: visitorId,
      vote,
      created_at: new Date().toISOString(),
    }, { onConflict: 'game_id,visitor_id' })
    return !error
  } catch (e) {
    return false
  }
}

/* ---- REPORT : signalement (connexion obligatoire) ----
   Renvoie true si enregistré, false sinon. */
export async function submitReport(gameId, subject, comment, userId) {
  if (!gameId || !userId || !subject) return false
  try {
    const { error } = await supabase.from('game_reports').insert({
      game_id: gameId,
      user_id: userId,
      subject: subject.trim(),
      comment: (comment || '').trim() || null,
    })
    return !error
  } catch (e) {
    return false
  }
}
