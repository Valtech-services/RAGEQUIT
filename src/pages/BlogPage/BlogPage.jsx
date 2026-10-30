import { useEffect } from 'react'
import { usePosts } from '../../data/localized'
import { Link } from '../../i18n/locale'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useTranslation } from 'react-i18next'
import { useLang } from '../../i18n/locale'
import usePageTitle from '../../hooks/usePageTitle'
import { trackPageView } from '../../lib/analytics'
import './BlogPage.css'

export default function BlogPage() {
  const posts = usePosts()
  const { t } = useTranslation()
  const lang = useLang()
  const dateLocale = { en: 'en-US', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT' }[lang] || 'en-US'
  usePageTitle('Blog | Ragequit Arcade', t('ui.blog.metaDesc'))
  useEffect(() => { trackPageView() }, [])

  // Articles triés du plus récent au plus ancien.
  const sorted = [...posts].sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  return (
    <div className="blog">
      <div className="blog__header">
        <div className="blog__header-nav"><Navbar inGrid={true} /></div>
        <div className="blog__header-title">
          <h1 className="blog__header-h1">Blog</h1>
        </div>
      </div>

      <div className="blog__content">
        <p className="blog__intro">{t('ui.blog.intro')}</p>

        {sorted.length === 0 ? (
          <p className="blog__empty">{t('ui.blog.empty')}</p>
        ) : (
          <>
            {[
              { id: 'about', label: t('ui.blog.sectionAbout') },
              { id: 'guides', label: t('ui.blog.sectionGuides') },
            ].map(section => {
              const inSection = sorted.filter(p => (p.category || 'guides') === section.id)
              if (inSection.length === 0) return null
              return (
                <div key={section.id} className="blog__section">
                  <h2 className="blog__section-title">{section.label}</h2>
                  <div className="blog__grid">
                    {inSection.map(post => (
                      <Link key={post.slug} to={`/blog/${post.slug}`} className="blog__card">
                        {post.image && (
                          <div className="blog__card-img">
                            <img src={post.image} alt={post.title}
                              onError={e => { e.currentTarget.style.display = 'none' }} />
                          </div>
                        )}
                        <div className="blog__card-body">
                          <span className="blog__card-date">
                            {post.date ? new Date(post.date).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                          </span>
                          <h2 className="blog__card-title">{post.title}</h2>
                          <p className="blog__card-excerpt">{post.excerpt}</p>
                          <span className="blog__card-more">{t('ui.blog.readMore')}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
