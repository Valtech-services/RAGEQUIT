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
