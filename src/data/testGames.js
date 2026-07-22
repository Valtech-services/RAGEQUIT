// ─────────────────────────────────────────────────────────────────────────
//  JEUX EN TEST (staging) — visibles UNIQUEMENT dans la page admin "Test des jeux".
//  Ils n'apparaissent PAS sur le site public tant qu'ils ne sont pas déplacés
//  dans src/data/games.js.
//
//  Pour tester un nouveau jeu :
//   1) dépose le HTML dans  public/games/<id>.html
//   2) (optionnel) la miniature dans  public/thumbnails/<id>.jpg
//   3) ajoute une entrée ci-dessous
//   4) ouvre la page admin → onglet "Test des jeux" → Lancer
//
//  Quand le jeu est validé : copie l'entrée (au bon format) dans games.js
//  et retire-la d'ici.
// ─────────────────────────────────────────────────────────────────────────

export const testGames = [
  {
    id: 'mage-rush',
    title: 'Mage Rush',
    description: 'Survis aux vagues, choisis ta maison de mage et maitrise tes sorts.',
    thumbnail: '/thumbnails/mage-rush.jpg',
    category: 'adventure',
    orientation: 'portrait',
    file: '/games/mage-rush.html',
    notes: 'Roguelite mage. Mobile-first 9:16.'
  },
  {
    id: 'stellar-forge',
    title: 'Stellar Forge',
    description: 'Idle clicker spatial : extrais du minerai, automatise, construis ton energie et grimpe l echelle de Kardashev de la planete a la galaxie.',
    thumbnail: '/thumbnails/stellar-forge.jpg',
    category: 'idle',
    orientation: 'portrait',
    file: '/games/stellar-forge.html',
    notes: 'Idle clicker spatial. Mobile-first portrait. Progression Kardashev + colonisation planetes.'
  }
]
