/* =====================================================================
   usePageTitle — titre dynamique de l'onglet + meta description par page
   Usage :
     usePageTitle()                                → titre par défaut
     usePageTitle('Rage Hockey')                   → "RAGEQUIT — Rage Hockey"
     usePageTitle('Rage Hockey', 'Play Rage...')   → titre + meta description
   Le 2e argument (optionnel) définit la <meta name="description"> de la page,
   pour un meilleur référencement Google. Sans lui, la description par défaut
   du site est restaurée.
   ===================================================================== */
import { useEffect } from 'react'

const SITE    = 'RAGEQUIT'
const DEFAULT = 'RAGEQUIT — Jeux Gratuits en Ligne'
const DEFAULT_DESC = "Play the most addictive free online games on Ragequit Arcade. No download, no signup — instant browser games on mobile and desktop. A new game every week."

// Met à jour (ou crée) la balise <meta name="description">.
function setMetaDescription(desc) {
  let tag = document.querySelector('meta[name="description"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'description')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', desc || DEFAULT_DESC)
}

export default function usePageTitle(pageTitle, metaDescription) {
  useEffect(() => {
    document.title = pageTitle ? `${SITE} — ${pageTitle}` : DEFAULT
    setMetaDescription(metaDescription)
    return () => {
      document.title = DEFAULT
      setMetaDescription(null) // restaure la description par défaut
    }
  }, [pageTitle, metaDescription])
}
