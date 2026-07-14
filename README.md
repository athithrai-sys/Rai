# Swappo

Peer-to-peer equipment rental marketplace for the Netherlands — rent, lend
and share tools, instruments, gaming gear and furniture with your
neighbours. Product spec lives in `swappo-master-prompt-v2.md`; the visual
reference is `swappo-prototype.jsx` (design tokens + screen layouts).

## Stack

- **Next.js (App Router, TypeScript)** on Vercel
- **Supabase** — auth, Postgres (RLS on everything), Storage
  (`listing-photos`), Realtime chat
- **Tailwind CSS v4** — Swappo design tokens in `app/globals.css`
- **next-intl** — Dutch (default) + English, locale-prefixed routes
  (`/nl`, `/en`)
- **Mollie** — iDEAL payments (test mode, Phase 4)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Supabase keys
npm run dev
```

Open http://localhost:3000 — it redirects to `/nl`.

### Database setup (once per Supabase project)

In the Supabase dashboard → **SQL Editor**, run in order:

1. `supabase/schema.sql` — creates the `listings` table with Row Level
   Security (public read of active listings only)
2. `supabase/seed.sql` — inserts the 13 sample listings (safe to re-run)

On Vercel, set `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables.

Without Supabase credentials — or if a query fails — the app serves the
bundled sample data (`lib/sample-data.ts`), so it always runs. All listing
queries go through `lib/data.ts`; components never talk to the database
directly.

## Project layout

```
app/[locale]/            locale-aware routes (nl default, en)
  (main)/                screens with the shared peach header
    page.tsx             home / browse (search, chips, 2-col grid)
    listings/[id]/       listing detail page
    favourites/          saved items (localStorage until Phase 2)
    map|inbox            placeholder tabs (later phases)
components/
  layout/                Header, BottomNav
  listings/              SearchBar, CategoryChips, ListingCard, …
  ui/                    Stars, ComingSoon
lib/
  data.ts                single data-access point for listings
  sample-data.ts         13 Dutch sample listings (also feeds seeding)
  favourites.ts          localStorage favourites helpers
  supabase/              browser + server clients (anon key + RLS only)
messages/                nl.json / en.json UI strings
i18n/ + proxy.ts         next-intl routing config
```

## Build phases

1. ✅ **Public browse** — home, search, category filter, listing detail,
   sample data
2. ⬜ Auth & listings (Supabase email/Google, create-listing, dashboard)
3. ⬜ Booking & chat (cart → pending bookings, Realtime chat, Resend email)
4. ⬜ Payments (Mollie iDEAL, test mode, server-side only)
5. ⬜ Polish, legal, PWA (i18n switcher, Plausible, legal pages, manifest,
   SEO, a11y)

Architecture notes for Phase-2+ extension points (owner accept/decline flag,
deposits/borg, chat privacy rule: exact addresses only ever in chat) are in
the spec.

## Rules that always apply

- User data access goes through Supabase **RLS**; the service role key is
  used only in `scripts/` and server-only API routes, never in
  client-reachable code.
- Only city + postcode area are ever shown publicly for a listing;
  exact addresses are exchanged in chat after a confirmed booking.
- Dutch-first: every UI string lives in `messages/nl.json` (and `en.json`).
