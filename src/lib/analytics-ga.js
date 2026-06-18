/* =====================================================================
   analytics-ga.js — Google Analytics 4, chargé UNIQUEMENT après consentement.

   GA ne se charge JAMAIS tant que l'utilisateur n'a pas accepté les cookies
   non essentiels. On s'appuie sur onConsent() de consent.js : le callback
   ne s'exécute qu'à l'acceptation (immédiatement si déjà accepté, sinon dès
   que l'utilisateur clique "Accepter").

   Usage : importer et appeler initGA() une seule fois au démarrage de l'app
   (dans main.jsx ou App.jsx) :

     import { initGA } from './lib/analytics-ga'
     initGA()
   ===================================================================== */

import { onConsent } from './consent'

const GA_ID = 'G-7HVX2H78LY'
let loaded = false

function loadGA() {
  if (loaded) return
  loaded = true

  // Charge le script gtag.js
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  // Initialise la couche de données gtag
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  // anonymize_ip : IP tronquée côté Google (cohérent avec ton choix sans IP)
  gtag('config', GA_ID, { anonymize_ip: true })
}

// Branche le chargement de GA sur le consentement.
// - Si déjà accepté : GA se charge tout de suite.
// - Sinon : GA se chargera dès que l'utilisateur acceptera.
// - S'il refuse (essential) : GA ne se charge jamais.
export function initGA() {
  onConsent(loadGA)
}
