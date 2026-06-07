/* GameCard.jsx — version avec analytics
   Ajouter track() au clic sur la carte de jeu.
   Le prop "source" doit être passé par le parent : 'bento', 'related', 'category', 'search'
*/
import { Link } from 'react-router-dom'
import { track } from '../../lib/analytics'
import './GameCard.css'

export default function GameCard({ game, size = 'medium', shimmer = false, source = 'bento' }) {
  function handleClick(){
    track('game_click', {
      game_id:  game.id,
      category: game.category,
      source,
      props: { size, shimmer }
    })
  }

  return (
    <Link
      to={`/game/${game.id}`}
      className={`gamecard gamecard--${size} ${shimmer ? 'gamecard--shimmer' : ''}`}
      onClick={handleClick}
    >
      <div className="gamecard__thumb">
        <img src={game.thumbnail} alt={game.title} loading="lazy" />
        {game.hot  && <span className="gamecard__tag gamecard__tag--hot">🔥</span>}
        {game.isNew && <span className="gamecard__tag gamecard__tag--new">NEW</span>}
      </div>
      <span className="gamecard__title">{game.title}</span>
    </Link>
  )
}
