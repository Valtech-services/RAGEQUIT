import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { games } from '../../data/games'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import {
  getPlayerBest, getPlayerName, setPlayerName, formatTime, getLeaderboard,
} from '../../data/leaderboardStore'
import './LeaderboardPage.css'

const GAME_LIST = games.map(g => ({
  id: g.id,
  label: g.title,
  modes: g.id === 'rage-hockey' ? ['survival', 'classic'] : ['classic'],
  defaultMode: g.id === 'rage-hockey' ? 'survival' : 'classic',
}))

export default function LeaderboardPage() {
  const [query, setQuery]       = useState('')
  const [gameId, setGameId]     = useState(GAME_LIST[0].id)
  const [mode, setMode]         = useState(GAME_LIST[0].defaultMode)
  const [name, setName]         = useState(getPlayerName())
  const [rows, setRows]         = useState([])
  const [playerRow, setPlayerRow] = useState(null)

  const game = GAME_LIST.find(g => g.id === gameId) || GAME_LIST[0]

  // Suggestions de recherche filtrées en temps réel
  const suggestions = query.trim().length > 0
    ? GAME_LIST.filter(g => g.label.toLowerCase().startsWith(query.toLowerCase()))
    : []

  // Quand on change de jeu, reset le mode
  useEffect(() => { setMode(game.defaultMode) }, [gameId])

  // Charger le classement
  useEffect(() => {
    const load = () => {
      const lb = getLeaderboard(gameId, mode, 20)
      setRows(lb)
      const best = getPlayerBest(gameId, mode)
      setPlayerRow(best || null)
    }
    load()
    window.addEventListener('rh-score-saved', load)
    return () => window.removeEventListener('rh-score-saved', load)
  }, [gameId, mode])

  const handleSaveName = () => setPlayerName(name)

  const formatScore = (row) => {
    if (!row) return '—'
    return mode === 'survival' ? formatTime(row.score) : (row.score + ' pts')
  }

  const medalEmoji = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return null
  }

  return (
    <div className="lbpage">

      {/* ---- EN-TÊTE : navbar 1×1 + titre 2×1 ---- */}
      <div className="lbpage__header">
        <div className="lbpage__header-nav">
          <Navbar inGrid={true} />
        </div>
        <div className="lbpage__header-title">
          <h1 className="lbpage__header-h1">Leaderboard</h1>
        </div>
      </div>

      <div className="lbpage__content">

        {/* ---- RECHERCHE DE JEU ---- */}
        <div className="lbpage__search-wrap">
          <div className="lbpage__search-box">
            <svg className="lbpage__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
            <input
              className="lbpage__search-input"
              type="text"
              placeholder="Search a game…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Escape') setQuery('')
              }}
            />
            {query && (
              <button className="lbpage__search-clear" onClick={() => setQuery('')} aria-label="Clear">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>

          {/* Suggestions filtrées */}
          {suggestions.length > 0 && (
            <div className="lbpage__suggestions">
              {suggestions.map(g => (
                <button
                  key={g.id}
                  className={`lbpage__suggestion ${g.id === gameId ? 'is-active' : ''}`}
                  onClick={() => { setGameId(g.id); setQuery('') }}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {/* Jeu actuellement sélectionné */}
          <div className="lbpage__game-chips">
            {GAME_LIST.map(g => (
              <button
                key={g.id}
                className={`lbpage__chip ${g.id === gameId ? 'is-active' : ''}`}
                onClick={() => setGameId(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Onglets mode si plusieurs */}
          {game.modes.length > 1 && (
            <div className="lbpage__mode-tabs">
              {game.modes.map(m => (
                <button
                  key={m}
                  className={`lbpage__mode-tab ${mode === m ? 'is-active' : ''}`}
                  onClick={() => setMode(m)}
                >
                  {m === 'survival' ? 'Survival' : 'Classic'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---- TABLEAU ---- */}
        <div className="lbpage__board">

          {/* Rang du joueur connecté au-dessus du tableau */}
          {playerRow && (
            <div className="lbpage__player-rank">
              <span className="lbpage__player-rank-label">Your rank</span>
              <span className="lbpage__player-rank-num">
                #{playerRow.rank ?? '—'}
              </span>
              <span className="lbpage__player-rank-name">{getPlayerName() || 'You'}</span>
              <span className="lbpage__player-rank-score">{formatScore(playerRow)}</span>
              <Link to={`/game/${gameId}`} className="lbpage__player-rank-play">Play</Link>
            </div>
          )}

          {/* Tableau top 20 */}
          {rows.length === 0 ? (
            <div className="lbpage__empty">
              <p>No scores yet for {game.label}.</p>
              <Link to={`/game/${gameId}`} className="lbpage__play-link">Be the first to play →</Link>
            </div>
          ) : (
            <table className="lbpage__table">
              <thead>
                <tr>
                  <th className="lbpage__th lbpage__th--rank">#</th>
                  <th className="lbpage__th lbpage__th--name">Player</th>
                  <th className="lbpage__th lbpage__th--score">Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const rank = i + 1
                  const medal = medalEmoji(rank)
                  const isTop3 = rank <= 3
                  return (
                    <tr key={i} className={`lbpage__tr ${isTop3 ? `lbpage__tr--top${rank}` : ''}`}>
                      <td className="lbpage__td lbpage__td--rank">
                        {medal ? (
                          <span className="lbpage__medal">{medal}</span>
                        ) : (
                          <span className="lbpage__rank-num">{rank}</span>
                        )}
                      </td>
                      <td className="lbpage__td lbpage__td--name">
                        {row.name || 'Anonymous'}
                      </td>
                      <td className="lbpage__td lbpage__td--score">
                        {formatScore(row)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          <p className="lbpage__note">
            Scores stored locally. Global leaderboard coming soon.
          </p>
        </div>

        {/* ---- PSEUDO ---- */}
        <div className="lbpage__nickname">
          <label className="lbpage__nickname-label">Your nickname</label>
          <div className="lbpage__nickname-row">
            <input
              className="lbpage__nickname-input"
              value={name}
              maxLength={16}
              placeholder="Choose a nickname"
              onChange={e => setName(e.target.value)}
            />
            <button className="lbpage__nickname-save" onClick={handleSaveName}>Save</button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
