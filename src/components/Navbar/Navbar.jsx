import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { games, categories } from '../../data/games'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import './Navbar.css'
import { track } from '../../lib/analytics'

function getBadge(gamesPlayed = 0) {
  if (gamesPlayed >= 50) return { label: 'Rage Master', color: '#ff00ff' }
  if (gamesPlayed >= 20) return { label: 'Veteran',     color: '#8B5CF6' }
  if (gamesPlayed >= 5)  return { label: 'Gamer',       color: '#00d9ff' }
  if (gamesPlayed >= 1)  return { label: 'Player',      color: '#4ade80' }
  return                        { label: 'Newcomer',    color: '#aaaaaa' }
}
function flagEmoji(code) {
  if (!code || code.length !== 2) return ''
  return code.toUpperCase().replace(/./g, c => String.fromCodePoint(c.charCodeAt(0) + 127397))
}
function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
const COUNTRIES = [
  { code: 'FR', name: 'France' }, { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' }, { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' }, { code: 'IT', name: 'Italy' },
  { code: 'CA', name: 'Canada' }, { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' }, { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' }, { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' }, { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' }, { code: 'RU', name: 'Russia' },
  { code: 'SE', name: 'Sweden' }, { code: 'TR', name: 'Turkey' },
  { code: 'MA', name: 'Morocco' }, { code: 'DZ', name: 'Algeria' },
  { code: 'SN', name: 'Senegal' }, { code: 'CI', name: "Côte d'Ivoire" },
]

export default function Navbar({ title, inGrid = false }) {
  const { t } = useTranslation()
  const [searchOpen, setSearchOpen]   = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [query, setQuery]             = useState('')
  const navigate = useNavigate()

  const { user, profile, signUpEmail, signInEmail, signInGoogle, signOut, updateProfile } = useAuth()

  const [authTab, setAuthTab]           = useState('signup')
  const [authEmail, setAuthEmail]       = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authUsername, setAuthUsername] = useState('')
  const [authError, setAuthError]       = useState('')
  const [authBusy, setAuthBusy]         = useState(false)
  const [authNotice, setAuthNotice]     = useState('')

  const [editMode, setEditMode]         = useState(false)
  const [editUsername, setEditUsername] = useState('')   // ← NOUVEAU
  const [editCountry, setEditCountry]   = useState('')
  const [editFavorite, setEditFavorite] = useState('')
  const [editBusy, setEditBusy]         = useState(false)
  const [editError, setEditError]       = useState('')   // ← NOUVEAU

  /* Ouvre le drawer auth depuis LeaderboardPage */
  useEffect(() => {
    const handler = () => { setProfileOpen(true); setSearchOpen(false) }
    window.addEventListener('rq-open-auth', handler)
    return () => window.removeEventListener('rq-open-auth', handler)
  }, [])

  const gameCategories = categories.filter(c => c.id !== 'all')
  const results = query.length > 1
    ? games.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : []
  const popular = games.filter(g => g.shimmer || g.isNew).slice(0, 12)
  const recent  = games.slice(0, 4)

  const closeAll = () => { setSearchOpen(false); setProfileOpen(false); setQuery('') }
  const resetAuth = () => {
    setAuthEmail(''); setAuthPassword(''); setAuthUsername('')
    setAuthError(''); setAuthNotice('')
  }

  function openEdit() {
    setEditUsername(profile?.username || '')
    setEditCountry(profile?.country || '')
    setEditFavorite(profile?.favorite_game_id || '')
    setEditError('')
    setEditMode(true)
  }

  async function saveEdit() {
    if (!editUsername.trim()) { setEditError('Username cannot be empty.'); return }
    if (editUsername.trim().length < 3) { setEditError('Username must be at least 3 characters.'); return }
    setEditBusy(true)
    setEditError('')
    const { error } = await updateProfile({
      username: editUsername.trim(),
      country: editCountry || null,
      favorite_game_id: editFavorite || null,
    })
    setEditBusy(false)
    if (error) { setEditError(error.message || 'Failed to save.'); return }
    setEditMode(false)
  }

  async function handleEmailSubmit() {
    setAuthError(''); setAuthNotice('')
    if (!authEmail || !authPassword) { setAuthError('Email and password are required.'); return }
    if (authTab === 'signup' && !authUsername.trim()) { setAuthError('Please choose a username.'); return }
    setAuthBusy(true)
    try {
      if (authTab === 'signup') {
        const { error } = await signUpEmail({ email: authEmail, password: authPassword, username: authUsername.trim() })
        if (error) { setAuthError(error.message); return }
        setAuthNotice('Account created! You can now play and save your scores.')
        resetAuth(); setProfileOpen(false)
      } else {
        const { error } = await signInEmail({ email: authEmail, password: authPassword })
        if (error) { setAuthError(error.message); return }
        resetAuth(); setProfileOpen(false)
      }
    } finally { setAuthBusy(false) }
  }

  async function handleGoogle() {
    setAuthError('')
    const { error } = await signInGoogle()
    if (error) setAuthError(error.message)
  }

  const badge        = getBadge(profile?.games_played)
  const favoriteGame = games.find(g => g.id === profile?.favorite_game_id)

  return (
    <>
      <div className={`navbar__brand-tile ${inGrid ? 'navbar--in-grid' : 'navbar--standalone'}`}>
        <Link to="/" className="navbar__logo" aria-label="Ragequit Arcade">
          <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" className="navbar__logo-wordmark" />
          <img src="/ragequit-icon-white.png" alt="RQ" className="navbar__logo-icon" />
        </Link>
        {title && !inGrid && <span className="navbar__title">{title}</span>}
        <div className="navbar__actions">
          <Link className="navbar__btn" aria-label="Leaderboard" to="/leaderboard" onClick={() => track('navbar_leaderboard_click')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 18.9V21H7v2h10v-2h-4v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
            </svg>
          </Link>
          <button className="navbar__btn" aria-label="Profile"
            onClick={() => { setProfileOpen(true); setSearchOpen(false); track('navbar_profile_open') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </button>
          <button className="navbar__btn" aria-label="Search"
            onClick={() => { setSearchOpen(true); setProfileOpen(false); track('navbar_search_open') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
      </div>

      {createPortal(
        <>
        {/* DRAWER RECHERCHE */}
        {searchOpen && (
          <div className="nb-drawer nb-drawer--search">
            <div className="nb-drawer__inner">
              <div className="nb-drawer__searchbar">
                <button className="nb-drawer__back" onClick={closeAll} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                  </svg>
                </button>
                <input className="nb-drawer__search-input" placeholder={t('nav.searchPlaceholder')}
                  value={query} onChange={e => setQuery(e.target.value)} autoFocus />
                <span className="nb-drawer__search-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </span>
              </div>
              <div className="nb-drawer__chips">
                {gameCategories.map(cat => (
                  <button key={cat.id} className="nb-drawer__chip"
                    onClick={() => { track('category_click', { category: cat.id, source: 'navbar_drawer' }); navigate(`/category/${cat.id}`); setSearchOpen(false) }}>
                    {t(`categoryTitles.${cat.id}`)}
                  </button>
                ))}
              </div>
              {results.length > 0 ? (
                <div className="nb-drawer__section">
                  <h3 className="nb-drawer__section-title">{t('nav.results')}</h3>
                  <div className="nb-drawer__results">
                    {results.map(game => (
                      <Link key={game.id} to={`/game/${game.id}`} className="nb-drawer__result"
                        onClick={() => { track('search_result_click', { game_id: game.id, props: { query } }); setSearchOpen(false); setQuery('') }}>
                        <div className="nb-drawer__result-thumb">
                          <img src={game.thumbnail} alt={game.title} />
                        </div>
                        <div className="nb-drawer__result-info">
                          <span className="nb-drawer__result-title">{game.title}</span>
                          <span className="nb-drawer__result-cat">{game.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="nb-drawer__section">
                    <h3 className="nb-drawer__section-title">{t('nav.recentlyPlayed')}</h3>
                    <div className="nb-drawer__game-row">
                      {recent.map(game => (
                        <Link key={game.id} to={`/game/${game.id}`} className="nb-drawer__game-thumb" onClick={() => setSearchOpen(false)}>
                          <img src={game.thumbnail} alt={game.title} />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="nb-drawer__section">
                    <h3 className="nb-drawer__section-title">{t('nav.popularThisWeek')}</h3>
                    <div className="nb-drawer__game-grid">
                      {popular.map(game => (
                        <Link key={game.id} to={`/game/${game.id}`} className="nb-drawer__game-thumb" onClick={() => setSearchOpen(false)}>
                          <img src={game.thumbnail} alt={game.title} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* DRAWER PROFIL */}
        {profileOpen && (
          <div className="nb-drawer nb-drawer--auth">
            <div className="nb-drawer__inner">

              <div className="nb-drawer__head">
                <button className="nb-drawer__back"
                  onClick={() => { setProfileOpen(false); setEditMode(false) }} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                  </svg>
                </button>
                {/* Logo brut, pas de fond */}
                <Link to="/" className="nb-drawer__head-logo" onClick={closeAll}>
                  <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" />
                </Link>
                <span className="nb-drawer__head-spacer" />
              </div>

              {user ? (
                editMode ? (
                  /* ---- ÉDITION PROFIL ---- */
                  <div className="nb-drawer__edit">
                    <h2 className="nb-drawer__auth-title">{t('profile.editProfile')}</h2>

                    <label className="nb-drawer__field-label">{t('profile.username')}</label>
                    <input className="nb-drawer__input" type="text"
                      placeholder="Your username"
                      value={editUsername}
                      maxLength={20}
                      onChange={e => setEditUsername(e.target.value)} />

                    <label className="nb-drawer__field-label">{t('profile.country')}</label>
                    <select className="nb-drawer__input nb-drawer__select"
                      value={editCountry} onChange={e => setEditCountry(e.target.value)}>
                      <option value="">{t('profile.selectCountry')}</option>
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{flagEmoji(c.code)} {c.name}</option>
                      ))}
                    </select>

                    <label className="nb-drawer__field-label">{t('profile.favoriteGame')}</label>
                    <select className="nb-drawer__input nb-drawer__select"
                      value={editFavorite} onChange={e => setEditFavorite(e.target.value)}>
                      <option value="">{t('profile.selectGame')}</option>
                      {games.map(g => (
                        <option key={g.id} value={g.id}>{g.title}</option>
                      ))}
                    </select>

                    {editError && <p className="nb-drawer__auth-error">{editError}</p>}

                    <div className="nb-drawer__edit-actions">
                      <button className="nb-drawer__provider nb-drawer__provider--primary"
                        onClick={saveEdit} disabled={editBusy}>
                        {editBusy ? t('profile.saving') : t('profile.saveChanges')}
                      </button>
                      <button className="nb-drawer__provider" onClick={() => setEditMode(false)}>
                        {t('profile.cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ---- VUE PROFIL ---- */
                  <div className="nb-drawer__account">
                    <div className="nb-drawer__account-avatar">
                      {(profile?.username || user.email || '?').charAt(0).toUpperCase()}
                    </div>
                    <h2 className="nb-drawer__account-username">
                      {flagEmoji(profile?.country)} {profile?.username || t('profile.player')}
                    </h2>
                    <span className="nb-drawer__badge" style={{ '--badge-color': badge.color }}>
                      {badge.label}
                    </span>
                    <p className="nb-drawer__account-email">{user.email}</p>
                    <div className="nb-drawer__stats">
                      <div className="nb-drawer__stat">
                        <span className="nb-drawer__stat-value">{profile?.games_played ?? 0}</span>
                        <span className="nb-drawer__stat-label">{t('profile.gamesPlayed')}</span>
                      </div>
                      <div className="nb-drawer__stat">
                        <span className="nb-drawer__stat-value">🔥 {profile?.streak_days ?? 0}</span>
                        <span className="nb-drawer__stat-label">{t('profile.dayStreak')}</span>
                      </div>
                      <div className="nb-drawer__stat">
                        <span className="nb-drawer__stat-value">{formatDate(profile?.created_at)}</span>
                        <span className="nb-drawer__stat-label">{t('profile.memberSince')}</span>
                      </div>
                    </div>
                    {favoriteGame ? (
                      <div className="nb-drawer__favorite">
                        <span className="nb-drawer__favorite-label">{t('profile.favoriteGame')}</span>
                        <Link to={`/game/${favoriteGame.id}`} className="nb-drawer__favorite-game"
                          onClick={() => setProfileOpen(false)}>
                          <img src={favoriteGame.thumbnail} alt={favoriteGame.title} className="nb-drawer__favorite-thumb" />
                          <span className="nb-drawer__favorite-title">{favoriteGame.title}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0,opacity:0.5}}>
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      <div className="nb-drawer__favorite">
                        <span className="nb-drawer__favorite-label">{t('profile.favoriteGame')}</span>
                        <button className="nb-drawer__favorite-empty" onClick={openEdit}>
                          {t('profile.setFavorite')}
                        </button>
                      </div>
                    )}
                    <button className="nb-drawer__provider" onClick={openEdit}>Edit profile</button>
                    <Link to="/leaderboard" className="nb-drawer__provider"
                      onClick={() => setProfileOpen(false)}>{t('profile.viewLeaderboard')}</Link>
                    <button className="nb-drawer__provider nb-drawer__provider--danger"
                      onClick={async () => { await signOut(); setProfileOpen(false) }}>
                      {t('profile.logOut')}
                    </button>
                  </div>
                )
              ) : (
                <>
                  <div className="nb-drawer__tabs">
                    <button className={`nb-drawer__tab ${authTab === 'signup' ? 'nb-drawer__tab--active' : ''}`}
                      onClick={() => { setAuthTab('signup'); setAuthError(''); setAuthNotice('') }}>
                      {t('auth.signup')}
                    </button>
                    <button className={`nb-drawer__tab ${authTab === 'login' ? 'nb-drawer__tab--active' : ''}`}
                      onClick={() => { setAuthTab('login'); setAuthError(''); setAuthNotice('') }}>
                      {t('auth.login')}
                    </button>
                  </div>
                  <h2 className="nb-drawer__auth-title">
                    {authTab === 'signup' ? t('auth.createAccount') : t('auth.welcomeBack')}
                  </h2>
                  <div className="nb-drawer__providers">
                    <button className="nb-drawer__provider" onClick={handleGoogle}>
                      <svg className="nb-drawer__provider-icon" width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        <path fill="none" d="M0 0h48v48H0z"/>
                      </svg>
                      {t('auth.continueGoogle')}
                    </button>
                  </div>
                  <div className="nb-drawer__divider"><span>{t('auth.or')}</span></div>
                  <div className="nb-drawer__form">
                    {authTab === 'signup' && (
                      <input className="nb-drawer__input" type="text" placeholder={t('auth.username')}
                        value={authUsername} onChange={e => setAuthUsername(e.target.value)}
                        autoComplete="username" />
                    )}
                    <input className="nb-drawer__input" type="email" placeholder={t('auth.email')}
                      value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                      autoComplete="email" />
                    <input className="nb-drawer__input" type="password" placeholder={t('auth.password')}
                      value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                      autoComplete={authTab === 'signup' ? 'new-password' : 'current-password'} />
                    {authError  && <p className="nb-drawer__auth-error">{authError}</p>}
                    {authNotice && <p className="nb-drawer__auth-notice">{authNotice}</p>}
                    <button className="nb-drawer__provider nb-drawer__provider--primary"
                      onClick={handleEmailSubmit} disabled={authBusy}>
                      {authBusy ? t('auth.pleaseWait') : (authTab === 'signup' ? t('auth.createAccountBtn') : t('auth.loginBtn'))}
                    </button>
                  </div>
                  <p className="nb-drawer__auth-legal">
                    {t('auth.legal')}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {(searchOpen || profileOpen) && <div className="nb-overlay" onClick={closeAll} />}
        </>,
        document.body
      )}
    </>
  )
}
