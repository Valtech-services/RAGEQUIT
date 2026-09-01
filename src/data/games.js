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
    description: 'Competitive, fast and gloriously rage-inducing — our sports games put your reflexes and your patience to the test. This is where physics, timing and a merciless AI come together to create matches you will want to replay again and again. Right now the category is led by Rage Hockey, a brutal take on air hockey with three distinct arenas, a punishing computer opponent and a local two-player mode for settling scores on the couch. Every sports game on Ragequit Arcade runs free in your browser, on mobile, tablet and desktop, with no download and no signup. Pick your match, chase the win, and see how you climb the global leaderboard.',
    seo: {
      title: 'Free Sports Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free sports games online at Ragequit Arcade. Fast, competitive and rage-inducing, led by Rage Hockey. No download, no signup required.',
      faq: [
        { q: 'What sports games are available?', a: 'Our flagship sports game is Rage Hockey, a fast and brutal air hockey game with three arenas (Classic, Bumper and Narrow), a challenging AI opponent, a local two-player mode and a Power Boost you can earn between matches. We add new games regularly, so check back often.' },
        { q: 'Can I play sports games with a friend?', a: 'Yes. Rage Hockey includes a local two-player mode where you and a friend share the same screen — one on each side of the table — for head-to-head matches. It is made for quick, competitive rivalries.' },
        { q: 'Are the sports games free?', a: 'Yes, every sports game is 100% free to play, with no account required. Create a free profile if you want to save your scores and appear on the global leaderboard.' },
        { q: 'Do they work on mobile?', a: 'Yes, all our sports games work on mobile, tablet and desktop. For Rage Hockey, rotate your phone to landscape for the best experience and the widest view of the table.' },
      ],
    },
  },
  {
    id: 'arcade',
    label: 'Arcade',
    image: '/categories/arcade.jpg',
    description: 'Stack, dodge, spread and survive — our arcade games are all about quick reflexes, tight timing and that irresistible one-more-try feeling. This is the biggest and most varied category on Ragequit Arcade, packed with pick-up-and-play titles that are simple to learn and genuinely hard to master. Stack blocks with perfect timing in STAQ, race through a hypnotic neon tunnel in Neon Rush, engineer a virus to conquer a petri dish in the strategy-driven Virus Lab, or chase a high score with candy and combos in Snake Candy Arena. Every arcade game runs free in your browser on mobile, tablet and desktop, with no download and no signup — the perfect way to fill five minutes or lose an hour.',
    seo: {
      title: 'Free Arcade Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free arcade games online at Ragequit Arcade: STAQ, Neon Rush, Virus Lab, Snake Candy Arena and more. Reflex, survival and high scores. No download.',
      faq: [
        { q: 'What arcade games are available?', a: 'The arcade category includes STAQ, a one-tap block-stacking game; Neon Rush, a 3D neon tunnel runner; Virus Lab, a unique strategy game where you program a virus to conquer territory; and Snake Candy Arena, a neon twist on classic snake with candy and combos. We add new arcade games regularly.' },
        { q: 'What makes a game an arcade game?', a: 'Arcade games are fast, reflex-driven and easy to pick up, built around chasing a high score and beating your last run rather than long sessions or complex rules. Most take seconds to learn and a lot longer to truly master.' },
        { q: 'Are the arcade games free?', a: 'Yes, every arcade game is completely free to play, with no account required. Sign in with a free profile to save your scores and climb the global leaderboards.' },
        { q: 'Do they work on mobile?', a: 'Yes, all our arcade games are optimised for mobile, tablet and desktop, with touch controls on phones and keyboard or mouse support on computers.' },
      ],
    },
  },
  {
    id: 'idle',
    label: 'Idle / Clicker',
    image: '/categories/idle.jpg',
    description: 'Tap, collect, upgrade, repeat — and then watch your numbers grow even while you are away. Idle and clicker games are the ultimate feel-good genre: you start with a single action and slowly build a self-running empire, unlocking upgrade after upgrade until progress compounds into something enormous. Our headline idle game is Stellar Forge, a deep, science-based clicker where you mine ore, automate production, build a real energy grid and climb the genuine Kardashev scale from a lone miner to a galaxy-spanning civilization. Come back after a break to collect everything your empire produced in your absence. Every idle and clicker game on Ragequit Arcade runs free in your browser on mobile, tablet and desktop, with no download and no signup.',
    seo: {
      title: 'Free Idle & Clicker Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free idle and clicker games online at Ragequit Arcade, led by Stellar Forge. Tap, automate and watch your numbers grow. No download, no signup.',
      faq: [
        { q: 'What are idle and clicker games?', a: 'Idle and clicker games start with a simple action — usually tapping — that earns resources. You then reinvest those resources into upgrades and automation that keep producing on their own, even when you are not playing. They are simple to start and deeply satisfying as your progress compounds.' },
        { q: 'What idle games can I play here?', a: 'Our flagship idle game is Stellar Forge, where you mine ore, automate with drills and mining empires, build an energy grid and climb the real Kardashev scale from planet to galaxy. New idle and clicker games are added regularly.' },
        { q: 'Do idle games keep progressing when I am away?', a: 'Yes. Once you have automated production, your game keeps generating resources even when it is closed. Coming back to collect everything you earned while away is a core part of what makes the genre so addictive.' },
        { q: 'Are they free and do they work on mobile?', a: 'Yes, every idle and clicker game is completely free with no account required, and they are perfect on mobile — one thumb is all you need — as well as on tablet and desktop.' },
      ],
    },
  },
  {
    id: 'puzzle',
    label: 'Puzzle',
    image: '/categories/puzzle.jpg',
    description: 'Match, rotate and think fast under pressure — our puzzle games test both your reflexes and your brain. This category is for players who love a satisfying chain reaction and the rush of solving something a split second before it is too late. The standout is OCTAFLUX, a hypnotic game where you spin a glowing octagon with your thumb to catch falling pieces, line up matching colours and trigger cascading chains for massive scores. Puzzle games here are quick to learn but reward planning, pattern recognition and nerve. Every one runs free in your browser on mobile, tablet and desktop, with no download and no signup — a perfect mental workout that never feels like homework.',
    seo: {
      title: 'Free Puzzle Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free puzzle games online at Ragequit Arcade, led by OCTAFLUX. Match, rotate and chain combos under pressure. No download, no signup required.',
      faq: [
        { q: 'What puzzle games are available?', a: 'Our headline puzzle game is OCTAFLUX, a fast octagon-rotation match game where you spin a central octagon with your thumb to catch and align falling pieces, clearing matching colours and triggering cascading chains. We add new puzzle games regularly.' },
        { q: 'What makes a good puzzle game?', a: 'The best puzzle games are easy to understand but reward quick thinking and forward planning. Ours combine pattern recognition with real-time pressure, so you are always balancing a smart move against a ticking clock or a filling board.' },
        { q: 'Are the puzzle games free?', a: 'Yes, every puzzle game is 100% free to play, with no account required. Create a free profile to save your best scores and appear on the global leaderboards.' },
        { q: 'Do they work on mobile?', a: 'Yes, puzzle games are perfect on mobile — most just need a thumb drag or a tap — and they work great on tablet and desktop too.' },
      ],
    },
  },
  {
    id: 'shooting',
    label: 'Shooting',
    image: '/categories/shooting.jpg',
    description: 'Take aim, fire fast and survive the onslaught — our shooting games are all about precision, quick reactions and holding your nerve as the pressure ramps up. Whether you are picking off fast-moving targets or defending against relentless waves, every shot counts. Leading the category is Bird Blitz, a fast and funny tower-defense shooter where you protect the world\u2019s greatest monuments from an endless flock of birds: shoot pigeons, seagulls, eagles and giant bosses out of the sky, chain your hits for huge combo multipliers, and spend your earnings on shotguns, shields and air strikes to survive ever-tougher waves. Every shooting game on Ragequit Arcade runs free in your browser on mobile, tablet and desktop, with no download and no signup.',
    seo: {
      title: 'Free Shooting Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free shooting games online at Ragequit Arcade, led by Bird Blitz. Take aim, chain combos and survive the waves. No download, no signup required.',
      faq: [
        { q: 'What shooting games are available?', a: 'Our flagship shooting game is Bird Blitz, a tower-defense shooter where you defend ten famous world monuments from waves of birds. You take aim, chain combos, buy weapons like shotguns and air strikes, face a boss every ten waves and upgrade permanently between runs. New shooting games are added regularly.' },
        { q: 'What kind of shooting games are these?', a: 'These are skill-based, reflex-driven shooters focused on aim and timing rather than graphic violence. Bird Blitz, for example, is a light-hearted tower-defense shooter about keeping monuments clean — fast and challenging, but family-friendly in tone.' },
        { q: 'Are the shooting games free?', a: 'Yes, every shooting game is completely free to play, with no account required. Sign in with a free profile to save your scores and climb the global leaderboards.' },
        { q: 'Do they work on mobile?', a: 'Yes, our shooting games work on mobile, tablet and desktop. On touch screens you simply tap to aim and fire, while on desktop you get precise mouse aiming.' },
      ],
    },
  },
  {
    id: 'brain',
    label: 'Brain',
    image: '/categories/brain.jpg',
    description: 'Memory, logic and focus — our brain games sharpen your mind while you play. This category is built for players who want a real mental challenge: remembering more, reacting faster and pushing their concentration further with every run. The headline game is FLASHOUT, a neon memory game where a grid of glowing symbols flashes for a split second, then flips face down, and you have to match every pair from memory before the timer runs out — with a Normal mode to warm up and a punishing Hard mode for the leaderboard. Brain games here are fast, fair and genuinely satisfying to improve at. Every one runs free in your browser on mobile, tablet and desktop, with no download and no signup — perfect for a quick mental workout or a long high-score session.',
    seo: {
      title: 'Free Brain Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free brain games online at Ragequit Arcade, led by FLASHOUT. Train your memory, focus and reflexes with fast, addictive challenges. No download.',
      faq: [
        { q: 'What are brain games?', a: 'Brain games are challenges built around memory, logic, focus and quick thinking rather than pure reflexes alone. They give your mind a workout while staying fast and fun. Our flagship brain game is FLASHOUT, where symbols flash and flip, and you match every pair from memory before time runs out.' },
        { q: 'What brain games can I play here?', a: 'The category is led by FLASHOUT, a neon memory match game with a Normal and a Hard mode, a combo system and separate leaderboards for each mode. We add new brain and memory games regularly.' },
        { q: 'Do brain games really help?', a: 'While no game is a substitute for real training, memory and focus games are a fun way to challenge your concentration and short-term memory. The real appeal is the challenge: remembering more and beating your own best score each time.' },
        { q: 'Are they free and do they work on mobile?', a: 'Yes, every brain game is 100% free with no account required, and they are perfect on mobile, tablet and desktop — most just need a tap, so you can train your memory anywhere.' },
      ],
    },
  },
]

/* ---- SEO global du site ---- */
export const siteSeo = {
  title: 'Ragequit Arcade — Free Online Games',
  description: 'The most addictive free online games. Simple to learn, impossible to master. A new game every week.',
  about: 'Ragequit Arcade brings you the most addictive free online games, built for solo runs or quick matches with friends. Every game runs instantly in your browser — no downloads, no sign-up, no pop-ups, no nonsense. Our games work on desktop, tablet and mobile, so you can play at home or on the move. We are building a place where a great game is always one click away.',
  gameSelection: 'We add new games every single week. Our current titles include Rage Hockey, STAQ, Stellar Forge, Neon Rush, Virus Lab, OCTAFLUX, Bird Blitz and Snake Candy Arena. Every game is free to play, forever.',
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
    description: 'Rage Hockey is fast, brutal air hockey turned up to eleven. Slam the puck into the enemy goal before they slam it into yours, in matches where the physics are quick, the AI is merciless and the arena itself can decide the game. Pick your battleground: the clean Classic table, the chaotic Bumper arena with a central bouncer that sends the puck flying in unpredictable directions, or the tight Narrow field where there is nowhere to hide. Play solo against an AI that genuinely fights back, or grab a friend for local two-player mayhem on the same screen. First to seven goals wins — but with a puck this fast and a table this cruel, seven goals has never felt so far away. Watch a short ad after a match for a Power Boost that supercharges your paddle and slows your opponent. Simple to pick up, infuriating to master, and named after exactly what it will make you do.',
    thumbnail: '/thumbnails/rage-hockey.jpg',
    category: 'sports',
    tags: ['hockey', 'multiplayer', '2-player', 'arcade', 'rage', 'sports'],
    size: 'medium',
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
        { q: 'How do you play Rage Hockey?', a: 'Move your paddle to strike the puck and send it into your opponent\u2019s goal while defending your own. On desktop you use the mouse; on mobile you drag with your finger. The first player to score seven goals wins the match.' },
        { q: 'Can I play two players on one device?', a: 'Yes. Choose 2 Players on the title screen for local head-to-head play. Player 1 controls the left side with mouse or touch, and Player 2 controls the right side by touch or with the I, J, K and L keys. It is built for couch rivalries.' },
        { q: 'What are the different arenas?', a: 'There are three. Classic is the traditional open table. Bumper adds a central bouncer that ricochets the puck unpredictably and creates chaos. Narrow tightens the field so there is far less room to defend, rewarding fast reflexes. Each arena completely changes how a match plays.' },
        { q: 'What is the Power Boost?', a: 'After a match you can watch a short ad to unlock a Power Boost: for about 25 seconds your paddle hits harder and moves better while your opponent is slowed down. It is a great way to swing a tough rematch in your favour.' },
        { q: 'Is there a single-player mode?', a: 'Yes. You can play solo against an AI opponent that actually challenges you, adjusting to the pace of the puck. It is perfect for quick practice or a real test of your reflexes when no friend is around.' },
        { q: 'How does scoring and the leaderboard work?', a: 'Each match is first to seven goals. Your results feed into the global leaderboard so you can see how you stack up against other players. Sign in to save your progress and claim your rank.' },
        { q: 'Is Rage Hockey free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Does it work on mobile?', a: 'Yes. Rage Hockey works on mobile, tablet and desktop. On phones, rotate your device to landscape for the best experience — the wider view gives you more control over the table.' },
      ],
    },
  },

  /* ================================================================
     STAQ — arcade, one-tap block stacking
     ================================================================ */
  {
    id: 'staq',
    title: 'STAQ',
        description: 'STAQ is the one-tap block-stacking game that turns pure precision into an addictive high-score chase. A block slides back and forth above your tower — tap at exactly the right moment to drop it. Nail the timing and it locks on perfectly, keeping your tower full width; mistime it and the overhang is sliced away, leaving you a little less room for the next drop. Every block is a fresh test of nerve, and one bad drop can send everything crashing down. Land a run of Perfect drops to trigger satisfying combos, watch your tower climb into a glowing skyline, and when you finally slip, watch a short ad to revive your tower and keep the run alive. It is the kind of simple, hypnotic game you pick up for one quick round and put down twenty rounds later. How high can you stack before you rage quit?',
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
        { q: 'How do you play STAQ?', a: 'A block moves side to side above your tower. Tap the screen, click, or press the spacebar to drop it. Line it up as precisely as you can with the block below: the better your timing, the more of the block stays, and the wider and more stable your tower remains.' },
        { q: 'What is a Perfect drop?', a: 'When you align a block almost exactly on top of the one below, you score a Perfect: the block keeps its full width instead of being trimmed, with a flash and a sound to reward you. Chaining several Perfects in a row builds a combo and lets you reach far greater heights.' },
        { q: 'What happens when I mistime a drop?', a: 'Any part of the block that overhangs the one below is sliced off and falls away, making your tower narrower. Keep mistiming and the platform shrinks until a drop misses completely — and then the run is over. Precision is everything.' },
        { q: 'What is the revive feature?', a: 'When your run ends, you can watch a short ad once to revive: you keep your score and get a fresh, full-width block to continue stacking instead of starting from zero. It is a second chance to push your record even higher.' },
        { q: 'How does scoring and the leaderboard work?', a: 'Your score is the height of your tower — essentially how many blocks you successfully stacked. Your best height is saved to the global leaderboard so you can compete with players around the world. Sign in to keep your records.' },
        { q: 'Is STAQ free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Does it work on mobile?', a: 'Yes. STAQ is built for one-tap play in portrait mode, so it feels perfect on a phone, and it works just as well on tablet and desktop with a click or the spacebar.' },
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
    description: 'Virus Lab is a one-of-a-kind strategy game with no real equivalent in the browser: you do not steer your virus, you program its DNA. Build a genome from a sequence of actions — advance, turn, leap, split, acid and many more — then release your engineered strain into a petri dish where it spreads on its own and fights an enemy virus for territory. The skill is not in your reflexes but in the logic you design: a clever loop of instructions can outmaneuver and overwhelm a strain that looks far more aggressive. Work through a 30-level campaign against increasingly cunning enemies, earn DNA to unlock powerful new actions in the Lab, and design exactly how your virus looks. When your strain is ready, publish it to the Arena and battle the real, published genomes of other players in asynchronous PvP — no one needs to be online at the same time. Every Arena win climbs your score and your place on the global leaderboard. Part puzzle, part programming, part living simulation, Virus Lab rewards the players who think a few moves ahead.',
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
        { q: 'How do you play Virus Lab?', a: 'You do not control the virus directly. Instead you program its genome — a short, repeating list of actions — then deploy it into the petri dish. From there it spreads and fights the enemy strain on its own. Whoever controls the most territory when the timer ends wins, so victory comes from designing a smarter set of instructions, not from fast reflexes.' },
        { q: 'What actions can I add to my genome?', a: 'You start with the basics like advance and turn, then unlock a whole toolkit in the Lab: leap, surge, acid, split, mutate, dash, shield, burst and more. Each action costs genome slots, so you have to design your strain around a budget and decide which behaviours matter most.' },
        { q: 'What is the Arena?', a: 'The Arena is asynchronous player-versus-player. You publish your best strain, and the game pits it against the real genomes other players have published. Your device replays their virus locally, so nobody needs to be online at the same moment — you can challenge the world at any hour.' },
        { q: 'How does the Arena score work?', a: 'Your Arena score starts at 1000. You gain points for every Arena win and lose points for every loss, so a strong, consistent strain climbs steadily. Your best Arena score is what appears on the global leaderboard.' },
        { q: 'Is there a campaign?', a: 'Yes. A 30-level campaign pits you against progressively smarter enemy strains, teaching you to read genomes and build better loops as you go. Clearing levels earns DNA, which you spend in the Lab to unlock new actions and deepen your strategies.' },
        { q: 'Can I customise my virus?', a: 'Yes. Beyond its behaviour, you can design how your virus looks before you send it into the Arena, so your published strain feels like your own creation when other players face it.' },
        { q: 'Is Virus Lab free?', a: 'Yes, completely free to play, no download required.' },
        { q: 'Does it work on mobile?', a: 'Yes. Virus Lab is built for portrait mobile and works great on tablet and desktop too — the genome-building interface is designed for touch.' },
      ],
    },
  },

  /* ================================================================
     STELLAR FORGE — idle clicker spatial, catégorie idle
     ================================================================ */
  {
    id: 'stellar-forge',
    title: 'Stellar Forge',
        description: 'Stellar Forge is a deep, science-based idle clicker where you grow a civilization from a single swing of a hand pick all the way to a galaxy-spanning empire. Start by tapping to mine your first ore, then reinvest it into drills, rigs and entire mining empires that automate production so your resources keep flowing even while you are away. But mining is only half the story: you also build a real energy grid, from humble solar panels to colossal Dyson spheres, and use that power to climb the actual Kardashev scale — the genuine scientific measure of a civilization\u2019s energy use — from Type I planetary all the way to Type III galactic. Every upgrade unlocks bigger numbers, faster growth and a satisfying sense of unstoppable progress. Come back after a break to collect everything your empire produced while you were gone. If you love watching numbers climb and systems compound into something enormous, Stellar Forge is built for you.',
    thumbnail: '/thumbnails/stellar-forge.jpg',
    category: 'idle',
    tags: ['idle', 'clicker', 'space', 'incremental', 'mining', 'sci-fi', 'kardashev', 'automation'],
    size: 'large',
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
        { q: 'How do you play Stellar Forge?', a: 'You begin by tapping or clicking to mine ore by hand. As you accumulate resources, you buy drills, rigs and mining empires that produce ore automatically. You then build energy plants to power everything, and keep reinvesting to grow faster and climb the civilization scale.' },
        { q: 'What is the Kardashev scale in the game?', a: 'The Kardashev scale is a real scientific way of ranking civilizations by how much energy they can harness. In Stellar Forge you progress through it for real: Type I harnesses the power of a planet, Type II the power of a star (think a Dyson sphere), and Type III the power of an entire galaxy. Your rank rises as your energy output grows.' },
        { q: 'Does the game keep producing while I am away?', a: 'Yes. Once you automate production with buildings, your empire keeps mining and generating energy even when the game is closed. When you come back, you collect everything it produced in your absence — a core part of what makes an idle game so satisfying.' },
        { q: 'What is the goal of the game?', a: 'The goal is endless growth: take a lone miner with a hand pick and scale all the way to a galactic civilization. There is always a next building to buy, a next energy tier to unlock and a next step up the Kardashev scale, so you set your own milestones and chase ever-bigger numbers.' },
        { q: 'Do I need to keep tapping the whole time?', a: 'No. Tapping matters at the very start, but the heart of the game is automation. Once your buildings are producing on their own, your job becomes choosing the smartest upgrades to compound your growth, not clicking endlessly.' },
        { q: 'Is Stellar Forge free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Does it work on mobile?', a: 'Yes. Stellar Forge is built for portrait mobile — one thumb is all you need — and works great on tablet and desktop too.' },
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
  /* ================================================================
     BIRD BLITZ — tower defense : défends les monuments du monde
     ================================================================ */
  {
    id: 'bird-blitz',
    title: 'Bird Blitz',
    description: 'The world\u2019s greatest monuments are under attack — not by armies, but by an endless flock of mischievous birds determined to cover them in droppings. Take aim and shoot pigeons, seagulls, eagles, albatrosses and thieving crows out of the sky before they defile the Eiffel Tower, Big Ben, the Statue of Liberty and seven more world landmarks. Earn gold for every hit, chain your shots for huge combo multipliers, and spend your earnings on shotguns, shields, air strikes, nets and slow-motion to survive ever-tougher waves. Every tenth wave unleashes a giant boss, and permanent star upgrades let you come back stronger. A fast, funny and surprisingly deep browser tower-defense shooter.',
    thumbnail: '/thumbnails/bird-blitz.jpg',
    category: 'shooting',
    tags: ['tower-defense', 'shooter', 'arcade', 'birds', 'monuments', 'action', 'combo', 'waves', 'upgrades'],
    size: 'large',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['eiffel','bigben','liberty','pyramid','taj','opera','colosseum','christ','angkor','pagoda'],
    defaultMode: 'eiffel',
    controls: 'Tap or click a bird to shoot it. On desktop, a crosshair follows your mouse for precise aim. Tap the item buttons on the sides of the screen to fire your shotgun, deploy a shield, call an air strike, throw a net, trigger slow-motion or drop a decoy. Grab falling power-ups before they hit the ground. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Bird Blitz — Free Monument Defense Shooter Game | Ragequit Arcade',
      metaDescription: 'Play Bird Blitz free online. Defend the world\u2019s monuments from waves of birds in a fast tower-defense shooter: shoot pigeons and bosses, chain combos, buy weapons and upgrade between runs. No download.',
      faq: [
        { q: 'How do you play Bird Blitz?', a: 'Birds fly across the screen and try to drop droppings on the monument you are defending. Tap or click each bird to shoot it before it soils the landmark. Every bird you hit earns gold, and keeping the monument clean keeps you in the game. If the monument gets too dirty, the run ends.' },
        { q: 'What are the different bird types?', a: 'Each bird behaves differently. Pigeons are the basic enemy, seagulls are quicker, eagles are the fastest of all, albatrosses are the biggest and toughest and take three shots to bring down, and crows try to steal your gold. Every ten waves, a giant boss bird appears with far more health and special rain attacks.' },
        { q: 'How does the combo system work?', a: 'Shooting birds without missing builds a combo. At 3 hits your score and gold are multiplied by 1.5, at 5 hits by 2, at 10 hits by 3 and at 15 hits by 4. Missing a shot or waiting too long breaks the combo, so precision and rhythm are the key to big scores.' },
        { q: 'What can I buy during a run?', a: 'You spend the gold you earn on powerful items available on the sides of the screen: a shotgun that fires in a cross pattern, a protective shield with its own health bar, an air strike, a net, a slow-motion effect and a decoy that distracts the birds. Each item has a limited duration or number of uses, shown on screen.' },
        { q: 'What are power-ups?', a: 'During waves, power-ups occasionally fall from the sky — rapid fire, freeze, bullet rain and gold rush. Grab them by tapping before they hit the ground to gain a short but powerful boost.' },
        { q: 'What are stars and permanent upgrades?', a: 'You earn stars as you play and spend them on permanent upgrades that carry across every run: more damage, tougher shields, more starting gold, a gold boost, luckier power-up drops, a stronger combo system and better cleaning. Stars also unlock new monuments to defend.' },
        { q: 'What monuments can I defend?', a: 'Bird Blitz features ten real-world landmarks, each with its own look and its own gameplay twist: the Eiffel Tower, Big Ben, the Statue of Liberty, the Pyramids of Giza, the Taj Mahal, the Sydney Opera House, the Colosseum, Christ the Redeemer, Angkor Wat and a Japanese Pagoda. Each monument has a bonus and a drawback that change how a run plays.' },
        { q: 'Are there daily challenges?', a: 'Yes. Every day brings three new challenges that are the same for all players, tracked automatically as you play. They give you a fresh reason to come back and a new way to earn stars.' },
        { q: 'Is Bird Blitz free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes. Bird Blitz works on mobile, tablet and desktop. On desktop you get a mouse crosshair for precise aiming, and on touch screens you simply tap the birds.' },
      ],
    },
  },
     /* ================================================================
     SNAKE CANDY ARENA — arcade : le serpent revisité, bonbons & combos
     ================================================================ */
  {
    id: 'snake',
    title: 'Snake Candy Arena',
    description: 'The classic snake game, reinvented with candy, combos and bonus animals. Guide your glowing snake around a neon arena, devour candy to grow one segment at a time, and chain your pickups fast to build a combo multiplier that sends your score soaring. Every few candies, a bonus animal appears for a limited time — grab it before it vanishes for a big point spike. The longer you get, the less room you have, until the whole board is a maze of your own tail. Fill the entire arena for the perfect run, and if you crash, watch an ad to revive and keep your score alive. Easy to pick up, deliciously hard to master.',
    thumbnail: '/thumbnails/snake.jpg',
    category: 'arcade',
    tags: ['snake', 'arcade', 'candy', 'combo', 'retro', 'reflex', 'casual', 'high-score'],
    size: 'medium',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Use the arrow keys or W A S D to steer on desktop. On mobile, swipe in the direction you want to go. Eat the pink candy to grow and score, grab the glowing bonus animals for extra points, and avoid crashing into your own tail. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Snake Candy Arena — Free Snake Game with Combos | Ragequit Arcade',
      metaDescription: 'Play Snake Candy Arena free online. A neon twist on classic snake: eat candy, chain combos for a score multiplier, catch bonus animals and fill the whole arena. No download, no signup.',
      faq: [
        { q: 'How do you play Snake Candy Arena?', a: 'You steer a snake that moves continuously around a neon arena. Use the arrow keys or W A S D on desktop, or swipe on mobile. Eat the pink candy to grow one segment longer and score points. The run ends if you crash into your own tail, so the longer you get, the more carefully you have to plan your path.' },
        { q: 'How does the combo system work?', a: 'Eating candy quickly, one piece after another, builds a combo multiplier. Each candy in a chain is worth more than the last, up to a high multiplier, so the faster you feed your snake the bigger your score grows. If you wait too long between candies, the combo resets to the start.' },
        { q: 'What are the bonus animals?', a: 'Every few candies, a glowing bonus animal appears somewhere on the board for a limited time, shown by a countdown timer. Reaching it before it disappears rewards you with a big burst of points — worth double, boosted by your current combo — and grows your snake by one more segment.' },
        { q: 'How does scoring work?', a: 'You earn points for every candy and every bonus animal you eat, all multiplied by your active combo. Building long combo chains and catching bonus animals at high multipliers is the key to topping the leaderboard. Your best score is saved to the global leaderboard.' },
        { q: 'What is the perfect run?', a: 'The final candy can only be eaten once your snake has grown to fill the entire arena. Manage to take that last candy with the board completely packed and you trigger a perfect "arena filled" finale worth a big bonus — the ultimate Snake Candy Arena challenge.' },
        { q: 'Can I continue after crashing?', a: 'Yes. When you crash, you can watch a short ad once to revive and keep your current score instead of starting over, so a single mistake does not have to end a great run.' },
        { q: 'What tips help me score higher?', a: 'Move in calm, deliberate patterns and keep an escape route open so you never box your own tail into a corner. Try to eat candy in quick succession to keep your combo high, and always plan a safe path to the bonus animal before you chase it. Patience and route planning beat raw speed.' },
        { q: 'Is Snake Candy Arena free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes. Snake Candy Arena works on mobile, tablet and desktop. On touch screens you swipe to steer, and on desktop you use the keyboard.' },
      ],
    },
  },
     /* ================================================================
     FLASHOUT — brain / mémoire : mémorise, associe, survis
     ================================================================ */
  {
    id: 'flashout',
    title: 'FLASHOUT',
    description: 'Memorize. Match. Survive. FLASHOUT is a fast, neon memory game that turns the classic pairs concept into a high-pressure arcade challenge. At the start of each level the board flashes its glowing symbols — triangles, hearts, hexagons, stars and diamonds — for a split second, then flips them face down. Race against a draining timer to find every matching pair from memory before the clock hits zero. Clear a level and the next one gets bigger and tougher, with more cards and less margin for error. Chain matches without a mistake to build a combo streak that multiplies your score, because here your score is what matters, not just how far you got. Play it cool in Normal mode, or switch to Hard mode where every wrong flip costs you precious seconds. One glance is all you get — how many levels can you keep in your head before you flash out?',
    thumbnail: '/thumbnails/flashout.jpg',
    category: 'brain',
    tags: ['memory', 'puzzle', 'neon', 'pairs', 'brain', 'combo', 'reflex', 'concentration'],
    size: 'medium',
    shimmer: true,
    isNew: true,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['normal', 'hard'],
    defaultMode: 'normal',
    controls: 'Watch the symbols flash at the start of each level, then tap or click the face-down cards to find matching pairs from memory before the timer runs out. Works on mobile, tablet and desktop — no keyboard needed.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'FLASHOUT — Free Neon Memory Match Game | Ragequit Arcade',
      metaDescription: 'Play FLASHOUT free online. A fast neon memory game: the symbols flash, then flip — find every matching pair from memory before the timer runs out. Build combos, beat your score. No download.',
      faq: [
        { q: 'How do you play FLASHOUT?', a: 'At the start of every level, the grid briefly flashes all of its glowing symbols, then flips them face down. Your job is to remember where each symbol was and tap the cards to find every matching pair before the countdown timer reaches zero. Clear the board to advance to the next, larger level.' },
        { q: 'What is the difference between Normal and Hard mode?', a: 'In Normal mode, a wrong match costs you nothing but time on the clock, so you can play more freely. In Hard mode, every incorrect flip immediately subtracts two seconds from your timer, punishing guesses and rewarding players who truly memorize the board. Each mode has its own leaderboard.' },
        { q: 'How does scoring work?', a: 'You earn points for every pair you match, and your score — not the level you reached — is the main way players are ranked. Matching pairs quickly and without mistakes builds a combo streak that multiplies the points you earn, so a clean, fast run scores far higher than a slow, error-filled one at the same level.' },
        { q: 'What is the combo streak?', a: 'Each correct match in a row without a mistake increases your combo multiplier. The longer your streak, the more every pair is worth. A single wrong flip breaks the streak and resets the multiplier, so keeping your concentration through a whole level is the key to a top score.' },
        { q: 'Does the game get harder?', a: 'Yes. Each level you clear adds more cards to the grid and gives you a tighter time budget, so you have to memorize more symbols in the same short flash. The difficulty ramps steadily, which is why reaching the higher levels — and doing it with a big combo — is such a satisfying challenge.' },
        { q: 'Can I retry a level?', a: 'When you run out of time, you can watch a short ad once to retry the level you failed instead of ending your run, giving you another shot at keeping your score alive.' },
        { q: 'Does it have a leaderboard?', a: 'Yes. Your best score is saved and shown on the global leaderboard, with separate rankings for Normal and Hard mode so you can compete on equal footing.' },
        { q: 'Is FLASHOUT free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes. FLASHOUT is built for touch and works on mobile, tablet and desktop. Just tap the cards — no keyboard needed.' },
      ],
    },
  },
]
