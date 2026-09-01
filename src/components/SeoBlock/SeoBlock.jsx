import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { games, categories } from '../../data/games'
import './SeoBlock.css'

// Première phrase d'une description (pour la liste des jeux sur la home).
function firstSentence(text) {
  if (!text) return ''
  const match = text.match(/^[^.!?]*[.!?]/)
  return match ? match[0].trim() : text
}

// Petite intro par catégorie, pour la home.
const CATEGORY_BLURBS = {
  sports: 'competitive, physical and rage-inducing.',
  arcade: 'reflex, survival and pure score-chasing.',
  idle: 'tap, automate and watch your numbers grow, even while you are away.',
  puzzle: 'match, rotate and think fast under pressure.',
  shooting: 'aim, shoot and survive wave after wave.',
  brain: 'memory, focus and logic challenges to sharpen your mind.',
}

export default function SeoBlock({ type, data }) {
  const { t, i18n } = useTranslation()
  if (!data) return null

  // FAQ d'accueil traduite (depuis les fichiers de langue, pas games.js)
  const siteFaq = i18n.getResource(i18n.language, 'translation', 'siteFaq') || []

  // Catégories réelles (on retire "all", qui n'est pas une vraie catégorie).
  const realCategories = categories.filter(c => c.id !== 'all')

  // Jeux de la catégorie courante (pour la liste cliquable en page catégorie).
  const categoryGames = type === 'category' && data.id
    ? games.filter(g => g.category === data.id)
    : []

  return (
    <div className="seo-block">
      <div className="seo-block__inner">

        {/* TYPE SITE — page d'accueil */}
        {type === 'site' && (
          <>
            <span className="seo-block__label">{t('seo.aboutLabel')}</span>
            <h2 className="seo-block__title">Free Online Games at Ragequit Arcade</h2>
            <p className="seo-block__text">
              Ragequit Arcade is a free online games platform built for players who want fun without friction.
              Every game runs instantly in your browser — no downloads, no installs, no sign-up walls and no
              intrusive pop-ups. Whether you have five minutes on your phone or a long session at your desk, our
              games load in a single click and work smoothly on mobile, tablet and desktop. We design, build and
              run every game ourselves, so what you play here you will not find anywhere else.
            </p>

            <h3 className="seo-block__subtitle">Our current games</h3>
            <p className="seo-block__text">
              We add new games regularly. Here is what you can play right now, each one free and unlimited:
            </p>
            <ul className="seo-block__list">
              {games.map(g => (
                <li key={g.id}>
                  <Link to={`/game/${g.id}`} className="seo-block__link">{g.title}</Link>
                  {' — '}{firstSentence(g.description)}
                </li>
              ))}
            </ul>

            <h3 className="seo-block__subtitle">Browse by category</h3>
            <p className="seo-block__text">
              Not sure what to play? Explore our games by category and find the style that fits your mood:
            </p>
            <ul className="seo-block__list">
              {realCategories.map(c => (
                <li key={c.id}>
                  <Link to={`/category/${c.id}`} className="seo-block__link">{c.label} Games</Link>
                  {CATEGORY_BLURBS[c.id] ? ` — ${CATEGORY_BLURBS[c.id]}` : ''}
                </li>
              ))}
            </ul>

            <h3 className="seo-block__subtitle">Why play at Ragequit Arcade</h3>
            <p className="seo-block__text">
              Every game is completely free, with no pay-to-win mechanics and no hidden costs. You can jump in
              instantly without an account, or create a free profile to save your scores and climb our global
              leaderboards. Because we build our games in-house rather than reposting clones, each title has its
              own identity, its own controls and its own reason to come back. We are a small independent studio
              obsessed with making browser games that are genuinely fun to lose at — hence the name.
            </p>

            <h3 className="seo-block__subtitle">About us</h3>
            <p className="seo-block__text">
              Ragequit Arcade is an independent gaming platform. We design, build and run every game ourselves —
              no third-party clones, no pay-to-win, no nonsense. Our goal is simple: create the most fun, most
              honest browser arcade on the web. New games drop regularly, so follow us on TikTok and Instagram to
              see what is coming next.
            </p>

            {siteFaq.length > 0 && (
              <div className="seo-block__faq">
                {siteFaq.map((item, i) => (
                  <div key={i} className="seo-block__faq-item">
                    <h4 className="seo-block__faq-q">{item.q}</h4>
                    <p className="seo-block__faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* TYPE CATEGORY */}
        {type === 'category' && (
          <>
            <span className="seo-block__label">{t('seo.aboutCategory')}</span>
            <h2 className="seo-block__title">{t(`categoryTitles.${data.id}`)}</h2>
            <p className="seo-block__text">{data.description}</p>

            {categoryGames.length > 0 && (
              <>
                <h3 className="seo-block__subtitle">Games in this category</h3>
                <ul className="seo-block__list">
                  {categoryGames.map(g => (
                    <li key={g.id}>
                      <Link to={`/game/${g.id}`} className="seo-block__link">{g.title}</Link>
                      {' — '}{firstSentence(g.description)}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {data.seo?.faq && data.seo.faq.length > 0 && (
              <div className="seo-block__faq">
                {data.seo.faq.map((item, i) => (
                  <div key={i} className="seo-block__faq-item">
                    <h4 className="seo-block__faq-q">{item.q}</h4>
                    <p className="seo-block__faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* TYPE GAME */}
        {type === 'game' && (
          <>
            <span className="seo-block__label">{t('seo.aboutGame')}</span>
            <h2 className="seo-block__title">{data.title}</h2>
            <p className="seo-block__text">{data.description}</p>

            {data.controls && (
              <div className="seo-block__info-card">
                <span className="seo-block__info-label">{t('seo.controls')}</span>
                <p className="seo-block__info-text">{data.controls}</p>
              </div>
            )}
            {data.author && (
              <div className="seo-block__info-card">
                <span className="seo-block__info-label">{t('seo.developer')}</span>
                <p className="seo-block__info-text">{data.author}</p>
              </div>
            )}

            {data.faq && data.faq.length > 0 && (
              <div className="seo-block__faq">
                {data.faq.map((item, i) => (
                  <div key={i} className="seo-block__faq-item">
                    <h4 className="seo-block__faq-q">{item.q}</h4>
                    <p className="seo-block__faq-a">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
