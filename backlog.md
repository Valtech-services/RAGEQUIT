# Backlog des jeux

Un jeu par jour, dans l'ordre de la liste. Après chaque publication : passer le jeu en `publié (PR #n)` et ajouter 2 ou 3 nouveaux candidats en fin de liste.

Les jeux 3D (Three.js, personnage) sont intercalés avec les jeux 2D : environ un sur deux. La colonne « Le jeu d'origine en bref » décrit la source ; la piste décrit la version RageQuit.

Rappel : la source sert de référence de gameplay, le jeu est entièrement réécrit et transformé (voir CLAUDE.md).

| # | Source (référence gameplay) | Licence | Catégorie visée | Le jeu d'origine en bref | Piste de transformation | Statut |
|---|---|---|---|---|---|---|
| 1 | Zolmeister/avabranch | MIT | arcade | Plusieurs lignes qui avancent et se séparent pour passer entre des murs. | LINESTORM (`linestorm`, ex-SPLITSTORM) : 4 lignes néon, portes à écarter / murs à resserrer, orbes, Overdrive, power-ups, vitesse croissante, modes Classic / Hard / Daily, défi ami, zones, skins, missions du jour | publié (PR #7) |
| 2 | leereilly/Coil (Hakim El Hattab) | MIT | arcade | On dessine des boucles avec la traînée d'un curseur pour encercler les ennemis. | LOOPSTRIKE (`loopstrike`) : boucles néon avec la traînée, cores à encercler, mines, hunters, boss Warden toutes les 5 vagues, combo x8, power-ups, modes Classic / Hard / Daily, défi ami | en test (PR #17) |
| 3 | wwwtyro/Astray | Domaine public | challenge | Bille dans un labyrinthe 3D qu'on fait rouler en inclinant le plateau. | TILTSHOCK (`tiltshock`) : labyrinthe néon 3D Three.js à incliner (stick flottant, gyroscope optionnel), noyau-robot dans une bulle, chrono à recharger, trous et lasers, power-ups Radar / Magnet / Phase / Freeze, modes Classic / Hard (glace) / Daily, défi ami | en test (PR #19) |
| 16 | tcast1000/bumper-ball | MIT | arcade | **3D Three.js** : arène sumo, un perso chibi sur une boule doit pousser 3 IA hors d'une plateforme flottante. | Arène néon qui rétrécit, vagues de bots et boss lourd, power-ups (masse x2, onde de choc, bouclier), mode Hard sur glace, run quotidien. Stick virtuel + bouton dash. Supprimer l'envoi Firebase de la source | à faire |
| 4 | Zolmeister/zop | MIT | puzzle | Grille de points colorés : on relie d'un trait les points de même couleur. | Relier les couleurs identiques en un tracé, chaînes longues = bonus, mode contre la montre | à faire |
| 17 | shenmaxg/web-jump | MIT | challenge | **3D Three.js** : clone de « Tiao Yi Tiao » : on maintient le doigt pour charger un saut, le pion bondit de bloc en bloc. | Blocs piégés (effondrement, mobiles, rebond), combos de centre parfait, mode Time Attack 60 s, défi ami sur la même graine. Une seule touche | à faire |
| 5 | budnix/ball-and-wall | MIT | arcade | Casse-briques : une raquette, une balle, des murs de briques à détruire. | Casse-briques néon, power-ups, niveaux générés, défi entre amis par lien | à faire |
| 18 | elbkr/frog-at-dusk | MIT | adventure | **3D Three.js** : grenouille qui saute de case en case et doit survivre jusqu'à l'aube face à 4 types d'ennemis. | Nuits en vagues, boss à la 3e nuit, modes Easy / Normal / Hardcore avec leaderboards séparés, défi par lien. Swipe + bouton attaque | à faire |
| 6 | basicallydan/skifree.js | MIT | challenge | Skieur qui descend une pente infinie entre arbres et rochers, poursuivi par un yéti. | Descente infinie avec monstre poursuivant, slalom, record de distance, mode nuit | à faire |
| 19 | zzuli-ljz/stardust-drifter | MIT | adventure | **3D Three.js** : plateforme sur petites planètes à gravité sphérique (esprit Mario Galaxy), éclats à ramasser pour ouvrir un portail. | Contre-la-montre par secteur, run quotidien, comète boss qui poursuit, mode Hard sans dash. Joystick + saut/dash | à faire |
| 7 | abejfehr/parity | MIT | brain | Puzzle de chiffres : déplacer un curseur qui incrémente les cases pour toutes les égaliser. | Puzzle de chiffres à égaliser, niveaux quotidiens, mode Hard chronométré | à faire |
| 8 | dmcinnes/HTML5-Asteroids | MIT | shooting | Vaisseau qui tourne sur lui-même et tire sur des astéroïdes qui se fragmentent. | Shooter spatial 360° au doigt, vagues, armes à débloquer, boss | à faire |
| 9 | mminer/hexahedral | MIT | brain | Puzzle de blocs à pousser (type Sokoban) en un minimum de coups. | Pousser les blocs en un minimum de coups, étoiles par niveau, éditeur de défi partageable | à faire |
| 10 | kenrick95/c4 | MIT | brain | Puissance 4 contre une IA. | Puissance 4 contre une IA à 3 niveaux, mode « gravité inversée », série de victoires au leaderboard | à faire |
| 11 | cykod/AlienInvasion | MIT / GPL | shooting | Shoot'em up vertical : un vaisseau en bas de l'écran face à des vagues d'aliens. | Shoot'em up vertical mobile, tir auto, power-ups, vagues infinies | à faire |
| 12 | Zolmeister/prism | MIT | puzzle | Grille hexagonale où l'on fusionne des couleurs identiques (type 2048 hexagonal). | Grille hexagonale de couleurs à fusionner, réactions en chaîne | à faire |
| 13 | softvar/save-the-forest | MIT | arcade | Une forêt vue de dessus où des feux se propagent : on les éteint au doigt. | Éteindre les feux avant propagation, vent qui change, vagues chronométrées | à faire |
| 14 | binarymax/shape | MIT | brain | Jeu de réflexe : reconnaître et toucher la bonne forme avant la fin du chrono. | Réflexe de reconnaissance de formes néon : tapoter la bonne forme avant la fin du chrono, combos, mode Hard à formes qui tournent | à faire |
| 15 | Couchfriends/Space-Shooter | MIT | shooting | Shoot'em up spatial : vagues de drones, armes à améliorer. | Shoot'em up spatial au pouce, vagues de drones, armes à fusionner, boss toutes les 10 vagues | à faire |
| 20 | GeekBoySupreme/crossy-road | MIT | arcade | **3D Three.js** : poulet en voxels qui traverse routes et rivières case par case (type Crossy Road). | Univers cyberpunk (drones, lasers), aigle qui punit l'immobilité, skins, mode Hard x1,5, run quotidien. Tap + swipe | à faire |
| 21 | pranshuparmar/downhill-mayhem | Apache-2.0 | challenge | **3D Three.js** : descente de montagne en VTT contre 5 rivaux IA, figures pour le boost, coups pour faire tomber les rivaux. | Version snowboard néon, courses de 90 s, mode Brawl, mode Hard de nuit, défi chrono. Hommage à un jeu Sony : renommer, aucune référence | à faire |
| 22 | mike007jd/voxel-musou | MIT | adventure | **3D Three.js** : beat'em up en voxels façon Dynasty Warriors, un guerrier fauche des foules de soldats. | Arène fermée 2-3 min, vagues + boss toutes les 5 vagues, améliorations roguelite, mode Hard. À bien différencier de Mage Rush (corps à corps, foules) | à faire |

## Écartés

| Source | Raison |
|---|---|
| Hextris/hextris | Trop proche d'OCTAFLUX |
| lostdecade/onslaught_arena | Assets sous restriction de revente |
| maettig/starship-sorades-13k | CC BY-SA (attribution obligatoire) |
| gbatha/PolyBranch, Q42/0hh1, mindd-it/pappu-pakia, hyspace/flappy | Aucune licence |
| nmoroze/swap | CC BY-SA (attribution obligatoire) |
| ondras/custom-tetris | Licence BSD, mais Tetris est une marque protégée avec un « look and feel » défendu en justice : risque juridique |
| StarKnightt/redrock, mikaelguillin/alpine-challenge, clones helix-jump, TiagoSilvaPereira/simple-3d-fps | 3D : aucune licence |
| rameshvarun/marble-mouse | 3D : licence propriétaire (« not open source ») |
| temple-rumble, beachy-beachy-ball, zigzag | 3D : AGPL-3.0, hors liste |
| honzaap/SlashSaber | 3D : CC-BY-4.0 (attribution), pas de personnage |
| grep-many/wemble-guys | 3D : dépend d'un multijoueur P2P |
| zexadev/chiji | 3D : battle royale FPS trop lourd pour le mobile |
| Priler/dino3d | 3D : runner, trop proche de City Runner |
