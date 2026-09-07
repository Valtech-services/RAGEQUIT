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
    date: '2026-08-25',
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
    date: '2026-08-26',
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
    date: '2026-08-27',
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
    date: '2026-08-28',
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
   {
    slug: 'the-goal-of-ragequit-arcade',
    title: 'The Real Goal of Ragequit Arcade',
    date: '2026-08-29',
    author: 'Ragequit Arcade',
    excerpt: 'Ragequit Arcade is not just a games site. It is the first step of a much bigger plan: to fund an independent French game studio, one free browser game at a time.',
    image: '/blog/the-goal.jpg',
    seo: {
      title: 'The Real Goal of Ragequit Arcade | Ragequit Arcade',
      metaDescription: 'The vision behind Ragequit Arcade: building free browser games to fund an independent French game studio and make game development a full-time reality.',
    },
    content: [
      { type: 'p', text: 'Most people who land on Ragequit Arcade see a collection of free browser games and think that is the whole story. It is not. Behind every game on this site is a single person, an independent developer building each title from scratch, and a plan that is much bigger than a games portal. This article is where I explain what that plan actually is, because I think you deserve to know what you are really part of when you play here.' },

      { type: 'h2', text: 'It started with a simple frustration' },
      { type: 'p', text: 'Like a lot of people, I grew up loving games and dreaming of making them. And like a lot of people, I assumed that dream was out of reach unless you joined a big studio or raised a fortune. So I started small, in the only way I could: alone, in the evenings, teaching myself to build browser games that anyone could play instantly, for free. Ragequit Arcade is the result. Every game here, from the strategy of Virus Lab to the chaos of Bird Blitz, was made by one person who refused to wait for permission.' },

      { type: 'h2', text: 'The goal: a site that funds itself' },
      { type: 'p', text: 'The first milestone is simple and honest: I want Ragequit Arcade to become self-sustaining. That means the site needs to generate enough revenue, through light advertising and a growing audience, to support the work that goes into it. Not to get rich, but to make this real. The dream is to reach the point where I can dedicate myself to this full time, instead of squeezing it into the hours around a day job. Every player who visits, plays and shares a game brings that milestone a little closer.' },

      { type: 'h2', text: 'The bigger dream: a real game studio' },
      { type: 'p', text: 'But a self-funding site is not the end goal. It is the foundation for something much more ambitious: building a genuine independent French game studio. The idea is that Ragequit Arcade, the site you are playing on right now, becomes the engine that finances that studio, with no need for outside credit or investors calling the shots. The browser games fund the team. The team builds bigger, more sophisticated games, made for players, not for shareholders. Games with real depth and craft, created by people who care about the medium.' },
      { type: 'p', text: 'That is the vision: start with free browser games one person can build, use them to fund a studio, and use that studio to make the kind of games I always dreamed of making. It is a long road, and I am at the very beginning of it.' },

      { type: 'h2', text: 'Why I am telling you this' },
      { type: 'p', text: 'I am telling you because Ragequit Arcade is not a faceless content farm, and I want that to be obvious. It is a real project with a real person behind it and a clear reason to exist. When you play a game here, leave a score, report a bug or share a run with a friend, you are not just passing time. You are helping prove that an independent developer can build something real from nothing. That is not marketing. That is genuinely how this works.' },

      { type: 'h2', text: 'How you can be part of it' },
      { type: 'p', text: 'The best thing you can do is simply play, and if you enjoy a game, share it. Create a free account to save your scores and climb the leaderboards. Follow along on social media to see new games as they launch. Every bit of that helps the site grow, which helps fund the studio, which brings the bigger games closer to reality. Thank you for being here at the start. The best is genuinely yet to come.' },
    ],
  },
     {
    slug: 'rooftop-rush-tips',
    title: 'Rooftop Rush: How to Chain a GODLIKE Combo',
    date: '2026-08-30',
    author: 'Ragequit Arcade',
    excerpt: 'One plank, one tap, one very long drop. Here is how to master the timing in Rooftop Rush and push your combo all the way to a screen-shaking GODLIKE streak.',
    image: '/blog/rooftop-rush-tips.jpg',
    seo: {
      title: 'Rooftop Rush: How to Chain a GODLIKE Combo | Ragequit Arcade',
      metaDescription: 'A tips and strategy guide for Rooftop Rush: how to time your plank, hit the red zone for perfect drops, chain combos up to GODLIKE and beat your high score.',
    },
    content: [
      { type: 'p', text: 'Rooftop Rush looks simple. You stretch a plank between two rooftops, drop it, and run across. But anyone who has played it knows the truth: it is one of those games where a single mistimed tap turns a beautiful run into a very long fall, and that is exactly what makes it so addictive. If you keep dropping into the gap or walking off the end, this guide is for you. Here is how to master the timing and start chaining real combos.' },

      { type: 'h2', text: 'Understand the plank before anything else' },
      { type: 'p', text: 'The whole game comes down to one thing: the length of your plank. You hold to make it grow, and release to drop it. If it is too short, it does not reach the next rooftop and your hero falls into the gap. If it is too long, it overshoots and your hero walks straight off the far edge. The sweet spot is a plank exactly as long as the gap is wide. Before you worry about combos or speed, train your eye to judge that distance. Everything else is built on it.' },

      { type: 'h2', text: 'The red zone is where the game is won' },
      { type: 'p', text: 'Each rooftop has a small red zone in its center. If the tip of your plank lands on that red zone, you score a Perfect. Perfects are not just for show: they build your combo multiplier. Landing anywhere safe keeps you alive, but landing on the red zone is what makes your score explode. So do not just aim to survive each gap. Aim to plant that plank tip right in the middle of the next rooftop, every single time.' },

      { type: 'h2', text: 'Climb the combo tiers' },
      { type: 'p', text: 'Chaining perfects without a mistake pushes your multiplier up through escalating tiers, all the way to a screen-shaking GODLIKE streak at the top. As you climb, the game rewards you with more intense feedback: harder camera shake, brighter flashes, a bigger multiplier on screen. This is where the huge scores come from. Ten rooftops crossed with a GODLIKE multiplier are worth vastly more than ten crossed sloppily. The combo is not a bonus, it is the whole scoring engine.' },

      { type: 'h2', text: 'The rage moment, and how to avoid it' },
      { type: 'p', text: 'Here is the catch: a single bad drop breaks the entire chain, and the game makes sure you feel it with a brutal COMBO LOST moment. The higher you climbed, the more it hurts. The key to avoiding it is discipline. When your combo is already high, do not get greedy or rush. A safe, careful perfect that keeps the streak alive is always worth more than a fast, risky drop that ends it. Find a steady rhythm and stick to it. Panic is what kills combos, not the game.' },

      { type: 'h2', text: 'Normal to learn, Hard for glory' },
      { type: 'p', text: 'Rooftop Rush has two modes with separate leaderboards. Normal mode gives you a little more margin, so it is where you should learn the rhythm and get comfortable hitting red zones. Hard mode tightens the timing and demands far more precise planks, and its leaderboard is where the truly skilled players prove themselves. Master your timing in Normal first, then bring that muscle memory to Hard when you are ready to compete for a top score.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Judge the gap, aim for the red zone, and protect your combo like your life depends on it, because on these rooftops it basically does. Stay calm when the multiplier is high, and remember that consistency beats speed every time. Do that, and you will go from falling off the second building to chaining GODLIKE runs. Now get up there and try not to ragequit.' },
    ],
  },
     {
    slug: 'snake-candy-arena-tips',
    title: 'Snake Candy Arena: How to Fill the Whole Board',
    date: '2026-08-31',
    author: 'Ragequit Arcade',
    excerpt: 'Snake Candy Arena takes the classic snake and adds candy, combos and bonus animals. Here is how to build huge combos, catch the bonus animals, and chase the perfect run.',
    image: '/blog/snake-tips.jpg',
    seo: {
      title: 'Snake Candy Arena: How to Fill the Whole Board | Ragequit Arcade',
      metaDescription: 'A strategy guide for Snake Candy Arena: how the combo multiplier works, when to catch bonus animals, and how to fill the entire arena for the perfect run.',
    },
    content: [
      { type: 'p', text: 'Everyone knows classic snake: eat, grow, do not crash into yourself. Snake Candy Arena keeps that timeless core but adds three things that turn it into a real score-chasing game: candy combos, timed bonus animals, and a perfect-run finale where you fill the entire board. If you want to top the leaderboard instead of just surviving a few minutes, you need to understand these systems. Here is how.' },

      { type: 'h2', text: 'Candy is not just food, it is a combo' },
      { type: 'p', text: 'Every piece of candy you eat grows your snake by one segment and adds to your score. But the real trick is speed. Eating candy in quick succession, one piece right after another, builds a combo multiplier, and each candy in the chain is worth more than the last. Wait too long between candies and the combo resets. So the highest scores do not come from cautious, slow play. They come from planning efficient routes that let you eat candy after candy without pausing, keeping that multiplier climbing.' },

      { type: 'h2', text: 'The bonus animals are worth chasing, carefully' },
      { type: 'p', text: 'Every few candies, a glowing bonus animal appears somewhere on the board for a limited time, shown by a countdown. Catching it before it vanishes rewards you with a big burst of points, worth double and boosted by your current combo, plus another segment of growth. The temptation is to sprint straight for it, but that is how you trap yourself. Always plan a safe path to the animal before you commit, especially when your snake is already long. A missed animal costs you nothing but points. A reckless dash for one can cost you the whole run.' },

      { type: 'h2', text: 'Manage your own tail as you grow' },
      { type: 'p', text: 'The longer you get, the less room you have, until the whole board becomes a maze of your own body. This is where most runs end. The best players move in calm, deliberate patterns rather than sharp panicked turns, and they always keep an escape route open. Try to follow the edges of the board and coil your snake predictably, so you never box your own tail into a corner. Patience and route planning will take you far further than raw speed.' },

      { type: 'h2', text: 'The perfect run: filling the arena' },
      { type: 'p', text: 'Here is the ultimate challenge. The final candy can only be eaten once your snake has grown to fill the entire predefined grid. If you manage to take that last piece with the board completely packed with your own body, you trigger a perfect "arena filled" finale worth a big bonus. Almost nobody pulls this off, which is exactly why it is the true test of a Snake Candy Arena master. Getting there means playing efficiently from the very first candy so you do not run out of room too early.' },

      { type: 'h2', text: 'And if you crash?' },
      { type: 'p', text: 'One mistake does not have to end a great run. When you crash, you can watch a short ad once to revive and keep your current score, so a single slip on a huge combo run is not the end. Use it wisely, and it can turn a good run into a record-breaking one.' },

      { type: 'h2', text: 'Put it together' },
      { type: 'p', text: 'Eat candy fast to keep your combo alive, plan safe paths to the bonus animals, coil your tail with discipline as you grow, and keep the ultimate goal in mind: filling the whole arena. Master those, and you will climb the Snake Candy Arena leaderboard far higher than the classic snake ever let you. Now go and grow.' },
    ],
  },
     {
    slug: 'bird-blitz-which-monument-first',
    title: 'Bird Blitz: Which Monument Should You Defend First?',
    date: '2026-09-01',
    author: 'Ragequit Arcade',
    excerpt: 'Every monument in Bird Blitz has a bonus and a drawback that change how a run plays. Here is how to pick the right one, spend your stars, and survive the boss waves.',
    image: '/blog/bird-blitz-strategy.jpg',
    seo: {
      title: 'Bird Blitz: Which Monument Should You Defend First? | Ragequit Arcade',
      metaDescription: 'A strategy guide for Bird Blitz: how monument bonuses and drawbacks work, which to defend first, how to spend stars on upgrades, and how to beat the boss waves.',
    },
    content: [
      { type: 'p', text: 'Bird Blitz is a fast, funny tower-defense shooter where you protect the world\u2019s greatest monuments from an endless flock of birds. On the surface it is simple: tap the birds before they soil the landmark. But underneath, there are real decisions to make, starting with which of the ten monuments you choose to defend, each with its own bonus and its own catch. Pick wrong, and you make your run much harder than it needs to be. Here is how to choose well.' },

      { type: 'h2', text: 'Every monument is a trade-off' },
      { type: 'p', text: 'Each of the ten landmarks, from the Eiffel Tower to a Japanese Pagoda, comes with a bonus and a drawback that completely change how a run plays. One might give you more gold but send more birds. Another might keep the monument cleaner but speed the birds up. There is no single best monument, only the one that fits your playstyle. If you like buying lots of items, favor a gold bonus. If your aim is shaky, favor something that reduces dirt or slows the birds. Read each monument\u2019s bonus and drawback before you commit, and match it to how you actually play.' },

      { type: 'h2', text: 'Where to start' },
      { type: 'p', text: 'For your very first runs, pick a monument with a forgiving drawback rather than a flashy bonus. A landmark that keeps itself cleaner buys you time to learn the birds and the shop without the run ending in seconds. Save the high-gold, high-difficulty monuments for when your aim is sharp and you know how to spend gold efficiently. Learn the rhythm on an easy monument first, then chase big scores on the harder ones.' },

      { type: 'h2', text: 'Know your birds' },
      { type: 'p', text: 'Not every bird behaves the same. Pigeons are the basic threat, seagulls are quicker, eagles are the fastest and hardest to hit, albatrosses are big and take three shots, and crows ignore the monument entirely to steal your gold. Prioritize accordingly: swat the fast eagles and the thieving crows before they cause damage you cannot undo, and do not waste panic taps on a slow albatross you can pick off calmly. Every ten waves, a giant boss bird arrives with far more health and a rain of droppings, so save some gold for the tools you will need to survive it.' },

      { type: 'h2', text: 'Spend gold in the run, stars between runs' },
      { type: 'p', text: 'During a run, the gold you earn buys temporary items on the sides of the screen: a cross-firing shotgun, a shield, an air strike, a net, slow-motion and a decoy. Learn which ones save you in a crisis. The shield and slow-motion are lifesavers during boss waves. Between runs, you spend stars on permanent upgrades that carry across every game: more damage, tougher shields, more starting gold and better cleaning. These permanent upgrades are how you steadily push your ceiling higher, and stars also unlock new monuments to defend.' },

      { type: 'h2', text: 'Chain combos and complete dailies' },
      { type: 'p', text: 'Shooting birds without missing builds a combo multiplier, so accuracy is not just about defense, it directly multiplies your score and gold. And every day brings three fresh challenges that reward stars, giving you a reason to come back and a steady supply of upgrade currency. Playing for the dailies is one of the fastest ways to build a permanently stronger arsenal.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Choose a monument that matches your playstyle, start on a forgiving one, prioritize the dangerous birds, save tools for the boss, and pour your stars into permanent upgrades. Do that, and you will go from losing your first monument in seconds to defending landmarks across the whole world. The birds never stop coming, so get shooting.' },
    ],
  },
     {
    slug: 'rage-hockey-tips',
    title: 'Rage Hockey: How to Win Every Arena',
    date: '2026-09-02',
    author: 'Ragequit Arcade',
    excerpt: 'Rage Hockey is fast, brutal air hockey with three very different arenas. Here is how to master each one, beat the AI, and win those couch two-player showdowns.',
    image: '/blog/rage-hockey-tips.jpg',
    seo: {
      title: 'Rage Hockey: How to Win Every Arena | Ragequit Arcade',
      metaDescription: 'A strategy guide for Rage Hockey: how to master the Classic, Bumper and Narrow arenas, beat the AI, use the Power Boost and win local two-player matches.',
    },
    content: [
      { type: 'p', text: 'Rage Hockey looks like simple air hockey, but anyone who has lost 7 to 6 in the final seconds knows it is anything but. The physics are fast, the AI does not go easy on you, and the three arenas each demand a completely different approach. If you are tired of watching the puck fly into your own goal, this guide will turn you into the player everyone dreads facing on the couch.' },

      { type: 'h2', text: 'Defense first, always' },
      { type: 'p', text: 'The single biggest mistake new players make is chasing the puck all over the table. In Rage Hockey, the puck moves fast, and if you commit too far forward, one deflection sails straight into your empty goal. The golden rule is to keep your paddle between the puck and your goal at all times. Think of yourself as a goalkeeper first and a striker second. Let the puck come to you, block it, and only then push it forward. Patience wins far more matches than aggression.' },

      { type: 'h2', text: 'Hit with angles, not just power' },
      { type: 'p', text: 'Smashing the puck straight ahead is easy to block. The goals that actually go in are the ones that come off the walls at an angle the opponent cannot read. Practice striking the puck slightly off-center so it ricochets off a side wall and comes at the goal from the side. A well-placed bank shot beats a hard straight shot every time, because the AI and human opponents both struggle to track sudden angle changes.' },

      { type: 'h2', text: 'Master the three arenas' },
      { type: 'p', text: 'Classic is the standard open table, the place to learn your defense and your angles. Bumper adds a central bouncer that sends the puck flying in unpredictable directions, so the key here is to slow the game down: control the puck near your side and only release it when the path is clear, because a wild shot into the bumper can rebound straight into your own net. Narrow tightens the whole field, leaving far less room to defend, which means positioning is everything. In Narrow, stay centered and react, because you simply do not have space to recover from a bad lunge.' },

      { type: 'h2', text: 'Use the Power Boost wisely' },
      { type: 'p', text: 'After a match you can watch a short ad to earn a Power Boost, which for about 25 seconds makes your paddle hit harder and slows your opponent down. Do not waste it when you are already winning comfortably. Save it for a tight rematch or a decider, where those 25 seconds of advantage can swing the whole game. Timing your boost is a skill in itself.' },

      { type: 'h2', text: 'Beating a friend in two-player' },
      { type: 'p', text: 'Local two-player is where Rage Hockey really shines, and where friendships are tested. Against a human, mind games matter. Vary your shots so you are not predictable, mix soft controlled pushes with sudden hard bank shots, and watch which side your opponent favors so you can aim for the gap. The Bumper arena is the great equalizer in two-player, because its chaos punishes anyone who overcommits. If you are the more skilled player, pick Narrow to press your positioning advantage. If you are the underdog, pick Bumper and let chaos do the work.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Defend before you attack, score with angles instead of brute force, adapt your style to each arena, save your Power Boost for the moments that matter, and read your opponent in two-player. Do all that, and first to seven will start going your way a lot more often. Now go make someone ragequit.' },
    ],
  },
     {
    slug: 'staq-perfect-drops',
    title: 'STAQ: The Secret to an Endless Perfect Streak',
    date: '2026-09-03',
    author: 'Ragequit Arcade',
    excerpt: 'STAQ is one tap and infinite precision. Here is how to nail perfect drops, keep your tower full-width, and stack higher than you thought possible.',
    image: '/blog/staq-tips.jpg',
    seo: {
      title: 'STAQ: The Secret to an Endless Perfect Streak | Ragequit Arcade',
      metaDescription: 'A tips guide for STAQ, the one-tap block stacking game: how to time perfect drops, keep your tower full-width, chain combos and reach a huge high score.',
    },
    content: [
      { type: 'p', text: 'STAQ could not be simpler to explain: a block slides back and forth, you tap to drop it, and you try to stack it perfectly on the one below. And yet it is one of those games you swear you will play once and then find yourself still playing twenty minutes later. The difference between a tower that collapses at ten blocks and one that reaches the sky is all in the timing. Here is how to master it.' },

      { type: 'h2', text: 'Why a perfect drop matters so much' },
      { type: 'p', text: 'When you drop a block, any part of it that hangs over the block below gets sliced off, making your tower narrower. Do that a few times and your platform shrinks until a drop misses completely and the run ends. But if you align a block almost exactly, you score a Perfect: the block keeps its full width instead of being trimmed. This is the whole secret. A run full of perfects keeps your tower wide and forgiving, while a run of sloppy drops narrows you into a game over within seconds.' },

      { type: 'h2', text: 'Find the rhythm, do not chase the block' },
      { type: 'p', text: 'The block moves at a steady, predictable speed. New players watch the block and react, which is always a fraction too late. Better players find the rhythm and tap on beat, almost without watching, anticipating the moment the block lines up rather than reacting to it. Try counting the swing in your head. Once you lock onto the tempo, perfect drops become far more consistent, because you are tapping to a rhythm instead of gambling on reaction time.' },

      { type: 'h2', text: 'Chain perfects for the real score' },
      { type: 'p', text: 'Landing several perfects in a row builds a combo, and that is where the big scores and the tallest towers come from. Each perfect in a streak is more valuable than a single one, so the goal is not just to survive, it is to string perfects together without a single miss. This also compounds: because perfects keep your tower full-width, a long perfect streak makes every subsequent drop easier, which makes the next perfect easier still. Momentum is everything in STAQ.' },

      { type: 'h2', text: 'Stay calm as the tower grows' },
      { type: 'p', text: 'The higher you climb, the more tempting it is to rush or panic, and panic is the enemy of rhythm. The tower does not speed up unfairly; your nerves do. When you feel a big run going, slow your breathing, keep tapping on the same beat you started with, and do not let the height psych you out. Many of the best runs die not because the game got harder, but because the player got greedy at block forty.' },

      { type: 'h2', text: 'The revive is your safety net' },
      { type: 'p', text: 'If you finally miss on a great run, you can watch a short ad once to revive: you keep your score and get a fresh full-width block to continue. Use it on your best runs to push your record even higher, rather than starting over from zero. It is a genuine second chance at a leaderboard score.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Aim for perfects to keep your tower wide, tap to the rhythm instead of reacting, chain your perfects for combos and momentum, and keep your nerve as the tower climbs. Do that, and "how high can you go" stops being a question and starts being a flex. Now go stack something ridiculous.' },
    ],
  },
     {
    slug: 'stellar-forge-guide',
    title: 'Stellar Forge: From Hand Pick to Galactic Empire',
    date: '2026-09-04',
    author: 'Ragequit Arcade',
    excerpt: 'Stellar Forge is a deep, science-based idle clicker. Here is how to automate early, build your energy grid, and climb the real Kardashev scale as fast as possible.',
    image: '/blog/stellar-forge-guide.jpg',
    seo: {
      title: 'Stellar Forge: From Hand Pick to Galactic Empire | Ragequit Arcade',
      metaDescription: 'A beginner guide to Stellar Forge, the space idle clicker: how to automate ore, build an energy grid, and climb the real Kardashev scale from planet to galaxy.',
    },
    content: [
      { type: 'p', text: 'Stellar Forge is an idle clicker, but it is a smarter one than most. It is built around the real Kardashev scale, the genuine scientific measure of how much energy a civilization can harness, and your job is to grow from a single miner with a hand pick all the way to a galaxy-spanning empire. If you love watching numbers climb and systems compound, this is your game. Here is how to grow efficiently instead of tapping aimlessly.' },

      { type: 'h2', text: 'Tap at the start, then stop tapping' },
      { type: 'p', text: 'At the very beginning, tapping to mine ore is your only source of income, so tap away. But the goal of the whole game is to stop needing to tap. As soon as you can afford your first drill, buy it. Automation is the entire point of an idle game: every building you buy produces ore on its own, even while you do nothing. The players who progress fastest are not the ones who tap the most, they are the ones who reinvest into automation the earliest.' },

      { type: 'h2', text: 'Reinvest relentlessly, do not hoard' },
      { type: 'p', text: 'A common beginner mistake is saving up a huge pile of ore for something far away while cheaper upgrades sit unbought. In an idle game, idle resources are wasted potential. The smart play is to keep reinvesting into whatever gives you the best production boost right now, so your income compounds as fast as possible. Each upgrade makes the next one affordable sooner, which makes the one after that sooner still. Compounding is the engine of the entire game, and hoarding starves it.' },

      { type: 'h2', text: 'Balance mining with energy' },
      { type: 'p', text: 'Stellar Forge is not only about mining. You also build an energy grid, from humble solar panels up to colossal Dyson spheres, and that energy is what powers your climb up the Kardashev scale. Do not neglect one for the other. Mining gives you resources to spend, and energy gives you the power to reach the next civilization tier. Keep both growing in parallel rather than pouring everything into one, or you will hit a wall where you have resources but no power to advance, or power but nothing to fuel it.' },

      { type: 'h2', text: 'Understand the Kardashev climb' },
      { type: 'p', text: 'The Kardashev scale is your real progress bar. Type I harnesses the power of a planet, Type II the power of a star, and Type III the power of an entire galaxy. Each tier is a massive leap, so treat reaching a new type as a milestone worth building toward. Knowing your next tier gives your session a goal beyond just bigger numbers: you are literally powering up a civilization step by step.' },

      { type: 'h2', text: 'Come back to collect' },
      { type: 'p', text: 'The beauty of an idle game is that it works while you are away. Once your buildings are producing on their own, closing the game does not stop your progress. Come back after a break, a night\u2019s sleep or a day at work, and there will be a pile of resources waiting to be collected and reinvested. Build the habit of checking in, collecting, buying your best available upgrades, and letting it run again. That rhythm is how you go from a single hand pick to a galactic empire.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Automate as early as you can, reinvest constantly instead of hoarding, grow mining and energy together, aim for the next Kardashev tier, and check in regularly to collect and reinvest. Follow that loop and the numbers will grow faster than you expect, until one lone miner has become a civilization that spans the stars.' },
    ],
  },
     {
    slug: 'neon-rush-tips',
    title: 'Neon Rush: How to Survive the Tunnel and Chain Combos',
    date: '2026-09-05',
    author: 'Ragequit Arcade',
    excerpt: 'Neon Rush is a fast 3D tunnel runner where near-misses build your score. Here is how to read the tunnel, chain combos and push your run far past the first crash.',
    image: '/blog/neon-rush-tips.jpg',
    seo: {
      title: 'Neon Rush: How to Survive the Tunnel and Chain Combos | Ragequit Arcade',
      metaDescription: 'A tips guide for Neon Rush, the 3D neon tunnel runner: how to read the lanes, chain near-miss combos, survive the obstacle waves and beat your high score.',
    },
    content: [
      { type: 'p', text: 'Neon Rush drops you into a hypnotic 3D tunnel and asks one thing: how far can you go before you crash. You dodge across three lanes, weave past glowing walls, and grab energy orbs, all at a speed that keeps climbing. It looks like pure chaos, but there is real skill underneath, and once it clicks, your runs get dramatically longer. Here is how to read the tunnel instead of just reacting to it.' },

      { type: 'h2', text: 'Look ahead, not at your character' },
      { type: 'p', text: 'The most common reason players crash is that they stare at the front of the tunnel, right where they are, which gives them no time to react. The fix is to keep your eyes further up the tunnel, reading the obstacles before they reach you. Your brain needs that extra fraction of a second to plan which lane is safe. It feels unnatural at first, but training your eyes to look ahead rather than down is the single biggest improvement you can make.' },

      { type: 'h2', text: 'Commit to lane changes early' },
      { type: 'p', text: 'There are three lanes, and hesitation kills. If you see a wall coming and you know you need to switch lanes, do it early and decisively. Last-second panic swaps are how you clip an obstacle you thought you had cleared. Plan your path a beat ahead, move with intent, and settle into the safe lane before the obstacle arrives rather than diving through the gap at the final instant.' },

      { type: 'h2', text: 'Near-misses are worth chasing' },
      { type: 'p', text: 'Here is what separates a survival run from a high-score run: near-misses. Squeezing past a wall by a hair, and collecting orbs, both feed a combo multiplier that boosts every point you score. So the best players do not just dodge to survive, they dodge as close as they safely can, and grab every orb on the way. Chaining pickups and close calls builds a multiplier that turns a decent run into a leaderboard run. Just be honest with yourself about how close is safe at your current speed.' },

      { type: 'h2', text: 'Respect the waves' },
      { type: 'p', text: 'The tunnel alternates calm stretches with intense obstacle waves that speed you up and pack the track with walls. A safe path always exists, but it gets harder to read the faster you go. During a wave, resist the urge to also chase every orb, and prioritize survival: pick the clearly safe lane and hold your nerve. Once the wave passes and the tunnel calms, go back to hunting near-misses and orbs to rebuild your multiplier. Knowing when to play safe and when to push is the heart of a long run.' },

      { type: 'h2', text: 'Use your revive on a great run' },
      { type: 'p', text: 'When you crash, you can watch a short ad to revive once per run, keep your score, and get a few seconds of invincibility to settle back into the flow. Save it for your genuinely good runs rather than burning it early. Those extra seconds of invincibility are also a perfect moment to rebuild your combo through a tough section without risk.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Look ahead up the tunnel, commit to your lane changes early, chase near-misses and orbs to feed your multiplier, play safe through the waves, and save your revive for your best runs. Do that, and the tunnel stops being a blur of crashes and starts being a rhythm you can ride. See how far you can go.' },
    ],
  },
     {
    slug: 'octaflux-tips',
    title: 'OCTAFLUX: How to Trigger Massive Cascade Chains',
    date: '2026-09-06',
    author: 'Ragequit Arcade',
    excerpt: 'OCTAFLUX is a spinning octagon match game where cascades are everything. Here is how to set up chain reactions, manage the eight faces, and rack up a huge score.',
    image: '/blog/octaflux-tips.jpg',
    seo: {
      title: 'OCTAFLUX: How to Trigger Massive Cascade Chains | Ragequit Arcade',
      metaDescription: 'A strategy guide for OCTAFLUX, the octagon rotation match game: how cascades work, how to manage the eight faces, and how to chain combos for a huge score.',
    },
    content: [
      { type: 'p', text: 'OCTAFLUX is deceptively simple: you spin a glowing octagon with your thumb to catch falling pieces on its eight faces, and match three or more of the same color to clear them. But the players at the top of the leaderboard are not just matching pieces, they are engineering chain reactions. If your scores are stalling, the secret is learning to think in cascades rather than single matches. Here is how.' },

      { type: 'h2', text: 'Understand the eight faces' },
      { type: 'p', text: 'The octagon has eight faces, and pieces stack up on each one as they fall. Your rotation decides which face catches the next piece. The first skill to master is spatial: keep an eye on all eight faces at once, not just the one you are filling right now. A face you ignore can overload and end your run while you are busy elsewhere. Spread your attention around the whole octagon and think about where each color is accumulating.' },

      { type: 'h2', text: 'Match by color, but think ahead' },
      { type: 'p', text: 'Clearing a group of three or more same-colored pieces is the basic move, but clearing them the instant you can is a rookie habit. Instead, try to see one move ahead. If catching one more piece of a color will turn a group of three into a group of five, or set up a second group right next to it, the bigger clear is almost always worth the small risk of waiting. Patience turns small matches into big ones.' },

      { type: 'h2', text: 'Cascades are where the points are' },
      { type: 'p', text: 'This is the heart of OCTAFLUX. When you clear a group, the pieces above it shift down, and if that shift creates a new match, it clears too, chaining into a cascade. Each step in a cascade is worth far more than an isolated match, so a single well-placed clear that triggers a four-step chain can outscore a dozen ordinary matches. The best players deliberately build unstable stacks that are one clear away from collapsing into a huge cascade, then pull the trigger.' },

      { type: 'h2', text: 'Set up, then detonate' },
      { type: 'p', text: 'Practically, this means resisting the urge to clear constantly. Let colors build up in a controlled way across the faces, arranging them so that one key match will set off a domino effect. It is a balance: build too cautiously and a face overloads, build too recklessly and you lose control. But when you time it right and one clear cascades through half the octagon, the score jump is enormous, and it is the most satisfying moment in the game.' },

      { type: 'h2', text: 'Keep the octagon alive' },
      { type: 'p', text: 'Ultimately, survival and scoring are the same thing here: as long as you keep clearing pieces and triggering cascades, no face overloads. The moment you stop clearing efficiently, the faces fill up and the run ends. So your rotation should always be working toward the next clear, keeping every face under control while setting up the next big chain. Fast, purposeful spinning beats frantic random rotation every time.' },

      { type: 'h2', text: 'The takeaway' },
      { type: 'p', text: 'Watch all eight faces, hold matches to make them bigger, and above all, think in cascades: build your stacks so one clear sets off a chain reaction. Master the setup-and-detonate rhythm and your scores will leap far beyond simple matching. Now go spin something spectacular.' },
    ],
  },
]

// Trouve un article par son slug.
export function getPost(slug) {
  return posts.find(p => p.slug === slug) || null
}
