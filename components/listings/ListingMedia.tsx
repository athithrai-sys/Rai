import type { Listing } from "@/lib/types";

// Listing artwork: real photo when one exists (Supabase Storage, later),
// otherwise the prototype's emoji-on-gradient placeholder.
export default function ListingMedia({
  listing,
  emojiSize,
}: {
  listing: Listing;
  emojiSize: number;
}) {
  if (listing.photos[0]) {
    return (
      <img
        src={listing.photos[0]}
        alt={listing.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-full w-full items-center justify-center"
      style={{ background: listing.bg, fontSize: emojiSize }}
    >
      {listing.emoji}
    </div>
  );
}
