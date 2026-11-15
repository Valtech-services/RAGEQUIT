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
    id: 'brickfury',
    title: 'BRICKFURY',
    description: 'Casse-briques néon (v2 : 4 zones avec décor animé, bonus en icônes, FURY qui embrase l\'arène) : glisse pour déplacer la raquette, enchaîne les briques pour monter le multiplicateur jusqu\'à x8, remplis la jauge FURY pour enflammer toutes les balles. Briques blindées, acier, TNT en chaîne et cristaux, 9 power-ups, 5 drones et le boss OVERLORD tous les 5 secteurs.',
    thumbnail: '/thumbnails/brickfury.jpg',
    category: 'arcade',
    orientation: 'portrait',
    file: '/games/brickfury.html',
    notes: 'Canvas 2D. Score BRICKFURY_SCORE, modes classic / hard (1 vie, balle plus rapide) / daily (même mur pour tous). Pub revive une fois par partie (+1 vie, mur et score conservés, context revive). Tactile : glisser n\'importe où (déplacement relatif), taper pour lancer ; souris : la raquette suit le curseur, clic pour lancer ; clavier : flèches / A-D / Q-D, Espace pour lancer, P pause. Défi ami par lien (bf_seed, bf_beat, bf_mode). Pour tester : ajouter #bftest à l\'URL expose window.BF_TEST (startLevel(5) = boss).',
    pr: 63,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'Close-up action shot of a neon arcade brick breaker inside a glowing golden arena frame, a wall of glossy candy-like bricks in molten red, tangerine, gold and coral shattering into bright shards, three blazing fireballs with long comet trails smashing through, orange hazard-striped TNT bricks exploding, round power-up capsules with simple white icons falling, dark volcanoes with glowing lava cracks behind a red neon grid floor, embers in the air, strong bloom, high contrast, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic panorama of four neon arcade arenas side by side, a synthwave city with a striped sun, an ice zone with aurora curtains and jagged glowing peaks, a magma zone with lava volcanoes, a deep space zone with a ringed purple planet, each arena holding a wall of glossy neon bricks smashed by fireballs, a glowing energy paddle at the bottom, sparks and shards everywhere, strong bloom, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "BRICKFURY" in massive, heavy, blocky capital letters built like stacked glossy bricks, the letters cracked and shattering at the edges with small brick fragments and sparks flying off, a blazing fireball bursting through the narrow gap between BRICK and FURY with a short comet trail, color palette molten crimson red and electric gold with a dark maroon outline, glossy beveled surfaces with a fiery inner glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'croaknight',
    title: 'CROAKNIGHT',
    description: 'Survie 3D néon (v2 : vrai cimetière de nuit, lune et brume, grenouille plus visible) : une grenouille saute de case en case dans un cimetière hanté et doit tenir chaque nuit jusqu\'à l\'aube. Langue pour fouetter zombies, squelettes, fantômes et vampires, LEAP pour sauter 2 cases, CROAK (chargé par les lucioles) pour tout balayer, boss Grave Keeper toutes les 3 nuits.',
    thumbnail: '/thumbnails/croaknight.jpg',
    category: 'adventure',
    orientation: 'portrait',
    file: '/games/croaknight.html',
    notes: 'Three.js 0.160. Score CROAKNIGHT_SCORE, modes easy / normal / hardcore / daily (leaderboards séparés), score envoyé au game over définitif. Pub revive une fois par partie (2 cœurs, 1 en Hardcore, monstres proches balayés, context revive), offre de 8 s. Tactile : glisser pour sauter (garder le doigt et glisser encore pour enchaîner), boutons TONGUE / LEAP / CROAK en arc avec recharge visible ; clavier : flèches / WASD / ZQSD, Espace langue, Maj saut, E croak, P pause. Nuits de 45 à 60 s selon le mode, ghosts dès la nuit 2, Grave Keeper nuit 3 (bloque l\'aube tant qu\'il vit), vampires nuit 4. Power-ups citrouille : Shield, Frenzy, Freeze, Magnet, Heart. Défi ami par lien (ck_seed, ck_beat, ck_mode). Pour tester : #cktest dans l\'URL expose window.CK_TEST (night(3) = boss, god(true), ff(s)).',
    pr: 64,
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
    pr: 57,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A small skier seen from behind in a glowing ice-blue jacket, white helmet with an ember orange stripe and dark backpack, carving down a glowing neon ski slope at night with snow spray behind the skis, a gigantic furious white-furred yeti with glowing orange eyes, an open fanged mouth and a crown of ice bursting up right behind the skier with both clawed arms raised, neon-rimmed snowy pine trees in mint green and ice blue lining the slope, a golden jump ramp with chevrons ahead, an aurora borealis in green, cyan and violet over jagged purple mountains, a big pale moon, falling snow and sparkles, dramatic low angle, strong bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of an endless neon ski slope at night stretching toward the horizon between glowing pine forests, slalom gate poles in ember orange and ice blue with glowing banners, a golden ramp with chevrons, a skier in an ice-blue jacket mid-air doing a spinning flip with a light trail, a huge white yeti king with an ice crown and glowing orange eyes roaring further down the slope and hurling a giant snowball, a wall of jagged ice spikes erupting from the snow, orange flares streaking toward the yeti, aurora borealis in green, cyan and violet, jagged purple mountains and a pale moon, falling snow, strong bloom, synthwave arcade atmosphere, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "YETI RUSH" in bold, heavy, slanted capital letters on two lines, YETI carved from cracked glacier ice with frost and tiny icicles hanging under the letters, RUSH in blazing ember orange with speed streaks and a burst of snow spray trailing behind it, three claw-scratch marks slashing across the word, color palette glacier ice blue and ember orange with frosty white highlights and a deep midnight navy outline, glossy beveled neon with a soft glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'graviton',
    title: 'GRAVITON',
    description: 'Plateforme 3D néon sur mini-planètes à gravité sphérique : cours tout autour des planètes, double saut, dash et attaque tournoyante, rampes de lancement d\'une planète à l\'autre. Ramasse tous les éclats avant la fin du chrono (+3 s par éclat) pour ouvrir le portail, écrase Urchins, Wisps, Drones et Tourelles, esquive les météores et détruis The Comet, le boss qui te poursuit et s\'écrase sur ta planète.',
    thumbnail: '/thumbnails/graviton.jpg',
    category: 'adventure',
    orientation: 'portrait',
    file: '/games/graviton.html',
    notes: 'Three.js 0.160. Score GRAVITON_SCORE, modes classic / hard (sans dash, 2 cœurs, 40 s, Comet tous les 2 secteurs) / daily (même galaxie pour tous), score envoyé au game over définitif (cœurs à 0 ou chrono à 0). Pub revive une fois par partie (+20 s, 2 cœurs, 1 en Hard, monstres proches balayés, context revive), offre de 8 s. Tactile : stick flottant à gauche, JUMP (double saut) / DASH / SPIN en arc à droite avec recharge visible, toucher la moitié droite = sauter ; clavier : WASD / ZQSD / flèches, Espace saut, Maj dash, E spin, P pause. Atterrir sur un monstre l\'écrase ; The Comet s\'écrase sur la planète puis reste sonnée : sauter sur son noyau ou SPIN. Défi ami par lien (gv_seed, gv_beat, gv_mode). Pour tester : #gvtest dans l\'URL expose window.GV_TEST (sector(3) = boss, collectAll(), toGate(), god(true), ff(s)).',
    pr: 61,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A small hooded space wanderer in a deep violet cloak with a glowing hot pink cape and gold trims, caught mid-air in a spinning jump above a tiny round planet wrapped in a glowing golden neon grid, a pink ring of energy swirling around the hero, a gigantic comet creature with a blazing white-gold core and a shell of floating dark violet rocks crashing down toward the planet with a long fiery rose and amber tail, a spiky glowing pink urchin monster and a cyan flying drone nearby, golden crystal shards sparkling in the air, other small neon planets with thin rings floating in a deep indigo and magenta nebula full of stars, strong bloom, high contrast, dynamic low angle, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of a small cluster of tiny round neon planets floating in a vivid magenta and indigo nebula, each planet wrapped in a glowing grid of gold, cyan or rose light with a soft atmosphere halo, little space base props, solar panels and wind turbines standing on their curved surfaces, a hooded hero in a violet cloak and hot pink cape running around the curve of the nearest planet, a dotted glowing arc of light linking two planets like a launch trajectory, golden crystal shards floating above the surfaces, a cyan warp gate ring with a tall beam of light on a distant planet, a huge flaming comet with a white-gold core streaking across the sky, a giant ringed gas planet and a hot sun on the horizon, strong bloom, dreamy synthwave space atmosphere, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "GRAVITON" in bold, chunky, slightly italic capital letters that bend along the curve of a small planet, as if the word itself were pulled by gravity, the letter O drawn as a tiny glowing planet with a thin orbit ring and a little star circling it, GRAV in sunrise amber and VITON in nebula rose pink, a deep indigo outline and soft glow, a faint curved orbit line sweeping under the whole word, glossy beveled surfaces, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'syncrush',
    title: 'SYNCRUSH',
    description: 'Puzzle de chiffres néon contre la montre : déplace l\'impulsion de case en case (glisser, faire glisser ou taper une case voisine), chaque cœur traversé prend +1, les cœurs inverseurs rouges perdent 1. Rends tous les cœurs égaux pour synchroniser la grille et recharger le chrono. PERFECT si tu tiens le PAR (combo jusqu\'à x8), grille OVERLOAD toutes les 5 grilles, pouvoirs UNDO, HINT, FREEZE et RESET.',
    thumbnail: '/thumbnails/syncrush.jpg',
    category: 'brain',
    orientation: 'portrait',
    file: '/games/syncrush.html',
    notes: 'Canvas 2D. Score SYNCRUSH_SCORE, modes classic / hard (grilles 4x4 et inverseurs dès le début, moins de temps) / daily (mêmes grilles pour tous), score envoyé au game over définitif (chrono à 0). Grilles générées à l\'envers depuis une grille synchronisée : toujours solubles, PAR = longueur de la solution. Chrono 45 s (40 en Hard), +10 s par grille, +4 s si PERFECT, plafond 60 s ; OVERLOAD toutes les 5 grilles (chrono x1,5, points x2, +1 FREEZE et +1 HINT). Pub revive une fois par partie (+20 s, grille, score et combo conservés, context revive, offre de 8 s). Pub HINT quand les indices sont épuisés (3 max par partie, context hint) : affiche le prochain coup après être revenu au dernier coup juste. Tactile : glisser / faire glisser le doigt (déplacements enchaînés) ou taper une case voisine ; clavier : flèches / WASD / ZQSD, U ou Retour arrière = undo, H hint, F freeze, R reset, P pause. Défi ami par lien (sy_seed, sy_beat, sy_mode). Pour tester : #sytest dans l\'URL expose window.SY_TEST (level(5) = OVERLOAD, solve(), time(s)).',
    pr: 71,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'Close-up of a glowing futuristic reactor grid seen from slightly above, a 4x4 board of glossy dark navy square cores with thick neon outlines, each core showing a single large glowing number, most cores outlined in laser mint green, a few in hot coral with diagonal warning stripes and a small red minus badge, a bright mint energy pulse ring spinning on one core and leaving a light trail, a huge shockwave ring of mint and gold light bursting out of the grid as every core syncs, sparks and glowing particles flying, crackling coral electric arcs along the board frame, deep navy and ultraviolet background with a synthwave perspective grid floor, strong bloom, high contrast, no letters, no words, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of a neon cyber reactor chamber at night, a large floating square grid of glossy dark cores with glowing laser mint green outlines hovering above a synthwave perspective grid floor, a few hot coral inverter cores with diagonal stripes, a glowing mint energy orb with spinning rings jumping from core to core and leaving a bright trail, a golden arrow of light hinting at the next move, a circular timer bar of mint and gold light around the scene, an icy blue frost glow creeping in from the edges, coral lightning crackling along the frame, floating dust and sparks, deep navy and ultraviolet sky, strong bloom, high contrast, the cores show simple numbers only, no words, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "SYNCRUSH" in bold, heavy, italic capital letters on one line, SYNC in glossy laser mint green and RUSH in hot coral, each letter sitting inside its own rounded square tile like cores on a grid, the tiles slightly offset in height and snapping into perfect alignment with small speed lines, a thin glowing pulse line running through all the tiles like a heartbeat, deep navy outline and a soft neon glow, glossy beveled surfaces, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
]
