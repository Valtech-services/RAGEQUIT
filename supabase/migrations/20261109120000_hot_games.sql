-- Jeux « hot » (flamme sur la carte) : les jeux joués par le plus de visiteurs
-- différents sur les N derniers jours. Lecture publique, sans exposer analytics_events.
create or replace function public.hot_games(days int default 7, max_games int default 10)
returns table(game_id text, players bigint)
language sql
security definer
set search_path = public
stable
as $$
  select e.game_id, count(distinct e.session_id) as players
  from public.analytics_events e
  where e.event = 'game_start'
    and e.game_id is not null
    and e.created_at > now() - make_interval(days => least(greatest(days, 1), 30))
  group by e.game_id
  order by players desc, count(*) desc
  limit least(greatest(max_games, 1), 20);
$$;

revoke all on function public.hot_games(int, int) from public;
grant execute on function public.hot_games(int, int) to anon, authenticated;
