import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './SeoBlock.css'

export default function SeoBlock({ type, data }) {
  const { t } = useTranslation()
  if (!data) return null

  return (
    <div className="seo-block">
      <div className="seo-block__inner">

        {/* TYPE SITE — page d'accueil */}
        {type === 'site' && (
          <>
            <span className="seo-block__label">{t('seo.aboutLabel')}</span>
            <h2 className="seo-block__title">{t('seo.freeOnlineGames')}</h2>
            <p className="seo-block__text">{t('seo.intro')}</p>

            <h3 className="seo-block__subtitle">{t('seo.selectionTitle')}</h3>
            <p className="seo-block__text">
              {t('seo.selectionText')}{' '}
              <Link to="/game/rage-hockey" className="seo-block__link">Rage Hockey</Link>,{' '}
              <Link to="/game/staq" className="seo-block__link">STAQ</Link>.
            </p>

            <h3 className="seo-block__subtitle">{t('seo.startTitle')}</h3>
            <p className="seo-block__text">{t('seo.startText')}</p>
            <ul className="seo-block__list">
              <li><Link to="/category/sports" className="seo-block__link">{t('categories.sports')} {t('categories.gamesSuffix')}</Link></li>
              <li><Link to="/category/arcade" className="seo-block__link">{t('categories.arcade')} {t('categories.gamesSuffix')}</Link></li>
            </ul>

            <h3 className="seo-block__subtitle">{t('seo.aboutUsTitle')}</h3>
            <p className="seo-block__text">{t('seo.aboutUsText')}</p>

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

        {/* TYPE CATEGORY */}
        {type === 'category' && (
          <>
            <span className="seo-block__label">{t('seo.aboutCategory')}</span>
            <h2 className="seo-block__title">{t(`categories.${data.id}`)} {t('categories.gamesSuffix')}</h2>
            <p className="seo-block__text">{data.description}</p>

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
