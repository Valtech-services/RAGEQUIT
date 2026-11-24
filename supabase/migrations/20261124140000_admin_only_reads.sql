-- =====================================================================
-- A-024 : les tables sensibles ne sont lisibles que par le compte admin.
-- À exécuter une fois dans Supabase > SQL Editor (le connecteur Supabase de
-- Claude ne voit pas ce projet). Sans danger si on le relance.
--
-- 1) DIAGNOSTIC (lecture seule) : voir les règles actuelles avant de changer.
--    select tablename, policyname, cmd, roles, qual, with_check
--    from pg_policies
--    where schemaname = 'public'
--      and tablename in ('analytics_events','contact_messages','game_reports')
--    order by tablename, cmd;
--
-- 2) CORRECTION ci-dessous :
--    - lecture, modification et suppression : admin uniquement ;
--    - écriture conservée pour le site : statistiques anonymes (tout le monde),
--      messages de contact et signalements (compte connecté, pour lui-même).
--    Les votes (game_votes), profils et scores ne sont pas touchés.
-- =====================================================================

create or replace function public.is_admin() returns boolean
language sql stable
as $$ select auth.uid() = '4340752c-bfae-492c-a61b-a9552ac8c908'::uuid $$;

do $$
declare
  t text;
  p record;
begin
  foreach t in array array['analytics_events', 'contact_messages', 'game_reports'] loop
    execute format('alter table public.%I enable row level security', t);
    -- On retire toutes les règles existantes de la table (lecture comprise),
    -- puis on recrée uniquement celles dont le site a besoin.
    for p in select policyname from pg_policies where schemaname = 'public' and tablename = t loop
      execute format('drop policy %I on public.%I', p.policyname, t);
    end loop;
    execute format('create policy "admin full access" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

create policy "site writes analytics" on public.analytics_events
  for insert to anon, authenticated with check (true);

create policy "users send contact messages" on public.contact_messages
  for insert to authenticated with check (auth.uid() = user_id);

create policy "users send game reports" on public.game_reports
  for insert to authenticated with check (auth.uid() = user_id);

-- 3) CONTRÔLE après exécution : la requête du point 1 doit montrer, par table,
--    "admin full access" (ALL) et une seule règle INSERT.
