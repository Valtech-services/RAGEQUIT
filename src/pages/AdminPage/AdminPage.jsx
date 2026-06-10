import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'
import * as XLSX from 'xlsx'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import usePageTitle from '../../hooks/usePageTitle'
import './AdminPage.css'

const ADMIN_ID = '4340752c-bfae-492c-a61b-a9552ac8c908'
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || null

// Palette de marque
const C = { cyan: '#00D9FF', violet: '#8B5CF6', magenta: '#FF2D78',
            green: '#00FF88', yellow: '#FFD23F', orange: '#FF8C42' }

// ── Helpers ────────────────────────────────────────────────────────────
const fmt = n => (n ?? 0).toLocaleString()
function groupBy(arr, key){
  const m = {}
  arr.forEach(item => { const k = item[key] ?? '—'; m[k] = (m[k] || 0) + 1 })
  return m
}
function sortDesc(obj){ return Object.entries(obj).sort((a,b) => b[1]-a[1]) }
function pct(n, total){ return total ? Math.round(n/total*100) + '%' : '0%' }
function uniqueCount(arr, key){ return new Set(arr.map(e => e[key]).filter(Boolean)).size }

// Série journalière d'un sous-ensemble d'events → [{date, value}]
function dailySeries(events, period, valueFn){
  const byDay = {}
  for(let i = period - 1; i >= 0; i--){
    const d = new Date(Date.now() - i * 86400000)
    byDay[d.toISOString().slice(0,10)] = 0
  }
  events.forEach(e => {
    const key = (e.created_at || '').slice(0,10)
    if(key in byDay) byDay[key] += valueFn ? valueFn(e) : 1
  })
  return Object.entries(byDay).map(([date, value]) => ({ date: date.slice(5), value }))
}

function exportXlsx(filename, cols, rows){
  const ws = XLSX.utils.aoa_to_sheet([cols, ...rows])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Data')
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

// ── Composants UI ───────────────────────────────────────────────────────
function StatCard({ label, value, color = C.cyan, hint }){
  return (
    <div className="admin-stat">
      <span className="admin-stat__value" style={{ color }}>{fmt(value)}</span>
      <span className="admin-stat__label">{label}</span>
      {hint && <span className="admin-stat__hint">{hint}</span>}
    </div>
  )
}

// Mini sparkline pour un module
function Spark({ data, color = C.cyan, type = 'area' }){
  if(!data || data.every(d => d.value === 0)){
    return <div className="admin-spark admin-spark--empty">—</div>
  }
  const gid = 'sp' + Math.random().toString(36).slice(2, 8)
  return (
    <div className="admin-spark">
      <ResponsiveContainer width="100%" height={48}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #eee' }} />
            <Bar dataKey="value" radius={[2,2,0,0]}>
              {data.map((_, i) => <Cell key={i} fill={color} />)}
            </Bar>
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.45}/>
                <stop offset="100%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #eee' }}
              labelStyle={{ display: 'none' }} />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#${gid})`} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

// Module : titre + (mini-graphe) + tableau + export
function Module({ title, cols, rows, spark, sparkColor, sparkType, emptyMsg = 'No data', exportName }){
  return (
    <div className="admin-module">
      <div className="admin-module__head">
        <h3 className="admin-section-title">{title}</h3>
        {rows.length > 0 && exportName && (
          <button className="admin-export-btn"
            onClick={() => exportXlsx(exportName, cols, rows)} title="Download as Excel">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Excel
          </button>
        )}
      </div>
      {spark && <Spark data={spark} color={sparkColor} type={sparkType} />}
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

// ── LOGIN ────────────────────────────────────────────────────────────────
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
        <div className="admin-login__logo"><img src="/ragequit-logo-white.png" alt="Ragequit Arcade" /></div>
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
        <div className="admin-login__logo"><img src="/ragequit-logo-white.png" alt="Ragequit Arcade" /></div>
        <h1 className="admin-login__title">Enter PIN</h1>
        <p className="admin-login__sub">Additional security step</p>
        <input className="admin-pin-input" type="password" inputMode="numeric"
          maxLength={6} value={pin} autoFocus
          onChange={e => { setPin(e.target.value.replace(/\D/g,'')); setErr('') }}
          onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••" />
        <button className="admin-login__btn admin-login__btn--pin" onClick={submit}>Unlock</button>
        {err && <p className="admin-login__err">{err}</p>}
      </div>
    </div>
  )
}

// ── DASHBOARD ──────────────────────────────────────────────────────────────
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

  async function markRead(id){
    await supabase.from('contact_messages').update({ read: true }).eq('id', id)
    load()
  }
  async function deleteScore(id){
    if(!window.confirm('Delete this score permanently?')) return
    await supabase.from('scores').delete().eq('id', id)
    load()
  }

  // ── Données dérivées ──────────────────────────────────────────────────
  const derived = useMemo(() => {
    if(!data) return null
    const { ev, scores, users } = data

    // Filtres d'events
    const pageViews    = ev.filter(e => e.event === 'page_view')
    const homeViews    = pageViews.filter(e => e.url === '/' )
    const gameStarts   = ev.filter(e => e.event === 'game_start')
    const gameEnds     = ev.filter(e => e.event === 'game_end')
    const lbViews      = ev.filter(e => e.event === 'leaderboard_view')
    const adCompleted  = ev.filter(e => e.event === 'ad_rewarded_complete')
    const footerClicks = ev.filter(e => e.event === 'footer_click')
    const socialClicks = ev.filter(e => e.event === 'social_click')
    const searches     = ev.filter(e => e.event === 'search_result_click')

    // Visiteurs (sessions anonymes). Fallback : si pas de session_id en base
    // (colonne pas encore ajoutée), on retombe sur le comptage par user_id.
    const hasSession = ev.some(e => e.session_id)
    const visitorKey = hasSession ? 'session_id' : 'user_id'
    const uniqueVisitors  = hasSession ? uniqueCount(ev, 'session_id') : null
    // connecté = user_id non nul ; anonyme = sinon
    const loggedEvents = ev.filter(e => e.user_id)
    const anonEvents   = ev.filter(e => !e.user_id)
    const loggedVisitors = uniqueCount(loggedEvents, visitorKey)
    const anonVisitors   = hasSession ? uniqueCount(anonEvents, 'session_id') : null

    // Groupements
    const byGame    = groupBy(ev.filter(e => e.game_id), 'game_id')
    const byCat     = groupBy(ev.filter(e => e.category), 'category')
    const byDevice  = groupBy(ev, 'device')
    const byCountry = groupBy(ev.filter(e => e.country), 'country')

    // Séries journalières (mini-graphes)
    const sEvents   = dailySeries(ev, period)
    const sHome     = dailySeries(homeViews, period)
    const sStarts   = dailySeries(gameStarts, period)
    const sEnds     = dailySeries(gameEnds, period)
    const sLb       = dailySeries(lbViews, period)
    const sAds      = dailySeries(adCompleted, period)
    const sLogged   = dailySeries(loggedEvents, period)
    const sAnon     = dailySeries(anonEvents, period)
    const sScores   = dailySeries(scores, period)

    // Visiteurs uniques par jour (cardinalité de session par jour)
    function dailyUnique(events){
      const byDay = {}
      for(let i = period - 1; i >= 0; i--){
        const d = new Date(Date.now() - i * 86400000)
        byDay[d.toISOString().slice(0,10)] = new Set()
      }
      events.forEach(e => {
        const key = (e.created_at || '').slice(0,10)
        const id = e.session_id || e.user_id
        if(key in byDay && id) byDay[key].add(id)
      })
      return Object.entries(byDay).map(([date, set]) => ({ date: date.slice(5), value: set.size }))
    }
    const sVisitors = dailyUnique(ev)

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
      hasSession, uniqueVisitors, loggedVisitors, anonVisitors,
      homeViews, pageViews, gameStarts, gameEnds, lbViews, adCompleted,
      footerClicks, socialClicks,
      byGame, byCat, byDevice, byCountry,
      sEvents, sHome, sStarts, sEnds, sLb, sAds, sLogged, sAnon, sScores, sVisitors,
      searchTerms, scoresByCountry,
    }
  }, [data, period])

  if(loading) return <div className="admin-loading">Loading analytics…</div>
  if(!data || !derived) return <div className="admin-loading">No data.</div>

  const { ev, scores, users, messages } = data
  const {
    hasSession, uniqueVisitors, loggedVisitors, anonVisitors,
    homeViews, pageViews, gameStarts, gameEnds, lbViews, adCompleted,
    footerClicks, socialClicks,
    byGame, byCat, byDevice, byCountry,
    sEvents, sHome, sStarts, sEnds, sLb, sAds, sLogged, sAnon, sScores, sVisitors,
    searchTerms, scoresByCountry,
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

  // Visiteurs : connecté vs non connecté
  const visitorRows = hasSession ? [
    ['Connectés', fmt(loggedVisitors), pct(loggedVisitors, uniqueVisitors)],
    ['Non connectés', fmt(anonVisitors), pct(anonVisitors, uniqueVisitors)],
  ] : [
    ['Connectés (uniques)', fmt(loggedVisitors), '—'],
    ['Visiteurs anonymes', 'Active session tracking', '—'],
  ]

  const recentScoreRows = scores.slice(0, 30).map(s => {
    const u = users.find(u => u.id === s.user_id)
    return [
      new Date(s.created_at).toLocaleDateString('fr-FR'),
      s.game_id, s.mode, s.score_label || s.score,
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

      {/* Légende events */}
      <p className="admin-legend">
        Un <strong>event</strong> = une action enregistrée (vue de page, démarrage de jeu,
        fin de partie, vue du classement, pub vue, clic…). Les chiffres ci-dessous couvrent
        la période sélectionnée ({period} derniers jours) et incluent les visiteurs
        <strong> connectés et non connectés</strong>.
      </p>

      {/* KPIs */}
      <div className="admin-kpis">
        <StatCard label="Visiteurs uniques" value={hasSession ? uniqueVisitors : loggedVisitors}
          color={C.cyan} hint={hasSession ? 'sessions anonymes' : 'active session tracking'} />
        <StatCard label="Vues page d'accueil" value={homeViews.length} color={C.violet} hint="event page_view sur /" />
        <StatCard label="Vues de page (total)" value={pageViews.length} color={C.magenta} hint="toutes pages" />
        <StatCard label="Game starts" value={gameStarts.length} color={C.green} />
        <StatCard label="Game ends" value={gameEnds.length} color={C.yellow} />
        <StatCard label="Pubs rewarded" value={adCompleted.length} color={C.orange} hint="vidéos vues en entier" />
        <StatCard label="Joueurs inscrits" value={users.length} color={C.violet} />
        <StatCard label="Messages non lus" value={messages.filter(m=>!m.read).length} color="#FF4444" />
      </div>

      {/* Grand graphe : events/jour (dégradé de marque) */}
      <div className="admin-chart-wrap">
        <h3 className="admin-section-title">Events par jour ({period}d)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={sEvents} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor={C.cyan}    stopOpacity={0.55}/>
                <stop offset="50%"  stopColor={C.violet}  stopOpacity={0.35}/>
                <stop offset="100%" stopColor={C.magenta} stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="brandStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor={C.cyan}/>
                <stop offset="50%"  stopColor={C.violet}/>
                <stop offset="100%" stopColor={C.magenta}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#888' }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #eee' }} />
            <Area type="monotone" dataKey="value" stroke="url(#brandStroke)" strokeWidth={3} fill="url(#brandGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Section VISITEURS */}
      <div className="admin-grid">
        <Module title="Visiteurs uniques / jour" cols={['Type','Uniques','%']} rows={visitorRows}
          spark={sVisitors} sparkColor={C.cyan} exportName="visitors" />
        <Module title="Connectés — activité/jour" cols={['Game','Events']} rows={topGames}
          spark={sLogged} sparkColor={C.violet} exportName="logged_activity" emptyMsg="No data" />
        <Module title="Non connectés — activité/jour" cols={['Catégorie','Events']} rows={topCats}
          spark={sAnon} sparkColor={C.magenta} exportName="anon_activity" emptyMsg="No data" />
        <Module title="Vues page d'accueil / jour" cols={['Country','Events','%']} rows={countryRows}
          spark={sHome} sparkColor={C.violet} exportName="home_views" />
      </div>

      {/* Grille de modules avec mini-graphes */}
      <div className="admin-grid">
        <Module title="Top Games" cols={['Game', 'Events']} rows={topGames}
          spark={sStarts} sparkColor={C.green} sparkType="bar" exportName="top_games" />
        <Module title="Top Catégories" cols={['Category', 'Events']} rows={topCats}
          spark={sEnds} sparkColor={C.yellow} sparkType="bar" exportName="top_categories" />
        <Module title="Pubs rewarded / jour" cols={['Device', 'Events', '%']} rows={deviceRows}
          spark={sAds} sparkColor={C.orange} exportName="devices" />
        <Module title="Classement — vues / jour" cols={['Country', 'Events', '%']} rows={countryRows}
          spark={sLb} sparkColor={C.cyan} exportName="countries" />
        <Module title="Recherches" cols={['Query', 'Count']} rows={searchRows}
          exportName="search_terms" emptyMsg="No searches yet" />
        <Module title="Footer — clics par lien" cols={['Link', 'Clicks']} rows={footerRows}
          exportName="footer_clicks" />
        <Module title="Social — clics par réseau" cols={['Network', 'Clicks']} rows={socialRows}
          exportName="social_clicks" />
        <Module title="Pays des joueurs (scores)" cols={['Country', 'Scores']} rows={scoreCountryRows}
          spark={sScores} sparkColor={C.magenta} sparkType="bar" exportName="player_countries" />
      </div>

      {/* Bloc gestion des scores — bien séparé */}
      <div className="admin-fullwidth admin-fullwidth--spaced">
        <div className="admin-module__head">
          <h3 className="admin-section-title">Scores récents — modération</h3>
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

      {/* Bloc messages */}
      <div className="admin-fullwidth admin-fullwidth--spaced">
        <h3 className="admin-section-title">Messages de contact</h3>
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
                      <a className="admin-msg__reply" href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}>Reply</a>
                    )}
                    {!m.read && (
                      <button className="admin-msg__mark" onClick={() => markRead(m.id)}>Mark as read</button>
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

// ── PAGE PRINCIPALE ─────────────────────────────────────────────────────────
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

  if(ADMIN_PIN && !pinOk) return <AdminPinGate onUnlock={() => setPinOk(true)} />
  return <AdminDashboard />
}
