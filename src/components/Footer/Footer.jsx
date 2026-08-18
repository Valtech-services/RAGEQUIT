import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { track } from '../../lib/analytics'
import { resetConsent } from '../../lib/consent'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const social = (network) => track('social_click', { props: { network } })
  const footerLink = (section, label) => track('footer_click', { props: { section, label } })

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Ragequit Arcade">
            <img src="/ragequit-logo-white.png" alt="Ragequit Arcade" className="footer__logo-img" />
          </Link>
          <p className="footer__tagline">{t('footer.tagline')}</p>
          <div className="footer__lang">
            <LanguageSwitcher />
          </div>
<div className="social-widget">
            <div className="social-row">
              <a href="https://www.instagram.com/ragequit_arcade/" target="_blank" rel="noopener noreferrer"
                className="social-card social-card--instagram" aria-label="Instagram" onClick={() => social('instagram')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="28" height="28" fillRule="nonzero"><g fillRule="nonzero" stroke="none" strokeWidth="1"><g transform="scale(8,8)"><path d="M11.46875,5c-3.55078,0-6.46875,2.91406-6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078-2.91406,-6.46875-6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266-1.99609,4.46875-4.46875,4.46875h-9.0625c-2.47266,0-4.46875,-1.99609-4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0-0.90625,0.40234-0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391-0.40234,-0.90625-0.90625,-0.90625zM16,10c-3.30078,0-6,2.69922-6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078-2.69922,-6-6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266-1.77734,4-4,4c-2.22266,0-4,-1.77734-4,-4c0,-2.22266 1.77734,-4 4,-4z"/></g></g></svg>
              </a>
              <a href="https://www.tiktok.com/@ragequit.arcade" target="_blank" rel="noopener noreferrer"
                className="social-card social-card--tiktok" aria-label="TikTok" onClick={() => social('tiktok')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.83 1.56V6.79a4.85 4.85 0 0 1-1.06-.1z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590613932840" target="_blank" rel="noopener noreferrer"
                className="social-card social-card--facebook" aria-label="Facebook" onClick={() => social('facebook')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://x.com/ragequitarcade" target="_blank" rel="noopener noreferrer"
                className="social-card social-card--x" aria-label="X" onClick={() => social('x')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
<div className="footer__col">
          <span className="footer__col-title">{t('footer.games')}</span>
          <Link to="/category/sports" className="footer__link" onClick={() => footerLink('games','sports')}>{t('footer.sportsGames')}</Link>
          <Link to="/category/arcade" className="footer__link" onClick={() => footerLink('games','arcade')}>{t('footer.arcadeGames')}</Link>
          <Link to="/category/idle" className="footer__link" onClick={() => footerLink('games','idle')}>{t('footer.idleGames', 'Idle / Clicker Games')}</Link>
          <Link to="/leaderboard" className="footer__link" onClick={() => footerLink('games','leaderboard')}>{t('footer.leaderboard')}</Link>
        </div>
        <div className="footer__col">
          <span className="footer__col-title">{t('footer.company')}</span>
          <Link to="/legal/about" className="footer__link" onClick={() => footerLink('company','about')}>{t('footer.aboutUs')}</Link>
          <Link to="/legal/contact" className="footer__link" onClick={() => footerLink('company','contact')}>{t('footer.contact')}</Link>
          <Link to="/legal/mentions" className="footer__link" onClick={() => footerLink('company','mentions')}>{t('footer.legalNotice')}</Link>
        </div>
        <div className="footer__col">
          <span className="footer__col-title">{t('footer.legal')}</span>
          <Link to="/legal/privacy" className="footer__link" onClick={() => footerLink('legal','privacy')}>{t('footer.privacy')}</Link>
          <Link to="/legal/terms" className="footer__link" onClick={() => footerLink('legal','terms')}>{t('footer.terms')}</Link>
          <Link to="/legal/cookies" className="footer__link" onClick={() => footerLink('legal','cookies')}>{t('footer.cookies')}</Link>
          <button type="button" className="footer__link footer__link--btn" onClick={() => { resetConsent(); footerLink('legal','manage-cookies') }}>{t('footer.manageCookies', 'Manage cookies')}</button>
        </div>

      </div>
      <div className="footer__bottom">
        <span className="footer__copy">{t('footer.copyright', { year })}</span>
      </div>
    </footer>
  )
}
