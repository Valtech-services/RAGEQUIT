import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { games } from '../../data/games'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import MobileGamePage from './MobileGamePage'
import { submitScore } from '../../data/leaderboardStore'
import usePageTitle from '../../hooks/usePageTitle'
import { track } from '../../lib/analytics'
import './GamePage.css'

export default function GamePage() {
  const [isMobile] = useState(() => window.innerWidth < 768)
  if(isMobile) return <MobileGamePage />
  return <GamePageDesktop />
}

function GamePageDesktop() {
  const { id } = useParams()
  const game = games.find(g => g.id === id)
  const { recordPlay } = useAuth()
  const [playing, setPlaying]       = useState(false)
  const [vote, setVote]             = useState(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [sessionStart]              = useState(Date.now())

  usePageTitle(game?.title)

  // Track page vue jeu
  useEffect(() => {
    if(game) track('game_view', { game_id: game.id, category: game.category })
  }, [id])

  function handlePlay(){
    setPlaying(true)
    track('game_start', { game_id: game.id, category: game.category })
  }

  function handleFullscreen(){
    const stage = document.querySelector('.gamepage__stage')
    if(!stage) return
    if(document.fullscreenElement) document.exitFullscreen()
    else if(stage.requestFullscreen) stage.requestFullscreen()
    else if(stage.webkitRequestFullscreen) stage.webkitRequestFullscreen()
    track('game_fullscreen', { game_id: game.id })
  }

  useEffect(() => {
    async function handleMessage(e) {
      const d = e.data
      if(!d || typeof d.type !== 'string') return

      // Score postMessage depuis le jeu HTML
      if(d.type.endsWith('_SCORE')) {
        await submitScore({ game: d.game, mode: d.mode, score: d.score, scoreLabel: d.scoreLabel })
        if(d.game) recordPlay(d.game)
        window.dispatchEvent(new Event('rh-score-saved'))
        const duration = Math.round((Date.now() - sessionStart) / 1000)
        track('game_end', {
          game_id: d.game,
          props: { mode: d.mode, score: d.score, diff: d.diff, duration_secs: duration }
        })
      }

      // Analytics postMessage depuis le jeu HTML (boost, pub)
      if(d.type === 'RH_TRACK') {
        track(d.event, { game_id: d.game_id, props: d.props })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [recordPlay])

  if(!game) {
    return (
      <div className="gamepage">
        <div className="gamepage__notfound-header">
          <div className="gamepage__nav"><Navbar inGrid={true} /></div>
        </div>
        <div className="gamepage--notfound">
          <p>Game not found.</p>
          <Link to="/" className="gamepage__back-link">Back to home</Link>
        </div>
      </div>
    )
  }

  const related = games.filter(g => g.id !== game.id).slice(0, 12)

  return (
    <div className="gamepage">
      <div className="gamepage__layout">
        <div className="gamepage__col-nav">
          <div className="gamepage__nav"><Navbar inGrid={true} /></div>
          <div className="gamepage__ad gamepage__ad--left">
            <span className="gamepage__ad-label">Advertisement</span>
          </div>
        </div>
        <div className="gamepage__col-main">
          <div className="gamepage__block">
            <div className="gamepage__stage">
              {playing ? (
                <iframe src={`/games/${game.id}.html`} title={game.title}
                  className="gamepage__iframe" allowFullScreen frameBorder="0" />
              ) : (
                <div className="gamepage__cover" style={{ backgroundImage: `url(${game.thumbnail})` }}>
                  <div className="gamepage__cover-overlay" />
                  <button className="gamepage__play-btn" onClick={handlePlay} aria-label="Play">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                  <span className="gamepage__play-label">Play</span>
                </div>
              )}
            </div>
            <div className="gamepage__bar">
              <div className="gamepage__bar-game">
                <div className="gamepage__bar-thumb">
                  <img src={game.thumbnail} alt={game.title} />
                </div>
                <div className="gamepage__bar-info">
                  <span className="gamepage__bar-title">{game.title}</span>
                  <span className="gamepage__bar-author">by {game.author}</span>
                </div>
              </div>
              <div className="gamepage__bar-actions">
                <button className={`gamepage__action ${vote==='up'?'is-up':''}`} title="Like"
                  onClick={() => { setVote(vote==='up'?null:'up'); track('game_vote', {game_id: game.id, props:{vote:'up'}}) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                </button>
                <button className={`gamepage__action ${vote==='down'?'is-down':''}`} title="Dislike"
                  onClick={() => { setVote(vote==='down'?null:'down'); track('game_vote', {game_id: game.id, props:{vote:'down'}}) }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>
                </button>
                <button className="gamepage__action" title="Report" onClick={() => setReportOpen(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
                </button>
                <button className="gamepage__action gamepage__action--full" title="Fullscreen" onClick={handleFullscreen}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="gamepage__ad gamepage__ad--below">
            <span className="gamepage__ad-label">Advertisement</span>
          </div>
          {related.length > 0 && (
            <div className="gamepage__related">
              <div className="gamepage__related-grid">
                {related.map(g => (
                  <div key={g.id} className="gamepage__related-cell">
                    <GameCard game={g} size="small" source="related" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <aside className="gamepage__col-side">
          <div className="gamepage__ad gamepage__ad--right">
            <span className="gamepage__ad-label">Advertisement</span>
          </div>
          <div className="gamepage__side-games">
            {related.slice(0, 8).map(g => (
              <Link key={g.id} to={`/game/${g.id}`} className="gamepage__side-thumb"
                onClick={() => track('game_click', { game_id: g.id, source: 'sidebar' })}>
                <img src={g.thumbnail} alt={g.title} />
              </Link>
            ))}
          </div>
        </aside>
      </div>
      <SeoBlock type="game" data={game.seo ? { ...game.seo, description: game.description, controls: game.controls, author: game.author, title: game.title } : null} />
      {reportOpen && (
        <div className="gamepage__report-overlay" onClick={() => setReportOpen(false)}>
          <div className="gamepage__report" onClick={e => e.stopPropagation()}>
            <h3 className="gamepage__report-title">Report a problem</h3>
            <p className="gamepage__report-text">What's wrong with {game.title}?</p>
            <div className="gamepage__report-options">
              {["Game won\u2019t load","Game freezes or crashes","Controls don\u2019t work","Inappropriate content","Other"].map(opt => (
                <button key={opt} className="gamepage__report-opt" onClick={() => setReportOpen(false)}>{opt}</button>
              ))}
            </div>
            <button className="gamepage__report-cancel" onClick={() => setReportOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
