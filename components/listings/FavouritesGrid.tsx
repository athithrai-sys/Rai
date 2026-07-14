"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { Listing } from "@/lib/types";
import { FAV_EVENT, readFavourites } from "@/lib/favourites";
import ListingCard from "./ListingCard";

// Client-side favourites grid: filters the listings by the locally stored
// hearts and stays in sync when a heart is toggled (FAV_EVENT).
export default function FavouritesGrid({ listings }: { listings: Listing[] }) {
  const t = useTranslations("favourites");
  const [favourites, setFavourites] = useState<string[] | null>(null);

  useEffect(() => {
    const sync = () => setFavourites(readFavourites());
    sync();
    window.addEventListener(FAV_EVENT, sync);
    return () => window.removeEventListener(FAV_EVENT, sync);
  }, []);

  // Not rendered on the server — favourites only exist in the browser
  if (favourites === null) return null;

  const favItems = listings.filter((l) => favourites.includes(l.id));

  if (favItems.length === 0) {
    return <p className="px-4 py-8 text-center text-white">{t("empty")}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3.5 pb-2.5">
      {favItems.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
