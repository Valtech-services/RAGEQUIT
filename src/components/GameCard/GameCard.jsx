import { Link } from 'react-router-dom'
import './GameCard.css'

export default function GameCard({ game, size = 'small', shimmer = false }) {
  return (
    <Link
      to={`/game/${game.id}`}
      className={`game-card ${shimmer ? 'game-card--shimmer' : ''}`}
    >
      <div className="game-card__thumb">
        <img src={game.thumbnail} alt={game.title} loading="lazy" />
        <div className="game-card__thumb-fallback">
          <span>{game.title[0]}</span>
        </div>
      </div>

      <div className="game-card__overlay">
        {game.isNew && (
          <span className="game-card__badge">NEW</span>
        )}
        <h3 className="game-card__title">{game.title}</h3>
      </div>
    </Link>
  )
}