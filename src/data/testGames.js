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
    id: 'voltlink',
    title: 'VOLTLINK',
    description: 'Puzzle néon : relie au doigt les nœuds de même couleur, ferme une boucle pour faire exploser toute la couleur. Campagne de 60 circuits en 5 secteurs (glace, chaînes, virus, bombes à retardement, cellules d\'énergie) et 5 boss, plus Arcade (Classic, Hard, Daily) et Zen. Volts, boosters, thèmes et sauvegarde sur le compte.',
    thumbnail: '/thumbnails/voltlink.jpg',
    category: 'puzzle',
    orientation: 'portrait',
    file: '/games/voltlink.html',
    notes: 'Canvas 2D, v2. Score VOLTLINK_SCORE : modes classic / hard / daily (score du run) et circuits (somme des meilleurs scores des 60 circuits, envoyée à chaque circuit gagné) ; Zen sans score. Pubs : revive (Arcade +15 s une fois par partie ; Circuits +5 coups et bombes repoussées une fois par tentative, context revive), double volts en fin de partie (context double), booster gratuit une fois par jour (context booster). Sauvegarde : pont RH_AUTH / RH_SAVE (game_saves, progress = volts gagnés au total + 500 par étoile), copie locale. Circuits : 4 premiers guidés (main fantôme), objectifs à coups limités, 3 étoiles calibrées par un bot, finale où chaque coup restant vaut 300. Mécaniques : laser (5 en ligne), overcharge (score x2), glace, chaînes, virus, bombes à retardement (joker), cellules qui descendent d\'une case par coup, 5 boss (Overload Core, Firewall, Swarm, Mirror, Leech) aussi en rotation en Arcade. Musique générée qui monte avec le combo, vibrations Android. Tactile/souris : glisser ; clavier : flèches/WASD/ZQSD + Espace ou Entrée, P pause. Défi ami (vl_seed) et carte Daily à partager.',
    pr: 44,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'Close-up of a glowing neon puzzle board seen slightly from above, a menacing armored boss block with a single glowing eye in the middle of the grid, some nodes frozen in translucent ice cubes and others wrapped in silver chains with a small gold padlock, a spiky green virus blob, a round red time bomb with a glowing counter, rows of luminous gem-like nodes in electric yellow circles, ultraviolet diamonds, mint green triangles, coral red squares and sky blue hexagons, a thick crackling lightning chain linking a closed loop of yellow nodes, white sparks and electric arcs bursting out, a menacing red cyclops core block with a glowing eye embedded in the grid, a rainbow prism gem spinning, dark indigo background with soft violet haze and a faint grid, synthwave arcade style, high contrast, dramatic bloom, no text, no letters, no logo.' },
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
  {
    id: 'brickfury',
    title: 'BRICKFURY',
    description: 'Casse-briques néon : glisse pour déplacer la raquette, enchaîne les briques pour monter le multiplicateur jusqu\'à x8, remplis la jauge FURY pour enflammer toutes les balles. Briques blindées, acier, TNT en chaîne et cristaux, 9 power-ups, 5 drones et le boss OVERLORD tous les 5 secteurs.',
    thumbnail: '/thumbnails/brickfury.jpg',
    category: 'arcade',
    orientation: 'portrait',
    file: '/games/brickfury.html',
    notes: 'Canvas 2D. Score BRICKFURY_SCORE, modes classic / hard (1 vie, balle plus rapide) / daily (même mur pour tous). Pub revive une fois par partie (+1 vie, mur et score conservés, context revive). Tactile : glisser n\'importe où (déplacement relatif), taper pour lancer ; souris : la raquette suit le curseur, clic pour lancer ; clavier : flèches / A-D / Q-D, Espace pour lancer, P pause. Défi ami par lien (bf_seed, bf_beat, bf_mode). Pour tester : ajouter #bftest à l\'URL expose window.BF_TEST (startLevel(5) = boss).',
    pr: 50,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'Close-up action shot of a neon arcade brick breaker, a glowing wall of glossy candy-like bricks in molten crimson, tangerine, electric gold, acid lime, ice blue and violet shattering into hundreds of bright shards, two blazing fireballs with long orange comet trails smashing through the wall, a chain of orange hazard-striped TNT bricks exploding in a golden shockwave, a menacing crimson winged alien warship boss with a glowing amber eye hovering above the wall, small neon drones in lime and ice blue, a glowing golden paddle at the bottom firing twin red laser bolts, dark purple void with a faint synthwave grid floor and stars, strong bloom, high contrast, dynamic diagonal composition, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of a towering neon brick wall floating in a dark purple synthwave void, rows of glossy bricks in crimson, orange, gold, lime, ice blue and violet with steel-plated and crystal bricks among them, a huge golden explosion bursting from a cluster of hazard-striped TNT bricks, shards and sparks flying toward the camera, several fiery balls with comet trails ricocheting, a giant crimson alien warship boss with spread angular wings looming above, a glowing golden paddle far below on a perspective grid floor, light streaks and bloom, deep violet fog, epic arcade atmosphere, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "BRICKFURY" in massive, heavy, blocky capital letters built like stacked glossy bricks, the letters cracked and shattering at the edges with small brick fragments and sparks flying off, a blazing fireball bursting through the narrow gap between BRICK and FURY with a short comet trail, color palette molten crimson red and electric gold with a dark maroon outline, glossy beveled surfaces with a fiery inner glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
]
