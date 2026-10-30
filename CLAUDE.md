# RageQuit Arcade — règles pour Claude

Ce fichier est lu automatiquement par Claude à chaque session sur ce repo, y compris la tâche planifiée quotidienne. Il fait foi.

## Contexte

- Site : https://ragequit-arcade.com — plateforme de jeux HTML5 gratuits (Vite + React + Supabase), déployée par Vercel à chaque push sur `main`.
- Propriétaire : Laurent (Valtech Services). Communication en français, aucun emoji, réponses concises.
- Laurent ne travaille pas en terminal : il relit et fusionne les Pull Requests depuis GitHub (souvent sur téléphone).
- Contenu du site (descriptions, FAQ, blog) : en anglais.

## Règle de travail Git

- Ne jamais pousser directement sur `main`.
- Une branche par jeu : `claude/jeu-<id>`, puis une Pull Request vers `main`.
- Vercel génère une preview de chaque Pull Request : indiquer dans la description de la PR qu'on peut tester le jeu dessus avant de fusionner.

## Pipeline « un jeu par jour »

1. Ouvrir `backlog.md`, prendre le premier jeu au statut `à faire`.
2. Cloner la source dans un dossier temporaire hors du repo. Ne jamais exécuter son code (pas de `npm install` ni de script) : on la lit uniquement.
3. Audit sécurité de la source : appels réseau, scripts externes, code obfusqué, `eval`, trackers, iframes. Le noter dans la PR.
4. Concevoir la transformation (voir « Transformation obligatoire ») et l'écrire dans la PR avant le code.
5. Réécrire le jeu en un seul fichier `public/games/<id>.html` en appliquant les règles du prompt ci-dessous.
6. Tester avec Playwright : desktop 1280x800, iPhone portrait 390x844 (et paysage si le jeu l'exige). Vérifier : démarrage, contrôles tactiles et clavier, game over, pub revive, envoi `_SCORE` et `RH_TRACK` (écouter `message` sur la page parente), aucune erreur console, aucun bouton coupé.
7. Miniature `public/thumbnails/<id>.jpg` (carré, 1:1) et image de blog `public/blog/<id>-tips.jpg` (16:9) : capture Playwright d'un moment de jeu spectaculaire. Ajouter dans la PR un prompt d'image pour que Laurent puisse générer une version plus belle s'il le souhaite.
8. Intégration site :
   - `src/data/games.js` : nouvelle entrée à la fin du tableau `games`, même format que `city-runner` (description de 400 mots minimum, `tags`, `controls`, `author: 'Ragequit Arcade'`, `isNew: true`, `modes`, `defaultMode`, `seo` avec `title`, `metaDescription` et 8 questions de FAQ minimum).
   - `src/data/blog.js` : article guide `<id>-tips` (même format que `city-runner-tips`).
   - `public/sitemap.xml` : URLs `/game/<id>` et `/blog/<id>-tips` avec `lastmod` du jour.
   - Mettre à jour le texte de la catégorie concernée dans `categories` si le jeu y devient marquant.
9. Lancer `npm ci && npm run build` pour vérifier que le site compile.
10. Mettre à jour `backlog.md` : passer le jeu en `publié (PR #n)`, puis ajouter 2 ou 3 nouveaux candidats vérifiés (licence + intérêt) en fin de liste.
11. Ouvrir la PR. Description en français : nom du jeu, ce qui a été transformé, résultats des tests, identifiant choisi, prompt d'image.

## Transformation obligatoire

On ne republie jamais un jeu tel quel. La source sert de référence de gameplay ; le code est entièrement réécrit. Pour chaque jeu, être force de proposition et appliquer au minimum :
- un nouveau nom et une identité visuelle propre à RageQuit (néon, agressif, lisible sur mobile) ;
- au moins deux mécaniques nouvelles (modes de jeu, power-ups, difficulté progressive, objectifs, défi entre amis par lien, mode Hard avec son leaderboard, run quotidien...) ;
- des contrôles pensés mobile d'abord (plus de 85 % du trafic) ;
- le leaderboard et la pub revive selon le protocole ci-dessous.

Réécrire le code (plutôt que retoucher celui de l'auteur) garantit que le fichier final ne contient aucune portion du code d'origine. C'est ce qui permet d'appliquer la règle 2 (aucun crédit) sans enfreindre la licence de la source, et de rester cohérent avec le blog du site qui affirme que les jeux sont créés par RageQuit. Les images, sons et polices d'origine ne sont jamais réutilisés : tout est généré (canvas, formes, Web Audio).

## Prompt de retravail d'un jeu (référence)

1. FORMAT DE SORTIE
- Un seul fichier .html autonome : tout le CSS dans une balise `<style>`, tout le JavaScript dans une balise `<script>`. Aucune dépendance externe, aucun build, aucun import de fichier local.

2. SUPPRESSION DES CRÉDITS
- Aucune référence à un auteur, un pseudo, un créateur, une entreprise, un studio ou une source (CodePen, GitHub, etc.) : ni commentaire de crédit, ni `<meta author>`, ni texte visible, ni lien, ni watermark. Le fichier ne contient aucune attribution.

3. AFFICHAGE MOBILE
- Viewport : `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />`
- Dans `:root` : `--safe-top: env(safe-area-inset-top, 0px); --safe-bottom: env(safe-area-inset-bottom, 0px); --safe-left: env(safe-area-inset-left, 0px); --safe-right: env(safe-area-inset-right, 0px);`
- Hauteur plein écran : `100vh` puis `100dvh` juste après. Jamais `100vh` seul.
- Aucun décalage en pixels codé en dur pour la barre d'URL ou la barre home : `bottom: calc(VALEUR + var(--safe-bottom))`, idem pour les autres bords.
- Overlays et modales : padding incluant `var(--safe-top)` et `var(--safe-bottom)`, panneau interne `max-height: 100%` (jamais `90vh` ni `100vh`) et `overflow-y: auto`. Boutons de fermeture toujours visibles sur iPhone 15/16/17 Pro, Safari et Chrome.
- `html, body { overflow: hidden; overscroll-behavior: none; }` et, pour les jeux canvas, `touch-action: none` sur le canvas et le body.

4. NETTOYAGE
- Aucune règle CSS en double ou contradictoire, accolades équilibrées, HTML valide.

5. LOGIQUE / QUALITÉ
- Code propre et structuré. Le gameplay est transformé selon la section « Transformation obligatoire ».

6. RÉSULTAT ATTENDU
- Affichage parfait sur desktop et mobile : aucune zone basse masquée, aucun bouton coupé, dans l'orientation prévue par le jeu.

7. SCORE, PUB ET ANALYTICS (protocole obligatoire)
Le jeu tourne dans une iframe et ne parle au site que par `postMessage`. Le site écoute : tout type finissant par `_SCORE` alimente le leaderboard, `RH_TRACK` alimente l'analytics.
- Identifiant : constante en minuscules-avec-tirets dérivée du nom (ex. `voidfall`), identique à l'`id` dans `games.js`.
- Score, au game over définitif (après l'éventuel continue par pub), à chaque endroit où le run se termine réellement :
```js
try { window.parent && window.parent.postMessage({
  type: 'NOMDUJEU_SCORE',      // majuscules, finit par _SCORE
  game: 'nom-du-jeu',          // champ game (pas game_id)
  mode: 'classic',             // ou le mode réel
  score: score,                // entier
  scoreLabel: score.toLocaleString('en-US') + ' unité'
}, '*'); } catch (e) {}
```
  Classement où le plus petit gagne (speedrun) : `score = -tempsEnSecondes`, vrai temps dans `scoreLabel`.
- Pub récompensée : une seule fois par partie, au game over, bouton « regarder une pub pour continuer ». Overlay simulé de 5 s (label « Advertisement », compte à rebours), puis récompense. Au moment exact où elle est accordée :
```js
try { window.parent && window.parent.postMessage({
  type: 'RH_TRACK',
  event: 'ad_rewarded_complete',
  game_id: 'nom-du-jeu',       // ici game_id (pas game)
  props: { context: 'revive' }
}, '*'); } catch (e) {}
```
- Stub SDK optionnel, désactivé par défaut, sans chargement de script externe.

8. NE RIEN INVENTER D'AUTRE
- Aucun autre type de message, aucun autre appel réseau, aucun tracker tiers.

## Choix des sources (backlog)

- Licences acceptées pour les jeux de référence : MIT, BSD, ISC, Apache-2.0, Unlicense, CC0, GPL (le code étant réécrit, seule la mécanique est reprise).
- Écarter : dépôts sans licence, licences « non commercial » (CC BY-NC...), jeux trop proches d'un jeu déjà en ligne sur RageQuit, jeux impossibles à rendre jouables sur mobile.
- Sources : GitHub (liste leereilly/games, topics html5-game, js13kgames), Gitee (recherche `html5小游戏`).
