/* =====================================================================
   usePageTitle — titre de l'onglet, meta description et données
   structurées (JSON-LD) de la page affichée.
   Pour toute URL publique, tout vient de src/seo/pageHead.js, comme le
   HTML prérendu : même titre, même description, dans la langue de l'URL
   (point d'audit A-005). Les arguments ne servent qu'aux pages sans URL
   publique (404, admin) :
     usePageTitle('Admin')                         → "Admin | Ragequit Arcade"
     usePageTitle('Page not found', 'Texte...')    → titre + description
   ===================================================================== */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSiteSeo } from '../data/localized'
import { pageHead, structuredDataJson } from '../seo/pageHead'

const BRAND = 'Ragequit Arcade'

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!content) { if (tag && name === 'robots') tag.remove(); return }
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setJsonLd(json) {
  let tag = document.getElementById('rq-jsonld')
  if (!json) { if (tag) tag.remove(); return }
  if (!tag) {
    tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.id = 'rq-jsonld'
    document.head.appendChild(tag)
  }
  tag.textContent = json
}

export default function usePageTitle(fallbackTitle, fallbackDescription, { noindex = false } = {}) {
  const { pathname } = useLocation()
  // Abonnement au chargement des traductions : le titre se met à jour
  // dès que la langue de la page est disponible.
  const siteSeo = useSiteSeo()

  useEffect(() => {
    const h = pageHead(pathname)
    // URL inconnue sans titre fourni : la page 404 affichée s'en charge.
    if (!h.matched && !fallbackTitle) return
    let title = h.title
    let description = h.description
    if (!h.matched) {
      if (fallbackTitle) title = fallbackTitle.includes('| ' + BRAND) ? fallbackTitle : `${fallbackTitle} | ${BRAND}`
      if (fallbackDescription) description = fallbackDescription
    }
    document.title = title
    setMeta('description', description)
    setMeta('robots', noindex || !h.matched ? 'noindex, follow' : null)
    setJsonLd(h.matched ? structuredDataJson(pathname) : null)
  }, [pathname, siteSeo, fallbackTitle, fallbackDescription, noindex])
}
