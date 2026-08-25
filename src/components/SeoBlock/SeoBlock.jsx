import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './SeoBlock.css'

export default function SeoBlock({ type, data }) {
  const { t, i18n } = useTranslation()
  if (!data) return null

  // FAQ d'accueil traduite (depuis les fichiers de langue, pas games.js)
  const siteFaq = i18n.getResource(i18n.language, 'translation', 'siteFaq') || []

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
              <li>
                <Link to="/game/rage-hockey" className="seo-block__link">Rage Hockey</Link> — a brutal, fast-paced
                air hockey game with three arenas, a punishing AI and a local two-player mode. First to seven wins.
              </li>
              <li>
                <Link to="/game/staq" className="seo-block__link">STAQ</Link> — a one-tap block-stacking game where
                precision is everything. Chain perfect drops, ride your combo and see how high your tower climbs.
              </li>
              <li>
                <Link to="/game/neon-rush" className="seo-block__link">Neon Rush</Link> — a hypnotic 3D endless
                runner through a retro-futuristic neon tunnel. Dodge across three lanes and chain near-misses for
                huge combos.
              </li>
              <li>
                <Link to="/game/stellar-forge" className="seo-block__link">Stellar Forge</Link> — a science-based
                idle clicker where you mine ore, automate an energy empire and climb the real Kardashev scale from
                planet to galaxy.
              </li>
              <li>
                <Link to="/game/virus-lab" className="seo-block__link">Virus Lab</Link> — a one-of-a-kind strategy
                game where you program a virus genome, conquer a petri dish and battle other players' strains in an
                asynchronous arena.
              </li>
              <li>
                <Link to="/game/octaflux" className="seo-block__link">OCTAFLUX</Link> — a fast octagon-rotation
                puzzle game. Spin the core with your thumb to match falling pieces and trigger cascading chains.
              </li>
            </ul>

            <h3 className="seo-block__subtitle">Browse by category</h3>
            <p className="seo-block__text">
              Not sure what to play? Explore our games by category and find the style that fits your mood:
            </p>
            <ul className="seo-block__list">
              <li>
                <Link to="/category/sports" className="seo-block__link">Sports Games</Link> — competitive, physical
                and rage-inducing.
              </li>
              <li>
                <Link to="/category/arcade" className="seo-block__link">Arcade Games</Link> — reflex, survival and
                pure score-chasing.
              </li>
              <li>
                <Link to="/category/idle" className="seo-block__link">Idle / Clicker Games</Link> — tap, automate
                and watch your numbers grow, even while you are away.
              </li>
              <li>
                <Link to="/category/puzzle" className="seo-block__link">Puzzle Games</Link> — match, rotate and
                think fast under pressure.
              </li>
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
