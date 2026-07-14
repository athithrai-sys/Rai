"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "swappo:favourites";

function readFavourites(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

// Heart toggle on listing cards. Favourites live in localStorage until
// accounts arrive in Phase 2, then they move to the database.
export default function FavoriteButton({ listingId }: { listingId: string }) {
  const t = useTranslations("favourites");
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(readFavourites().includes(listingId));
  }, [listingId]);

  function toggle(e: React.MouseEvent) {
    // The card itself is a link — don't navigate when tapping the heart
    e.preventDefault();
    e.stopPropagation();
    const favourites = readFavourites();
    const next = favourites.includes(listingId)
      ? favourites.filter((id) => id !== listingId)
      : [...favourites, listingId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsFavourite(next.includes(listingId));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggleLabel")}
      aria-pressed={isFavourite}
      className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm"
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-5 ${
          isFavourite ? "text-swappo-red" : "text-swappo-ink/30"
        }`}
        fill={isFavourite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 21C7 16.5 3 13.3 3 9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 3.5c0 3.8-4 7-9 11.5Z" />
      </svg>
    </button>
  );
}
