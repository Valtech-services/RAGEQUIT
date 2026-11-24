/* =====================================================================
   lazyPages.jsx — pages chargées à la demande dans le navigateur (A-019)
   LegalPage embarque les textes légaux en 12 langues, ArticlePage le texte
   complet des articles : ils ne pèsent plus sur les autres pages.
   Au prérendu, vite.config.js remplace ce fichier par lazyPages.ssr.jsx
   (imports directs) pour que le HTML soit complet sans attente.
   ===================================================================== */
import { lazy } from 'react'

const loadLegal = () => import('./LegalPage/LegalPage')
const loadArticle = () => import('./BlogPage/ArticlePage')

export const LegalPage = lazy(loadLegal)
export const ArticlePage = lazy(loadArticle)

/* Charge à l'avance la page de l'URL d'arrivée (avant le premier rendu,
   pour ne pas afficher un écran vide). */
export function preloadPage(pathname) {
  const p = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')
  if (/^\/legal\//.test(p)) return loadLegal()
  if (/^\/blog\/[^/]+/.test(p)) return loadArticle()
  return Promise.resolve()
}
