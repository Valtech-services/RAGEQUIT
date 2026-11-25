# Routine quotidienne : audit du site (vers midi, heure de Paris)

Ce fichier fait foi pour la routine, en plus de `CLAUDE.md` (à lire en premier). **Cette routine ne modifie jamais le site** : elle observe, compare avec la veille et propose. Laurent choisit ensuite, dans une conversation, les points à lancer (« lance les points 3 et 7 »).

## 0. Consigne de Laurent (avant tout travail)

Lire `routines/consignes-routines.md` et la mémoire Claude de Laurent (`/areas/ragequit-arcade.md`) : chercher une consigne pour la routine `audit` datée d'aujourd'hui (heure de Paris). Règle complète dans `CLAUDE.md`, paragraphe « Consignes pour les routines d'amélioration et d'audit ».
- `pas aujourd'hui` : ne rien faire d'autre ; passer la ligne en `utilisée` (petite PR qui ne touche qu'à `routines/consignes-routines.md`, fusionnée) et envoyer une notification courte (routine sautée, phrase de Laurent, reprise normale à la prochaine exécution).
- `à faire` ou aucune consigne : exécution normale. La notification indique toujours la consigne retenue et sa source.

## 1. Mémoire

- Lire `routines/audit-site-suivi.md` : chaque point déjà proposé y figure avec son numéro stable (`A-001`, `A-002`...), sa date et son statut :
  - `proposé` : dans un rapport, pas encore traité ;
  - `lancé` : Laurent l'a demandé ;
  - `fait` : réglé (vérifier dans `git log` de `main` depuis le dernier rapport et sur le site en ligne) ;
  - `refusé` : Laurent n'en veut pas, ne plus jamais le reproposer.
- Mettre à jour les statuts avant de chercher de nouveaux points : un point `proposé` ou `lancé` qui est réglé sur le site passe en `fait`.

## 2. Balayer le site en ligne

Site : https://ragequit-arcade.com (production). Avec Playwright :
- **Pages** : accueil, chaque catégorie, au moins 3 pages de jeu (dont le plus récent), liste du blog, 2 articles, pages légales, page 404, et les mêmes pages dans 2 ou 3 langues (`/fr`, `/de`, `/ja`, `/ar` en droite à gauche), et la page admin (voir ci-dessous).
- **Page admin (décision de Laurent du 2026-11-23 : elle fait partie de l'amélioration du site)** : `/admin` exige une connexion Google admin puis un code PIN ; la routine ne s'y connecte jamais avec de vrais identifiants et ne modifie aucune donnée. Elle audite :
  - l'écran de connexion en ligne (`/admin`, mobile et desktop) ;
  - les onglets (Dashboard, Test des jeux, À côté, Réserve) en lisant le code (`src/pages/AdminPage/`) et, si possible, en les affichant avec Playwright sur un build local où la session est simulée (réponses réseau factices, aucune requête vers la vraie base) ; si cet affichage n'est pas possible, le dire dans le rapport ;
  - ergonomie mobile (Laurent teste les jeux depuis son téléphone), lisibilité, boutons « Copier », temps de chargement, erreurs, et tout ce qui ralentit son travail quotidien (tester un jeu, copier les prompts, lire la réserve).
  Les points admin ont la zone `admin` dans le suivi.
- **Appareils** : iPhone SE (375x667), iPhone 15 Pro (393x852), Android (412x915), iPad portrait (820x1180) et paysage (1180x820), desktop 1366x768 et 1920x1080. Captures du header, des menus ouverts, du footer, des pages de jeu (cadre du jeu, boutons, leaderboard) et du blog.
- **La grille bento de l'accueil est hors champ** : ne rien proposer à son sujet tant que Laurent ne l'a pas demandé.
- **Contrôles techniques** :
  - `sitemap.xml` (toutes les pages et langues présentes, `lastmod`), `robots.txt` ;
  - `hreflang` et `x-default`, titres, meta descriptions, données structurées ;
  - liens cassés, images trop lourdes ou mal dimensionnées ;
  - erreurs console, temps de chargement (LCP approximatif, poids total), décalages de mise en page ;
  - contraste et lisibilité au soleil sur mobile, tailles de zones tactiles, safe areas de l'iPhone ;
  - qualité des textes (anglais et traductions), cohérence des noms de jeux ;
  - langues : quelle langue ajouter en priorité (audience, recherche), traductions manquantes.
- **Tendances** (recherche web) : couleurs, typographies, animations et mises en page des sites de jeux et des jeux qui marchent en ce moment (par exemple la palette Vice City de GTA VI, rose et turquoise avec du jaune coucher de soleil, face au bleu et rose actuels du site). Toujours proposé comme une option argumentée, jamais imposé.

## 2 bis. Contrôle AdSense (« low value content »)

Demande de Laurent du 2026-11-23 : AdSense a refusé le site plusieurs fois pour « low value content ». Chaque audit regarde le site comme le relecteur et le robot AdSense, et transforme chaque risque en point numéroté (zone `adsense`). Google ne publie pas sa grille exacte : ces contrôles suivent ses règles publiques (règlement du programme, consignes aux éditeurs, contenu utile) et le bon sens, sans jamais promettre une acceptation.

À vérifier à chaque exécution, sur le HTML prérendu (sans JavaScript, comme le robot) et sur le rendu mobile :
- **Contenu original et utile visible** : quantité de texte propre à chaque page (descriptions, guides, FAQ) par rapport aux vignettes et au lecteur ; texte présent dans le premier écran ou juste dessous, pas seulement en bas de page ; pages trop maigres (moins d'environ 300 mots utiles) listées.
- **Pages vides ou quasi vides** : 404, pages sans texte, pages qui n'affichent qu'un jeu ou une grille ; codes HTTP corrects (404 réels, pas de redirections en chaîne).
- **Contenu dupliqué ou en série** : descriptions et FAQ trop proches d'un jeu à l'autre, textes génériques répétés, traductions visiblement automatiques ou incomplètes (échantillon de 2 ou 3 langues lues par Claude) ; balises `canonical` et `hreflang` cohérentes.
- **Pages de confiance** : À propos, Contact (adresse e-mail joignable), Mentions légales, Confidentialité, Cookies, Conditions : présentes, liées depuis toutes les pages, à jour, cohérentes entre elles et avec le site (nom, e-mail, régie AdinPlay / Google).
- **`ads.txt`** à la racine avec l'identifiant éditeur (`pub-…`) attendu, `robots.txt` qui n'empêche pas le robot AdSense (`Mediapartners-Google`), sitemap complet.
- **Consentement** : bandeau conforme (refuser aussi simple qu'accepter), aucune pub ni cookie publicitaire avant le choix ; mode de consentement compatible avec les exigences Google pour l'Europe (CMP certifiée si la régie l'exige).
- **Navigation et expérience** : menu clair, liens internes entre jeux, catégories, blog et guides ; aucun lien cassé ; page rapide sur mobile ; pas de contenu masqué ni de faux boutons ; emplacements pub prévus qui ne poussent pas au clic accidentel (distance avec les boutons PLAY et les contrôles de jeu).
- **Blog** : nombre d'articles, fréquence de publication, longueur et originalité ; sujets qui apportent une vraie valeur (guides, stratégies, coulisses) plutôt que des textes de remplissage.
- **Règlement** : aucun contenu interdit ou sensible pour la pub (violence graphique, contenu choquant, droits d'auteur, noms ou visuels de jeux tiers).

Le rapport ajoute en tête une ligne « Préparation AdSense » : les risques encore ouverts classés du plus probable au moins probable, et ce qui a été réglé depuis la veille.

## 3. Le rapport des 10 points

- **Tout constat devient un point numéroté** (`A-xxx`) inscrit dans le suivi : plus de section « autres constats » hors liste (décision de Laurent du 2026-11-23). Le rapport présente d'abord les 10 points les plus importants, puis tous les autres points ouverts, numérotés et décrits de la même façon (problème, pourquoi, solution, effort, impact), pour que Laurent puisse les lancer aussi.
- Si le site n'a vraiment plus rien d'utile à améliorer, le dire franchement plutôt qu'inventer.
- On garde tous les points encore ouverts (`proposé`) qui restent pertinents, puis on complète avec de nouveaux points. Les points `fait` sortent de la liste, les points `refusé` ne reviennent jamais.
- Pour chaque point : numéro stable, titre court, problème constaté avec sa capture (appareil et page), pourquoi c'est important (joueurs, SEO, revenus pub, image), solution proposée concrète, effort (S / M / L) et impact (faible / moyen / fort). Classés par impact puis par effort.
- En tête du rapport : ce qui a changé depuis la veille (points passés en `fait`, nouveaux points).

## 4. Livraison

- **Page de rapport** : une page HTML privée publiée avec l'outil Artifact, toujours à la même adresse (republier l'artifact dont l'URL est notée en tête de `routines/audit-site-suivi.md` ; à la première exécution, la créer et noter son URL). Elle contient le résumé du jour, les 10 points et leurs captures (JPG compressés, 1200 px de large au plus), et l'historique des points `fait`. Si l'outil Artifact n'est pas disponible, joindre le rapport en fichier et le dire dans la notification.
- **Mémoire** : mettre à jour `routines/audit-site-suivi.md` (statuts, nouveaux points avec leur date), puis le commiter dans une petite PR `claude/audit-site-AAAA-MM-JJ` qui ne touche qu'à ce fichier, et la fusionner. Aucune capture n'est commitée dans le dépôt.
- **Toujours** finir par une notification à Laurent (`PushNotification`, résumé entre balises `routine_summary`) : les 10 titres numérotés, le nombre d'autres points ouverts, les principaux risques AdSense, ce qui a été réglé depuis la veille, le lien de la page de rapport. En cas d'échec : la raison.

## Interdits

- Modifier le site, les jeux ou les données (seul `routines/audit-site-suivi.md` est mis à jour).
- Proposer quoi que ce soit sur la grille bento de l'accueil sans demande de Laurent.
- Reproposer un point `refusé`.
