import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieBanner.css'

/*
  CookieBanner — bandeau de consentement RGPD, requis pour AdSense en Europe.
  Le choix est stocké dans localStorage. Tant qu'aucun choix n'est fait,
  les cookies publicitaires non-essentiels ne doivent pas être activés.
  Branche l'init de Google AdSense sur l'acceptation (voir commentaire).
*/
const STORAGE_KEY = 'rq_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const choice = localStorage.getItem(STORAGE_KEY)
      if (!choice) setVisible(true)
    } catch (e) {
      setVisible(true)
    }
  }, [])

  const decide = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value) } catch (e) {}
    setVisible(false)
    // Si "accepted", c'est ICI qu'on initialise les cookies publicitaires.
    // Exemple :
    // if (value === 'accepted' && window.gtag) {
    //   window.gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' })
    // }
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <strong className="cookie-banner__title">We use cookies</strong>
          <p>
            We use cookies to keep our games free, analyze traffic, and serve
            relevant ads. You can accept all cookies or only the essential ones.{' '}
            <Link to="/legal/cookies" className="cookie-banner__link">Learn more</Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button
            className="cookie-banner__btn cookie-banner__btn--ghost"
            onClick={() => decide('essential')}
          >
            Essential only
          </button>
          <button
            className="cookie-banner__btn cookie-banner__btn--accept"
            onClick={() => decide('accepted')}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}