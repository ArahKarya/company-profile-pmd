import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Breadcrumb } from "@/components/admin/PageHeader";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Grid } from "@/components/ui/layout/Grid";
import { EmptyState } from "@/components/admin/EmptyState";
import { FileText } from "lucide-react";

const PAGE_CONFIGS = [
  { slug: "home", label: "Beranda", description: "Halaman utama dengan hero, stats, dan featured products" },
  { slug: "about", label: "Tentang Kami", description: "Profil perusahaan, visi, misi, tim, dan fasilitas" },
  { slug: "products", label: "Produk", description: "Katalog produk dengan filter dan pencarian" },
  { slug: "career", label: "Karier", description: "Halaman lowongan dan culture perusahaan" },
  { slug: "contact", label: "Kontak", description: "Informasi kontak, lokasi, dan formulir inquiry" },
] as const;

export default function PagesAdminPage() {
  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Admin" }, { label: "Halaman" }]} />}
        title="Halaman Publik"
        subtitle="Konten halaman publik dikelola via Pages → Sections. Konten dinamis (produk, lowongan, tim, mitra) dikelola di menu masing-masing."
      />

      <Grid cols={1} mdCols={2} lgCols={3} gap={4}>
        {PAGE_CONFIGS.map((p) => (
          <Card key={p.slug} variant="bordered" padding="md" className="flex flex-col gap-3">
            <Badge variant="ink" size="sm">/{p.slug === "home" ? "" : p.slug}</Badge>
            <CardTitle>{p.label}</CardTitle>
            <CardDescription>{p.description}</CardDescription>
            <Link
              href={`/${p.slug === "home" ? "" : p.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-wider text-pmd-gold-700 dark:text-pmd-gold-400 hover:underline mt-2"
            >
              Lihat halaman <ArrowRight size={14} />
            </Link>
          </Card>
        ))}
      </Grid>

      <EmptyState
        icon={FileText}
        title="Section editor akan tersedia"
        description="Untuk saat ini, konten dinamis dikelola via menu Produk, Karier, Tim, dan Mitra. Section editor untuk hero & content blocks akan dirilis di fase berikutnya."
        className="mt-12"
      />
    </>
  );
}
