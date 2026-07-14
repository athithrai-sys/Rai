"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FAV_EVENT, readFavourites, toggleFavourite } from "@/lib/favourites";

// Heart toggle on listing cards — red disc with white heart when saved,
// translucent white disc with grey heart when not (per prototype).
export default function FavoriteButton({ listingId }: { listingId: string }) {
  const t = useTranslations("favourites");
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const sync = () => setIsFavourite(readFavourites().includes(listingId));
    sync();
    window.addEventListener(FAV_EVENT, sync);
    return () => window.removeEventListener(FAV_EVENT, sync);
  }, [listingId]);

  function onClick(e: React.MouseEvent) {
    // The card itself is a link — don't navigate when tapping the heart
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(listingId);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t("toggleLabel")}
      aria-pressed={isFavourite}
      className={`absolute right-2 top-2 flex size-[34px] items-center justify-center rounded-full text-base ${
        isFavourite ? "bg-swappo-red text-white" : "bg-white/80 text-swappo-grey"
      }`}
    >
      <span aria-hidden>♥</span>
    </button>
  );
}
