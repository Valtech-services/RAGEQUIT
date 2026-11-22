import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from '../../i18n/locale'
import { useGames, useCategories } from '../../data/localized'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import {
  getPlayerBest, getPlayerName, setPlayerName, formatTime, getLeaderboard, countPlayers,
} from '../../data/leaderboardStore'
import usePageTitle from '../../hooks/usePageTitle'
import { useTranslation } from 'react-i18next'
import './LeaderboardPage.css'
import { track } from '../../lib/analytics'

/*
  LeaderboardPage
  - Sans jeu choisi : grille de tuiles (miniature 30 % + nom 70 %), filtres
    par catégorie et recherche. Les joueurs reconnaissent l'image du jeu
    plus facilement que son nom.
  - Jeu choisi (URL /leaderboard?game=<id>, lien direct depuis le bouton coupe
    des pages de jeu) : classement public du top 50, visible par tous.
  - Joueur connecté avec un score : sa place réelle parmi tous les joueurs est
    toujours affichée en haut ; s'il est dans le top 50, sa ligne est aussi
    mise en surbrillance dans le tableau.
  - Rage Hockey : mode survival uniquement, filtres difficulté × arène.
*/

const TOP_N = 50

// Noms d'affichage des monuments de Bird Blitz (les modes = ids de monuments).
const MONUMENT_NAMES = {
  eiffel: 'Eiffel Tower', bigben: 'Big Ben', liberty: 'Statue of Liberty',
  pyramid: 'Pyramids of Giza', taj: 'Taj Mahal', opera: 'Sydney Opera House',
  colosseum: 'Colosseum', christ: 'Christ the Redeemer', angkor: 'Angkor Wat',
  pagoda: 'Japanese Pagoda',
}

// Libellé lisible d'un mode, selon le jeu.
function modeLabel(m, t) {
  if (MONUMENT_NAMES[m]) return MONUMENT_NAMES[m]
  if (m === 'survival') return t('leaderboard.survival')
  if (m === 'classic')  return t('leaderboard.classic')
  // RAGE TAP : mobile-10s -> Mobile 10 s, desktop-60s -> Desktop 1 min
  const dev = /^(mobile|desktop)-(\d+)s$/.exec(m)
  if (dev) return (dev[1] === 'mobile' ? 'Mobile' : 'Desktop') + ' ' + (dev[2] === '60' ? '1 min' : dev[2] + ' s')
  return m.charAt(0).toUpperCase() + m.slice(1)
}

// Déclinaisons Rage Hockey survival
const RH_DIFFS = [
  { key: 'chill',  label: 'Chill'  },
  { key: 'normal', label: 'Normal' },
  { key: 'rage',   label: 'Rage'   },
]
const RH_ARENAS = [
  { key: 'normal', label: 'Classic' }, // dans le jeu, l'arène Classic a la clé "normal"
  { key: 'bumper', label: 'Bumper'  },
  { key: 'narrow', label: 'Narrow'  },
]

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' }

function TrophyIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
    </svg>
  )
}

/* ---------------------------------------------------------------------
   Grille de choix du jeu
   --------------------------------------------------------------------- */
function GamePicker({ games, categories, t }) {
  const [query, setQuery]       = useState('')
  const [category, setCategory] = useState('all')

  // Seules les catégories qui contiennent au moins un jeu sont proposées.
  const chips = useMemo(() => {
    const used = new Set(games.map(g => g.category))
    return categories.filter(c => c.id !== 'all' && used.has(c.id))
  }, [games, categories])

  const q = query.trim().toLowerCase()
  const visible = games.filter(g =>
    (category === 'all' || g.category === category) &&
    (!q || g.title.toLowerCase().includes(q))
  )
  const catLabel = (id) => chips.find(c => c.id === id)?.label || id

  return (
    <>
      <div className="lbpage__filters">
        <div className="lbpage__search-box">
          <svg className="lbpage__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
          </svg>
          <input
            className="lbpage__search-input"
            type="search"
            placeholder={t('leaderboard.searchGame')}
            aria-label={t('leaderboard.searchGame')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Escape' && setQuery('')}
          />
          {query && (
            <button className="lbpage__search-clear" onClick={() => setQuery('')} aria-label="Clear">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>

        <div className="lbpage__chips" role="tablist">
          {[{ id: 'all', label: t('leaderboard.allGames') }, ...chips].map(c => (
            <button key={c.id} role="tab" aria-selected={category === c.id}
              className={`lbpage__chip ${category === c.id ? 'is-active' : ''}`}
              onClick={() => { setCategory(c.id); track('leaderboard_category', { category: c.id }) }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <p className="lbpage__hint">{t('leaderboard.selectGame')}</p>

      {visible.length === 0 ? (
        <div className="lbpage__placeholder"><p>{t('leaderboard.noGameFound')}</p></div>
      ) : (
        <ul className="lbpage__tiles">
          {visible.map(g => (
            <li key={g.id}>
              <Link to={`/leaderboard?game=${g.id}`} className="lbpage__tile"
                onClick={() => track('leaderboard_game_select', { game_id: g.id })}>
                <span className="lbpage__tile-thumb">
                  <img src={g.thumbnail} alt="" loading="lazy" width="120" height="120" />
                </span>
                <span className="lbpage__tile-body">
                  <span className="lbpage__tile-name">{g.title}</span>
                  <span className="lbpage__tile-cat">{catLabel(g.category)}</span>
                </span>
                <span className="lbpage__tile-icon"><TrophyIcon size={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

/* ---------------------------------------------------------------------
   Classement d'un jeu
   --------------------------------------------------------------------- */
function GameBoard({ game, t }) {
  const { user, profile } = useAuth()
  const isRageHockey = game.id === 'rage-hockey'
  const gameModes    = game.modes || ['classic']

  const [mode, setMode]             = useState(isRageHockey ? 'survival' : (game.defaultMode || 'classic'))
  const [difficulty, setDifficulty] = useState('normal') // Rage Hockey
  const [arena, setArena]           = useState('normal') // Rage Hockey
  const [rows, setRows]             = useState([])
  const [playerRow, setPlayerRow]   = useState(null)
  const [total, setTotal]           = useState(null)
  const [loading, setLoading]       = useState(true)

  const userId = user?.id || null

  const loadData = useCallback(async () => {
    setLoading(true)
    const diff = isRageHockey ? difficulty : null
    const arn  = isRageHockey ? arena : null
    const [lb, best, count] = await Promise.all([
      getLeaderboard(game.id, mode, TOP_N, diff, arn),
      userId ? getPlayerBest(game.id, mode, diff, arn) : Promise.resolve(null),
      countPlayers(game.id, mode, diff, arn),
    ])
    setRows(lb)
    setPlayerRow(best)
    setTotal(count)
    setLoading(false)
  }, [game.id, mode, difficulty, arena, isRageHockey, userId])

  useEffect(() => { loadData() }, [loadData])
  useEffect(() => {
    window.addEventListener('rh-score-saved', loadData)
    return () => window.removeEventListener('rh-score-saved', loadData)
  }, [loadData])

  const formatScore = (row) => {
    if (!row) return '—'
    if (row.scoreLabel) return row.scoreLabel
    return mode === 'survival' ? formatTime(row.score) : row.score + ' pts'
  }

  const openAuthDrawer = () => {
    track('leaderboard_signin_click')
    window.dispatchEvent(new CustomEvent('rq-open-auth'))
  }

  // Ligne du joueur dans le top affiché (null s'il n'y figure pas).
  const myRow = userId ? rows.find(r => r.userId === userId) : null
  // Rang affiché en haut : celui du tableau s'il y est (même règle de calcul),
  // sinon le rang réel parmi tous les joueurs.
  const myRank   = myRow?.rank ?? playerRow?.rank
  const myName   = myRow?.name || profile?.username || getPlayerName() || t('leaderboard.you')
  const hasScore = Boolean(myRow || playerRow)
  const inTop    = Boolean(myRow)

  return (
    <div className="lbpage__boardwrap">
      {/* EN-TÊTE DU JEU */}
      <div className="lbpage__gamehead">
        <Link to="/leaderboard" className="lbpage__back" aria-label={t('leaderboard.allGames')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <span>{t('leaderboard.allGames')}</span>
        </Link>
        <div className="lbpage__gamehead-main">
          <span className="lbpage__gamehead-thumb">
            <img src={game.thumbnail} alt={game.title} width="120" height="120" />
          </span>
          <div className="lbpage__gamehead-info">
            <h2 className="lbpage__gamehead-title">{game.title}</h2>
            <span className="lbpage__gamehead-meta">
              {total != null
                ? t('leaderboard.playersCount', { n: total.toLocaleString() })
                : t('leaderboard.topN', { n: TOP_N })}
            </span>
          </div>
          <Link to={`/game/${game.id}`} className="lbpage__play-btn"
            onClick={() => track('leaderboard_play_click', { game_id: game.id })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            <span>{t('leaderboard.play')}</span>
          </Link>
        </div>
      </div>

      {/* MODES */}
      {isRageHockey ? (
        <>
          <div className="lbpage__mode-tabs">
            {RH_DIFFS.map(d => (
              <button key={d.key}
                className={`lbpage__mode-tab ${difficulty === d.key ? 'is-active' : ''}`}
                onClick={() => { track('leaderboard_diff_change', { game_id: game.id, props: { difficulty: d.key } }); setDifficulty(d.key) }}>
                {d.label}
              </button>
            ))}
          </div>
          <div className="lbpage__mode-tabs">
            {RH_ARENAS.map(a => (
              <button key={a.key}
                className={`lbpage__mode-tab ${arena === a.key ? 'is-active' : ''}`}
                onClick={() => { track('leaderboard_arena_change', { game_id: game.id, props: { arena: a.key } }); setArena(a.key) }}>
                {a.label}
              </button>
            ))}
          </div>
        </>
      ) : gameModes.length > 1 && (
        <div className="lbpage__mode-tabs">
          {gameModes.map(m => (
            <button key={m}
              className={`lbpage__mode-tab ${mode === m ? 'is-active' : ''}`}
              onClick={() => { track('leaderboard_mode_change', { game_id: game.id, props: { mode: m } }); setMode(m) }}>
              {modeLabel(m, t)}
            </button>
          ))}
        </div>
      )}

      <div className="lbpage__board">
        {/* PLACE DU JOUEUR — toujours au-dessus du tableau */}
        {!userId ? (
          <div className="lbpage__me lbpage__me--guest">
            <span className="lbpage__me-text">{t('leaderboard.signInPrompt')}</span>
            <button className="lbpage__cta-btn" onClick={openAuthDrawer}>{t('leaderboard.signIn')}</button>
          </div>
        ) : loading ? (
          <div className="lbpage__me lbpage__me--empty">
            <span className="lbpage__me-badge">{t('leaderboard.you')}</span>
            <span className="lbpage__me-text">{t('leaderboard.loading')}</span>
          </div>
        ) : hasScore ? (
          <div className={`lbpage__me ${inTop ? 'lbpage__me--top' : ''}`}>
            <span className="lbpage__me-badge">{t('leaderboard.you')}</span>
            <span className="lbpage__me-rank">#{myRank}</span>
            <span className="lbpage__me-main">
              <span className="lbpage__me-name">{myName}</span>
              <span className="lbpage__me-sub">
                {inTop
                  ? t('leaderboard.inTop', { n: TOP_N })
                  : total
                    ? t('leaderboard.rankOf', { rank: myRank, total: total.toLocaleString() })
                    : t('leaderboard.outOfTop', { n: TOP_N })}
              </span>
            </span>
            <span className="lbpage__me-score">{formatScore(myRow || playerRow)}</span>
          </div>
        ) : (
          <div className="lbpage__me lbpage__me--empty">
            <span className="lbpage__me-badge">{t('leaderboard.you')}</span>
            <span className="lbpage__me-text">{t('leaderboard.noScoreYet')}</span>
            <Link to={`/game/${game.id}`} className="lbpage__cta-link">
              {t('leaderboard.playGame', { game: game.title })}
            </Link>
          </div>
        )}

        {/* TOP 50 — visible par tous, connecté ou non */}
        {loading ? (
          <div className="lbpage__loading">{t('leaderboard.loading')}</div>
        ) : rows.length === 0 ? (
          <div className="lbpage__empty">
            <p>{t('leaderboard.noScores', { game: game.title })}</p>
            <Link to={`/game/${game.id}`} className="lbpage__play-link">{t('leaderboard.beFirst')}</Link>
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
              {rows.map(row => {
                const isMe = userId && row.userId === userId
                const top  = row.rank <= 3 ? `lbpage__tr--top${row.rank}` : ''
                return (
                  <tr key={row.userId || row.rank + row.name}
                    className={`lbpage__tr ${top} ${isMe ? 'is-me' : ''}`}
                    aria-current={isMe ? 'true' : undefined}>
                    <td className="lbpage__td lbpage__td--rank">
                      {MEDALS[row.rank]
                        ? <span className="lbpage__medal">{MEDALS[row.rank]}</span>
                        : <span className="lbpage__rank-num">{row.rank}</span>}
                    </td>
                    <td className="lbpage__td lbpage__td--name">
                      <span className="lbpage__name">{row.name || 'Anonymous'}</span>
                      {isMe && <span className="lbpage__me-tag">{t('leaderboard.you')}</span>}
                    </td>
                    <td className="lbpage__td lbpage__td--score">{formatScore(row)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        {!loading && rows.length > 0 && (
          <p className="lbpage__note">{t('leaderboard.topN', { n: TOP_N })}</p>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------
   Page
   --------------------------------------------------------------------- */
export default function LeaderboardPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const games      = useGames()
  const categories = useCategories()
  const [params]   = useSearchParams()
  const [name, setName] = useState(getPlayerName)

  usePageTitle(t('leaderboard.title'))
  useEffect(() => { track('leaderboard_view') }, [])

  const gameId = params.get('game')
  const game   = gameId ? games.find(g => g.id === gameId) : null

  // Revenir en haut quand on passe de la grille à un classement (et inversement).
  useEffect(() => { try { window.scrollTo({ top: 0 }) } catch (e) {} }, [gameId])

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

      <div className={`lbpage__content ${game ? '' : 'lbpage__content--wide'}`}>
        {game
          ? <GameBoard key={game.id} game={game} t={t} />
          : <GamePicker games={games} categories={categories} t={t} />}

        {!user && (
          <div className="lbpage__nickname">
            <label className="lbpage__nickname-label" htmlFor="lb-nickname">{t('leaderboard.nicknameLabel')}</label>
            <div className="lbpage__nickname-row">
              <input id="lb-nickname" className="lbpage__nickname-input" value={name} maxLength={16}
                placeholder={t('leaderboard.nicknamePlaceholder')}
                onChange={e => setName(e.target.value)} />
              <button className="lbpage__nickname-save" onClick={() => setPlayerName(name)}>{t('leaderboard.save')}</button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
