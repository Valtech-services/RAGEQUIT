/* =====================================================================
   BLOG.JS — Ragequit Arcade
   Articles du blog. Ajouter un article = ajouter une entrée ici.
   Le contenu (content) est un tableau de blocs pour un rendu propre :
     { type: 'p',  text }      → paragraphe
     { type: 'h2', text }      → sous-titre
     { type: 'ul', items:[] }  → liste à puces
   ===================================================================== */

export const posts = [
  // Les articles seront ajoutés ici, un par un.
  // Exemple de structure (à remplir) :
  // {
  //   slug: 'why-we-build-our-own-games',
  //   title: 'Why We Build Our Own Games',
  //   date: '2026-09-01',
  //   author: 'Ragequit Arcade',
  //   excerpt: 'Une phrase de résumé qui donne envie de lire.',
  //   image: '/blog/why-we-build.jpg',
  //   seo: {
  //     title: '... | Ragequit Arcade',
  //     metaDescription: '...',
  //   },
  //   content: [
  //     { type: 'p', text: '...' },
  //     { type: 'h2', text: '...' },
  //     { type: 'p', text: '...' },
  //   ],
  // },
     {
    slug: 'why-we-build-our-own-games',
    title: 'Why We Build Our Own Games',
    date: '2026-08-28',
    author: 'Ragequit Arcade',
    excerpt: 'Most browser game portals are just reposting the same clones. We took the harder road: every game on Ragequit Arcade is built by us, from scratch. Here is why.',
    image: '/blog/why-we-build-our-own-games.jpg',
    seo: {
      title: 'Why We Build Our Own Games | Ragequit Arcade',
      metaDescription: 'The story behind Ragequit Arcade: why we design and build every browser game ourselves instead of reposting clones, and what it means for the games you play.',
    },
    content: [
      { type: 'p', text: 'If you have spent any time on free browser game sites, you have probably noticed something: they all look the same. The same block-stacking game, the same 2048 clone, the same endless runner, reposted across a thousand different portals with a thousand different names. Most of these sites do not make games. They collect them, wrap them in ads, and move on. We decided to do the opposite.' },
      { type: 'p', text: 'Ragequit Arcade is an independent studio, and every single game you can play here was designed and built by us, from a blank file. No third-party clones, no licensed re-skins, no pay-to-win traps. When you play Virus Lab or Bird Blitz or OCTAFLUX, you are playing something that exists nowhere else on the internet. That was a deliberate choice, and it was the harder one. Here is why we made it.' },

      { type: 'h2', text: 'Because clones are a race to the bottom' },
      { type: 'p', text: 'The easy way to run a game portal is to grab a catalogue of existing HTML5 games, embed them, and fill the page with advertising. It costs almost nothing and it scales instantly. The problem is that everyone else is doing exactly the same thing, with exactly the same games. There is no reason for a player to choose one clone portal over another, so these sites compete on the only thing left: cramming in more ads. That is a race to the bottom, and the player always loses.' },
      { type: 'p', text: 'We did not want to build another interchangeable portal. We wanted a place with an identity, where the games are the reason you come back, not an afterthought buried under pop-ups. The only way to get there was to build the games ourselves.' },

      { type: 'h2', text: 'Because original games can do things clones cannot' },
      { type: 'p', text: 'When you build your own engine, you are free to try ideas that do not exist yet. Virus Lab is a good example: it is a strategy game where you do not control your virus directly, you program its genome as a short sequence of actions and then release it to fight for territory on its own. You will not find that concept in a clone catalogue, because nobody had made it before. Same with OCTAFLUX, where you spin a glowing octagon to catch and match falling pieces, or Stellar Forge, an idle clicker built around the real Kardashev scale of civilizations.' },
      { type: 'p', text: 'Owning the code also means we can keep improving. When a player reports a bug or suggests a tweak, we can actually fix it, because it is our game. Clone portals cannot do that. They are stuck with whatever they embedded.' },

      { type: 'h2', text: 'Because we play our own games' },
      { type: 'p', text: 'The name Ragequit Arcade is a joke about how it feels to lose one more run when you were so close. That feeling only matters if the games are actually good enough to make you care. We build titles we genuinely want to play ourselves, tune them until a run feels fair but punishing, and only put them online when they are fun to lose at. If a game is not good enough to make us say "one more try", it does not ship.' },

      { type: 'h2', text: 'Because free should not mean cheap' },
      { type: 'p', text: 'Every game on Ragequit Arcade is completely free, and it will stay that way. Free to play does not have to mean low quality or aggressive monetization. We keep the games free with light, non-intrusive advertising and optional rewarded ads you choose to watch, never forced pop-ups that interrupt your run. You can jump in instantly with no account, or create a free profile to save your scores and climb the global leaderboards. That is the whole deal, and there is no catch.' },

      { type: 'h2', text: 'What comes next' },
      { type: 'p', text: 'We add new games regularly, and every one of them follows the same rule: built by us, original, free, and made to be replayed. Some will be fast arcade reflex games, some will be deeper strategy or brain challenges, but none of them will be a clone. If that sounds like the kind of arcade you want to spend time in, you are in the right place. Pick a game, start a run, and see how long it takes before you ragequit. Then hit play again.' },
    ],
  },
     {
    slug: 'best-free-browser-games-2026',
    title: 'The Best Free Browser Games to Play Right Now',
    date: '2026-08-31',
    author: 'Ragequit Arcade',
    excerpt: 'No downloads, no installs, no sign-up walls. Here are the best free games you can play instantly in your browser on Ragequit Arcade, whatever your mood.',
    image: '/blog/best-free-browser-games.jpg',
    seo: {
      title: 'The Best Free Browser Games to Play Right Now | Ragequit Arcade',
      metaDescription: 'A guide to the best free browser games you can play instantly with no download: arcade, puzzle, strategy, idle and shooting games on Ragequit Arcade.',
    },
    content: [
      { type: 'p', text: 'The best thing about browser games is that there is no barrier between you and the fun. No store, no download, no install, no account required. You click, and you are playing. Every game on Ragequit Arcade works that way, instantly, on your phone or your computer. But with a growing catalogue, where do you start? Here is our honest guide to what to play right now, sorted by the kind of mood you are in.' },

      { type: 'h2', text: 'If you want fast reflexes and high scores' },
      { type: 'p', text: 'For pure arcade adrenaline, start with STAQ, a one-tap block-stacking game where a single perfectly timed drop can extend a run for minutes, and a single mistake ends it. If you prefer speed, Neon Rush throws you down a hypnotic 3D neon tunnel where you dodge across three lanes and chain near-misses for combos. And Snake Candy Arena reinvents the classic snake with candy, combo multipliers and bonus animals, so the old formula suddenly has real depth.' },

      { type: 'h2', text: 'If you want to think, not just react' },
      { type: 'p', text: 'Some of our best games reward your brain more than your thumbs. OCTAFLUX is a mesmerizing puzzle where you spin a glowing octagon to catch and match falling pieces, setting up cascading chains for huge scores. FLASHOUT is a neon memory game where the board flashes its symbols for a split second, then flips them face down, and you race a draining timer to match every pair from memory. Both are simple to grasp and surprisingly hard to master.' },

      { type: 'h2', text: 'If you want something you have never played before' },
      { type: 'p', text: 'Virus Lab is the game we are proudest of, because nothing else plays like it. You do not control your virus directly. Instead you program its genome as a short sequence of actions, then release it into a petri dish to spread and fight an enemy strain for territory. Beat a 30-level campaign, then publish your best strain to the Arena and battle the real creations of other players. It is part puzzle, part programming, part living simulation, and it is completely unique to Ragequit Arcade.' },

      { type: 'h2', text: 'If you want to defend something (loudly)' },
      { type: 'p', text: 'Bird Blitz is our fast, funny tower-defense shooter. The world\u2019s greatest monuments — the Eiffel Tower, Big Ben, the Statue of Liberty and seven more — are under siege by an endless flock of birds, and only you can keep them clean. Shoot pigeons, seagulls and giant bosses out of the sky, chain your hits for combo multipliers, and spend your gold on shotguns, shields and air strikes. Ten monuments, permanent upgrades and daily challenges give it real staying power.' },

      { type: 'h2', text: 'If you want to relax and watch numbers grow' },
      { type: 'p', text: 'Sometimes you do not want pressure, you want progress. Stellar Forge is a deep, science-based idle clicker where you start with a single hand pick and build all the way to a galactic civilization. Mine ore, automate production, build a real energy grid and climb the actual Kardashev scale from planet to galaxy. It keeps producing even while you are away, so every time you come back there is progress waiting for you.' },

      { type: 'h2', text: 'If you want to settle a score with a friend' },
      { type: 'p', text: 'Rage Hockey is our flagship head-to-head game: fast, brutal air hockey with three arenas, a merciless AI and a local two-player mode. Grab a friend, pick a table, and play first to seven. The Bumper arena, with its chaotic central bouncer, is where friendships go to die. In the best way.' },

      { type: 'h2', text: 'The best part: they are all free' },
      { type: 'p', text: 'Every game above is completely free to play, forever, with no download and no signup. Create a free account if you want to save your scores and climb the global leaderboards, but you never have to. Pick whichever one matches your mood, start a run, and see how long it takes before you ragequit. Then, of course, hit play again.' },
    ],
  },
     {
    slug: 'virus-lab-strategy-guide',
    title: 'Virus Lab Strategy: Why a Shorter Genome Wins',
    date: '2026-09-02',
    author: 'Ragequit Arcade',
    excerpt: 'The biggest mistake new Virus Lab players make is filling every genome slot. The real secret is a short, fast, repeating sequence. Here is how to conquer the petri dish.',
    image: '/blog/virus-lab-strategy.jpg',
    seo: {
      title: 'Virus Lab Strategy Guide: Why a Shorter Genome Wins | Ragequit Arcade',
      metaDescription: 'A strategy guide for Virus Lab: why a short 4-action genome beats a full one, how to use dash to conquer the petri dish fast, and how to climb the Arena.',
    },
    content: [
      { type: 'p', text: 'Virus Lab is a strategy game where you do not steer your virus, you program it. You build a genome — a short list of actions your strain repeats over and over — and then release it to spread and fight for territory on its own. Because the game hands you genome slots to unlock, most new players assume the goal is to fill them all. It is not. In fact, the single biggest mistake you can make in Virus Lab is building a long, crowded genome. Here is why, and how to win instead.' },

      { type: 'h2', text: 'The core rule: speed beats complexity' },
      { type: 'p', text: 'Here is the insight that changes everything. In Virus Lab, the faster a sequence is played and repeated, the more effective your virus becomes. A genome is a loop: the shorter the loop, the more times it runs in the same amount of time. A long, elaborate genome with eight clever actions looks powerful, but it cycles slowly, which means your virus acts less often and spreads more slowly. A short, brutal genome cycles constantly, and constant action wins territory.' },
      { type: 'p', text: 'So forget about filling every slot. Your goal is not a full genome, it is a fast one.' },

      { type: 'h2', text: 'Aim for four actions, maximum' },
      { type: 'p', text: 'As a rule of thumb, keep your genome to about four actions at most. Four is enough to express a real strategy — move, expand, attack, repeat — while staying short enough to cycle rapidly. Every action you add beyond that slows the whole loop down for diminishing returns. When you unlock a new slot, resist the urge to use it just because it is there. Ask yourself: does this action make my loop meaningfully better, or does it just make it slower?' },

      { type: 'h2', text: 'Conquer the dish fast with dash' },
      { type: 'p', text: 'The key to a short, aggressive genome is fast movement, and that is where dash comes in. Rather than slowly advancing and turning across the petri dish, use dash to cover ground quickly and claim territory before the enemy strain can react. A genome built around dashing out, expanding, and looping back conquers the dish far faster than a cautious, step-by-step strain. Early territory control snowballs: the more of the dish you hold, the more room you have to grow, and the harder you are to push back.' },
      { type: 'p', text: 'Think of it this way. You are not trying to build the cleverest virus. You are trying to build the fastest one that grabs the most space, soonest.' },

      { type: 'h2', text: 'Test in the campaign, then climb the Arena' },
      { type: 'p', text: 'The 30-level campaign is your laboratory. Use it to test short genomes against increasingly clever enemy strains, and pay attention to which loops snowball and which stall out. Winning campaign levels earns DNA, which you spend to unlock new actions — but remember, unlocking an action does not mean you should use it in every build.' },
      { type: 'p', text: 'Once you have a fast, reliable four-action strain, publish it to the Arena. There you battle the real genomes of other players in asynchronous PvP, and every win climbs your Arena score and your place on the global leaderboard. The players at the top are almost never the ones with the most complex viruses. They are the ones with the tightest, fastest loops.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Virus Lab rewards restraint. Keep your genome short, around four actions. Build it around fast movement like dash to seize the petri dish quickly. And stop thinking of empty genome slots as something to fill. In this game, a lean, fast, relentless strain will beat a bloated, clever one almost every time. Now go engineer something nasty.' },
    ],
  },
     {
    slug: 'flashout-memory-tips',
    title: 'How to Get a High Score in FLASHOUT',
    date: '2026-09-03',
    author: 'Ragequit Arcade',
    excerpt: 'FLASHOUT looks like a simple memory game, but the players at the top of the leaderboard use real techniques. Here is how to memorize faster and score higher.',
    image: '/blog/flashout-tips.jpg',
    seo: {
      title: 'How to Get a High Score in FLASHOUT: Memory Tips | Ragequit Arcade',
      metaDescription: 'Memory tips and strategy for FLASHOUT, the neon memory match game: how combos work, why speed matters, and how to score higher in Normal and Hard mode.',
    },
    content: [
      { type: 'p', text: 'FLASHOUT is a neon memory game with a simple hook: at the start of each level, the board flashes all of its glowing symbols for a split second, then flips them face down. You then race a draining timer to match every pair from memory. It sounds easy. It is not, especially as the grid grows. But the players at the top of the leaderboard are not just lucky or gifted with perfect memory. They use techniques you can learn. Here they are.' },

      { type: 'h2', text: 'Understand what you are actually scored on' },
      { type: 'p', text: 'The first thing to know is that your score, not the level you reach, is what ranks you. Two players can both reach level 8, but the one who did it faster, with fewer mistakes and bigger combos, scores far higher. That means your goal is never just to survive a level. It is to clear it cleanly and quickly. Play with that in mind from level one.' },

      { type: 'h2', text: 'Chase the combo, because it multiplies everything' },
      { type: 'p', text: 'Matching pairs in a row without a mistake builds a combo streak, and that streak multiplies the points you earn. This is the single most important scoring mechanic in the game. A clean run where you never break your combo will massively outscore a sloppy run at the same level. One wrong flip resets the multiplier, so precision matters more than raw speed. It is better to take an extra half-second to be sure than to guess, miss, and lose your entire combo.' },

      { type: 'h2', text: 'Memorize in chunks, not card by card' },
      { type: 'p', text: 'When the board flashes, do not try to memorize every single card individually — your brain cannot hold that many separate items in a split second. Instead, group them. Notice pairs of positions, or remember symbols by region: "two stars on the left, a heart top-right." Grouping information into chunks is how memory experts hold far more than the average person, and it works perfectly here. As the grids get bigger, chunking is the difference between panic and control.' },

      { type: 'h2', text: 'Clear the pairs you are sure of first' },
      { type: 'p', text: 'When the cards flip and the clock starts, resist the urge to hunt for the hardest pair. Immediately clear the pairs you are completely certain about. This does three things: it banks guaranteed points, it keeps your combo alive with safe matches, and it removes cards from the board so the ones you are unsure about become easier to work out by elimination. Start with certainty, and let the tricky pairs solve themselves.' },

      { type: 'h2', text: 'Normal to warm up, Hard for the leaderboard' },
      { type: 'p', text: 'FLASHOUT has two modes with separate leaderboards. In Normal mode, a wrong match only costs you time, so it is the place to practice your chunking and build confidence. In Hard mode, every incorrect flip immediately subtracts two seconds from your timer, which punishes guessing hard. Hard mode is where the serious scores are set, but do not jump into it until your memory technique is solid in Normal. Master the chunking first, then bring it to Hard.' },

      { type: 'h2', text: 'Put it together' },
      { type: 'p', text: 'Score, not level, is what counts. Protect your combo at all costs. Memorize in chunks, not card by card. Clear your certain pairs first to bank points and thin the board. And graduate to Hard mode only once your technique holds up under pressure. Do all that, and you will climb the FLASHOUT leaderboard faster than you thought possible. Now go and flash out.' },
    ],
  },
]

// Trouve un article par son slug.
export function getPost(slug) {
  return posts.find(p => p.slug === slug) || null
}
