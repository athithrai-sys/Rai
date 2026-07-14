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
  /** First photo is the main photo */
  photos: string[];
  rating: number;
  ratingCount: number;
  /** null = owner listed anonymously (shown as "Anonieme verhuurder") */
  ownerName: string | null;
}
