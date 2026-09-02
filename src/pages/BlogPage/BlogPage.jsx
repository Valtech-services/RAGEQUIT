import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import usePageTitle from '../../hooks/usePageTitle'
import { trackPageView } from '../../lib/analytics'
import { posts } from '../../data/blog'
import './BlogPage.css'

export default function BlogPage() {
  usePageTitle('Blog', 'Guides, tips and stories from Ragequit Arcade. Learn how to master our free browser games and get the highest scores.')
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
        <p className="blog__intro">
          Guides, tips and stories from the team behind Ragequit Arcade. Learn how to master our free
          browser games, climb the leaderboards, and discover what we are building next.
        </p>

        {sorted.length === 0 ? (
          <p className="blog__empty">No articles yet. Check back soon.</p>
        ) : (
          <div className="blog__grid">
            {sorted.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog__card">
                {post.image && (
                  <div className="blog__card-img">
                    <img src={post.image} alt={post.title}
                      onError={e => { e.currentTarget.style.display = 'none' }} />
                  </div>
                )}
                <div className="blog__card-body">
                  <span className="blog__card-date">
                    {post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </span>
                  <h2 className="blog__card-title">{post.title}</h2>
                  <p className="blog__card-excerpt">{post.excerpt}</p>
                  <span className="blog__card-more">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
