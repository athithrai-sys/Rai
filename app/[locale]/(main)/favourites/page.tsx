import { getTranslations, setRequestLocale } from "next-intl/server";
import FavouritesGrid from "@/components/listings/FavouritesGrid";
import { getListings } from "@/lib/data";

export default async function FavouritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("favourites");
  const listings = await getListings();

  return (
    <main className="px-4 pt-4">
      <h1 className="mb-3 text-[22px] font-extrabold text-white">
        {t("title")}
      </h1>
      <FavouritesGrid listings={listings} />
    </main>
  );
}
