# Suivi des points d'amélioration du site

Mémoire de la routine `routines/audit-site.md`. Page de rapport (Artifact) : https://claude.ai/artifact/9xWxqLTgiC17Sw4QqRLewa (créée le 2026-11-23, republier à la même adresse).

Statuts : `proposé`, `lancé` (demandé par Laurent), `fait`, `refusé` (ne jamais reproposer). Les numéros ne sont jamais réutilisés.

| N° | Proposé le | Titre | Zone | Statut | Mis à jour le | Note |
|---|---|---|---|---|---|---|
| A-001 | 2026-11-23 | Miniatures beaucoup trop lourdes (crush-depth 7,4 Mo, 1024-2048 px affichées en 116-274 px) | performance | fait | 2026-11-23 | accueil mobile ~14,5 Mo |
| A-002 | 2026-11-23 | Page 404 vide et renvoyée en HTTP 200 (soft 404) | joueurs, SEO | fait | 2026-11-23 | réécriture globale vers 200.html dans vercel.json |
| A-003 | 2026-11-23 | Aucune donnée structurée (VideoGame, FAQPage, BreadcrumbList, BlogPosting) | SEO | fait | 2026-11-23 | à générer dans entry-server.jsx |
| A-004 | 2026-11-23 | H1 absent (accueil, catégories, jeu desktop) et double H1 sur les articles | SEO, accessibilité | fait | 2026-11-23 | |
| A-005 | 2026-11-23 | Accueils traduits : titre et description repassent en anglais après hydratation | SEO multilingue | fait | 2026-11-23 | src/hooks/usePageTitle.js |
| A-006 | 2026-11-23 | Préchargement des 7 images de catégories sur chaque page et aucun cache long | performance | fait | 2026-11-23 | vercel.json en-têtes Cache-Control |
| A-007 | 2026-11-23 | Bandeau cookies qui couvre ~45 % de l'écran mobile | joueurs, revenus pub | fait | 2026-11-23 | |
| A-008 | 2026-11-23 | Manifest vers /favicon.png inexistant, pas d'apple-touch-icon, og:image = logo transparent | image, partage | fait | 2026-11-23 | |
| A-009 | 2026-11-23 | Page de jeu sur iPad portrait : lecteur 470 px, tiers droit vide | tablette | fait | 2026-11-23 | |
| A-010 | 2026-11-23 | Option : thème saisonnier palette Vice City (GTA VI) | tendance | fait | 2026-11-23 | activé ; désactivable dans src/config/season.js (SEASON_THEME = null) |
| A-011 | 2026-11-23 | Lien « ← Back to the blog » cyan sur dégradé : contraste faible sur mobile | blog, accessibilité | proposé | 2026-11-25 | toujours ouvert (.blog__back #00D9FF, 26 px de haut) |
| A-012 | 2026-11-23 | Classement : 24 images sans texte alternatif | classement, accessibilité | fait | 2026-11-24 | vérifié : alt vide volontaire, nom du jeu dans le même lien, conforme ; rien à faire |
| A-013 | 2026-11-23 | Langue à ajouter : indonésien (puis coréen) | langues, SEO | proposé | 2026-11-25 | A-014 fait : plus de frein ; mieux après A-028 |
| A-014 | 2026-11-24 | 13 fiches de jeu sous 400 mots (63 à 233) et FAQ incomplètes (5 à 7) | adsense | fait | 2026-11-24 | 13 descriptions réécrites (451 à 515 mots, 5 paragraphes), FAQ complétées à 8, traduites en 11 langues ; pages de 293-333 à ~900 mots |
| A-015 | 2026-11-24 | Fiches de jeu et guides du blog ne se lient pas (aucun lien jeu vers guide ni guide vers jeu) | adsense, SEO | fait | 2026-11-24 | PR « audit A-015 à A-021 » : champ game dans blog.js, carte guide sur la fiche, cartes Play dans l'article |
| A-016 | 2026-11-24 | Pas de CMP certifiée Google (TCF v2.2) pour servir AdSense en EEE/UK/CH | adsense, revenus pub | fait | 2026-11-24 | CMP Google chargée (index.html), repli sur le bandeau maison ; reste à publier le message RGPD dans AdSense > Confidentialité et messages |
| A-017 | 2026-11-24 | Fiche mobile : texte sous 12 vignettes (~1 150 px) et description en un seul bloc | adsense, joueurs | fait | 2026-11-24 | accroche + 6 vignettes + More games ; description en paragraphes, FAQ sous H2 |
| A-018 | 2026-11-24 | En-tête mobile : 4 boutons de 28 px de large (icônes 16 px) | joueurs, accessibilité | fait | 2026-11-24 | mobile : 3 boutons de 39x46 px, icônes 20 px, Blog dans le tiroir de recherche |
| A-019 | 2026-11-24 | Script principal 1,24 Mo (370 Ko gzip) : legalContent 276 Ko, blog 125 Ko, 12 locales chargés partout | performance | fait | 2026-11-24 | lazy : textes légaux, texte des articles (blogContent.js), textes d'interface par langue ; script principal 370 -> 237 Ko gzip |
| A-020 | 2026-11-24 | Pied de page : 3 catégories sur 7 | SEO, navigation | fait | 2026-11-24 | pied de page généré depuis useCategories (7 catégories traduites) |
| A-021 | 2026-11-24 | Page Classement indexable avec 87 mots prérendus (12 langues) | adsense, SEO | fait | 2026-11-24 | texte « How the leaderboards work » prérendu en 12 langues (323 mots) |
| A-022 | 2026-11-24 | Mentions légales : meta description « Laurent Valard (Valtech Services) » dans 12 langues | SEO | proposé | 2026-11-24 | |
| A-023 | 2026-11-24 | Blog : 23 articles sur 26 sont des guides de jeu, aucun éditorial depuis le 29/08 | adsense, contenu | fait | 2026-11-24 | 2 articles éditoriaux publiés en 12 langues (one-button games, pause de 5 minutes) ; série à poursuivre |
| A-024 | 2026-11-24 | Admin : PIN en variable VITE_ (lisible dans le JS public), contrôle admin côté navigateur | admin, sécurité | fait | 2026-11-24 | PIN vérifié côté serveur (api/admin-pin.js, variable ADMIN_PIN) ; reste à faire par Laurent : voir A-030 |
| A-025 | 2026-11-24 | Option tendance : mode sombre automatique (prefers-color-scheme) | tendance | proposé | 2026-11-24 | option à décider |
| A-026 | 2026-11-24 | Pas de meta google-adsense-account (vérification par ads.txt seulement) | adsense | proposé | 2026-11-24 | |
| A-027 | 2026-11-25 | Fiches de jeu : bloc « autres jeux » identique partout (les 6/12 premiers du tableau, jamais les récents ni la catégorie) | joueurs, SEO | proposé | 2026-11-25 | GamePage.jsx l.270, MobileGamePage.jsx l.311 |
| A-028 | 2026-11-25 | Catégories Sports, Idle et Brain avec un seul jeu (36 pages x langues quasi vides) | adsense, SEO | proposé | 2026-11-25 | multi-catégories, jeux similaires ou noindex sous 2 jeux |
| A-029 | 2026-11-25 | Fiche desktop : aucun texte dans le premier écran (description à 1 210 px en 1366x768) | adsense, SEO | proposé | 2026-11-25 | accroche A-017 seulement sur mobile |
| A-030 | 2026-11-25 | Admin : ADMIN_PIN absent dans Vercel (/api/admin-pin enabled:false) et RLS admin non vérifiées | admin, sécurité | proposé | 2026-11-25 | action Laurent (Vercel + SQL Supabase) |
| A-031 | 2026-11-25 | 7 jeux en test attendent la validation de Laurent (24 jeux publiés) | contenu, adsense | proposé | 2026-11-25 | action Laurent : tester dans l'admin |
| A-032 | 2026-11-25 | Titres d'articles > 65 car. (20) et meta descriptions de fiches > 165 car. (16) | SEO | proposé | 2026-11-25 | |
| A-033 | 2026-11-25 | Pied de page : lien vers X alors que le compte est abandonné | image | proposé | 2026-11-25 | Footer.jsx l.41 |
| A-034 | 2026-11-25 | Option tendance : typographie d'affichage expressive pour les H1 | tendance | proposé | 2026-11-25 | option à décider |
| A-035 | 2026-11-25 | Jeux : menu titre qui saute ou tremble sur desktop et barres de défilement visibles dans les menus (surtout les derniers jeux sortis) | jeux, desktop | lancé | 2026-11-25 | demandé par Laurent pour l'audit du 2026-11-26 : vérifier jeu par jeu en 1280x748 et 1000x562 (bouton qui grossit en boucle, panneaux overflow-y:auto). Corrigé sur quadshock (PR #111) ; Laurent donnera des précisions |
