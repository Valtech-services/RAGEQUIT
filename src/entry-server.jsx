/* =====================================================================
   entry-server.jsx — rendu des pages en HTML au moment du build
   Utilisé uniquement par scripts/prerender.mjs (jamais chargé par les
   visiteurs). Pour chaque URL (anglais à la racine, puis /fr, /es, /pt),
   il renvoie le HTML de la page, son <title>, sa description et les
   versions linguistiques (hreflang), pour que Google et AdSense voient
   tout le contenu sans exécuter le JavaScript.
   ===================================================================== */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import i18n from './i18n/i18n'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import { getGames, getCategories, getPosts, missingTranslations } from './data/localized'
import { pageHead, structuredDataJson, SITE_URL } from './seo/pageHead'
import './data/i18n/all.js'
import { getLegalContent } from './data/legalContent'
import { CONTENT_LANGS, ALL_CONTENT_LANGS, langFromPath, withLang } from './i18n/locale'

export { SITE_URL }
export { missingTranslations, CONTENT_LANGS }

/* Toutes les URL publiques à prérendre, dans chaque langue (l'admin est exclue). */
export function routes() {
  const base = ['/', '/blog', '/leaderboard']
  getCategories('en').filter(c => c.id !== 'all').forEach(c => base.push('/category/' + c.id))
  getGames('en').forEach(g => base.push('/game/' + g.id))
  getPosts('en').forEach(p => base.push('/blog/' + p.slug))
  Object.keys(getLegalContent('en')).forEach(k => base.push('/legal/' + k))
  return ALL_CONTENT_LANGS.flatMap(l => base.map(u => withLang(u, l)))
}

/* Titre, description, versions linguistiques et JSON-LD : src/seo/pageHead.js */
export function head(url) {
  return { ...pageHead(url), jsonLd: structuredDataJson(url) }
}

export function render(url) {
  // Langue de l'interface fixée avant le rendu (ressources déjà chargées : synchrone).
  i18n.changeLanguage(langFromPath(url))
  return renderToString(
    <AuthProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </AuthProvider>
  )
}
