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
    id: 'hyperhop',
    title: 'HYPERHOP',
    description: 'Saut de tour en tour en 3D néon (v4 : façades texturées et reflets de ville nocturne, 5 décors de monde, textes lisibles, robot plus grand, nouveau WARDEN) : maintiens pour charger, relâche pour bondir, vise le centre pour enchaîner les PERFECT jusqu\'au HYPER MODE. Tours spéciales, embranchements, power-ups, 5 mondes, boss WARDEN en 3 phases, missions du jour, boutique de robots et sauvegarde en ligne.',
    thumbnail: '/thumbnails/hyperhop.jpg',
    category: 'challenge',
    orientation: 'portrait',
    file: '/games/hyperhop.html',
    notes: 'Three.js, v3 (décors propres à chaque monde, un seul message par atterrissage, annonces en file d\'attente). Score HYPERHOP_SCORE, modes classic / time (Time Attack 60 s) / hard / daily (meilleur score d\'une partie). Pubs via RH_AD_REQUEST : revive (5 s pour choisir, une fois par partie), double_coins (x2 pièces en fin de partie), rocket_start (partie Classic qui démarre à la tour 25), daily_capsule (capsule gratuite par jour), skin_trial (robot verrouillé pour une partie). Sauvegarde en ligne RH_SAVE (pièces, niveau, robots, missions). Tactile/souris : maintenir puis relâcher, tap en l\'air = double saut (power-up), tap pendant la chute = rejouer ; clavier : Espace, P pause. Défi ami par lien (hh_seed, hh_beat, hh_hops).',
    pr: 67,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A small cute white and teal robot in mid-air doing a front flip between two tall glowing neon towers that rise out of a violet mist, the target tower top glowing with a bright teal bullseye ring, a giant striped synthwave sun sinking behind a dark city skyline with red rooftop beacons, pink and indigo sky, an endless magenta grid far below, sparks and light trails, dramatic low angle, strong bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic panorama of five floating worlds of neon towers side by side, a synthwave city with a striped sun, a glacier of ice spires under green aurora curtains, a magma field of jagged lava-veined rocks, deep space with a ringed purple gas giant and asteroids, a golden temple of pyramids and floating gold rings, a small white robot leaping between towers with a glowing arc trail, strong bloom, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "HYPERHOP" in bold, chunky, italic capital letters that bounce along an invisible arc as if each letter is mid-jump, the O and the final P slightly squashed as if landing, a dotted jump trajectory arching over the word, color palette mint teal and tangerine orange with a deep indigo outline, glossy beveled neon tubes with a soft glow, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
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
]
