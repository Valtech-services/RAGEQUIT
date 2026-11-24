import { Link } from '../../i18n/locale'
import { useCategories, useGames, usePosts } from '../../data/localized'
import { toParagraphs } from '../../lib/paragraphs'
import { blogImg } from '../../lib/thumb'
import { track } from '../../lib/analytics'
import { useTranslation } from 'react-i18next'
import './SeoBlock.css'

// Première phrase d'une description (pour la liste des jeux sur la home).
function firstSentence(text) {
  if (!text) return ''
  const match = text.match(/^[^.!?]*[.!?]/)
  return match ? match[0].trim() : text
}

export default function SeoBlock({ type, data, id }) {
  const games = useGames()
  const posts = usePosts()
  const categories = useCategories()
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

  // A-015 : guide du blog consacré à ce jeu (champ `game` des articles).
  const guide = type === 'game' && data.id ? posts.find(p => p.game === data.id) : null

  return (
    <div className="seo-block" id={id}>
      <div className="seo-block__inner">

        {/* TYPE SITE — page d'accueil */}
        {type === 'site' && (
          <>
            <span className="seo-block__label">{t('seo.aboutLabel')}</span>
            <h1 className="seo-block__title">{t('ui.home.title')}</h1>
            <p className="seo-block__text">{t('ui.home.p1')}</p>

            <h3 className="seo-block__subtitle">{t('ui.home.gamesTitle')}</h3>
            <p className="seo-block__text">{t('ui.home.gamesIntro')}</p>
            <ul className="seo-block__list">
              {games.map(g => (
                <li key={g.id}>
                  <Link to={`/game/${g.id}`} className="seo-block__link">{g.title}</Link>
                  {' — '}{firstSentence(g.description)}
                </li>
              ))}
            </ul>

            <h3 className="seo-block__subtitle">{t('ui.home.catsTitle')}</h3>
            <p className="seo-block__text">{t('ui.home.catsIntro')}</p>
            <ul className="seo-block__list">
              {realCategories.map(c => (
                <li key={c.id}>
                  <Link to={`/category/${c.id}`} className="seo-block__link">{t(`categoryTitles.${c.id}`, { defaultValue: c.label + ' Games' })}</Link>
                  {i18n.exists(`ui.home.blurbs.${c.id}`) ? ` — ${t(`ui.home.blurbs.${c.id}`)}` : ''}
                </li>
              ))}
            </ul>

            <h3 className="seo-block__subtitle">{t('ui.home.whyTitle')}</h3>
            <p className="seo-block__text">{t('ui.home.whyText')}</p>

            <h3 className="seo-block__subtitle">{t('ui.home.aboutTitle')}</h3>
            <p className="seo-block__text">{t('ui.home.aboutText')}</p>

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
                <h3 className="seo-block__subtitle">{t('ui.category.gamesIn')}</h3>
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

        {/* TYPE GAME — description en paragraphes, puis contrôles, guide et FAQ
            sous des intertitres (A-017), lien vers le guide du blog (A-015). */}
        {type === 'game' && (
          <>
            <span className="seo-block__label">{t('seo.aboutGame')}</span>
            <h2 className="seo-block__title">{data.title}</h2>
            {toParagraphs(data.description).map((para, i) => (
              <p key={i} className="seo-block__text">{para}</p>
            ))}

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

            {guide && (
              <Link to={`/blog/${guide.slug}`} className="seo-block__guide"
                onClick={() => track('game_guide_click', { game_id: data.id })}>
                {guide.image && (
                  <span className="seo-block__guide-img">
                    <img {...blogImg(guide.image, '160px')} alt="" loading="lazy" />
                  </span>
                )}
                <span className="seo-block__guide-body">
                  <span className="seo-block__info-label">{t('seo.guideLabel')}</span>
                  <span className="seo-block__guide-title">{guide.title}</span>
                  {guide.excerpt && <span className="seo-block__guide-text">{guide.excerpt}</span>}
                  <span className="seo-block__guide-cta">{t('seo.guideCta')} →</span>
                </span>
              </Link>
            )}

            {data.faq && data.faq.length > 0 && (
              <>
                <h2 className="seo-block__subtitle seo-block__faq-title">{t('seo.faqTitle')}</h2>
                <div className="seo-block__faq">
                  {data.faq.map((item, i) => (
                    <div key={i} className="seo-block__faq-item">
                      <h3 className="seo-block__faq-q">{item.q}</h3>
                      <p className="seo-block__faq-a">{item.a}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
