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
//  Champs optionnels pour l'onglet admin « À côté » : `pr` (numéro de la PR de
//  test) et `extras` ([{ label, text }] : prompts d'images, logo, etc.).
//
//  Quand le jeu est validé : copie l'entrée (au bon format) dans games.js
//  et retire-la d'ici (ses extras disparaissent avec elle).
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
    id: 'city-runner',
    title: 'City Runner',
    description: 'Runner 3D dans une megapole volante : esquive, saute, combos, 9 vehicules.',
    thumbnail: '/thumbnails/city-runner.jpg',
    category: 'arcade',
    orientation: 'portrait',
    file: '/games/city-runner.html',
    notes: 'Three.js. Score CITY_RUNNER_SCORE, mode classic. Mettre DEBUG_MAX_CREDITS a true pour tester tous les vehicules.'
  },
  {
    id: 'loopstrike',
    title: 'LOOPSTRIKE',
    description: 'Dessine des boucles néon avec la traînée de ta comète pour piéger les cores, évite les mines, bats le boss toutes les 5 vagues.',
    thumbnail: '/thumbnails/loopstrike.jpg',
    category: 'arcade',
    orientation: 'portrait',
    file: '/games/loopstrike.html',
    notes: 'Score LOOPSTRIKE_SCORE, modes classic / hard / daily. Pub revive une fois par partie. Tactile : glisser relatif ; souris : la comète suit le curseur ; clavier : flèches/WASD/ZQSD, P pause.',
    pr: 17,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'Dark arcade scene viewed from above, a glowing white comet trailing a thick electric-cyan neon light ribbon that loops around and closes into a bright glowing ring, inside the ring several cyan hexagonal energy cores shattering into sparks, magenta spiked mines and an orange arrow-shaped hunter drone just outside the loop, deep purple-black background with faint neon grid, intense bloom, high contrast, sharp vector style, no text, no letters, no logos.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic neon arcade battlefield seen from above, a white comet drawing a long cyan light trail that spirals into a closed loop around a cluster of glowing cyan hexagon cores exploding in sparks, a huge acid-yellow octagonal boss on the right dropping pink spiked mines, orange triangular drones closing in, dark violet background with subtle glowing grid, strong bloom and motion energy, clean vector look, no text, no letters, no logos.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "LOOPSTRIKE" in bold, sharp, slightly italic futuristic capital letters, the letter O drawn as a glowing comet loop closing on itself, color palette ice white and deep electric violet with a single thin cyan light streak, chrome bevel and subtle outer glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'tiltshock',
    title: 'TILTSHOCK',
    description: 'Labyrinthe néon 3D à incliner : roule le noyau jusqu\'à la sortie avant la fin du chrono, évite trous et lasers, labyrinthes de plus en plus grands.',
    thumbnail: '/thumbnails/tiltshock.jpg',
    category: 'challenge',
    orientation: 'portrait',
    file: '/games/tiltshock.html',
    notes: 'Three.js. Score TILTSHOCK_SCORE, modes classic / hard / daily. Pub revive (+20 s) une fois par partie. Tactile : stick flottant (glisser n\'importe où), gyroscope optionnel au menu ; clavier : flèches/WASD/ZQSD, P pause. Défi ami par lien (ts_seed).',
    pr: 19,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A glowing neon 3D maze seen from a high three-quarter angle, walls topped with bright cyan and magenta light strips on a dark violet grid floor, a tiny cute pink robot with big white eyes rolling inside a transparent glass sphere, a red laser beam crossing a corridor, a black pit with a glowing red rim, golden diamond shards floating, a green light portal in the distance, synthwave arcade style, high contrast, dramatic glow, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view over a huge neon labyrinth tilting slightly, glowing cyan and orange wall caps on a dark purple grid, a small pink robot inside a glass ball speeding toward a green beam of light at the exit, red lasers and glowing pits along the path, floating golden crystals, deep fog and bloom, synthwave arcade atmosphere, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "TILTSHOCK" in heavy, blocky, tilted capital letters as if the word is sliding on a slanted plate, an electric lightning crack splitting the letters between TILT and SHOCK, color palette acid lime green and hot orange with a dark graphite outline, glossy 3D extrusion and soft glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'shovedown',
    title: 'SHOVEDOWN',
    description: 'Sumo néon en 3D : sur ta boule, pousse les bots hors d\'une arène qui rétrécit, vagues de plus en plus dures et boss TITAN toutes les 5 vagues.',
    thumbnail: '/thumbnails/shovedown.jpg',
    category: 'arcade',
    orientation: 'portrait',
    file: '/games/shovedown.html',
    notes: 'Three.js. Score SHOVEDOWN_SCORE, modes classic / hard / daily. Pub revive (retour au centre avec bouclier) une fois par partie. Tactile : stick flottant (glisser n\'importe où) + bouton DASH ; clavier : flèches/WASD/ZQSD, Espace dash, P pause. Défi ami par lien (sd_seed).',
    pr: 21,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'Neon sumo arena floating over a dark violet void, seen from a high three-quarter angle, a small cute cyan chibi robot riding a glowing striped ball inside a lime green energy shield, ramming into a giant purple crowned titan robot on a huge ball, orange bots tumbling off the glowing orange and red rim into the abyss, sparks and shockwave rings, magenta concentric circles on the arena floor, synthwave arcade style, dramatic bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic shot of a circular neon arena hovering above an endless purple grid void, a cyan chibi robot on a ball dashing with a pink speed trail, several orange and red robot riders being knocked over the shrinking red-hot edge, a towering purple titan robot with golden spikes in the background, floating power-up crystals in orange, cyan and lime, sparks, fog and strong bloom, synthwave arcade atmosphere, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "SHOVEDOWN" in massive, heavy, wide capital letters leaning forward as if charging, the letters slightly squashed and cracked like a sumo impact, a round shockwave burst behind the O, color palette molten gold and crimson red with a black chrome outline, metallic bevel and hot glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
]
