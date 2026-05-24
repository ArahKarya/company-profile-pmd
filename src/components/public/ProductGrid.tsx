"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Tag } from "@/components/ui/Tag";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Grid } from "@/components/ui/layout/Grid";
import type { Locale } from "@/i18n/routing";

interface ProductGridItem {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  imageUrl: string | null;
  category: string;
  features: string | null;
}

interface ProductGridProps {
  products: ProductGridItem[];
  locale: Locale;
}

type Filter = "all" | "main" | "circular";

export function ProductGrid({ products, locale }: ProductGridProps) {
  const t = useTranslations("Products");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (query) {
        const name = (locale === "id" ? p.nameId : p.nameEn).toLowerCase();
        if (!name.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [products, filter, query, locale]);

  return (
    <div>
      <div className="sticky top-16 z-30 bg-surface-page/95 backdrop-blur border-b border-surface-border py-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-wrap gap-2 flex-1">
            <Tag interactive active={filter === "all"} onClick={() => setFilter("all")}>
              {t("filterAll")}
            </Tag>
            <Tag interactive active={filter === "main"} onClick={() => setFilter("main")}>
              {t("filterMain")}
            </Tag>
            <Tag
              interactive
              active={filter === "circular"}
              onClick={() => setFilter("circular")}
            >
              {t("filterCircular")}
            </Tag>
          </div>
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leadingIcon={<Search size={16} strokeWidth={1.75} />}
            className="md:max-w-xs"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-muted font-mono text-mono-md uppercase tracking-wider">
          {t("emptyState")}
        </div>
      ) : (
        <Grid cols={1} mdCols={2} lgCols={3} gap={6}>
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              name={locale === "id" ? p.nameId : p.nameEn}
              description={locale === "id" ? p.descId : p.descEn}
              imageUrl={p.imageUrl}
              category={p.category as "main" | "circular"}
              features={p.features ? p.features.split(",").map((s) => s.trim()) : undefined}
            />
          ))}
        </Grid>
      )}
    </div>
  );
}
