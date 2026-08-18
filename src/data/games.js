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
        { q: 'What arcade games are available?', a: 'STAQ — a block-stacking physics game, Neon Rush — a 3D neon tunnel runner, and Virus Lab — a strategy game where you program a virus to conquer a petri dish. New games added regularly.' },
        { q: 'Mobile?', a: 'Yes, all games are optimized for mobile and desktop.' },
        { q: 'New games?', a: 'Every week. Follow us on TikTok and Instagram.' },
      ],
    },
  },
  {
    id: 'idle',
    label: 'Idle / Clicker',
    image: '/categories/idle.jpg',
    description: 'Tap, collect, upgrade, repeat. Watch your numbers grow — even while you are away.',
    seo: {
      title: 'Free Idle & Clicker Games | Ragequit Arcade',
      metaDescription: 'Play the best free idle and clicker games online. Tap to collect, upgrade and grow. No download required.',
      faq: [
        { q: 'What are idle / clicker games?', a: 'Games where you tap to earn resources, then unlock upgrades that keep producing even when you are idle. Simple to start, deeply addictive.' },
        { q: 'Are they free?', a: 'Yes, 100% free, no account required.' },
        { q: 'Mobile?', a: 'Yes, idle and clicker games are perfect on mobile — one thumb is all you need.' },
      ],
    },
  },
   {
    id: 'puzzle',
    label: 'Puzzle',
    image: '/categories/puzzle.jpg',
    description: 'Match, rotate, think fast. Puzzle games that test your reflexes and your brain.',
    seo: {
      title: 'Free Puzzle Games | Ragequit Arcade',
      metaDescription: 'Play the best free puzzle games online. Match, rotate and chain combos. No download, no signup required.',
      faq: [
        { q: 'What puzzle games are available?', a: 'OCTAFLUX — a hypnotic octagon-rotation match game where you spin a central octagon to catch and align falling pieces. New puzzle games added regularly.' },
        { q: 'Are they free?', a: 'Yes, 100% free, no account required.' },
        { q: 'Mobile?', a: 'Yes, puzzle games are perfect on mobile — just drag with your thumb to rotate and play.' },
      ],
    },
  },
]

/* ---- SEO global du site ---- */
export const siteSeo = {
  title: 'Ragequit Arcade — Free Online Games',
  description: 'The most addictive free online games. Simple to learn, impossible to master. A new game every week.',
  about: 'Ragequit Arcade brings you the most addictive free online games, built for solo runs or quick matches with friends. Every game runs instantly in your browser — no downloads, no sign-up, no pop-ups, no nonsense. Our games work on desktop, tablet and mobile, so you can play at home or on the move. We are building a place where a great game is always one click away.',
  gameSelection: 'We add new games every single week. Our current titles include Rage Hockey, STAQ, Stellar Forge, Neon Rush, Virus Lab and OCTAFLUX. Every game is free to play, forever.',
  startPlaying: 'Not sure what to play? Start exploring from the homepage or pick a game from Sports Games, Arcade Games, Idle / Clicker Games or Puzzle Games.',
  aboutUs: 'Ragequit Arcade is an independent gaming platform. Our goal is simple: create the most fun, most honest browser arcade on the web. New games drop every week — follow us on TikTok and Instagram to see what is coming next.',
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
    modes: ['survival', 'classic'],
    defaultMode: 'survival',
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
     STAQ — arcade, one-tap block stacking
     ================================================================ */
  {
    id: 'staq',
    title: 'STAQ',
    description: 'Stack the blocks as high as you can. One tap, infinite precision — but miss once and it all comes crashing down. Nail a perfect drop to keep your stack full-width, ride your combo, and when you finally fall… watch an ad to revive your tower. How high can you go before rage quitting?',
    thumbnail: '/thumbnails/staq.jpg',
    category: 'arcade',
    tags: ['stacking', 'arcade', 'reflex', 'one-tap', 'tower', 'casual'],
    size: 'medium',
    shimmer: true,
    isNew: false,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Tap or click (or press Space) to drop the moving block. Line it up with the block below. Mobile, tablet and desktop friendly.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'STAQ — Free Block Stacking Game | Ragequit Arcade',
      metaDescription: 'Play STAQ free online. A satisfying one-tap 3D block-stacking game with perfect-drop combos and a revive reward. How high can you stack?',
      faq: [
        { q: 'How do you play STAQ?', a: 'Tap, click or press the spacebar to drop the moving block onto the stack. Line it up as precisely as possible — the better aligned, the wider your tower stays.' },
        { q: 'What is a perfect drop?', a: 'If you align a block almost exactly, you get a Perfect: the block keeps its full width instead of being chopped, with a flash and a sound. Chain perfects to build the tallest towers.' },
        { q: 'What is revive?', a: 'When you miss, you can watch a short ad once per run to keep your score and start a fresh tower, instead of ending the game.' },
        { q: 'Does it have a leaderboard?', a: 'Yes. Your best stack height is saved and shown on the global leaderboard.' },
        { q: 'Is STAQ free?', a: 'Yes, completely free to play.' },
        { q: 'Mobile?', a: 'Yes, STAQ is built for portrait mobile and works great on tablet and desktop too.' },
      ],
    },
  },

  /* ================================================================
     NEON RUSH — runner 3D tunnel néon, catégorie arcade
     ================================================================ */
  {
    id: 'neon-rush',
    title: 'Neon Rush',
    description: 'Race through an endless neon tunnel at breakneck speed. Dodge between three lanes, weave past glowing walls, and grab energy orbs to build a score multiplier. Chain near-misses for huge combos, survive the intense obstacle waves, and use your one revive to push even further. A fast, hypnotic 3D runner in pure retro-futuristic neon — how far can you go before you crash?',
    thumbnail: '/thumbnails/neon-rush.jpg',
    category: 'arcade',
    tags: ['runner', 'arcade', '3d', 'neon', 'reflex', 'endless', 'dodge', 'synthwave'],
    size: 'medium',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Left / right arrows or A / D to switch lanes. On mobile, tap the left or right side of the screen. Dodge obstacles, collect orbs, survive. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Neon Rush — Free 3D Neon Tunnel Runner Game | Ragequit Arcade',
      metaDescription: 'Play Neon Rush free online. A fast 3D endless runner through a retro-futuristic neon tunnel: dodge across three lanes, chain combos and survive the waves. No download.',
      faq: [
        { q: 'How do you play Neon Rush?', a: 'Use the left and right arrows or A and D to move between the three lanes. On mobile, tap the left or right half of the screen. Dodge the neon obstacles, collect orbs and survive as long as you can.' },
        { q: 'How does the score work?', a: 'You earn points for the distance you travel, plus bonuses for collecting orbs and for near-misses. Chaining pickups and close calls builds a combo multiplier that boosts every point you score.' },
        { q: 'What are the waves?', a: 'The tunnel alternates calm stretches with intense obstacle waves that speed you up and pack the track with walls. A safe path always exists, but it gets harder to read at high speed.' },
        { q: 'What is revive?', a: 'When you crash you can watch a short ad to revive once per run, keep your score and keep going, with a few seconds of invincibility to get back into the flow.' },
        { q: 'Does it have a leaderboard?', a: 'Yes. Your best run is saved and shown on the global leaderboard.' },
        { q: 'Is Neon Rush free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes, Neon Rush works on mobile, tablet and desktop, in both portrait and landscape.' },
      ],
    },
  },

  /* ================================================================
     VIRUS LAB — stratégie : programme un génome, conquiers la boîte
     ================================================================ */
  {
    id: 'virus-lab',
    title: 'Virus Lab',
    description: 'You do not steer your virus — you program its DNA. Build a genome from actions like advance, turn, leap, split and acid, then release your strain into a petri dish where it spreads and fights an enemy for territory. Beat a 30-level campaign, unlock powerful new actions in the Lab, design how your virus looks, then publish it to the Arena to battle other players\u2019 real strains. Every win climbs your Arena score. A one-of-a-kind programmed-strategy game with no equivalent in the browser.',
    thumbnail: '/thumbnails/virus-lab.jpg',
    category: 'arcade',
    tags: ['strategy', 'arcade', 'programming', 'simulation', 'pvp', 'arena', 'territory', 'unique'],
    size: 'large',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['arena'],
    defaultMode: 'arena',
    controls: 'Tap to build your virus genome from unlocked actions, then deploy. Battles play out automatically — the skill is in the genome you design. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Virus Lab — Free Virus Strategy Game | Ragequit Arcade',
      metaDescription: 'Play Virus Lab free online. Program a virus genome, release it in a petri dish and conquer territory, then battle other players\u2019 strains in the Arena. A unique browser strategy game.',
      faq: [
        { q: 'How do you play Virus Lab?', a: 'You do not control the virus in real time. You program its genome — a short list of actions it repeats — then deploy it into the petri dish. It spreads on its own and fights the enemy strain for territory. Whoever holds the most territory when the timer ends wins.' },
        { q: 'What actions can I add to my genome?', a: 'You start with basics like advance and turn, then unlock powerful actions in the Lab: leap, surge, acid, split, mutate, dash, shield, burst and more. Each action costs genome slots, so you design your strain around a budget.' },
        { q: 'What is the Arena?', a: 'The Arena is asynchronous PvP: you publish your best strain and battle the real genomes of other players. Your engine replays their virus, so nobody needs to be online at the same time.' },
        { q: 'How does the score work?', a: 'Your Arena score starts at 1000. You gain points for each Arena win and lose points for each loss. Your best Arena score appears on the global leaderboard.' },
        { q: 'Is there a campaign?', a: 'Yes. A 30-level campaign pits you against increasingly clever enemy strains, teaching you to read genomes and build better loops. Winning earns DNA to unlock new actions.' },
        { q: 'Is Virus Lab free?', a: 'Yes, completely free to play, no download required.' },
        { q: 'Mobile?', a: 'Yes, Virus Lab is built for portrait mobile and works great on tablet and desktop too.' },
      ],
    },
  },

  /* ================================================================
     STELLAR FORGE — idle clicker spatial, catégorie idle
     ================================================================ */
  {
    id: 'stellar-forge',
    title: 'Stellar Forge',
    description: 'Start with a single hand pick and forge your way to a galactic civilization. Mine ore, automate with drills and mining empires, build a real energy grid from solar panels to Dyson spheres, and climb the actual Kardashev scale from Type I to Type III. Watch your civilization grow — even while you are away. A deep, science-based idle clicker for players who love numbers going up.',
    thumbnail: '/thumbnails/stellar-forge.jpg',
    category: 'idle',
    tags: ['idle', 'clicker', 'space', 'incremental', 'mining', 'sci-fi', 'kardashev', 'automation'],
    size: 'medium',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Tap or click to mine ore. Buy buildings to automate production and build energy plants to power everything and climb the Kardashev scale. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Stellar Forge — Free Space Idle Clicker Game | Ragequit Arcade',
      metaDescription: 'Play Stellar Forge free online. A space idle clicker where you mine ore, build an energy empire and climb the real Kardashev scale from planet to galaxy. No download.',
      faq: [
        { q: 'How do you play Stellar Forge?', a: 'Tap to mine your first ore, then buy drills, rigs and mining empires to automate production. Build energy plants to power everything and climb the civilization scale.' },
        { q: 'What is the Kardashev scale in the game?', a: 'It is a real scientific scale of civilization energy use. You progress from Type I (planetary) to Type II (stellar, like a Dyson sphere) to Type III (galactic), based on the actual power your civilization produces.' },
        { q: 'Does it produce while I am away?', a: 'Yes. Once you automate with buildings, your civilization keeps producing resources even when the game is closed. Come back to collect your progress.' },
        { q: 'What is the goal?', a: 'Grow from a single hand pick to a galaxy-spanning civilization. Scale your energy grid and push as far up the Kardashev scale as you can.' },
        { q: 'Is Stellar Forge free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes, Stellar Forge is built for portrait mobile and works great on tablet and desktop too.' },
      ],
    },
  },
   /* ================================================================
     OCTAFLUX — puzzle : fais tourner un octogone pour aligner les pièces
     ================================================================ */
  {
    id: 'octaflux',
    title: 'OCTAFLUX',
    description: 'Spin a glowing octagon with your thumb and catch the pieces raining down on its eight faces. Rotate fast to line up matching colors, trigger cascading chains, and keep the flux flowing before the faces overload. Simple to grab, impossible to put down — one drag is all it takes, but mastering the spin is another story. How long can you keep the octagon alive?',
    thumbnail: '/thumbnails/octaflux.jpg',
    category: 'puzzle',
    tags: ['puzzle', 'match', 'rotation', 'octagon', 'reflex', 'casual', 'chain', 'arcade'],
    size: 'medium',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Drag anywhere with your thumb or mouse to rotate the octagon. Align falling pieces by matching colors on each face to clear them and chain combos. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'OCTAFLUX — Free Octagon Match Puzzle Game | Ragequit Arcade',
      metaDescription: 'Play OCTAFLUX free online. Rotate a glowing octagon with your thumb to catch and match falling pieces, trigger cascading chains and survive as long as you can. No download.',
      faq: [
        { q: 'How do you play OCTAFLUX?', a: 'Drag with your thumb or mouse to spin the central octagon. Pieces fall onto its eight faces — rotate to line up matching colors so they clear. Clearing pieces triggers cascading chains for bigger scores.' },
        { q: 'What are cascades?', a: 'When you clear a group of matching pieces, the pieces above shift and can clear too, chaining into a cascade. Longer chains score far more points, so setting up big combos is the key to a high score.' },
        { q: 'How does the score work?', a: 'You earn points for every piece you clear, with large bonuses for cascading chains. The faster and longer your combos, the higher your score climbs.' },
        { q: 'Does it have a leaderboard?', a: 'Yes. Your best score is saved and shown on the global leaderboard.' },
        { q: 'Is OCTAFLUX free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes, OCTAFLUX is built for thumb-drag controls on portrait mobile, and works great on tablet and desktop too.' },
      ],
    },
  },
]
