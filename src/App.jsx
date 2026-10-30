import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home/Home'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import GamePage from './pages/GamePage/GamePage'
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage'
import LegalPage from './pages/LegalPage/LegalPage'
import CookieBanner from './components/CookieBanner/CookieBanner'
import AdminPage from './pages/AdminPage/AdminPage'
import BlogPage from './pages/BlogPage/BlogPage'
import ArticlePage from './pages/BlogPage/ArticlePage'
import { CONTENT_LANGS, RTL_LANGS, langFromPath } from './i18n/locale'

/* Remet le scroll en haut a chaque changement de page. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* Aligne la langue de l'interface sur l'URL (/fr, /es, /pt) et met à jour <html lang>. */
function LangSync() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  useEffect(() => {
    const urlLang = langFromPath(pathname)
    const current = (i18n.language || 'en').slice(0, 2)
    if (urlLang !== 'en' && current !== urlLang) i18n.changeLanguage(urlLang)
    else if (urlLang === 'en' && CONTENT_LANGS.includes(current)) i18n.changeLanguage('en')
    const shown = urlLang === 'en' ? (i18n.language || 'en').slice(0, 2) : urlLang
    document.documentElement.lang = shown
    document.documentElement.dir = RTL_LANGS.includes(shown) ? 'rtl' : 'ltr'
  }, [pathname, i18n])
  return null
}

function pageRoutes(prefix) {
  return [
    <Route key={prefix + 'home'} path={prefix + '/'} element={<Home />} />,
    <Route key={prefix + 'cat'} path={prefix + '/category/:id'} element={<CategoryPage />} />,
    <Route key={prefix + 'game'} path={prefix + '/game/:id'} element={<GamePage />} />,
    <Route key={prefix + 'lb'} path={prefix + '/leaderboard'} element={<LeaderboardPage />} />,
    <Route key={prefix + 'legal'} path={prefix + '/legal/:page'} element={<LegalPage />} />,
    <Route key={prefix + 'blog'} path={prefix + '/blog'} element={<BlogPage />} />,
    <Route key={prefix + 'post'} path={prefix + '/blog/:slug'} element={<ArticlePage />} />,
  ]
}

/*
  Le routeur (BrowserRouter dans le navigateur, StaticRouter au prérendu)
  est fourni par main.jsx et entry-server.jsx, pour que la même App serve
  aux deux. Chaque page existe en anglais (racine) et sous /fr, /es, /pt.
*/
export default function App() {
  return (
    <>
      <ScrollToTop />
      <LangSync />
      <Routes>
        {pageRoutes('')}
        {CONTENT_LANGS.map(l => pageRoutes('/' + l))}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <CookieBanner />
    </>
  )
}
