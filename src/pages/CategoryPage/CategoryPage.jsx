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
        <Navbar />
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

      {/* Navbar sticky avec le titre de la categorie */}
      <Navbar title={`${category.label} Games`} />

      {/* Contenu a largeur limitee */}
      <div className="category__content">

        {/* Rangee de raccourcis vers les autres categories — comme Poki photo 3 */}
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
                className="category__cell fade-up"
                style={{ animationDelay: `${index * 35}ms` }}
              >
                <GameCard game={game} size="small" />
              </div>
            ))}
          </div>
        ) : (
          <p className="category__empty">No games in this category yet. Check back soon.</p>
        )}

      </div>

      {/* Blocs pleine largeur, autonomes — identiques a Home */}
      <SeoBlock type="category" data={category} />
      <Footer />

    </div>
  )
}