// Jeux « hot » (flamme sur la carte), calculés automatiquement : les jeux lancés
// par le plus de visiteurs différents sur les 7 derniers jours (fonction SQL
// public.hot_games, migration 20261109120000_hot_games.sql).
// Tant que la fonction n'est pas disponible, on garde le champ `hot` de games.js.
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { games } from '../data/games'

export const HOT_COUNT = 5
const PUBLISHED = new Set(games.map((g) => g.id))
let cache = null      // Set des ids hot, ou false si indisponible
let pending = null

function loadHot() {
  if (cache !== null) return Promise.resolve(cache)
  if (!pending) {
    pending = supabase.rpc('hot_games', { days: 7, max_games: 15 })
      .then(({ data, error }) => {
        if (error || !Array.isArray(data) || data.length === 0) { cache = false; return cache }
        cache = new Set(data.map((r) => r.game_id).filter((id) => PUBLISHED.has(id)).slice(0, HOT_COUNT))
        return cache
      })
      .catch(() => { cache = false; return cache })
  }
  return pending
}

// Renvoie true / false pour un jeu. Premier rendu (et prérendu) : valeur de games.js.
export function useIsHot(game) {
  const [hotSet, setHotSet] = useState(cache || null)
  useEffect(() => {
    let alive = true
    loadHot().then((s) => { if (alive && s) setHotSet(s) })
    return () => { alive = false }
  }, [])
  return hotSet ? hotSet.has(game.id) : !!game.hot
}
