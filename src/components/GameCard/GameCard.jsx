/* GameCard.jsx — carte de jeu
   - Effet overlay : le titre monte depuis le bas au survol (desktop),
     toujours visible sur mobile.
   - Effet shimmer : balayage brillant premium en diagonale, en boucle,
     UNIQUEMENT si le jeu a shimmer:true dans games.js.
   - Analytics au clic (track).
   Le prop "source" est passé par le parent : 'bento', 'related', 'category', 'search'
*/
import { Link } from 'react-router-dom'
import { track } from '../../lib/analytics'
import './GameCard.css'

export default function GameCard({ game, size = 'medium', source = 'bento' }) {
  // Le shimmer est piloté par games.js (champ shimmer du jeu).
  const shimmer = !!game.shimmer

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
      {game.hot && (
        <span className="gamecard__hot">
          <svg className="gamecard__hot-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hotFlame" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#ffd23f"/>
                <stop offset="45%" stop-color="#ff8a00"/>
                <stop offset="100%" stop-color="#e02200"/>
              </linearGradient>
              <linearGradient id="hotFlameCore" x1="12" y1="9" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#fff3b0"/>
                <stop offset="100%" stop-color="#ffb020"/>
              </linearGradient>
            </defs>
            <path d="M12 2c.6 2.9-.7 4.6-2 6.2-1.4 1.7-2.8 3.4-2.8 6A4.8 4.8 0 0012 19c2.9 0 5.2-2.2 5.2-5 0-2.2-1-3.6-2-5 .1 1.1-.3 2-1.2 2.6.5-2.4-.3-4.3-1.6-5.8C12.9 4.6 12.6 3.2 12 2z" fill="url(#hotFlame)"/>
            <path d="M12 11c-.9 1-1.5 2.1-1.5 3.4A2.7 2.7 0 0012 17c1.3 0 2.4-1 2.4-2.4 0-1.1-.5-1.8-1.1-2.6-.1.7-.4 1.2-1 1.6.3-1.2-.1-2-1.3-2.6z" fill="url(#hotFlameCore)"/>
          </svg>
        </span>
      )}
      {game.isNew && <span className="gamecard__badge-new">NEW</span>}
    </div>
  )
}
