/* GameCard.jsx — carte de jeu
   - Effet overlay : le titre monte depuis le bas au survol (desktop),
     toujours visible sur mobile.
   - Effet shimmer : balayage brillant premium en diagonale, en boucle,
     UNIQUEMENT si le jeu a shimmer:true dans games.js.
   - Analytics au clic (track).
   Le prop "source" est passé par le parent : 'bento', 'related', 'category', 'search'
*/
import { Link } from '../../i18n/locale'
import { track } from '../../lib/analytics'
import { useId } from 'react'
import { useIsHot } from '../../lib/hotGames'
import './GameCard.css'

// Flamme « hot » : trois couches (contour, cœur, noyau) qui vacillent doucement.
function HotFlame() {
  const uid = useId().replace(/:/g, '')
  return (
    <span className="gamecard__hot" aria-label="Hot">
      <svg className="gamecard__hot-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id={`fo${uid}`} x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff2d55"/>
            <stop offset="55%" stopColor="#ff5a1f"/>
            <stop offset="100%" stopColor="#ff8a00"/>
          </linearGradient>
          <linearGradient id={`fm${uid}`} x1="16" y1="11" x2="16" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9f1c"/>
            <stop offset="100%" stopColor="#ffd23f"/>
          </linearGradient>
          <linearGradient id={`fc${uid}`} x1="16" y1="18" x2="16" y2="27" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe680"/>
            <stop offset="100%" stopColor="#fffbe8"/>
          </linearGradient>
        </defs>
        <g className="gamecard__flame-outer">
          <path fill={`url(#fo${uid})`} d="M16 2c1.5 4.5 6.5 7 8.5 12 2 5 .5 11.5-5 14.6-1.9 1.1-5.1 1.1-7 0C7 25.5 5.6 19.6 8 14.6c.9-1.9 2.4-3.4 3.2-5.3.5 1.8.3 3.6 1.4 4.9C12.9 9.6 14.2 5.6 16 2z"/>
        </g>
        <g className="gamecard__flame-mid">
          <path fill={`url(#fm${uid})`} d="M16.5 11c1.1 3.2 4.5 5 5.1 9.2.6 4.1-2.2 7.2-5.6 7.2s-5.9-2.8-5.4-6.4c.3-2.2 1.8-3.6 2.7-5.3.5 1.3.5 2.6 1.3 3.5.2-3.2.8-5.8 1.9-8.2z"/>
        </g>
        <g className="gamecard__flame-core">
          <path fill={`url(#fc${uid})`} d="M16.2 18.5c.8 1.8 2.6 2.9 2.6 5.1 0 1.8-1.2 3-2.8 3s-2.8-1.2-2.7-2.8c.1-1.6 1.4-2.5 1.9-3.9.3.9.4 1.5.8 2.1-.1-1.2-.1-2.4.2-3.5z"/>
        </g>
      </svg>
    </span>
  )
}

export default function GameCard({ game, size = 'medium', source = 'bento' }) {
  // Le shimmer est piloté par games.js (champ shimmer du jeu).
  const shimmer = !!game.shimmer
  const hot = useIsHot(game)

  function handleClick(){
    track('game_click', {
      game_id:  game.id,
      category: game.category,
      source,
      props: { size, shimmer }
    })
  }

  return (
    <div className={`gamecard-wrap ${size ? 'gamecard-wrap--' + size : ''}`}>
      <Link
        to={`/game/${game.id}`}
        className={`gamecard gamecard--${size} ${game.isNew ? 'gamecard--new' : ''} ${shimmer ? 'shimmer-effect' : ''}`}
        onClick={handleClick}
      >
        <img className="gamecard__img" src={game.thumbnail} alt={game.title} loading="lazy" />

        {/* Overlay : nom du jeu qui monte au survol */}
        <div className="gamecard__overlay">
          <span className="gamecard__title">{game.title}</span>
        </div>
      </Link>

      {/* Badges statiques (immobiles au survol) */}
      {hot && <HotFlame />}
      {game.isNew && <span className="gamecard__badge-new">NEW</span>}
    </div>
  )
}
