import { createClient } from "@supabase/supabase-js";
import { CATEGORIES, type Category, type Listing } from "./types";
import { SAMPLE_LISTINGS } from "./sample-data";

// Single data-access point for listings.
//
// When Supabase credentials are configured (env vars below), listings come
// from the database via the public anon key — Row Level Security only
// exposes active listings. Without credentials, or if a query fails
// (e.g. the tables haven't been created yet), the bundled sample data is
// served instead so the app never breaks; failures are logged server-side.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export interface ListingFilters {
  query?: string;
  category?: string;
}

export function isCategory(value: string | undefined): value is Category {
  return CATEGORIES.includes(value as Category);
}

// Public read-only client — no session/cookies needed for browsing.
function publicClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

interface ListingRow {
  slug: string;
  title: string;
  description: string;
  price_per_day: number;
  category: Category;
  condition: string;
  city: string;
  postcode: string;
  photos: string[];
  emoji: string;
  bg: string;
  rating: number;
  rating_count: number;
  available_from: string | null;
  available_to: string | null;
  owner_name: string | null;
  is_anonymous: boolean;
}

// ISO date (2026-07-25) → display format (25/07/2026)
function formatDate(iso: string | null): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function mapRow(row: ListingRow): Listing {
  return {
    id: row.slug,
    title: row.title,
    description: row.description,
    pricePerDay: Number(row.price_per_day),
    category: row.category,
    condition: row.condition,
    city: row.city,
    postcode: row.postcode,
    photos: row.photos ?? [],
    emoji: row.emoji,
    bg: row.bg,
    rating: Number(row.rating),
    ratingCount: row.rating_count,
    availableFrom: formatDate(row.available_from),
    availableTo: formatDate(row.available_to),
    // Anonymity toggle respected everywhere pre-booking
    ownerName: row.is_anonymous ? null : row.owner_name,
  };
}

function filterSamples(filters: ListingFilters): Listing[] {
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

export async function getListings(
  filters: ListingFilters = {},
): Promise<Listing[]> {
  const supabase = publicClient();
  if (!supabase) return filterSamples(filters);

  try {
    let query = supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: true });

    if (filters.category && isCategory(filters.category)) {
      query = query.eq("category", filters.category);
    }
    // Strip characters that have meaning in PostgREST filter syntax
    const term = filters.query?.trim().replace(/[,%()]/g, " ").trim();
    if (term) {
      query = query.or(
        `title.ilike.%${term}%,description.ilike.%${term}%,city.ilike.%${term}%`,
      );
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as ListingRow[]).map(mapRow);
  } catch (err) {
    console.error("Supabase listings query failed, serving sample data:", err);
    return filterSamples(filters);
  }
}

export async function getListing(id: string): Promise<Listing | null> {
  const supabase = publicClient();
  if (!supabase) return SAMPLE_LISTINGS.find((l) => l.id === id) ?? null;

  try {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("slug", id)
      .maybeSingle();
    if (error) throw error;
    return data ? mapRow(data as ListingRow) : null;
  } catch (err) {
    console.error("Supabase listing query failed, serving sample data:", err);
    return SAMPLE_LISTINGS.find((l) => l.id === id) ?? null;
  }
}
