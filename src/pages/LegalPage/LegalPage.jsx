import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { legalContent } from '../../data/legalContent'
import './LegalPage.css'

/*
  LegalPage — affiche le contenu légal selon l'URL :
  /legal/privacy, /legal/terms, /legal/cookies, /legal/contact, /legal/about
  La page contact affiche un VRAI formulaire (pas un mailto).
*/
export default function LegalPage() {
  const { page } = useParams()
  const content = legalContent[page] || legalContent['privacy']
  const isContact = page === 'contact'

  return (
    <div className="legalpage">
      <Navbar title={content.title} />

      <div className="legalpage__wrap">
        <div className="legalpage__card">
          <span className="legalpage__label">{content.label}</span>
          <h1 className="legalpage__title">{content.title}</h1>
          <p className="legalpage__updated">
            {isContact ? 'We usually reply within 48 hours' : `Last updated: ${content.updated}`}
          </p>

          {content.sections.map((s, i) => (
            <section key={i} className="legalpage__section">
              {s.heading && <h2 className="legalpage__heading">{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j} className="legalpage__text">{p}</p>
              ))}
              {s.list && (
                <ul className="legalpage__list">
                  {s.list.map((item, k) => <li key={k}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}

          {isContact && <ContactForm />}
        </div>
      </div>

      <Footer />
    </div>
  )
}

/* Formulaire de contact — front only (à brancher sur Resend/Formspree plus tard) */
function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' })

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    // TODO : brancher l'envoi réel (Resend, Formspree, EmailJS...).
    // Pour l'instant on simule un envoi réussi.
    setSent(true)
  }

  if (sent) {
    return (
      <div className="contact-form contact-form--sent">
        <div className="contact-form__check">✓</div>
        <h3 className="contact-form__sent-title">Message sent!</h3>
        <p className="contact-form__sent-text">
          Thanks for reaching out. We'll get back to you as soon as possible.
        </p>
        <button className="contact-form__reset" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General', message: '' }) }}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span className="contact-form__label">Name</span>
          <input className="contact-form__input" type="text" required
            value={form.name} onChange={update('name')} placeholder="Your name" />
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">Email</span>
          <input className="contact-form__input" type="email" required
            value={form.email} onChange={update('email')} placeholder="you@example.com" />
        </label>
      </div>

      <label className="contact-form__field">
        <span className="contact-form__label">Subject</span>
        <select className="contact-form__input" value={form.subject} onChange={update('subject')}>
          <option>General question</option>
          <option>Bug report</option>
          <option>Game suggestion</option>
          <option>Business / Advertising</option>
          <option>Other</option>
        </select>
      </label>

      <label className="contact-form__field">
        <span className="contact-form__label">Message</span>
        <textarea className="contact-form__input contact-form__textarea" required rows={6}
          value={form.message} onChange={update('message')} placeholder="How can we help?" />
      </label>

      <button className="contact-form__submit" type="submit">Send message</button>
    </form>
  )
}