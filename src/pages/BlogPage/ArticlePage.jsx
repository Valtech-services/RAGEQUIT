import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import { trackPageView } from '../../lib/analytics'
import { getPost, posts } from '../../data/blog'
import './BlogPage.css'

export default function ArticlePage() {
  const { slug } = useParams()
  const post = getPost(slug)

  usePageTitle(
    post ? post.title : 'Article not found',
    post?.seo?.metaDescription
  )
  useEffect(() => { trackPageView() }, [slug])

  if (!post) {
    return (
      <div className="blog">
        <div className="blog__header">
          <div className="blog__header-nav"><Navbar inGrid={true} /></div>
          <div className="blog__header-title"><h1 className="blog__header-h1">Not found</h1></div>
        </div>
        <div className="blog__content">
          <p className="blog__empty">This article does not exist.</p>
          <Link to="/blog" className="blog__back">← Back to the blog</Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Autres articles (pour la section "à lire aussi").
  const others = posts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="blog">
      <div className="blog__header">
        <div className="blog__header-nav"><Navbar inGrid={true} /></div>
        <div className="blog__header-title"><h1 className="blog__header-h1">Blog</h1></div>
      </div>

      <article className="blog__article">
        <Link to="/blog" className="blog__back">← Back to the blog</Link>

        <h1 className="blog__article-title">{post.title}</h1>
        <div className="blog__article-meta">
          <span>{post.author || 'Ragequit Arcade'}</span>
          {post.date && <span> · {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
        </div>

        {post.image && (
          <div className="blog__article-hero">
            <img src={post.image} alt={post.title}
              onError={e => { e.currentTarget.style.display = 'none' }} />
          </div>
        )}

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

        {others.length > 0 && (
          <div className="blog__related">
            <h3 className="blog__related-title">Read next</h3>
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
