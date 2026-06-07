import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts'
import * as XLSX from 'xlsx'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import usePageTitle from '../../hooks/usePageTitle'
import './AdminPage.css'

const ADMIN_ID = '4340752c-bfae-492c-a61b-a9552ac8c908'

// PIN optionnel : défini via variable d'environnement Vite (VITE_ADMIN_PIN).
// Si non défini, aucune étape PIN n'est demandée (seule la connexion Google suffit).
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || null

// ── Helpers ────────────────────────────────────────────────────────────
const fmt = n => (n ?? 0).toLocaleString()

function groupBy(arr, key){
  const m = {}
  arr.forEach(item => { const k = item[key] ?? '—'; m[k] = (m[k] || 0) + 1 })
  return m
}
function sortDesc(obj){ return Object.entries(obj).sort((a,b) => b[1]-a[1]) }
function pct(n, total){ return total ? Math.round(n/total*100) + '%' : '0%' }

// Export d'un tableau en .xlsx
function exportXlsx(filename, cols, rows){
  const data = [cols, ...rows]
  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Data')
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

// ── Composants UI ───────────────────────────────────────────────────────
function StatCard({ label, value, color = '#00D9FF' }){
  return (
    <div className="admin-stat">
      <span className="admin-stat__value" style={{ color }}>{fmt(value)}</span>
      <span className="admin-stat__label">{label}</span>
    </div>
  )
}

// Tableau avec bouton d'export Excel
function Table({ title, cols, rows, emptyMsg = 'No data', exportName }){
  return (
    <div className="admin-table-wrap">
      <div className="admin-table-head">
        <h3 className="admin-section-title">{title}</h3>
        {rows.length > 0 && exportName && (
          <button className="admin-export-btn"
            onClick={() => exportXlsx(exportName, cols, rows)}
            title="Download as Excel">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Excel
          </button>
        )}
      </div>
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

// ── LOGIN (Google + PIN optionnel) ──────────────────────────────────────
function AdminLogin(){
  const { signInGoogle } = useAuth()
  const [busy, setBusy] = useState(false)
  const [err, setErr]   = useState('')
  async function handleGoogle(){
    setBusy(true); setErr('')
    const { error } = await signInGoogle()
    if(error){ setErr(error.message); setBusy(false) }
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
          <svg width="20" height="20" viewBox="0 0 48 48">
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

// Étape PIN (si VITE_ADMIN_PIN est défini)
function AdminPinGate({ onUnlock }){
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')
  function submit(){
    if(pin === ADMIN_PIN){ sessionStorage.setItem('rq_admin_pin_ok', '1'); onUnlock() }
    else { setErr('Incorrect PIN'); setPin('') }
  }
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" />
        </div>
        <h1 className="admin-login__title">Enter PIN</h1>
        <p className="admin-login__sub">Additional security step</p>
        <input className="admin-pin-input" type="password" inputMode="numeric"
          maxLength={6} value={pin} autoFocus
          onChange={e => { setPin(e.target.value.replace(/\D/g,'')); setErr('') }}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="••••••" />
        <button className="admin-login__btn admin-login__btn--pin" onClick={submit}>
          Unlock
        </button>
        {err && <p className="admin-login__err">{err}</p>}
      </div>
    </div>
  )
}

// ── DASHBOARD ────────────────────────────────────────────────────────────
function AdminDashboard(){
  const [period, setPeriod]   = useState(7)
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const since = new Date(Date.now() - period * 86400000).toISOString()
    const [eventsRes, scoresRes, usersRes, messagesRes] = await Promise.all([
      supabase.from('analytics_events').select('*').gte('created_at', since).order('created_at', { ascending: true }),
      supabase.from('scores').select('id, user_id, game_id, mode, score, score_label, created_at').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, username, country, games_played, created_at'),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ])
    setData({
      ev: eventsRes.data || [],
      scores: scoresRes.data || [],
      users: usersRes.data || [],
      messages: messagesRes.data || [],
    })
    setLoading(false)
  }, [period])

  useEffect(() => { load() }, [load])

  // Marquer un message comme lu
  async function markRead(id){
    await supabase.from('contact_messages').update({ read: true }).eq('id', id)
    load()
  }
  // Supprimer un score
  async function deleteScore(id){
    if(!window.confirm('Delete this score permanently?')) return
    await supabase.from('scores').delete().eq('id', id)
    load()
  }

  // ── Données dérivées ────────────────────────────────────────────────
  const derived = useMemo(() => {
    if(!data) return null
    const { ev, scores, users } = data

    const byGame    = groupBy(ev.filter(e => e.game_id), 'game_id')
    const byCat     = groupBy(ev.filter(e => e.category), 'category')
    const byDevice  = groupBy(ev, 'device')
    const byCountry = groupBy(ev.filter(e => e.country), 'country')

    const gameStarts  = ev.filter(e => e.event === 'game_start')
    const gameEnds    = ev.filter(e => e.event === 'game_end')
    const lbViews     = ev.filter(e => e.event === 'leaderboard_view')
    const adCompleted = ev.filter(e => e.event === 'ad_rewarded_complete')
    const footerClicks = ev.filter(e => e.event === 'footer_click')
    const socialClicks = ev.filter(e => e.event === 'social_click')
    const searches     = ev.filter(e => e.event === 'search_result_click')

    // Sessions par jour (courbe)
    const byDay = {}
    for(let i = period - 1; i >= 0; i--){
      const d = new Date(Date.now() - i * 86400000)
      const key = d.toISOString().slice(0, 10)
      byDay[key] = 0
    }
    ev.forEach(e => {
      const key = (e.created_at || '').slice(0, 10)
      if(key in byDay) byDay[key]++
    })
    const chartData = Object.entries(byDay).map(([date, events]) => ({
      date: date.slice(5),  // MM-DD
      events,
    }))

    // Termes de recherche
    const searchTerms = {}
    searches.forEach(e => {
      const q = e.props?.query?.toLowerCase().trim()
      if(q) searchTerms[q] = (searchTerms[q] || 0) + 1
    })

    // Pays des joueurs (via scores + profiles)
    const scoresByCountry = {}
    scores.forEach(s => {
      const u = users.find(u => u.id === s.user_id)
      const c = u?.country || '—'
      scoresByCountry[c] = (scoresByCountry[c] || 0) + 1
    })

    return {
      byGame, byCat, byDevice, byCountry,
      gameStarts, gameEnds, lbViews, adCompleted,
      footerClicks, socialClicks,
      chartData, searchTerms, scoresByCountry,
    }
  }, [data, period])

  if(loading) return <div className="admin-loading">Loading analytics…</div>
  if(!data || !derived) return <div className="admin-loading">No data.</div>

  const { ev, scores, users, messages } = data
  const {
    byGame, byCat, byDevice, byCountry,
    gameStarts, gameEnds, lbViews, adCompleted,
    footerClicks, socialClicks,
    chartData, searchTerms, scoresByCountry,
  } = derived

  // Lignes des tableaux
  const topGames   = sortDesc(byGame).slice(0, 10).map(([g, n]) => [g, fmt(n)])
  const topCats    = sortDesc(byCat).slice(0, 10).map(([c, n]) => [c, fmt(n)])
  const deviceRows = sortDesc(byDevice).map(([d, n]) => [d || '—', fmt(n), pct(n, ev.length)])
  const countryRows = sortDesc(byCountry).slice(0, 10).map(([c, n]) => [c, fmt(n), pct(n, ev.length)])
  const footerRows = sortDesc(groupBy(footerClicks.map(e => ({ k: e.props?.label || '—' })), 'k')).map(([l, n]) => [l, fmt(n)])
  const socialRows = sortDesc(groupBy(socialClicks.map(e => ({ k: e.props?.network || '—' })), 'k')).map(([n, c]) => [n, fmt(c)])
  const searchRows = sortDesc(searchTerms).slice(0, 15).map(([q, n]) => [q, fmt(n)])
  const scoreCountryRows = Object.entries(scoresByCountry).sort((a,b) => b[1]-a[1]).slice(0,10).map(([c,n]) => [c, fmt(n)])

  // Scores récents (avec bouton supprimer)
  const recentScoreRows = scores.slice(0, 30).map(s => {
    const u = users.find(u => u.id === s.user_id)
    return [
      new Date(s.created_at).toLocaleDateString('fr-FR'),
      s.game_id,
      s.mode,
      s.score_label || s.score,
      u?.username || (s.user_id ? 'User' : 'Anon'),
    ]
  })

  return (
    <div className="admin-dash">

      {/* Header */}
      <div className="admin-header">
        <div className="admin-header__logo"><img src="/ragequit-logo-white.png" alt="Ragequit" /></div>
        <h1 className="admin-header__title">Dashboard</h1>
        <div className="admin-header__period">
          {[7, 14, 30].map(d => (
            <button key={d} className={`admin-period-btn ${period === d ? 'is-active' : ''}`}
              onClick={() => setPeriod(d)}>{d}d</button>
          ))}
        </div>
        <button className="admin-header__refresh" onClick={load} title="Refresh">↺</button>
      </div>

      {/* KPIs */}
      <div className="admin-kpis">
        <StatCard label="Total events"     value={ev.length} />
        <StatCard label="Game starts"      value={gameStarts.length} color="#00FF88" />
        <StatCard label="Game ends"        value={gameEnds.length} color="#FFD23F" />
        <StatCard label="Leaderboard views" value={lbViews.length} color="#FF00FF" />
        <StatCard label="Rewarded ads"     value={adCompleted.length} color="#FF8C42" />
        <StatCard label="Registered users" value={users.length} color="#A66BFF" />
        <StatCard label="Total scores"     value={scores.length} color="#00D9FF" />
        <StatCard label="Unread messages"  value={messages.filter(m=>!m.read).length} color="#FF4444" />
      </div>

      {/* Graphique sessions par jour */}
      <div className="admin-chart-wrap">
        <h3 className="admin-section-title">Events per day ({period}d)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.5}/>
                <stop offset="100%" stopColor="#00D9FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#888' }} />
            <Tooltip />
            <Area type="monotone" dataKey="events" stroke="#00D9FF" strokeWidth={2} fill="url(#cyanGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Grille de tableaux */}
      <div className="admin-grid">
        <Table title="Top Games (clicks + starts)" cols={['Game', 'Events']} rows={topGames} exportName="top_games" />
        <Table title="Top Categories" cols={['Category', 'Events']} rows={topCats} exportName="top_categories" />
        <Table title="Devices" cols={['Device', 'Events', '%']} rows={deviceRows} exportName="devices" />
        <Table title="Top Countries (all events)" cols={['Country', 'Events', '%']} rows={countryRows} exportName="countries" />
        <Table title="Search terms" cols={['Query', 'Count']} rows={searchRows} exportName="search_terms" emptyMsg="No searches yet" />
        <Table title="Footer — clicks par lien" cols={['Link', 'Clicks']} rows={footerRows} exportName="footer_clicks" />
        <Table title="Social — clicks par réseau" cols={['Network', 'Clicks']} rows={socialRows} exportName="social_clicks" />
        <Table title="Pays des joueurs (scores)" cols={['Country', 'Scores']} rows={scoreCountryRows} exportName="player_countries" />
      </div>

      {/* Bloc gestion des scores */}
      <div className="admin-fullwidth">
        <div className="admin-table-head">
          <h3 className="admin-section-title">Recent scores — moderation</h3>
          {recentScoreRows.length > 0 && (
            <button className="admin-export-btn"
              onClick={() => exportXlsx('scores', ['Date','Game','Mode','Score','Player'], recentScoreRows)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Excel
            </button>
          )}
        </div>
        {scores.length === 0 ? (
          <p className="admin-empty">No scores yet</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Date</th><th>Game</th><th>Mode</th><th>Score</th><th>Player</th><th></th></tr></thead>
            <tbody>
              {scores.slice(0, 30).map(s => {
                const u = users.find(u => u.id === s.user_id)
                return (
                  <tr key={s.id}>
                    <td>{new Date(s.created_at).toLocaleDateString('fr-FR')}</td>
                    <td>{s.game_id}</td>
                    <td>{s.mode}</td>
                    <td>{s.score_label || s.score}</td>
                    <td>{u?.username || (s.user_id ? 'User' : 'Anon')}</td>
                    <td>
                      <button className="admin-del-btn" onClick={() => deleteScore(s.id)} title="Delete score">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Bloc messages de contact */}
      <div className="admin-fullwidth">
        <h3 className="admin-section-title">Contact messages</h3>
        {messages.length === 0 ? (
          <p className="admin-empty">No messages</p>
        ) : (
          <div className="admin-messages">
            {messages.map(m => (
              <div key={m.id} className={`admin-msg ${m.read ? '' : 'admin-msg--unread'}`}>
                <div className="admin-msg__head">
                  <span className="admin-msg__subject">{m.subject}</span>
                  <span className="admin-msg__date">{new Date(m.created_at).toLocaleString('fr-FR')}</span>
                </div>
                <p className="admin-msg__body">{m.message}</p>
                <div className="admin-msg__foot">
                  <span className="admin-msg__email">{m.email || 'no email'}</span>
                  <div className="admin-msg__actions">
                    {m.email && (
                      <a className="admin-msg__reply" href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}>
                        Reply
                      </a>
                    )}
                    {!m.read && (
                      <button className="admin-msg__mark" onClick={() => markRead(m.id)}>
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────────────────
export default function AdminPage(){
  const { user, loading } = useAuth()
  const [pinOk, setPinOk] = useState(() => sessionStorage.getItem('rq_admin_pin_ok') === '1')
  usePageTitle('Admin')

  if(loading) return <div className="admin-loading">Loading…</div>
  if(!user) return <AdminLogin />

  if(user.id !== ADMIN_ID){
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1 className="admin-login__title" style={{ color: '#FF4444' }}>Access denied</h1>
          <p className="admin-login__sub">This account does not have admin privileges.</p>
        </div>
      </div>
    )
  }

  // PIN requis seulement si VITE_ADMIN_PIN est défini
  if(ADMIN_PIN && !pinOk) return <AdminPinGate onUnlock={() => setPinOk(true)} />

  return <AdminDashboard />
}
