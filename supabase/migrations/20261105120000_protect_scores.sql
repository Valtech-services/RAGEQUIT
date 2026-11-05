-- Scores permanents : plus aucune suppression publique, archive automatique,
-- score qui ne baisse jamais, une ligne par joueur et combinaison, enregistrement atomique.

-- 1) Archive : toute ligne supprimée de scores y est copiée automatiquement
create table if not exists public.scores_archive (
  archive_id bigserial primary key,
  id uuid, user_id uuid, game_id text, mode text, score numeric, score_label text,
  created_at timestamptz, difficulty text, arena text,
  deleted_at timestamptz not null default now(),
  deleted_by uuid
);
alter table public.scores_archive enable row level security;
revoke all on public.scores_archive from anon, authenticated;

create or replace function public.scores_archive_on_delete() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.scores_archive (id, user_id, game_id, mode, score, score_label, created_at, difficulty, arena, deleted_by)
  values (old.id, old.user_id, old.game_id, old.mode, old.score, old.score_label, old.created_at, old.difficulty, old.arena, auth.uid());
  return old;
end $$;
drop trigger if exists scores_archive_on_delete on public.scores;
create trigger scores_archive_on_delete after delete on public.scores
  for each row execute function public.scores_archive_on_delete();

-- 2) Plus personne ne peut supprimer un score, sauf l'admin
drop policy if exists "allow delete scores" on public.scores;
drop policy if exists "Only admin can delete scores" on public.scores;
create policy "Only admin can delete scores" on public.scores
  for delete to authenticated
  using (auth.uid() = '4340752c-bfae-492c-a61b-a9552ac8c908'::uuid);

-- 3) Un score enregistré ne peut jamais baisser
create or replace function public.scores_never_decrease() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.score < old.score then
    new.score := old.score; new.score_label := old.score_label; new.created_at := old.created_at;
  end if;
  return new;
end $$;
drop trigger if exists scores_never_decrease on public.scores;
create trigger scores_never_decrease before update on public.scores
  for each row execute function public.scores_never_decrease();

-- 4) Doublons : on garde le meilleur par joueur / jeu / mode / variante (les autres vont en archive)
delete from public.scores s using (
  select id, row_number() over (partition by user_id, game_id, mode, difficulty, arena
                                order by score desc, created_at asc) rn
  from public.scores where user_id is not null
) d where s.id = d.id and d.rn > 1;

-- 5) Une seule ligne par joueur et combinaison
create unique index if not exists scores_one_best_per_player
  on public.scores (user_id, game_id, mode, difficulty, arena) nulls not distinct
  where user_id is not null;

-- 6) Enregistrement atomique : insère ou garde le meilleur
create or replace function public.submit_score(
  p_game text, p_mode text, p_score numeric, p_label text,
  p_difficulty text default null, p_arena text default null
) returns void
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  insert into public.scores as s (user_id, game_id, mode, score, score_label, difficulty, arena, created_at)
  values (uid, p_game, p_mode, p_score, p_label, p_difficulty, p_arena, now())
  on conflict (user_id, game_id, mode, difficulty, arena) where user_id is not null
  do update set score = excluded.score, score_label = excluded.score_label, created_at = excluded.created_at
  where excluded.score > s.score;
end $$;
revoke all on function public.submit_score(text, text, numeric, text, text, text) from public, anon;
grant execute on function public.submit_score(text, text, numeric, text, text, text) to authenticated;
