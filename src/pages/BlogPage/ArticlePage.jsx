import { useEffect } from 'react'
import { usePosts, useGames } from '../../data/localized'
import { useParams } from 'react-router-dom'
import { Link } from '../../i18n/locale'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useTranslation } from 'react-i18next'
import { useLang, LOCALES } from '../../i18n/locale'
import usePageTitle from '../../hooks/usePageTitle'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { trackPageView } from '../../lib/analytics'
import './BlogPage.css'
import { blogImg, thumbImg } from '../../lib/thumb'
import { track } from '../../lib/analytics'

/* A-015 : carte « Jouer » vers le jeu dont parle le guide (haut et bas d'article). */
function PlayCard({ game, where, t }) {
  return (
    <Link to={`/game/${game.id}`} className={`blog__play blog__play--${where}`}
      onClick={() => track('blog_play_click', { game_id: game.id, props: { where } })}>
      <span className="blog__play-thumb"><img {...thumbImg(game.thumbnail, '96px')} alt="" loading="lazy" width="96" height="96" /></span>
      <span className="blog__play-body">
        <span className="blog__play-title">{t('ui.blog.playTitle', { game: game.title })}</span>
        <span className="blog__play-text">{t('ui.blog.playText')}</span>
      </span>
      <span className="blog__play-btn">{t('ui.blog.playNow')}</span>
    </Link>
  )
}

export default function ArticlePage() {
  const posts = usePosts()
  const games = useGames()
  const { t } = useTranslation()
  const lang = useLang()
  const dateLocale = LOCALES[lang] || 'en-US'
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug) || null

  usePageTitle(
    post ? (post.seo?.title || post.title) : undefined,
    post?.seo?.metaDescription
  )
  useEffect(() => { trackPageView() }, [slug])

  if (!post) return <NotFoundPage />

  const game = post.game ? games.find(g => g.id === post.game) : null

  // Autres articles (pour la section "à lire aussi").
  const others = posts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="blog">
      <div className="blog__header">
        <div className="blog__header-nav"><Navbar inGrid={true} /></div>
        <div className="blog__header-title"><p className="blog__header-h1">Blog</p></div>
      </div>

      <article className="blog__article">
        <Link to="/blog" className="blog__back">{t('ui.blog.back')}</Link>

        <h1 className="blog__article-title">{post.title}</h1>
        <div className="blog__article-meta">
          <span>{post.author || 'Ragequit Arcade'}</span>
          {post.date && <span> · {new Date(post.date).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
        </div>

        {post.image && (
          <div className="blog__article-hero">
            <img {...blogImg(post.image, '(max-width: 767px) 92vw, 760px')} alt={post.title} />
          </div>
        )}

        {game && <PlayCard game={game} where="top" t={t} />}

        <div className="blog__article-body">
          {post.content?.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i} className="blog__h2">{block.text}</h2>
            if (block.type === 'ul') return (
              <ul key={i} className="blog__ul">
                {block.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            )
            return <p key={i} className="blog__p">{block.text}</p>
          })}
        </div>

        {game && <PlayCard game={game} where="bottom" t={t} />}

        {others.length > 0 && (
          <div className="blog__related">
            <h3 className="blog__related-title">{t('ui.blog.readNext')}</h3>
            <div className="blog__related-list">
              {others.map(o => (
                <Link key={o.slug} to={`/blog/${o.slug}`} className="blog__related-item">
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  )
}
