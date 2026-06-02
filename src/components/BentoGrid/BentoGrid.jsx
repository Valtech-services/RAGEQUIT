import { Link } from 'react-router-dom'
import { games, categories } from '../../data/games'
import GameCard from '../GameCard/GameCard'
import Navbar from '../Navbar/Navbar'
import './BentoGrid.css'

/*
  BentoGrid — grille Poki-style.
  Quand showNav={true} (Home), la Navbar est la PREMIÈRE cellule réelle de
  la grille (1×1 carrée sur desktop, pleine largeur sur mobile). Elle est
  donc alignée pile sur les marges et le gap de la grille, comme Poki.
*/
export default function BentoGrid({ showNav = false }) {
  const gameCategories = categories.filter(c => c.id !== 'all')
  const catIcons = {
    arcade: '🕹️', puzzle: '🧩', clicker: '👆', runner: '🏃', sports: '⚽',
  }

  return (
    <div className="bento">
      {/* ============================================================
          GRILLE DE JEUX
          La navbar occupe la 1re cellule réelle (carrée) quand showNav.
          ============================================================ */}
      <div className="bento__grid">
        {showNav && (
          <div className="bento__cell bento__cell--nav">
            <Navbar inGrid={true} />
          </div>
        )}

        {games.map((game, index) => (
          <div
            key={game.id}
            className={`bento__cell bento__cell--${game.size} fade-up`}
            style={{ animationDelay: `${index * 35}ms` }}
          >
            <GameCard game={game} size={game.size} shimmer={game.shimmer} />
          </div>
        ))}
      </div>

      {/* ============================================================
          CATEGORIES — tuiles blanches
          ============================================================ */}
      <div className="bento__cats">
        {gameCategories.map((cat, index) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="bento__cat-tile fade-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="bento__cat-icon">{catIcons[cat.id] || '🎮'}</span>
            <span className="bento__cat-label">{cat.label} Games</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
