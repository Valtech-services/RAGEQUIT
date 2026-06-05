import { useParams, Link } from 'react-router-dom'
import { games, categories } from '../../data/games'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import './CategoryPage.css'

export default function CategoryPage() {
  const { id } = useParams()
  const category = categories.find(c => c.id === id)

  usePageTitle(category ? `${category.label} Games` : 'Category')

  if (!category) {
    return (
      <div className="category">
        <div className="category__header">
          <div className="category__header-nav"><Navbar inGrid={true} /></div>
          <div className="category__header-title">
            <span className="category__page-title">Not found</span>
          </div>
        </div>
        <div className="category--notfound">
          <p>Category not found.</p>
          <Link to="/" className="category__back-link">Back to home</Link>
        </div>
      </div>
    )
  }

  const catGames  = games.filter(g => g.category === id)
  const otherCats = categories.filter(c => c.id !== 'all' && c.id !== id)
  const catIcons  = {
    arcade: '🕹️', puzzle: '🧩', clicker: '👆', runner: '🏃', sports: '⚽',
  }

  return (
    <div className="category">
      <div className="category__header">
        <div className="category__header-nav"><Navbar inGrid={true} /></div>
        <div className="category__header-title">
          {category.image && (
            <img src={category.image} alt={category.label} className="category__header-img"
              onError={e => { e.currentTarget.style.display='none' }} />
          )}
          <span className="category__page-title">{category.label} Games</span>
        </div>
      </div>
      <div className="category__content">
        <div className="category__shortcuts">
          {otherCats.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="category__shortcut">
              {cat.image ? (
                <img src={cat.image} alt={cat.label} className="category__shortcut-img"
                  onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='inline' }} />
              ) : null}
              <span className="category__shortcut-icon" style={cat.image ? {display:'none'} : {}}>{catIcons[cat.id] || '🎮'}</span>
              <span className="category__shortcut-label">{cat.label}</span>
            </Link>
          ))}
        </div>
        {catGames.length > 0 ? (
          <div className="category__grid">
            {catGames.map((game, index) => (
              <div key={game.id}
                className={`category__cell category__cell--${game.size} fade-up`}
                style={{ animationDelay: `${index * 35}ms` }}>
                <GameCard game={game} size={game.size} shimmer={game.shimmer} />
              </div>
            ))}
          </div>
        ) : (
          <p className="category__empty">No games in this category yet. Check back soon.</p>
        )}
      </div>
      <SeoBlock type="category" data={category} />
      <Footer />
    </div>
  )
}
