import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { games } from '../../data/games'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import './MobileGamePage.css'

export default function MobileGamePage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const game = games.find(g => g.id === id)
  const [playing, setPlaying] = useState(false)

  usePageTitle(game?.title)

  const handlePlay = () => {
    setPlaying(true)
    try { document.documentElement.requestFullscreen?.() } catch (e) {}
  }

  const handleBack = () => {
    setPlaying(false)
    try { if (document.fullscreenElement) document.exitFullscreen() } catch (e) {}
  }

  useEffect(() => {
    if (playing) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [playing])

  useEffect(() => {
    return () => {
      try { if (document.fullscreenElement) document.exitFullscreen() } catch (e) {}
      document.body.style.overflow = ''
    }
  }, [])

  if (!game) {
    return (
      <div className="mgp mgp--notfound">
        <span>{t('common.gameNotFound')}</span>
        <Link to="/" className="mgp__back-link">{t('common.backToHome')}</Link>
      </div>
    )
  }

  const related = games.filter(g => g.id !== game.id).slice(0, 12)

  /* ---- MODE JEU : plein écran simulé ---- */
  if (playing) {
    return (
      <div className="mgp mgp--playing">
        <button className="mgp__back-overlay" onClick={handleBack} aria-label={t('common.back')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <iframe
          className="mgp__iframe"
          src={`/games/${game.id}.html`}
          title={game.title}
          allow="fullscreen; autoplay; gamepad; pointer-lock"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
        />
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
          <span className="mgp__by">{t('game.by')} {game.author}</span>
        </div>
      </div>

      <button
        className="mgp__hero"
        onClick={handlePlay}
        style={{ backgroundImage: `url(${game.thumbnail})` }}
        aria-label={`${t('game.play')} ${game.title}`}
      >
        <span className="mgp__hero-overlay" />
        <span className="mgp__hero-play">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
        <span className="mgp__hero-label">{t('game.play')}</span>
      </button>

      {/* Bannière publicitaire mobile — placeholder en attendant AdSense.
          Le conteneur a des coins arrondis (décoratif), mais la vraie pub
          AdSense à l'intérieur devra rester rectangulaire (règles AdSense). */}
      <div className="mgp__ad">
        <span className="mgp__ad-label">{t('game.advertisement')}</span>
      </div>

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
