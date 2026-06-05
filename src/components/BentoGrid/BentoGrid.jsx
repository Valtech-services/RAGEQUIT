import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { games, categories } from '../../data/games'
import GameCard from '../GameCard/GameCard'
import Navbar from '../Navbar/Navbar'
import './BentoGrid.css'

/*
  BentoGrid — grille style Poki à cellules de taille FIXE.

  - Desktop/tablette : cellules de --cell px, autant de colonnes que
    l'écran peut en contenir (auto-fill), grille centrée.
  - Mobile (≤600px) : exactement 3 colonnes fluides, cellules carrées.
  - La Navbar (mode inGrid) occupe la PREMIÈRE cellule, en haut à gauche,
    et scrolle avec la page (aucun position fixed/sticky).
  - L'ordre des jeux est mélangé à chaque chargement (dispo aléatoire) ;
    la navbar reste toujours en première position car rendue avant la liste.

  Mapping des tailles (game.size → cellules) :
    large  → 2×2
    medium → 1×1
    small  → 1×1
  Ce mapping est porté par le CSS (.bento__cell--{size}).
*/
export default function BentoGrid({ showNav = true }) {
  const gameCategories = categories.filter(c => c.id !== 'all')
  const catIcons = {
    arcade: '🕹️', puzzle: '🧩', clicker: '👆', runner: '🏃', sports: '⚽',
  }

  // Mélange l'ordre des jeux une seule fois par montage (Fisher-Yates).
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

      <div className="bento__grid">

        {/* PREMIÈRE CELLULE : Navbar 1×1, scrolle avec la page */}
        {showNav && (
          <div className="bento__cell bento__cell--nav">
            <Navbar inGrid={true} />
          </div>
        )}

        {/* JEUX — taille pilotée par game.size via le CSS */}
        {shuffledGames.map((game, index) => (
          <div
            key={game.id}
            className={`bento__cell bento__cell--${game.size} fade-up`}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <GameCard game={game} size={game.size} shimmer={game.shimmer} />
          </div>
        ))}

      </div>

      {/* CATÉGORIES */}
      <div className="bento__cats">
        {gameCategories.map((cat, index) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="bento__cat-tile fade-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {cat.image ? (
              <img
                src={cat.image}
                alt={cat.label}
                className="bento__cat-img"
                onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='flex' }}
              />
            ) : null}
            <span className="bento__cat-icon" style={cat.image ? {display:'none'} : {display:'flex'}}>{catIcons[cat.id] || '🎮'}</span>
            <span className="bento__cat-label">{cat.label} Games</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
