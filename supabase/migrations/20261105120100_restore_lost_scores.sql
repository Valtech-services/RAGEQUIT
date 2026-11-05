-- Restauration des meilleurs scores effacés (vague de suppression du 19-20 septembre 2026),
-- reconstruits à partir des fins de partie des joueurs connectés enregistrées dans analytics_events.
-- Ne baisse jamais un score existant. Stellar Forge et Crush Depth speedrun exclus (score non comparable).
with e as (
  select user_id, game_id, created_at,
    coalesce(props#>>'{props,props,score}', props#>>'{props,score}', props->>'score') sc,
    coalesce(props#>>'{props,props,mode}',  props#>>'{props,mode}',  props->>'mode', 'classic') mode,
    coalesce(props#>>'{props,props,diff}',  props#>>'{props,diff}',  props->>'diff') diff
  from public.analytics_events
  where event = 'game_end' and user_id is not null
    and game_id not in ('stellar-forge')
), best as (
  select distinct on (user_id, game_id, mode, d)
    user_id, game_id, mode,
    case when game_id = 'rage-hockey' then diff end d,
    sc::numeric score, created_at
  from e
  where sc ~ '^-?[0-9]+(\.[0-9]+)?$'
    and not (game_id = 'crush-depth' and mode = 'speedrun')
    and exists (select 1 from auth.users u where u.id = e.user_id)
  order by user_id, game_id, mode, d, sc::numeric desc, created_at asc
)
insert into public.scores as s (user_id, game_id, mode, score, score_label, difficulty, arena, created_at)
select user_id, game_id, mode, score,
  case
    when game_id = 'bird-blitz' then to_char(score, 'FM999,999,999,990') || ' pts · ' ||
      case mode when 'bigben' then 'Big Ben' when 'eiffel' then 'Eiffel Tower' when 'colosseum' then 'Colosseum' else initcap(mode) end
    when game_id in ('city-runner','crush-depth','fox-runner','voidfall') then to_char(score, 'FM999,999,999,990') || ' m'
    when game_id in ('dead-zone','flashout','linestorm','loopstrike','mazequake','virus-lab') then to_char(score, 'FM999,999,999,990') || ' pts'
    when game_id in ('octaflux','snake','rage-hockey') then score::bigint::text || ' pts'
    when game_id = 'staq' then score::bigint::text || ' blocks'
    when game_id = 'rooftop-rush' then score::bigint::text
    else to_char(score, 'FM999,999,999,990')
  end,
  d,
  case when game_id = 'rage-hockey' then 'normal' end,
  created_at
from best
on conflict (user_id, game_id, mode, difficulty, arena) where user_id is not null
do update set score = excluded.score, score_label = excluded.score_label, created_at = excluded.created_at
where excluded.score > s.score;
