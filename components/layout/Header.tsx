"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const RADIUS_OPTIONS = [1, 2, 5, 10, 25];

// Persistent browse header per prototype: bordered avatar · postcode field ·
// radius dropdown · cart. Postcode + radius are stored locally in Phase 1;
// they start driving real geo-filtering once listings carry coordinates.
// Avatar opens the account menu and cart opens checkout in later phases.
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
    <header className="flex items-center gap-2.5 bg-swappo-peach px-4 py-3">
      <div
        aria-label={t("profileLabel")}
        className="flex size-[46px] shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-[#2aa79b]"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6 text-white"
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
        className="min-w-0 flex-1 rounded-[10px] bg-white px-3 py-3 text-center text-[15px] font-bold outline-none focus:ring-2 focus:ring-swappo-orange"
      />

      <label className="sr-only" htmlFor="radius">
        {t("radiusLabel")}
      </label>
      <select
        id="radius"
        value={radius}
        onChange={(e) => updateRadius(Number(e.target.value))}
        className="rounded-[10px] bg-white px-2 py-3 text-[15px] font-bold outline-none focus:ring-2 focus:ring-swappo-orange"
      >
        {RADIUS_OPTIONS.map((km) => (
          <option key={km} value={km}>
            {t("radiusOption", { km })}
          </option>
        ))}
      </select>

      {/* Rental cart — functional from Phase 3; count badge appears then */}
      <div
        aria-label={t("cartLabel")}
        className="shrink-0 text-[26px] leading-none"
      >
        <span aria-hidden>🛒</span>
      </div>
    </header>
  );
}
