import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SearchBar from "@/components/listings/SearchBar";
import CategoryChips from "@/components/listings/CategoryChips";
import ListingGrid from "@/components/listings/ListingGrid";
import { getListings } from "@/lib/data";

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q, cat } = await searchParams;

  const t = await getTranslations("home");
  const listings = await getListings({ query: q, category: cat });

  return (
    <main className="px-4 pt-3">
      <Suspense>
        <SearchBar />
      </Suspense>
      <CategoryChips selected={cat ?? "all"} query={q} />
      {listings.length > 0 ? (
        <ListingGrid listings={listings} />
      ) : (
        <div className="mt-6 rounded-card bg-white p-6 text-center text-sm text-swappo-ink/70">
          {t("noResults")}
        </div>
      )}
    </main>
  );
}
