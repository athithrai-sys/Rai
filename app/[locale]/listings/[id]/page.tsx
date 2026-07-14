import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getListing } from "@/lib/data";
import Stars from "@/components/ui/Stars";
import FavoriteButton from "@/components/listings/FavoriteButton";

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
  const tCommon = await getTranslations("common");
  const listing = await getListing(id);

  if (!listing) {
    return (
      <main className="px-4 pt-10">
        <div className="rounded-card bg-white p-8 text-center">
          <h1 className="text-lg font-bold">{t("notFoundTitle")}</h1>
          <p className="mt-2 text-sm text-swappo-ink/60">{t("notFoundBody")}</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-swappo-orange px-6 py-2.5 text-sm font-semibold text-white"
          >
            {t("notFoundCta")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 pt-4">
      {/* Slim detail header: back to the category + cart icon */}
      <div className="flex items-center justify-between text-white">
        <Link
          href={{ pathname: "/", query: { cat: listing.category } }}
          className="flex items-center gap-1 text-sm font-medium"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {t("backToCategory", {
            category: tCategories(listing.category),
          })}
        </Link>
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>

      <article className="mt-3 overflow-hidden rounded-card bg-white">
        <div className="relative aspect-[4/3] bg-swappo-cream">
          <img
            src={listing.photos[0]}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
          <FavoriteButton listingId={listing.id} />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h1 className="text-xl font-bold">{listing.title}</h1>
            <div className="mt-1.5 flex items-center gap-2">
              <Stars rating={listing.rating} />
              <span className="text-xs text-swappo-ink/50">
                {t("ratingCount", { count: listing.ratingCount })}
              </span>
            </div>
          </div>

          <p className="text-lg font-bold">
            {t("pricePerDay", { price: listing.pricePerDay })}
          </p>

          <div className="rounded-2xl bg-swappo-cream p-4 text-sm">
            <p className="font-semibold">
              {t("pickupAt", {
                city: listing.city,
                postcode: listing.postcode,
              })}
            </p>
            <p className="mt-1 text-swappo-ink/60">{t("privacyNote")}</p>
          </div>

          <div className="text-sm">
            <p>
              <span className="font-semibold">{t("conditionLabel")}: </span>
              {listing.condition}
            </p>
            <p className="mt-2 font-semibold">{t("descriptionLabel")}</p>
            <p className="mt-1 text-swappo-ink/80">{listing.description}</p>
            <p className="mt-3 text-swappo-ink/60">
              {listing.ownerName
                ? t("offeredBy", { name: listing.ownerName })
                : t("anonymousOwner")}
            </p>
          </div>

          {/* Cart flow ships in Phase 3 — CTA rendered per design system
              (disabled = lighter peach) */}
          <div>
            <button
              type="button"
              disabled
              className="w-full rounded-full bg-swappo-peach px-6 py-3.5 font-semibold text-white"
            >
              {t("addToCart")}
            </button>
            <p className="mt-2 text-center text-xs text-swappo-ink/50">
              {t("cartComingSoon")}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
