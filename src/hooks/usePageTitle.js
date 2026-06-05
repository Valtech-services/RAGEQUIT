/* =====================================================================
   usePageTitle — titre dynamique de l'onglet du navigateur

   Usage :
     import usePageTitle from '../../hooks/usePageTitle'
     usePageTitle()                    → "RAGEQUIT — Jeux Gratuits en Ligne"
     usePageTitle('Rage Hockey')       → "RAGEQUIT — Rage Hockey"
     usePageTitle('Sports Games')      → "RAGEQUIT — Sports Games"
     usePageTitle('Leaderboard')       → "RAGEQUIT — Leaderboard"
   ===================================================================== */
import { useEffect } from 'react'

const SITE    = 'RAGEQUIT'
const DEFAULT = 'RAGEQUIT — Jeux Gratuits en Ligne'

export default function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${SITE} — ${pageTitle}` : DEFAULT
    return () => { document.title = DEFAULT }
  }, [pageTitle])
}
