import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Listing } from "@/lib/types";
import Stars from "@/components/ui/Stars";
import FavoriteButton from "./FavoriteButton";

export default async function ListingCard({ listing }: { listing: Listing }) {
  const t = await getTranslations("common");

  return (
    <Link
      href={`/listings/${listing.id}`}
      className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 rounded-card"
    >
      <article className="overflow-hidden rounded-card bg-white shadow-sm">
        <div className="relative aspect-[4/3] bg-swappo-cream">
          {/* Placeholder artwork for now; swaps to real photos (next/image +
              Supabase Storage) when the database is seeded */}
          <img
            src={listing.photos[0]}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <FavoriteButton listingId={listing.id} />
        </div>
        <div className="p-3">
          <Stars rating={listing.rating} />
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
            {listing.title}
          </h3>
          <p className="mt-1 text-sm font-bold">
            {t("perDay", { price: listing.pricePerDay })}
          </p>
        </div>
      </article>
    </Link>
  );
}
