import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './GameCard.css'

/*
  GameCard — tuile de jeu dans la BentoGrid.
  - Tailles : small (1×1), medium (2×2), large (3×3)
  - Au hover : titre blanc centré qui monte du bas + vidéo preview en boucle (2s)
  - Languette "hot" (flamme bleue) en haut à gauche pour les jeux populaires (Poki)
  - La vidéo est optionnelle : si /previews/{id}.mp4 n'existe pas, on reste sur l'image
*/
export default function GameCard({ game, size = 'small', shimmer = false }) {
  const [hovered, setHovered] = useState(false)
  const [videoOk, setVideoOk] = useState(true) // false si la vidéo ne charge pas
  const videoRef = useRef(null)

  // Démarre / arrête la vidéo selon le hover
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hovered) {
      v.currentTime = 0
      v.play().catch(() => setVideoOk(false))
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [hovered])

  return (
    <Link
      to={`/game/${game.id}`}
      className={`gamecard gamecard--${size} ${shimmer ? 'shimmer-effect' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={game.title}
    >
      {/* Miniature image (toujours présente, cachée sous la vidéo au hover) */}
      <img
        src={game.thumbnail}
        alt={game.title}
        className={`gamecard__img ${hovered && videoOk ? 'gamecard__img--hidden' : ''}`}
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop' }}
        loading="lazy"
        draggable={false}
      />

      {/* Vidéo preview — se charge en lazy, joue au hover */}
      {videoOk && (
        <video
          ref={videoRef}
          className={`gamecard__video ${hovered ? 'gamecard__video--visible' : ''}`}
          src={`/previews/${game.id}.mp4`}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setVideoOk(false)}
        />
      )}

      {/* Languette "hot" (flamme bleue) — jeux populaires, façon Poki */}
      {game.hot && (
        <span className="gamecard__hot" aria-label="Popular game">
          <svg className="gamecard__hot-icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M13.5 1.5c.4 2.3-.6 4-1.9 5.4-1.3 1.4-2.9 2.7-3.7 4.7-.9 2.3-.2 4.9 1.7 6.4-.5-1.2-.4-2.5.4-3.5.7-.9 1.7-1.5 2.2-2.6.5 1 .6 1.9.4 3 .9-.6 1.6-1.5 1.9-2.6.9 1.1 1.4 2.4 1.4 3.8 0 3.1-2.5 5.6-5.6 5.6S5 19.6 5 16.5c0-2.6 1.3-4.6 2.9-6.4C9.9 7.8 12.4 5.6 13.5 1.5z"
            />
          </svg>
        </span>
      )}

      {/* Badge NEW */}
      {game.isNew && !hovered && (
        <span className="gamecard__badge-new">NEW</span>
      )}

      {/* Overlay titre — blanc, centré en bas, monte au hover */}
      <div className={`gamecard__overlay ${hovered ? 'gamecard__overlay--visible' : ''}`}>
        <span className="gamecard__title">{game.title}</span>
      </div>
    </Link>
  )
}
