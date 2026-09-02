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
    date: '2026-09-02',
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
]

// Trouve un article par son slug.
export function getPost(slug) {
  return posts.find(p => p.slug === slug) || null
}
