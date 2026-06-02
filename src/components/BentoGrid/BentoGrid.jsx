import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { games, categories } from '../../data/games'
import GameCard from '../GameCard/GameCard'
import Navbar from '../Navbar/Navbar'
import './BentoGrid.css'

/*
  BentoGrid — grille Poki-style à cellules de taille FIXE.

  Logique :
  - Une cellule 1×1 = --cell pixels (desktop) / largeur/3 (mobile).
  - La grille remplit autant de colonnes que l'écran le permet (auto-fill).
  - La 1re cellule est un TROU vide (bento__hole) réservé en dur en haut
    à gauche : la Navbar (position: fixed) vient se poser dessus visuellement.
  - L'ordre des jeux est mélangé à chaque chargement (dispo aléatoire),
    mais le trou reste toujours en première position.
*/
export default function BentoGrid({ showNav = true }) {
  const gameCategories = categories.filter(c => c.id !== 'all')
  const catIcons = {
    arcade: '🕹️', puzzle: '🧩', clicker: '👆', runner: '🏃', sports: '⚽',
  }

  // Mélange l'ordre des jeux une seule fois par chargement de page.
  const shuffledGames = useMemo(() => {
    const arr = [...games]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

  return (
    <div className="bento">

      {/* Navbar fixe qui suit le scroll, posée sur le trou haut-gauche */}
      {showNav && <Navbar floating={true} />}

      <div className="bento__grid">
        {/* TROU réservé en dur : toujours en haut à gauche, toujours vide.
            Même taille qu'une cellule 1×1. La navbar fixe se pose dessus. */}
        <div className="bento__hole" aria-hidden="true" />

        {shuffledGames.map((game) => (
          <div
            key={game.id}
            className={`bento__cell bento__cell--${game.size} fade-up`}
          >
            <GameCard game={game} size={game.size} shimmer={game.shimmer} />
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
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
