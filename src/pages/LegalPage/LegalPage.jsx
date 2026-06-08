import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLegalContent } from '../../data/legalContent'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import './LegalPage.css'

function ContactForm({ user }) {
  const { t } = useTranslation()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy]       = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit() {
    if (!subject.trim() || !message.trim()) { setError(t('legal.fillAllFields')); return }
    setBusy(true); setError('')
    try {
      const { error: dbError } = await supabase.from('contact_messages').insert({
        user_id: user.id, email: user.email, subject: subject.trim(), message: message.trim(),
      })
      if (dbError) throw dbError
      setSent(true)
    } catch (e) {
      setError(t('legal.errorOccurred'))
    } finally { setBusy(false) }
  }

  if (sent) {
    return (
      <div className="legal__contact-success">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="9,12 11,14 15,10"/>
        </svg>
        <h3>{t('legal.messageSent')}</h3>
        <p>{t('legal.messageSentDesc')} <strong>{user.email}</strong></p>
      </div>
    )
  }

  return (
    <div className="legal__contact-form">
      <div className="legal__form-meta">
        <span className="legal__form-from">{t('legal.from')} <strong>{user.email}</strong></span>
      </div>
      <input className="legal__form-input" type="text" placeholder={t('legal.subject')}
        value={subject} maxLength={120} onChange={e => setSubject(e.target.value)} />
      <textarea className="legal__form-textarea" rows={6} placeholder={t('legal.yourMessage')}
        value={message} maxLength={2000} onChange={e => setMessage(e.target.value)} />
      {error && <p className="legal__form-error">{error}</p>}
      <button className="legal__form-submit" onClick={handleSubmit} disabled={busy}>
        {busy ? t('legal.sending') : t('legal.sendMessage')}
      </button>
      <p className="legal__form-note">
        {t('legal.emailDirectly')}{' '}
        <a href="mailto:hello@ragequit-arcade.com">hello@ragequit-arcade.com</a>
      </p>
    </div>
  )
}

export default function LegalPage() {
  const { t, i18n } = useTranslation()
  const { page } = useParams()
  const content  = getLegalContent(i18n.language)[page]
  const { user } = useAuth()

  usePageTitle(content ? content.title : t('legal.pageNotFound'))

  return (
    <div className="legal">
      <div className="legal__header">
        <div className="legal__header-nav"><Navbar inGrid={true} /></div>
        <div className="legal__header-title">
          <h1 className="legal__header-h1">{content ? content.title : t('legal.pageNotFound')}</h1>
        </div>
      </div>

      <div className="legal__content">
        {content ? (
          <div className="legal__body">
            {content.updated && (
              <p className="legal__updated">{t('legal.lastUpdated')} {content.updated}</p>
            )}
            {content.sections.map((section, i) => (
              <div key={i} className="legal__section">
                {section.heading && <h2 className="legal__section-heading">{section.heading}</h2>}
                {section.paragraphs?.map((p, j) => <p key={j} className="legal__paragraph">{p}</p>)}
                {section.list && (
                  <ul className="legal__list">{section.list.map((item, k) => <li key={k}>{item}</li>)}</ul>
                )}
              </div>
            ))}
            {content.faq && (
              <div className="legal__faq">
                <h2 className="legal__section-heading">{t('legal.faqTitle')}</h2>
                {content.faq.map((item, i) => (
                  <div key={i} className="legal__faq-item">
                    <h3 className="legal__faq-q">{item.q}</h3>
                    <p className="legal__faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
            {page === 'contact' && (
              user ? <ContactForm user={user} /> : (
                <div className="legal__contact-gate">
                  <p>{t('legal.contactSignInRequired')}</p>
                  <button className="legal__form-submit"
                    onClick={() => window.dispatchEvent(new CustomEvent('rq-open-auth'))}>
                    {t('legal.signIn')}
                  </button>
                  <p className="legal__form-note">
                    {t('legal.emailDirectly')}{' '}
                    <a href="mailto:hello@ragequit-arcade.com">hello@ragequit-arcade.com</a>
                  </p>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="legal__notfound">
            <p>{t('legal.pageNotExist')}</p>
            <Link to="/" className="legal__back">{t('legal.backToHome')}</Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
