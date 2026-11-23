/* =====================================================================
   NotFoundPage — page 404 (point d'audit A-002)
   Affichée pour toute URL inconnue (route "*", jeu, catégorie, article ou
   page légale introuvables). Même en-tête que les pages catégorie, un
   message clair, un retour à l'accueil et les derniers jeux.
   Le prérendu en fait dist/404.html, que Vercel sert avec le statut 404.
   ===================================================================== */
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Link } from '../../i18n/locale'
import { useGames } from '../../data/localized'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import { track } from '../../lib/analytics'
import '../CategoryPage/CategoryPage.css'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const games = useGames()
  usePageTitle(t('common.pageNotFoundTitle'), t('common.pageNotFoundText'), { noindex: true })

  useEffect(() => { track('page_not_found', { props: { path: pathname } }) }, [pathname])

  // Les jeux les plus récents d'abord (fin du tableau games).
  const picks = games.slice(-9).reverse()

  return (
    <div className="category notfound">
      <div className="category__header">
        <div className="category__header-nav"><Navbar inGrid={true} /></div>
        <div className="category__header-title">
          <span className="notfound__code" aria-hidden="true">404</span>
        </div>
      </div>
      <div className="category__content">
        <section className="notfound__card">
          <h1 className="notfound__title">{t('common.pageNotFoundTitle')}</h1>
          <p className="notfound__text">{t('common.pageNotFoundText')}</p>
          <Link to="/" className="notfound__btn">{t('common.backToHome')}</Link>
        </section>
        <h2 className="notfound__subtitle">{t('common.tryTheseGames')}</h2>
        <div className="category__grid">
          {picks.map((game, index) => (
            <div key={game.id} className="category__cell category__cell--medium fade-up"
              style={{ animationDelay: `${index * 35}ms` }}>
              <GameCard game={game} size="medium" source="not_found" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
