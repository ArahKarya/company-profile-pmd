import Link from "next/link";
import { Package, Briefcase, Users, Building2, Plus, ExternalLink } from "lucide-react";
import { PageHeader, Breadcrumb } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { Grid } from "@/components/ui/layout/Grid";
import { Button } from "@/components/ui/Button";
import { listProducts } from "@/server/repositories/product.repo";
import { listCareers } from "@/server/repositories/career.repo";
import { listTeamMembers } from "@/server/repositories/team.repo";
import { listClients } from "@/server/repositories/client.repo";

export default async function DashboardPage() {
  const [products, careers, team, clients] = await Promise.all([
    listProducts().catch(() => []),
    listCareers().catch(() => []),
    listTeamMembers().catch(() => []),
    listClients().catch(() => []),
  ]);

  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Admin" }, { label: "Dashboard" }]} />}
        title="Dashboard"
        subtitle="Ringkasan konten website PT Pangan Masa Depan"
        actions={
          <Button asChild variant="outline" trailingIcon={<ExternalLink size={14} />}>
            <Link href="/" target="_blank" rel="noopener">
              Lihat Situs
            </Link>
          </Button>
        }
      />

      <Grid cols={1} smCols={2} lgCols={4} gap={4}>
        <StatCard
          label="Produk"
          value={products.length}
          icon={Package}
          accent="default"
        />
        <StatCard
          label="Lowongan"
          value={careers.length}
          icon={Briefcase}
          accent="success"
        />
        <StatCard label="Tim" value={team.length} icon={Users} accent="warning" />
        <StatCard
          label="Mitra"
          value={clients.length}
          icon={Building2}
          accent="default"
        />
      </Grid>

      <section className="mt-12">
        <h2 className="font-display text-heading-xl text-text-primary mb-4">
          Aksi Cepat
        </h2>
        <Grid cols={1} smCols={2} lgCols={4} gap={4}>
          <Button asChild variant="primary" size="lg" leadingIcon={<Plus size={16} />}>
            <Link href="/admin/products">Tambah Produk</Link>
          </Button>
          <Button asChild variant="primary" size="lg" leadingIcon={<Plus size={16} />}>
            <Link href="/admin/careers">Tambah Lowongan</Link>
          </Button>
          <Button asChild variant="primary" size="lg" leadingIcon={<Plus size={16} />}>
            <Link href="/admin/team">Tambah Anggota Tim</Link>
          </Button>
          <Button asChild variant="primary" size="lg" leadingIcon={<Plus size={16} />}>
            <Link href="/admin/clients">Tambah Mitra</Link>
          </Button>
        </Grid>
      </section>
    </>
  );
}
