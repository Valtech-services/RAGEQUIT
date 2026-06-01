import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { games, categories } from '../../data/games'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import { submitScore } from '../../data/leaderboardStore'
import './GamePage.css'

export default function GamePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const game = games.find(g => g.id === id)

  // L'iframe du jeu n'est montee qu'apres clic sur "Play" (comme Poki).
  const [playing, setPlaying] = useState(false)
  // Like / dislike (stocké localement par jeu)
  const [vote, setVote] = useState(null) // 'up' | 'down' | null
  const [reportOpen, setReportOpen] = useState(false)

  // Ecoute les scores envoyes par les jeux via postMessage.
  // Les jeux (rage-hockey.html, staq.html) postent un message
  // { type:'..._SCORE', game, mode, score, scoreLabel, diff } a la fin
  // d'une partie. On l'enregistre dans le store local de leaderboard.
  useEffect(() => {
    function handleMessage(e) {
      const d = e.data
      if (!d || typeof d.type !== 'string') return
      if (!d.type.endsWith('_SCORE')) return
      submitScore({
        game: d.game,
        mode: d.mode,
        score: d.score,
        scoreLabel: d.scoreLabel,
        diff: d.diff,
      })
      // Notifie les composants Leaderboard de se rafraichir.
      window.dispatchEvent(new Event('rh-score-saved'))
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!game) {
    return (
      <div className="gamepage">
        <Navbar />
        <div className="gamepage--notfound">
          <p>Game not found.</p>
          <Link to="/" className="gamepage__back-link">Back to home</Link>
        </div>
      </div>
    )
  }

  const category = categories.find(c => c.id === game.category)
  // Colonne laterale : jeux recommandes (max 10)
  const sidebar = games.filter(g => g.id !== game.id).slice(0, 10)
  // Rangee du bas : jeux de la meme categorie
  const related = games.filter(g => g.category === game.category && g.id !== game.id).slice(0, 8)

  return (
    <div className="gamepage">

      {/* Navbar sticky — affiche le nom du jeu au centre */}
      <Navbar title={game.title} />

      {/* ============================================================
          ZONE PRINCIPALE : jeu central + colonne laterale (desktop)
          ============================================================ */}
      <div className="gamepage__main">

        {/* --- Colonne centrale : le jeu --- */}
        <div className="gamepage__stage-col">

          <div className="gamepage__stage">
            {playing ? (
              /* Jeu lance : iframe */
              <iframe
                src={`/games/${game.id}.html`}
                title={game.title}
                className="gamepage__iframe"
                allowFullScreen
                frameBorder="0"
              />
            ) : (
              /* Ecran "Play" — comme Poki photo 5 */
              <div
                className="gamepage__cover"
                style={{ backgroundImage: `url(${game.thumbnail})` }}
              >
                <div className="gamepage__cover-overlay" />
                <button
                  className="gamepage__play-btn"
                  onClick={() => setPlaying(true)}
                  aria-label="Play"
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <span className="gamepage__play-label">Play</span>
              </div>
            )}
          </div>

          {/* Barre sous le jeu : titre + auteur + actions */}
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
              <button
                className={`gamepage__action ${vote === 'up' ? 'is-up' : ''}`}
                title="Like"
                onClick={() => setVote(vote === 'up' ? null : 'up')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                </svg>
              </button>
              <button
                className={`gamepage__action ${vote === 'down' ? 'is-down' : ''}`}
                title="Dislike"
                onClick={() => setVote(vote === 'down' ? null : 'down')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                </svg>
              </button>
              <button
                className="gamepage__action"
                title="Report a problem"
                onClick={() => setReportOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                </svg>
              </button>
              <button
                className="gamepage__action gamepage__action--full"
                title="Fullscreen"
                onClick={() => {
                  const stage = document.querySelector('.gamepage__stage')
                  if (!stage) return
                  if (document.fullscreenElement) {
                    document.exitFullscreen()
                  } else if (stage.requestFullscreen) {
                    stage.requestFullscreen()
                  } else if (stage.webkitRequestFullscreen) {
                    stage.webkitRequestFullscreen()
                  }
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Bande pub sous la barre du jeu — remplit la colonne centrale */}
          <div className="gamepage__ad gamepage__ad--banner">
            <span className="gamepage__ad-label">Advertisement</span>
          </div>

          {/* Plus de jeux — directement sous le jeu (comme Poki) */}
          {related.length > 0 && (
            <div className="gamepage__related">
              <h2 className="gamepage__related-title">More games</h2>
              <div className="gamepage__related-grid">
                {related.map(g => (
                  <div key={g.id} className="gamepage__related-cell">
                    <GameCard game={g} size="small" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* --- Colonne laterale --- */}
        <aside className="gamepage__sidebar">

          {/* Zone pub haute (rectangle 300x250 comme Poki) */}
          <div className="gamepage__ad gamepage__ad--rect">
            <span className="gamepage__ad-label">Advertisement</span>
          </div>

          {/* Mini-leaderboard : pour les jeux qui ont un classement */}
          {(game.id === 'rage-hockey' || game.id === 'staq') && (
            <div className="gamepage__side-lb">
              <Leaderboard
                game={game.id}
                mode={game.id === 'rage-hockey' ? 'survival' : 'classic'}
                modes={game.id === 'rage-hockey' ? ['survival', 'classic'] : ['classic']}
                compact
                limit={5}
                showModeSwitch={false}
              />
              <Link to="/leaderboard" className="gamepage__lb-link">
                View full leaderboard
              </Link>
            </div>
          )}

          {/* Jeux recommandes (premiers) */}
          <div className="gamepage__side-games">
            {sidebar.slice(0, 6).map(g => (
              <Link key={g.id} to={`/game/${g.id}`} className="gamepage__side-thumb">
                <img src={g.thumbnail} alt={g.title} />
              </Link>
            ))}
          </div>

          {/* 2e zone pub (carré) au milieu de la sidebar — comme Poki */}
          <div className="gamepage__ad gamepage__ad--square">
            <span className="gamepage__ad-label">Advertisement</span>
          </div>

          {/* Jeux recommandes (suite) */}
          <div className="gamepage__side-games">
            {sidebar.slice(6, 10).map(g => (
              <Link key={g.id} to={`/game/${g.id}`} className="gamepage__side-thumb">
                <img src={g.thumbnail} alt={g.title} />
              </Link>
            ))}
          </div>

        </aside>

      </div>

      {/* Blocs pleine largeur, autonomes */}
      <SeoBlock
        type="game"
        data={game.seo ? {
          ...game.seo,
          description: game.description,
          controls: game.controls,
          author: game.author,
          title: game.title
        } : null}
      />
      {/* Modal "Signaler un problème" */}
      {reportOpen && (
        <div className="gamepage__report-overlay" onClick={() => setReportOpen(false)}>
          <div className="gamepage__report" onClick={e => e.stopPropagation()}>
            <h3 className="gamepage__report-title">Report a problem</h3>
            <p className="gamepage__report-text">What's wrong with {game.title}?</p>
            <div className="gamepage__report-options">
              {['Game won\u2019t load', 'Game freezes or crashes', 'Controls don\u2019t work', 'Inappropriate content', 'Other'].map(opt => (
                <button
                  key={opt}
                  className="gamepage__report-opt"
                  onClick={() => setReportOpen(false)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button className="gamepage__report-cancel" onClick={() => setReportOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />

    </div>
  )
}