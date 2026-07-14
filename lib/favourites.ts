// Favourites live in localStorage until accounts arrive in Phase 2,
// then they move to the database. Components that show favourites listen
// for the FAV_EVENT so hearts and the favourites tab stay in sync.

const STORAGE_KEY = "swappo:favourites";
export const FAV_EVENT = "swappo:favchange";

export function readFavourites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function toggleFavourite(listingId: string): string[] {
  const favourites = readFavourites();
  const next = favourites.includes(listingId)
    ? favourites.filter((id) => id !== listingId)
    : [...favourites, listingId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(FAV_EVENT));
  return next;
}
