/* =====================================================================
   consent.js — gestion centrale du consentement cookies (RGPD)

   Principe : AUCUN script publicitaire ou analytique ne doit se charger
   tant que l'utilisateur n'a pas explicitement accepté. Ce module est la
   source de vérité unique : la CookieBanner écrit le choix ici, et tout
   le code pub/analytics lit l'état via ces fonctions.

   Valeurs possibles stockées :
   - 'accepted'  : l'utilisateur accepte les cookies pub + analytics
   - 'essential' : seuls les cookies essentiels (aucun pub/analytics)
   - null        : aucun choix fait → on bloque tout par défaut
   ===================================================================== */

const STORAGE_KEY = 'rq_cookie_consent'

// Lecture brute du choix stocké
export function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) // 'accepted' | 'essential' | null
  } catch (e) {
    return null
  }
}

// L'utilisateur a-t-il accepté les cookies non essentiels (pub + analytics) ?
export function hasConsent() {
  return getConsent() === 'accepted'
}

// Un choix a-t-il déjà été fait (peu importe lequel) ?
export function hasDecided() {
  return getConsent() !== null
}

// Enregistre le choix et notifie le reste de l'app (event global)
export function setConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch (e) {}
  // Notifie tous les écouteurs (ex : initialisation pub) du changement
  try {
    window.dispatchEvent(new CustomEvent('rq-consent-change', { detail: { value } }))
  } catch (e) {}
}

// Efface le choix → la bannière réapparaîtra (utilisé par "Gérer les cookies")
export function resetConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {}
  try {
    window.dispatchEvent(new CustomEvent('rq-consent-change', { detail: { value: null } }))
  } catch (e) {}
}

/* ---------------------------------------------------------------------
   onConsent(callback)
   Exécute `callback` immédiatement si le consentement pub est déjà donné,
   et/ou dès qu'il sera donné plus tard. C'est le point d'entrée pour
   brancher l'initialisation d'AdSense ou de toute régie pub.

   Exemple d'utilisation (quand tu activeras AdSense) :

     import { onConsent } from './lib/consent'
     onConsent(() => {
       const s = document.createElement('script')
       s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX'
       s.async = true
       s.crossOrigin = 'anonymous'
       document.head.appendChild(s)
     })

   Le callback ne s'exécute qu'UNE fois (à la première acceptation).
   --------------------------------------------------------------------- */
export function onConsent(callback) {
  let fired = false
  const run = () => {
    if (fired) return
    fired = true
    try { callback() } catch (e) {}
  }
  if (hasConsent()) {
    run()
    return () => {}
  }
  const handler = (e) => {
    if (e?.detail?.value === 'accepted') run()
  }
  window.addEventListener('rq-consent-change', handler)
  // Retourne une fonction de nettoyage
  return () => window.removeEventListener('rq-consent-change', handler)
}

/* ---------------------------------------------------------------------
   CMP Google certifiée TCF v2.2 (point d'audit A-016)

   Le script de Google (« Confidentialité et messages » d'AdSense) est chargé
   dans index.html. Pour les visiteurs de l'EEE, du Royaume-Uni et de la
   Suisse, c'est lui qui affiche le message de consentement ; on lit alors
   le choix via l'API TCF (__tcfapi) et on le recopie dans ce module :
   'accepted' si la finalité 1 (stocker des informations) et Google
   (fournisseur 755) sont acceptés, sinon 'essential'.

   Repli : tant que le message n'est pas publié dans AdSense, hors EEE, ou si
   le script est bloqué, la CMP ne s'affiche pas dans le délai CMP_WAIT_MS
   et notre propre bandeau prend le relais (comportement d'origine).
   --------------------------------------------------------------------- */
const CMP_WAIT_MS = 2500
const GOOGLE_VENDOR_ID = 755
let cmpState = 'pending' // 'pending' | 'active' | 'absent'
let cmpStarted = false

export function getCmpState() { return cmpState }

function setCmpState(state) {
  if (cmpState === state) return
  cmpState = state
  try { window.dispatchEvent(new CustomEvent('rq-cmp-state', { detail: { state } })) } catch (e) {}
}

function tcfToConsent(tc) {
  const purposes = tc?.purpose?.consents || {}
  const vendors = tc?.vendor?.consents || {}
  return purposes[1] && vendors[GOOGLE_VENDOR_ID] ? 'accepted' : 'essential'
}

export function initCmp() {
  if (cmpStarted || typeof window === 'undefined') return
  cmpStarted = true
  let attached = false
  const started = Date.now()
  const giveUp = setTimeout(() => { if (cmpState === 'pending') setCmpState('absent') }, CMP_WAIT_MS)

  const attach = () => {
    if (attached) return
    if (typeof window.__tcfapi !== 'function') {
      if (Date.now() - started < 10000) setTimeout(attach, 150)
      return
    }
    attached = true
    try {
      window.__tcfapi('addEventListener', 2, (tc, ok) => {
        if (!ok || !tc) return
        if (tc.gdprApplies === false) {
          // Hors EEE / UK / CH : la CMP Google n'affiche rien, notre bandeau reste.
          clearTimeout(giveUp)
          setCmpState('absent')
          return
        }
        const st = tc.eventStatus
        if (st === 'cmpuishown' || st === 'tcloaded' || st === 'useractioncomplete') {
          clearTimeout(giveUp)
          setCmpState('active')
          if (st !== 'cmpuishown') setConsent(tcfToConsent(tc))
        }
      })
    } catch (e) {}
  }
  attach()
}

/* Lien « Gérer les cookies » : rouvre la CMP Google si elle est active,
   sinon fait réapparaître notre bandeau. */
export function manageConsent() {
  if (cmpState === 'active') {
    try {
      window.googlefc = window.googlefc || {}
      window.googlefc.callbackQueue = window.googlefc.callbackQueue || []
      window.googlefc.callbackQueue.push(() => window.googlefc.showRevocationMessage())
      return
    } catch (e) {}
  }
  resetConsent()
}
