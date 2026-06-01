import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { games } from '../../data/games'
import './MobileGamePage.css'

/*
  MobileGamePage — expérience mobile dédiée (< 768px).
  1. Écran d'accueil : miniature pleine largeur + bouton PLAY
  2. Jeu en plein écran avec bouton retour + bannière pub
  3. Overlay rotation si le jeu nécessite le paysage
*/
export default function MobileGamePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find(g => g.id === id)

  const [playing, setPlaying] = useState(false)
  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia('(orientation: landscape)').matches
  )
  const [showRotate, setShowRotate] = useState(false)

  // Détection orientation
  useEffect(() => {
    const mq = window.matchMedia('(orientation: landscape)')
    const handler = (e) => {
      setIsLandscape(e.matches)
      // Cache l'overlay dès que le téléphone est tourné
      if (e.matches) setShowRotate(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Quand l'utilisateur clique Play
  const handlePlay = () => {
    // Si le jeu nécessite le paysage et qu'on est en portrait
    if (game.landscape && !isLandscape) {
      setShowRotate(true)
      return
    }
    setPlaying(true)
    // Tente le plein écran natif
    try {
      document.documentElement.requestFullscreen?.()
    } catch (e) {}
  }

  // Retour depuis le jeu
  const handleBack = () => {
    setPlaying(false)
    try {
      if (document.fullscreenElement) document.exitFullscreen()
    } catch (e) {}
  }

  if (!game) {
    return (
      <div className="mgp mgp--notfound">
        <span>Game not found.</span>
        <Link to="/" className="mgp__back-link">← Back to home</Link>
      </div>
    )
  }

  /* ---- Overlay "Tournez votre téléphone" ---- */
  if (showRotate) {
    return (
      <div className="mgp__rotate-overlay">
        <div className="mgp__rotate-content">
          <div className="mgp__rotate-phone">
            {/* Icône smartphone qui pivote de portrait à paysage */}
            <svg className="mgp__rotate-phone-svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            <span className="mgp__rotate-arrow">↻</span>
          </div>
          <h2 className="mgp__rotate-title">Rotate your phone</h2>
          <p className="mgp__rotate-text">
            {game.title} plays best in landscape mode.
          </p>
          <button
            className="mgp__rotate-skip"
            onClick={() => { setShowRotate(false); setPlaying(true) }}
          >
            Play anyway
          </button>
          <Link to="/" className="mgp__rotate-home">← Back to games</Link>
        </div>
      </div>
    )
  }

  /* ---- Mode JEU : plein écran ---- */
  if (playing) {
    return (
      <div className="mgp mgp--playing">

        {/* Barre top : bouton retour + nom du jeu */}
        <div className="mgp__topbar">
          <button className="mgp__topbar-back" onClick={handleBack} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <span className="mgp__topbar-title">{game.title}</span>
          <div className="mgp__topbar-spacer" />
        </div>

        {/* Iframe du jeu — prend tout l'espace disponible */}
        <div className="mgp__iframe-wrap">
          <iframe
            className="mgp__iframe"
            src={`/games/${game.id}.html`}
            title={game.title}
            allowFullScreen
          />
        </div>

        {/* Bannière pub en bas */}
        <div className="mgp__ad-bar">
          <span className="mgp__ad-label">Advertisement</span>
          {/* Slot AdSense ici quand approuvé */}
        </div>

      </div>
    )
  }

  /* ---- Écran d'accueil du jeu ---- */
  return (
    <div className="mgp mgp--preview">

      {/* Bouton retour */}
      <Link to="/" className="mgp__preview-back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        <span>All games</span>
      </Link>

      {/* Miniature pleine largeur */}
      <div className="mgp__hero">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="mgp__hero-img"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=600&h=400&fit=crop' }}
        />
        <div className="mgp__hero-overlay" />

        {/* Info jeu par-dessus la miniature */}
        <div className="mgp__hero-info">
          {game.isNew && <span className="mgp__badge-new">NEW</span>}
          <h1 className="mgp__hero-title">{game.title}</h1>
          <p className="mgp__hero-by">by {game.author}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mgp__desc-block">
        <p className="mgp__desc">{game.description}</p>
        {game.landscape && (
          <div className="mgp__landscape-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"/>
            </svg>
            Best in landscape mode
          </div>
        )}
      </div>

      {/* Bouton PLAY */}
      <div className="mgp__play-wrap">
        <button className="mgp__play-btn" onClick={handlePlay}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          PLAY NOW
        </button>
      </div>

      {/* Contrôles */}
      <div className="mgp__controls-block">
        <span className="mgp__controls-label">Controls</span>
        <span className="mgp__controls-text">{game.controls}</span>
      </div>

      {/* Bannière pub */}
      <div className="mgp__ad-preview">
        <span className="mgp__ad-label">Advertisement</span>
      </div>

    </div>
  )
}
