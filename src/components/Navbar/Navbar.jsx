import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { games, categories } from '../../data/games'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

/*
  Navbar — deux modes :
  - standalone : barre horizontale (pages intérieures)
  - inGrid : cellule very-small de la grille (logo haut, 3 icônes bas)
  Le logo affiché est TOUJOURS l'icône RQ.
  Le drawer profil gère l'authentification Supabase (email + Google).
*/
export default function Navbar({ title, inGrid = false }) {
  const [searchOpen, setSearchOpen]   = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [query, setQuery]             = useState('')
  const navigate = useNavigate()

  // Auth
  const { user, profile, signUpEmail, signInEmail, signInGoogle, signOut } = useAuth()
  const [authTab, setAuthTab]   = useState('signup')   // 'signup' | 'login'
  const [authEmail, setAuthEmail]       = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authUsername, setAuthUsername] = useState('')
  const [authError, setAuthError]   = useState('')
  const [authBusy, setAuthBusy]     = useState(false)
  const [authNotice, setAuthNotice] = useState('')

  const gameCategories = categories.filter(c => c.id !== 'all')
  const results = query.length > 1
    ? games.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : []
  const popular = games.filter(g => g.shimmer || g.isNew).slice(0, 12)
  const recent  = games.slice(0, 4)

  const closeAll = () => { setSearchOpen(false); setProfileOpen(false); setQuery('') }
  const resetAuthFields = () => {
    setAuthEmail(''); setAuthPassword(''); setAuthUsername('')
    setAuthError(''); setAuthNotice('')
  }

  /* ---- Soumission email (signup ou login selon l'onglet) ---- */
  async function handleEmailSubmit() {
    setAuthError(''); setAuthNotice('')
    if (!authEmail || !authPassword) {
      setAuthError('Email and password are required.')
      return
    }
    if (authTab === 'signup' && !authUsername.trim()) {
      setAuthError('Please choose a username.')
      return
    }
    setAuthBusy(true)
    try {
      if (authTab === 'signup') {
        const { error } = await signUpEmail({
          email: authEmail,
          password: authPassword,
          username: authUsername.trim(),
        })
        if (error) { setAuthError(error.message); return }
        setAuthNotice('Account created. You can now play and save your scores.')
        resetAuthFields()
        setProfileOpen(false)
      } else {
        const { error } = await signInEmail({ email: authEmail, password: authPassword })
        if (error) { setAuthError(error.message); return }
        resetAuthFields()
        setProfileOpen(false)
      }
    } finally {
      setAuthBusy(false)
    }
  }

  async function handleGoogle() {
    setAuthError('')
    const { error } = await signInGoogle()
    if (error) setAuthError(error.message)
    // La redirection OAuth prend le relais ; rien à faire de plus ici.
  }

  return (
    <>
      <div className={`navbar__brand-tile ${inGrid ? 'navbar--in-grid' : 'navbar--standalone'}`}>
        <Link to="/" className="navbar__logo" aria-label="Ragequit Arcade">
          <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" className="navbar__logo-wordmark" />
          <img src="/ragequit-icon-white.png" alt="RQ" className="navbar__logo-icon" />
        </Link>

        {title && !inGrid && (
          <span className="navbar__title">{title}</span>
        )}

        <div className="navbar__actions">
          <Link className="navbar__btn" aria-label="Leaderboard" to="/leaderboard">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 18.9V21H7v2h10v-2h-4v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
            </svg>
          </Link>
          <button className="navbar__btn" aria-label="Profile"
            onClick={() => { setProfileOpen(true); setSearchOpen(false) }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </button>
          <button className="navbar__btn" aria-label="Search"
            onClick={() => { setSearchOpen(true); setProfileOpen(false) }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
      </div>

      {createPortal(
        <>
      {/* ============================================================
          DRAWER RECHERCHE
          ============================================================ */}
      {searchOpen && (
        <div className="nb-drawer nb-drawer--search">
          <div className="nb-drawer__inner">

            <div className="nb-drawer__searchbar">
              <button className="nb-drawer__back" onClick={closeAll} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </button>
              <input
                className="nb-drawer__search-input"
                placeholder="What are you playing today?"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
              <span className="nb-drawer__search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </span>
            </div>

            <div className="nb-drawer__chips">
              {gameCategories.map(cat => (
                <button key={cat.id} className="nb-drawer__chip"
                  onClick={() => { navigate(`/category/${cat.id}`); setSearchOpen(false) }}>
                  {cat.label} Games
                </button>
              ))}
            </div>

            {results.length > 0 ? (
              <div className="nb-drawer__section">
                <h3 className="nb-drawer__section-title">Results</h3>
                <div className="nb-drawer__results">
                  {results.map(game => (
                    <Link key={game.id} to={`/game/${game.id}`} className="nb-drawer__result"
                      onClick={() => { setSearchOpen(false); setQuery('') }}>
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
                  <h3 className="nb-drawer__section-title">Recently played</h3>
                  <div className="nb-drawer__game-row">
                    {recent.map(game => (
                      <Link key={game.id} to={`/game/${game.id}`} className="nb-drawer__game-thumb" onClick={() => setSearchOpen(false)}>
                        <img src={game.thumbnail} alt={game.title} />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="nb-drawer__section">
                  <h3 className="nb-drawer__section-title">Popular this week</h3>
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

      {/* ============================================================
          DRAWER PROFIL / CONNEXION
          ============================================================ */}
      {profileOpen && (
        <div className="nb-drawer nb-drawer--auth">
          <div className="nb-drawer__inner">

            <div className="nb-drawer__head">
              <button className="nb-drawer__back" onClick={() => setProfileOpen(false)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </button>
              <div className="nb-drawer__auth-logo">
                <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" className="nb-drawer__auth-logo-img" />
              </div>
              <span className="nb-drawer__head-spacer" />
            </div>

            {user ? (
              /* ---- ÉTAT CONNECTÉ : profil + déconnexion ---- */
              <div className="nb-drawer__account">
                <div className="nb-drawer__account-avatar">
                  {(profile?.username || user.email || '?').charAt(0).toUpperCase()}
                </div>
                <h2 className="nb-drawer__auth-title">
                  {profile?.username || 'Player'}
                </h2>
                <p className="nb-drawer__account-email">{user.email}</p>
                <Link
                  to="/leaderboard"
                  className="nb-drawer__provider"
                  onClick={() => setProfileOpen(false)}
                >
                  View leaderboard
                </Link>
                <button
                  className="nb-drawer__provider nb-drawer__provider--primary"
                  onClick={async () => { await signOut(); setProfileOpen(false) }}
                >
                  Log out
                </button>
              </div>
            ) : (
              /* ---- ÉTAT DÉCONNECTÉ : formulaire signup / login ---- */
              <>
                <div className="nb-drawer__tabs">
                  <button
                    className={`nb-drawer__tab ${authTab === 'signup' ? 'nb-drawer__tab--active' : ''}`}
                    onClick={() => { setAuthTab('signup'); setAuthError(''); setAuthNotice('') }}
                  >Sign up</button>
                  <button
                    className={`nb-drawer__tab ${authTab === 'login' ? 'nb-drawer__tab--active' : ''}`}
                    onClick={() => { setAuthTab('login'); setAuthError(''); setAuthNotice('') }}
                  >Log in</button>
                </div>

                <h2 className="nb-drawer__auth-title">
                  {authTab === 'signup' ? 'Create your account' : 'Welcome back'}
                </h2>

                {/* Bouton Google */}
                <div className="nb-drawer__providers">
                  <button className="nb-drawer__provider" onClick={handleGoogle}>
                    <span className="nb-drawer__provider-icon nb-drawer__provider-icon--g">G</span>
                    Continue with Google
                  </button>
                </div>

                <div className="nb-drawer__divider"><span>or</span></div>

                {/* Formulaire email */}
                <div className="nb-drawer__form">
                  {authTab === 'signup' && (
                    <input
                      className="nb-drawer__input"
                      type="text"
                      placeholder="Username"
                      value={authUsername}
                      onChange={e => setAuthUsername(e.target.value)}
                      autoComplete="username"
                    />
                  )}
                  <input
                    className="nb-drawer__input"
                    type="email"
                    placeholder="Email"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <input
                    className="nb-drawer__input"
                    type="password"
                    placeholder="Password"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    autoComplete={authTab === 'signup' ? 'new-password' : 'current-password'}
                  />

                  {authError && <p className="nb-drawer__auth-error">{authError}</p>}
                  {authNotice && <p className="nb-drawer__auth-notice">{authNotice}</p>}

                  <button
                    className="nb-drawer__provider nb-drawer__provider--primary"
                    onClick={handleEmailSubmit}
                    disabled={authBusy}
                  >
                    {authBusy
                      ? 'Please wait…'
                      : (authTab === 'signup' ? 'Create account' : 'Log in')}
                  </button>
                </div>

                <p className="nb-drawer__auth-legal">
                  By continuing you agree to our Terms of Use and acknowledge our Privacy Policy.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {(searchOpen || profileOpen) && (
        <div className="nb-overlay" onClick={closeAll} />
      )}
        </>,
        document.body
      )}
    </>
  )
}
