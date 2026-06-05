import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import './LegalPage.css'

/* Contenu des pages légales inline.
   Pour modifier le contenu, cherche la section correspondant au slug.
   Si tu as un fichier legalContent.js, remplace ce contenu par un import. */
const LEGAL_PAGES = {
  about: {
    title: 'About Ragequit Arcade',
    content: `
      <p>Ragequit Arcade is a free browser gaming platform built for players who love quick, addictive, rage-inducing fun. No downloads, no sign-up required — just open a game and play.</p>
      <h2>Our Mission</h2>
      <p>We believe great games should be instantly accessible to everyone, on any device, for free. Every game on Ragequit Arcade is crafted or selected to deliver that one-more-try feeling.</p>
      <p>We add new games regularly, so there is always something fresh to discover.</p>
      <h2>How We Stay Free</h2>
      <p>Ragequit Arcade is supported by advertising. We use non-intrusive ads to keep the platform free for everyone.</p>
      <h2>Who We Are</h2>
      <p>Ragequit Arcade is operated by Valtech Services (SIREN 994 273 118), based in France.</p>
    `,
  },
  contact: {
    title: 'Contact Us',
    content: `
      <p>Have a question, a bug to report, or a game to suggest? We'd love to hear from you.</p>
      <h2>Email</h2>
      <p><a href="mailto:hello@ragequit-arcade.com">hello@ragequit-arcade.com</a></p>
      <h2>Social</h2>
      <p>You can also reach us on <a href="https://discord.gg/ragequitarcade" target="_blank" rel="noopener noreferrer">Discord</a> or <a href="https://tiktok.com/@ragequitarcade" target="_blank" rel="noopener noreferrer">TikTok</a>.</p>
      <h2>Response Time</h2>
      <p>We typically respond within 48 hours on business days.</p>
    `,
  },
  privacy: {
    title: 'Privacy Policy',
    content: `
      <p><em>Last updated: June 2026</em></p>
      <p>This Privacy Policy describes how Ragequit Arcade (operated by Valtech Services) collects, uses, and shares information about you when you use our website.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly (such as your email address and username when creating an account) and information collected automatically (such as your IP address, browser type, and pages visited).</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information to provide and improve our services, save your game scores, and display relevant advertising.</p>
      <h2>Advertising</h2>
      <p>We use third-party advertising services (including Google AdSense) that may collect information about your browsing activity to serve personalized ads.</p>
      <h2>Your Rights</h2>
      <p>Under GDPR, you have the right to access, correct, or delete your personal data. Contact us at hello@ragequit-arcade.com.</p>
    `,
  },
  terms: {
    title: 'Terms of Use',
    content: `
      <p><em>Last updated: June 2026</em></p>
      <p>By using Ragequit Arcade, you agree to these Terms of Use.</p>
      <h2>Use of the Service</h2>
      <p>Ragequit Arcade is a free gaming platform. You may use it for personal, non-commercial purposes. You may not copy, distribute, or create derivative works from our content without permission.</p>
      <h2>Accounts</h2>
      <p>You are responsible for maintaining the security of your account. You must not use another user's account.</p>
      <h2>Content</h2>
      <p>All games on Ragequit Arcade are owned by their respective creators. Ragequit Arcade does not claim ownership over third-party game content.</p>
      <h2>Limitation of Liability</h2>
      <p>Ragequit Arcade is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.</p>
    `,
  },
  cookies: {
    title: 'Cookie Policy',
    content: `
      <p><em>Last updated: June 2026</em></p>
      <p>We use cookies to improve your experience on Ragequit Arcade.</p>
      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your device that help us remember your preferences and improve our services.</p>
      <h2>Cookies We Use</h2>
      <p><strong>Essential cookies</strong> — required for the site to function (authentication, session management).</p>
      <p><strong>Analytics cookies</strong> — help us understand how visitors use the site.</p>
      <p><strong>Advertising cookies</strong> — used by our advertising partners (including Google) to serve relevant ads.</p>
      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.</p>
    `,
  },
}

export default function LegalPage() {
  const { slug } = useParams()
  const page = LEGAL_PAGES[slug]

  const pageTitle = page ? page.title : 'Page not found'
  usePageTitle(pageTitle)

  return (
    <div className="legal">

      {/* EN-TÊTE : navbar 1×1 + titre 2×1 (même logique que toutes les pages) */}
      <div className="legal__header">
        <div className="legal__header-nav">
          <Navbar inGrid={true} />
        </div>
        <div className="legal__header-title">
          <h1 className="legal__header-h1">{pageTitle}</h1>
        </div>
      </div>

      <div className="legal__content">
        {page ? (
          <div
            className="legal__body"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        ) : (
          <div className="legal__notfound">
            <p>This page does not exist.</p>
            <Link to="/" className="legal__back">Back to home</Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
