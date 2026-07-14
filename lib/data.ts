import { CATEGORIES, type Category, type Listing } from "./types";
import { SAMPLE_LISTINGS } from "./sample-data";

// Single data-access point for listings.
//
// Right now this serves the bundled sample data so the app works before
// Supabase credentials are configured. Once .env.local is set up and the
// database is seeded, only this file changes: the functions below switch to
// RLS-protected anon queries against Supabase. Components never talk to the
// database directly.

export interface ListingFilters {
  query?: string;
  category?: string;
}

export function isCategory(value: string | undefined): value is Category {
  return CATEGORIES.includes(value as Category);
}

export async function getListings(
  filters: ListingFilters = {},
): Promise<Listing[]> {
  let items = SAMPLE_LISTINGS;

  if (filters.category && isCategory(filters.category)) {
    items = items.filter((l) => l.category === filters.category);
  }

  const q = filters.query?.trim().toLowerCase();
  if (q) {
    items = items.filter((l) =>
      `${l.title} ${l.description} ${l.city}`.toLowerCase().includes(q),
    );
  }

  return items;
}

export async function getListing(id: string): Promise<Listing | null> {
  return SAMPLE_LISTINGS.find((l) => l.id === id) ?? null;
}
