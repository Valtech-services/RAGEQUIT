import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { games } from '../../data/games'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import './MobileGamePage.css'

export default function MobileGamePage() {
  const { id } = useParams()
  const game = games.find(g => g.id === id)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    try { document.documentElement.requestFullscreen?.() } catch (e) {}
  }

  const handleBack = () => {
    setPlaying(false)
    try { if (document.fullscreenElement) document.exitFullscreen() } catch (e) {}
  }

  useEffect(() => {
    return () => {
      try { if (document.fullscreenElement) document.exitFullscreen() } catch (e) {}
    }
  }, [])

  if (!game) {
    return (
      <div className="mgp mgp--notfound">
        <span>Game not found.</span>
        <Link to="/" className="mgp__back-link">Back to home</Link>
      </div>
    )
  }

  const related = games.filter(g => g.id !== game.id).slice(0, 12)

  /* ---- MODE JEU : plein écran ---- */
  if (playing) {
    return (
      <div className="mgp mgp--playing">
        <div className="mgp__topbar">
          <button className="mgp__topbar-back" onClick={handleBack} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <span className="mgp__topbar-title">{game.title}</span>
          <div className="mgp__topbar-spacer" />
        </div>
        <div className="mgp__iframe-wrap">
          <iframe
            className="mgp__iframe"
            src={`/games/${game.id}.html`}
            title={game.title}
            allowFullScreen
          />
        </div>
        <div className="mgp__ad-bar">
          <span className="mgp__ad-label">Advertisement</span>
        </div>
      </div>
    )
  }

  /* ---- MODE ACCUEIL : façon Poki ---- */
  return (
    <div className="mgp mgp--preview">

      <div className="mgp__header">
        <div className="mgp__header-nav">
          <Navbar inGrid={true} />
        </div>
        <div className="mgp__header-title">
          <h1 className="mgp__title">{game.title}</h1>
          <span className="mgp__by">by {game.author}</span>
        </div>
      </div>

      <button
        className="mgp__hero"
        onClick={handlePlay}
        style={{ backgroundImage: `url(${game.thumbnail})` }}
        aria-label={`Play ${game.title}`}
      >
        <span className="mgp__hero-overlay" />
        <span className="mgp__hero-play">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
        <span className="mgp__hero-label">Play</span>
      </button>

      <div className="mgp__related">
        {related.map(g => (
          <div key={g.id} className="mgp__related-cell">
            <GameCard game={g} size="small" />
          </div>
        ))}
      </div>

      <SeoBlock
        type="game"
        data={game.seo ? {
          ...game.seo,
          description: game.description,
          controls: game.controls,
          author: game.author,
          title: game.title,
        } : null}
      />

      <Footer />

    </div>
  )
}
