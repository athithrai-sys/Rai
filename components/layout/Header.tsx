"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const RADIUS_OPTIONS = [1, 2, 5, 10, 25];

// Persistent browse header: avatar · postcode · radius · rental cart.
// Postcode + radius are display/preference only in Phase 1 (stored locally);
// they start driving real geo-filtering once listings carry coordinates.
export default function Header() {
  const t = useTranslations("header");
  const [postcode, setPostcode] = useState("3451WD");
  const [radius, setRadius] = useState(5);

  useEffect(() => {
    const savedPostcode = localStorage.getItem("swappo:postcode");
    const savedRadius = localStorage.getItem("swappo:radius");
    if (savedPostcode) setPostcode(savedPostcode);
    if (savedRadius) setRadius(Number(savedRadius));
  }, []);

  function updatePostcode(value: string) {
    const clean = value.toUpperCase().replace(/[^0-9A-Z]/g, "").slice(0, 6);
    setPostcode(clean);
    localStorage.setItem("swappo:postcode", clean);
  }

  function updateRadius(value: number) {
    setRadius(value);
    localStorage.setItem("swappo:radius", String(value));
  }

  return (
    <header className="flex items-center gap-2 bg-swappo-peach px-4 py-3">
      {/* Avatar → account menu arrives with auth in Phase 2 */}
      <div
        aria-label={t("profileLabel")}
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/60"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6 text-swappo-ink/60"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-8 1.67-8 5v1h16v-1c0-3.33-4.67-5-8-5Z" />
        </svg>
      </div>

      <label className="sr-only" htmlFor="postcode">
        {t("postcodeLabel")}
      </label>
      <input
        id="postcode"
        value={postcode}
        onChange={(e) => updatePostcode(e.target.value)}
        placeholder={t("postcodePlaceholder")}
        autoComplete="postal-code"
        className="w-24 rounded-full bg-white px-3 py-2 text-center text-sm font-semibold tracking-wide outline-none focus:ring-2 focus:ring-swappo-orange"
      />

      <label className="sr-only" htmlFor="radius">
        {t("radiusLabel")}
      </label>
      <select
        id="radius"
        value={radius}
        onChange={(e) => updateRadius(Number(e.target.value))}
        className="rounded-full bg-white px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-swappo-orange"
      >
        {RADIUS_OPTIONS.map((km) => (
          <option key={km} value={km}>
            {t("radiusOption", { km })}
          </option>
        ))}
      </select>

      {/* Rental cart — functional from Phase 3 */}
      <div className="ml-auto" aria-label={t("cartLabel")}>
        <svg
          viewBox="0 0 24 24"
          className="size-7 text-swappo-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
    </header>
  );
}
