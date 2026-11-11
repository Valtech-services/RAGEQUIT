# RageQuit Arcade — règles pour Claude

Ce fichier est lu automatiquement par Claude à chaque session sur ce repo, y compris la tâche planifiée quotidienne. Il fait foi.

## Contexte

- Site : https://ragequit-arcade.com — plateforme de jeux HTML5 gratuits (Vite + React + Supabase), déployée par Vercel à chaque push sur `main`.
- Propriétaire : Laurent (Valtech Services). Communication en français, aucun emoji, réponses concises.
- Laurent ne travaille pas en terminal et ne clique pas sur « Merge » : Claude fusionne lui-même ses Pull Requests (voir « Fusion automatique »).
- Contenu du site (descriptions, FAQ, blog) : en anglais.

## Bon sens avant les règles

Les règles de ce fichier sont des repères, pas des carcans. Pour chaque jeu, choisir distinctement la meilleure solution pour ce jeu-là, avec bon sens : nombre de boutons à l'écran, placements de pub, modes, progression, contrôles. Un jeu à progression peut avoir plusieurs pouvoirs visibles, des pubs qui accélèrent des recherches, une sauvegarde en ligne ; un jeu d'arcade pur garde une seule touche et une pub revive. Ce qui reste non négociable : licences et absence de crédits, protocole de score et d'analytics, aucun appel réseau ni tracker tiers dans les jeux (la régie pub est chargée par le site, jamais par le jeu), affichage mobile propre, performance.

## Règle de travail Git

- Ne jamais pousser directement sur `main`.
- Une branche par jeu : `claude/jeu-<id>`, puis une Pull Request vers `main`.
- Chaque jeu passe par deux Pull Requests :
  1. **PR de test** : le jeu va uniquement dans `src/data/testGames.js` (page admin, onglet « Test des jeux »). Invisible sur le site public. Claude fusionne ; Laurent teste dans l'admin et donne ses retours.
  2. **PR de publication** : seulement quand Laurent écrit que le jeu est validé. Le jeu passe de `testGames.js` à `games.js`, avec blog et sitemap.
- Les retours de Laurent sur un jeu en test se corrigent par de nouvelles PR de test, jusqu'à validation.

### Fusion automatique
- Toujours passer par une Pull Request (historique et retour arrière possibles), mais c'est Claude qui la fusionne via l'API GitHub (`gh api -X PUT repos/Valtech-services/ragequit/pulls/<n>/merge -f merge_method=merge`), une fois les tests Playwright et `npm run build` réussis.
- PR de test (admin uniquement) : fusion immédiate.
- PR de publication (mise en ligne publique) : fusion immédiate dès que Laurent a écrit que le jeu est validé ; ce message est son feu vert.
- Toute autre modification du site demandée par Laurent : fusion immédiate après tests et build.
- Après la fusion, vérifier que le déploiement Vercel du projet `ragequit` est en état `READY` et le signaler à Laurent ; en cas d'échec, lire les logs de build et corriger dans une nouvelle PR.

## Prérendu SEO (ne pas casser)

- `npm run build` enchaîne `vite build`, le build serveur de `src/entry-server.jsx` puis `scripts/prerender.mjs`, qui écrit une page HTML complète par URL publique (Google et AdSense lisent le texte sans JavaScript). Les URL viennent de `games.js`, `blog.js` et `legalContent.js` : rien à déclarer à la main.
- Un composant ne doit rien rendre qui exige le navigateur au premier rendu : pas de `createPortal` sans garde `mounted`, pas d'accès à `window` hors `useEffect` sans valeur par défaut.
- Après chaque build, vérifier la ligne `[prerender] N/N pages prérendues` (une page par URL et par langue). Le build échoue si plus de 20 % des pages ratent.
- Les liens internes passent par `Link`, `NavLink` et `useNavigate` de `src/i18n/locale.jsx` (pas ceux de `react-router-dom`) pour garder le préfixe de langue ; les données de contenu passent par les hooks de `src/data/localized.js` (`useGames`, `useCategories`, `usePosts`, `useSiteSeo`).

## Site multilingue

- L'anglais est à la racine (`/game/<id>`). Les langues de contenu ont leur préfixe d'URL : `/fr/...`, `/de/...`, etc. Liste dans `CONTENT_LANGS` (`src/i18n/locale.jsx`). `/admin` et `/games/*.html` ne sont jamais préfixés.
- Les textes d'interface (boutons, menus) sont dans `src/i18n/locales/<lang>.json` (12 langues). Les textes de contenu (descriptions de jeux, contrôles, SEO, FAQ, catégories, articles de blog, textes de l'accueil) sont en anglais dans `games.js`, `blog.js`, `categories`, `siteSeo`, et traduits dans `src/data/i18n/<lang>/` (`games*.js`, `posts*.js`, `categories.js`, `site.js`). `src/data/localized.js` fusionne la traduction sur l'anglais ; un champ manquant retombe sur l'anglais.
- Format d'un jeu traduit : `{ description, controls, seo: { title, metaDescription, faq: [{ q, a }] } }`, avec **exactement le même nombre de questions FAQ** que l'anglais. Format d'un article : `{ title, excerpt, seo: { title, metaDescription }, content: [...] }`, avec **les mêmes blocs dans le même ordre** (même `type`, même nombre d'`items` pour les listes), sinon le contenu anglais est conservé.
- Les noms de jeux, de modes, de skins et les libellés affichés dans le jeu (JUMP, Challenge a friend...) restent en anglais. Traduction naturelle, pas mot à mot, en `tu`/`vous` cohérent avec l'existant (français : vouvoiement).
- Le build prérend chaque page dans chaque langue (balises `hreflang` + `x-default`) et affiche `[prerender] traductions <lang> : complètes` ou la liste des manques. **Une PR de publication n'est valide que si toutes ces lignes indiquent « complètes ».**
- Chaque langue est un fichier JS séparé chargé à la demande par le navigateur (`loadTranslations`), détecté automatiquement par `import.meta.glob` : aucun import à ajouter. Le prérendu charge toutes les langues via `src/data/i18n/all.js`.
- Ajouter une langue de contenu : créer `src/data/i18n/<lang>/` (copier la structure de `fr`) avec tout le contenu traduit, ajouter ses textes `ui` dans `src/i18n/locales/<lang>.json` et ses titres dans la table `UI` de `src/entry-server.jsx`, puis l'ajouter à `CONTENT_LANGS` (c'est ce qui crée les URL). L'arabe s'affiche de droite à gauche (`RTL_LANGS`).

## Pipeline « un jeu par jour »

1. Ouvrir `backlog.md`, prendre le premier jeu au statut `à faire`.
2. Cloner la source dans un dossier temporaire hors du repo. Ne jamais exécuter son code (pas de `npm install` ni de script) : on la lit uniquement.
3. Audit sécurité de la source : appels réseau, scripts externes, code obfusqué, `eval`, trackers, iframes. Le noter dans la PR.
4. Concevoir la transformation (voir « Transformation obligatoire ») et l'écrire dans la PR avant le code.
5. Réécrire le jeu en un seul fichier `public/games/<id>.html` en appliquant les règles du prompt ci-dessous et toute la section « Finition visuelle ».
6. Tester avec Playwright : desktop 1280x800, iPhone portrait 390x844 (et paysage si le jeu l'exige). Vérifier : démarrage, contrôles tactiles et clavier, game over, pub revive, envoi `_SCORE` et `RH_TRACK` (écouter `message` sur la page parente), aucune erreur console, aucun bouton coupé.
7. Miniature `public/thumbnails/<id>.jpg` (carré, 1:1) : capture Playwright d'un moment de jeu spectaculaire. Ajouter dans la PR un prompt d'image pour que Laurent puisse générer une version plus belle s'il le souhaite.
8. PR de test : ajouter l'entrée dans `src/data/testGames.js` (format existant : `id`, `title`, `description` courte en français, `thumbnail`, `category`, `orientation`, `file`, `notes` avec le type du message score et le mode, plus `pr` (numéro de la PR de test) et `extras`, voir « Onglet À côté »). Mettre à jour `backlog.md` (statut `en test (PR #n)`), ouvrir la PR et la fusionner. S'arrêter là : la publication attend la validation de Laurent.
9. PR de publication (après validation), intégration site :
   - `src/data/games.js` : nouvelle entrée à la fin du tableau `games`, même format que `city-runner` (description de 400 mots minimum, `tags`, `controls`, `author: 'Ragequit Arcade'`, `isNew: true` avec `addedAt: 'AAAA-MM-JJ'` (date de mise en ligne : le badge NEW disparaît seul après 7 jours), `modes`, `defaultMode`, `seo` avec `title`, `metaDescription` et 8 questions de FAQ minimum).
   - `src/data/blog.js` : article guide `<id>-tips` (même format que `city-runner-tips`).
   - `public/sitemap.xml` : URLs `/game/<id>` et `/blog/<id>-tips` avec `lastmod` du jour. (filet de sécurité : le build ajoute automatiquement toute page prérendue absente du sitemap).
   - Mettre à jour le texte de la catégorie concernée dans `categories` si le jeu y devient marquant.
   - Image de blog `public/blog/<id>-tips.jpg` (16:9), capture Playwright.
   - **Traductions obligatoires** (voir « Site multilingue ») : pour chaque langue de `CONTENT_LANGS` (`src/i18n/locale.jsx`), ajouter la traduction complète du jeu dans `src/data/i18n/<lang>/games-*.js` (dernier fichier, ou nouveau fichier `games-N.js` importé dans `games.js`) et de l'article dans `src/data/i18n/<lang>/posts-*.js` (idem avec `posts.js`). Mettre à jour aussi `siteSeo.gameSelection` dans `src/data/i18n/<lang>/site.js` et la catégorie dans `categories.js` si on les modifie en anglais.
   - `public/sitemap.xml` : ajouter aussi `/<lang>/game/<id>` et `/<lang>/blog/<id>-tips` pour chaque langue.
   - Retirer l'entrée du jeu de `src/data/testGames.js` (ses `extras` disparaissent avec elle de l'onglet « À côté »).
10. Lancer `npm install && npm run build` pour vérifier que le site compile (avant chaque PR, test ou publication). Ne jamais committer `package-lock.json` (annuler avec `git checkout package-lock.json`).
11. Mettre à jour `backlog.md` : passer le jeu en `publié (PR #n)`, puis ajouter 2 ou 3 nouveaux candidats vérifiés (licence + intérêt) en fin de liste, avec la description du jeu d'origine, en gardant l'alternance 2D / 3D.
12. Description de chaque PR en français : nom du jeu, ce qui a été transformé, résultats des tests, identifiant choisi, prompts d'image (Gemini, sans texte dans l'image : miniature 1:1 1024x1024 et image de blog 16:9 1376x768) et prompt de logo du jeu (voir ci-dessous).

**Onglet « À côté » (admin)** : il affiche, pour les seuls jeux en test, le lien de la PR et les à-côtés du jeu, avec un bouton « Copier ». Ils sont stockés dans l'entrée du jeu dans `src/data/testGames.js` : `pr: <n>` et `extras: [{ label, text }]`, dans cet ordre : prompt miniature 1:1, prompt image de blog 16:9, prompt logo du jeu. Tout nouvel à-côté demandé par Laurent s'ajoute au même tableau. À la publication, l'entrée est retirée de `testGames.js` : rien d'autre à nettoyer.

**Prompt de logo** : un logo-titre (wordmark) par jeu, en anglais pour Gemini, carré 1:1 1024x1024, fond noir uni, nom du jeu écrit exactement (seul texte autorisé), lettrage lié à la mécanique du jeu. **Palette propre au jeu**, différente des logos des autres jeux en test et des derniers jeux publiés (pas systématiquement cyan et magenta) : la nommer explicitement dans le prompt (ex. « acid lime green and hot orange »).

La tâche quotidienne ne produit que des PR de test.

**Notification obligatoire** : chaque exécution de la tâche quotidienne se termine par une notification à Laurent (outil `PushNotification`, qui part sur son téléphone et par e-mail), qu'elle ait réussi, qu'elle soit bloquée par la limite d'attente ou qu'elle ait échoué : nom du jeu, ce qu'il fait, lien de la PR et état du déploiement, ou bien la raison de l'arrêt. Laurent ne doit jamais se demander si la tâche a tourné.

**Réserve visible dans l'admin** : l'onglet « Réserve » de la page admin lit directement `backlog.md`. Chaque ligne du tableau principal doit donc garder ses 7 colonnes (`#`, source, licence, catégorie, le jeu d'origine en bref, piste de transformation, statut), avec une description courte en français du jeu d'origine.

**Jeux 3D** : la réserve intercale des jeux 3D avec personnage (Three.js, comme `city-runner`) entre les jeux 2D, environ un sur deux. Personnages, ennemis et décors viennent en priorité des bibliothèques libres (voir « Assets libres »), sinon sont modélisés dans le code (formes Three.js, matériaux, animations procédurales) ; jamais de modèle, texture ou son du jeu source. Pour ces jeux, tester aussi la fluidité sur iPhone (pas de chute sous 30 images par seconde) et garder les contrôles tactiles lisibles et confortables pour le pouce (stick virtuel et autant de boutons que le jeu le justifie, disposés en arc autour du bouton principal, avec recharge visible). Si un jeu est encore en test sans validation, elle prépare quand même le suivant, dans la limite de 5 jeux en attente.

**Limite d'attente :** compter les jeux au statut `en test` dans `backlog.md`. S'il y en a 5 ou plus, la tâche ne crée aucun jeu : elle termine par un message court à Laurent listant les jeux qui attendent son test dans l'admin. La production reprend automatiquement dès qu'un jeu est validé (ou abandonné) et que le compteur repasse sous 5. Rien n'est jamais perdu : le backlog garde l'ordre et l'état de chaque jeu.

## Transformation obligatoire

On ne republie jamais un jeu tel quel. La source sert de référence de gameplay ; le code est entièrement réécrit. Pour chaque jeu, être force de proposition et appliquer au minimum :
- un nouveau nom et une identité visuelle propre à RageQuit (néon, agressif, lisible sur mobile) ;
- au moins deux mécaniques nouvelles (modes de jeu, power-ups, difficulté progressive, objectifs, défi entre amis par lien, mode Hard avec son leaderboard, run quotidien...) ;
- des contrôles pensés mobile d'abord (plus de 85 % du trafic) ;
- le leaderboard et la pub revive selon le protocole ci-dessous.

Réécrire le code (plutôt que retoucher celui de l'auteur) garantit que le fichier final ne contient aucune portion du code d'origine. C'est ce qui permet d'appliquer la règle 2 (aucun crédit) sans enfreindre la licence de la source, et de rester cohérent avec le blog du site qui affirme que les jeux sont créés par RageQuit. Les images, sons et polices du jeu d'origine ne sont jamais réutilisés. À la place : assets libres (voir « Assets libres ») et éléments générés en code (canvas, formes, Web Audio).

## Assets libres (bibliothèques gratuites)

Laurent veut des jeux beaux, et l'automatisation avant tout. Utiliser des assets gratuits est encouragé, à chaque jeu, dès qu'ils rendent le jeu plus beau qu'un rendu en code : en général un personnage principal animé, 4 à 5 ennemis, un boss, quelques objets (projectiles, power-ups, pièces) et les sons.

**Licence : CC0 ou domaine public uniquement** (usage commercial libre, aucune attribution exigée, compatible avec la règle « aucun crédit »). Refuser CC-BY, CC-BY-SA, toute licence « non commercial », les assets sans licence claire et les « free » de stores dont les conditions interdisent la redistribution web. Vérifier la licence dans le fichier `LICENSE`/`README` du pack lui-même, pas seulement sur une page tierce.

**Sources joignables par la tâche automatique** (dépôts GitHub, clonés hors du repo) :
- Kenney : dépôts `KenneyNL/*` (starter kits avec modèles `.glb`, sprites et sons, assets déclarés CC0 dans le README).
- Quaternius : ports sous licence CC0-1.0 (ex. `Malcolmnixon/Quaternius-*`), personnages et monstres animés.
- Tout autre dépôt GitHub dont le pack est explicitement CC0 / domaine public (chercher avec `gh api search/repositories`).
Les sites kenney.nl, quaternius.com, poly.pizza, opengameart.org et itch.io ne sont pas joignables depuis le bac à sable : ne pas insister, passer par GitHub.

**Intégration**
- Fichiers dans `public/games/<id>/` (sous-dossiers `models/`, `sprites/`, `audio/`), chargés en relatif depuis `public/games/<id>.html`.
- Optimisation obligatoire avant commit : modèles avec `npx @gltf-transform/cli` (textures WebP 512 px max, `simplify` vers 3 000 à 10 000 triangles par personnage, `prune`, `dedup`), sprites en WebP ou PNG compressé, sons en `.ogg` ou `.mp3` courts. **Budget : 5 Mo maximum par jeu**, 8 Mo pour un jeu 3D riche.
- Recolorer, re-teinter ou retexturer pour l'identité néon du jeu (matériaux émissifs, palette du jeu) : les assets ne doivent pas avoir l'air d'un pack générique.
- Écran de chargement soigné avec barre de progression ; le jeu reste jouable si un asset ne charge pas (repli sur une forme générée en code).
- Aucun nom d'auteur ni de pack dans le jeu ni sur le site (CC0 ne l'exige pas).

**Traçabilité (preuve de licence)** : chaque asset utilisé est noté dans `ASSETS-LICENCES.md` à la racine du dépôt (jamais dans `public/`) : jeu, fichier, pack d'origine, URL du dépôt, licence, date. La PR liste aussi ces assets.

## Finition visuelle (obligatoire)

Priorité de Laurent : des jeux beaux, au niveau de ce qui tourne sur les réseaux. Un jeu qui marche mais qui a l'air d'un prototype n'est pas terminé. Chaque nouveau jeu applique **toute** cette liste, et la PR coche chaque point.

**1. Effets visuels**
- Jeux Three.js : post-traitement via les addons de la même version figée que `three` (`EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`), bloom réglé pour que seuls les néons brillent (seuil élevé), tone mapping ACES, `outputColorSpace` sRGB, brouillard coloré, lumière principale + lumière d'ambiance teintée + au moins une lumière d'accent colorée, ombres douces sur les éléments proches.
- Jeux 2D (canvas) : halo néon (`shadowBlur` ou rendu sur un canvas hors écran puis composition `lighter`), fond animé jamais uni (dégradé qui respire, grille ou parallaxe sur 2 à 3 plans, étoiles ou poussières), vignettage léger, scanlines ou grain très discrets si cela sert l'identité.
- Shaders bienvenus pour les fonds (WebGL ou Three.js) tant que la fluidité tient.

**2. Sensations de jeu (game feel)**
- Particules sur chaque événement important : impact, destruction, ramassage, combo, mort (pool d'objets réutilisés, pas de création à chaque image).
- Tremblement d'écran court et proportionné, ralenti (hit-stop de 40 à 120 ms) sur les gros impacts, flash bref à l'écran.
- Retour visuel sur chaque action du joueur : écrasement/étirement (squash and stretch), rebond des boutons, traînées derrière les objets rapides, chiffres de score flottants.
- Animation d'entrée et de sortie des éléments (easing, jamais d'apparition sèche), compteur de score qui défile au lieu de sauter.

**3. Finitions**
- Palette propre au jeu (3 à 5 couleurs nommées en variables CSS/JS), dégradés et éclairage soignés, contraste lisible au soleil sur mobile.
- Transitions entre écrans (titre, jeu, game over, pub) : fondu, glissement ou balayage de 200 à 400 ms.
- HUD : typographie système soignée (pile `system-ui`, graisses 800/900, chiffres `font-variant-numeric: tabular-nums`, léger halo), hiérarchie claire, icônes dessinées en SVG ou canvas.
- Écran titre qui donne envie : logo-titre animé, fond vivant, bouton jouer qui pulse.
- Écran de game over avec résumé animé (score, record, meilleur combo) et rejouer en un tap.

**4. Performance (non négociable)**
- 60 images par seconde visées, jamais sous 30 sur iPhone (mesurer avec Playwright en profil mobile).
- `devicePixelRatio` plafonné à 2, qualité réduite automatiquement (bloom en demi-résolution, moins de particules) si la fréquence chute.
- Respecter `prefers-reduced-motion` : tremblements et flashs atténués.

**5. Contrôle qualité**
- Captures Playwright iPhone 390x844 de 3 moments (titre, action intense, game over) jointes à la PR.
- Vérifier sur les captures : rien de terne ou d'uni, rien de coupé, le coin haut-gauche libre.

## Prompt de retravail d'un jeu (référence)

1. FORMAT DE SORTIE
- Un seul fichier .html autonome : tout le CSS dans une balise `<style>`, tout le JavaScript dans une balise `<script>`. Aucune dépendance externe, aucun build. Seul import de fichiers locaux autorisé : les assets libres du jeu dans `public/games/<id>/` (chemins relatifs `./<id>/...`).
- Exception autorisée : les jeux 3D peuvent charger Three.js (et ses addons) via une importmap depuis unpkg ou jsDelivr, version figée (ex. `three@0.160.0`), comme `city-runner`. Aucune autre bibliothèque externe.

2. SUPPRESSION DES CRÉDITS
- Aucune référence à un auteur, un pseudo, un créateur, une entreprise, un studio ou une source (CodePen, GitHub, etc.) : ni commentaire de crédit, ni `<meta author>`, ni texte visible, ni lien, ni watermark. Le fichier ne contient aucune attribution.

3. AFFICHAGE MOBILE
- Viewport : `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />`
- Dans `:root` : `--safe-top: env(safe-area-inset-top, 0px); --safe-bottom: env(safe-area-inset-bottom, 0px); --safe-left: env(safe-area-inset-left, 0px); --safe-right: env(safe-area-inset-right, 0px);`
- Hauteur plein écran : `100vh` puis `100dvh` juste après. Jamais `100vh` seul.
- Aucun décalage en pixels codé en dur pour la barre d'URL ou la barre home : `bottom: calc(VALEUR + var(--safe-bottom))`, idem pour les autres bords.
- **Coin haut-gauche réservé** : sur mobile, le site superpose au jeu un bouton retour (carré de 32 px, flèche discrète) en haut à gauche, à 10 px des bords + safe area. Ne jamais y placer de score, de bouton ou d'info utile. Dans toute la bande haute (environ 56 px), le HUD commence au minimum à `left: calc(56px + var(--safe-left))`. Placer le score de préférence **au centre en haut**, les infos secondaires et boutons (son, pause) à droite. Vérifier sur la capture iPhone que rien d'important n'est dans le carré haut-gauche de 56 x 56 px.
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
- Pubs récompensées : toujours au choix du joueur, jamais imposées. Placements à adapter à chaque jeu (voir « Bon sens avant les règles ») :
  - **revive** (standard de tous les jeux) : au game over, une fois par partie, bouton « regarder une pub pour continuer » ; la récompense est adaptée au jeu (reprendre sur place, recommencer la vague en cours, temps en plus...) ;
  - **accélération** (jeux à progression) : réduire ou terminer un minuteur de recherche ou d'amélioration, avec un plafond quotidien raisonnable ; `context: 'research'` ;
  - tout autre placement logique pour le jeu (doubler un gain de fin de partie, coffre...) avec son propre `context` explicite.
  La vraie pub est affichée par le site (régie AdinPlay, `src/lib/ads.js`), pas par le jeu. Le jeu la demande puis attend la réponse :
  - jeu → site : `RH_AD_REQUEST { game, context, id }` (`id` unique par demande) ;
  - site → jeu : `RH_AD_STATUS { game, id, status: 'received' }` tout de suite, puis `RH_AD_RESULT { game, id, context, status }` ;
  - `status` : `completed` (récompense), `skipped` (pas de récompense, retour au choix), `unavailable` (aucune pub disponible : récompense quand même), `simulate` (régie pas encore active : le jeu joue son overlay simulé de 5 s, label « Advertisement » + compte à rebours, puis récompense) ;
  - sans aucune réponse du site sous 1,5 s (jeu ouvert seul, hors iframe), le jeu joue lui-même l'overlay simulé. Après `received`, garde-fou de 120 s puis `unavailable`.
  Le jeu n'accepte ces réponses que si `event.source === window.parent` et si `id` correspond. Implémentation de référence : fonctions `requestAd` / `simulateAd` de `public/games/brickfury.html`.
  Au moment exact où la récompense est accordée (quel que soit le statut qui la donne) :
```js
try { window.parent && window.parent.postMessage({
  type: 'RH_TRACK',
  event: 'ad_rewarded_complete',
  game_id: 'nom-du-jeu',       // ici game_id (pas game)
  props: { context: 'revive' }  // ou 'research', etc.
}, '*'); } catch (e) {}
```
- Aucun SDK publicitaire dans le jeu : seul le site charge la régie, après le consentement cookies.

8. CONNEXION ET SAUVEGARDE EN LIGNE (jeux à progression)
Le site fournit un pont générique (`src/lib/gameBridge.js`, branché sur la page de jeu desktop et mobile et sur l'onglet admin « Test des jeux »). Un jeu à progression l'utilise au lieu de messages spécifiques :
- `RH_AUTH_REQUEST { game }` → le site répond `RH_AUTH { signedIn, username }` (et le renvoie à chaque connexion ou déconnexion).
- `RH_LOGIN_REQUEST { game }` → le site ouvre la connexion Google et revient sur la page du jeu.
- `RH_SAVE_LOAD { game }` → `RH_SAVE_STATE { game, state, progress, updatedAt }` (`state: null` si rien en ligne ou joueur non connecté).
- `RH_SAVE { game, state, progress }` → `RH_SAVE_ACK { game, ok, reason }`. `progress` est un entier qui ne fait que croître (XP totale par exemple) : le site n'écrase jamais une sauvegarde en ligne plus avancée et renvoie alors `RH_SAVE_STATE`.
- Stockage : table `game_saves` (une ligne par joueur et par jeu, `total_ore` = progress). Le jeu garde toujours une copie locale (`localStorage`) et adopte la plus avancée des deux.
- Le jeu n'accepte ces réponses que si `event.source === window.parent`. Un joueur non connecté peut jouer, mais le jeu lui dit clairement qu'il doit se connecter pour retrouver sa progression sur tous ses appareils (bandeau + bouton qui envoie `RH_LOGIN_REQUEST`).

9. NE RIEN INVENTER D'AUTRE
- Aucun autre type de message que ceux décrits ici, aucun autre appel réseau depuis le jeu, aucun tracker tiers dans le jeu.

## Choix des sources (backlog)

- Licences acceptées pour les jeux de référence : MIT, BSD, ISC, Apache-2.0, Unlicense, CC0, GPL (le code étant réécrit, seule la mécanique est reprise).
- Écarter : dépôts sans licence, licences « non commercial » (CC BY-NC...), jeux trop proches d'un jeu déjà en ligne sur RageQuit, jeux impossibles à rendre jouables sur mobile.
- Sources : GitHub (liste leereilly/games, topics html5-game, js13kgames), Gitee (recherche `html5小游戏`).
