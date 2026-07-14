import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Listing } from "@/lib/types";
import Stars from "@/components/ui/Stars";
import ListingMedia from "./ListingMedia";
import FavoriteButton from "./FavoriteButton";

// Listing card per prototype: artwork on top, centered stars / name /
// bold "X€ per Day" below, heart toggle top-right.
// Deliberately not async so it renders in both server and client trees
// (the favourites tab filters cards client-side).
export default function ListingCard({ listing }: { listing: Listing }) {
  const t = useTranslations("common");

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block rounded-card focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
    >
      <article className="overflow-hidden rounded-card bg-white shadow-[0_3px_10px_rgba(0,0,0,0.10)]">
        <div className="relative h-[130px]">
          <ListingMedia listing={listing} emojiSize={52} />
          <FavoriteButton listingId={listing.id} />
        </div>
        <div className="px-2.5 pb-3 pt-2 text-center">
          <Stars rating={listing.rating} />
          <h3 className="mt-0.5 text-[14.5px] leading-snug">
            {listing.title}
          </h3>
          <p className="text-[15px] font-extrabold">
            {t("perDay", { price: listing.pricePerDay })}
          </p>
        </div>
      </article>
    </Link>
  );
}
