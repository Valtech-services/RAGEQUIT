// ─────────────────────────────────────────────────────────────────────────
//  Régie publicitaire du site (AdinPlay). Les jeux ne chargent JAMAIS de code
//  publicitaire : seul le site le fait, et seulement après le consentement
//  cookies (voir consent.js).
//
//  Activation : renseigner dans Vercel les variables d'environnement fournies
//  par AdinPlay lors de l'ouverture du compte :
//    VITE_ADINPLAY_TAG          URL du script (tag.min.js) propre au site
//    VITE_ADINPLAY_SLOT_SIDE    id de l'emplacement bannière à droite du jeu (desktop)
//    VITE_ADINPLAY_SLOT_BELOW   id de l'emplacement sous le jeu (desktop)
//    VITE_ADINPLAY_SLOT_MOBILE  id de l'emplacement de la fiche jeu (mobile)
//  Tant que VITE_ADINPLAY_TAG est vide, aucune pub n'est chargée, aucun
//  emplacement n'est affiché, et les jeux gardent leur pub simulée.
//
//  Pubs récompensées : le jeu envoie RH_AD_REQUEST, le site répond RH_AD_RESULT
//  (voir gameBridge.js et CLAUDE.md). Statuts possibles :
//    'completed'   pub vue en entier          -> le jeu donne la récompense
//    'skipped'     pub fermée avant la fin    -> pas de récompense
//    'unavailable' aucune pub disponible      -> le jeu donne la récompense quand même
//    'simulate'    pas de régie active        -> le jeu joue sa pub simulée de 5 s
// ─────────────────────────────────────────────────────────────────────────
import { onConsent, hasConsent } from './consent'

const TAG = import.meta.env.VITE_ADINPLAY_TAG || ''
export const SLOTS = {
  side: import.meta.env.VITE_ADINPLAY_SLOT_SIDE || '',
  below: import.meta.env.VITE_ADINPLAY_SLOT_BELOW || '',
  mobile: import.meta.env.VITE_ADINPLAY_SLOT_MOBILE || '',
}
export const ADS_ENABLED = !!TAG

let sdkPromise = null

// Charge le script AdinPlay une seule fois, après consentement.
export function loadAds() {
  if (!ADS_ENABLED || typeof window === 'undefined') return Promise.resolve(false)
  if (sdkPromise) return sdkPromise
  sdkPromise = new Promise((resolve) => {
    onConsent(() => {
      window.aiptag = window.aiptag || { cmd: { display: [], player: [] } }
      const s = document.createElement('script')
      s.src = TAG
      s.async = true
      s.onload = () => resolve(true)
      s.onerror = () => resolve(false)
      document.head.appendChild(s)
    })
  })
  return sdkPromise
}

// Affiche une bannière dans l'élément dont l'id est `slotId`.
export function displaySlot(slotId) {
  if (!ADS_ENABLED || !slotId) return
  loadAds().then((ok) => {
    if (!ok) return
    try { window.aiptag.cmd.display.push(() => { window.aipDisplayTag.display(slotId) }) } catch { /* régie indisponible */ }
  })
}

// Lance une pub récompensée. Résout toujours (jamais d'exception) avec un statut.
// L'API vidéo d'AdinPlay (aipPlayer) est isolée ici : à vérifier avec la
// documentation remise par AdinPlay à l'activation du compte.
export function showRewarded(context) {
  if (!ADS_ENABLED || !hasConsent()) return Promise.resolve('simulate')
  return loadAds().then((ok) => new Promise((resolve) => {
    if (!ok || !window.aiptag) { resolve('unavailable'); return }
    let done = false
    const finish = (status) => { if (!done) { done = true; clearTimeout(guard); resolve(status) } }
    const guard = setTimeout(() => finish('unavailable'), 90000)
    try {
      window.aiptag.cmd.player.push(() => {
        if (!window.aiptag.adplayer) {
          window.aiptag.adplayer = new window.aipPlayer({
            AD_DISPLAY: 'fullscreen',
            LOADING_TEXT: 'Loading advertisement',
            AIP_REWARDEDGRANTED: () => { window.aiptag.__rqStatus = 'completed' },
            AIP_REWARDEDCOMPLETE: (evt) => {
              const st = window.aiptag.__rqStatus || (evt === 'timeout' || evt === 'empty' ? 'unavailable' : 'skipped')
              window.aiptag.__rqStatus = null
              window.aiptag.__rqDone?.(st)
            },
          })
        }
        window.aiptag.__rqStatus = null
        window.aiptag.__rqDone = finish
        window.aiptag.adplayer.startRewardedAd({ preroll: true, context })
      })
    } catch { finish('unavailable') }
  }))
}
