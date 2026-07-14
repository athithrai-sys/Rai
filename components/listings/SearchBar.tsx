"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

// Search box that syncs its value to ?q= in the URL (debounced), so results
// come from the server and filtered views are shareable links.
// Styling per prototype: white rounded-14 field, search icon on the right,
// separate square filter button (functional with the map screen later).
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
    <div className="mb-3.5 flex gap-2.5">
      <div className="flex flex-1 items-center rounded-[14px] bg-white px-3.5">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className="w-full bg-transparent py-[13px] text-[15px] outline-none placeholder:text-swappo-grey"
        />
        <span aria-hidden className="text-lg text-swappo-grey">
          🔍
        </span>
      </div>
      <button
        type="button"
        disabled
        aria-label={t("filterLabel")}
        className="w-[50px] rounded-[14px] bg-white text-xl opacity-80"
      >
        ⚙️
      </button>
    </div>
  );
}
