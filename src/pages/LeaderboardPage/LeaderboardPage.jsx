import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { games } from '../../data/games'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getPlayerBest, getPlayerName, setPlayerName, formatTime, getLeaderboard } from '../../data/leaderboardStore'
import usePageTitle from '../../hooks/usePageTitle'
import { useTranslation } from 'react-i18next'
import './LeaderboardPage.css'
import { track } from '../../lib/analytics'

/*
  LeaderboardPage
  - Recherche temps réel filtrée sur games.js
  - Cas spécial Rage Hockey : SEULEMENT le mode survival, décliné en
    3 difficultés (chill / normal / rage) × 3 arènes (normal / bumper / narrow)
  - Autres jeux : modes classiques inchangés
*/

// Déclinaisons Rage Hockey survival
const RH_DIFFS  = [
  { key: 'chill',  label: 'Chill'  },
  { key: 'normal', label: 'Normal' },
  { key: 'rage',   label: 'Rage'   },
]
const RH_ARENAS = [
  { key: 'normal', label: 'Classic' },  // dans le jeu, l'arène Classic a la clé "normal"
  { key: 'bumper', label: 'Bumper'  },
  { key: 'narrow', label: 'Narrow'  },
]

export default function LeaderboardPage() {
  const { t } = useTranslation()
  const [query, setQuery]         = useState('')
  const [gameId, setGameId]       = useState(null)
  const [mode, setMode]           = useState('classic')
  const [difficulty, setDifficulty] = useState('normal') // Rage Hockey
  const [arena, setArena]         = useState('normal')    // Rage Hockey
  const [rows, setRows]           = useState([])
  const [playerRow, setPlayerRow] = useState(null)
  const [loading, setLoading]     = useState(false)
  const [user, setUser]           = useState(null)
  const [name, setName]           = useState(getPlayerName())

  usePageTitle(t('leaderboard.title'))

  const game = gameId ? games.find(g => g.id === gameId) : null
  const isRageHockey = gameId === 'rage-hockey'
  const gameModes = game?.modes || ['classic']
  const defaultMode = game?.defaultMode || 'classic'

  useEffect(() => { track('leaderboard_view') }, [])

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Quand on change de jeu : Rage Hockey force survival, les autres prennent leur défaut
  useEffect(() => {
    if (!game) return
    if (gameId === 'rage-hockey') {
      setMode('survival')
      setDifficulty('normal')
      setArena('normal')
    } else {
      setMode(defaultMode)
    }
  }, [gameId])

  // Charger le classement (avec difficulté/arène uniquement pour Rage Hockey)
  const loadData = useCallback(async () => {
    if (!gameId) { setRows([]); setPlayerRow(null); return }
    setLoading(true)
    const diff  = isRageHockey ? difficulty : null
    const arn   = isRageHockey ? arena : null
    const [lb, best] = await Promise.all([
      getLeaderboard(gameId, mode, 20, diff, arn),
      getPlayerBest(gameId, mode, diff, arn),
    ])
    setRows(lb)
    setPlayerRow(best)
    setLoading(false)
  }, [gameId, mode, difficulty, arena, isRageHockey])

  useEffect(() => { loadData() }, [loadData])
  useEffect(() => {
    window.addEventListener('rh-score-saved', loadData)
    return () => window.removeEventListener('rh-score-saved', loadData)
  }, [loadData])

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

      <div className="lbpage__header">
        <div className="lbpage__header-nav">
          <Navbar inGrid={true} />
        </div>
        <div className="lbpage__header-title">
          <h1 className="lbpage__header-h1">{t('leaderboard.title')}</h1>
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
              placeholder={t('leaderboard.searchGame')}
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

          {/* Rage Hockey : pas d'onglet mode (survival forcé), mais filtres difficulté + arène */}
          {game && isRageHockey ? (
            <>
              <div className="lbpage__mode-tabs">
                {RH_DIFFS.map(d => (
                  <button key={d.key}
                    className={`lbpage__mode-tab ${difficulty === d.key ? 'is-active' : ''}`}
                    onClick={() => { track('leaderboard_diff_change', { game_id: gameId, props: { difficulty: d.key } }); setDifficulty(d.key) }}>
                    {d.label}
                  </button>
                ))}
              </div>
              <div className="lbpage__mode-tabs lbpage__arena-tabs">
                {RH_ARENAS.map(a => (
                  <button key={a.key}
                    className={`lbpage__mode-tab ${arena === a.key ? 'is-active' : ''}`}
                    onClick={() => { track('leaderboard_arena_change', { game_id: gameId, props: { arena: a.key } }); setArena(a.key) }}>
                    {a.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Autres jeux : onglets mode classiques si plusieurs modes */
            game && gameModes.length > 1 && (
              <div className="lbpage__mode-tabs">
                {gameModes.map(m => (
                  <button key={m}
                    className={`lbpage__mode-tab ${mode === m ? 'is-active' : ''}`}
                    onClick={() => { track('leaderboard_mode_change', { game_id: gameId, props: { mode: m } }); setMode(m) }}>
                    {m === 'survival' ? t('leaderboard.survival') : t('leaderboard.classic')}
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        {!gameId ? (
          <div className="lbpage__placeholder">
            <p>{t('leaderboard.selectGame')}</p>
          </div>
        ) : (
          <div className="lbpage__board">

            {/* Rang du joueur */}
            {user ? (
              playerRow ? (
                <div className="lbpage__player-rank lbpage__player-rank--connected">
                  <span className="lbpage__player-rank-badge">{t('leaderboard.you')}</span>
                  <span className="lbpage__player-rank-num">#{playerRow.rank}</span>
                  <span className="lbpage__player-rank-name">{name || t('leaderboard.you')}</span>
                  <span className="lbpage__player-rank-score">{formatScore(playerRow)}</span>
                </div>
              ) : (
                <div className="lbpage__player-rank lbpage__player-rank--no-score">
                  <span className="lbpage__player-rank-badge">{t('leaderboard.you')}</span>
                  <span className="lbpage__player-rank-empty">{t('leaderboard.noScoreYet')}</span>
                  <Link to={`/game/${gameId}`} className="lbpage__cta-link">
                    {t('leaderboard.playGame', { game: game.title })}
                  </Link>
                </div>
              )
            ) : (
              <div className="lbpage__player-rank lbpage__player-rank--guest">
                <span className="lbpage__player-rank-empty">{t('leaderboard.signInPrompt')}</span>
                <button className="lbpage__cta-btn" onClick={openAuthDrawer}>
                  {t('leaderboard.signIn')}
                </button>
              </div>
            )}

            {loading ? (
              <div className="lbpage__loading">{t('leaderboard.loading')}</div>
            ) : rows.length === 0 ? (
              <div className="lbpage__empty">
                <p>{t('leaderboard.noScores', { game: game.title })}</p>
                <Link to={`/game/${gameId}`} className="lbpage__play-link">{t('leaderboard.beFirst')}</Link>
              </div>
            ) : (
              <table className="lbpage__table">
                <thead>
                  <tr>
                    <th className="lbpage__th lbpage__th--rank">#</th>
                    <th className="lbpage__th lbpage__th--name">{t('leaderboard.player')}</th>
                    <th className="lbpage__th lbpage__th--score">{t('leaderboard.score')}</th>
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

            <p className="lbpage__note">{t('leaderboard.globalNote')}</p>
          </div>
        )}

        {!user && (
          <div className="lbpage__nickname">
            <label className="lbpage__nickname-label">{t('leaderboard.nicknameLabel')}</label>
            <div className="lbpage__nickname-row">
              <input className="lbpage__nickname-input" value={name} maxLength={16}
                placeholder={t('leaderboard.nicknamePlaceholder')}
                onChange={e => setName(e.target.value)} />
              <button className="lbpage__nickname-save" onClick={handleSaveName}>{t('leaderboard.save')}</button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}
