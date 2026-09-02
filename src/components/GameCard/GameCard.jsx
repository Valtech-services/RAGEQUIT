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
          <svg className="gamecard__hot-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2c1 3-1 5-2 6-1.5 1.5-3 3-3 6a5 5 0 0010 0c0-2-1-3.5-2-5 2 1 3 3 3 5a7 7 0 11-14 0c0-5 5-7 8-12z" fill="#00b4e6"/>
          </svg>
        </span>
      )}
      {game.isNew && <span className="gamecard__badge-new">NEW</span>}
    </div>
  )
}
