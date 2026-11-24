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
| A-011 | 2026-11-23 | Lien « ← Back to the blog » cyan sur dégradé : contraste faible sur mobile | blog, accessibilité | proposé | 2026-11-24 | toujours ouvert (.blog__back #00D9FF) |
| A-012 | 2026-11-23 | Classement : 24 images sans texte alternatif | classement, accessibilité | fait | 2026-11-24 | vérifié : alt vide volontaire, nom du jeu dans le même lien, conforme ; rien à faire |
| A-013 | 2026-11-23 | Langue à ajouter : indonésien (puis coréen) | langues, SEO | proposé | 2026-11-24 | à lancer après A-014 |
| A-014 | 2026-11-24 | 13 fiches de jeu sous 400 mots (63 à 233) et FAQ incomplètes (5 à 7) | adsense | lancé | 2026-11-24 | lancé par Laurent le 2026-11-24, PR dédiée (13 fiches + traductions) |
| A-015 | 2026-11-24 | Fiches de jeu et guides du blog ne se lient pas (aucun lien jeu vers guide ni guide vers jeu) | adsense, SEO | fait | 2026-11-24 | PR « audit A-015 à A-021 » : champ game dans blog.js, carte guide sur la fiche, cartes Play dans l'article |
| A-016 | 2026-11-24 | Pas de CMP certifiée Google (TCF v2.2) pour servir AdSense en EEE/UK/CH | adsense, revenus pub | fait | 2026-11-24 | CMP Google chargée (index.html), repli sur le bandeau maison ; reste à publier le message RGPD dans AdSense > Confidentialité et messages |
| A-017 | 2026-11-24 | Fiche mobile : texte sous 12 vignettes (~1 150 px) et description en un seul bloc | adsense, joueurs | fait | 2026-11-24 | accroche + 6 vignettes + More games ; description en paragraphes, FAQ sous H2 |
| A-018 | 2026-11-24 | En-tête mobile : 4 boutons de 28 px de large (icônes 16 px) | joueurs, accessibilité | fait | 2026-11-24 | mobile : 3 boutons de 39x46 px, icônes 20 px, Blog dans le tiroir de recherche |
| A-019 | 2026-11-24 | Script principal 1,24 Mo (370 Ko gzip) : legalContent 276 Ko, blog 125 Ko, 12 locales chargés partout | performance | proposé | 2026-11-24 | suite de A-006 |
| A-020 | 2026-11-24 | Pied de page : 3 catégories sur 7 | SEO, navigation | proposé | 2026-11-24 | Footer.jsx codé en dur |
| A-021 | 2026-11-24 | Page Classement indexable avec 87 mots prérendus (12 langues) | adsense, SEO | fait | 2026-11-24 | texte « How the leaderboards work » prérendu en 12 langues (323 mots) |
| A-022 | 2026-11-24 | Mentions légales : meta description « Laurent Valard (Valtech Services) » dans 12 langues | SEO | proposé | 2026-11-24 | |
| A-023 | 2026-11-24 | Blog : 23 articles sur 26 sont des guides de jeu, aucun éditorial depuis le 29/08 | adsense, contenu | proposé | 2026-11-24 | |
| A-024 | 2026-11-24 | Admin : PIN en variable VITE_ (lisible dans le JS public), contrôle admin côté navigateur | admin, sécurité | proposé | 2026-11-24 | vérifier les règles RLS ; non vérifié en production |
| A-025 | 2026-11-24 | Option tendance : mode sombre automatique (prefers-color-scheme) | tendance | proposé | 2026-11-24 | option à décider |
| A-026 | 2026-11-24 | Pas de meta google-adsense-account (vérification par ads.txt seulement) | adsense | proposé | 2026-11-24 | |
