import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import usePageTitle from '../../hooks/usePageTitle'
import './AdminPage.css'

const ADMIN_ID = '4340752c-bfae-492c-a61b-a9552ac8c908'

// ── Petits helpers ────────────────────────────────────────────────────
const fmt = n => (n ?? 0).toLocaleString()

function StatCard({ label, value, sub, color = '#00D9FF' }){
  return (
    <div className="admin-stat">
      <span className="admin-stat__value" style={{ color }}>{fmt(value)}</span>
      <span className="admin-stat__label">{label}</span>
      {sub && <span className="admin-stat__sub">{sub}</span>}
    </div>
  )
}

function Table({ title, cols, rows, emptyMsg = 'No data' }){
  return (
    <div className="admin-table-wrap">
      <h3 className="admin-section-title">{title}</h3>
      {rows.length === 0 ? (
        <p className="admin-empty">{emptyMsg}</p>
      ) : (
        <table className="admin-table">
          <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// ── LOGIN ─────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }){
  const { signInGoogle } = useAuth()
  const [busy, setBusy] = useState(false)
  const [err, setErr]   = useState('')

  async function handleGoogle(){
    setBusy(true); setErr('')
    const { error } = await signInGoogle()
    if(error){ setErr(error.message); setBusy(false) }
    // Si succès, AuthContext met à jour user → le parent re-render
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" />
        </div>
        <h1 className="admin-login__title">Admin Dashboard</h1>
        <p className="admin-login__sub">Sign in with your admin Google account</p>
        <button className="admin-login__btn" onClick={handleGoogle} disabled={busy}>
          <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {busy ? 'Connecting…' : 'Continue with Google'}
        </button>
        {err && <p className="admin-login__err">{err}</p>}
      </div>
    </div>
  )
}

// ── DASHBOARD ─────────────────────────────────────────────────────────
function AdminDashboard(){
  const [period, setPeriod] = useState(7)   // jours
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const since = new Date(Date.now() - period * 86400000).toISOString()

    // Toutes les requêtes en parallèle
    const [
      eventsRes, scoresRes, usersRes, messagesRes
    ] = await Promise.all([
      supabase.from('analytics_events').select('*').gte('created_at', since),
      supabase.from('scores').select('game_id, mode, score, created_at'),
      supabase.from('profiles').select('id, username, country, games_played, created_at'),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(20),
    ])

    const ev = eventsRes.data || []

    // Calculs dérivés
    const byEvent   = groupBy(ev, 'event')
    const byGame    = groupBy(ev.filter(e => e.game_id), 'game_id')
    const byCat     = groupBy(ev.filter(e => e.category), 'category')
    const byDevice  = groupBy(ev, 'device')
    const byCountry = groupBy(ev.filter(e => e.country), 'country')
    const searches  = ev.filter(e => e.event === 'navbar_search_open')
    const gameEnds  = ev.filter(e => e.event === 'game_end')
    const gameStarts= ev.filter(e => e.event === 'game_start')
    const adCompleted = ev.filter(e => e.event === 'ad_rewarded_complete')
    const footerClicks = ev.filter(e => e.event === 'footer_click')
    const socialClicks = ev.filter(e => e.event === 'social_click')
    const lbViews   = ev.filter(e => e.event === 'leaderboard_view')

    setData({
      ev, byEvent, byGame, byCat, byDevice, byCountry,
      searches, gameEnds, gameStarts, adCompleted,
      footerClicks, socialClicks, lbViews,
      scores: scoresRes.data || [],
      users:  usersRes.data  || [],
      messages: messagesRes.data || [],
    })
    setLoading(false)
  }, [period])

  useEffect(() => { load() }, [load])

  if(loading) return <div className="admin-loading">Loading analytics…</div>
  if(!data)   return <div className="admin-loading">No data.</div>

  const { ev, byGame, byCat, byDevice, byCountry,
          searches, gameEnds, gameStarts, adCompleted,
          footerClicks, socialClicks, lbViews,
          scores, users, messages } = data

  // Top jeux cliqués
  const topGames = sortDesc(byGame).slice(0, 10)

  // Top catégories
  const topCats = sortDesc(byCat).slice(0, 10)

  // Devices
  const deviceRows = sortDesc(byDevice).map(([d, n]) => [d || '—', fmt(n), pct(n, ev.length)])

  // Pays top 10
  const countryRows = sortDesc(byCountry).slice(0, 10)
    .map(([c, n]) => [c, fmt(n), pct(n, ev.length)])

  // Footer clics par lien
  const footerByLabel = groupBy(
    footerClicks.map(e => ({ k: e.props?.label || '—' })), 'k'
  )
  const footerRows = sortDesc(footerByLabel).map(([l, n]) => [l, fmt(n)])

  // Social clics
  const socialByNet = groupBy(
    socialClicks.map(e => ({ k: e.props?.network || '—' })), 'k'
  )
  const socialRows = sortDesc(socialByNet).map(([n, c]) => [n, fmt(c)])

  // Pays des joueurs avec scores
  const scoresByCountry = {}
  scores.forEach(s => {
    const u = users.find(u => u.id === s.user_id)
    const c = u?.country || '—'
    scoresByCountry[c] = (scoresByCountry[c] || 0) + 1
  })
  const scoreCountryRows = Object.entries(scoresByCountry)
    .sort((a,b) => b[1]-a[1]).slice(0,10)
    .map(([c,n]) => [c, fmt(n)])

  return (
    <div className="admin-dash">

      {/* En-tête */}
      <div className="admin-header">
        <div className="admin-header__logo">
          <img src="/ragequit-logo-white.png" alt="Ragequit" />
        </div>
        <h1 className="admin-header__title">Dashboard</h1>
        <div className="admin-header__period">
          {[7, 14, 30].map(d => (
            <button key={d}
              className={`admin-period-btn ${period === d ? 'is-active' : ''}`}
              onClick={() => setPeriod(d)}>
              {d}d
            </button>
          ))}
        </div>
        <button className="admin-header__refresh" onClick={load} title="Refresh">↺</button>
      </div>

      {/* KPI Globaux */}
      <div className="admin-kpis">
        <StatCard label="Total events"    value={ev.length} />
        <StatCard label="Game starts"     value={gameStarts.length}   color="#00FF88" />
        <StatCard label="Game ends"       value={gameEnds.length}     color="#FFD23F" />
        <StatCard label="Leaderboard views" value={lbViews.length}   color="#FF00FF" />
        <StatCard label="Rewarded ads"    value={adCompleted.length}  color="#FF8C42" />
        <StatCard label="Registered users" value={users.length}      color="#A66BFF" />
        <StatCard label="Total scores"    value={scores.length}       color="#00D9FF" />
        <StatCard label="Unread messages" value={messages.filter(m=>!m.read).length} color="#FF4444" />
      </div>

      {/* Grille de tableaux */}
      <div className="admin-grid">

        <Table
          title="Top Games (clicks + starts)"
          cols={['Game', 'Events']}
          rows={topGames.map(([g, n]) => [g, fmt(n)])}
        />

        <Table
          title="Top Categories"
          cols={['Category', 'Events']}
          rows={topCats.map(([c, n]) => [c, fmt(n)])}
        />

        <Table
          title="Devices"
          cols={['Device', 'Events', '%']}
          rows={deviceRows}
        />

        <Table
          title="Top Countries (all events)"
          cols={['Country', 'Events', '%']}
          rows={countryRows}
        />

        <Table
          title="Footer — clicks par lien"
          cols={['Link', 'Clicks']}
          rows={footerRows}
        />

        <Table
          title="Social — clicks par réseau"
          cols={['Network', 'Clicks']}
          rows={socialRows}
        />

        <Table
          title="Pays des joueurs (scores)"
          cols={['Country', 'Scores']}
          rows={scoreCountryRows}
        />

        <Table
          title="Messages de contact"
          cols={['Date', 'Email', 'Subject', 'Lu']}
          rows={messages.map(m => [
            new Date(m.created_at).toLocaleDateString('fr-FR'),
            m.email || '—',
            m.subject,
            m.read ? '✓' : '●',
          ])}
        />

      </div>

    </div>
  )
}

// ── HELPERS ───────────────────────────────────────────────────────────
function groupBy(arr, key){
  const m = {}
  arr.forEach(item => {
    const k = item[key] ?? '—'
    m[k] = (m[k] || 0) + 1
  })
  return m
}
function sortDesc(obj){
  return Object.entries(obj).sort((a,b) => b[1]-a[1])
}
function pct(n, total){
  if(!total) return '0%'
  return Math.round(n / total * 100) + '%'
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────────────
export default function AdminPage(){
  const { user, loading } = useAuth()
  usePageTitle('Admin')

  if(loading) return <div className="admin-loading">Loading…</div>

  // Non connecté → login
  if(!user) return <AdminLogin />

  // Connecté mais pas admin → accès refusé
  if(user.id !== ADMIN_ID){
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1 className="admin-login__title" style={{color:'#FF4444'}}>Access denied</h1>
          <p className="admin-login__sub">This account does not have admin privileges.</p>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}
