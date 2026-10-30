/* =====================================================================
   entry-server.jsx — rendu des pages en HTML au moment du build
   Utilisé uniquement par scripts/prerender.mjs (jamais chargé par les
   visiteurs). Pour chaque URL, il renvoie le HTML de la page et ses
   balises <title> / description, pour que Google et AdSense voient tout
   le contenu sans exécuter le JavaScript.
   ===================================================================== */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import './i18n/i18n'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import { games, categories, siteSeo } from './data/games'
import { posts } from './data/blog'
import { legalContent } from './data/legalContent'

export const SITE_URL = 'https://ragequit-arcade.com'

/* Toutes les URL publiques à prérendre (l'admin est exclue). */
export function routes() {
  const list = ['/', '/blog', '/leaderboard']
  categories.filter(c => c.id !== 'all').forEach(c => list.push('/category/' + c.id))
  games.forEach(g => list.push('/game/' + g.id))
  posts.forEach(p => list.push('/blog/' + p.slug))
  Object.keys(legalContent).forEach(k => list.push('/legal/' + k))
  return list
}

/* Titre, description et image de partage de chaque URL. */
export function head(url) {
  const def = { title: siteSeo.title, description: siteSeo.description, image: '/ragequit-logo-white.png' }
  const [, section, id] = url.split('/')
  if (url === '/') return def
  if (section === 'game') {
    const g = games.find(x => x.id === id)
    if (g) return { title: g.seo?.title || g.title + ' | Ragequit Arcade', description: g.seo?.metaDescription || def.description, image: g.thumbnail }
  }
  if (section === 'category') {
    const c = categories.find(x => x.id === id)
    if (c) return { title: c.seo?.title || c.label + ' | Ragequit Arcade', description: c.seo?.metaDescription || def.description, image: c.image || def.image }
  }
  if (section === 'blog' && id) {
    const p = posts.find(x => x.slug === id)
    if (p) return { title: p.seo?.title || p.title + ' | Ragequit Arcade', description: p.seo?.metaDescription || p.excerpt, image: p.image || def.image }
  }
  if (section === 'blog') return { title: 'Blog | Ragequit Arcade', description: 'Guides, tips and stories from Ragequit Arcade. Learn how to master our free browser games and get the highest scores.', image: def.image }
  if (section === 'leaderboard') return { title: 'Leaderboards | Ragequit Arcade', description: 'Global leaderboards for every free game on Ragequit Arcade. See the best scores, find your rank and challenge the top players.', image: def.image }
  if (section === 'legal') {
    const l = legalContent[id]
    if (l) return { title: l.title + ' | Ragequit Arcade', description: (l.sections?.[0]?.paragraphs?.[0] || def.description).slice(0, 155), image: def.image }
  }
  return def
}

export function render(url) {
  return renderToString(
    <AuthProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </AuthProvider>
  )
}
