import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import { LANGUAGES } from '../../i18n/i18n'
import { useLocation, useNavigate } from 'react-router-dom'
import { CONTENT_LANGS, RTL_LANGS, withLang } from '../../i18n/locale'
import { loadTranslations } from '../../data/localized'
import Flag from './flags.jsx'
import './LanguageSwitcher.css'

/*
  LanguageSwitcher — bouton turquoise + modal façon Poki.
  Drapeaux SVG inline en couleur (aucune dépendance npm).
*/
export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()

  const current = LANGUAGES.find(l => l.code === i18n.language)
    || LANGUAGES.find(l => i18n.language?.startsWith(l.code))
    || LANGUAGES[0]

  async function pick(code) {
    // Langues avec contenu traduit : on change d'URL (/fr/..., /de/..., ...).
    // Autres langues : interface traduite, contenu anglais à la racine.
    setOpen(false)
    const content = CONTENT_LANGS.includes(code)
    if (content) await loadTranslations(code)
    const target = withLang(pathname, content ? code : 'en') + search
    if (target !== pathname + search) navigate(target)
    i18n.changeLanguage(code)
    document.documentElement.dir = RTL_LANGS.includes(code) ? 'rtl' : 'ltr'
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
