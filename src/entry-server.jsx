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
import { getGames, getCategories, getPosts, getSiteSeo, missingTranslations } from './data/localized'
import './data/i18n/all.js'
import { getLegalContent } from './data/legalContent'
import { CONTENT_LANGS, ALL_CONTENT_LANGS, LOCALES, RTL_LANGS, langFromPath, stripLang, withLang } from './i18n/locale'

export const SITE_URL = 'https://ragequit-arcade.com'
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

const UI = {
  en: { blog: 'Blog', blogDesc: 'Guides, tips and stories from Ragequit Arcade. Learn how to master our free browser games and get the highest scores.', lb: 'Leaderboards', lbDesc: 'Global leaderboards for every free game on Ragequit Arcade. See the best scores, find your rank and challenge the top players.' },
  fr: { blog: 'Blog', blogDesc: 'Guides, astuces et coulisses de Ragequit Arcade. Apprenez à maîtriser nos jeux gratuits en ligne et à battre les meilleurs scores.', lb: 'Classements', lbDesc: 'Les classements mondiaux de tous les jeux gratuits de Ragequit Arcade. Découvrez les meilleurs scores, votre rang et défiez les meilleurs joueurs.' },
  es: { blog: 'Blog', blogDesc: 'Guías, consejos e historias de Ragequit Arcade. Aprende a dominar nuestros juegos gratis en el navegador y a conseguir las mejores puntuaciones.', lb: 'Clasificaciones', lbDesc: 'Las clasificaciones mundiales de todos los juegos gratis de Ragequit Arcade. Mira las mejores puntuaciones, encuentra tu puesto y reta a los mejores.' },
  de: { blog: 'Blog', blogDesc: 'Guides, Tipps und Geschichten von Ragequit Arcade. Lerne, unsere kostenlosen Browserspiele zu meistern und die besten Punktzahlen zu holen.', lb: 'Ranglisten', lbDesc: 'Die weltweiten Ranglisten aller kostenlosen Spiele auf Ragequit Arcade. Sieh dir die besten Punktzahlen an, finde deinen Rang und fordere die Besten heraus.' },
  it: { blog: 'Blog', blogDesc: 'Guide, consigli e storie di Ragequit Arcade. Impara a padroneggiare i nostri giochi da browser gratis e a ottenere i punteggi più alti.', lb: 'Classifiche', lbDesc: 'Le classifiche mondiali di tutti i giochi gratis di Ragequit Arcade. Scopri i punteggi migliori, trova la tua posizione e sfida i migliori giocatori.' },
  nl: { blog: 'Blog', blogDesc: 'Gidsen, tips en verhalen van Ragequit Arcade. Leer onze gratis browsergames beheersen en haal de hoogste scores.', lb: 'Klassementen', lbDesc: 'De wereldwijde klassementen van alle gratis games op Ragequit Arcade. Bekijk de beste scores, vind je positie en daag de toppers uit.' },
  pl: { blog: 'Blog', blogDesc: 'Poradniki, wskazówki i historie od Ragequit Arcade. Naucz się opanować nasze darmowe gry przeglądarkowe i zdobywaj najwyższe wyniki.', lb: 'Rankingi', lbDesc: 'Światowe rankingi wszystkich darmowych gier w Ragequit Arcade. Zobacz najlepsze wyniki, sprawdź swoją pozycję i rzuć wyzwanie najlepszym.' },
  pt: { blog: 'Blog', blogDesc: 'Guias, dicas e histórias da Ragequit Arcade. Aprenda a dominar os nossos jogos gratuitos no navegador e a conseguir as melhores pontuações.', lb: 'Classificações', lbDesc: 'As classificações mundiais de todos os jogos gratuitos da Ragequit Arcade. Veja as melhores pontuações, descubra a sua posição e desafie os melhores.' },
}

/* Titre, description, image, langue et versions linguistiques de chaque URL. */
export function head(url) {
  const lang = langFromPath(url)
  const path = stripLang(url)
  const site = getSiteSeo(lang)
  const ui = UI[lang] || UI.en
  const def = { title: site.title, description: site.description, image: '/ragequit-logo-white.png' }
  const [, section, id] = path.split('/')
  let h = def
  if (section === 'game') {
    const g = getGames(lang).find(x => x.id === id)
    if (g) h = { title: g.seo?.title || g.title + ' | Ragequit Arcade', description: g.seo?.metaDescription || def.description, image: g.thumbnail }
  } else if (section === 'category') {
    const c = getCategories(lang).find(x => x.id === id)
    if (c) h = { title: c.seo?.title || c.label + ' | Ragequit Arcade', description: c.seo?.metaDescription || def.description, image: c.image || def.image }
  } else if (section === 'blog' && id) {
    const p = getPosts(lang).find(x => x.slug === id)
    if (p) h = { title: p.seo?.title || p.title + ' | Ragequit Arcade', description: p.seo?.metaDescription || p.excerpt, image: p.image || def.image }
  } else if (section === 'blog') {
    h = { title: ui.blog + ' | Ragequit Arcade', description: ui.blogDesc, image: def.image }
  } else if (section === 'leaderboard') {
    h = { title: ui.lb + ' | Ragequit Arcade', description: ui.lbDesc, image: def.image }
  } else if (section === 'legal') {
    const l = getLegalContent(lang)[id]
    if (l) h = { title: l.title + ' | Ragequit Arcade', description: (l.sections?.[0]?.paragraphs?.[0] || def.description).slice(0, 155), image: def.image }
  }
  const alternates = ALL_CONTENT_LANGS.map(l => ({ lang: l, href: SITE_URL + withLang(path, l) }))
  return { ...h, lang, locale: (LOCALES[lang] || 'en-US').replace('-', '_'), dir: RTL_LANGS.includes(lang) ? 'rtl' : 'ltr', alternates, xDefault: SITE_URL + path }
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
