import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home/Home'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import GamePage from './pages/GamePage/GamePage'
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage'
import LegalPage from './pages/LegalPage/LegalPage'
import CookieBanner from './components/CookieBanner/CookieBanner'

/* Remet le scroll en haut a chaque changement de page. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/legal/:page" element={<LegalPage />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  )
}