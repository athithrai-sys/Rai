import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getListing } from "@/lib/data";
import Stars from "@/components/ui/Stars";
import ListingMedia from "@/components/listings/ListingMedia";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  return { title: listing?.title ?? "Swappo" };
}

export default async function ListingDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("listing");
  const tCategories = await getTranslations("categories");
  const listing = await getListing(id);

  if (!listing) {
    return (
      <main className="px-4 pt-10">
        <div className="rounded-[26px] bg-white p-8 text-center">
          <h1 className="text-lg font-extrabold">{t("notFoundTitle")}</h1>
          <p className="mt-2 text-sm text-swappo-ink/60">{t("notFoundBody")}</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-swappo-orange px-6 py-2.5 text-sm font-bold text-white"
          >
            {t("notFoundCta")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 pb-6 pt-4">
      <Link
        href={{ pathname: "/", query: { cat: listing.category } }}
        className="mb-3 inline-block font-bold text-white"
      >
        « {t("backTo", { category: tCategories(listing.category) })}
      </Link>

      {/* Detail card per prototype: centered, orange section labels */}
      <article className="rounded-[26px] bg-white p-[22px] text-center">
        <h1 className="text-[23px] font-extrabold leading-tight">
          {listing.title}
        </h1>

        <div className="mt-3.5 h-[190px] overflow-hidden rounded-[20px]">
          <ListingMedia listing={listing} emojiSize={84} />
        </div>

        <div className="mt-4">
          <Stars rating={listing.rating} size={22} />
          <p className="text-xs text-swappo-ink/50">
            {t("ratingCount", { count: listing.ratingCount })}
          </p>
        </div>

        <p className="mt-1.5 font-extrabold">
          {t("pricePerDay", { price: listing.pricePerDay })}
        </p>

        <p className="mt-[18px] font-bold text-swappo-orange">
          {t("availableAt")}
        </p>
        <p className="text-lg font-extrabold">
          {listing.postcode} · {listing.city}
        </p>

        <p className="mt-3 font-bold text-swappo-orange">{t("onDays")}</p>
        <p className="font-extrabold">
          {t("dateRange", {
            from: listing.availableFrom,
            to: listing.availableTo,
          })}
        </p>

        <p className="mt-2.5 text-[12.5px] text-[#777]">{t("privacyNote")}</p>

        <div className="mt-4 text-sm text-[#666]">
          <p>
            <span className="font-bold">{t("conditionLabel")}: </span>
            {listing.condition}
          </p>
          <p className="mt-1">{listing.description}</p>
          <p className="mt-2">
            {listing.ownerName
              ? t("offeredBy", { name: listing.ownerName })
              : t("anonymousOwner")}
          </p>
        </div>

        {/* Cart flow ships in Phase 3 — disabled pill = light peach,
            per the prototype's Pill component */}
        <button
          type="button"
          disabled
          className="mt-[22px] w-full rounded-full bg-swappo-peach-light px-[22px] py-3.5 text-base font-bold text-white"
        >
          🛒 {t("addToCart")}
        </button>
        <p className="mt-2 text-xs text-[#999]">{t("cartComingSoon")}</p>
      </article>
    </main>
  );
}
