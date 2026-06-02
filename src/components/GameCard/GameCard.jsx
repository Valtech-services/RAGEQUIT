import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './GameCard.css'

/*
  GameCard — tuile de jeu dans la BentoGrid (style Poki).
  - Tailles : small (1×1), medium (2×2), large (3×3)
  - Au hover : titre blanc (Inter) qui monte du bas, centré + vidéo preview
  - Badges STATIQUES (ne réagissent pas au hover) : languette flamme + NEW
  - Ombre portée sous la carte façon Poki
  - La vidéo est optionnelle : si /previews/{id}.mp4 manque, on reste sur l'image
*/
export default function GameCard({ game, size = 'small', shimmer = false }) {
  const [hovered, setHovered] = useState(false)
  const [videoOk, setVideoOk] = useState(true)
  const videoRef = useRef(null)

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
    <div className="gamecard-wrap">
      {/* Badges STATIQUES : hors de la zone qui scale au hover, donc immobiles */}
      {game.hot && (
        <span className="gamecard__hot" aria-label="Popular game">
          <svg className="gamecard__hot-icon" viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
            <defs>
              <linearGradient id="rqFlame" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#00b4ff" />
                <stop offset="55%" stopColor="#00d9ff" />
                <stop offset="100%" stopColor="#7df0ff" />
              </linearGradient>
            </defs>
            <path
              fill="url(#rqFlame)"
              d="M13.9 2.2c.5 2.6-.6 4.5-2 6-1.2 1.3-2.5 2.5-2.8 4.2-.2 1 .1 1.9.7 2.6.1-1 .6-1.8 1.3-2.5.5-.5.9-1.1 1.1-1.8.7.9 1 1.8.9 2.9 0 .3-.1.6-.2.9.9-.4 1.6-1.2 1.9-2.2.1-.4.2-.9.2-1.3 1 1 1.6 2.4 1.6 3.9 0 3.1-2.5 5.6-5.6 5.6-3.2 0-5.8-2.6-5.8-5.8 0-2 .9-3.6 2.1-5.1.6-.7 1.2-1.4 1.7-2.2C11.9 8 13.5 5.5 13.9 2.2z"
            />
          </svg>
        </span>
      )}
      {game.isNew && (
        <span className="gamecard__badge-new">NEW</span>
      )}

      {/* La carte cliquable : c'est ELLE qui scale au hover, pas les badges */}
      <Link
        to={`/game/${game.id}`}
        className={`gamecard gamecard--${size} ${game.isNew ? 'gamecard--new' : ''} ${shimmer ? 'shimmer-effect' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={game.title}
      >
        <img
          src={game.thumbnail}
          alt={game.title}
          className={`gamecard__img ${hovered && videoOk ? 'gamecard__img--hidden' : ''}`}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=400&fit=crop' }}
          loading="lazy"
          draggable={false}
        />

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

        <div className={`gamecard__overlay ${hovered ? 'gamecard__overlay--visible' : ''}`}>
          <span className="gamecard__title">{game.title}</span>
        </div>
      </Link>
    </div>
  )
}
