import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/animations.css'
import './styles/global.css'
import i18n, { firstVisit } from './i18n/i18n'
import { CONTENT_LANGS, langFromPath, withLang } from './i18n/locale'
import { AuthProvider } from './context/AuthContext'
import { initGA } from './lib/analytics-ga'
import App from './App.jsx'

initGA()

/* Langue d'interface alignée sur l'URL avant le premier rendu (pas de flash). */
const urlLang = langFromPath(window.location.pathname)
if (urlLang !== 'en') i18n.changeLanguage(urlLang)
else if (firstVisit) {
  // Première visite d'un francophone, hispanophone ou lusophone sur une page
  // anglaise : on l'envoie vers la version dans sa langue (une seule fois).
  const nav = (navigator.language || '').slice(0, 2)
  if (CONTENT_LANGS.includes(nav)) {
    window.history.replaceState(null, '', withLang(window.location.pathname, nav) + window.location.search + window.location.hash)
    i18n.changeLanguage(nav)
  }
} else if (CONTENT_LANGS.includes((i18n.language || '').slice(0, 2))) {
  i18n.changeLanguage('en')
}

/*
  La page arrive déjà remplie par le prérendu (HTML lisible par Google).
  React prend ensuite le relais et redessine la page à l'identique.
*/
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
