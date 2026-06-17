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

const C = { cyan: '#00D9FF', violet: '#8B5CF6', magenta: '#FF2D78',
            green: '#00C781', yellow: '#FFB02E', red: '#FF4466' }

// ── Helpers ────────────────────────────────────────────────────────────
const fmt = n => (n ?? 0).toLocaleString('fr-FR')
function groupCount(arr, keyFn){
  const m = {}
  arr.forEach(item => { const k = keyFn(item) ?? '—'; m[k] = (m[k] || 0) + 1 })
  return m
}
const sortDesc = obj => Object.entries(obj).sort((a,b) => b[1]-a[1])
const pct = (n, total) => total ? Math.round(n/total*100) + '%' : '0%'

// Série journalière : compte d'events par jour sur la période
function dailySeries(events, period){
  const byDay = {}
  for(let i = period - 1; i >= 0; i--){
    const d = new Date(Date.now() - i * 86400000)
    byDay[d.toISOString().slice(0,10)] = 0
  }
  events.forEach(e => {
    const k = (e.created_at || '').slice(0,10)
    if(k in byDay) byDay[k] += 1
  })
  return Object.entries(byDay).map(([date, value]) => ({ date: date.slice(5), value }))
}
// Série journalière de visiteurs UNIQUES (cardinalité d'un identifiant par jour)
function dailyUnique(events, period, idFn){
  const byDay = {}
  for(let i = period - 1; i >= 0; i--){
    const d = new Date(Date.now() - i * 86400000)
    byDay[d.toISOString().slice(0,10)] = new Set()
  }
  events.forEach(e => {
    const k = (e.created_at || '').slice(0,10)
    const id = idFn(e)
    if(k in byDay && id) byDay[k].add(id)
  })
  return Object.entries(byDay).map(([date, set]) => ({ date: date.slice(5), value: set.size }))
}

function exportXlsx(filename, cols, rows){
  const ws = XLSX.utils.aoa_to_sheet([cols, ...rows])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Data')
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

// ── UI ───────────────────────────────────────────────────────────────────
function Kpi({ label, value, color, sub }){
  return (
    <div className="adm-kpi">
      <span className="adm-kpi__val" style={{ color }}>{fmt(value)}</span>
      <span className="adm-kpi__label">{label}</span>
      {sub && <span className="adm-kpi__sub">{sub}</span>}
    </div>
  )
}

// Module = un titre + un graphe ET un tableau qui parlent de LA MÊME chose
function Panel({ title, subtitle, children, onExport }){
  return (
    <div className="adm-panel">
      <div className="adm-panel__head">
        <div>
          <h3 className="adm-panel__title">{title}</h3>
          {subtitle && <p className="adm-panel__sub">{subtitle}</p>}
        </div>
        {onExport && (
          <button className="adm-xls" onClick={onExport} title="Exporter en Excel">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Excel
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function MiniChart({ data, color, type = 'area' }){
  if(!data || data.every(d => d.value === 0))
    return <div className="adm-chart adm-chart--empty">Aucune donnée sur la période</div>
  const gid = 'g' + Math.random().toString(36).slice(2, 8)
  return (
    <div className="adm-chart">
      <ResponsiveContainer width="100%" height={90}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 6, right: 4, left: -22, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#aaa' }} interval="preserveStartEnd" />
            <YAxis allowDecimals={false} tick={{ fontSize: 9, fill: '#aaa' }} width={28} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #eee' }} />
            <Bar dataKey="value" radius={[3,3,0,0]}>{data.map((_, i) => <Cell key={i} fill={color} />)}</Bar>
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ top: 6, right: 4, left: -22, bottom: 0 }}>
            <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="100%" stopColor={color} stopOpacity={0}/>
            </linearGradient></defs>
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#aaa' }} interval="preserveStartEnd" />
            <YAxis allowDecimals={false} tick={{ fontSize: 9, fill: '#aaa' }} width={28} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #eee' }} />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#${gid})`} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

function Table({ cols, rows, empty = 'Aucune donnée' }){
  if(rows.length === 0) return <p className="adm-empty">{empty}</p>
  return (
    <table className="adm-table">
      <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
  )
}

// ── LOGIN / PIN ────────────────────────────────────────────────────────────
function AdminLogin(){
  const { signInGoogle } = useAuth()
  const [busy, setBusy] = useState(false)
  const [err, setErr]   = useState('')
  async function go(){ setBusy(true); setErr(''); const { error } = await signInGoogle(); if(error){ setErr(error.message); setBusy(false) } }
  return (
    <div className="adm-login"><div className="adm-login__card">
      <img src="/ragequit-logo-white.png" alt="Ragequit" className="adm-login__logo" />
      <h1 className="adm-login__title">Admin Dashboard</h1>
      <p className="adm-login__sub">Connecte-toi avec ton compte Google admin</p>
      <button className="adm-login__btn" onClick={go} disabled={busy}>
        <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        {busy ? 'Connexion…' : 'Continuer avec Google'}
      </button>
      {err && <p className="adm-login__err">{err}</p>}
    </div></div>
  )
}
function AdminPinGate({ onUnlock }){
  const [pin, setPin] = useState(''); const [err, setErr] = useState('')
  function submit(){ if(pin === ADMIN_PIN){ sessionStorage.setItem('rq_admin_pin_ok','1'); onUnlock() } else { setErr('PIN incorrect'); setPin('') } }
  return (
    <div className="adm-login"><div className="adm-login__card">
      <img src="/ragequit-logo-white.png" alt="Ragequit" className="adm-login__logo" />
      <h1 className="adm-login__title">Code PIN</h1>
      <input className="adm-pin" type="password" inputMode="numeric" maxLength={6} value={pin} autoFocus
        onChange={e => { setPin(e.target.value.replace(/\D/g,'')); setErr('') }}
        onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••" />
      <button className="adm-login__btn adm-login__btn--pin" onClick={submit}>Déverrouiller</button>
      {err && <p className="adm-login__err">{err}</p>}
    </div></div>
  )
}

// ── DASHBOARD ────────────────────────────────────────────────────────────
function Dashboard(){
  const [period, setPeriod] = useState(7)
  const [d, setD] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const since = new Date(Date.now() - period * 86400000).toISOString()
    const [ev, sc, us, ms] = await Promise.all([
      supabase.from('analytics_events').select('*').gte('created_at', since).order('created_at', { ascending: true }),
      supabase.from('scores').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, username, country, created_at'),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ])
    setD({ ev: ev.data || [], scores: sc.data || [], users: us.data || [], messages: ms.data || [] })
    setLoading(false)
  }, [period])
  useEffect(() => { load() }, [load])

  async function markRead(id){ await supabase.from('contact_messages').update({ read: true }).eq('id', id); load() }
  async function deleteScore(id){ if(!window.confirm('Supprimer ce score ?')) return; await supabase.from('scores').delete().eq('id', id); load() }

  const m = useMemo(() => {
    if(!d) return null
    const { ev, scores, users } = d

    // identifiant visiteur : session_id si présent, sinon user_id
    const vid = e => e.session_id || e.user_id || null
    const isLogged = e => !!e.user_id

    // Sous-ensembles d'events par TYPE (clair, plus de "event" fourre-tout)
    const visits      = ev.filter(e => e.event === 'page_view')
    const homeVisits  = visits.filter(e => e.url === '/')
    const gameStarts  = ev.filter(e => e.event === 'game_start')
    const gameEnds    = ev.filter(e => e.event === 'game_end')
    const adsWatched  = ev.filter(e => e.event === 'ad_rewarded_complete')

    // Visiteurs uniques
    const allVisitors    = new Set(ev.map(vid).filter(Boolean))
    const loggedVisitors = new Set(ev.filter(isLogged).map(vid).filter(Boolean))
    const anonVisitors   = new Set(ev.filter(e => !isLogged(e)).map(vid).filter(Boolean))

    // Parties par jeu (game_start)
    const playsByGame = groupCount(gameStarts, e => e.game_id)
    // Catégories (sur tous les events qui en ont une)
    const byCategory  = groupCount(ev.filter(e => e.category), e => e.category)
    // Appareils
    const byDevice    = groupCount(ev, e => e.device)
    // Pays (events)
    const byCountry   = groupCount(ev.filter(e => e.country), e => e.country)

    // Taux de complétion (combien de parties finies vs lancées)
    const completion = gameStarts.length ? Math.round(gameEnds.length / gameStarts.length * 100) : 0
    // Taux de pub par partie
    const adsPerPlay = gameStarts.length ? (adsWatched.length / gameStarts.length).toFixed(2) : '0'

    // Séries journalières
    const sVisitors  = dailyUnique(ev, period, vid)
    const sPlays     = dailySeries(gameStarts, period)
    const sAds       = dailySeries(adsWatched, period)
    const sHome      = dailySeries(homeVisits, period)

    return {
      visits, homeVisits, gameStarts, gameEnds, adsWatched,
      allVisitors: allVisitors.size, loggedVisitors: loggedVisitors.size, anonVisitors: anonVisitors.size,
      playsByGame, byCategory, byDevice, byCountry, completion, adsPerPlay,
      sVisitors, sPlays, sAds, sHome,
    }
  }, [d, period])

  if(loading) return <div className="adm-loading">Chargement…</div>
  if(!d || !m) return <div className="adm-loading">Aucune donnée.</div>

  const { ev, scores, users, messages } = d
  const unread = messages.filter(x => !x.read).length

  // Lignes tableaux
  const gameRows = sortDesc(m.playsByGame).map(([g,n]) => [g, fmt(n)])
  const catRows  = sortDesc(m.byCategory).map(([c,n]) => [c, fmt(n)])
  const devRows  = sortDesc(m.byDevice).map(([dv,n]) => [dv || '—', fmt(n), pct(n, ev.length)])
  const ctyRows  = sortDesc(m.byCountry).slice(0,8).map(([c,n]) => [c, fmt(n)])

  return (
    <div className="adm">
      {/* Header */}
      <header className="adm-header">
        <img src="/ragequit-logo-white.png" alt="Ragequit" className="adm-header__logo" />
        <h1 className="adm-header__title">Dashboard</h1>
        <div className="adm-period">
          {[7,14,30].map(p => (
            <button key={p} className={`adm-period__btn ${period===p?'is-active':''}`} onClick={() => setPeriod(p)}>{p}j</button>
          ))}
        </div>
        <button className="adm-refresh" onClick={load} title="Rafraîchir">↺</button>
      </header>

      <div className="adm-body">

        {/* KPIs — chiffres concrets */}
        <section className="adm-kpis">
          <Kpi label="Visiteurs uniques" value={m.allVisitors} color={C.cyan} sub={`${period} derniers jours`} />
          <Kpi label="dont connectés" value={m.loggedVisitors} color={C.violet} sub="avec compte" />
          <Kpi label="dont anonymes" value={m.anonVisitors} color={C.magenta} sub="sans compte" />
          <Kpi label="Parties lancées" value={m.gameStarts.length} color={C.green} />
          <Kpi label="Parties terminées" value={m.gameEnds.length} color={C.yellow} sub={`${m.completion}% de complétion`} />
          <Kpi label="Pubs récompensées vues" value={m.adsWatched.length} color="#FF8C42" sub={`${m.adsPerPlay} / partie`} />
          <Kpi label="Joueurs inscrits" value={users.length} color={C.violet} sub="total" />
          <Kpi label="Messages non lus" value={unread} color={C.red} />
        </section>

        {/* Grand graphe : visiteurs uniques / jour */}
        <section className="adm-hero-chart">
          <div className="adm-panel__head">
            <div>
              <h3 className="adm-panel__title">Visiteurs uniques par jour</h3>
              <p className="adm-panel__sub">Une personne = un visiteur, qu'elle soit connectée ou non. Sans adresse IP (RGPD).</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={m.sVisitors} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="heroFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity={0.5}/>
                  <stop offset="50%" stopColor={C.violet} stopOpacity={0.3}/>
                  <stop offset="100%" stopColor={C.magenta} stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={C.cyan}/><stop offset="50%" stopColor={C.violet}/><stop offset="100%" stopColor={C.magenta}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#999' }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#999' }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #eee' }} />
              <Area type="monotone" dataKey="value" stroke="url(#heroLine)" strokeWidth={3} fill="url(#heroFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>

        {/* Modules cohérents : chaque graphe correspond à son tableau */}
        <section className="adm-grid">
          <Panel title="Parties par jeu" subtitle="Nombre de parties lancées"
            onExport={() => exportXlsx('parties_par_jeu', ['Jeu','Parties'], gameRows)}>
            <MiniChart data={m.sPlays} color={C.green} type="bar" />
            <Table cols={['Jeu','Parties']} rows={gameRows} empty="Aucune partie sur la période" />
          </Panel>

          <Panel title="Pubs récompensées" subtitle="Vidéos vues en entier (revive / double)"
            onExport={() => exportXlsx('pubs', ['Jour','Pubs'], m.sAds.map(x => [x.date, x.value]))}>
            <MiniChart data={m.sAds} color="#FF8C42" />
            <Table cols={['Indicateur','Valeur']} rows={[
              ['Total pubs vues', fmt(m.adsWatched.length)],
              ['Pubs par partie', m.adsPerPlay],
              ['Parties terminées', `${m.completion}%`],
            ]} />
          </Panel>

          <Panel title="Pages d'accueil vues" subtitle="Visites de la page d'accueil"
            onExport={() => exportXlsx('home', ['Jour','Vues'], m.sHome.map(x => [x.date, x.value]))}>
            <MiniChart data={m.sHome} color={C.violet} />
            <Table cols={['Indicateur','Valeur']} rows={[
              ['Vues accueil', fmt(m.homeVisits.length)],
              ['Vues toutes pages', fmt(m.visits.length)],
            ]} empty="Active le tracking page_view" />
          </Panel>

          <Panel title="Catégories jouées" subtitle="Répartition par catégorie"
            onExport={() => exportXlsx('categories', ['Catégorie','Events'], catRows)}>
            <Table cols={['Catégorie','Events']} rows={catRows} />
          </Panel>

          <Panel title="Appareils" subtitle="D'où viennent les visites"
            onExport={() => exportXlsx('appareils', ['Appareil','Events','%'], devRows)}>
            <Table cols={['Appareil','Events','%']} rows={devRows} />
          </Panel>

          <Panel title="Pays" subtitle="Provenance géographique (sans IP)"
            onExport={() => exportXlsx('pays', ['Pays','Events'], ctyRows)}>
            <Table cols={['Pays','Events']} rows={ctyRows} empty="Aucune donnée pays" />
          </Panel>
        </section>

        {/* Scores — modération (bien séparé) */}
        <section className="adm-wide">
          <div className="adm-panel__head">
            <div><h3 className="adm-panel__title">Scores récents — modération</h3>
              <p className="adm-panel__sub">Supprime un score suspect ou triché</p></div>
            {scores.length > 0 && (
              <button className="adm-xls" onClick={() => exportXlsx('scores',
                ['Date','Jeu','Mode','Score','Joueur'],
                scores.slice(0,50).map(s => {
                  const u = users.find(u => u.id === s.user_id)
                  return [new Date(s.created_at).toLocaleDateString('fr-FR'), s.game_id, s.mode, s.score_label || s.score, u?.username || (s.user_id?'Joueur':'Anon')]
                }))}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg> Excel
              </button>
            )}
          </div>
          {scores.length === 0 ? <p className="adm-empty">Aucun score</p> : (
            <table className="adm-table">
              <thead><tr><th>Date</th><th>Jeu</th><th>Mode</th><th>Score</th><th>Joueur</th><th></th></tr></thead>
              <tbody>
                {scores.slice(0,30).map(s => {
                  const u = users.find(u => u.id === s.user_id)
                  return (
                    <tr key={s.id}>
                      <td>{new Date(s.created_at).toLocaleDateString('fr-FR')}</td>
                      <td>{s.game_id}</td><td>{s.mode}</td><td>{s.score_label || s.score}</td>
                      <td>{u?.username || (s.user_id ? 'Joueur' : 'Anon')}</td>
                      <td><button className="adm-del" onClick={() => deleteScore(s.id)} title="Supprimer">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </section>

        {/* Messages */}
        <section className="adm-wide">
          <div className="adm-panel__head"><div><h3 className="adm-panel__title">Messages de contact</h3></div></div>
          {messages.length === 0 ? <p className="adm-empty">Aucun message</p> : (
            <div className="adm-msgs">
              {messages.map(msg => (
                <div key={msg.id} className={`adm-msg ${msg.read ? '' : 'adm-msg--unread'}`}>
                  <div className="adm-msg__top">
                    <span className="adm-msg__subj">{msg.subject}</span>
                    <span className="adm-msg__date">{new Date(msg.created_at).toLocaleString('fr-FR')}</span>
                  </div>
                  <p className="adm-msg__body">{msg.message}</p>
                  <div className="adm-msg__foot">
                    <span className="adm-msg__mail">{msg.email || 'sans email'}</span>
                    <div className="adm-msg__act">
                      {msg.email && <a className="adm-msg__reply" href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}>Répondre</a>}
                      {!msg.read && <button className="adm-msg__mark" onClick={() => markRead(msg.id)}>Marquer lu</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default function AdminPage(){
  const { user, loading } = useAuth()
  const [pinOk, setPinOk] = useState(() => sessionStorage.getItem('rq_admin_pin_ok') === '1')
  usePageTitle('Admin')
  if(loading) return <div className="adm-loading">Chargement…</div>
  if(!user) return <AdminLogin />
  if(user.id !== ADMIN_ID) return (
    <div className="adm-login"><div className="adm-login__card">
      <h1 className="adm-login__title" style={{ color: '#FF4466' }}>Accès refusé</h1>
      <p className="adm-login__sub">Ce compte n'a pas les droits admin.</p>
    </div></div>
  )
  if(ADMIN_PIN && !pinOk) return <AdminPinGate onUnlock={() => setPinOk(true)} />
  return <Dashboard />
}
