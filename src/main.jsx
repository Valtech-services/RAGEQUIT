import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/animations.css'
import './styles/global.css'
import './i18n/i18n'
import { AuthProvider } from './context/AuthContext'
import { initGA } from './lib/analytics-ga'
import App from './App.jsx'

initGA()

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
