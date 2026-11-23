import { useEffect } from 'react'
import { useCategories, useGames } from '../../data/localized'
import { useParams } from 'react-router-dom'
import { Link } from '../../i18n/locale'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { useTranslation } from 'react-i18next'
import { track } from '../../lib/analytics'
import './CategoryPage.css'
import { catImg } from '../../lib/thumb'

export default function CategoryPage() {
  const games = useGames()
  const categories = useCategories()
  const { t } = useTranslation()
  const { id } = useParams()
  const category = categories.find(c => c.id === id)
  usePageTitle(
    category ? (category.seo?.title || t(`categoryTitles.${category.id}`)) : undefined,
    category?.seo?.metaDescription
  )

  useEffect(() => {
    if(category) track('category_view', { category: id })
  }, [id])

  if(!category) return <NotFoundPage />

  const catGames  = games.filter(g => g.category === id)
  const otherCats = categories.filter(c => c.id !== 'all' && c.id !== id)
  const catIcons  = { arcade:'🕹️', puzzle:'🧩', clicker:'👆', runner:'🏃', sports:'⚽' }

  function handleCatClick(catId){
    track('category_click', { category: catId, source: 'shortcut' })
  }

  return (
    <div className="category">
      <div className="category__header">
        <div className="category__header-nav"><Navbar inGrid={true} /></div>
        <div className="category__header-title">
          {category.image && (
            <img {...catImg(category.image, e => { e.currentTarget.style.display='none' })} alt={category.label} className="category__header-img" width="48" height="48" />
          )}
          <h1 className="category__page-title">{t(`categoryTitles.${category.id}`)}</h1>
        </div>
      </div>
      <div className="category__content">
        <div className="category__shortcuts">
          {otherCats.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`}
              className="category__shortcut"
              onClick={() => handleCatClick(cat.id)}>
              {cat.image ? (
                <img {...catImg(cat.image, e => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='inline' })} alt={cat.label} className="category__shortcut-img" loading="lazy" width="28" height="28" />
              ) : null}
              <span className="category__shortcut-icon" style={cat.image ? {display:'none'} : {}}>{catIcons[cat.id] || '🎮'}</span>
              <span className="category__shortcut-label">{t(`categoryTitles.${cat.id}`)}</span>
            </Link>
          ))}
        </div>
        {catGames.length > 0 ? (
          <div className="category__grid">
            {catGames.map((game, index) => (
              <div key={game.id}
                className={`category__cell category__cell--${game.size} fade-up`}
                style={{ animationDelay: `${index * 35}ms` }}>
                <GameCard game={game} size={game.size} shimmer={game.shimmer} source="category" />
              </div>
            ))}
          </div>
        ) : (
          <p className="category__empty">{t('common.noGamesYet')}</p>
        )}
      </div>
      <SeoBlock type="category" data={category} />
      <Footer />
    </div>
  )
}
