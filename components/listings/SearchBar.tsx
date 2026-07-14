"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

// Search box that syncs its value to ?q= in the URL (debounced), so results
// come from the server and filtered views are shareable links.
export default function SearchBar() {
  const t = useTranslations("search");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, []);

  function onChange(next: string) {
    setValue(next);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.trim()) {
        params.set("q", next.trim());
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    }, 300);
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5">
        <svg
          viewBox="0 0 24 24"
          className="size-5 shrink-0 text-swappo-ink/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className="w-full bg-transparent text-sm outline-none placeholder:text-swappo-ink/40"
        />
      </div>
      {/* Filter sheet ships with the map screen in a later phase */}
      <button
        type="button"
        disabled
        aria-label={t("filterLabel")}
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-swappo-ink/40"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M4 6h16M7 12h10M10 18h4" />
        </svg>
      </button>
    </div>
  );
}
