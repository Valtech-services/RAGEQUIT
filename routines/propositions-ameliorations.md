# Routine quotidienne : propositions d'amélioration de jeux (9h48, heure de Paris)

Ce fichier fait foi pour la routine « RageQuit : propositions d'amélioration de jeux », en plus de `CLAUDE.md` (à lire en premier). Décision de Laurent du 2026-11-26 : la routine **ne modifie plus un jeu d'elle-même**. Chaque jour, elle propose ; Laurent valide ou refuse ; seules les propositions validées sont appliquées.

Fichiers : `routines/propositions-ameliorations-suivi.md` (registre des propositions et de leur statut) et `routines/historique-ameliorations.md` (une ligne par jeu réellement modifié).

## 0. Consigne de Laurent (avant tout travail)

Lire `routines/consignes-routines.md` et la mémoire Claude de Laurent (`/areas/ragequit-arcade.md`) : consigne pour la routine `amélioration` datée d'aujourd'hui (heure de Paris). Règle complète dans `CLAUDE.md`, paragraphe « Consignes pour les routines d'amélioration et d'audit ».
- `pas aujourd'hui` : ne rien faire d'autre ; passer la ligne en `utilisée` (petite PR qui ne touche qu'à `routines/consignes-routines.md`, fusionnée) et notification courte.
- `à faire` ou aucune consigne : exécution normale.

## 1. Appliquer d'abord ce que Laurent a validé

Lire le registre `routines/propositions-ameliorations-suivi.md` (et la mémoire, lignes « Améliorations OK » / « Améliorations non » non encore reportées : les recopier dans le registre).
- S'il existe des propositions au statut `validé` : les appliquer, **un seul jeu par exécution** (celui validé le plus tôt), dans une PR `claude/amelio-<id>-AAAA-MM-JJ` qui ne contient que les propositions validées de ce jeu, rien d'autre.
  - **Jeu en test** (`testGames.js`) : PR de test, comme avant (extras du jeu complétés avec le texte des propositions appliquées).
  - **Jeu en ligne** (`games.js`) : la validation de Laurent vaut feu vert de mise en ligne. Garder les mêmes `id`, type de message `_SCORE` et `mode` de score (le classement existant reste valable), ne jamais casser une sauvegarde existante (`localStorage`, `game_saves`), mettre à jour la fiche (`games.js`, ses traductions dans les 11 langues, FAQ) seulement si un texte devient faux.
  - Règles de `CLAUDE.md` : finition visuelle, assets libres (licence, optimisation, `ASSETS-LICENCES.md`, panneau « Credits »), tests Playwright iPhone 390x844 et desktop 1280x800 (captures avant / après), `npm install && npm run build` (ligne `[prerender] N/N pages prérendues`), fusion, déploiement Vercel `READY`.
  - Registre : propositions appliquées passées en `fait (PR #n)` ; une ligne dans `routines/historique-ameliorations.md`.
- Une proposition `refusé` ne se repropose jamais. Un jeu entièrement refusé par Laurent (« ne touche pas à <jeu> ») est noté `jeu exclu` et n'est plus jamais sélectionné.

## 2. Choisir 2 jeux à étudier

- **1 jeu en test** (`src/data/testGames.js`) **et 1 jeu en ligne** (`src/data/games.js`), tirés au hasard. S'il n'y a aucun jeu en test, 2 jeux en ligne.
- Pour les jeux en ligne, priorité aux **plus anciens** et à ceux qui ont l'air d'un prototype face aux jeux récents : images bitmap ternes ou peu lisibles (ex. Dead Zone, jeu sombre aux zombies en images), rendu daté, aucun post-traitement, HUD faible.
- Écarter : jeu exclu ; jeu qui a déjà des propositions `proposé` en attente de réponse ; jeu étudié ces 14 derniers jours ; jeu avec une PR ouverte.

## 3. Étudier et proposer (sans rien modifier)

Pour chacun des 2 jeux : le jouer avec Playwright (iPhone 390x844 et desktop 1280x800), captures, lecture du code et des retours de Laurent déjà appliqués (ne jamais proposer de les défaire). Puis écrire une **série de propositions numérotées** au format `<ID>-<n>` (ID court du jeu, ex. `DZ-1`, `QS-2`), en deux groupes :

1. **Design** (priorité, surtout pour les jeux anciens) : ce qu'apportent les ressources mises en place depuis (voir `CLAUDE.md`, « Ressources gratuites pour les graphismes ») :
   - remplacer des images bitmap par un rendu dessiné en code (canvas, SVG, shaders) ou par des modèles et sprites CC0 recolorés (Kenney, Quaternius, KayKit sur GitHub) ;
   - textures et HDRI Poly Haven ;
   - connecteur Hugging Face s'il est connecté (FLUX.1-schnell pour fonds, textures, sprites ; modèle 3D sous licence commerciale) ;
   - Three.js 0.160.0 et ses addons (bloom, tone mapping, ombres, `InstancedMesh`, particules GPU) quand le passage en 3D ou un fond 3D a du sens ;
   - finition visuelle (`CLAUDE.md`) : éclairage, particules, game feel, HUD, écran titre, transitions.
2. **Gameplay** : modes, ennemis, boss, progression, objectifs, pubs récompensées adaptées, sans casser le classement existant.

Chaque proposition : ce qui change (concret), pourquoi (ce qui ne va pas aujourd'hui, capture à l'appui), effort S / M / L, impact, poids et coût en fluidité, licences des assets envisagés. Pas de remplissage : 3 à 8 propositions par jeu, classées par impact.

## 4. Livrer les propositions

- Registre `routines/propositions-ameliorations-suivi.md` : une ligne par proposition, statut `proposé`, dans une petite PR `claude/propositions-AAAA-MM-JJ` qui ne touche qu'à ce registre (et à `routines/consignes-routines.md` si une ligne `à faire` passe en `utilisée`), fusionnée.
- **Notification à Laurent (obligatoire)** : l'essentiel en première phrase (les 2 jeux), puis chaque proposition en une ligne (`DZ-1 : …`), ce qui a été appliqué à l'étape 1 s'il y a lieu (jeu, PR, déploiement), et la façon de répondre :
  - « Améliorations OK : DZ-1, DZ-3, QS-2 » / « Améliorations non : DZ-2 » / « Ne touche pas à Dead Zone » ;
  - il peut répondre dans n'importe quelle conversation, ou directement dans la session de la routine.
- Toujours indiquer la consigne retenue et sa source (fichier, mémoire ou aucune). En cas d'échec : la raison.

## 5. Quand Laurent répond (n'importe quelle conversation)

Le Claude qui reçoit la réponse met à jour le registre (`validé` / `refusé` / `jeu exclu`, avec la phrase et la date) par une petite PR fusionnée aussitôt. Si Laurent demande de l'appliquer tout de suite (« applique », « vas-y »), ce Claude applique lui-même les propositions validées selon l'étape 1 ; sinon la prochaine exécution s'en charge. Sans accès au dépôt : ligne dans la mémoire Claude (`/areas/ragequit-arcade.md`) commençant par « Améliorations OK » ou « Améliorations non », avec la date et les numéros.

## Interdits

- Modifier un jeu sans proposition validée par Laurent.
- Plus d'un jeu modifié par exécution ; défaire un retour de Laurent.
- Payer, saisir un moyen de paiement, démarrer un essai payant, créer plusieurs comptes.
- Une licence « non commercial », « pas de modification » ou « partage à l'identique », ou un asset sans licence claire.
