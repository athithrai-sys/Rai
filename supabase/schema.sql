-- Swappo — Phase 1 schema
-- Run this in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- Safe to run more than once (IF NOT EXISTS everywhere).
--
-- Design notes:
-- * `slug` is the human-readable id used in URLs (/listings/bosch-...).
-- * `owner_id` references auth.users for Phase 2; sample data has no owner
--   yet, so it is nullable and `owner_name` carries the display name.
-- * `is_anonymous` = the "show listing anonymously" toggle from the spec.
-- * `rating` / `rating_count` are denormalised for now; a reviews table
--   arrives with bookings in Phase 3.
-- * Row Level Security: the public (anon key) can only read active
--   listings. Writing requires authentication (Phase 2 policies).

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  price_per_day numeric(8,2) not null check (price_per_day >= 0),
  category text not null check (
    category in ('garden-tools','gaming','music-instruments','furniture','others')
  ),
  condition text not null default '',
  -- Location privacy: only city + postcode area, never a street address
  city text not null,
  postcode text not null,
  photos text[] not null default '{}',
  emoji text not null default '📦',
  bg text not null default '',
  rating numeric(2,1) not null default 0,
  rating_count integer not null default 0,
  available_from date,
  available_to date,
  owner_id uuid references auth.users (id) on delete set null,
  owner_name text,
  is_anonymous boolean not null default false,
  status text not null default 'active' check (status in ('active','paused','deleted')),
  created_at timestamptz not null default now()
);

create index if not exists listings_category_idx on public.listings (category);
create index if not exists listings_status_idx on public.listings (status);

alter table public.listings enable row level security;

-- Everyone (including anonymous visitors) may read active listings.
drop policy if exists "Public can view active listings" on public.listings;
create policy "Public can view active listings"
  on public.listings
  for select
  using (status = 'active');

-- No insert/update/delete policies yet: with RLS enabled and no policy,
-- writes through the API are denied. Phase 2 adds owner-scoped policies.
