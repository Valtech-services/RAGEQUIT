import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { games } from '../../data/games'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { submitScore } from '../../data/leaderboardStore'
import { submitVote, submitReport } from '../../data/feedbackStore'
import { track } from '../../lib/analytics'
import Navbar from '../../components/Navbar/Navbar'
import GameCard from '../../components/GameCard/GameCard'
import SeoBlock from '../../components/SeoBlock/SeoBlock'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import './MobileGamePage.css'

export default function MobileGamePage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const game = games.find(g => g.id === id)
  const { recordPlay, user, profile, signInGoogle } = useAuth()
  const iframeRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [sessionStart] = useState(Date.now())
  const [vote, setVote] = useState(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportSubject, setReportSubject] = useState('')
  const [reportComment, setReportComment] = useState('')
  const [reportSent, setReportSent] = useState(false)
  const [reportBusy, setReportBusy] = useState(false)
  usePageTitle(game?.title, game?.seo?.metaDescription)

  const handlePlay = () => {
    setPlaying(true)
    if (game) track('game_start', { game_id: game.id, category: game.category })
    try { document.documentElement.requestFullscreen?.() } catch (e) {}
  }

  const handleBack = () => {
    setPlaying(false)
    try { if (document.fullscreenElement) document.exitFullscreen() } catch (e) {}
  }

  useEffect(() => {
    if (playing) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [playing])

  useEffect(() => {
    return () => {
      try { if (document.fullscreenElement) document.exitFullscreen() } catch (e) {}
      document.body.style.overflow = ''
    }
  }, [])

  // Track page vue jeu
  useEffect(() => {
    if (game) track('game_view', { game_id: game.id, category: game.category })
  }, [id])

  // Écrit l'état complet de Stellar Forge dans Supabase (joueurs connectés).
  async function saveStellarForgeCloud(){
    if (!user || !iframeRef.current) return
    try {
      const snap = iframeRef.current.contentWindow.stellarForgeGetState?.()
      if (snap && snap.state) {
        await supabase.from('game_saves').upsert({
          user_id: user.id,
          game_id: 'stellar-forge',
          state: snap.state,
          total_ore: snap.total_ore || 0,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,game_id' })
      }
    } catch (err) { /* silencieux */ }
  }
async function saveVirusLabCloud(){
    if(!user || !iframeRef.current) return
    try {
      const snap = iframeRef.current.contentWindow.virusLabGetState?.()
      if(!snap || !snap.state) return
      // Garde 1 : ne jamais sauvegarder un état vierge (aucun virus, campagne au début).
      // Empêche un démarrage à vide d'écraser une vraie sauvegarde cloud.
      if(!snap.hasContent) return
      // Garde 2 : lire l'avancement déjà stocké dans le cloud, et ne remplacer
      // que si l'état local est au moins aussi avancé. On compare progress puis dna.
      const localAdv = (snap.progress || 0) * 1000000 + (snap.dna || 0)
      const { data: existing } = await supabase
        .from('game_saves')
        .select('state, total_ore')
        .eq('user_id', user.id)
        .eq('game_id', 'virus-lab')
        .maybeSingle()
      if(existing && existing.state){
        const cs = existing.state
        const cloudAdv = ((cs.progress|0)) * 1000000 + ((cs.dna|0))
        // Si le cloud est STRICTEMENT plus avancé, on ne l'écrase pas.
        if(cloudAdv > localAdv) return
      }
      await supabase.from('game_saves').upsert({
        user_id: user.id,
        game_id: 'virus-lab',
        state: snap.state,
        total_ore: snap.progress || 0,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,game_id' })
    } catch(err) { /* silencieux */ }
  }
  // Publie le virus actif du joueur dans l'arène (table virus_lab_arena).
  async function publishVirusLab(payload){
    if(!user || !iframeRef.current) return
    let ok = false
    try {
      const { error } = await supabase.from('virus_lab_arena').upsert({
        user_id: user.id,
        username: profile?.username || null,
        virus_name: payload.virus_name,
        genome: payload.genome,
        look: payload.look,
        arena_score: payload.arena_score || 1000,
        wins: payload.wins || 0,
        losses: payload.losses || 0,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      ok = !error
    } catch(err) { ok = false }
    iframeRef.current?.contentWindow?.postMessage({ type: 'VIRUS_LAB_PUBLISHED', ok }, '*')
  }
  // Réception des messages postMessage envoyés par le jeu HTML (score + analytics).
  useEffect(() => {
    async function handleMessage(e) {
      const d = e.data
      if (!d || typeof d.type !== 'string') return
      // --- Virus Lab : le jeu demande l'état de connexion ---
      if(d.type === 'VIRUS_LAB_READY'){
        iframeRef.current?.contentWindow?.postMessage({
          type: 'VIRUS_LAB_AUTH',
          signedIn: !!user,
          userId: user?.id || null,
          username: profile?.username || null,
        }, '*')
        return
      }
      // --- Virus Lab : le jeu demande d'ouvrir la connexion Google ---
      if(d.type === 'VIRUS_LAB_REQUEST_LOGIN'){
        signInGoogle()
        return
      }
      // --- Virus Lab : le jeu demande une sauvegarde cloud ---
      if(d.type === 'VIRUS_LAB_SAVE_CLOUD'){
        await saveVirusLabCloud()
        return
      }
      // --- Virus Lab : le jeu demande la liste des virus publiés (arène) ---
      if(d.type === 'VIRUS_LAB_ARENA_REQUEST'){
        const { data } = await supabase
          .from('virus_lab_arena')
          .select('user_id, username, virus_name, genome, look, arena_score, wins, losses')
          .order('arena_score', { ascending: false })
          .limit(50)
        iframeRef.current?.contentWindow?.postMessage({
          type: 'VIRUS_LAB_ARENA_LIST',
          viruses: data || [],
        }, '*')
        return
      }
      // --- Virus Lab : le jeu est prêt pour sa sauvegarde cloud ---
      if(d.type === 'VIRUS_LAB_CLOUD_READY' && user){
        const { data } = await supabase
          .from('game_saves')
          .select('state')
          .eq('user_id', user.id)
          .eq('game_id', 'virus-lab')
          .maybeSingle()
        if(data && data.state && iframeRef.current){
          iframeRef.current.contentWindow.postMessage(
            { type: 'VIRUS_LAB_CLOUD_STATE', state: data.state }, '*'
          )
        }
        return
      }
      // --- Virus Lab : publier le virus dans l'arène ---
      if(d.type === 'VIRUS_LAB_PUBLISH'){
        if(user && d.payload) await publishVirusLab(d.payload)
        else iframeRef.current?.contentWindow?.postMessage({ type: 'VIRUS_LAB_PUBLISHED', ok: false }, '*')
        return
      }

      // --- Stellar Forge : le jeu est prêt → on lui renvoie sa sauvegarde cloud ---
      if (d.type === 'STELLAR_FORGE_READY' && user) {
        const { data } = await supabase
          .from('game_saves')
          .select('state')
          .eq('user_id', user.id)
          .eq('game_id', 'stellar-forge')
          .maybeSingle()
        if (data && data.state && iframeRef.current) {
          iframeRef.current.contentWindow.postMessage(
            { type: 'STELLAR_FORGE_LOAD', state: data.state }, '*'
          )
        }
        return
      }

      // --- Stellar Forge : envoi périodique (toutes les 60s) ---
      // 1) sauvegarde cloud de l'état complet, 2) score Kardashev au leaderboard.
      if (d.type === 'STELLAR_FORGE_SCORE') {
        await saveStellarForgeCloud()
        const kValue = typeof d.kardashev === 'number' ? d.kardashev : 0
        const tier = d.kardashev_tier || '0'
        const pct = Math.round(d.kardashev_pct || 0)
        await submitScore({
          game: 'stellar-forge',
          mode: 'classic',
          score: Math.round(kValue * 1000),
          scoreLabel: `Type ${tier} · ${pct}%`,
        })
        if (recordPlay) recordPlay('stellar-forge')
        window.dispatchEvent(new Event('rh-score-saved'))
        return
      }

      // --- Autres jeux (STAQ, Rage Hockey…) : score classique ---
if (d.type.endsWith('_SCORE')) {
        await submitScore({ game: d.game, mode: d.mode, score: d.score, scoreLabel: d.scoreLabel, difficulty: d.diff, arena: d.arena })
        if (d.game) recordPlay(d.game)
        window.dispatchEvent(new Event('rh-score-saved'))
        if (d.game === 'virus-lab') await saveVirusLabCloud()
        const duration = Math.round((Date.now() - sessionStart) / 1000)
        track('game_end', {
          game_id: d.game,
          props: { mode: d.mode, score: d.score, diff: d.diff, duration_secs: duration }
        })
      }

      // Analytics depuis le jeu HTML (boost, pub, perfect…)
      if (d.type === 'RH_TRACK') {
        track(d.event, { game_id: d.game_id, props: d.props })
      }
    }

    window.addEventListener('message', handleMessage)
    const saveOnLeave = () => { saveStellarForgeCloud(); saveVirusLabCloud() }
    window.addEventListener('pagehide', saveOnLeave)
    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('pagehide', saveOnLeave)
    }
  }, [recordPlay, user])
  // Informe Virus Lab (iframe) de tout changement d'état de connexion.
  useEffect(() => {
    if(game?.id !== 'virus-lab') return
    iframeRef.current?.contentWindow?.postMessage({
      type: 'VIRUS_LAB_AUTH',
      signedIn: !!user,
      userId: user?.id || null,
      username: profile?.username || null,
    }, '*')
  }, [user, profile, playing])

  if (!game) {
    return (
      <div className="mgp mgp--notfound">
        <span>{t('common.gameNotFound')}</span>
        <Link to="/" className="mgp__back-link">{t('common.backToHome')}</Link>
      </div>
    )
  }

  const related = games.filter(g => g.id !== game.id).slice(0, 12)

  /* ---- MODE JEU : plein écran simulé ---- */
  if (playing) {
    return (
      <div className="mgp mgp--playing">
        <button className="mgp__back-overlay" onClick={handleBack} aria-label={t('common.back')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <iframe
          ref={iframeRef}
          className="mgp__iframe"
          src={`/games/${game.id}.html`}
          title={game.title}
          allow="fullscreen; autoplay; gamepad; pointer-lock"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
        />
      </div>
    )
  }

  /* ---- MODE ACCUEIL : façon Poki ---- */
  return (
    <div className="mgp mgp--preview">
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="rqGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#FF2D78" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mgp__header">
        <div className="mgp__header-nav">
          <Navbar inGrid={true} />
        </div>
        <div className="mgp__header-title">
          <h1 className="mgp__title">{game.title}</h1>
          <span className="mgp__by">{t('game.by')} {game.author}</span>
        </div>
      </div>
      <div className="mgp__actions">
        <button className={`mgp__action ${vote==='up'?'is-up':''}`} aria-label="Like"
          onClick={() => { const v = vote==='up'?null:'up'; setVote(v); if(v){ submitVote(game.id,'up'); track('game_vote',{game_id:game.id,props:{vote:'up'}}) } }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
        </button>
        <button className={`mgp__action ${vote==='down'?'is-down':''}`} aria-label="Dislike"
          onClick={() => { const v = vote==='down'?null:'down'; setVote(v); if(v){ submitVote(game.id,'down'); track('game_vote',{game_id:game.id,props:{vote:'down'}}) } }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>
        </button>
        <button className="mgp__action" aria-label="Report" onClick={() => setReportOpen(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
        </button>
      </div>
      <button
        className="mgp__hero"
        onClick={handlePlay}
        style={{ backgroundImage: `url(${game.thumbnail})` }}
        aria-label={`${t('game.play')} ${game.title}`}
      >
        <span className="mgp__hero-overlay" />
        <span className="mgp__hero-play">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
        <span className="mgp__hero-label">{t('game.play')}</span>
      </button>
      {/* Bannière publicitaire mobile — placeholder en attendant AdSense. */}
      <div className="mgp__ad">
        <span className="mgp__ad-label">{t('game.advertisement')}</span>
      </div>
      <div className="mgp__related">
        {related.map(g => (
          <div key={g.id} className="mgp__related-cell">
            <GameCard game={g} size="small" />
          </div>
        ))}
      </div>
      <SeoBlock
        type="game"
        data={game.seo ? {
          ...game.seo,
          description: game.description,
          controls: game.controls,
          author: game.author,
          title: game.title,
        } : null}
      />
      {reportOpen && (
        <div className="mgp__report-overlay" onClick={() => { setReportOpen(false); setReportSent(false) }}>
          <div className="mgp__report" onClick={e => e.stopPropagation()}>
            <h3 className="mgp__report-title">Report a problem</h3>
            {!user ? (
              <>
                <p className="mgp__report-text">You need to be signed in to report a problem or leave a comment.</p>
                <button className="mgp__report-send" onClick={() => { setReportOpen(false); signInGoogle() }}>Sign in</button>
                <button className="mgp__report-cancel" onClick={() => setReportOpen(false)}>Cancel</button>
              </>
            ) : reportSent ? (
              <>
                <p className="mgp__report-text">Thanks! Your report has been sent.</p>
                <button className="mgp__report-cancel" onClick={() => { setReportOpen(false); setReportSent(false) }}>Close</button>
              </>
            ) : (
              <>
                <p className="mgp__report-text">What's wrong with {game.title}?</p>
                <input className="mgp__report-input" type="text" placeholder="Subject"
                  value={reportSubject} maxLength={120}
                  onChange={e => setReportSubject(e.target.value)} />
                <textarea className="mgp__report-textarea" rows={4} placeholder="Describe the problem or leave a comment…"
                  value={reportComment} maxLength={1000}
                  onChange={e => setReportComment(e.target.value)} />
                <button className="mgp__report-send" disabled={reportBusy || !reportSubject.trim()}
                  onClick={async () => {
                    setReportBusy(true)
                    const ok = await submitReport(game.id, reportSubject, reportComment, user.id)
                    setReportBusy(false)
                    if(ok){ setReportSent(true); setReportSubject(''); setReportComment('') }
                  }}>
                  {reportBusy ? 'Sending…' : 'Send report'}
                </button>
                <button className="mgp__report-cancel" onClick={() => setReportOpen(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
