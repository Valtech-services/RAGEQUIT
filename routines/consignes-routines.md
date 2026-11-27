# Consignes de Laurent pour les routines « amélioration d'un jeu » et « audit du site »

Règle complète : `CLAUDE.md`, paragraphe « Consignes pour les routines d'amélioration et d'audit » (décision de Laurent du 2026-11-25). Une ligne par exécution concernée, la plus récente en bas.

- Routines concernées : `amélioration` (« RageQuit : propositions d'amélioration de jeux », 9h48, heure de Paris) et `audit` (« RageQuit : audit du site », 11h35).
- `pas aujourd'hui` : la routine ne fait rien ce jour-là (aucune PR de jeu, aucun rapport), passe la ligne en `utilisée` et envoie une notification courte.
- `à faire` : la routine tourne normalement (sert à annuler un « pas aujourd'hui » donné plus tôt pour la même date).
- Aucune ligne pour la date du jour (ici ni dans la mémoire Claude de Laurent, `/areas/ragequit-arcade.md`) : la routine tourne normalement.
- Un « ne le fais pas » ne vaut que pour la prochaine exécution de la routine nommée (le jour même si le message arrive avant l'heure de la routine, sinon le lendemain). Pour plusieurs jours, Laurent le dit (« pas d'audit jusqu'à lundi ») : une ligne par date.

| Routine | Date d'exécution | Décision | Phrase de Laurent | Reçue le | État |
|---|---|---|---|---|---|
| amélioration | 2026-11-25 | pas aujourd'hui | pour aujourd'hui ne fait pas la routine amélioration d'un jeu | 2026-11-25 09:05 | utilisée (routine sautée le 2026-11-25 à 09:48) |
| audit | 2026-11-25 | à faire | tu peux faire l'audit du site | 2026-11-25 09:05 | utilisée (audit du 2026-11-25, 11:35) |
| amélioration | 2026-11-26 | pas aujourd'hui | demain ne fait pas l'audit du site ni l'amélioration d'un jeu | 2026-11-26 01:13 | utilisée (routine sautée le 2026-11-26 à 09:48) |
| audit | 2026-11-26 | pas aujourd'hui | demain ne fait pas l'audit du site ni l'amélioration d'un jeu | 2026-11-26 01:13 | utilisée (audit sauté le 2026-11-26 à 11:35) |
| amélioration | 2026-11-27 | pas aujourd'hui | L'audit du site et l'amélioration d'un jeu par jour [sont] repoussés au lundi 30 novembre 2026 | 2026-11-26 | utilisée (routine sautée le 2026-11-27 à 09:48) |
| audit | 2026-11-27 | pas aujourd'hui | L'audit du site et l'amélioration d'un jeu par jour [sont] repoussés au lundi 30 novembre 2026 | 2026-11-26 | en attente |
| amélioration | 2026-11-28 | pas aujourd'hui | L'audit du site et l'amélioration d'un jeu par jour [sont] repoussés au lundi 30 novembre 2026 | 2026-11-26 | en attente |
| audit | 2026-11-28 | pas aujourd'hui | L'audit du site et l'amélioration d'un jeu par jour [sont] repoussés au lundi 30 novembre 2026 | 2026-11-26 | en attente |
| amélioration | 2026-11-29 | pas aujourd'hui | L'audit du site et l'amélioration d'un jeu par jour [sont] repoussés au lundi 30 novembre 2026 | 2026-11-26 | en attente |
| audit | 2026-11-29 | pas aujourd'hui | L'audit du site et l'amélioration d'un jeu par jour [sont] repoussés au lundi 30 novembre 2026 | 2026-11-26 | en attente |
