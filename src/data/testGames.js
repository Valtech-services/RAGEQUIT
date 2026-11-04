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
  {
    id: 'voltlink',
    title: 'VOLTLINK',
    description: 'Puzzle néon contre la montre : relie au doigt les nœuds de même couleur, ferme une boucle pour faire exploser toute la couleur, et abats l\'Overload Core qui vide ton chrono.',
    thumbnail: '/thumbnails/voltlink.jpg',
    category: 'puzzle',
    orientation: 'portrait',
    file: '/games/voltlink.html',
    notes: 'Canvas 2D. Score VOLTLINK_SCORE, modes classic / hard / daily. Pub revive (+15 s, +12 s en Hard, glitches effacés) une fois par partie. Tactile/souris : glisser d\'un nœud à l\'autre (orthogonal), revenir en arrière pour annuler ; clavier : flèches/WASD/ZQSD + Espace ou Entrée pour commencer/valider un lien, P pause. Défi ami par lien (vl_seed).',
    pr: 29,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'Close-up of a glowing neon puzzle board seen slightly from above, rows of luminous gem-like nodes in electric yellow circles, ultraviolet diamonds, mint green triangles, coral red squares and sky blue hexagons, a thick crackling lightning chain linking a closed loop of yellow nodes, white sparks and electric arcs bursting out, a menacing red cyclops core block with a glowing eye embedded in the grid, a rainbow prism gem spinning, dark indigo background with soft violet haze and a faint grid, synthwave arcade style, high contrast, dramatic bloom, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of a floating neon puzzle grid hovering in a dark indigo void, glowing nodes in electric yellow, ultraviolet purple, mint green, coral red and sky blue, a huge electric surge shockwave expanding from a closed loop of linked nodes, lightning bolts arcing between them, glitchy magenta static blocks breaking apart into pixels, a red cyclops overload core block cracking under the blast, sparkles and light streaks everywhere, deep violet fog and strong bloom, synthwave arcade atmosphere, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "VOLTLINK" in bold, rounded, heavy capital letters where each letter is a glowing node connected to the next by a crackling lightning wire, the O drawn as a closed electric loop, color palette electric yellow and ultraviolet purple with a deep navy outline, glossy neon tubes with a soft electric glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'hyperhop',
    title: 'HYPERHOP',
    description: 'Saut de tour en tour en 3D néon : maintiens pour charger, relâche pour bondir, vise le centre pour enchaîner les PERFECT, esquive les drones et abats le boss WARDEN.',
    thumbnail: '/thumbnails/hyperhop.jpg',
    category: 'challenge',
    orientation: 'portrait',
    file: '/games/hyperhop.html',
    notes: 'Three.js. Score HYPERHOP_SCORE, modes classic / time (Time Attack 60 s) / hard / daily. Pub revive une fois par partie (retour sur la dernière tour avec bouclier 2 s ; +15 s en Time Attack). Tactile/souris : maintenir n\'importe où puis relâcher ; clavier : maintenir Espace (ou Entrée / flèche haut), P pause. Défi ami par lien (hh_seed).',
    pr: 32,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A small cute white and teal robot in mid-air doing a front flip between two tall glowing neon towers that rise out of a dark violet void, the target tower top glowing with a bright teal bullseye ring, a light trail curving behind the robot, a menacing red flying drone hovering above another tower and firing a crackling red lightning beam down onto it, spinning golden coins, a giant striped synthwave sun on the horizon, pink and indigo sky with stars, an endless magenta grid far below, sparks and particles, dramatic low angle, strong bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of a chain of floating neon towers of different heights and shapes, square and round, each with glowing rims in teal, coral, violet, sky blue and amber, stretching toward a giant striped synthwave sun on the horizon, a small white and teal robot leaping from one tower to the next with a glowing arc trail, a cracked amber tower crumbling into pieces, a huge crimson boss drone with a golden crown ring hovering over a large round tower in the distance, an endless magenta grid below fading into violet fog, sparkles and light streaks, strong bloom, synthwave arcade atmosphere, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "HYPERHOP" in bold, chunky, italic capital letters that bounce along an invisible arc as if each letter is mid-jump, the O and the final P slightly squashed as if landing, a dotted jump trajectory arching over the word, color palette mint teal and tangerine orange with a deep indigo outline, glossy beveled neon tubes with a soft glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
]
