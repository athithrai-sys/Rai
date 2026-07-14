"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// Icon-only bottom nav per prototype: white bar with rounded top corners,
// emoji icons, inactive tabs greyed out. The inbox unread badge arrives
// with chat in Phase 3.
const TABS = [
  { href: "/", key: "home", icon: "🏠" },
  { href: "/map", key: "map", icon: "📍" },
  { href: "/favourites", key: "favourites", icon: "❤️" },
  { href: "/inbox", key: "inbox", icon: "✉️" },
] as const;

export default function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2">
      <div className="flex items-center justify-between rounded-t-[18px] bg-white px-[30px] pb-[calc(14px+env(safe-area-inset-bottom))] pt-3.5 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
        {TABS.map(({ href, key, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={key}
              href={href}
              aria-label={t(key)}
              aria-current={active ? "page" : undefined}
              className={`text-[26px] leading-none ${
                active ? "" : "opacity-55 grayscale"
              }`}
            >
              <span aria-hidden>{icon}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
