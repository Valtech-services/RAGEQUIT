import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { legalContent } from '../../data/legalContent'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import './LegalPage.css'

/* =====================================================================
   Formulaire de contact — envoie à hello@ragequit-arcade.com via
   la fonction Supabase Edge Function "send-contact".
   L'utilisateur doit être connecté pour envoyer un message.
   ===================================================================== */
function ContactForm({ user }) {
  const [subject, setSubject]   = useState('')
  const [message, setMessage]   = useState('')
  const [busy, setBusy]         = useState(false)
  const [sent, setSent]         = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit() {
    if (!subject.trim() || !message.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setBusy(true)
    setError('')
    try {
      // Insère le message dans la table contact_messages.
      // Une Edge Function ou un trigger Supabase peut ensuite
      // relayer l'email vers hello@ragequit-arcade.com.
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({
          user_id: user.id,
          email:   user.email,
          subject: subject.trim(),
          message: message.trim(),
        })

      if (dbError) throw dbError
      setSent(true)
    } catch (e) {
      setError('An error occurred. Please email us directly at hello@ragequit-arcade.com.')
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div className="legal__contact-success">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="9,12 11,14 15,10"/>
        </svg>
        <h3>Message sent!</h3>
        <p>We will get back to you at <strong>{user.email}</strong> as soon as possible.</p>
      </div>
    )
  }

  return (
    <div className="legal__contact-form">
      <div className="legal__form-meta">
        <span className="legal__form-from">From: <strong>{user.email}</strong></span>
      </div>
      <input
        className="legal__form-input"
        type="text"
        placeholder="Subject"
        value={subject}
        maxLength={120}
        onChange={e => setSubject(e.target.value)}
      />
      <textarea
        className="legal__form-textarea"
        rows={6}
        placeholder="Your message…"
        value={message}
        maxLength={2000}
        onChange={e => setMessage(e.target.value)}
      />
      {error && <p className="legal__form-error">{error}</p>}
      <button className="legal__form-submit" onClick={handleSubmit} disabled={busy}>
        {busy ? 'Sending…' : 'Send message'}
      </button>
      <p className="legal__form-note">
        Or email us directly at{' '}
        <a href="mailto:hello@ragequit-arcade.com">hello@ragequit-arcade.com</a>
      </p>
    </div>
  )
}

/* =====================================================================
   PAGE PRINCIPALE
   ===================================================================== */
export default function LegalPage() {
  const { page } = useParams()   // correspond à la route /legal/:page dans App.jsx
  const content  = legalContent[page]
  const { user } = useAuth()

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

            {content.sections.map((section, i) => (
              <div key={i} className="legal__section">
                {section.heading && (
                  <h2 className="legal__section-heading">{section.heading}</h2>
                )}
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="legal__paragraph">{p}</p>
                ))}
                {section.list && (
                  <ul className="legal__list">
                    {section.list.map((item, k) => <li key={k}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}

            {/* FAQ optionnelle (page about) */}
            {content.faq && (
              <div className="legal__faq">
                <h2 className="legal__section-heading">Frequently asked questions</h2>
                {content.faq.map((item, i) => (
                  <div key={i} className="legal__faq-item">
                    <h3 className="legal__faq-q">{item.q}</h3>
                    <p className="legal__faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Formulaire contact — connecté requis */}
            {page === 'contact' && (
              user ? (
                <ContactForm user={user} />
              ) : (
                <div className="legal__contact-gate">
                  <p>You need to be signed in to send a message.</p>
                  <button
                    className="legal__form-submit"
                    onClick={() => window.dispatchEvent(new CustomEvent('rq-open-auth'))}
                  >
                    Sign in
                  </button>
                  <p className="legal__form-note">
                    Or email us directly at{' '}
                    <a href="mailto:hello@ragequit-arcade.com">hello@ragequit-arcade.com</a>
                  </p>
                </div>
              )
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
