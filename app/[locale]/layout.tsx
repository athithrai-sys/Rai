import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import BottomNav from "@/components/layout/BottomNav";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Swappo", template: "%s | Swappo" },
  description:
    "Huur, leen en deel spullen in jouw buurt — van gereedschap tot gitaren.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="min-h-dvh bg-swappo-orange text-swappo-ink antialiased">
        <NextIntlClientProvider>
          {/* pb-24 keeps content clear of the fixed bottom nav */}
          <div className="mx-auto min-h-dvh w-full max-w-md pb-24 md:max-w-3xl lg:max-w-5xl">
            {children}
          </div>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
