import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './GameCard.css'

/*
  GameCard — tuile de jeu dans la BentoGrid.
  - Tailles : small (1×1), medium (2×2), large (3×3)
  - Au hover : titre centré par-dessus + vidéo preview en boucle (2s)
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

      {/* Badge NEW */}
      {game.isNew && !hovered && (
        <span className="gamecard__badge-new">NEW</span>
      )}

      {/* Overlay titre — centré, visible au hover */}
      <div className={`gamecard__overlay ${hovered ? 'gamecard__overlay--visible' : ''}`}>
        <span className="gamecard__title">{game.title}</span>
        <span className="gamecard__play-icon">▶</span>
      </div>

    </Link>
  )
}
