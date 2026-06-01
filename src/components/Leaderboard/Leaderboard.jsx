import { useState, useEffect } from 'react'
import { getLeaderboard, getPlayerName } from '../../data/leaderboardStore'
import './Leaderboard.css'

/*
  Leaderboard — table de classement reutilisable.
  Props :
    - game    : identifiant du jeu ('rage-hockey', 'staq', ...)
    - mode    : mode initial ('survival' | 'classic')
    - modes   : liste des modes disponibles pour le selecteur
    - compact : version reduite (mini-classement sur la page de jeu)
    - limit   : nombre de lignes
    - showModeSwitch : affiche le selecteur de mode
*/
export default function Leaderboard({
  game = 'rage-hockey',
  mode: initialMode = 'classic',
  modes = ['classic'],
  compact = false,
  limit = 100,
  showModeSwitch = true,
  showSearch = false,
}) {
  const [mode, setMode] = useState(initialMode)
  const [rows, setRows] = useState([])
  const [query, setQuery] = useState('')
  const playerName = getPlayerName()

  useEffect(() => {
    const load = () => setRows(getLeaderboard(game, mode, limit))
    load()
    window.addEventListener('rh-score-saved', load)
    return () => window.removeEventListener('rh-score-saved', load)
  }, [game, mode, limit])

  const modeLabel = m => (m === 'survival' ? 'Survival' : 'Classic')
  const scoreHeader = mode === 'survival' ? 'Time' : 'Score'

  const filteredRows = query.trim()
    ? rows.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    : rows

  return (
    <div className={`lb ${compact ? 'lb--compact' : ''}`}>

      <div className="lb__head">
        <h3 className="lb__title">{compact ? 'Top players' : 'Leaderboard'}</h3>
        {showModeSwitch && modes.length > 1 && (
          <div className="lb__switch">
            {modes.map(m => (
              <button
                key={m}
                className={`lb__switch-btn ${mode === m ? 'is-active' : ''}`}
                onClick={() => setMode(m)}
              >
                {modeLabel(m)}
              </button>
            ))}
          </div>
        )}
      </div>

      {showSearch && (
        <div className="lb__search">
          <svg className="lb__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            className="lb__search-input"
            placeholder="Search a player..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      )}

      <div className="lb__table">
        <div className="lb__row lb__row--header">
          <span className="lb__cell lb__cell--rank">#</span>
          <span className="lb__cell lb__cell--name">Player</span>
          <span className="lb__cell lb__cell--diff">Mode</span>
          <span className="lb__cell lb__cell--score">{scoreHeader}</span>
        </div>

        {filteredRows.map(row => {
          const isYou = row.isLocal && row.name === (playerName || 'You')
          return (
            <div
              key={row.rank + '-' + row.name}
              className={`lb__row ${isYou ? 'lb__row--you' : ''} ${
                row.rank <= 3 ? 'lb__row--podium' : ''
              }`}
            >
              <span className="lb__cell lb__cell--rank">
                {row.rank <= 3 ? (
                  <span className={`lb__medal lb__medal--${row.rank}`}>
                    {row.rank}
                  </span>
                ) : (
                  row.rank
                )}
              </span>
              <span className="lb__cell lb__cell--name">
                {row.name}
                {isYou && <span className="lb__you-tag">YOU</span>}
              </span>
              <span className="lb__cell lb__cell--diff">
                <span className={`lb__diff lb__diff--${row.diff}`}>
                  {row.diff}
                </span>
              </span>
              <span className="lb__cell lb__cell--score">
                {row.scoreLabel}
              </span>
            </div>
          )
        })}

        {filteredRows.length === 0 && (
          <div className="lb__empty">
            {query.trim() ? 'No player found.' : 'No scores yet. Be the first.'}
          </div>
        )}
      </div>

    </div>
  )
}