"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const TABS = [
  { href: "/", key: "home" },
  { href: "/map", key: "map" },
  { href: "/favourites", key: "favourites" },
  { href: "/inbox", key: "inbox" },
] as const;

function TabIcon({ tab, active }: { tab: string; active: boolean }) {
  const cls = `size-6 ${active ? "text-swappo-orange" : "text-swappo-ink/40"}`;
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  switch (tab) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden>
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "favourites":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden>
          <path d="M12 21C7 16.5 3 13.3 3 9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 3.5c0 3.8-4 7-9 11.5Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke} aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
  }
}

export default function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-black/5 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-stretch justify-around md:max-w-3xl lg:max-w-5xl">
        {TABS.map(({ href, key }) => {
          const active = pathname === href;
          return (
            <Link
              key={key}
              href={href}
              aria-current={active ? "page" : undefined}
              className="flex flex-1 flex-col items-center gap-0.5 py-2.5"
            >
              <TabIcon tab={key} active={active} />
              <span
                className={`text-[11px] font-medium ${
                  active ? "text-swappo-orange" : "text-swappo-ink/40"
                }`}
              >
                {t(key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
