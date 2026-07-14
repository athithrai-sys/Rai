import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/lib/types";

// Emoji stand in for the illustrated chip icons until real assets exist.
const ICONS: Record<string, string> = {
  all: "✨",
  "garden-tools": "🌿",
  gaming: "🎮",
  "music-instruments": "🎸",
  furniture: "🛋️",
  others: "➕",
};

export default async function CategoryChips({
  selected,
  query,
}: {
  selected: string;
  query?: string;
}) {
  const t = await getTranslations("categories");
  const chips = ["all", ...CATEGORIES];

  return (
    <div className="scrollbar-none -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
      {chips.map((cat) => {
        const active = selected === cat;
        const params: Record<string, string> = {};
        if (cat !== "all") params.cat = cat;
        if (query) params.q = query;

        return (
          <Link
            key={cat}
            href={{ pathname: "/", query: params }}
            replace
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-swappo-ink text-white"
                : "bg-white text-swappo-ink"
            }`}
          >
            <span aria-hidden>{ICONS[cat]}</span>
            {t(cat)}
          </Link>
        );
      })}
    </div>
  );
}
