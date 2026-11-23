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
