import { Link } from 'react-router-dom'
import './SeoBlock.css'

export default function SeoBlock({ type, data }) {
  if (!data) return null

  return (
    <div className="seo-block">
      <div className="seo-block__inner">

        {/* ============================================================
            TYPE SITE — page d'accueil
            Texte "À propos" remanié pour Ragequit Arcade
            ============================================================ */}
        {type === 'site' && (
          <>
            <span className="seo-block__label">About Ragequit Arcade</span>
            <h2 className="seo-block__title">Free Online Games</h2>

            <p className="seo-block__text">
              Ragequit Arcade brings you the most addictive free online games,
              built for solo runs or quick matches with friends. Every game runs
              instantly in your browser — no downloads, no sign-up, no pop-ups,
              no nonsense. Our games work on desktop, tablet and mobile, so you
              can play at home or on the move. We are building a place where a
              great game is always one click away.
            </p>

            <h3 className="seo-block__subtitle">Our game selection</h3>
            <p className="seo-block__text">
              We add new games every single week. Our featured titles include
              fast-paced originals like{' '}
              <Link to="/game/rage-hockey" className="seo-block__link">Rage Hockey</Link>,{' '}
              <Link to="/game/snake-fury" className="seo-block__link">Snake Fury</Link>,{' '}
              <Link to="/game/neon-breaker" className="seo-block__link">Neon Breaker</Link>{' '}
              and{' '}
              <Link to="/game/void-clicker" className="seo-block__link">Void Clicker</Link>.
              You will also find timeless classics reimagined with our own twist —{' '}
              <Link to="/game/tetris-fury" className="seo-block__link">Tetris Fury</Link>,{' '}
              <Link to="/game/merge-rush" className="seo-block__link">Merge Rush</Link>,{' '}
              <Link to="/game/flappy-rage" className="seo-block__link">Flappy Rage</Link>{' '}
              and many more. Every game is free to play, forever.
            </p>

            <h3 className="seo-block__subtitle">Start playing</h3>
            <p className="seo-block__text">
              Not sure what to play? Start exploring from the homepage or pick a
              game from one of our popular categories:
            </p>
            <ul className="seo-block__list">
              <li><Link to="/category/arcade" className="seo-block__link">Arcade Games</Link></li>
              <li><Link to="/category/puzzle" className="seo-block__link">Puzzle Games</Link></li>
              <li><Link to="/category/clicker" className="seo-block__link">Clicker Games</Link></li>
              <li><Link to="/category/runner" className="seo-block__link">Runner Games</Link></li>
              <li><Link to="/category/sports" className="seo-block__link">Sports Games</Link></li>
            </ul>

            <h3 className="seo-block__subtitle">About us</h3>
            <p className="seo-block__text">
              Ragequit Arcade is an independent game studio. We design, build and
              run every game on this platform ourselves — no third-party clones,
              no pay-to-win. Our goal is simple: create the most fun, most honest
              browser arcade on the web. New games drop every week, so follow us
              on TikTok and Instagram to see what is coming next.
            </p>

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

        {/* ============================================================
            TYPE CATEGORY
            ============================================================ */}
        {type === 'category' && (
          <>
            <span className="seo-block__label">About this category</span>
            <h2 className="seo-block__title">{data.label} Games</h2>
            <p className="seo-block__text">{data.description}</p>

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

        {/* ============================================================
            TYPE GAME
            ============================================================ */}
        {type === 'game' && (
          <>
            <span className="seo-block__label">About this game</span>
            <h2 className="seo-block__title">{data.title}</h2>
            <p className="seo-block__text">{data.description}</p>

            {data.controls && (
              <div className="seo-block__info-card">
                <span className="seo-block__info-label">Controls</span>
                <p className="seo-block__info-text">{data.controls}</p>
              </div>
            )}
            {data.author && (
              <div className="seo-block__info-card">
                <span className="seo-block__info-label">Developer</span>
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