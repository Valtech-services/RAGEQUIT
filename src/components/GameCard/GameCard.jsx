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
              <linearGradient id="hotFlame" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#5ee0ff"/>
                <stop offset="100%" stop-color="#0088cc"/>
              </linearGradient>
            </defs>
            <path d="M13.5 2c.5 3.5-1.5 5-3 7.5-1 1.7-1 3.5.5 4.7.4-1.3.3-2.7 1.4-3.7-.2 2.3 1.3 3.4 2 4.6.8 1.4.4 3.1-.9 4.2 3-1 5-3.6 5-6.8 0-3.3-2.3-5-3.2-7.4-.5 1.4-1.6 2-2.6 2.6C15.9 6 15.4 3.6 13.5 2z" fill="url(#hotFlame)"/>
            <path d="M9.5 12.5c-1.2 1-1.9 2.4-1.9 4A4.4 4.4 0 0012 21c-1.3-1.1-1.7-2.8-.9-4.2-.9-1.2-1.6-2.4-1.6-4.3z" fill="#aef0ff"/>
          </svg>
        </span>
      )}
      {game.isNew && <span className="gamecard__badge-new">NEW</span>}
    </div>
  )
}
