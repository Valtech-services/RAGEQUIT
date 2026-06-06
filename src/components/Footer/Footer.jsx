import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand + widget social */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Ragequit Arcade">
            <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" className="footer__logo-img" />
          </Link>
          <p className="footer__tagline">Free games. Pure rage. Every week.</p>

          {/* Widget social — 5 cartes, roue asymétrique */}
          <div className="social-widget">
            <div className="social-row">
              <a href="https://instagram.com/ragequitarcade" target="_blank"
                rel="noopener noreferrer" className="social-card social-card--instagram" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="28" height="28" fillRule="nonzero">
                  <g fillRule="nonzero" stroke="none" strokeWidth="1"><g transform="scale(8,8)">
                    <path d="M11.46875,5c-3.55078,0-6.46875,2.91406-6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078-2.91406,-6.46875-6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266-1.99609,4.46875-4.46875,4.46875h-9.0625c-2.47266,0-4.46875,-1.99609-4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0-0.90625,0.40234-0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391-0.40234,-0.90625-0.90625,-0.90625zM16,10c-3.30078,0-6,2.69922-6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078-2.69922,-6-6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266-1.77734,4-4,4c-2.22266,0-4,-1.77734-4,-4c0,-2.22266 1.77734,-4 4,-4z"/>
                  </g></g>
                </svg>
              </a>
              <a href="https://tiktok.com/@ragequitarcade" target="_blank"
                rel="noopener noreferrer" className="social-card social-card--tiktok" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
                </svg>
              </a>
              <a href="https://facebook.com/ragequitarcade" target="_blank"
                rel="noopener noreferrer" className="social-card social-card--facebook" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <div className="social-row social-row--center">
              <a href="https://x.com/ragequitarcade" target="_blank"
                rel="noopener noreferrer" className="social-card social-card--x" aria-label="X">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://discord.gg/ragequitarcade" target="_blank"
                rel="noopener noreferrer" className="social-card social-card--discord" aria-label="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28" fill="currentColor">
                  <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Jeux */}
        <div className="footer__col">
          <span className="footer__col-title">Games</span>
          <Link to="/category/sports" className="footer__link">Sports Games</Link>
          <Link to="/category/arcade" className="footer__link">Arcade Games</Link>
          <Link to="/leaderboard" className="footer__link">Leaderboard</Link>
        </div>

        {/* Société — sans TikTok/Discord (déjà dans les icônes sociales) */}
        <div className="footer__col">
          <span className="footer__col-title">Company</span>
          <Link to="/legal/about" className="footer__link">About Us</Link>
          <Link to="/legal/contact" className="footer__link">Contact</Link>
          <Link to="/legal/mentions" className="footer__link">Legal Notice</Link>
        </div>

        {/* Légal */}
        <div className="footer__col">
          <span className="footer__col-title">Legal</span>
          <Link to="/legal/privacy" className="footer__link">Privacy Policy</Link>
          <Link to="/legal/terms" className="footer__link">Terms of Use</Link>
          <Link to="/legal/cookies" className="footer__link">Cookie Policy</Link>
        </div>

      </div>
      <div className="footer__bottom">
        <span className="footer__copy">
          © {year} Ragequit Arcade — Valtech Services (SIREN 994 273 118). All rights reserved.
        </span>
      </div>
    </footer>
  )
}
