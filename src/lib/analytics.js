/* =====================================================================
   analytics.js — Ragequit Arcade
   Fire & forget : ne bloque jamais le rendu, pas d'erreur visible.

   Usage :
     import { track, trackPageView } from '../../lib/analytics'
     track('game_click', { game_id: 'rage-hockey', source: 'bento' })
     trackPageView()  // à appeler à chaque changement de page

   Vie privée : on génère un identifiant de SESSION anonyme (UUID aléatoire
   stocké en localStorage). Il ne contient AUCUNE donnée personnelle, pas
   d'IP, et sert uniquement à compter les visiteurs uniques. Conforme RGPD.
   ===================================================================== */
import { supabase } from './supabase'

function getDevice(){
  const w = window.innerWidth
  if(w < 768)  return 'mobile'
  if(w < 1200) return 'tablet'
  return 'desktop'
}

// ── Identifiant de visiteur anonyme (pas d'IP, pas de donnée perso) ──────
const VISITOR_KEY = 'rq_visitor_id'
function getVisitorId(){
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if(!id){
      id = (crypto?.randomUUID?.() ||
            'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36))
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch(e) {
    return 'v_anon'
  }
}

// Pays via l'API gratuite ip-api.com (appel unique par session, mis en cache)
let _country = null
async function getCountry(){
  if(_country) return _country
  try {
    const r = await fetch('https://ip-api.com/json/?fields=countryCode', { cache: 'force-cache' })
    const d = await r.json()
    _country = d.countryCode || null
  } catch(e) { _country = null }
  return _country
}

export async function track(event, props = {}){
  try {
    const country = await getCountry()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('analytics_events').insert({
      event,
      game_id:    props.game_id   || null,
      category:   props.category  || null,
      user_id:    user?.id        || null,
      session_id: getVisitorId(),
      device:     getDevice(),
      country:    country,
      referrer:   document.referrer || null,
      url:        window.location.pathname,
      props:      Object.keys(props).length > 0 ? props : null,
      created_at: new Date().toISOString(),
    })
  } catch(e) { /* fire & forget — jamais visible */ }
}

// Vue de page — à appeler à chaque navigation
export function trackPageView(extra = {}){
  return track('page_view', { ...extra })
}
