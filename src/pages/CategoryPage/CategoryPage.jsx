import { useParams, Link } from 'react-router-dom'
import { games, categories } from '../../data/games'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import './CategoryPage.css'

export default function CategoryPage() {
  const { id } = useParams()
  const category = categories.find(c => c.id === id)

  if (!category) {
    return (
      <div className="category">
        {/* Navbar 1x1 meme en not-found */}
        <div className="category__header">
          <div className="category__header-nav">
            <Navbar inGrid={true} />
          </div>
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

  const catGames = games.filter(g => g.category === id)
  const otherCats = categories.filter(c => c.id !== 'all' && c.id !== id)
  const catIcons = {
    arcade: '🕹️', puzzle: '🧩', clicker: '👆', runner: '🏃', sports: '⚽',
  }

  return (
    <div className="category">

      {/* ============================================================
          EN-TETE : navbar 1x1 | titre categorie 1x2
          Une ligne, même gap et padding que la BentoGrid.
          ============================================================ */}
      <div className="category__header">
        {/* Cellule navbar very-small (1x1) */}
        <div className="category__header-nav">
          <Navbar inGrid={true} />
        </div>
        {/* Cellule titre (occupe le reste de la ligne) */}
        <div className="category__header-title">
          <span className="category__page-title">{category.label} Games</span>
        </div>
      </div>

      {/* Contenu a largeur limitee */}
      <div className="category__content">

        {/* Raccourcis vers les autres categories */}
        <div className="category__shortcuts">
          {otherCats.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="category__shortcut"
            >
              <span className="category__shortcut-icon">{catIcons[cat.id] || '🎮'}</span>
              <span className="category__shortcut-label">{cat.label}</span>
            </Link>
          ))}
        </div>

        {/* Grille de jeux */}
        {catGames.length > 0 ? (
          <div className="category__grid">
            {catGames.map((game, index) => (
              <div
                key={game.id}
                className={`category__cell category__cell--${game.size} fade-up`}
                style={{ animationDelay: `${index * 35}ms` }}
              >
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
