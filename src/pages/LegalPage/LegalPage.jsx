import { useParams, Link } from 'react-router-dom'
import { legalContent } from '../../data/legalContent'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import './LegalPage.css'

export default function LegalPage() {
  // App.jsx déclare la route /legal/:page — on utilise donc "page"
  const { page } = useParams()
  const content = legalContent[page]

  usePageTitle(content ? content.title : 'Page not found')

  return (
    <div className="legal">

      {/* EN-TÊTE : navbar 1×1 + titre 2×1 */}
      <div className="legal__header">
        <div className="legal__header-nav">
          <Navbar inGrid={true} />
        </div>
        <div className="legal__header-title">
          <h1 className="legal__header-h1">
            {content ? content.title : 'Page not found'}
          </h1>
        </div>
      </div>

      <div className="legal__content">
        {content ? (
          <div className="legal__body">

            {content.updated && (
              <p className="legal__updated">Last updated: {content.updated}</p>
            )}

            {/* Rendu structuré depuis legalContent.js */}
            {content.sections.map((section, i) => (
              <div key={i} className="legal__section">
                {section.heading && (
                  <h2 className="legal__section-heading">{section.heading}</h2>
                )}
                {section.paragraphs && section.paragraphs.map((p, j) => (
                  <p key={j} className="legal__paragraph">{p}</p>
                ))}
                {section.list && (
                  <ul className="legal__list">
                    {section.list.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Formulaire de contact si page = contact */}
            {page === 'contact' && (
              <div className="legal__contact-form">
                <div className="legal__form-row">
                  <input
                    className="legal__form-input"
                    type="text"
                    placeholder="Your name"
                  />
                  <input
                    className="legal__form-input"
                    type="email"
                    placeholder="Your email"
                  />
                </div>
                <textarea
                  className="legal__form-textarea"
                  rows={5}
                  placeholder="Your message…"
                />
                <button className="legal__form-submit">Send message</button>
                <p className="legal__form-note">
                  Or email us directly at{' '}
                  <a href="mailto:hello@ragequit-arcade.com">
                    hello@ragequit-arcade.com
                  </a>
                </p>
              </div>
            )}

          </div>
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
