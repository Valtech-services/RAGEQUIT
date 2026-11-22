# Routine quotidienne : amélioration d'un jeu en test (vers 10h, heure de Paris)

Ce fichier fait foi pour la routine, en plus de `CLAUDE.md` (à lire en premier, toutes ses règles s'appliquent : Git, PR de test, fusion automatique, finition visuelle, performance, protocole score et pub, licences et panneau « Credits »).

Objectif : chaque jour, prendre **un** jeu en test, le rendre nettement plus beau et plus fun, et le livrer dans l'admin (onglet « Test des jeux ») par une PR de test fusionnée.

## 1. Choisir le jeu

1. Lire `src/data/testGames.js` sur `main` à jour.
2. Écarter :
   - les jeux améliorés pendant les 5 derniers jours (voir `routines/historique-ameliorations.md`) ;
   - les jeux qui ont déjà une PR ouverte (branche `claude/...` contenant leur `id`) ;
   - les entrées sans fichier `public/games/<id>.html`.
3. Tirer **au hasard** un jeu parmi ceux qui restent. Si tous sont écartés, prendre celui amélioré le moins récemment.
4. Ne jamais toucher à un jeu déjà publié (présent dans `src/data/games.js`).

## 2. État des lieux

- Lire le fichier du jeu, ses `notes` dans `testGames.js`, et les PR de test précédentes du jeu (titres et descriptions) : **les retours de Laurent déjà appliqués ne doivent jamais être défaits**.
- Jouer le jeu avec Playwright : iPhone 390x844 et desktop 1280x800. Captures « avant » de 3 moments (titre, action, fin de partie). Pour Three.js hors ligne, servir `three@0.160.0` depuis un `npm install three@0.160.0` fait dans un dossier temporaire (unpkg et jsDelivr ne sont pas joignables depuis le bac à sable).
- Noter ce qui fait « prototype » : zones ternes ou unies, personnages peu lisibles, effets absents, HUD faible, écran titre ou de fin pauvre, sons manquants, manque de variété.

## 3. Écrire le brief d'amélioration (avant tout code)

Un texte en français, 10 à 20 points concrets, classés par impact, couvrant :
1. **Graphismes** : lumière, post-traitement, shaders, matériaux, textures, particules, ambiance, lisibilité du héros et des dangers.
2. **Gameplay** : ce qu'on peut ajouter (variantes d'ennemis, boss, pouvoirs, objectifs, modes, progression, défis), sans casser le leaderboard existant (mêmes `mode` de score).
3. **Three.js** (jeux 3D, version figée 0.160.0, addons de la même version) : par exemple `InstancedMesh` pour les foules, `SSAOPass` ou `GTAOPass` seulement si la fluidité tient, `ShaderMaterial` pour les fonds, `Sky` / `Water` / `Reflector`, `PMREMGenerator` + HDRI, `LensflareElement`, `Points` en GPU pour les particules, `SkeletonUtils` pour cloner des personnages animés.
4. **Bibliothèques et connecteurs** (dans l'ordre de « Ressources gratuites pour les graphismes » de `CLAUDE.md`) :
   - dépôts CC0 sur GitHub (Kenney, Quaternius, KayKit...) ;
   - Poly Haven (textures, HDRI, modèles) ;
   - connecteur Hugging Face s'il est connecté : FLUX.1-schnell pour textures, fonds, sprites ; TRELLIS ou équivalent sous licence commerciale pour des modèles 3D à partir d'une image (licence lue sur la fiche du modèle, quota gratuit du compte, jamais de paiement) ;
   - toute autre bibliothèque en ligne joignable dont la licence autorise l'usage commercial et la modification (CC-BY accepté avec panneau « Credits »).
5. **Sons** : impacts, ambiance, musique générée en Web Audio si besoin.
6. **Performance** : ce que chaque ajout coûte et comment il reste au-dessus de 30 images par seconde sur iPhone.

Le brief va dans la description de la PR et s'ajoute aux `extras` du jeu dans `testGames.js` : `{ label: 'Brief amélioration du AAAA-MM-JJ', text: '...' }` (placé après les trois prompts d'image existants).

## 4. Appliquer le brief

- Branche `claude/amelio-<id>-AAAA-MM-JJ`, PR de test vers `main`.
- Appliquer tous les points réalisables du brief dans la journée, les plus impactants d'abord. Un point non fait est signalé dans la PR (raison).
- Assets ajoutés : optimisés (règles « Assets libres »), recolorés à la palette du jeu, budget 5 Mo (8 Mo pour un jeu 3D riche), notés dans `ASSETS-LICENCES.md`. S'il y en a un sous licence à attribution : ajouter ou compléter le panneau « Credits » du jeu.
- Mettre à jour les `notes` du jeu dans `testGames.js` si des mécaniques ou des touches changent. Le `pr` du jeu reste celui de sa PR de test d'origine.
- Tests Playwright (iPhone 390x844 et desktop 1280x800) : démarrage, contrôles, fin de partie, pub, messages `_SCORE` et `RH_TRACK`, aucune erreur console, rien de coupé, coin haut-gauche libre. Captures « après » des mêmes 3 moments.
- `npm install && npm run build` (variables Supabase factices si absentes), ligne `[prerender] N/N pages prérendues` vérifiée, `package-lock.json` jamais commité.
- Description de PR en français : jeu, brief, ce qui a été fait, assets et licences, sources indisponibles, résultats des tests, fluidité.
- Fusionner la PR (API GitHub), puis vérifier que le déploiement Vercel du projet `ragequit` est `READY`.

## 5. Historique et notification

- Ajouter une ligne à `routines/historique-ameliorations.md` (dans la même PR) : date, jeu, PR, résumé en une phrase.
- **Toujours** finir par une notification à Laurent (`PushNotification`, résumé entre balises `routine_summary`) : jeu amélioré, les 3 changements les plus visibles, lien de la PR, état du déploiement, rappel qu'il le trouve dans l'admin. En cas d'échec : la raison et ce qu'il doit faire, PR laissée ouverte sans fusion.

## Interdits

- Plus d'un jeu par jour ; tout jeu déjà publié ; défaire un retour de Laurent.
- Payer, saisir un moyen de paiement, démarrer un essai payant, créer plusieurs comptes.
- Une licence « non commercial », « pas de modification » ou « partage à l'identique », ou un asset sans licence claire.
