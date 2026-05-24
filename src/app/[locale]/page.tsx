import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main
      id="main"
      className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
    >
      <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 dark:text-pmd-gold-400 mb-6">
        {t("eyebrow")}
      </div>
      <h1 className="font-display text-display-md md:text-display-xl text-text-primary mb-6 max-w-3xl">
        {t("title")}
      </h1>
      <p className="text-body-lg text-text-secondary max-w-xl mb-12">
        {t("subtitle")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/products"
          locale={locale as "id" | "en"}
          className="inline-flex items-center gap-2 h-12 px-6 bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900 font-mono text-mono-sm uppercase tracking-wider rounded-xs hover:-translate-y-0.5 transition-transform shadow-md hover:shadow-lg"
        >
          {t("ctaPrimary")} →
        </Link>
        <Link
          href="/contact"
          locale={locale as "id" | "en"}
          className="inline-flex items-center gap-2 h-12 px-6 bg-transparent border-2 border-ink-900 dark:border-paper-base text-text-primary font-mono text-mono-sm uppercase tracking-wider rounded-xs hover:bg-ink-900 hover:text-paper-base dark:hover:bg-paper-base dark:hover:text-ink-900 transition-colors"
        >
          {t("ctaSecondary")}
        </Link>
      </div>
    </main>
  );
}
