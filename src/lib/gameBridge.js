// ─────────────────────────────────────────────────────────────────────────
//  Pont générique jeu <-> site (connexion et sauvegarde en ligne).
//  Utilisé par la page de jeu (desktop et mobile) et par l'onglet admin
//  « Test des jeux ». Messages (postMessage, voir CLAUDE.md) :
//    jeu  -> site : RH_AUTH_REQUEST { game }
//                   RH_LOGIN_REQUEST { game }
//                   RH_SAVE_LOAD { game }
//                   RH_SAVE { game, state, progress }
//    site -> jeu  : RH_AUTH { signedIn, username }
//                   RH_SAVE_STATE { game, state, progress, updatedAt }
//                   RH_SAVE_ACK { game, ok, reason }
//  La sauvegarde va dans la table `game_saves` (une ligne par joueur et par
//  jeu). `progress` est un entier qui ne fait que croître : on n'écrase jamais
//  une sauvegarde en ligne plus avancée que celle que le jeu envoie.
// ─────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'
import { supabase } from './supabase'

const GAME_ID_RE = /^[a-z0-9-]{2,40}$/
const MAX_STATE_CHARS = 200000

export function useGameBridge(iframeRef, { user, profile, signInGoogle }, active = true) {
  const ctx = useRef({ user, profile, signInGoogle })
  useEffect(() => { ctx.current = { user, profile, signInGoogle } }, [user, profile, signInGoogle])

  useEffect(() => {
    if (!active) return undefined
    const reply = (msg) => { try { iframeRef.current?.contentWindow?.postMessage(msg, '*') } catch { /* iframe fermée */ } }
    const authMsg = () => ({ type: 'RH_AUTH', signedIn: !!ctx.current.user, username: ctx.current.profile?.username || null })

    async function onMessage(e) {
      const frame = iframeRef.current?.contentWindow
      if (!frame || e.source !== frame) return            // seulement le jeu affiché
      const d = e.data
      if (!d || typeof d.type !== 'string' || !d.type.startsWith('RH_')) return
      const game = typeof d.game === 'string' && GAME_ID_RE.test(d.game) ? d.game : null
      const u = ctx.current.user

      if (d.type === 'RH_AUTH_REQUEST') { reply(authMsg()); return }
      if (d.type === 'RH_LOGIN_REQUEST') { ctx.current.signInGoogle?.(window.location.href); return }
      if (!game) return

      if (d.type === 'RH_SAVE_LOAD') {
        if (!u) { reply({ type: 'RH_SAVE_STATE', game, state: null, progress: 0, updatedAt: null }); return }
        try {
          const { data } = await supabase.from('game_saves').select('state, total_ore, updated_at')
            .eq('user_id', u.id).eq('game_id', game).maybeSingle()
          reply({ type: 'RH_SAVE_STATE', game, state: data?.state || null, progress: Number(data?.total_ore) || 0, updatedAt: data?.updated_at || null })
        } catch { reply({ type: 'RH_SAVE_STATE', game, state: null, progress: 0, updatedAt: null }) }
        return
      }

      if (d.type === 'RH_SAVE') {
        if (!u) { reply({ type: 'RH_SAVE_ACK', game, ok: false, reason: 'signed_out' }); return }
        const progress = Math.max(0, Math.floor(Number(d.progress) || 0))
        let json = ''
        try { json = JSON.stringify(d.state) } catch { /* état non sérialisable */ }
        if (!json || json.length > MAX_STATE_CHARS) { reply({ type: 'RH_SAVE_ACK', game, ok: false, reason: 'invalid' }); return }
        try {
          const { data: existing } = await supabase.from('game_saves').select('state, total_ore, updated_at')
            .eq('user_id', u.id).eq('game_id', game).maybeSingle()
          if (existing && Number(existing.total_ore) > progress) {
            // la sauvegarde en ligne est plus avancée : on la renvoie au jeu au lieu de l'écraser
            reply({ type: 'RH_SAVE_ACK', game, ok: false, reason: 'cloud_newer' })
            reply({ type: 'RH_SAVE_STATE', game, state: existing.state, progress: Number(existing.total_ore) || 0, updatedAt: existing.updated_at })
            return
          }
          const { error } = await supabase.from('game_saves').upsert({
            user_id: u.id, game_id: game, state: d.state, total_ore: progress, updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id,game_id' })
          reply({ type: 'RH_SAVE_ACK', game, ok: !error, reason: error ? 'error' : null })
        } catch { reply({ type: 'RH_SAVE_ACK', game, ok: false, reason: 'error' }) }
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [iframeRef, active])

  // Prévient le jeu de tout changement de connexion (connexion, déconnexion).
  useEffect(() => {
    if (!active) return
    try {
      iframeRef.current?.contentWindow?.postMessage({ type: 'RH_AUTH', signedIn: !!user, username: profile?.username || null }, '*')
    } catch { /* iframe pas encore prête */ }
  }, [iframeRef, active, user, profile])
}
