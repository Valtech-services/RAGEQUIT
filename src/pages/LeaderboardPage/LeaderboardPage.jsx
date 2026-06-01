import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
import Footer from '../../components/Footer/Footer'
import {
  getPlayerBest, getPlayerName, setPlayerName, formatTime, getLeaderboard,
} from '../../data/leaderboardStore'
import './LeaderboardPage.css'

const GAMES = [
  { id: 'rage-hockey', label: 'Rage Hockey', modes: ['survival', 'classic'], defaultMode: 'survival' },
  { id: 'staq',        label: 'STAQ',        modes: ['classic'],             defaultMode: 'classic'  },
]

export default function LeaderboardPage() {
  const [gameId, setGameId] = useState('rage-hockey')
  const [mode, setMode]     = useState('survival')
  const [name, setName]     = useState(getPlayerName())
  const [best, setBest]     = useState(null)
  const [podium, setPodium] = useState([])

  const game = GAMES.find(g => g.id === gameId)

  useEffect(() => { setMode(game.defaultMode) }, [gameId])

  useEffect(() => {
    const load = () => {
      setBest(getPlayerBest(gameId, mode))
      setPodium(getLeaderboard(gameId, mode, 3))
    }
    load()
    window.addEventListener('rh-score-saved', load)
    return () => window.removeEventListener('rh-score-saved', load)
  }, [gameId, mode])

  const handleNameSave = () => { setPlayerName(name); setName(getPlayerName()) }

  const bestLabel = () => {
    if (!best) return null
    return mode === 'survival' ? formatTime(best.score) : best.score + ' pts'
  }

  return (
    <div className="lbpage">
      <Navbar title="Leaderboard" />

      <div className="lbpage__content">

        {/* En-tête */}
        <div className="lbpage__intro">
          <span className="lbpage__eyebrow">Hall of Fame</span>
          <h1 className="lbpage__heading">World Rankings</h1>
          <p className="lbpage__sub">
            All-time best players across every Ragequit Arcade game. Beat the
            challenge, climb the ranks, put your name at the top.
          </p>
        </div>

        {/* Sélecteur de jeu */}
        <div className="lbpage__game-tabs">
          {GAMES.map(g => (
            <button
              key={g.id}
              className={`lbpage__game-tab ${gameId === g.id ? 'is-active' : ''}`}
              onClick={() => setGameId(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Layout 2 colonnes : podium+table à gauche, profil à droite */}
        <div className="lbpage__grid">

          {/* ---- Colonne principale ---- */}
          <div className="lbpage__main">

            {/* Podium top 3 */}
            {podium.length > 0 && (
              <div className="lbpage__podium">
                {/* Ordre visuel : 2 - 1 - 3 */}
                {[podium[1], podium[0], podium[2]].map((p, i) => {
                  if (!p) return <div key={i} className="lbpage__podium-slot lbpage__podium-slot--empty" />
                  const place = p.rank
                  return (
                    <div key={i} className={`lbpage__podium-slot lbpage__podium-slot--${place}`}>
                      <div className={`lbpage__podium-medal lbpage__podium-medal--${place}`}>
                        {place === 1 ? '👑' : place}
                      </div>
                      <span className="lbpage__podium-name">{p.name}</span>
                      <span className="lbpage__podium-score">{p.scoreLabel}</span>
                      <div className="lbpage__podium-bar" />
                    </div>
                  )
                })}
              </div>
            )}

            {/* Onglets de mode */}
            {game.modes.length > 1 && (
              <div className="lbpage__mode-tabs">
                {game.modes.map(m => (
                  <button
                    key={m}
                    className={`lbpage__mode-tab ${mode === m ? 'is-active' : ''}`}
                    onClick={() => setMode(m)}
                  >
                    {m === 'survival' ? 'Survival — longest time' : 'Classic — best score'}
                  </button>
                ))}
              </div>
            )}

            {/* Table complète */}
            <Leaderboard
              game={gameId}
              mode={mode}
              modes={game.modes}
              limit={100}
              showModeSwitch={false}
              showSearch={true}
              key={gameId + mode}
            />

            <p className="lbpage__note">
              Scores are currently stored on your device. A global online
              leaderboard is coming soon.
            </p>
          </div>

          {/* ---- Colonne profil ---- */}
          <aside className="lbpage__aside">
            <div className="lbpage__player-card">
              <span className="lbpage__card-title">Your profile</span>

              <label className="lbpage__label">Your nickname</label>
              <div className="lbpage__name-row">
                <input
                  className="lbpage__input"
                  value={name}
                  maxLength={16}
                  placeholder="Choose a nickname"
                  onChange={e => setName(e.target.value)}
                />
                <button className="lbpage__save" onClick={handleNameSave}>Save</button>
              </div>

              <div className="lbpage__best-block">
                <label className="lbpage__label">
                  Your best · {game.label} · {mode}
                </label>
                {best ? (
                  <div className="lbpage__best-value">
                    <span className="lbpage__best-score">{bestLabel()}</span>
                    {best.rank && <span className="lbpage__best-rank">Rank #{best.rank}</span>}
                  </div>
                ) : (
                  <p className="lbpage__no-score">
                    No score yet.{' '}
                    <Link to={`/game/${gameId}`} className="lbpage__play-link">Play now</Link>
                  </p>
                )}
              </div>

              <Link to={`/game/${gameId}`} className="lbpage__cta">
                Play {game.label}
              </Link>
            </div>
          </aside>

        </div>
      </div>

      <Footer />
    </div>
  )
}