import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/animations.css'
import './styles/global.css'
import './i18n/i18n'
import { AuthProvider } from './context/AuthContext'
import { initGA } from './lib/analytics-ga'
import App from './App.jsx'

initGA()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
