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
    description: 'Plateforme 3D néon à gravité sphérique (v2 confort : planètes deux fois plus grandes, caméra calme, décors qui s\'effacent devant le héros). Cours autour des planètes, double saut, dash et attaque tournoyante, rampes de lancement. Un monde par thème : gravité basse, geysers, glace qui glisse, rivières et cheminées de lave, lune en orbite. Ramasse les éclats (radar en haut à droite) pour ouvrir le portail, écrase les monstres animés et le boss The Comet ; les éclats débloquent 7 costumes sauvegardés sur le compte.',
    thumbnail: '/thumbnails/graviton.jpg',
    category: 'adventure',
    orientation: 'portrait',
    file: '/games/graviton.html',
    notes: 'Three.js 0.160. Score GRAVITON_SCORE, modes classic (60 s) / hard (sans dash, 2 cœurs, 48 s, Comet tous les 2 secteurs) / daily (même galaxie pour tous), score envoyé au game over définitif. Pub revive une fois par partie (+20 s, context revive). Caméra COMFORT par défaut (option DYNAMIC dans le menu et la pause, mémorisée). Thèmes par secteur : 1 Solar Reef gravité basse, 2 Rose Nebula geysers, 3 Cyan Drift glace, 4 Ember Belt lave (cheminées qui brûlent), 5 Void Garden lune en orbite (sauter dessus quand elle passe). Progression : éclats cumulés (sauvegarde en ligne RH_SAVE, progress = éclats), costumes Nova 0, Solar 40, Aurora 120, Void 250, Ember 400, Glacier 650, Celestial 1000, choix dans le menu (aperçu des costumes verrouillés). Défi ami par lien (gv_seed, gv_beat, gv_mode). Pour tester : #gvtest dans l\'URL expose window.GV_TEST (sector(k), boss(), collectAll(), toGate(), toVent(i), toMoon(), god(true), ff(s), save(), cam(\'dynamic\')).',
    pr: 72,
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
  {
    id: 'shardstorm',
    title: 'SHARDSTORM',
    description: 'Shooter spatial néon à 360° : ton vaisseau traverse un champ d\'astéroïdes qui boucle sur les bords (sortir d\'un côté fait revenir par l\'autre). Glisse le doigt pour piloter, le tir est automatique. Fracasse les rochers (normaux, en fusion qui projettent des éclats, cristaux qui lâchent des bonus), ramasse les éclats pour le combo x8 et pour charger NOVA, esquive chasseurs, tireurs, kamikazes, poseurs de mines et soucoupes, et abats le DREADNOUGHT tous les 5 secteurs.',
    thumbnail: '/thumbnails/shardstorm.jpg',
    category: 'shooting',
    orientation: 'portrait',
    file: '/games/shardstorm.html',
    notes: 'Canvas 2D, sprites CC0 recolorés. Score SHARDSTORM_SCORE, modes classic (3 vaisseaux) / hard (1 vaisseau, vitesse x1,3, rochers en fusion dès le secteur 1, NOVA plus lente) / daily (même champ pour tous), score envoyé au game over définitif. Pub revive une fois par partie (+1 vaisseau, bouclier, menaces proches effacées, context revive, offre de 8 s). Tactile : stick flottant n\'importe où (direction + poussée), tir automatique avec légère aide à la visée, boutons WARP (saut de 150 unités qui détruit tout sur sa trajectoire, recharge 4,5 s) et NOVA (onde qui rase l\'écran, chargée par les éclats) en arc en bas à droite ; clavier : flèches / WASD / ZQSD, Maj ou X warp, E nova, P pause. Arme LV 1 à 5 (bonus SPREAD, -1 niveau à chaque mort), bonus RAPID / SHIELD / MAGNET / FREEZE / +1 SHIP. Ennemis : Hunter (secteur 2), Gunner (3), Kamikaze (4), Miner (6), soucoupe qui traverse (2+) ; boss DREADNOUGHT tous les 5 secteurs (spirales, éventails visés, renforts, rochers en fusion, phase OVERDRIVE sous 50 %). Défi ami par lien (ss_seed, ss_beat, ss_mode). Pour tester : #sstest dans l\'URL expose window.SS_TEST (wave(5) = boss, god(true), nova(), pickup(\'spread\'), kill()).',
    pr: 74,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A sleek golden amber arrowhead starfighter seen from above, blasting a wide fan of white-hot plasma bolts upward with a bright orange engine flame and a glowing trail, a huge dark violet asteroid in front of it shattering into glowing purple fragments and dozens of small electric teal diamond-shaped crystal shards, a molten orange asteroid cracking open with lava light and spraying embers, a massive menacing crimson and black winged mothership looming at the top with a red neon outline, firing a spiral of hot pink plasma orbs, a thin hexagonal teal energy shield around the fighter, deep indigo and purple nebula with tiny stars and a faint neon grid, flat-shaded vector game art style with strong neon bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic top-down view of a neon asteroid field in deep space, a small golden amber starfighter on the left weaving between tumbling dark violet asteroids outlined in glowing purple, firing streaks of white-hot plasma, a huge electric teal shockwave ring expanding from the ship and blowing several asteroids apart into glowing teal crystal shards, molten orange asteroids cracking with lava light, a crimson hunter drone, a magenta kamikaze ship dashing along a dashed targeting line and a teal flying saucer on the right, a giant crimson and black winged dreadnought mothership in the upper right firing spirals of pink plasma orbs, purple and indigo nebula clouds, scattered stars and a faint perspective grid, flat-shaded vector game art style with strong bloom, high contrast, no text, no letters, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "SHARDSTORM" in bold, heavy, italic capital letters on one line, SHARD in molten amber gold and STORM in blood crimson red, the letters carved like cracked asteroid rock with glowing lava seams, the letter A split in two by a bright plasma bolt, small electric teal crystal shards bursting off the edges of the word as if it had just been shot, a thin golden arrowhead starfighter silhouette streaking under the word like an underline, dark maroon outline and a soft neon glow, glossy beveled surfaces, centered on a plain pure black background, crisp vector style, high contrast, no other text, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'slamgrid',
    title: 'SLAMGRID',
    description: 'Puzzle 3D néon : un ninja saute de cube en cube et chaque atterrissage retourne le cube (levé, il s\'écrase ; écrasé, il remonte). Écrase toute la grille avant d\'épuiser tes coups, idéalement au PAR pour enchaîner les PERFECT. Gremlins à écraser en atterrissant dessus (jamais les Spikers), spores, téléportations, cubes de cristal à frapper deux fois, et le boss THE MONOLITH tous les 5 plateaux, dont le laser balaie une rangée. Pouvoirs UNDO, HINT et RESET.',
    thumbnail: '/thumbnails/slamgrid.jpg',
    category: 'brain',
    orientation: 'portrait',
    file: '/games/slamgrid.html',
    notes: 'Three.js 0.160 (bloom, ACES, ombres douces), modèles animés CC0 recolorés. Score SLAMGRID_SCORE, modes classic (3 cœurs) / hard (2 cœurs, plateaux plus grands, presque aucun coup de réserve, gremlins et cristaux dès le plateau 2) / daily (mêmes plateaux pour tous ce jour-là), score envoyé au game over définitif. Plateaux générés à l\'envers depuis une marche aléatoire : toujours solubles, PAR = longueur de la marche, budget = PAR + réserve. Coups épuisés = -1 cœur et la grille repart de zéro ; touché = -1 cœur. Gremlins au tour par tour, case visée annoncée (croix rouge) : Bloblet (saute au hasard), Spiker (roule en ligne, ne jamais atterrir dessus), Sporecap (spores en croix tous les 3 tours), Stinger (poursuit tous les 2 tours), Wisp (se téléporte tous les 3 tours). Boss The Monolith tous les 5 plateaux : rangée ou colonne annoncée 2 tours avant le laser, sa jauge = cubes encore levés ; le vaincre donne +2 500, +1 UNDO, +1 cœur. Pub revive une fois par partie (2 cœurs, 1 en Hard, plateau recommencé, context revive, offre de 8 s). Pub HINT quand les 2 indices sont épuisés (3 max par partie, context hint) : revient au dernier coup juste et allume les 3 cubes suivants. Tactile : taper un cube voisin ou glisser ; clavier : flèches / WASD / ZQSD (suivent l\'écran), U undo, H hint, R reset, P pause. Défi ami par lien (sg_seed, sg_beat, sg_mode). Pour tester : #sgtest dans l\'URL expose window.SG_TEST (solve(), board(n), exhaust(), kill(), path()).',
    pr: 80,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A small ninja in a glowing ice-white suit with a lemon yellow headband scarf, caught mid-air stomping down onto a tall ultraviolet neon cube, the cube punching down into the board with a burst of lemon yellow sparks, flying cube shards and a bright shockwave ring, a diamond-shaped isometric board of tall dark brushed-metal cubes with glowing violet edges and chevron glyphs on top, many cubes already slammed flush and glowing lemon yellow, one frosty crystal cube with a diamond glyph, a cute pink blob creature and a spiky orange ball creature on nearby cubes with red X warning tiles under them, a giant floating pink stone golem in the background firing a hot pink laser beam across one row of the board, synthwave neon grid floor in magenta and violet fading into a starry indigo sky with floating cubes, isometric 3D render, strong bloom, high contrast, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic isometric view of a large neon puzzle arena floating above an endless synthwave grid, a square board of tall dark brushed-metal cubes with ultraviolet neon edges and chevron glyphs, a winding trail of cubes already slammed flush and glowing lemon yellow behind a small ice-white ninja with a lemon yellow scarf leaping from cube to cube, glowing lemon hint rings on the next cubes, two pale crystal cubes with diamond glyphs, a pink blob, a spiky orange ball, a green mushroom creature puffing green spores in a cross pattern, a yellow bee and a cyan ghost wisp standing on cubes, red X warning tiles under them, a huge pink stone golem boss floating behind the board charging a hot pink laser along a highlighted row, floating cubes and stars in an indigo and magenta sky, strong bloom, high contrast, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "SLAMGRID" in bold, heavy, blocky capital letters on one line, each letter carved as a chunky square cube tile seen slightly from above, SLAM in electric lemon yellow and GRID in deep ultraviolet purple, the letter M slammed lower than the other tiles with a small hot pink shockwave ring and cube fragments bursting out under it, thin glowing grid lines running behind the word in perspective, deep plum outline and a soft neon glow, glossy beveled surfaces, color palette electric lemon yellow, ultraviolet purple and a touch of hot pink, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
  {
    id: 'rage-tap',
    title: 'RAGE TAP',
    description: 'Jeu de vitesse ultra simple (idée d\'un ami de Laurent) : taper le plus vite possible n\'importe où sur l\'écran (doigts sur mobile, clic gauche sur desktop) pendant 5 s, 10 s, 30 s ou 1 min. Chaque tap est un coup de poing du boxeur sur un sac de frappe monstre. Score en taps et clics par seconde (CPS), rangs de Turtle à Beyond Human, courbe du CPS en fin de partie, classements séparés mobile et desktop pour chaque durée.',
    thumbnail: '/thumbnails/rage-tap.jpg',
    category: 'challenge',
    orientation: 'portrait',
    file: '/games/rage-tap.html',
    notes: 'Canvas 2D. Score RAGE_TAP_SCORE envoyé à la fin du chrono, score = nombre de taps, scoreLabel « N taps · X CPS ». 8 classements : mode = <mobile|desktop>-<5|10|30|60>s (ex. mobile-10s). Appareil déterminé par le type réel du premier tap (doigt ou stylet = mobile, souris = desktop), verrouillé pour la partie ; desktop : clic gauche seulement ; mobile : plusieurs doigts autorisés (un tap par doigt). Aucun filtre sur les taps rapprochés. Anti-triche : partie non classée (score non envoyé, message sur l\'écran de fin) si le rythme est d\'une régularité de machine (coefficient de variation des intervalles < 0,08 sur 30 taps et plus) ou si la moyenne dépasse 30 CPS (desktop) / 35 CPS (mobile). Le tap est compté dans le gestionnaire pointerdown avant tout dessin : l\'animation ne peut ni retarder ni perdre un tap. Compte à rebours 3-2-1 puis le chrono démarre au premier tap. Rangs (CPS moyen) : Turtle < 4, Rabbit 4, Cheetah 6, Machine Gun 8, Rage God 10, Beyond Human 13+. Barre « +n VS BEST » en direct, combo (taps à moins de 220 ms d\'écart), courbe CPS à la fin (pas de 0,5 s, 1 s ou 2 s), pic et record. Pas de pub revive (fausserait le chrono) : pub optionnelle pour débloquer les thèmes TOXIC, ICE, GOLD (context theme), sans effet sur le score. Quitter la page pendant une partie l\'annule sans score. Défi ami par lien (rt_t, rt_beat, rt_dev). Pour tester : #rttest dans l\'URL expose window.RT_TEST (state(), end()).',
    pr: 0,
    extras: [
      { label: 'Prompt miniature 1:1 (Gemini, 1024x1024)', text: 'A lean boxer seen from the side in a dark purple tank top, red shorts and a glowing yellow headband with flying tails, throwing a blurred lightning-fast flurry of glossy red boxing gloves into a hanging monster punching bag, the bag is a dark crimson leather capsule with an angry cartoon monster face, spiral dizzy eyes, sharp white teeth and a sticking plaster, swinging hard on its chain, an explosion of white sparks and orange embers at the impact point, motion trails behind the gloves, dozens of tiny glowing yellow impact flashes around, a neon boxing ring with glowing red ropes, two white spotlights cutting through a dark smoky arena, a glowing speedometer-style gauge with its needle in the red zone at the bottom, flat vector game art style with strong neon glow, high contrast, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt image de blog 16:9 (Gemini, 1376x768)', text: 'Wide cinematic view of a neon boxing arena at night, a boxer in a dark purple tank top, red shorts and a glowing yellow headband pounding a hanging monster punching bag with an angry cartoon face and spiral dizzy eyes, the bag swinging and bursting with white sparks and orange embers, blurred red gloves with motion trails, glowing red ring ropes, white spotlights through smoke, glowing finger tap ripples scattered across the scene like shockwaves, a big glowing speedometer gauge with the needle in the red zone in the foreground, a stylized smartphone and a computer mouse floating at the edges with energy streaks, deep crimson and black palette with orange and yellow highlights, flat vector game art with strong neon bloom, high contrast, no text, no letters, no numbers, no logo.' },
      { label: 'Prompt logo du jeu (Gemini, 1:1, palette propre au jeu)', text: 'Game logo wordmark reading exactly "RAGE TAP" in bold, heavy, aggressive italic capital letters on one line, RAGE in blazing blood red with cracked, burning edges and small flames licking the top, TAP in molten gold yellow with a glossy finish, the letter A of TAP punched in by a small boxing glove impact with a starburst and speed lines, tiny sparks bursting out, thick dark maroon outline and a soft neon glow, glossy beveled surfaces, color palette blood red, molten gold and ember orange, centered on a plain pure black background, crisp vector style, high contrast, no other text, no mascot, square 1:1 1024x1024.' },
    ],
  },
]
