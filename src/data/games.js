/* =====================================================================
   GAMES.JS — Ragequit Arcade
   Catalogue de jeux. Seuls les jeux vraiment en ligne sont listés.
   Ajouter un jeu = ajouter une entrée dans le tableau `games`.

   Champ `hot: true`  → affiche la languette blanche avec la flamme bleue
   Champ `modes`      → liste des modes de jeu (ex: ['survival', 'classic'])
   Champ `defaultMode`→ mode affiché par défaut dans le leaderboard
   ===================================================================== */

/* ---- Catégories ---- */
export const categories = [
  { id: 'all', label: 'All Games' },
  {
    id: 'sports',
    label: 'Sports',
    image: '/categories/sports.jpg',
    description: 'Competitive, fast, rage-inducing. Sports games that push your limits.',
    seo: {
      title: 'Free Sports Games | Ragequit Arcade',
      metaDescription: 'Play the best free sports games online. No download required.',
      faq: [
        { q: 'What sports games are available?', a: 'Rage Hockey — a brutal air hockey game with 3 arenas and local 2-player mode.' },
        { q: 'Are they free?', a: 'Yes, 100% free, no account required.' },
        { q: 'Mobile?', a: 'Yes. Rotate your device to landscape for best experience on Rage Hockey.' },
      ],
    },
  },
  {
    id: 'arcade',
    label: 'Arcade',
    image: '/categories/arcade.jpg',
    description: 'Stack, dodge, survive. Pure arcade reflex games.',
    seo: {
      title: 'Free Arcade Games | Ragequit Arcade',
      metaDescription: 'Play the best free arcade games online. No download required.',
      faq: [
        { q: 'What arcade games are available?', a: 'STAQ — a satisfying block-stacking physics game. New games added regularly.' },
        { q: 'Mobile?', a: 'Yes, all games are optimized for mobile and desktop.' },
        { q: 'New games?', a: 'Every week. Follow us on TikTok and Instagram.' },
      ],
    },
  },
]

/* ---- SEO global du site ---- */
export const siteSeo = {
  title: 'Ragequit Arcade — Free Online Games',
  description: 'The most addictive free online games. Simple to learn, impossible to master. A new game every week.',
  about: 'Ragequit Arcade was built for players who love a challenge. No pay-to-win, no downloads, no nonsense. Pure browser games that will make you rage, retry, and come back for more. New game every week.',
  faq: [
    { q: 'What is Ragequit Arcade?', a: 'A free online gaming platform. No download, no registration required.' },
    { q: 'Are all games free?', a: 'Yes, every game is completely free to play.' },
    { q: 'How often are new games added?', a: 'Every week. Follow us on TikTok to be notified.' },
    { q: 'Do I need an account?', a: 'No account needed to play. Create one to save your scores and appear on the leaderboard.' },
    { q: 'Mobile?', a: 'Yes, all games work on mobile, tablet and desktop.' },
  ],
}

/* ---- Jeux ---- */
export const games = [

  /* ================================================================
     RAGE HOCKEY — jeu phare, sports, paysage obligatoire sur mobile
     ================================================================ */
  {
    id: 'rage-hockey',
    title: 'Rage Hockey',
    description: 'Slam the puck into the enemy goal before they slam it into yours. Fast physics, brutal AI, and arenas that change everything. First to 7 wins.',
    thumbnail: '/thumbnails/rage-hockey.jpg',
    category: 'sports',
    tags: ['hockey', 'multiplayer', '2-player', 'arcade', 'rage', 'sports'],
    size: 'large',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: true,
    plays: 0,
    modes: ['survival', 'classic'],   // ← modes de jeu pour le leaderboard
    defaultMode: 'survival',          // ← mode affiché par défaut
    controls: '1P: mouse or finger on the left side. 2P: right side touch or IJKL keys.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Rage Hockey — Free Air Hockey Game | Ragequit Arcade',
      metaDescription: 'Play Rage Hockey free online. Fast air hockey with brutal AI, 3 arenas, power boost and local 2-player mode.',
      faq: [
        { q: 'How do you play Rage Hockey?', a: 'Move your paddle to hit the puck into the enemy goal. First to 7 wins.' },
        { q: 'Can I play 2 players?', a: 'Yes. Choose 2 Players on the title screen. P1 uses the left side, P2 the right side or IJKL keys.' },
        { q: 'What are the arenas?', a: 'Classic, Bumper (central bouncer that makes the puck unpredictable), and Narrow (tighter field, harder to defend).' },
        { q: 'What is the Power Boost?', a: 'Watch a short ad after a game to get 25 seconds of boosted paddle power and a slower enemy.' },
        { q: 'Is Rage Hockey free?', a: 'Yes, completely free.' },
        { q: 'Mobile?', a: 'Yes. Rotate your device to landscape for the best experience.' },
      ],
    },
  },

  /* ================================================================
     STAQ — jeu chill, arcade, portrait ok
     ================================================================ */
  {
    id: 'staq',
    title: 'STAQ',
    description: 'Drop blocks and stack them as high as you can. One tap, infinite precision. How high can you go before it all falls apart?',
    thumbnail: '/thumbnails/staq.jpg',
    category: 'arcade',
    tags: ['stacking', 'arcade', 'chill', 'reflex', 'one-tap'],
    size: 'medium',
    shimmer: true,
    isNew: false,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],               // ← un seul mode : pas d'onglets dans le leaderboard
    defaultMode: 'classic',
    controls: 'Tap or click to drop the block. Mobile friendly.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'STAQ — Free Block Stacking Game | Ragequit Arcade',
      metaDescription: 'Play STAQ free online. A satisfying one-tap block stacking game with physics. How high can you go?',
      faq: [
        { q: 'How do you play STAQ?', a: 'Tap or click to drop the moving block onto the stack below. Keep them aligned to stack higher.' },
        { q: 'Does it have a leaderboard?', a: 'Yes! Your best stack height is saved and shown on the global leaderboard.' },
        { q: 'Is STAQ free?', a: 'Yes, completely free.' },
        { q: 'Mobile?', a: 'Yes, it works great in portrait mode on mobile.' },
      ],
    },
  },

]
