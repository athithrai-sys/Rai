// App-level domain types. The UI codes against these, and lib/data.ts maps
// whatever the database rows look like into this shape — so a schema change
// only ever touches the data layer, not the components.

export const CATEGORIES = [
  "garden-tools",
  "gaming",
  "music-instruments",
  "furniture",
  "others",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Listing {
  id: string;
  title: string;
  description: string;
  /** Rental price per day in whole euros */
  pricePerDay: number;
  category: Category;
  condition: string;
  /** Location privacy: only city + postcode area are ever public */
  city: string;
  postcode: string;
  /**
   * First photo is the main photo. Empty until real photos live in
   * Supabase Storage — cards then fall back to the emoji/gradient artwork
   * below (the prototype's visual style).
   */
  photos: string[];
  emoji: string;
  /** CSS gradient behind the emoji artwork */
  bg: string;
  rating: number;
  ratingCount: number;
  /** Display date range the item is available (dd/mm/yyyy) */
  availableFrom: string;
  availableTo: string;
  /** null = owner listed anonymously (shown as "Anonieme verhuurder") */
  ownerName: string | null;
}
