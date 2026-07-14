import type { Listing } from "@/lib/types";
import ListingCard from "./ListingCard";

export default function ListingGrid({ listings }: { listings: Listing[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
