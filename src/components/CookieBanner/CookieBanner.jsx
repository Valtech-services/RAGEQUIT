import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getConsent, setConsent } from '../../lib/consent'
import './CookieBanner.css'

/*
  CookieBanner — bandeau de consentement RGPD, requis pour AdSense en Europe.

  Le choix est géré par le module central lib/consent.js (source de vérité).
  Tant qu'aucun choix n'est fait, AUCUN cookie publicitaire/analytique ne doit
  être activé — l'initialisation de la pub se branche via onConsent() dans
  consent.js, pas ici.

  La bannière réapparaît si l'utilisateur clique "Gérer les cookies" dans le
  footer (cela déclenche resetConsent(), qui émet l'event 'rq-consent-change').
*/

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Affiche la bannière si aucun choix n'a encore été fait
    if (!getConsent()) setVisible(true)

    // Réagit aux changements de consentement (ex : reset depuis le footer)
    const onChange = (e) => {
      const value = e?.detail?.value
      setVisible(!value) // null => réafficher ; sinon masquer
    }
    window.addEventListener('rq-consent-change', onChange)
    return () => window.removeEventListener('rq-consent-change', onChange)
  }, [])

  const decide = (value) => {
    setConsent(value) // écrit le choix + émet l'event (déclenche onConsent si 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label={t('cookies.aria', 'Cookie consent')}>
      <div className="cookie-banner__inner">
        <div className="cookie-banner__text">
          <strong className="cookie-banner__title">
            {t('cookies.title', 'We use cookies')}
          </strong>
          <p>
            {t('cookies.body', 'We use cookies to keep our games free, analyze traffic, and serve relevant ads. You can accept all cookies or only the essential ones.')}{' '}
            <Link to="/legal/cookies" className="cookie-banner__link">
              {t('cookies.learnMore', 'Learn more')}
            </Link>
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button
            className="cookie-banner__btn cookie-banner__btn--ghost"
            onClick={() => decide('essential')}
          >
            {t('cookies.essential', 'Essential only')}
          </button>
          <button
            className="cookie-banner__btn cookie-banner__btn--accept"
            onClick={() => decide('accepted')}
          >
            {t('cookies.acceptAll', 'Accept all')}
          </button>
        </div>
      </div>
    </div>
  )
}
