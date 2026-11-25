/* =====================================================================
   GAMES.JS — Ragequit Arcade
   Catalogue de jeux. Seuls les jeux vraiment en ligne sont listés.
   Ajouter un jeu = ajouter une entrée dans le tableau `games`.
   Champ `hot: true`  → flamme de secours (les jeux hot sont calculés automatiquement
                        par src/lib/hotGames.js ; ce champ ne sert que si le calcul échoue)
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
    description: 'Stack, dodge, spread and survive — our arcade games are all about quick reflexes, tight timing and that irresistible one-more-try feeling. This is the biggest and most varied category on Ragequit Arcade, packed with pick-up-and-play titles that are simple to learn and genuinely hard to master. Stack blocks with perfect timing in STAQ, race through a hypnotic neon tunnel in Neon Rush, engineer a virus to conquer a petri dish in the strategy-driven Virus Lab, chase a high score with candy and combos in Snake Candy Arena, split and merge four neon lines through an endless storm of walls in LINESTORM, or smash neon brick walls in BRICKFURY, a classic brick breaker reborn with x8 combos, FURY fireballs, nine power-ups and a giant OVERLORD boss. For something bigger, ARCANE BRAWL drops a lone paladin on a floating 3D ring to knock skeletons, elemental golems and a Dark Mage into the void. Every arcade game runs free in your browser on mobile, tablet and desktop, with no download and no signup — the perfect way to fill five minutes or lose an hour.',
    seo: {
      title: 'Free Arcade Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free arcade games online at Ragequit Arcade: BRICKFURY brick breaker, STAQ, Neon Rush, Virus Lab, Snake Candy Arena and more. No download.',
      faq: [
        { q: 'What arcade games are available?', a: 'The arcade category includes STAQ, a one-tap block-stacking game; Neon Rush, a 3D neon tunnel runner; Virus Lab, a unique strategy game where you program a virus to conquer territory; Snake Candy Arena, a neon twist on classic snake with candy and combos; and BRICKFURY, a free brick breaker with combos, power-ups and boss fights. We add new arcade games regularly.' },
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
    description: 'Match, rotate and think fast under pressure — our puzzle games test both your reflexes and your brain. This category is for players who love a satisfying chain reaction and the rush of solving something a split second before it is too late. The newest standout is VOLTLINK, a neon connect the dots puzzle game where you link glowing nodes of the same color, close loops to clear the whole grid and battle through 60 levels and five bosses. Next to it, OCTAFLUX is a hypnotic game where you spin a glowing octagon with your thumb to catch falling pieces, line up matching colours and trigger cascading chains for massive scores. Puzzle games here are quick to learn but reward planning, pattern recognition and nerve. Every one runs free in your browser on mobile, tablet and desktop, with no download and no signup — a perfect mental workout that never feels like homework.',
    seo: {
      title: 'Free Puzzle Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free puzzle games online at Ragequit Arcade, led by VOLTLINK and OCTAFLUX. Connect dots, match, rotate and chain combos. No download, no signup.',
      faq: [
        { q: 'What puzzle games are available?', a: 'Our headline puzzle games are VOLTLINK, a neon connect the dots game with 60 levels, five bosses and loops that clear the whole grid, and OCTAFLUX, a fast octagon-rotation match game where you spin a central octagon with your thumb to catch and align falling pieces. We add new puzzle games regularly.' },
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
    description: 'Memory, logic and focus — our brain games sharpen your mind while you play. This category is built for players who want a real mental challenge: remembering more, reacting faster and pushing their concentration further with every run. The headline game is FLASHOUT, a neon memory game where a grid of glowing symbols flashes for a split second, then flips face down, and you have to match every pair from memory before the timer runs out — with a Normal mode to warm up and a punishing Hard mode for the leaderboard. The newest arrival is QUADSHOCK, a neon connect four game where you line up four glowing discs against a CPU that levels up every round, with TRIO bonus rounds, MEGA grids and lightning bolts on every line you complete. Brain games here are fast, fair and genuinely satisfying to improve at. Every one runs free in your browser on mobile, tablet and desktop, with no download and no signup — perfect for a quick mental workout or a long high-score session.',
    seo: {
      title: 'Free Brain Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free brain games online at Ragequit Arcade, led by FLASHOUT. Train your memory, focus and reflexes with fast, addictive challenges. No download.',
      faq: [
        { q: 'What are brain games?', a: 'Brain games are challenges built around memory, logic, focus and quick thinking rather than pure reflexes alone. They give your mind a workout while staying fast and fun. Our flagship brain game is FLASHOUT, where symbols flash and flip, and you match every pair from memory before time runs out.' },
        { q: 'What brain games can I play here?', a: 'The category is led by FLASHOUT, a neon memory match game with a Normal and a Hard mode, a combo system and separate leaderboards for each mode. It is joined by QUADSHOCK, a neon connect four game played in rounds against a CPU that gets stronger every time you win. We add new brain and memory games regularly.' },
        { q: 'Do brain games really help?', a: 'While no game is a substitute for real training, memory and focus games are a fun way to challenge your concentration and short-term memory. The real appeal is the challenge: remembering more and beating your own best score each time.' },
        { q: 'Are they free and do they work on mobile?', a: 'Yes, every brain game is 100% free with no account required, and they are perfect on mobile, tablet and desktop — most just need a tap, so you can train your memory anywhere.' },
      ],
    },
  },
  {
    id: 'challenge',
    label: 'Challenge',
    image: '/categories/challenge.jpg',
    description: 'Push your limits. Challenge games are not about a quick five-minute score, they are about one hard, obsessive goal and the drive to beat it: go deeper, go faster, go further than you did last time, and further than anyone else. This is the category for players who love the feeling of slow mastery, where every attempt teaches you something and every record you break makes the next one feel possible. Our headline challenge is Crush Depth, a hypnotic descent into the real Mariana Trench, the deepest place on the entire planet. You pilot a submarine down through the ocean\u2019s five true zones, from the sunlit surface all the way into the crushing, pitch-black Hadopelagic nearly eleven thousand meters below, passing real landmarks scaled to their actual depth: the wreck of the Titanic, the abyssal plain, the Mid-Atlantic Ridge, and the height of Mount Everest turned completely upside down. Between dives you upgrade your submarine so every run goes faster, and you chase two very different records: the greatest depth reached, and your fastest time to the bottom. Every challenge game on Ragequit Arcade is completely free, runs instantly in your browser with no download and no signup, and saves your progress so that no run is ever wasted. Your records, your upgrades and your discoveries carry over every single time, so you are always building toward the next milestone. Alongside it, MAZEQUAKE is a 3D tilt maze race against the clock: you roll a robot ball through neon labyrinths that grow bigger with every exit, dodging pits and lasers while every second counts.',
    seo: {
      title: 'Free Challenge Games Online | Ragequit Arcade',
      metaDescription: 'Play the best free challenge games online at Ragequit Arcade, led by Crush Depth. Go deeper, faster and further, upgrade between runs and beat your own records. No download.',
      faq: [
        { q: 'What are challenge games?', a: 'Challenge games are built around a single demanding goal and the deep satisfaction of beating it over time: reaching a greater depth, a faster time, or a longer run than before. Unlike a quick arcade score, they reward persistence, upgrades and steady improvement across many attempts. Our flagship challenge game is Crush Depth, a dive to the very bottom of the Mariana Trench, where each run makes your submarine a little stronger and each record pushes you toward the next.' },
        { q: 'What challenge games can I play right now?', a: 'The category is led by Crush Depth, a deep-sea descent through the real zones of the ocean down to the deepest point on Earth, complete with separate depth and speedrun leaderboards and a workshop full of submarine upgrades. We design and build every game ourselves, and we add new challenge games regularly, so the category will keep growing. It is joined by MAZEQUAKE, a 3D neon tilt maze where you race the clock through ever bigger labyrinths, with Classic, Hard and Daily modes. For a quick test of pure speed, RAGE TAP is a click speed test where every tap is a punch, with 5 second to 1 minute timers and separate mobile and desktop leaderboards.' },
        { q: 'What makes a good challenge game?', a: 'The best challenge games give you a goal that feels just out of reach, then let you close that gap through skill and smart upgrades. There should always be a clear reason to try one more time, whether that is a record to beat, a new milestone to unlock, or a system to optimise. Crush Depth does this by saving all of your progress, so every dive builds on the last and the bottom of the ocean always feels a little closer.' },
        { q: 'Are the challenge games free?', a: 'Yes, every challenge game is 100% free to play, with no account required and no hidden costs. If you create a free account, you can save your records to the global leaderboards and compete with players around the world.' },
        { q: 'Do challenge games save my progress?', a: 'Yes. Progression is a core part of the genre. In Crush Depth, for example, your maximum depth, your best speedrun time, your coins, your submarine components and every landmark you have discovered are all saved automatically, so you never start from zero. You simply keep trying to beat your own best.' },
        { q: 'Do they work on mobile?', a: 'Yes, our challenge games work on mobile, tablet and desktop, with touch controls on phones and mouse or keyboard support on computers, so you can chase your records anywhere.' },
      ],
    },
  },
]

/* ---- SEO global du site ---- */
export const siteSeo = {
  title: 'Ragequit Arcade — Free Online Games',
  description: 'The most addictive free online games. Simple to learn, impossible to master. A new game every week.',
  about: 'Ragequit Arcade brings you the most addictive free online games, built for solo runs or quick matches with friends. Every game runs instantly in your browser — no downloads, no sign-up, no pop-ups, no nonsense. Our games work on desktop, tablet and mobile, so you can play at home or on the move. We are building a place where a great game is always one click away.',
  gameSelection: 'We add new games regularly. Our titles include QUADSHOCK, RAGE TAP, CROAKNIGHT, BRICKFURY, HYPERHOP, VOLTLINK, ARCANE BRAWL, MAZEQUAKE, LOOPSTRIKE, LINESTORM, City Runner, Fox Runner, VOIDFALL, Dead Zone, Crush Depth, Rooftop Rush, FLASHOUT, Bird Blitz, OCTAFLUX, Stellar Forge, Virus Lab, Neon Rush, Snake Candy Arena, STAQ and Rage Hockey. Every game is free to play, forever.',
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
    description: 'Rage Hockey is a free neon air hockey game built for short, furious matches. Two glowing paddles, one puck, two goals and physics quick enough that a single deflection can flip the score. Every hard strike throws sparks, shakes the screen and squashes your paddle on impact, while the puck leaves a bright trail as it ricochets off the walls. For the first ten seconds it feels simple. Then the AI starts reading your shots, and you understand where the name comes from.\n\nYour paddle follows your mouse or your finger exactly, and the speed of your swing becomes the power of the hit: a fast flick sends the puck screaming across the table, while a soft touch keeps it under control. You stay in your own half, so positioning matters as much as power. Hold a phone upright and the table turns vertical, with you at the bottom and your opponent at the top; on a wider screen the match plays from left to right. Press P or Escape whenever you need a pause.\n\nThere are two modes. Classic is first to seven goals, solo against the AI or in local 2 Players mode on one device, where the second player uses the other half of the touchscreen or the I, J, K and L keys. Survival is a solo endurance test: one goal conceded ends the run, the AI gets faster every few seconds, and each goal you score adds three seconds to your time and eases the pressure. Choose Chill, Normal or Rage difficulty, then pick an arena: the open Classic table, Bumper with a magenta bouncer that slides along the centre line at changing speeds, or Narrow, a squeezed field with smaller goals. In solo matches, power-ups pop up on the table and you grab them by sending the puck through them: a snowflake freezes the AI for a couple of seconds, a diamond enlarges your paddle for eight seconds, and an arrow fires the puck straight at the enemy goal.\n\nEvery match earns XP, and new levels unlock paddle colors, from plain neons to two-tone designs reserved for veterans. Three daily challenges, such as winning on Rage, winning in the Bumper arena or winning without conceding, pay bonus XP. After a match you can pick an optional boost and watch a short ad to start the next match with it for 30 seconds: Power Hit for harder, faster shots against a slower opponent, Tiny Goal to shrink a net by 40 percent in your favour, or Big Paddle at one and a half times the size. The best players defend first, keeping the paddle between the puck and their goal, and score with bank shots off the side walls instead of predictable straight smashes.\n\nRage Hockey runs free in your browser on phones, tablets and computers, with no download. Your solo Classic results and Survival times go to the Ragequit Arcade leaderboard, so every clean sheet counts. Grab the puck, pick your arena and find out how long you can keep your cool.',
    thumbnail: '/thumbnails/rage-hockey.jpg',
    category: 'sports',
    tags: ['hockey', 'multiplayer', '2-player', 'arcade', 'rage', 'sports'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: false,
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
        description: 'STAQ is a one-tap tower builder played in a clean isometric 3D view. A slab slides in beside your tower, you tap to drop it, and whatever hangs over the edge of the block below is sliced off and tumbles away. What is left becomes the platform for the next block. That is the whole rule set, and every mistake stays with you for the rest of the run.\n\nThe tower starts on a wide, dark base. New blocks arrive from alternating directions, one sliding along one side of the tower and the next along the other, so you can never settle into a single angle. Drop each one with a tap anywhere on the screen, a mouse click or the spacebar. Every block also slides a little faster than the one before it, so the calm opening quickly turns into a test of nerves. As the tower climbs, the camera rises with it, the blocks drift through a smooth gradient of cyan, violet and magenta, and soft synthesized tones climb in pitch with every block you add.\n\nScoring is simple: one point for every block you land, and the big number at the top of the screen is your height. The real skill is the Perfect drop. Line a block up almost exactly with the one below and nothing is cut: the block snaps into place at the same size as its base, the screen flashes, the word Perfect appears and a bright two-note chime plays. Miss by a little and you lose a thin sliver. Miss by a lot and most of your footprint is gone. Miss completely and the run is over. The game over screen shows your best height and flags every new record.\n\nPlayers who build truly tall towers know one thing: a Perfect does not make a narrow tower wider again, it only stops it from shrinking. So protect your width early, while the blocks are still slow and Perfects are easiest. Watch the leading edge of the moving block rather than its centre, and tap as that edge meets the edge below. Because the direction flips on every drop, reset your eye each time instead of tapping on a fixed beat, and adjust as the speed creeps up. If a good run ends after at least three blocks, you can watch a short ad once per run to continue: your score is kept, a fresh full-size base appears, and every block you add from there counts on top.\n\nSTAQ is free to play on Ragequit Arcade, right in your browser on phones, tablets and desktop computers, with no download. It is designed for portrait play with one thumb, ideal for a quick session on the bus. Every finished run is sent to the global leaderboard, so sign in with a free Ragequit Arcade profile to put your name next to your height. Then tap Start and find out how high you can stack before you rage quit.',
    thumbnail: '/thumbnails/staq.jpg',
    category: 'arcade',
    tags: ['stacking', 'arcade', 'reflex', 'one-tap', 'tower', 'casual'],
    size: 'medium',
    shimmer: false,
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
        { q: 'Do the blocks get faster as the tower grows?', a: 'Yes. Every new block slides a little faster than the one before, and blocks arrive from alternating sides of the tower, so the direction changes on every drop. The opening blocks are slow and forgiving, which makes them the best moment to land Perfects and keep your tower as wide as possible before the pace picks up.' },
      ],
    },
  },

  /* ================================================================
     NEON RUSH — runner 3D tunnel néon, catégorie arcade
     ================================================================ */
  {
    id: 'neon-rush',
    title: 'Neon Rush',
    description: 'Neon Rush is a free 3D endless runner that drops you into a glowing retro-futuristic tunnel and asks one simple question: how far can you go before you crash? You pilot a small neon ship across three lanes while walls of light rush straight at you, a synth drone swells as you accelerate and the speedometer climbs in km/h. You learn it in two seconds, but mastering it takes much longer, because the tunnel never stops getting faster.\n\nEvery run is about reading the track. Obstacles block one or two of the three lanes at a time, so you are always hunting for the open gap. On a phone you tap the left or right half of the screen to slide one lane over; on a computer you use the arrow keys or A and D, with P or Escape to pause. Each input is a single, crisp lane change, which keeps the controls precise even at full speed. Your cruising speed creeps up every few seconds, so the reaction window you enjoyed at the start slowly shrinks.\n\nThe tunnel is not one long blur. After a calm opening stretch, the first wave hits, announced by a horn and a banner, with a timer bar showing how long it will last. Waves come in three flavours: Short & brutal, a quick and dense burst; Hold on, the standard wave; and Endurance, longer but less packed. During a wave you fly faster, the walls come closer together and no orbs appear, yet the game always keeps a reachable safe path open. When the wave ends, the pressure drops and the energy orbs return.\n\nScoring rewards style as much as survival. Distance gives you a steady stream of points, but the big gains come from the combo multiplier, which climbs all the way to x12. Every orb you collect and every near-miss, when you slip past a wall that blocks the lane right next to yours, raises it by one step and multiplies that bonus. The combo drains if you go a few seconds without feeding it, and letting an orb fly past breaks it completely. The best players treat calm stretches as combo time: they hug the walls, sweep up every orb, reach the next wave with a fat multiplier, then switch to pure safety until the banner fades.\n\nCrash, and you get five seconds to decide whether to watch a short ad and revive, once per run. You keep your score, the obstacles right in front of you are cleared and you get four seconds of invincibility to find your rhythm again. The game over screen shows your score, your best, the waves you survived and your top speed, and even tells you how many points you were from your record. Neon Rush is free in your browser on mobile, tablet and desktop, with no download, and your best runs go on the global leaderboard. Line up your first lane change and see how deep the tunnel goes.',
    thumbnail: '/thumbnails/neon-rush.jpg',
    category: 'arcade',
    tags: ['runner', 'arcade', '3d', 'neon', 'reflex', 'endless', 'dodge', 'synthwave'],
    size: 'medium',
    shimmer: false,
    isNew: false,
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
        { q: 'What breaks my combo in Neon Rush?', a: 'Every orb you collect and every near-miss adds one step to your multiplier, up to x12. If you go about four and a half seconds without either, the combo starts dropping one step at a time, and if an orb slips past your ship uncollected, it resets straight to x1. Orbs only appear between waves, so the calm stretches are when you build it.' },
      ],
    },
  },

  /* ================================================================
     VIRUS LAB — stratégie : programme un génome, conquiers la boîte
     ================================================================ */
  {
    id: 'virus-lab',
    title: 'Virus Lab',
    description: 'Virus Lab is a free strategy game where you never steer anything: you write the DNA. Your virus is a genome, a short loop of actions it repeats forever, and once you deploy it into a round petri dish it spreads on its own against an enemy strain. Each battle lasts 45 seconds, and the side holding more territory when the timer reaches zero wins. Wipe out the other strain completely and the fight ends early.\n\nYou build a genome by tapping actions into a sequence. The four basics, Advance, Back, Turn Left and Turn Right, take one slot each. The Lab unlocks thirteen more across five research tiers: Mobility with Leap, Sense and Retreat, Assault with Surge, Dash and Sprint, Corrosion with Acid and Corrode, Replication with Split and Twin, and Apex with Mutate, Shield and Burst. Stronger actions take more room, up to four slots for Burst, and your genome budget starts at four slots before growing in steps of four up to twenty-four. Research costs DNA and takes real time to finish, and an optional ad can complete it instantly.\n\nThe dish has its own logic. Freshly claimed cells stay fragile for a moment, so a strain that spreads too fast leaves a long front the enemy can bite back, while neighbouring territories keep infecting each other along the border. After every battle a report shows both genomes, a territory-over-time graph and a diagnosis that explains the result, such as a loop with more turns than moves or an enemy that splits faster than you can claim. The campaign runs through 30 levels of named strains, from a primitive circling sample to a final strain with no weakness. A first clear pays the full DNA reward, while a defeat still pays a little, so every attempt moves your lab forward.\n\nYour strain also needs a face. You choose its name, shell and core colors from twelve palettes, spike shape and count, shell texture and core pattern. Then comes the Arena: sign in to publish your strain, or fight random viruses from a roster of lab strains and genomes published by real players, replayed on your device so nobody has to be online at the same time. Your Arena score starts at 1000, gains 25 points per win and loses 10 per defeat. Top players keep their loops short, balance moves and turns, and read every report before editing a single action.\n\nVirus Lab runs free in your browser, built for portrait play on a phone and just as comfortable on a tablet or computer. Your Arena score goes to the Ragequit Arcade leaderboard. Open the Lab, write your first genome and see how far one loop can spread.',
    thumbnail: '/thumbnails/virus-lab.jpg',
    category: 'arcade',
    tags: ['strategy', 'arcade', 'programming', 'simulation', 'pvp', 'arena', 'territory', 'unique'],
    size: 'large',
    shimmer: true,
    isNew: false,
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
        description: 'Stellar Forge is a free space idle clicker that turns one vein of ore into a civilization measured on the real Kardashev scale. It opens on an ordinary Earth with a single Hand Pick, and from there you grow through fourteen mining operations, from the Robotic Drill and the Mining Rig to the Orbital Refinery, the Asteroid Harvester, the Star Lifter and finally the Singularity Extractor. Every number on screen keeps climbing, and watching it climb faster is the whole pleasure.\n\nEach mining building works in production cycles. Tap a building to launch its cycle, watch the bar fill, and the minerals drop into your stock. The more copies of a building you own, the shorter its cycle becomes, so an operation that crawls at first ends up firing several times per second. Tapping drives the opening minutes, but soon you hire managers, one specialist for every building after the Hand Pick, from the Drone Operator to the Singularity Keeper. A manager runs its building without you, and you level it up with minerals for extra production. MAX buttons spend everything you can afford in a single tap.\n\nMining is only half of your empire. In the Energy tab you build sixteen kinds of power plants, from Solar Panels, Tidal Turbines and Geothermal Plants to Fusion Reactors, Dyson Spheres, Black Hole Forges, Matrioshka Brains and the Galactic Core Tap. Power does two jobs. It is your civilization rank: your installed wattage sets your place on the scale, with Type I at ten quadrillion watts, Type II at the output of a star and Type III at the power of a galaxy, plus speculative Types IV and V so the ladder never ends. It is also a budget, because every upgrade copy you buy reserves part of your free power and costs minerals while boosting its building.\n\nThe Rewards tab adds daily goals: three objectives drawn every day that pay out minerals and refresh at midnight, plus honorary achievements topped by the civilization trophies. When growth slows, try a Stellar Departure. You leave the system and reset buildings, plants, upgrades, managers and minerals, but you recruit Veterans based on your all-time minerals, a total that never resets, and each Veteran adds two percent production for life. An optional ad doubles production for six hours, and when you come back after a break your colonies have mined a share of your output in your absence. Strong players never hoard, keep power and upgrades growing together and depart when the Veteran count makes it worth it.\n\nStellar Forge is free, needs no download and is designed for one thumb in portrait mode, while playing just as well on a tablet or computer. Your all-time minerals and civilization level feed the Ragequit Arcade leaderboard. Pick up the Hand Pick and see how far up the scale you can push.',
    thumbnail: '/thumbnails/stellar-forge.jpg',
    category: 'idle',
    tags: ['idle', 'clicker', 'space', 'incremental', 'mining', 'sci-fi', 'kardashev', 'automation'],
    size: 'large',
    shimmer: true,
    isNew: false,
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
        { q: 'What is a Stellar Departure and what are Veterans?', a: 'A Stellar Departure is the prestige reset of Stellar Forge. You leave your system and lose your buildings, power plants, upgrades, managers and current minerals, but you recruit Veterans based on your all-time minerals mined, a total that never resets. You keep every Veteran forever, and each one adds two percent to your production.' },
      ],
    },
  },
   /* ================================================================
     OCTAFLUX — puzzle : fais tourner un octogone pour aligner les pièces
     ================================================================ */
  {
    id: 'octaflux',
    title: 'OCTAFLUX',
    description: 'OCTAFLUX is a free arcade puzzle game built around a single glowing shape: an octagon floating in the middle of the screen. Colored cells fly in from eight directions toward its core, and you spin the octagon so that each one lands on the face you want. Connect three or more of the same color and they burst in a flash of neon. It sounds relaxing, but the cells never stop coming, and the moment one face piles up past the line, your run is over.\n\nThe controls are made for one thumb. Put your finger anywhere and drag around the center: the octagon turns exactly with your gesture, like a dial, then snaps onto the nearest face when you let go. A quick tap on the left or right half of the screen turns it one notch, perfect for small corrections. On a computer, the left and right arrow keys or A and D do the same job. Incoming cells always travel along the same eight fixed lanes while the octagon rotates beneath them, so the real skill is choosing which face should be waiting under each lane when a cell arrives.\n\nFour colors are in play: pink, teal, yellow and violet. Matches count as connected groups, so cells link up along a single face and also sideways with cells at the same height on the neighboring faces, which lets you build groups that wrap around the octagon. When a group clears, the cells left on that face drop toward the core, and if that creates a new group, it clears too. Every step of a cascade raises your combo, and a yellow ring around the core shows how long you have to keep the chain alive. Bigger groups pay far more: four cells multiply the base value by 1.5, five by 2, six by 3, seven by 4 and eight or more by 5, and clearing two groups at once adds a multi-group bonus on top.\n\nThe pressure builds slowly. As the minutes pass, cells fall faster and arrive more often, and a dashed outline marks the limit no face may cross. When a stack gets close, the outline pulses red and the face starts blinking, a clear warning to send the next cells somewhere else. Strong players keep their stacks low and evenly spread, park each new cell next to a matching color and only gamble on big wraparound groups when every face has room to spare.\n\nIf you do cross the line, you can watch an optional ad once per run to continue: every face is cut back to half height and the cells in flight vanish, giving you real breathing room while you keep your score. The game over screen shows your score, your best and the next milestone to chase. OCTAFLUX is free in your browser on mobile, tablet and desktop, with no download, and your best score goes on the global leaderboard. Give the octagon a spin and see how long you can keep the flux under control.',
    thumbnail: '/thumbnails/octaflux.jpg',
    category: 'puzzle',
    tags: ['puzzle', 'match', 'rotation', 'octagon', 'reflex', 'casual', 'chain', 'arcade'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: false,
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
        { q: 'When does a game of OCTAFLUX end?', a: 'Each face of the octagon can hold a stack of up to 15 cells, marked by the dashed outline around the core. If any single face goes past that limit, the run ends. Faces close to the limit blink red and the outline starts pulsing, so you always get a warning to rotate the next cells onto a face with more room.' },
        { q: 'Can I continue after a game over in OCTAFLUX?', a: 'Yes, once per run. On the game over screen you can choose to watch a short optional ad. Every face is then trimmed back to half the limit, the cells already flying toward the octagon are cleared, and the run resumes with your score intact. You can also simply tap Play again to start a fresh game.' },
      ],
    },
  },
  /* ================================================================
     BIRD BLITZ — tower defense : défends les monuments du monde
     ================================================================ */
  {
    id: 'bird-blitz',
    title: 'Bird Blitz',
    description: 'Bird Blitz is a free monument defense shooter with a ridiculous premise and surprisingly deep gameplay. Flocks of birds are circling the world’s most famous landmarks, and every one of them wants to leave a dropping on the stone. Your job is to shoot them out of the sky before the cleanliness bar of your monument falls to zero, because when it does, the landmark is defiled and the run is over.\n\nA run plays in waves. Tap or click a bird to shoot it; on desktop a crosshair follows your mouse for precise aim. Pigeons go down in one hit, seagulls fly faster, eagles are the quickest and need two hits, albatrosses are huge and take three, and crows ignore the monument to steal your gold. Every third wave is a themed one, such as a swarm, armored, thieves or frenzy wave, and every tenth wave brings the Pigeon King, a giant boss with its own health bar that rains droppings on the landmark.\n\nEvery bird you hit earns gold and points, and hitting without missing builds a combo: x1.5 at three hits, x2 at five, x3 at ten and x4 at fifteen. Gold buys items from the bar on the sides of the screen: a Shotgun that fires a center shot plus four blasts around it, a Cleaner that scrubs droppings off the monument, a Shield that absorbs sixteen droppings, an Air Strike that wipes out normal birds and halves a boss, a Net and a Decoy that you place with a tap, and Slow-Mo. Each item has a cooldown, so timing matters. Killed birds can also drop power-ups: Time Freeze, Bullet Rain and Gold Rush, which doubles your gold for a few seconds.\n\nTen monuments are waiting, from the Eiffel Tower, Big Ben and the Statue of Liberty, open from the start, to the Pyramids of Giza, the Taj Mahal, the Sydney Opera House, the Colosseum, Christ the Redeemer, Angkor Wat and a Japanese Pagoda, unlocked with stars. Each has a bonus and a drawback: the Pyramids give +25% gold but every dropping does more damage, the Pagoda halves the dirt but the birds fly 40% faster, and Angkor Wat pays well but sends 60% more birds. Stars come from every run and also buy seven permanent upgrades, from Damage and Shield HP to Lucky Drop and Combo Master. Three daily challenges add extra stars. Good players prioritize eagles and crows, keep a Shield or the Air Strike ready for the boss, and protect their combo instead of tapping wildly.\n\nWhen the monument falls, you can watch an optional ad once per run to clean it completely, clear the sky and carry on with the next wave, and another optional ad doubles your gold for the rest of the run. Bird Blitz is free in your browser on mobile, tablet and desktop, with no download, and each monument has its own leaderboard. Pick your landmark and start shooting.',
    thumbnail: '/thumbnails/bird-blitz.jpg',
    category: 'shooting',
    tags: ['tower-defense', 'shooter', 'arcade', 'birds', 'monuments', 'action', 'combo', 'waves', 'upgrades'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: false,
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
    description: 'Snake Candy Arena takes the snake formula everyone knows and rebuilds it as a neon score chase built on speed and combos. You steer a glowing green-to-blue snake with a big cartoon head across a tall arena of 15 by 27 cells, swallowing pink candy to grow one segment at a time. The goal is to eat fast enough to keep a multiplier burning, snatch the bonus animals before they vanish and, if you are truly brave, pack the entire board with your own body.\n\nEvery run starts with a short three-segment snake in the middle of the arena, heading right. The snake never stops moving, so the only thing you choose is its direction: swipe on a phone or tablet, or use the arrow keys or W A S D on a keyboard. There are no walls to fear. Leave the arena on one side and you reappear on the opposite edge, which opens up shortcuts and last-second escapes. The only thing that can end your run is your own body, and the snake speeds up as it grows, so the longer and more valuable your run becomes, the less time you have to think.\n\nScoring rewards pace. Each candy raises your combo, up to x9, and every candy is worth more while the combo holds. Leave more than about three seconds between two candies and the multiplier falls back to x1. Every fourth candy calls in a bonus animal, a fox, frog, panda, cat or bee, which glows on the board for seven seconds with a countdown on screen and in the HUD. Catching one pays 150 points multiplied by your combo and then doubled, adds two steps to the combo and grows you by one more segment. The HUD tracks your score, length, candies eaten and animals caught. Fill all 405 cells and take the very last candy to trigger the Screen Filled finale, worth an extra 1,000 points.\n\nThe best players treat the combo window like a metronome. Plan your route to the next candy before you reach the current one, and use the wrap-around edges to cut the distance in half. An animal is only worth chasing if you can get there and back out again: a huge multiplier means nothing if the detour coils you into a dead end. Once your snake gets long, sweep the arena in wide, regular lanes instead of sharp zigzags, so your tail always leaves you an exit. When a crash does come, you can watch a short ad once per run to continue: your score, candies and animals are kept, and you restart with a fresh short snake in the centre and the combo back at x1.\n\nSnake Candy Arena is free on Ragequit Arcade and runs straight in your browser on phones, tablets and computers, with no download. Your score goes to the global leaderboard when your run ends. Sign in with a free Ragequit Arcade profile to keep your name on the board, then see how long your snake can grow before the arena runs out of room.',
    thumbnail: '/thumbnails/snake.jpg',
    category: 'arcade',
    tags: ['snake', 'arcade', 'candy', 'combo', 'retro', 'reflex', 'casual', 'high-score'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: false,
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
    description: 'FLASHOUT is a neon memory game that turns the old pairs-matching idea into a race against a clock that never stops draining. Every level opens with the whole board face up: glowing cards showing triangles, stars, hearts, hexagons, lightning bolts, diamonds and more. A five-second countdown labelled MEMORIZE gives you a brief window to burn the layout into your head, then the cards flip face down and the timer starts. From that moment on, your memory is the only thing you have.\n\nTap or click a card to flip it, then pick a second one. If the symbols match, the pair locks in with a burst of colored particles, a rising chime and a short vibration on phones that support it, and you earn points plus extra seconds on the clock. If they do not match, both cards shake and flip back. As time runs low, the timer bar changes color, the edges of the screen light up in warning and the ticking speeds up. Reach zero and the run is over. Clear every pair and you move on to the next level. The first board has three pairs, each new level adds one more, up to twelve, and a symbol never appears twice on the same board. The game pauses itself if you switch tabs.\n\nEvery match is worth 100 points, boosted by your current streak, and each match in a streak also adds a little more time, from one second up to three. One wrong pair resets the streak. When you clear a level, every second left on the clock is converted into points, and a level finished without a single mistake earns a 500-point Perfect bonus. In Normal mode a miss only costs you your streak. Hard mode takes two seconds off the timer for every wrong pair and gives each level one second less to begin with. Each mode keeps its own personal best and its own leaderboard.\n\nDuring the countdown, group the board into zones instead of single cards: the top row, the left corner, the two stars near the middle. Start with the pairs you are certain about, because safe matches keep your streak climbing and buy time for the doubtful ones. Speed counts at the end of a level, since leftover seconds become points, but a guess that breaks a long streak usually costs more than it saves. When time does run out, you can watch a short ad once per run to replay the level you failed on a freshly shuffled board, keeping your points. The game over screen also shows how far you are from your record.\n\nFLASHOUT is free to play on Ragequit Arcade, in your browser on phones, tablets and computers, with no download. Your final score goes to the global leaderboard of the mode you played, and a share button lets you send it to your friends straight from the game over screen. Clear the board, protect the streak, and see how many levels you can keep in your head before you flash out.',
    thumbnail: '/thumbnails/flashout.jpg',
    category: 'brain',
    tags: ['memory', 'puzzle', 'neon', 'pairs', 'brain', 'combo', 'reflex', 'concentration'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: false,
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
     /* ================================================================
     ROOFTOP RUSH — arcade : étire la planche, saute de toit en toit
     ================================================================ */
  {
    id: 'rooftop-rush',
    title: 'Rooftop Rush',
    description: 'Rooftop Rush is a one-tap timing game set high above the streets of New York City. Your hero has to cross an endless line of skyscrapers, and the only way over each gap is a plank you grow yourself. Hold to stretch it, let go to drop it, and watch your hero walk across. If the plank is too short, they fall into the street. If it is too long, they walk off the far edge. If it is so long that it lands on a rooftop further away, that building explodes, because skipping buildings is not allowed. You learn it in seconds, and mastering it takes a lot longer.\n\nA run moves in a steady rhythm of hold, release, walk, and every drop feels a little tense. Early gaps are friendly, but the higher your score climbs, the wider the gaps get and the narrower the rooftops become, until you are aiming at thin towers across huge drops. Rain and snow sweep over the skyline from time to time, and pigeons scatter off the roofs as you land. In Normal mode you have five hearts: each fall costs one, and you start again from the edge of the roof you were on.\n\nThe scoring rewards precision. A clean landing is worth one point, but landing the tip of the plank on the small red zone in the middle of a rooftop is a Perfect, worth double. Chain Perfects and your multiplier climbs through five tiers: NICE x2, HOT x3, ON FIRE x4, INSANE x5 and finally GODLIKE x6 after thirteen Perfects in a row. Each tier hits harder, with stronger shake, brighter flashes and its own sound. One ordinary landing or one fall ends the streak with a loud COMBO LOST. Hard mode moves the city to night and gives you a single heart. The difficulty rises faster, every point counts double, and there are no continues, with a separate leaderboard for the brave.\n\nThe best players treat the red zone as the real target and a normal landing as a near miss. Watch the width of the next gap, not your hero, and release with the same calm timing every time. When a big combo is building, slow down rather than speed up. At the end of each run your score goes into your wallet, and you spend those points on eleven characters, from the free Superhero to Alley Cat, Night Ninja, Undead Joe, Astro Diver and the Rooftop Ghost. Three daily missions, such as landing a number of perfect bridges or crossing a set number of buildings, give extra points and reset every day at midnight. In Normal mode, once per session, you can watch an optional ad to refill your hearts and earn double points on your next five bridges.\n\nRooftop Rush is free on Ragequit Arcade and runs in your browser with no download. Hold anywhere on a phone or tablet, or use the mouse or spacebar on a computer, and post your best Normal and Hard scores on the global leaderboards. How far across the city can you get?',
    thumbnail: '/thumbnails/rooftop-rush.jpg',
    category: 'arcade',
    tags: ['arcade', 'reflex', 'one-tap', 'timing', 'combo', 'casual', 'rooftop', 'high-score'],
    size: 'large',
    shimmer: true,
    isNew: false,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['normal', 'hard'],
    defaultMode: 'normal',
    controls: 'Hold to stretch the plank, release to drop it. Time the length so it bridges the gap to the next rooftop, and aim for the red zone in the center for a perfect drop and a bigger combo. On mobile, tap and hold anywhere on the screen; on desktop, hold the mouse button or the spacebar. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Rooftop Rush — Free One-Tap Rooftop Arcade Game | Ragequit Arcade',
      metaDescription: 'Play Rooftop Rush free online. Stretch a plank across skyscraper rooftops with perfect timing, chain combos up to a x6 GODLIKE streak and beat your high score. No download.',
      faq: [
        { q: 'How do you play Rooftop Rush?', a: 'You control a hero crossing the rooftops of the city. To bridge the gap to the next building, you hold to stretch out a plank, then release to drop it. If the plank is exactly the right length, your hero runs across safely. If it is too short they fall into the gap, and if it is too long they walk off the end. It is all about timing your release.' },
        { q: 'How does the combo system work?', a: 'Each rooftop has a small red zone in its center. If you drop your plank so its tip lands on that red zone, you score a Perfect and your combo multiplier climbs. Chaining perfects pushes the multiplier up through escalating tiers, from x2 all the way to a x6 GODLIKE streak, with the screen shaking harder and flashing brighter as you climb. A single mistimed drop breaks the whole chain and resets your multiplier.' },
        { q: 'What is the difference between Normal and Hard mode?', a: 'Normal mode gives you a bit more margin on your timing, so it is the place to learn the rhythm. Hard mode tightens everything up and demands far more precise plank lengths, and it has its own separate leaderboard, so the best Hard-mode scores really mean something.' },
        { q: 'How does scoring work?', a: 'You earn points for every rooftop you clear, multiplied by your current combo. Because perfect drops raise your multiplier so steeply, a long clean streak is worth vastly more than the same number of rooftops crossed sloppily. Your best score is saved to the global leaderboard, with separate rankings for Normal and Hard mode.' },
        { q: 'Why is it so addictive (and rage-inducing)?', a: 'Rooftop Rush is built around the tension of a growing combo. The higher your streak climbs, the more you have to lose, so a single bad tap that shatters a GODLIKE run is genuinely painful — and immediately makes you want one more try. That "so close" rage loop is exactly what the game is designed around.' },
        { q: 'What are some tips for a high score?', a: 'Find a steady rhythm rather than rushing, since panic is what causes mistimed drops. Focus on landing the plank tip in the red zone every single time to keep your multiplier climbing, and do not get greedy when your combo is already high — a safe drop that keeps the streak alive beats a risky one that ends it. Consistency beats speed.' },
        { q: 'Is Rooftop Rush free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Does it work on mobile?', a: 'Yes. Rooftop Rush is built for one-tap play on portrait mobile — just tap and hold — and works great on tablet and desktop with the mouse or spacebar too.' },
      ],
    },
  },
     /* ================================================================
     CRUSH DEPTH — challenge : plonge au fond de la fosse des Mariannes
     ================================================================ */
 {
    id: 'crush-depth',
    title: 'Crush Depth',
    description: 'Crush Depth turns one simple gesture into a journey of almost eleven kilometers. Your mission is to take a small submarine from the sunny surface of the ocean all the way down to the bottom of the Mariana Trench, 10,994 meters below, the deepest point on Earth. The game does not hide how far that is: the distance you scroll is measured in real centimeters, and the welcome screen warns you that nobody makes it on the first try. It is part challenge, part endurance test and part trip through the real ocean.\n\nYou dive by scrolling down with a mouse wheel or trackpad, or by swiping up on a phone or tablet. Each notch of a mouse wheel counts as five centimeters of travel, and an optional calibration lets you hold a bank card against your screen so the measured distance matches your display exactly. As you sink, the water changes around you. You cross the five real ocean zones, from the bright Epipelagic with its light rays and schools of fish, through squid, anglerfish and glowing jellyfish, down to the near-total darkness of the Hadopelagic. Your depth, zone and speed multiplier stay on screen, and a low ambient drone gets deeper as you go down.\n\nEvery meter earns coins, and reaching milestones such as Diver, Dark zone, Titanic, The abyss and Everest inverted pays out bigger bonuses. You spend coins in the Shipyard on five components: a reinforced propeller, a steam turbine, lightened ballast, a streamlined hull and a pressure reactor. Each level multiplies how much depth every scroll is worth. Installations take time and run one at a time, and you can watch a short optional ad to finish one instantly. Along the way you discover real landmarks at their true depth: the free-diving and scuba records, the crush depth of a military submarine, the wreck of the Titanic, the abyssal plain, the Mid-Atlantic Ridge and the height of Everest turned upside down. The Stats panel collects every landmark you have found, and the progress map shows where you are on the way to the bottom.\n\nThe smartest divers keep reinvesting. Cheap propeller levels pay off early, while the expensive ballast, hull and reactor upgrades are what make the deep zones go by quickly. Your dive is saved between sessions, so you can come back and keep going. Once you reach the bottom, a short scene plays on the seabed, and the deepest place on the planet hides one last surprise for those who look closely. After that you can share a record card and replay the dive as a speedrun: your depth resets, your components and coins stay, and a timer runs until you touch the bottom again.\n\nCrush Depth is free on Ragequit Arcade, with no download, on mobile, tablet and desktop. Climb the Depth leaderboard, then come back to set the fastest time on the Speedrun leaderboard.',
    thumbnail: '/thumbnails/crush-depth.jpg',
    category: 'challenge',
    tags: ['challenge', 'deep-sea', 'descent', 'ocean', 'mariana', 'upgrade', 'speedrun', 'atmospheric', 'unique'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['depth', 'speedrun'],
    defaultMode: 'depth',
    controls: 'Scroll down (or swipe up on mobile) to drive your submarine deeper into the ocean. Buy and install components in the workshop to descend faster on future dives. Tap the buttons on screen for stats, the depth map and sound. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Crush Depth — Free Deep-Sea Descent Challenge Game | Ragequit Arcade',
      metaDescription: 'Play Crush Depth free online. Dive to the bottom of the real Mariana Trench, past the Titanic and the abyssal plain, upgrade your submarine and beat depth and speedrun records. No download.',
      faq: [
        { q: 'How do you play Crush Depth?', a: 'You pilot a submarine descending into the ocean. Scroll down on desktop, or swipe up on mobile, to drive deeper. Your goal is to reach the bottom of the Mariana Trench, nearly 11,000 meters down, passing through the ocean\u2019s five real zones as the water gets darker and the pressure builds.' },
        { q: 'What are the real landmarks in the game?', a: 'As you descend you pass real reference points placed at their true depth: freediving and scuba records near the surface, submarine crush depth, the wreck of the Titanic at around 3,800 meters, the abyssal plain, the Mid-Atlantic Ridge, and the height of Mount Everest flipped upside down, before reaching the deepest point on Earth. It turns the dive into a genuine sense of scale.' },
        { q: 'What are the two leaderboards?', a: 'Crush Depth has two separate challenges. The Depth leaderboard ranks the greatest depth you have reached. The Speedrun leaderboard ranks your fastest time to reach the very bottom. You can compete on both, and each has its own global ranking.' },
        { q: 'What do the submarine components do?', a: 'As you descend you earn coins, which you spend in the workshop on five components: propeller, turbine, ballast, hull and reactor. Each level you install makes your submarine descend faster on future dives, so the deeper you go, the stronger you become. You can watch a short ad to install a component instantly.' },
        { q: 'Does the game save my progress?', a: 'Yes. Your maximum depth, your best speedrun time, your coins, your components and every landmark you have discovered are all saved automatically. When you start a new dive, you keep everything: you never start from zero, you just try to beat your own records.' },
        { q: 'What happens at the bottom?', a: 'When you finally reach the deepest point on Earth and your submarine settles on the seabed, a short atmospheric sequence plays out. Let us just say the deepest place on the planet might not be as empty as you expected.' },
        { q: 'Is Crush Depth free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes. Crush Depth works on mobile, tablet and desktop, with swipe controls on touch screens.' },
      ],
    },
  },
     /* ================================================================
     DEAD ZONE — shooting : survie zombie en vue de dessus
     ================================================================ */
  {
    id: 'dead-zone',
    title: 'Dead Zone',
    description: 'Dead Zone is a top-down zombie survival shooter set in a city that never ends. You are the last survivor walking through dark streets, wide avenues and overgrown parks that are generated as you move, and the dead come at you from every direction. There is no exit and no safe house. Your only goal is to stay alive as long as you can, clear wave after wave, and push your score higher before the horde finally drags you down.\n\nEvery run starts the same way: 130 health points, a pistol with unlimited ammo, and a first wave of fifteen zombies. Each wave ends when you reach its kill quota, and the next one asks for more kills and spawns a nastier mix. Runners sprint at you, brutes and titans soak up bullets, exploders blow up when they die, splitters burst into two fast runners, teleporters blink in right next to you, and spitters keep their distance and spit projectiles at you. From wave 3 every type can show up, lightning storms start to crack across the sky, and every fifth wave a boss with its own health bar joins the fight.\n\nKilled enemies drop what keeps you going: health packs, ammo and three heavy weapons. The shotgun fires a tight five-pellet fan, the minigun shreds crowds in full auto, and the bazooka clears a whole pack with a huge blast that also hurts you if you stand too close. A ring around each weapon slot shows how much ammo is left, and when a heavy gun runs dry you switch back to the pistol. Kills chained within a few seconds build a combo that multiplies your points, and barrels, crates and other street objects can be shot to pieces. Your score grows the longer you survive and with every zombie you put down.\n\nDead Zone also keeps you coming back between runs. Every kill earns XP, and each new level gives a skill point for a three-branch skill tree: damage (Sharper Rounds, Critical Hit, Piercing Shots), speed (Swift Feet, Quick Reload, Gunslinger) and health (Tough Skin, Regeneration, Thick Blood). Achievements like Untouchable, Combo Master and Boss Slayer unlock character skins, trail effects and map themes such as Fog, Neon City and Blood Moon, and daily quests pay bonus XP. Good players never stop moving. They circle the horde instead of backing into a corner, save the bazooka for packs and bosses, and deal with spitters early. Once per run, an optional ad brings you back to full health right where you fell, with the zombies around you cleared away.\n\nDead Zone is free on Ragequit Arcade and runs in your browser with no download. On a computer you move with the keyboard, aim with the mouse, fire with a click and switch weapons with keys 1 to 4. On a phone you use a floating joystick and a fire button with aim assist. Post your best run on the global leaderboard and see how many waves you can survive.',
    thumbnail: '/thumbnails/dead-zone.jpg',
    category: 'shooting',
    tags: ['zombie', 'survival', 'shooter', 'top-down', 'action', 'waves', 'combo', 'twin-stick', 'intense'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: false,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Move your character and aim in any direction to shoot the zombies. On desktop, use the keyboard to move and the mouse to aim and fire. On mobile, use the on-screen controls to move and shoot. Pick up the weapons dropped by fallen enemies for more firepower, and keep moving to survive. Works on mobile, tablet and desktop.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Dead Zone — Free Top-Down Zombie Survival Shooter | Ragequit Arcade',
      metaDescription: 'Play Dead Zone free online. A fast top-down zombie survival shooter: blast endless waves in a procedural city, grab dropped weapons, chain combos and see how long you last. No download.',
      faq: [
        { q: 'How do you play Dead Zone?', a: 'Dead Zone is a top-down survival shooter. You control a survivor in a city overrun by zombies, moving in any direction while aiming and firing at the horde. On desktop you move with the keyboard and aim with the mouse; on mobile you use on-screen controls. Your goal is simple: survive as long as possible against endless, escalating waves of the undead.' },
        { q: 'How do the weapons work?', a: 'You start with a pistol that has unlimited ammo, so you are never completely defenceless. Stronger weapons are dropped by the enemies you kill, but they come with limited ammo. These include a five-shot shotgun fan for close crowds, a full-auto minigun for shredding groups, and a bazooka with a huge area blast. The bazooka is powerful but its explosion can also hurt you, so use it with care.' },
        { q: 'What kinds of zombies are there?', a: 'Most zombies shamble straight toward you, but not all of them. The spitter is a ranged enemy that keeps its distance and fires projectiles at you, so you cannot simply hold one position. You have to keep moving, manage the crowd rushing you, and deal with the ranged threats at the same time.' },
        { q: 'How do the waves work?', a: 'Each wave requires you to kill a certain number of zombies before the next, harder wave begins. There is no waiting out the clock: you have to keep fighting to progress. As the waves climb, the horde grows denser and more dangerous, so your positioning and weapon choices matter more and more.' },
        { q: 'What is the combo system?', a: 'Chaining kills quickly builds a combo, rewarding aggressive, confident play. Keeping your combo alive while the screen fills with the dead is part of the challenge, and part of what pushes you to keep taking risks instead of playing it safe.' },
        { q: 'Is the map always the same?', a: 'No. The city is procedurally generated and effectively endless, with different districts like dense downtown blocks, wide avenues and open parks. Every run takes you through a different layout, so you can never simply memorise a safe route.' },
        { q: 'Is Dead Zone free?', a: 'Yes, completely free to play, no download and no signup required.' },
        { q: 'Mobile?', a: 'Yes. Dead Zone works on mobile, tablet and desktop, with on-screen controls for touch devices.' },
      ],
    },
  },
     /* ================================================================
     VOIDFALL — runner pseudo-3D néon à pentes, catégorie arcade
     Pas de leaderboard Supabase : score distance affiché en local,
     viralité via le défi d'ami (URL). Ne pas brancher submitScore.
     ================================================================ */
  {
    id: 'voidfall',
    title: 'VOIDFALL',
    description: 'VOIDFALL is a free neon endless runner where you guide a glowing ball down a track suspended in an empty void. The track plunges, flattens, climbs and throws you off ramps, gaps open in the floor, and the only number that matters is how far you get, counted in meters. Roll off the edge or slam into an obstacle and the void swallows you. The tagline says the void forgives nothing, and it means it.\n\nSteering is smooth rather than lane by lane. On a phone you drag your thumb left or right to roll the ball across a track seven tiles wide, and you tap or swipe up to jump. On a computer you steer with the mouse or the arrow keys, jump with a click or Space and hold it to keep bouncing; Escape pauses, R restarts, P opens photo mode and M toggles the sound. Downhills push your speed higher, so steep sections are where you gain distance fastest and where mistakes arrive fastest too.\n\nThe track evolves as you go deeper. The run opens on a safe runway, then holes appear and grow longer, the path narrows and wanders, and sharp drops and ramps become more frequent. From 400 meters, rare boost tiles show up: roll over one and you rocket forward, hovering over gaps and smashing through anything in your way for a moment. From 700 meters, barriers cross the track, some full width so you have to jump, others with a narrow two-tile opening. From 1,200 meters, sliding blocks sweep from side to side.\n\nThere is always something to chase beyond your record. A daily challenge sets a fresh goal every day: a distance, a number of jumps, meters covered in the air or a survival time. The weekly challenge gives everyone the same track with a twist, drawn from nine modifiers such as Double Gravity, Chasms, Blackout, Overdrive, Zero-G and Razor’s Edge. The total distance you cover across all your runs unlocks color themes like Toxic, Bloodbath, Synthwave and Absolute Zero, plus new cores for your ball, and playing five days in a row earns the Ember core. Eighteen achievements track everything from your first jump to beating a friend. All of it is cosmetic, so every record is pure skill.\n\nTo go further, keep your eyes far up the track, stay near the middle so you can escape to either side, and jump a fraction later than feels natural over gaps. When you crash beyond the first 15 meters, you can watch an optional ad once per run to continue from the distance you reached, on a fresh safe stretch. After the run, watch the replay, then send a challenge link: your friend gets the exact same track and the distance to beat. VOIDFALL is free in your browser on mobile, tablet and desktop, with no download, and your best distance goes on the global leaderboard. Start rolling and see how deep you can fall.',
    thumbnail: '/thumbnails/voidfall.jpg',
    category: 'arcade',
    tags: ['runner', 'arcade', '3d', 'neon', 'endless', 'reflex', 'synthwave', 'slope', 'dodge', 'distance'],
    size: 'medium',
    shimmer: true,
    isNew: false,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Swipe left or right to switch lanes, tap or swipe up to jump. On desktop, use the left/right arrows or A/D to steer and Space or Up to jump. Ride the downhill slopes for speed, and survive as long as you can — your score is the distance you fall, in meters.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'VOIDFALL — Free Neon Endless Runner Game | Ragequit Arcade',
      metaDescription: 'Play VOIDFALL free online. A fast neon endless runner down a pseudo-3D track: steer between lanes, jump hazards, ride the slopes and chase your max distance. No download.',
      faq: [
        { q: 'How do you play VOIDFALL?', a: 'Swipe left or right to change lanes and tap or swipe up to jump over gaps and obstacles. On desktop use the arrow keys or A/D to steer and Space or Up to jump. Survive the neon track as long as possible — the further you fall, the higher your distance.' },
        { q: 'How is the score calculated in VOIDFALL?', a: 'Your score is pure distance, measured in meters. There is no multiplier and no combo to manage — just push deeper down the track than your last run and beat your own record.' },
        { q: 'What are the neon skins in VOIDFALL?', a: 'Skins are cosmetic only. You unlock them by building survival streaks across your runs. They change how your runner looks but never affect speed, handling or difficulty, so the game stays fair.' },
        { q: 'Can I challenge a friend in VOIDFALL?', a: 'Yes. After a run you can send a challenge link with one tap. Your friend opens the same run conditions and tries to beat your distance, then can challenge you back — a quick back-and-forth that needs no account.' },
        { q: 'Is VOIDFALL free and playable on mobile?', a: 'VOIDFALL is completely free, needs no download and no signup, and runs directly in your browser on mobile, tablet and desktop. Over 85% of Ragequit players are on mobile, so the touch controls are the primary way to play.' },
        { q: 'What is the weekly challenge in VOIDFALL?', a: 'Every week, all players get the same track with one special modifier, such as Double Gravity, Chasms with gaps two and a half times longer, Blackout, Overdrive at +60% speed, Zero-G, Razor’s Edge on a single-tile track, Gusts, Bouncy Floor or Freefall. Your best weekly distance is shown on the title screen, and a new challenge starts every Monday.' },
        { q: 'What do the boost tiles and obstacles do?', a: 'Boost tiles appear after 400 meters. Roll over one and you shoot forward, hovering over holes and smashing obstacles for a moment. Barriers arrive after 700 meters: jump the full-width ones or slip through the two-tile gap in the others. Sliding blocks that sweep across the track appear after 1,200 meters and must be dodged or jumped.' },
        { q: 'Can I continue after crashing in VOIDFALL?', a: 'Yes, once per run, as long as you made it past the first 15 meters. You can watch a short optional ad to continue: your distance is kept and you restart on a fresh safe stretch at the point you reached, with a new track generated ahead. A second crash ends the run for good.' },
      ]
    }
  },
   /* =====================================================================
   FOX RUNNER — pack SEO (a copier dans les fichiers du site)
   1) games.js      : ajouter l entree dans le tableau `games`
   2) blog.js       : ajouter l article dans le tableau `posts`
   3) testGames.js  : entree de test
   4) sitemap.xml   : deux URLs
   Fichier du jeu   : public/games/fox-runner.html
   Miniature        : public/thumbnails/fox-runner.jpg  (1:1)
   Image du blog    : public/blog/fox-runner-tips.jpg   (16:9)
   ===================================================================== */
 
/* ---------- 1) games.js ---------- */
  {
    id: 'fox-runner',
    title: 'Fox Runner',
    description: 'Fox Runner is a free endless runner set in an enchanted forest, where a small fox sprints across floating logs, mossy ledges and stone slabs while the day moves from morning to night around it. You tap, the fox jumps, and every meter counts toward one score: your best distance. It looks calm, but it is a sharp reflex game, because the forest keeps speeding up and never stops throwing new dangers at you. The controls use one button. Tap or click for a short hop, hold to leap higher and farther. On desktop you can use Space, the Up arrow or W, and press P or Escape to pause. On a phone, touch the screen anywhere. The forest is built from hand designed sections that alternate tension and rest, and it is always fair: every gap can be crossed with a well timed jump, but the timing window keeps shrinking as you go. Beyond plain gaps you will meet thorny brambles to jump over, low branches that force a short hop, bouncy mushrooms, logs that crumble under your feet and crows that swoop in from the right. Each time of day has its own rule. Morning is a gentle start. At midday, mushrooms launch you across wide gaps if you run straight into them. At golden hour, logs collapse shortly after you land. At night the light fades around the fox and gusts of wind push you through the air. The time of day changes every 200 meters and then the cycle repeats, faster each time. Jump at the very last moment and land on the next platform to score a perfect landing. Chain four in a row to enter Flow: the fox runs faster and every firefly you catch counts double. Fireflies are collected along the way and unlock fox skins, from Snow to Ember, Midnight and Golden. Your score stays a pure distance in meters, so leaderboards and challenges are always comparable. If you jump a little late and hit the side of a platform in classic mode, the fox grabs the edge and gets one chance to jump again, while a red glow warns you that the left edge is closing in. Three ways to play: Classic is the standard run. Hard mode is faster, has tighter timing and no wall rescue, with its own leaderboard for players who like pain. The Daily run gives every player the same course for the day, so you can compare results fairly. After any run you can send a challenge link to a friend, who will run the exact same forest and try to beat your distance. You earn medals along the way, from the oak leaf to the four leaf clover, the moon flower, the shooting star and the ivy crown, and you can compare your best with other players on the Ragequit Arcade leaderboard with a free account. Once per run you can watch a short ad to continue from the same distance. The soft music and forest sounds are generated live, and one button mutes everything. The game runs in your browser on mobile, tablet and desktop, with no download and no signup needed. Open it, tap once, and see how far the fox can run.',
    thumbnail: '/thumbnails/fox-runner.jpg',
    category: 'arcade',
    tags: ['runner', 'arcade', 'endless', 'fox', 'forest', 'platformer', 'jump', 'obstacles', 'daily challenge', 'hard mode', 'one button'],
    size: 'medium',
    shimmer: false,
    isNew: false,
    hot: false,
    landscape: false,
    plays: 0,
    modes: ['classic', 'hard'],
    defaultMode: 'classic',
    controls: 'Tap or click to jump. Tap for a short hop, hold for a high leap. On desktop use Space, the Up arrow or W to jump, and P or Escape to pause. Cross the gaps, dodge brambles, branches and crows, run into mushrooms to bounce, and beat your best distance in meters.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'Fox Runner - Free Endless Runner Game | Ragequit Arcade',
      metaDescription: 'Play Fox Runner free online. Run a fox through an enchanted forest with brambles, crumbling logs, bouncy mushrooms and crows. Hard mode, daily run and friend challenges. No download.',
      faq: [
        { q: 'How do you play Fox Runner?', a: 'Tap or click anywhere to make the fox jump. On desktop you can also press Space, the Up arrow or W. Tap for a short hop and hold for a long, high leap. Cross the gaps, avoid the obstacles and run as far as possible before you fall or get pushed off the left edge of the screen.' },
        { q: 'How is the score calculated in Fox Runner?', a: 'Your score is the distance you run, in meters. There is no multiplier on the score itself, so the only way to score higher is to survive longer. Classic and Hard mode each keep their own best distance, and both can be sent to the Ragequit Arcade leaderboard.' },
        { q: 'What obstacles are there in Fox Runner?', a: 'Brambles sit on platforms and push you back if you touch them, so jump over them. Low branches hang above some brambles and force a short hop instead of a high leap. Crows fly in from the right at ground level after a warning mark. Logs can crumble and mushrooms can bounce you, depending on the time of day.' },
        { q: 'What does each time of day do?', a: 'Every 200 meters the scenery changes and so does the rule. Morning is a gentle start. Midday brings bouncy mushrooms that carry you over wide gaps when you run into them. Golden hour makes logs crumble shortly after you land. Night reduces the light around the fox and adds gusts of wind. Then the cycle repeats at a higher speed.' },
        { q: 'How do mushrooms work?', a: 'At midday, some platforms end with a red mushroom in front of a gap that is too high or too wide to jump normally. Do not jump: run straight into the mushroom and it launches you onto the landing platform. Jumping too early over it means missing the launch.' },
        { q: 'What are perfect landings and Flow?', a: 'Jump at the last moment before the edge and land on the next platform to score a perfect landing. Four perfect landings in a row start Flow: the fox runs about ten percent faster and each firefly you collect counts double. Any mistake ends the streak. Flow does not change the score directly, since the score is always the distance.' },
        { q: 'What are fireflies and how do I unlock fox skins?', a: 'Fireflies float along jumps and above high leafy ledges. Every firefly you collect adds to a lifetime total that is never spent. Snow unlocks at 250 fireflies, Ember at 500, Midnight at 1000 and Golden at 2000. Choose your skin from the Fox skins button on the start screen. Skins are cosmetic only.' },
        { q: 'What is Hard mode?', a: 'Hard mode is faster, leaves a tighter timing window and removes the wall rescue, so touching the side of a platform ends the run. It has its own best score and its own leaderboard. It is meant for players who already run far in Classic.' },
        { q: 'What is the Daily run?', a: 'The Daily run uses one course per day that is identical for every player, so results are directly comparable. It uses the classic rules, and your best score of the day is saved on your device. A new course appears the next day.' },
        { q: 'How do I challenge a friend?', a: 'After a run, press Challenge a friend. The game shares a link containing your course and your distance. Your friend opens it and runs exactly the same forest, then sees whether they beat you.' },
        { q: 'What happens if I hit the side of a platform?', a: 'In Classic and Daily, if you jump too late the fox grabs the side of the next platform and you can jump again at once. While stuck, the screen keeps scrolling and pushes the fox toward the left edge, and a red glow warns you. In Hard mode there is no rescue and the run ends.' },
        { q: 'Does the game get harder the farther I go?', a: 'Yes, and it never stops. Speed rises for roughly the first 2000 meters, then keeps creeping up with short surges every 500 meters. The timing window keeps shrinking and harder sections appear more often.' },
        { q: 'Can I play Fox Runner on my phone?', a: 'Yes. Fox Runner works on phones, tablets and desktop computers with touch or keyboard controls. In portrait the view is zoomed in on the fox, and landscape gives you a wider view of the platforms ahead.' },
        { q: 'Is Fox Runner free, and do I need an account?', a: 'Fox Runner is completely free and needs no download. You can play instantly without signing up. To appear with your name on the leaderboard, create a free Ragequit Arcade account.' },
        { q: 'How does the second chance work?', a: 'Once per run, after a crash, you can watch a short ad to continue from the same distance with a fresh platform under your feet. It works one time per run, so keep it for a run that is close to your personal best.' },
        { q: 'What are the medals in Fox Runner?', a: 'Medals reward the distance of a single run: the oak leaf for any run, the four leaf clover at 100 meters, the moon flower at 250 meters, the shooting star at 500 meters and the ivy crown at 1000 meters.' }
      ]
    }
  },
     /*===================================================================
     CITY RUNNER — Arcade : Runner sur Coruscant
     ===================================================================*/
     {
    id: 'city-runner',
    title: 'City Runner',
    description: 'City Runner is a free 3D endless runner set in a futuristic megacity floating high above the clouds. You pilot a hover vehicle along an aerial skylane suspended over the void, weaving between glass towers, neon billboards and flying traffic while the streets of the city glow far below you. There is no download and no signup: the game runs directly in your browser on mobile, tablet and desktop, and a run starts in one tap. The goal is simple and brutal. Travel as far as you can, measured in meters, before you crash. The longer you survive, the faster you fly, and your speedometer climbs past 300 kilometers per hour. The city is generated as you play, so every run is different: open districts full of skyscrapers, narrow avenues lined with giant advertising screens and scrolling LED banners written in an alien script, and enclosed tunnels where the walls rush past inches from your wings. Obstacles come in many shapes. Some you dodge, like towering pylons, half walls, twin pillars with a narrow gap, blocks that slide from one side of the lane to the other and swarms of drones sweeping across your path. Others you jump, like laser fences, rows of floating cargo containers, barrier gates and elevator platforms that rise and fall under you. Every jump obstacle is built to be fair: the game always leaves you enough clear space before it to see it coming, and after it to land and react. You also share the skylane with flying cars. A few of them cruise in your direction at a slower speed, so you have to pass them, slip between them or jump right over them. Pass close to anything without touching it and you earn a near miss bonus. Chain near misses and jumps quickly and your combo multiplier climbs up to times five, turning one clean sequence into a huge haul of Galactic Credits. Galactic Credits are the currency of City Runner. You earn one credit per meter, plus bonuses for orbs, near misses, jumps and daily missions, and you spend them in the store on nine vehicles, from the Metro Glider hover car to the legendary Obsidian Wraith stealth fighter. Each vehicle has its own handling, speed and shield level, so the store is a real strategic choice and not only cosmetic. You can also buy shield and handling upgrades, custom paint jobs and new trail colors. Power-ups appear along the way: a magnet that pulls every orb toward you, a boost that makes you faster and lets you smash through obstacles, and an extra shield charge. Every 1000 meters the city changes district, from the golden towers of Golden Heights to the neon glow of Neon Night and the storms of Iron Rain. Three new daily missions give you a reason to come back every day, and when a run ends you can share a score card of your best distance with your friends. Controls are designed for one thumb on a phone: swipe left or right to steer and tap the jump button to leap. On desktop, use the arrow keys or A and D to steer, Space or the Up arrow to jump, and P or Escape to pause. Open City Runner, fasten your harness and see how deep into the megacity you can fly.',
    thumbnail: '/thumbnails/city-runner.jpg',
    category: 'arcade',
    tags: ['runner', 'arcade', '3d', 'endless', 'futuristic', 'city', 'hover', 'flying cars', 'sci-fi', 'distance'],
    size: 'large',
    shimmer: true,
    isNew: false,
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: 'Swipe left or right to steer and tap the JUMP button to leap over low obstacles. On desktop use the arrow keys or A and D to steer, Space or the Up arrow to jump, and P or Escape to pause. Dodge towers, drones and flying cars, chain near misses for combos and fly as far as you can.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'City Runner - Free 3D Endless Runner Game | Ragequit Arcade',
      metaDescription: 'Play City Runner free online. Fly a hover vehicle through a 3D megacity above the clouds, dodge flying cars, jump laser fences, unlock 9 vehicles and beat your distance. No download.',
      faq: [
        { q: 'How do you play City Runner?', a: 'Swipe left or right to steer your hover vehicle and tap the JUMP button to leap over low obstacles. On desktop, use the arrow keys or A and D to steer, Space or the Up arrow to jump, and P or Escape to pause. Avoid towers, drones, walls and flying cars, and travel as far as you can.' },
        { q: 'How is the score calculated in City Runner?', a: 'Your score is the distance you travel, measured in meters. Your best distance is sent to the Ragequit Arcade leaderboard. Near misses, jumps, orbs and missions do not change your distance, but they earn you extra Galactic Credits.' },
        { q: 'What are Galactic Credits?', a: 'Galactic Credits are the in-game currency. You earn one credit per meter, two per orb, a bonus for every near miss and jump, and larger rewards for daily missions. You spend them in the store on new vehicles, upgrades, paint jobs and trail colors. There is no real money involved.' },
        { q: 'What is a near miss and how do combos work?', a: 'A near miss happens when you pass very close to an obstacle or a flying car without touching it. If you chain near misses and jumps within a few seconds, your combo multiplier rises up to times five, and every bonus in the chain is multiplied.' },
        { q: 'Which vehicle is the best in City Runner?', a: 'Each of the nine vehicles has its own handling, speed and shield level, and the more expensive ones are stronger. The Metro Glider is free and forgiving, the Dune Bike is narrow and agile, and the Obsidian Wraith has top handling, high speed and four shield charges. Faster vehicles also earn distance faster, but they are harder to control.' },
        { q: 'How do shields work?', a: 'Each shield charge absorbs one crash. The obstacle is destroyed or you are pushed away, and you get a short moment of invulnerability. Some vehicles start with shields, you can buy extra shield charges in the store, and a shield power-up can appear during a run.' },
        { q: 'What are the power-ups?', a: 'The magnet pulls every nearby orb toward you, the boost makes you faster and lets you smash through obstacles for a few seconds, and the shield power-up adds one shield charge. They appear regularly on the skylane.' },
        { q: 'What are daily missions?', a: 'Every day you get three new missions, such as reaching a distance in one run, crossing tunnels or chaining near misses. Each completed mission pays Galactic Credits, and completing all three gives a bonus. Missions reset at midnight.' },
        { q: 'Can I continue after a crash?', a: 'Yes, once per run you can watch a short ad to continue from the same distance. It is best kept for a run that is already close to your personal record.' },
        { q: 'Is City Runner free and playable on mobile?', a: 'City Runner is completely free, needs no download and no account, and runs in your browser on phones, tablets and computers. It is built for mobile first, with one-thumb controls. Create a free Ragequit Arcade account if you want your name on the leaderboard.' }
      ]
    }
  },
  /* ===================================================================
     LINESTORM — Arcade : 4 lignes néon, écarter / resserrer
     =================================================================== */
  {
    id: 'linestorm',
    title: 'LINESTORM',
    description: 'LINESTORM is a free neon arcade game where you steer four glowing lines through an endless storm of walls. Cyan, pink, lime and orange, the four lines race upward side by side, and everything in the storm is built around one decision: split them apart or pack them together. There is no download and no signup. The game runs instantly in your browser on mobile, tablet and desktop, and a run starts in one tap. The rules fit in two colors. Pink gates have one hole for each line, and every hole is marked with a dot of the matching color, so you tap to split your lines into a wide fan and thread all four through at once. Green walls have a single wide gap for the whole pack, so you tap again to merge and slip through together. Between the walls, rows of red striped debris fall toward you and always leave one safe lane to find. On a phone you drag your thumb to steer and tap anywhere to switch between split and merge. On desktop you steer with the arrow keys or A and D and press Space to split or merge. Every wall you pass cleanly shatters into sparks and adds to your score. Pass five in a row without a single hit and you enter Overdrive: the music speeds up, the grid pulses to the beat and every point counts double until your next mistake. Touching a wall costs you only the line that hit it, not the whole run, and you can catch a glowing orb of the same color to bring a lost line back. The run ends when all four lines are gone. The storm never stands still. Your speed keeps rising the longer you survive, shown live by the speed gauge at the top of the screen, and every 1,000 meters the storm moves into a new zone with its own colors, from Neon Night and Cyber Ocean to Toxic Grid, Inferno, Golden Void and Ultraviolet. Power-ups help you hold on: slow motion for three seconds, a shield that absorbs one hit and a ghost mode that lets you pass straight through walls. Three modes are available. Classic is the standard run with all four lines. Hard starts you with only two lines, runs faster, removes the orbs and has its own leaderboard. Daily Storm gives every player exactly the same course for the day. Three daily missions add fresh goals every day, seven cosmetic line skins unlock as your best score grows, and after any run you can send a challenge link so a friend plays the very same storm and tries to beat you. Once per run you can watch a short ad to bring all your lines back and keep going. Open LINESTORM, split, merge and see how deep into the storm you can go.',
    thumbnail: '/thumbnails/linestorm.jpg',
    category: 'arcade',
    tags: ['arcade', 'neon', 'reflex', 'endless', 'lines', 'split', 'one tap', 'speed', 'synthwave', 'daily missions', 'hard mode', 'skins'],
    size: 'medium',
    shimmer: false,
    isNew: true,
    addedAt: '2026-10-30',
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic', 'hard'],
    defaultMode: 'classic',
    controls: 'Drag left or right to steer and tap anywhere to split or merge your four lines. On desktop use the arrow keys or A and D to steer, Space to split or merge, and P or Escape to pause. Split for pink gates, merge for green walls, dodge the red debris and survive as long as you can.',
    author: 'Ragequit Arcade',
    seo: {
      title: 'LINESTORM - Free Neon Arcade Game: Split, Merge, Survive | Ragequit Arcade',
      metaDescription: 'Play LINESTORM free online. Steer four neon lines through a storm of walls: split for pink gates, merge for green walls. Rising speed, zones, skins, daily missions. No download.',
      faq: [
        { q: 'How do you play LINESTORM?', a: 'You control four neon lines that race upward through a storm of walls. Drag left or right to steer and tap anywhere to split the lines into a wide fan or merge them back together. On desktop, use the arrow keys or A and D to steer and Space to split or merge. Pass as many walls as you can before you lose all four lines.' },
        { q: 'What is the difference between pink gates and green walls?', a: 'Pink gates have one hole per line, each marked with a dot of the matching color, so you must split your lines to pass. Green walls have a single wide gap for the whole pack, so you must merge your lines to slip through. Reading the next wall early and switching formation in time is the core skill of the game.' },
        { q: 'What happens when a line hits a wall?', a: 'Only the line that touched the wall is lost, not the whole run. You keep playing with the lines you have left, and you can bring a lost line back by catching a glowing orb of the same color. The run ends when all four lines are gone.' },
        { q: 'How is the score calculated in LINESTORM?', a: 'You earn points for the distance you travel and 100 points for every wall you pass without a hit. Pass five walls in a row cleanly to trigger Overdrive, which doubles every point until your next mistake. Orbs collected while all your lines are alive give a bonus too.' },
        { q: 'Does LINESTORM get faster?', a: 'Yes. Your speed rises continuously the longer you survive, up to more than twice the starting speed. The speed gauge at the top of the screen shows how fast you are going, and a SPEED UP message appears every 20 seconds.' },
        { q: 'What are the zones?', a: 'Every 1,000 meters the storm enters a new zone with its own colors: Neon Night, Cyber Ocean, Toxic Grid, Inferno, Golden Void and Ultraviolet, before the cycle starts again. Zones show how far you have gone and keep long runs visually fresh.' },
        { q: 'What do the power-ups do?', a: 'Slow motion halves the speed of the storm for three seconds, the shield absorbs one hit without losing a line, and ghost mode lets you pass straight through walls for four seconds. They appear regularly as spinning squares marked S, B and G.' },
        { q: 'What are the three modes?', a: 'Classic is the standard run with four lines and orbs to recover lost lines. Hard starts with only two lines, runs faster and has no orbs, with its own leaderboard. Daily Storm gives every player the same course for the day, using the Classic rules.' },
        { q: 'How do daily missions work?', a: 'Every day you get three new missions, such as passing ten pink gates in a row without a hit, collecting orbs or reaching a zone. They count in every mode, and completing ten missions in total unlocks the Daily Hero line skin.' },
        { q: 'How do I unlock line skins?', a: 'Skins are cosmetic only and change the colors of your four lines. Ice, Sunset, Toxic, Royal and Prism unlock as your best score in a single run reaches 2,500, 5,000, 10,000, 20,000 and 35,000 points. Daily Hero unlocks after ten completed missions. Pick your skin from the Skins button on the start screen.' },
        { q: 'Can I challenge a friend?', a: 'Yes. After a run, press Challenge a friend to share a link with your score. Your friend plays exactly the same storm and sees whether they beat you, then can send a challenge back.' },
        { q: 'Can I continue after losing all my lines?', a: 'Once per run you can watch a short ad to bring all your lines back and continue from the same distance and speed. Keep it for a run that is close to your best score.' },
        { q: 'Is LINESTORM free and playable on mobile?', a: 'LINESTORM is completely free, needs no download and no account, and runs in your browser on phones, tablets and computers. It is built for one thumb on mobile. Create a free Ragequit Arcade account if you want your name on the leaderboard.' }
      ]
    }
  },
  {
    id: 'loopstrike',
    title: 'LOOPSTRIKE',
    description: "LOOPSTRIKE is a free neon arcade game where your weapon is the trail you leave behind. You steer a glowing comet across a dark grid, and its tail stretches behind it as a ribbon of cyan and pink light. Touch that tail anywhere, even its glowing end, or cross over it, and the loop snaps shut: everything trapped inside is destroyed in a burst of sparks. There is no download and no signup. The game runs instantly in your browser on mobile, tablet and desktop, and a run starts in one tap. On a phone you drag anywhere on the screen and the comet follows your thumb. With a mouse the comet chases the cursor, and on a keyboard you can steer with the arrow keys, WASD or ZQSD. The arena fills with cyan cores, each surrounded by a ring that slowly runs out. Loop a core before its ring empties, or it breaches and drains your energy bar. From the second wave, magenta spiked mines appear: never loop them and never touch them, just let them fade away. From the third wave, orange hunters lock onto your comet and chase it across the grid, so you have to loop them before they reach you. Every five waves the Warden arrives, a huge acid-yellow octagon protected by orbiting shield plates. It drifts around the arena dropping mines, and only a loop drawn around its core can knock off one shield at a time. The scoring rewards greed and precision. Each core is worth more the sooner you catch it, and trapping several targets in a single loop multiplies the points. Close loops in quick succession and your combo climbs, up to times eight. Clearing a wave pays a bonus, and taking down the Warden pays a huge one. Glowing power-ups help you survive: SLOW-MO slows the whole arena, LONG TAIL stretches your trail so you can draw bigger loops, NOVA wipes every enemy off the screen and SHIELD refills your energy. Every big hit freezes the action for a split second, shakes the screen and fills it with shards, shockwaves and glass-shatter sounds. Three ways to play are available. Classic is the standard run. Hard mode makes cores breach faster and hit harder, with its own leaderboard. The Daily run gives every player exactly the same spawns for the day. After any run you can send a challenge link so a friend plays the very same game and tries to beat your score. Once per run you can watch a short ad to refill your energy, clear the mines and keep going. Open LOOPSTRIKE, draw your first loop and see how many you can trap at once.",
    thumbnail: '/thumbnails/loopstrike.jpg',
    category: 'arcade',
    tags: ['arcade', 'neon', 'loop', 'draw', 'comet', 'reflex', 'combo', 'boss', 'one finger', 'daily run', 'hard mode', 'synthwave'],
    size: 'medium',
    shimmer: false,
    isNew: true,
    addedAt: '2026-11-02',
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic', 'hard'],
    defaultMode: 'classic',
    controls: "Drag anywhere to steer your comet. Close a loop by touching your own tail, even its glowing end, or by crossing it. With a mouse the comet follows the cursor; on a keyboard use the arrow keys, WASD or ZQSD, and P to pause. Loop the cores before their ring runs out, loop the hunters, never loop or touch the mines.",
    author: 'Ragequit Arcade',
    seo: {
      title: "LOOPSTRIKE - Free Neon Loop Arcade Game | Ragequit Arcade",
      metaDescription: "Play LOOPSTRIKE free online. Draw neon loops with your comet's tail to trap cores, dodge mines and hunters, chain combos up to x8 and beat the Warden boss. No download.",
      faq: [
        { q: "How do you play LOOPSTRIKE?", a: "You steer a glowing comet that leaves a neon tail behind it. Drag anywhere on the screen, or move the mouse, and the comet follows. When the comet touches its own tail, even the glowing end, or crosses it, the loop closes and everything inside is destroyed. Trap the cores before their ring runs out and survive as many waves as you can." },
        { q: "How do I close a loop?", a: "Bring the head of your comet back onto any part of its tail. You can cross the tail, touch it in the middle or touch the glowing dot at its very end. The loop needs a minimum size to count, so tiny circles do nothing. The longer the tail, the bigger the loops you can draw." },
        { q: "What are cores, mines and hunters?", a: "Cyan cores are your targets: each has a ring that empties over time, and if it runs out the core breaches and drains your energy. Magenta mines appear from wave 2: looping or touching one hurts you, so let them fade. Orange hunters appear from wave 3 and chase your comet, so loop them before they hit you." },
        { q: "How does the combo work?", a: "Every loop that destroys something within about two seconds of the previous one raises your combo, up to times eight. Trapping several targets in the same loop multiplies the points again. Taking damage resets the combo, so fast and clean loops are the key to a big score." },
        { q: "Who is the Warden?", a: "The Warden is the boss that arrives every five waves: a giant yellow octagon with shield plates orbiting around it, one per remaining hit. It wanders around the arena and drops mines, with a pink warning ring just before each drop. Draw a loop around its core to knock off a shield, and repeat until it falls for a huge bonus." },
        { q: "What do the power-ups do?", a: "SLOW-MO slows down the whole arena for a few seconds, LONG TAIL stretches your trail so you can draw much bigger loops, NOVA destroys every enemy on screen at once and SHIELD refills a large part of your energy bar. Grab them by flying over them or by trapping them inside a loop." },
        { q: "What is the difference between Classic, Hard and Daily?", a: "Classic is the standard run. Hard mode makes cores breach faster and every hit cost more energy, with its own leaderboard. The Daily run gives every player the same spawns for the whole day, so scores can be compared fairly." },
        { q: "Can I challenge a friend?", a: "Yes. After a run, press Challenge a friend to share a link with your score. Your friend plays exactly the same game, with the same spawns, and sees whether they beat you." },
        { q: "Can I continue after losing?", a: "Once per run you can watch a short ad to refill your energy, clear every mine on screen and keep playing with your current score. Keep it for a run that is close to your record." },
        { q: "Is LOOPSTRIKE free and playable on mobile?", a: "LOOPSTRIKE is completely free, needs no download and no account, and runs in your browser on phones, tablets and computers. It was designed for touch screens first: one finger is all you need. Create a free Ragequit Arcade account if you want your name on the leaderboard." }
      ]
    }
  },
  {
    id: 'mazequake',
    title: 'MAZEQUAKE',
    description: "MAZEQUAKE is a free 3D tilt maze game where the clock is your real enemy. A tiny robot core sits inside a glass ball at the start of a glowing neon labyrinth, and you tilt the whole board to roll it toward the exit portal. You start with 45 seconds. Every maze you clear gives you time back, then drops you straight into the next labyrinth, which is always a little bigger than the last. There is no download and no signup: the game runs instantly in your browser on mobile, tablet and desktop. On a phone you simply drag anywhere on the screen and a floating virtual stick appears under your thumb, so you can tilt the maze in any direction with one finger. You can also switch on gyro tilt in the menu and steer by tilting your phone for real, like a classic marble maze. On a computer, use the arrow keys, WASD or ZQSD, and P to pause. The ball has weight and momentum, so the skill is in the touch: small, precise tilts carry you through tight corridors, while big moves make you bounce off the walls and lose precious seconds. Each labyrinth is packed with things to grab and things to avoid. Cyan time crystals add four seconds to the clock, and golden coins add points. From maze 3, black pits with a red glowing rim open in the floor: fall in and you lose six seconds and go back to the start. From maze 5, red laser gates blink on and off across the corridors, and touching an active beam costs you four seconds. Power-ups appear from maze 2 to turn a desperate run around. RADAR draws the shortest path to the exit, MAGNET pulls nearby crystals and coins toward you, PHASE lets you roll safely over pits and through lasers, and FREEZE stops the clock for a few seconds. Your score grows with every maze you clear, and the faster you reach the exit, the bigger the speed bonus. Three ways to play are available. Classic is the standard run with time crystals and power-ups. Hard mode starts with only 35 seconds, puts you on a slippery ice floor, opens pits and lasers from the very first maze and removes every crystal, but multiplies your score by one and a half, with its own leaderboard. The Daily run gives every player exactly the same mazes for the whole day. After a run you can send a challenge link so a friend plays the very same labyrinths and tries to beat your score. Once per run you can watch a short ad to add twenty seconds and keep going. Every move feels alive: the neon walls glow and bloom, sparks fly on every impact, the screen shakes when you hit a pit, and each maze has its own neon color. Open MAZEQUAKE, tilt the board and see how many mazes you can escape before the clock runs out.",
    thumbnail: '/thumbnails/mazequake.jpg',
    category: 'challenge',
    tags: ['maze', '3d', 'tilt', 'labyrinth', 'marble', 'ball', 'neon', 'timer', 'gyroscope', 'one finger', 'daily run', 'hard mode'],
    size: 'medium',
    shimmer: true,
    isNew: true,
    addedAt: '2026-11-03',
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic', 'hard'],
    defaultMode: 'classic',
    controls: "Drag anywhere on the screen to tilt the maze with the floating virtual stick, or turn on gyro tilt in the menu and tilt your phone. On a keyboard use the arrow keys, WASD or ZQSD, and P to pause. Roll the robot ball to the exit portal before the clock reaches zero, grab cyan crystals for extra time and avoid the pits and the red lasers.",
    author: 'Ragequit Arcade',
    seo: {
      title: "MAZEQUAKE - Free 3D Tilt Maze Game Online | Ragequit Arcade",
      metaDescription: "Play MAZEQUAKE free online: tilt a neon 3D labyrinth, roll the robot ball to the exit before time runs out, dodge pits and lasers. Mobile, gyro, no download.",
      faq: [
        { q: "How do you play MAZEQUAKE?", a: "You tilt a 3D neon maze to roll a small robot inside a glass ball toward the exit portal. Drag anywhere on the screen, use the arrow keys or tilt your phone with the gyro option. Reach the exit before the clock hits zero: every cleared maze gives you time back and opens a bigger labyrinth." },
        { q: "How much time do I have?", a: "A Classic run starts with 45 seconds. Clearing a maze adds time, and the bigger the maze, the more you get back. Cyan crystals add four more seconds each, and the FREEZE power-up stops the clock for a few seconds. In Hard mode you start with only 35 seconds." },
        { q: "Can I control the maze with my phone's gyroscope?", a: "Yes. Turn on Gyro tilt in the menu and the maze follows the tilt of your phone, like a real marble labyrinth. If you prefer, leave it off and drag anywhere on the screen: a floating virtual stick appears under your thumb." },
        { q: "What are the pits and the lasers?", a: "Pits are black holes with a glowing red rim that appear from maze 3. Falling into one costs six seconds and sends you back to the start. Red laser gates appear from maze 5 and blink on and off across the corridors: touching an active beam costs four seconds, so wait for it to switch off." },
        { q: "What do the power-ups do?", a: "Power-ups appear from maze 2. RADAR shows the shortest path to the exit, MAGNET pulls nearby crystals and coins toward you, PHASE lets you roll safely over pits and through lasers, and FREEZE stops the clock for a few seconds. Roll over a power-up to activate it." },
        { q: "How is the score calculated?", a: "Each cleared maze pays points that grow with the maze number, plus a speed bonus if you reach the exit quickly. Golden coins add extra points. In Hard mode every score is multiplied by one and a half." },
        { q: "What is the difference between Classic, Hard and Daily?", a: "Classic is the standard run with crystals and power-ups. Hard mode puts you on a slippery ice floor with only 35 seconds, pits and lasers from the first maze and no crystals, in exchange for a times 1.5 score and its own leaderboard. The Daily run gives every player the same mazes for the whole day." },
        { q: "Can I challenge a friend?", a: "Yes. After a run, press Challenge a friend to share a link with your score. Your friend plays exactly the same mazes and sees whether they beat you." },
        { q: "Can I continue when the time runs out?", a: "Once per run you can watch a short ad to add twenty seconds to the clock and keep playing with your current score and maze. Keep it for a run that is close to your record." },
        { q: "Is MAZEQUAKE free and playable on mobile?", a: "MAZEQUAKE is completely free, needs no download and no account, and runs in your browser on phones, tablets and computers. It was designed for touch screens first, with one-finger controls and an optional gyro mode. Create a free Ragequit Arcade account if you want your name on the leaderboard." }
      ]
    }
  },
  {
    id: 'arcane-brawl',
    title: 'ARCANE BRAWL',
    description: "ARCANE BRAWL is a free 3D arena brawler where one small paladin faces an army of skeletons, elemental golems and a Dark Mage on a floating ring high above a sea of violet clouds. There is no health bar to save you and no wall to hide behind: the only way to win a fight is to knock every enemy off the edge, and the only way to lose is to get knocked off yourself. Every wave starts the same way. Skeletons drop onto the arena, raise their swords and close in from all sides, and you have one weapon to answer them, a heavy sword strike. Tap STRIKE for a quick slash that sends the nearest enemy flying, or hold it to charge a crushing blow that clears a whole group at once. The horde grows slowly from a single minion to rogues that dash at you, armored warriors that hit like a truck and skeleton mages that blast the ground around them. Every fifth wave the Dark Mage teleports across the ring, fires volleys of electric orbs and summons fresh skeletons, and from wave eight four colossal golems join the fight: the Forest Golem lashes out with thorny vines, the Fire Golem floods the floor with magma, the Ice Golem freezes the ground beneath your feet and the Rock Golem leaps across the arena to crush you. When a golem is weakened it enrages and becomes even more dangerous. Waves also bring events that change the rules, from a frozen floor where everybody slides to magma eruptions and an arcane gale that pushes everyone toward the void. Knock enemies out quickly to build combos up to GODLIKE, fill your Fury gauge to unleash instant charged strikes for a few seconds, and grab rare arena bonuses that freeze the horde, double your coins or recharge your powers. Every run earns coins and experience that you keep. Level up to unlock four holy powers, a Shockwave that blasts everything around you, a Shield that makes you immovable, a Slam that crashes down in front of you and the ultimate Judgement, a giant blade of light that falls from the sky. Spend your coins in the Armory to upgrade those powers and your Mass, Push Force, Speed, Strike and Greed, and unlock ten complete paladin outfits as you level up, from the Silver Paladin to Stormborn. Play Classic to learn the waves, switch to Hard mode for harder hits, a bigger horde and one and a half times the points, and challenge a friend on the exact same waves with a shareable link. Sign in with a free Ragequit Arcade account and your coins, levels, powers and outfits follow you on every device. ARCANE BRAWL runs free in your browser on phone, tablet and desktop, with no download.",
    thumbnail: '/thumbnails/arcane-brawl.jpg',
    category: 'arcade',
    tags: ['brawler', 'arena', '3d', 'knock off', 'sumo', 'fantasy', 'paladin', 'skeletons', 'golems', 'boss', 'waves', 'upgrades', 'hard mode'],
    size: 'large',
    shimmer: true,
    isNew: true,
    addedAt: '2026-11-08',
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic', 'hard'],
    defaultMode: 'classic',
    controls: "On mobile, drag anywhere on the screen to move with the floating joystick. Tap STRIKE for a quick sword slash or hold it to charge a heavy strike, then release. Your unlocked powers sit in an arc around the STRIKE button: Shockwave, Shield, Slam and Judgement. On desktop, move with WASD, ZQSD or the arrow keys, tap Space to strike or hold Space to charge, use C, V, B and N for the powers (same keys on QWERTY and AZERTY) and P to pause.",
    author: 'Ragequit Arcade',
    seo: {
      title: "ARCANE BRAWL - Free 3D Arena Brawler Game Online | Ragequit Arcade",
      metaDescription: "Play ARCANE BRAWL free online: a paladin knocks skeletons, golems and a Dark Mage off a floating ring. Charged strikes, holy powers, upgrades and Hard mode.",
      faq: [
        { q: "How do you play ARCANE BRAWL?", a: "You control a paladin on a floating ring. Move with the joystick or the keyboard and strike enemies with your sword to push them off the edge. An enemy that falls into the void is knocked out. Clear every enemy to finish the wave, and stay on the ring yourself: if you fall, the run is over." },
        { q: "How does the charged strike work?", a: "Tap STRIKE (or Space) for a quick slash that hits the closest enemy in front of you. Hold the button to charge: the longer you hold, the wider and harder the blow, up to a full charge that throws a whole group off the ring. Release to strike. Charging leaves you open for a moment, so charge when you have some space." },
        { q: "How is the score calculated?", a: "Each enemy you knock off the ring is worth points, from 100 for a minion to 1,500 for the Dark Mage, multiplied by your current combo up to times eight. Enemies that fall without a hit from you are worth half. Clearing a wave adds a bonus that grows with the wave number. In Hard mode every point is multiplied by one and a half. Your best score from a single run goes to the leaderboard." },
        { q: "Which enemies and bosses will I face?", a: "Skeleton minions, fast rogues, armored warriors and skeleton mages make up the horde. The Dark Mage arrives every fifth wave, teleports, fires electric orbs and summons skeletons. From wave eight, four elemental golems appear: Forest with thorny vines, Fire with magma pools, Ice with frozen ground and Rock with a crushing leap. Later waves combine several bosses." },
        { q: "What are the holy powers?", a: "Shockwave unlocks at level 2 and blasts every enemy around you. Shield unlocks at level 4 and makes you immovable for a few seconds. Slam unlocks at level 7: you leap forward and crash down on a group. Judgement, the ultimate, unlocks at level 14 and drops a giant blade of light in front of you. Each power recharges after use and can be upgraded in the Armory." },
        { q: "What are combos and Fury?", a: "Knocking enemies out quickly one after another builds a combo: BRUTAL at three, SAVAGE at five and GODLIKE at eight. The combo multiplies your points and your coins. Each knockout also fills the Fury gauge. When it is full, Fury starts and every strike is a fully charged strike for a few seconds." },
        { q: "How do coins, levels and the Armory work?", a: "Every run earns coins and experience that you keep. Experience raises your level, which unlocks powers and outfits. In the Armory you spend coins on upgrades: power levels, plus Mass (enemies push you less), Push Force, Speed, Strike and Greed (more coins). Bigger upgrades take a research time that you can shorten by watching an optional ad." },
        { q: "What is the difference between Classic and Hard?", a: "Classic is the standard run and the best place to learn every wave. Hard mode makes enemies hit harder and accelerate faster, adds more of them and makes the edge of the ring crumble faster and regrow less between waves, in exchange for one and a half times the points and more coins. Hard has its own leaderboard tab." },
        { q: "Can I continue after falling off the ring?", a: "Yes. Once per run you can watch a short ad to restart the wave you were on, keeping your score, coins and progress. Keep it for a run that is going well, especially against a boss wave." },
        { q: "Is ARCANE BRAWL free and does my progress save?", a: "ARCANE BRAWL is completely free, needs no download and runs in your browser on phones, tablets and computers. Your progress is always saved on your device. Sign in with a free Ragequit Arcade account and your coins, levels, powers and outfits are saved online and follow you on every device, and your name can appear on the leaderboard." }
      ]
    }
  },
  {
    id: 'voltlink',
    title: 'VOLTLINK',
    description: "VOLTLINK is a free connect the dots puzzle game with a neon twist: drag your finger through glowing nodes of the same color to link them, and watch the whole chain explode in a burst of electricity. It is easy to learn in ten seconds and surprisingly deep once you start planning your moves, which makes it a perfect brain game for a quick break or a long puzzle session on your phone. The grid is six nodes wide and eight nodes tall, filled with five colors and five shapes: electric yellow circles, ultraviolet diamonds, mint triangles, coral squares and sky blue hexagons, so the board stays readable even in bright sunlight. Link two or more matching neighbours, horizontally or vertically, and they disappear while new nodes fall from the top. Longer links score more, but the real power comes from shapes. Close a loop and you trigger a SURGE that clears every node of that color on the entire grid. Link six nodes to drop a BOMB, line up five in a straight row or column to build a LASER that fires across the board, and link nine or close a loop to create a PRISM, a rainbow wildcard that connects with any color. Every link and surge also fills the Overcharge meter, and when it is full all your points are doubled for a few seconds. The heart of the game is the Circuits campaign: 60 hand-tuned levels spread over five sectors, each with its own rule. Power Grid introduces glitch blocks you break by clearing next to them. Frostline adds frozen nodes and power cells you must deliver to the bottom. Chainworks locks nodes behind chains, the Virus Lab spreads a green infection every turn you ignore it, and The Core arms time bombs you have to defuse before their counter hits zero. Each sector ends with a boss: the Overload Core, the Firewall, the Swarm, the Mirror and the Leech, each one bending the rules of the grid in its own way. You have a limited number of moves per circuit, and the better your score, the more stars you earn, up to three. The first circuits are guided by a ghost hand, so new players learn every mechanic step by step. Stars and volts unlock boosters such as PRISM, BOMBS and EXTRA moves, plus new color themes like Sunset, Toxic, Glacier and Gold Rush. If you prefer pure speed, Arcade mode is a 60 second score attack where long links add time to the clock. Hard mode uses six colors, a shorter timer and armored glitches, with its own leaderboard, and the Daily board gives everyone the same grid for the day, with a result card to share. Zen mode has no clock at all, just flow and relaxing generated music that rises with your combo. You can challenge a friend with a link to the exact same board, compare your best scores on the global leaderboard, and sign in for free to keep your circuits, stars and volts on all your devices. VOLTLINK runs in your browser on mobile, tablet and desktop, with no download and no signup required. Link, loop and light up the grid.",
    thumbnail: '/thumbnails/voltlink.jpg',
    category: 'puzzle',
    tags: ['puzzle', 'connect the dots', 'dots', 'link', 'match', 'line puzzle', 'brain game', 'neon', 'levels', 'campaign', 'bosses', 'relaxing', 'daily puzzle', 'one finger'],
    size: 'medium',
    shimmer: false,
    isNew: true,
    addedAt: '2026-11-11',
    hot: false,
    landscape: false,
    plays: 0,
    modes: ['classic', 'hard', 'circuits'],
    defaultMode: 'classic',
    controls: "Drag your finger or the mouse through adjacent nodes of the same color, horizontally or vertically, then release to clear the link. Come back to a node already in your link to close a loop and trigger a SURGE. On a keyboard, move the cursor with the arrow keys, WASD or ZQSD and press Space or Enter to start and confirm a link, P to pause. Works on mobile, tablet and desktop.",
    author: 'Ragequit Arcade',
    seo: {
      title: "VOLTLINK - Free Connect the Dots Puzzle Game Online | Ragequit Arcade",
      metaDescription: "Play VOLTLINK free online: connect neon dots of the same color, close loops to clear the grid, beat 60 levels and 5 bosses. Puzzle game for mobile, no download.",
      faq: [
        { q: "How do you play VOLTLINK?", a: "Drag your finger through neighbouring nodes of the same color, horizontally or vertically, then release. The linked nodes disappear, new ones fall from the top and you score points. Longer links score more, and special shapes create power-ups that clear much more of the grid." },
        { q: "What is a SURGE?", a: "A SURGE happens when you close a loop, by dragging back onto a node already in your link. Every node of that color on the whole grid explodes at once. Surges are the fastest way to score big, reach objectives and damage bosses, so look for squares of four matching nodes." },
        { q: "How do I get BOMBS, LASERS and PRISMS?", a: "Link six or more nodes to drop a BOMB that clears the area around it. Link five in a straight line to create a LASER that fires along its whole row or column. Link nine or more, or close a loop, to create a PRISM: a rainbow wildcard that links with any color." },
        { q: "What is Overcharge?", a: "The Overcharge meter fills with every link, surge and destroyed obstacle. When it is full, all the points you score are doubled for a few seconds in Arcade, or for a few moves in Circuits. Save a big loop for that moment to multiply your score." },
        { q: "How many levels are there?", a: "The Circuits campaign has 60 levels in five sectors: Power Grid, Frostline, Chainworks, Virus Lab and The Core. Each sector adds a new obstacle, such as glitches, ice, chains, viruses or time bombs, and ends with a boss. Each circuit has a move limit and up to three stars to earn." },
        { q: "Which bosses will I face?", a: "Five bosses guard the end of each sector. The Overload Core turns nearby nodes into glitches, the Firewall burns a column you cannot link through, the Swarm spawns glitches all over the grid, the Mirror swaps two colors and the Leech steals your time and your moves. Surges and long links hit them hardest." },
        { q: "What are the Arcade, Hard, Daily and Zen modes?", a: "Arcade is a 60 second score attack where long links add time to the clock. Hard mode uses six colors, a 45 second timer and armored glitches, with its own leaderboard. The Daily board is the same grid for every player that day, with a result card to share. Zen mode has no timer at all." },
        { q: "What are volts, boosters and themes?", a: "You earn volts and stars as you play. Volts buy boosters before a circuit, such as PRISM to start with a wildcard, BOMBS to start with two bombs, or EXTRA for more moves or seconds, and unlock new color themes for the grid like Sunset, Toxic, Glacier and Gold Rush." },
        { q: "Can I challenge a friend?", a: "Yes. After an Arcade run, press Challenge a friend to share a link with your score. Your friend plays exactly the same board and sees whether they beat you. The Daily mode also gives you a card to share your result of the day." },
        { q: "Is VOLTLINK free and does my progress save?", a: "VOLTLINK is completely free, needs no download and runs in your browser on phones, tablets and computers. Your progress is always saved on your device, and if you sign in with a free account your circuits, stars and volts follow you on all your devices." },
      ]
    }
  },
  {
    id: 'hyperhop',
    title: 'HYPERHOP',
    description: "HYPERHOP is a free 3D tower jumping game where a small robot leaps from neon tower to neon tower high above a glowing city, and every jump is decided by one simple gesture: hold to charge, release to fly. The longer you hold, the farther the robot jumps, so each hop is a quick judgement of distance that feels easy at first and becomes addictive the moment you start chasing the dead centre of every tower. Land right in the middle and you score a PERFECT. Chain perfects one after another to build a combo that multiplies your points, unlock Overdrive at three in a row for double points and reach HYPER MODE at eight, where every point counts triple, the towers pulse gold and the music kicks up a gear. Release your jump exactly on the beat of the synthwave soundtrack for an extra rhythm bonus. The run never repeats. Towers come square or round, wide or narrow, and the further you climb the more of them try to stop you: crumbling towers that collapse if you wait too long, sliding towers, conveyor belts that push you toward the edge, spinners, shrinking platforms, trampolines that bounce you forward, portals that skip four towers at once and golden towers that triple your points. Forks in the path offer a risky long shot for bonus points. Flying drones guard the way: Zappers and Hunters fire lightning onto the tower you are aiming for in a steady rhythm, so you have to time your jump between two shots, and Patrol drones sweep across the gap in the air. Land a perfect on a guarded tower to smash its drone. Every twenty towers the WARDEN arrives, a giant armored boss with a red eye and a golden crown that zaps your target, sweeps a laser across the gap and finally makes the towers behind you collapse. Land perfects to hit it three times and take it down. Every fifty towers you enter a new world with its own sky and scenery, from Neon City and its striped synthwave sun to the ice spires and aurora of Glacier, the lava rocks of Magma Core, the ringed planet of Deep Space and the pyramids of the Golden Temple. Power-ups float above the gaps: a magnet that pulls coins in, a shield that saves you once, slow motion, a double jump you trigger with a tap in mid-air and a rocket that carries you over ten towers. Choose your challenge with four modes: Classic for the endless climb, Time Attack where you race a 60 second clock and every perfect adds time, Hard with smaller towers and earlier traps, and the Daily run where everyone plays the same towers. Complete three daily missions, earn coins and experience, level up and spend your coins in the shop on seven robots, six light trails and five landing effects, or try your luck with the mystery capsule. Challenge a friend with a link to your exact run, beat your own record tower marked with a flag, and sign in with a free Ragequit Arcade account to keep your coins, level and robots on every device. HYPERHOP runs free in your browser on phone, tablet and desktop, with no download.",
    thumbnail: '/thumbnails/hyperhop.jpg',
    category: 'challenge',
    tags: ['tower jump', 'jump game', 'one button', '3d', 'neon', 'synthwave', 'timing', 'precision', 'combo', 'boss', 'robot', 'endless', 'hard mode', 'daily challenge'],
    size: 'large',
    shimmer: true,
    isNew: true,
    addedAt: '2026-11-14',
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['classic', 'time', 'hard', 'daily'],
    defaultMode: 'classic',
    controls: "Press and hold anywhere on the screen to charge your jump, then release to leap toward the next tower. The longer you hold, the farther you jump. With the double jump power-up, tap again in mid-air to jump a second time. On desktop, hold and release the Space bar or the mouse button, and press P to pause. Works on mobile, tablet and desktop.",
    author: 'Ragequit Arcade',
    seo: {
      title: "HYPERHOP - Free 3D Tower Jumping Game Online | Ragequit Arcade",
      metaDescription: "Play HYPERHOP free online: hold to charge, release to jump from neon tower to neon tower. Chain perfect landings, beat the WARDEN boss and explore 5 worlds.",
      faq: [
        { q: "How do you play HYPERHOP?", a: "Press and hold anywhere on the screen to charge your jump, then release. The longer you hold, the farther the robot jumps. Land on the next tower to keep going. If you jump too short or too far, the robot falls into the void and the run is over, unless you use your one continue." },
        { q: "What is a PERFECT landing?", a: "A PERFECT is a landing in the dead centre of a tower, inside the small target ring. A normal landing gives one point, a perfect gives two points per combo step, up to sixteen. Perfect landings also destroy drones, hit the WARDEN boss and build your combo." },
        { q: "What are Overdrive and HYPER MODE?", a: "Three perfect landings in a row start Overdrive, which doubles your points for the next five towers and shows where your jump will land. Eight perfects in a row start HYPER MODE: every point counts triple until you miss the centre. The towers glow gold and the music speeds up." },
        { q: "What is the on-beat bonus?", a: "HYPERHOP has a synthwave soundtrack with a steady beat, shown by the small bar under your score. Release your jump exactly on the beat and you earn two bonus points. It is a small bonus on each hop, but over a long run it adds up quickly." },
        { q: "What are the special towers?", a: "Crumbling towers collapse if you stay too long, sliding towers move left and right, conveyors push you toward the edge, spinners rotate under your feet and some towers shrink. Trampolines bounce you to the next tower, portals skip four towers at once, boost towers give bonus points and golden towers triple your points. Forks let you try a risky long shot for five bonus points." },
        { q: "How do you beat the WARDEN boss?", a: "The WARDEN appears every twenty towers. In the first phase it zaps the tower you are aiming for on a rhythm, so jump between its shots. In the second phase a laser sweeps the gap between towers. In the last phase the towers behind you collapse. Land three perfect landings during the fight to destroy it and earn forty bonus points." },
        { q: "What are the five worlds?", a: "Every fifty towers you enter a new world with its own sky, colours and scenery: Neon City with its striped synthwave sun, Glacier with ice spires and aurora, Magma Core with volcanoes and lava rocks, Deep Space with a ringed planet and asteroids, and the Golden Temple with pyramids and floating gold rings. Each new world also gives a bonus." },
        { q: "What power-ups can I find?", a: "Power-ups float above the gaps between towers. Magnet pulls the coins in, Shield saves you from one fall or one zap, Slow-Mo slows down the charge for precise jumps, 2x Jump lets you tap in mid-air to jump again, and Rocket carries you over ten towers at once." },
        { q: "What are the game modes?", a: "Classic is the endless climb. Time Attack gives you sixty seconds, every perfect adds a second and a fall costs five. Hard mode uses smaller towers and brings traps and drones much earlier. The Daily run gives every player the same towers for the day. Each mode has its own leaderboard." },
        { q: "What can I buy in the shop?", a: "Every run earns coins and experience. In the shop you can buy seven robots, from Core to Aurum, six light trails and five landing effects, or open a mystery capsule for a random item. Three daily missions give extra coins, and your level rises with your experience." },
        { q: "Can I continue after a fall?", a: "Yes. Once per run you can watch a short ad to land back on your last tower and keep your score. After a run you can also watch an ad to double the coins you earned, or start your next Classic run directly at tower 25 with the Rocket Start." },
        { q: "Is HYPERHOP free and does my progress save?", a: "HYPERHOP is completely free, needs no download and runs in your browser on phones, tablets and computers. Your progress is always saved on your device, and if you sign in with a free Ragequit Arcade account your coins, level, missions and robots are saved online and follow you on every device." }
      ]
    }
  },
  {
    id: 'brickfury',
    title: 'BRICKFURY',
    description: "BRICKFURY is a free neon brick breaker game you can play online in your browser, built for anyone who grew up smashing walls of blocks with a paddle and a ball and wants the classic arcade feeling with a lot more fire. Slide the energy paddle to keep the ball in play, aim your rebounds and break every brick in the wall to clear the sector. It is the brick breaker you already know, rebuilt from scratch with modern game feel: screen shake, sparks and flying shards on every hit, and a soundtrack of crunches and explosions that makes each wall satisfying to destroy. The heart of BRICKFURY is the combo. Every brick you break without losing the ball raises your multiplier, all the way up to x8, so a long rally can turn a modest score into a huge one. At the same time the FURY gauge fills up. When it is full, FURY explodes across the arena: every ball turns into a fireball that burns straight through the wall and your score is doubled for several seconds. Learning when to chase the combo and when to play safe is what separates a good run from a record. The walls fight back. Armored bricks need several hits, steel bricks only melt under fire, crystal bricks always drop a power-up and orange TNT bricks blow up their neighbours, so one well placed shot can trigger a chain reaction that clears half the screen. Nine falling capsules change the game: Multiball, Laser, Wide paddle, Fireball, Magnet, Slow-Mo, Shield, an extra life, and a red Shrink capsule that you will want to dodge. From the second sector, neon drones join the fight. Drifters weave across the arena, Bombers drop explosives on your paddle, Shielders protect themselves, Splitters break into two smaller drones and Builders repair the bricks you just destroyed. Every five sectors the OVERLORD arrives, a giant armored boss with three phases of bullet patterns and reinforcements, and the arena moves to a new zone with its own sky and colours: the synthwave skyline of Neon City, the aurora and ice peaks of the Cryo Zone, the volcanoes of the Magma Core and the ringed planets of Deep Space. Choose your challenge with three modes. Classic gives you three lives and an endless series of generated walls. Hard mode gives you a single life and a faster ball, with its own leaderboard for the best players. The Daily mode serves the same wall to every player for the day, the fairest way to compare scores. Once per run you can watch a short ad to get an extra life and keep your score, and after a run you can send a link to challenge a friend on the exact same walls. BRICKFURY runs free in your browser on phone, tablet and desktop, with no download and no signup. On mobile you simply drag anywhere on the screen to move the paddle; on a computer the paddle follows your mouse or the arrow keys. Break the wall, chain the combo, unleash the FURY and climb the global leaderboard.",
    thumbnail: '/thumbnails/brickfury.jpg',
    category: 'arcade',
    tags: ['brick breaker', 'breakout', 'block breaker', 'arcade', 'paddle and ball', 'neon', 'combo', 'power-ups', 'boss', 'retro', 'classic arcade', 'hard mode', 'daily challenge'],
    size: 'medium',
    isNew: true,
    addedAt: '2026-11-15',
    hot: false,
    landscape: false,
    plays: 0,
    modes: ['classic', 'hard', 'daily'],
    defaultMode: 'classic',
    controls: "Drag anywhere on the screen to move the paddle and tap to launch the ball. On desktop, the paddle follows your mouse or the arrow keys (A and D also work); click or press Space to launch and press P to pause. Works on mobile, tablet and desktop.",
    author: 'Ragequit Arcade',
    seo: {
      title: "BRICKFURY - Free Brick Breaker Game Online | Ragequit Arcade",
      metaDescription: "Play BRICKFURY free online: the classic brick breaker reborn in neon. Chain x8 combos, unleash FURY, catch 9 power-ups and beat the OVERLORD. No download.",
      faq: [
        { q: "How do you play BRICKFURY?", a: "Move the paddle to bounce the ball into the wall and break every brick to clear the sector. On a phone, drag anywhere on the screen to move the paddle and tap to launch the ball. On a computer, move the mouse or use the arrow keys, and press Space or click to launch. If every ball falls past the paddle, you lose a life." },
        { q: "Is BRICKFURY a free brick breaker game?", a: "Yes. BRICKFURY is a completely free brick breaker game that runs in your web browser on mobile, tablet and desktop. There is nothing to download and no account is needed to play. Sign in with a free Ragequit Arcade profile if you want your scores on the global leaderboard." },
        { q: "How does the combo multiplier work?", a: "Every brick you break without losing the ball adds to your combo. Every five bricks the multiplier goes up by one step, from x1 to a maximum of x8, and every point you score is multiplied. Losing a ball resets the combo, so long rallies are the key to big scores." },
        { q: "What is FURY?", a: "The FURY gauge fills as you break bricks. When it is full, FURY triggers for a few seconds: every ball becomes a fireball that burns straight through bricks, including steel, and your score is doubled. Time it with a big combo for the highest scores." },
        { q: "What are the different types of bricks?", a: "Normal bricks break in one hit. Armored bricks need several hits. Steel bricks cannot be broken by a normal ball, only by fire from FURY or the Fireball power-up. Crystal bricks always drop a power-up. TNT bricks explode and damage the bricks around them, and they can set off other TNT bricks in a chain reaction." },
        { q: "What power-ups can I catch?", a: "Catch the falling capsules with your paddle: Multiball adds balls, Laser lets your paddle fire, Wide makes the paddle bigger, Fireball burns through bricks, Magnet catches the ball, Slow-Mo slows the ball, Shield adds a safety barrier and the heart gives an extra life. Avoid the red Shrink capsule, which makes your paddle smaller." },
        { q: "What enemies and bosses are in BRICKFURY?", a: "From the second sector, drones appear: Drifters weave across the screen, Bombers drop bombs that stun your paddle, Shielders protect themselves, Splitters break into two smaller drones and Builders repair destroyed bricks. Every five sectors you face the OVERLORD, a giant boss with three phases. Hit it with the ball to take it down." },
        { q: "What are the game modes?", a: "Classic gives you three lives and an endless run of generated walls. Hard gives you one life and a faster ball, with its own leaderboard. Daily gives every player the same wall for the day, so you can compare your score fairly with everyone else. Each mode keeps its own best score." },
        { q: "Can I continue after losing my last life?", a: "Yes. Once per run you can choose to watch a short ad to get one extra life. Your wall and your score are kept, so you can carry on exactly where you were. If you prefer, you can simply start a new run." },
        { q: "How do I challenge a friend?", a: "At the end of a run, tap Challenge a friend to share a link. Your friend plays the exact same walls and sees the score to beat. It is the best way to settle who is the real brick breaker champion." }
      ]
    }
  },
  {
    id: 'croaknight',
    title: 'CROAKNIGHT',
    description: "CROAKNIGHT is a free 3D survival game where you play a small frog knight with a golden crown and a violet cape, trapped in a haunted graveyard after dark. Your only goal is simple: survive every night until the sun comes up. Hop from tile to tile across a grid of mossy stone slabs, lash monsters with your long sticky tongue and keep moving, because the dead climb out of their graves faster with every night. It is a quick, readable arcade game that you learn in a few seconds, but every night asks for sharper reflexes and smarter routes. Each night lasts about fifty seconds. A bar at the top of the screen shows how close the dawn is, and when the sun rises every monster on the board turns to dust, you earn a big survival bonus and you can catch your breath before the next night. Your main weapon is the TONGUE. It shoots straight in front of you, up to three tiles away, stops at the first gravestone in its path and destroys the first monster it touches. The tongue also snatches fireflies on its way. LEAP throws the frog two tiles forward in a front flip: you cannot be touched in the air, and the landing stuns every monster around you, which makes it the perfect escape when you are cornered. Then there is CROAK, your super attack. Catch glowing fireflies to charge it, and when the gauge is full, release a huge shockwave that wipes out every monster around the frog at once. A MASS CROAK on a crowd is the most satisfying moment of the game and the fastest way to build a big score. Every monster has its own behaviour. Zombies shamble toward you and sometimes wander off. Skeletons are fast and relentless. Ghosts fly straight through the gravestones and fade out of reach every few seconds, so wait until they become solid again. Vampire demons lock onto your row or column and dash across the board along a glowing red line: step aside before they charge. Every third night the Grave Keeper rises, a giant masked boss with a glowing eye. He slams the ground on a three by three zone marked in red, summons zombies from the graves and blocks the dawn as long as he is alive, so you have to bring him down with your tongue and your CROAK. Carved pumpkins appear on the board and give power-ups when you hop on them: Shield blocks one hit, Frenzy doubles your points and makes your tongue faster and longer, Freeze stops every monster for a few seconds, Magnet pulls the fireflies to you and the Heart gives you an extra life. Every kill raises your combo up to x8, so chaining kills without getting hit multiplies your score. Choose between three modes, each with its own leaderboard: Easy with five hearts and slower monsters, Normal with three hearts, and Hardcore with two hearts, hungrier monsters, longer nights and no healing at dawn. Once per run you can watch a short ad to get back into the graveyard with fresh hearts, and after a run you can send a link to challenge a friend in the exact same graveyard. CROAKNIGHT runs free in your browser on phone, tablet and desktop, with no download. Swipe to hop on mobile or use the arrow keys on a computer, and see how many nights you can survive.",
    thumbnail: '/thumbnails/croaknight.jpg',
    category: 'arcade',
    tags: ['survival', 'frog', '3d', 'graveyard', 'halloween', 'monsters', 'zombies', 'ghosts', 'boss', 'arcade', 'neon', 'tongue', 'hard mode', 'mobile'],
    size: 'large',
    shimmer: true,
    isNew: true,
    addedAt: '2026-11-21',
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['easy', 'normal', 'hardcore'],
    defaultMode: 'normal',
    controls: "Swipe in any direction to hop one tile, and keep your finger down and swipe again to chain hops. Tap TONGUE to lash the first monster in front of you, LEAP to jump two tiles with a front flip, and CROAK to release the shockwave once the firefly gauge is full. On desktop, hop with the arrow keys, WASD or ZQSD, press Space for the tongue, Shift for the leap, E for CROAK and P to pause. You can also click the action buttons. Works on mobile, tablet and desktop.",
    author: 'Ragequit Arcade',
    seo: {
      title: "CROAKNIGHT - Free 3D Frog Survival Game Online | Ragequit Arcade",
      metaDescription: "Play CROAKNIGHT free online: a frog knight hops through a haunted graveyard, lashes zombies with its tongue and survives every night until dawn. No download.",
      faq: [
        { q: "How do you play CROAKNIGHT?", a: "You control a frog knight in a haunted graveyard. Swipe on the screen, or use the arrow keys, to hop from tile to tile. Monsters climb out of the graves and chase you. Destroy them with your tongue, dodge them with your leap and survive until the end of the night. If a monster touches you, you lose a heart." },
        { q: "How does the tongue attack work?", a: "Press TONGUE, or Space on a keyboard, and the frog shoots its tongue straight in front of it, up to three tiles away. The tongue stops at the first gravestone in its path and destroys the first monster it touches. It also grabs any firefly on its way. Turn toward a monster before you attack: the tongue always goes where the frog is looking." },
        { q: "What are LEAP and CROAK?", a: "LEAP throws the frog two tiles forward in a front flip. You cannot be hit in the air and the landing stuns every monster around you, so it is the best escape when you are surrounded. CROAK is your super attack: once the firefly gauge is full, it releases a shockwave that destroys every monster around the frog at once." },
        { q: "How do I charge CROAK?", a: "Collect the glowing fireflies that appear on the board. You can hop onto them or catch them with your tongue, and the Magnet power-up pulls them to you. Six fireflies fill the gauge, and every monster you destroy with the tongue adds a little more. Beating the Grave Keeper fills it completely." },
        { q: "Which monsters will I face?", a: "Zombies are slow and sometimes wander off. Skeletons are fast and chase you without stopping. Ghosts fly through gravestones and fade out of reach every few seconds, from the second night. Vampire demons, from the fourth night, dash across a whole row or column along a red line that warns you a moment before they charge." },
        { q: "How do you beat the Grave Keeper?", a: "The Grave Keeper is a giant masked boss who rises every third night. He slams the ground on a three by three zone marked in red, summons zombies from the graves and blocks the dawn as long as he is alive. Step out of the red zone, hit him with your tongue between his attacks and save your CROAK, which deals heavy damage to him." },
        { q: "What do the pumpkins do?", a: "Carved pumpkins appear on the board from time to time. Hop on one to get its power-up: Shield blocks the next hit, Frenzy doubles your points and makes your tongue faster and longer, Freeze stops every monster for a few seconds, Magnet pulls the fireflies to you and the Heart gives you an extra life. Pumpkins vanish after a while, so grab them quickly." },
        { q: "How does scoring work?", a: "Each monster is worth points, from 100 for a zombie to 200 for a vampire demon, and the Grave Keeper is worth much more. Every kill raises your combo up to x8 and multiplies the points you score, but getting hit resets it. Surviving a night gives a dawn bonus that grows with each night and with the hearts you have left." },
        { q: "What are the game modes?", a: "Easy gives you five hearts, slower monsters, shorter nights and two hearts back at every dawn. Normal gives you three hearts and one heart back at dawn. Hardcore gives you only two hearts, faster and hungrier monsters, longer nights and no healing at all. Each mode has its own leaderboard." },
        { q: "Can I continue after losing my last heart?", a: "Yes. Once per run, you can choose to watch a short ad to get back into the graveyard with fresh hearts, and the monsters next to you are swept away. Your night and your score are kept. You can also simply start a new run." },
        { q: "Can I challenge a friend?", a: "Yes. At the end of a run, tap Challenge a friend to share a link. Your friend plays in exactly the same graveyard, with the same gravestones, in the same mode, and sees the score to beat." },
        { q: "Is CROAKNIGHT free and does it work on mobile?", a: "CROAKNIGHT is completely free, needs no download and runs in your browser on phones, tablets and computers. On mobile you swipe to hop and tap the action buttons; on a computer you play with the keyboard or the mouse. Sign in with a free Ragequit Arcade profile to put your scores on the global leaderboard." },
      ]
    }
  },
  {
    id: 'rage-tap',
    title: 'RAGE TAP',
    description: "RAGE TAP is a free click speed test turned into a boxing game: tap anywhere on the screen as fast as you can, and every single tap becomes a punch thrown by a neon boxer into a hanging monster punching bag. It is the simplest game on Ragequit Arcade and maybe the most addictive one, because there is nothing to learn and everything to prove. No download and no signup: it runs in your browser on phones, tablets and computers, and a run starts in two taps. Choose your timer first. RAGE TAP has four of them: 5 seconds for a pure explosive sprint, 10 seconds for the classic clicks per second test, 30 seconds where rhythm starts to matter, and 1 minute, a real endurance test for your fingers and your forearms. A 3, 2, 1 countdown plays, the bell rings, and the clock only starts with your first tap, so you never lose a fraction of a second. Then you hammer. Your taps are counted the instant your finger or your mouse touches the screen, before anything is drawn, so the animation can never slow you down or swallow a tap, even at very high speed. On a phone you can tap with as many fingers as you like, and two thumbs is the fastest way to play. On a computer only the left mouse button counts. Your score is the number of taps you land before the clock runs out, and the game also shows your clicks per second, or CPS, the number every click speed fan wants to know. Mobile and desktop players do not tap the same way, so they never share a leaderboard: there is one board per timer for mobile and one per timer for desktop, eight leaderboards in total. Everything on screen reacts to your speed. A tachometer gauge shows your live CPS and swings into the red zone, the crowd around the ring jumps higher, camera flashes go off, the arena heats up in red and the monster bag swings, grimaces, gets dizzy and collects sticking plasters before it explodes at the final bell. Live ranks push you on, from Turtle and Rabbit to Cheetah, Machine Gun, Rage God and Beyond Human. A pace counter tells you in real time whether you are ahead of your record or behind it, and every 25 taps in a row trigger a POW. At the end you get your rank, your taps, your average CPS, your peak CPS, your best combo and a graph of your speed second by second, so you can see exactly where your fingers started to burn. Then challenge a friend with a link to the same timer, or unlock new color themes such as Toxic, Ice and Gold. Each theme costs one optional ad and stays yours forever, and themes only change the look, never the score. How many taps can you land in ten seconds?",
    thumbnail: '/thumbnails/rage-tap.jpg',
    category: 'challenge',
    tags: ['click speed test', 'cps test', 'tap', 'clicker', 'boxing', 'speed', 'reflex', 'challenge', 'neon', 'mobile', 'two players', 'leaderboard'],
    size: 'large',
    shimmer: true,
    isNew: true,
    addedAt: '2026-11-22',
    hot: true,
    landscape: false,
    plays: 0,
    modes: ['mobile-5s', 'mobile-10s', 'mobile-30s', 'mobile-60s', 'desktop-5s', 'desktop-10s', 'desktop-30s', 'desktop-60s'],
    defaultMode: 'mobile-10s',
    controls: "Tap anywhere on the screen as fast as you can: every tap is a punch. On a phone or tablet you can tap with several fingers at once, and two thumbs is the fastest technique. On a computer, click anywhere with the left mouse button; right clicks and the keyboard do not count. Pick a timer (5 s, 10 s, 30 s or 1 min), press PLAY or Space, wait for the 3, 2, 1 countdown and start tapping: the clock starts with your first tap.",
    author: 'Ragequit Arcade',
    seo: {
      title: "RAGE TAP - Free Click Speed Test & CPS Game Online | Ragequit Arcade",
      metaDescription: "Play RAGE TAP free online: a click speed test where every tap is a punch. Test your CPS in 5 s, 10 s, 30 s or 1 min, with mobile and desktop leaderboards.",
      faq: [
        { q: "How do you play RAGE TAP?", a: "Pick a timer, press PLAY and tap anywhere on the screen as fast as you can until the clock runs out. Every tap is a punch from your boxer on the monster bag. Your score is the number of taps you land, and the game also shows your clicks per second." },
        { q: "What is CPS?", a: "CPS means clicks per second. It is your number of taps divided by the length of the run. RAGE TAP shows your live CPS on the gauge during the run, then your average CPS and your peak CPS at the end, with a graph of your speed second by second." },
        { q: "Which timer should I choose?", a: "5 seconds is a pure sprint where reaction and explosive speed decide everything. 10 seconds is the classic click speed test. 30 seconds starts to test your rhythm, and 1 minute is a real endurance challenge where keeping a steady pace matters more than your first burst. Each timer has its own leaderboards." },
        { q: "Why are there separate mobile and desktop leaderboards?", a: "Tapping a touch screen with several fingers and clicking a mouse are very different, so comparing them would not be fair. The game detects the real input of your first tap, finger or mouse, and your run goes to the matching board. With four timers, that makes eight leaderboards." },
        { q: "Can I tap with several fingers on mobile?", a: "Yes. On a phone or tablet every finger that touches the screen counts as a tap, and alternating two thumbs is the fastest technique. On a computer only the left mouse button counts, and right clicks or the keyboard are ignored." },
        { q: "Can the animation make me lose taps?", a: "No. Each tap is recorded the instant it touches the screen, before the boxer, the bag and the effects are drawn. The animation only follows your taps, so it can never slow you down or drop one, even at very high speed." },
        { q: "What are the ranks?", a: "Your rank depends on your average CPS: Turtle under 4, Rabbit from 4, Cheetah from 6, Machine Gun from 8, Rage God from 10 and Beyond Human from 13. The live rank appears on the gauge during the run, and the final one on the results screen." },
        { q: "Are autoclickers allowed?", a: "On desktop, no: a run with an inhumanly steady rhythm, or with an average speed out of human reach, is not ranked and its score is not sent to the leaderboard. Every left click made before the bell is counted, however fast. On mobile there is no filter at all: every tap on the screen counts, with as many fingers as you like and at any speed." },
        { q: "What do the themes do?", a: "Themes change the colors of the ring, the bag, the boxer and the effects. Rage is free, and Toxic, Ice and Gold each unlock with one optional ad and stay yours forever. Themes never change your score. If you are signed in, your unlocked themes are kept on your account and follow you on every device." },
        { q: "Is RAGE TAP free and does it work on mobile?", a: "RAGE TAP is completely free, needs no download and runs in your browser on phones, tablets and computers. Sign in with a free Ragequit Arcade profile to put your scores on the global leaderboards and challenge your friends with a link." },
      ]
    }
  },
  {
    id: 'quadshock',
    title: 'QUADSHOCK',
    description: "QUADSHOCK is a free connect four game with a neon, electric twist: you drop heavy glowing discs into an upright grid and try to line up four in a row before the computer does. It runs in your browser on phones, tablets and computers, with no download and no signup, and a run starts with a single tap on PLAY. Unlike the classic board game that you play once and put back in the box, QUADSHOCK is a run. You play round after round against one CPU opponent that gets a little smarter every time you beat it, and you keep going until it finally catches you. The goal is simple: win as many rounds as you can and post the highest score possible.\n\nThe rounds take turns. You open round 1, the CPU opens round 2, you open round 3, and so on, so you learn to play both sides of the opening. Every round you win adds points: a base reward that grows with the round number, a speed bonus when you connect in only a few moves, and a winning streak multiplier that climbs from x2 to x5. A draw pays a small bonus and sends you to the next round. A loss ends the run, but once per run you can choose to watch a short ad to replay the round you just lost from an empty grid, with your score and your coins kept. Each move also has a timer: 18 seconds in the first rounds, a little less later on, never under 12. If it runs out, a disc drops for you.\n\nThe grid does not stay the same. From round 3, golden crystal blocks sit inside the grid: discs land on them and no line can pass through them, so the classic patterns stop working and you have to read the board again. Every fourth round is a TRIO bonus round on a small 5 x 4 grid where three in a row is enough to win. Win it for a big bonus, lose it and nothing happens, the run goes on. Every sixth round is a MEGA grid of 8 x 7, worth half as many points again. The discs feel heavy: they fall, bounce, shake the grid and send a shockwave across the board.\n\nConnecting is where the shock comes in. A lightning bolt runs along every line you complete, over its full length. Line up five in a row and the bolt crosses all five discs and pays a long line bonus. Complete a horizontal, a vertical and a diagonal with a single disc and you trigger a CROSS SHOCK, with one bolt per line and a bonus for every extra line. During each round you also score small bonuses for quick moves, for blocking a line the CPU was about to finish and for creating your own threats.\n\nEvery round pays coins, a few even when you lose, and at the end of a run you can watch an optional ad to double them. Spend them in the Disc Shop on eight disc colors: Lime, Ice, Solar, Volt, Ultra, Mint, Plasma and the rainbow Prism. Colors only change the look of your discs, never the score. Sign in with a free Ragequit Arcade profile to put your best run on the global leaderboard, then challenge a friend with a link that gives them exactly the same grids. How many rounds can you win before the grid fries you?",
    thumbnail: '/thumbnails/quadshock.jpg',
    category: 'brain',
    tags: ['connect four', 'connect 4', 'four in a row', 'board game', 'strategy', 'puzzle', 'brain', 'ai opponent', 'neon', 'lightning', 'mobile', 'leaderboard'],
    size: 'medium',
    isNew: true,
    addedAt: '2026-11-25',
    landscape: false,
    plays: 0,
    modes: ['classic'],
    defaultMode: 'classic',
    controls: "Tap a column to drop your disc, or slide your finger across the grid to aim and lift it to drop. On a computer, click a column, or move with the left and right arrow keys and press Space, Enter or the down arrow to drop; the number keys 1 to 8 drop straight into a column. Press P or Escape to pause. You open the odd rounds and the CPU opens the even ones.",
    author: 'Ragequit Arcade',
    seo: {
      title: "QUADSHOCK - Free Neon Connect 4 Game Online | Ragequit Arcade",
      metaDescription: "Play QUADSHOCK free online: a neon connect four game against a CPU that levels up every round. Line up 4, chain wins and unlock disc colors.",
      faq: [
        { q: "How do you play QUADSHOCK?", a: "Drop your discs into the grid, one per turn, and be the first to line up four in a row: horizontally, vertically or diagonally. Each round you win adds points and sends you to the next round against a slightly stronger CPU. One loss ends the run, so the goal is to win as many rounds as possible and set the highest score." },
        { q: "Who starts each round?", a: "The rounds alternate. You open round 1, the CPU opens round 2, you open round 3, and so on. Opening a round is an advantage, so the rounds where the CPU starts are the ones where you need to defend carefully and wait for your chance." },
        { q: "What happens when I lose a round?", a: "A lost round normally ends the run and your score is sent to the leaderboard. Once per run, you can choose to watch a short ad instead: the round you just lost starts again from an empty grid, and your score and your coins are kept." },
        { q: "What are TRIO and MEGA rounds?", a: "Every fourth round is a TRIO bonus round on a small 5 x 4 grid where three in a row is enough to win. Winning it pays a big bonus and losing it costs nothing. Every sixth round is a MEGA round on a bigger 8 x 7 grid, worth 50% more points." },
        { q: "What is a CROSS SHOCK?", a: "When one disc completes several lines at once, for example a horizontal, a vertical and a diagonal, the game shows one lightning bolt on each line and you score a CROSS SHOCK bonus for every extra line. Lining up five or more in a row also pays a long line bonus, and the bolt runs along the whole line." },
        { q: "How long do I have for each move?", a: "Each move has a timer shown under the grid: 18 seconds in the first rounds, slowly going down in later rounds but never under 12 seconds, and 12 seconds in TRIO rounds. If the timer runs out, a disc is dropped for you, so it pays to think fast. Moves played in under two seconds also earn a QUICK bonus." },
        { q: "How do I earn coins and what can I buy?", a: "You earn coins after every round: more for a win, more again in TRIO and MEGA rounds, and a few even when you lose. At the end of a run you can watch an optional ad to double the coins of that run. Coins unlock eight disc colors in the Disc Shop. Colors are cosmetic and never change the score." },
        { q: "Is QUADSHOCK free and does it work on mobile?", a: "QUADSHOCK is completely free, needs no download and runs in your browser on phones, tablets and computers. You tap a column on a touch screen, or use the mouse or the keyboard on a computer. Sign in with a free Ragequit Arcade profile to put your scores on the global leaderboard, and use the Challenge button to send a friend the same grids." },
      ]
    }
  },
]

/* Badge NEW : visible 7 jours après la date de mise en ligne (addedAt, AAAA-MM-JJ).
   Un jeu sans addedAt garde la valeur isNew écrite à la main. */
export const NEW_BADGE_DAYS = 7
for (const g of games) {
  if (g.isNew && g.addedAt) {
    const age = Date.now() - Date.parse(g.addedAt + 'T00:00:00Z')
    g.isNew = age >= 0 && age < NEW_BADGE_DAYS * 86400000
  }
}
