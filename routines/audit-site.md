# Routine quotidienne : audit du site (vers midi, heure de Paris)

Ce fichier fait foi pour la routine, en plus de `CLAUDE.md` (à lire en premier). **Cette routine ne modifie jamais le site** : elle observe, compare avec la veille et propose. Laurent choisit ensuite, dans une conversation, les points à lancer (« lance les points 3 et 7 »).

## 1. Mémoire

- Lire `routines/audit-site-suivi.md` : chaque point déjà proposé y figure avec son numéro stable (`A-001`, `A-002`...), sa date et son statut :
  - `proposé` : dans un rapport, pas encore traité ;
  - `lancé` : Laurent l'a demandé ;
  - `fait` : réglé (vérifier dans `git log` de `main` depuis le dernier rapport et sur le site en ligne) ;
  - `refusé` : Laurent n'en veut pas, ne plus jamais le reproposer.
- Mettre à jour les statuts avant de chercher de nouveaux points : un point `proposé` ou `lancé` qui est réglé sur le site passe en `fait`.

## 2. Balayer le site en ligne

Site : https://ragequit-arcade.com (production). Avec Playwright :
- **Pages** : accueil, chaque catégorie, au moins 3 pages de jeu (dont le plus récent), liste du blog, 2 articles, pages légales, page 404, et les mêmes pages dans 2 ou 3 langues (`/fr`, `/de`, `/ja`, `/ar` en droite à gauche). Jamais `/admin`.
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

## 3. Le rapport des 10 points

- Exactement 10 points (moins seulement si le site n'a vraiment plus rien d'utile à améliorer : le dire franchement plutôt qu'inventer).
- On ne garde que les points encore ouverts (`proposé`) qui restent pertinents, puis on complète avec de nouveaux points. Les points `fait` sortent de la liste, les points `refusé` ne reviennent jamais.
- Pour chaque point : numéro stable, titre court, problème constaté avec sa capture (appareil et page), pourquoi c'est important (joueurs, SEO, revenus pub, image), solution proposée concrète, effort (S / M / L) et impact (faible / moyen / fort). Classés par impact puis par effort.
- En tête du rapport : ce qui a changé depuis la veille (points passés en `fait`, nouveaux points).

## 4. Livraison

- **Page de rapport** : une page HTML privée publiée avec l'outil Artifact, toujours à la même adresse (republier l'artifact dont l'URL est notée en tête de `routines/audit-site-suivi.md` ; à la première exécution, la créer et noter son URL). Elle contient le résumé du jour, les 10 points et leurs captures (JPG compressés, 1200 px de large au plus), et l'historique des points `fait`. Si l'outil Artifact n'est pas disponible, joindre le rapport en fichier et le dire dans la notification.
- **Mémoire** : mettre à jour `routines/audit-site-suivi.md` (statuts, nouveaux points avec leur date), puis le commiter dans une petite PR `claude/audit-site-AAAA-MM-JJ` qui ne touche qu'à ce fichier, et la fusionner. Aucune capture n'est commitée dans le dépôt.
- **Toujours** finir par une notification à Laurent (`PushNotification`, résumé entre balises `routine_summary`) : les 10 titres numérotés, ce qui a été réglé depuis la veille, le lien de la page de rapport. En cas d'échec : la raison.

## Interdits

- Modifier le site, les jeux ou les données (seul `routines/audit-site-suivi.md` est mis à jour).
- Proposer quoi que ce soit sur la grille bento de l'accueil sans demande de Laurent.
- Reproposer un point `refusé`.
