import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import { LANGUAGES } from '../../i18n/i18n'
import Flag from './flags.jsx'
import './LanguageSwitcher.css'

/*
  LanguageSwitcher — bouton turquoise + modal façon Poki.
  Drapeaux SVG inline en couleur (aucune dépendance npm).
*/
export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const current = LANGUAGES.find(l => l.code === i18n.language)
    || LANGUAGES.find(l => i18n.language?.startsWith(l.code))
    || LANGUAGES[0]

  function pick(code) {
    i18n.changeLanguage(code)
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
    setOpen(false)
  }

  return (
    <>
      <button className="lang-switch" onClick={() => setOpen(true)} aria-label="Change language">
        <Flag country={current.country} />
        <span className="lang-switch__label">{current.label}</span>
        <svg className="lang-switch__chevron" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
        </svg>
      </button>

      {open && createPortal(
        <div className="lang-modal-overlay" onClick={() => setOpen(false)}>
          <div className="lang-modal" onClick={e => e.stopPropagation()}>
            <div className="lang-modal__head">
              <h2 className="lang-modal__title">Select your language</h2>
              <button className="lang-modal__close" onClick={() => setOpen(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="lang-modal__grid">
              {LANGUAGES.map(lang => (
                <button key={lang.code}
                  className={`lang-modal__item ${lang.code === current.code ? 'is-active' : ''}`}
                  onClick={() => pick(lang.code)}>
                  <Flag country={lang.country} />
                  <span className="lang-modal__item-label">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
