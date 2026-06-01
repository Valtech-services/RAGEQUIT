import { Link } from 'react-router-dom'
import { games, categories } from '../../data/games'
import GameCard from '../GameCard/GameCard'
import './BentoGrid.css'

/*
  BentoGrid — grille Poki-style.
  La Navbar est la PREMIERE cellule de la grille (1×1, sticky).
  Les jeux de tailles variées (small/medium/large) remplissent le reste.
  Sur mobile la navbar prend toute la largeur (span 2).
*/
export default function BentoGrid({ reserveNav = false }) {
  const gameCategories = categories.filter(c => c.id !== 'all')
  const catIcons = {
    arcade: '🕹️', puzzle: '🧩', clicker: '👆', runner: '🏃', sports: '⚽',
  }

  return (
    <div className="bento">

      {/* ============================================================
          GRILLE DE JEUX
          La navbar occupe la 1re cellule (sticky dans la grille).
          ============================================================ */}
      <div className="bento__grid">

        {/* Cellule navbar — sticky, 1×1 sur desktop, pleine largeur mobile */}
        {/* Cellule fantôme : réserve la place de la navbar sticky (gérée par Home) */}
        {reserveNav && <div className="bento__cell bento__cell--nav-ghost" aria-hidden="true" />}

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
