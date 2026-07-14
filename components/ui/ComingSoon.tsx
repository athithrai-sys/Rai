import { getTranslations } from "next-intl/server";

// Placeholder body for tabs whose features arrive in a later phase
// (map, favourites list, inbox) so no bottom-nav tap dead-ends in a 404.
export default async function ComingSoon() {
  const t = await getTranslations("comingSoon");

  return (
    <main className="px-4 pt-10">
      <div className="rounded-card bg-white p-8 text-center">
        <p className="text-4xl" aria-hidden>
          🚧
        </p>
        <h1 className="mt-3 text-lg font-bold">{t("title")}</h1>
        <p className="mt-2 text-sm text-swappo-ink/60">{t("body")}</p>
      </div>
    </main>
  );
}
