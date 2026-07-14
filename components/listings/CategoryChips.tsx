import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/lib/types";

// Chip icons per prototype (illustrated icons can replace these later).
const ICONS: Record<string, string> = {
  all: "🧰",
  "garden-tools": "🌱",
  gaming: "🎮",
  "music-instruments": "🎸",
  furniture: "🪑",
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
    <div className="mb-4 flex flex-wrap gap-2">
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
            className={`flex items-center gap-1.5 rounded-[12px] px-3 py-[9px] text-[13.5px] font-semibold transition-colors ${
              active ? "bg-[#111] text-white" : "bg-white text-swappo-ink"
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
