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
    description: 'Saut de tour en tour en 3D néon (v2) : maintiens pour charger, relâche pour bondir, vise le centre pour enchaîner les PERFECT jusqu\'au HYPER MODE. Tours spéciales, embranchements, power-ups, 5 mondes, boss WARDEN en 3 phases, missions du jour, boutique de robots et sauvegarde en ligne.',
    thumbnail: '/thumbnails/hyperhop.jpg',
    category: 'challenge',
    orientation: 'portrait',
    file: '/games/hyperhop.html',
    notes: 'Three.js, v2. Score HYPERHOP_SCORE, modes classic / time (Time Attack 60 s) / hard / daily (meilleur score d\'une partie). Pubs via RH_AD_REQUEST : revive (5 s pour choisir, une fois par partie), double_coins (x2 pièces en fin de partie), rocket_start (partie Classic qui démarre à la tour 25), daily_capsule (capsule gratuite par jour), skin_trial (robot verrouillé pour une partie). Sauvegarde en ligne RH_SAVE (pièces, niveau, robots, missions). Tactile/souris : maintenir puis relâcher, tap en l\'air = double saut (power-up), tap pendant la chute = rejouer ; clavier : Espace, P pause. Défi ami par lien (hh_seed, hh_beat, hh_hops).',
    pr: 55,
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
  {
    id: 'croaknight',
    title: 'CROAKNIGHT',
    description: 'Survie 3D néon : une grenouille saute de case en case dans un cimetière hanté et doit tenir chaque nuit jusqu\'à l\'aube. Langue pour fouetter zombies, squelettes, fantômes et vampires, LEAP pour sauter 2 cases, CROAK (chargé par les lucioles) pour tout balayer, boss Grave Keeper toutes les 3 nuits.',
    thumbnail: '/thumbnails/croaknight.jpg',
    category: 'adventure',
    orientation: 'portrait',
    file: '/games/croaknight.html',
    notes: 'Three.js 0.160. Score CROAKNIGHT_SCORE, modes easy / normal / hardcore / daily (leaderboards séparés), score envoyé au game over définitif. Pub revive une fois par partie (2 cœurs, 1 en Hardcore, monstres proches balayés, context revive), offre de 8 s. Tactile : glisser pour sauter (garder le doigt et glisser encore pour enchaîner), boutons TONGUE / LEAP / CROAK en arc avec recharge visible ; clavier : flèches / WASD / ZQSD, Espace langue, Maj saut, E croak, P pause. Nuits de 45 à 60 s selon le mode, ghosts dès la nuit 2, Grave Keeper nuit 3 (bloque l\'aube tant qu\'il vit), vampires nuit 4. Power-ups citrouille : Shield, Frenzy, Freeze, Magnet, Heart. Défi ami par lien (ck_seed, ck_beat, ck_mode). Pour tester : #cktest dans l\'URL expose window.CK_TEST (night(3) = boss, god(true), ff(s)).',
    pr: 56,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A cute glossy lime-green frog wearing a tiny golden crown and a short glowing violet cape, caught mid-hop above a grid of dark stone tiles with glowing purple neon edges in a haunted graveyard at night, its long hot-pink tongue lashing out and splattering a blocky green zombie into sparks, a bony skeleton and a translucent cyan ghost rising out of fresh graves around it, a huge hulking grave keeper boss with a wide crimson hat looming in the background with a magenta glow, a crackling lime-green shockwave ring expanding on the ground, carved jack-o-lantern pumpkins glowing orange, fireflies sparkling, a giant pale full moon with a violet halo, wrought-iron fence and crooked pine trees, purple fog, chunky low-poly toy style, dramatic bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of a neon haunted graveyard at night seen from a high three-quarter angle, a grid of dark stone tiles outlined in glowing purple light surrounded by a wrought-iron fence, crooked pine trees, two stone crypts and burning fire baskets, a small lime-green frog with a golden crown and violet cape leaping in a front flip over a gravestone with a frosty cyan trail, a crowd of blocky zombies, skeletons, a red-caped vampire dashing along a line of glowing red tiles and a translucent cyan ghost closing in, a giant grave keeper boss with a crimson hat smashing the ground with a pink shockwave, carved pumpkins glowing orange, swarms of yellow-green fireflies, an enormous full moon with a violet halo and a faint pink dawn on the horizon, purple fog, chunky low-poly toy style, strong bloom, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "CROAKNIGHT" in bold, chunky, slightly italic capital letters, CROAK in glossy toxic lime green and NIGHT in moonlight violet, the O drawn as a big round frog eye with a black pupil, a tiny golden crown resting on the K, a long hot-pink frog tongue curling under the whole word like an underline, small glowing fireflies around the letters, deep forest green outline, glossy beveled neon tubes with a soft glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'yeti-rush',
    title: 'YETI RUSH',
    description: 'Descente infinie en pseudo-3D néon : glisse pour carver, tape pour sauter. Passe les portes de slalom et enchaîne les figures sur les tremplins pour remplir RUSH, évite arbres, rochers, snowboardeurs, loups de glace, boules de neige et motoneiges, et ne laisse jamais le Yéti te rattraper. Boss Yeti King tous les 1 000 m, à repousser avec des fusées éclairantes.',
    thumbnail: '/thumbnails/yeti-rush.jpg',
    category: 'challenge',
    orientation: 'portrait',
    file: '/games/yeti-rush.html',
    notes: 'Canvas 2D pseudo-3D. Score YETI_RUSH_SCORE, modes classic / night (lampe frontale) / hard (yéti plus rapide, boss tous les 800 m) / daily (même piste pour tous), score envoyé au game over définitif. Pub revive une fois par partie (le yéti est renvoyé à 45 m, 2,5 s d\'invulnérabilité, context revive). Tactile : glisser pour carver (déplacement relatif), taper pour sauter, taper en l\'air après un tremplin pour une vrille (atterrir en pleine vrille = chute), deuxième doigt = saut immédiat ; clavier : flèches / A-D / Q-D, Espace pour sauter, P pause. Défi ami par lien (yr_seed, yr_beat, yr_mode). Pour tester : ajouter #yrtest à l\'URL expose window.YR_TEST (boss(), gap(0) = rattrapé, ramp(), air()).',
    pr: 0,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A small skier seen from behind in a glowing ice-blue jacket, white helmet with an ember orange stripe and dark backpack, carving down a glowing neon ski slope at night with snow spray behind the skis, a gigantic furious white-furred yeti with glowing orange eyes, an open fanged mouth and a crown of ice bursting up right behind the skier with both clawed arms raised, neon-rimmed snowy pine trees in mint green and ice blue lining the slope, a golden jump ramp with chevrons ahead, an aurora borealis in green, cyan and violet over jagged purple mountains, a big pale moon, falling snow and sparkles, dramatic low angle, strong bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of an endless neon ski slope at night stretching toward the horizon between glowing pine forests, slalom gate poles in ember orange and ice blue with glowing banners, a golden ramp with chevrons, a skier in an ice-blue jacket mid-air doing a spinning flip with a light trail, a huge white yeti king with an ice crown and glowing orange eyes roaring further down the slope and hurling a giant snowball, a wall of jagged ice spikes erupting from the snow, orange flares streaking toward the yeti, aurora borealis in green, cyan and violet, jagged purple mountains and a pale moon, falling snow, strong bloom, synthwave arcade atmosphere, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "YETI RUSH" in bold, heavy, slanted capital letters on two lines, YETI carved from cracked glacier ice with frost and tiny icicles hanging under the letters, RUSH in blazing ember orange with speed streaks and a burst of snow spray trailing behind it, three claw-scratch marks slashing across the word, color palette glacier ice blue and ember orange with frosty white highlights and a deep midnight navy outline, glossy beveled neon with a soft glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
]
