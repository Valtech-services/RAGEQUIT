/* =====================================================================
   analytics.js — Ragequit Arcade
   Fire & forget : ne bloque jamais le rendu, pas d'erreur visible.
   Usage : import { track } from '../../lib/analytics'
           track('game_click', { game_id: 'rage-hockey', source: 'bento' })
   ===================================================================== */
import { supabase } from './supabase'

function getDevice(){
  const w = window.innerWidth
  if(w < 768)  return 'mobile'
  if(w < 1200) return 'tablet'
  return 'desktop'
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
      game_id:   props.game_id   || null,
      category:  props.category  || null,
      user_id:   user?.id        || null,
      device:    getDevice(),
      country:   country,
      referrer:  document.referrer || null,
      url:       window.location.pathname,
      props:     Object.keys(props).length > 0 ? props : null,
      created_at: new Date().toISOString(),
    })
  } catch(e) { /* fire & forget — jamais visible */ }
}
