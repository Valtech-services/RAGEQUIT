import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { games } from '../../data/games'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getPlayerBest, getPlayerName, setPlayerName, formatTime, getLeaderboard } from '../../data/leaderboardStore'
import usePageTitle from '../../hooks/usePageTitle'
import './LeaderboardPage.css'
import { track } from '../../lib/analytics'

/*
  LeaderboardPage — structure :
  - Header : navbar 1×1 + titre 2×1
  - Recherche temps réel filtrée sur games.js (tape "rag..." → suggestions)
  - Onglets mode si le jeu sélectionné en a plusieurs
  - Rang du joueur (connecté → Supabase, anonyme → localStorage) au-dessus du tableau
  - Top 20 avec médailles 🥇🥈🥉
  - Si aucun jeu sélectionné → rien n'est affiché
  - Si pas de data → message vide
*/
export default function LeaderboardPage() {
  const [query, setQuery]       = useState('')
  const [gameId, setGameId]     = useState(null)   // null = aucun jeu sélectionné
  const [mode, setMode]         = useState('classic')
  const [rows, setRows]         = useState([])
  const [playerRow, setPlayerRow] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [user, setUser]         = useState(null)
  const [name, setName]         = useState(getPlayerName())

  usePageTitle('Leaderboard')

  // Jeu sélectionné
  const game = gameId ? games.find(g => g.id === gameId) : null
  const gameModes = game?.modes || ['classic']
  const defaultMode = game?.defaultMode || 'classic'

  // Track page vue leaderboard
  useEffect(() => { track('leaderboard_view') }, [])

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Reset mode quand on change de jeu
  useEffect(() => { if (game) setMode(defaultMode) }, [gameId])

  // Charger le classement
  const loadData = useCallback(async () => {
    if (!gameId) { setRows([]); setPlayerRow(null); return }
    setLoading(true)
    const [lb, best] = await Promise.all([
      getLeaderboard(gameId, mode, 20),
      getPlayerBest(gameId, mode),
    ])
    setRows(lb)
    setPlayerRow(best)
    setLoading(false)
  }, [gameId, mode])

  useEffect(() => { loadData() }, [loadData])
  useEffect(() => {
    window.addEventListener('rh-score-saved', loadData)
    return () => window.removeEventListener('rh-score-saved', loadData)
  }, [loadData])

  // Recherche filtrée
  const suggestions = query.trim().length > 0
    ? games.filter(g => g.title.toLowerCase().startsWith(query.toLowerCase()))
    : []

  const selectGame = (id) => { track('leaderboard_game_select', { game_id: id }); setGameId(id); setQuery('') }
  const handleSaveName = () => setPlayerName(name)

  const formatScore = (row) => {
    if (!row) return '—'
    if (row.scoreLabel) return row.scoreLabel
    return mode === 'survival' ? formatTime(row.score) : row.score + ' pts'
  }

  const openAuthDrawer = () => {
    track('leaderboard_signin_click')
    window.dispatchEvent(new CustomEvent('rq-open-auth'))
  }

  return (
    <div className="lbpage">

      {/* EN-TÊTE : navbar 1×1 + titre 2×1 */}
      <div className="lbpage__header">
        <div className="lbpage__header-nav">
          <Navbar inGrid={true} />
        </div>
        <div className="lbpage__header-title">
          <h1 className="lbpage__header-h1">Leaderboard</h1>
        </div>
      </div>

      <div className="lbpage__content">

        {/* RECHERCHE */}
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
              onKeyDown={e => e.key === 'Escape' && setQuery('')}
            />
            {query && (
              <button className="lbpage__search-clear" onClick={() => setQuery('')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="lbpage__suggestions">
              {suggestions.map(g => (
                <button key={g.id} className={`lbpage__suggestion ${g.id === gameId ? 'is-active' : ''}`}
                  onClick={() => selectGame(g.id)}>
                  {g.title}
                </button>
              ))}
            </div>
          )}

          {/* Onglets mode — seulement si le jeu a plusieurs modes */}
          {game && gameModes.length > 1 && (
            <div className="lbpage__mode-tabs">
              {gameModes.map(m => (
                <button key={m}
                  className={`lbpage__mode-tab ${mode === m ? 'is-active' : ''}`}
                  onClick={() => { track('leaderboard_mode_change', { game_id: gameId, props: { mode: m } }); setMode(m) }}>
                  {m === 'survival' ? 'Survival' : 'Classic'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CONTENU : affiché seulement si un jeu est sélectionné */}
        {!gameId ? (
          <div className="lbpage__placeholder">
            <p>Select a game to see its leaderboard.</p>
          </div>
        ) : (
          <div className="lbpage__board">

            {/* Rang du joueur — au-dessus du tableau */}
            {user ? (
              /* Connecté */
              playerRow ? (
                <div className="lbpage__player-rank lbpage__player-rank--connected">
                  <span className="lbpage__player-rank-badge">You</span>
                  <span className="lbpage__player-rank-num">#{playerRow.rank}</span>
                  <span className="lbpage__player-rank-name">{name || 'You'}</span>
                  <span className="lbpage__player-rank-score">{formatScore(playerRow)}</span>
                </div>
              ) : (
                /* Connecté mais jamais joué */
                <div className="lbpage__player-rank lbpage__player-rank--no-score">
                  <span className="lbpage__player-rank-badge">You</span>
                  <span className="lbpage__player-rank-empty">No score yet —</span>
                  <Link to={`/game/${gameId}`} className="lbpage__cta-link">
                    Play {game.title} →
                  </Link>
                </div>
              )
            ) : (
              /* Non connecté */
              <div className="lbpage__player-rank lbpage__player-rank--guest">
                <span className="lbpage__player-rank-empty">Sign in to save your scores &amp; track your rank</span>
                <button className="lbpage__cta-btn" onClick={openAuthDrawer}>
                  Sign in
                </button>
              </div>
            )}

            {/* Tableau top 20 */}
            {loading ? (
              <div className="lbpage__loading">Loading…</div>
            ) : rows.length === 0 ? (
              <div className="lbpage__empty">
                <p>No scores yet for {game.title}.</p>
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
                    const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
                    return (
                      <tr key={i} className={`lbpage__tr ${rank <= 3 ? `lbpage__tr--top${rank}` : ''}`}>
                        <td className="lbpage__td lbpage__td--rank">
                          {medals[rank]
                            ? <span className="lbpage__medal">{medals[rank]}</span>
                            : <span className="lbpage__rank-num">{rank}</span>
                          }
                        </td>
                        <td className="lbpage__td lbpage__td--name">{row.name || 'Anonymous'}</td>
                        <td className="lbpage__td lbpage__td--score">{formatScore(row)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}

            <p className="lbpage__note">Global leaderboard via Supabase.</p>
          </div>
        )}

        {/* PSEUDO (seulement si anonyme) */}
        {!user && (
          <div className="lbpage__nickname">
            <label className="lbpage__nickname-label">Your nickname (anonymous)</label>
            <div className="lbpage__nickname-row">
              <input className="lbpage__nickname-input" value={name} maxLength={16}
                placeholder="Choose a nickname"
                onChange={e => setName(e.target.value)} />
              <button className="lbpage__nickname-save" onClick={handleSaveName}>Save</button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}
