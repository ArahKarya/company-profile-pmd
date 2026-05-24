import { Plus } from "lucide-react";
import { PageHeader, Breadcrumb } from "@/components/admin/PageHeader";
import { ProductsClient } from "./products-client";
import { listProducts } from "@/server/repositories/product.repo";

export default async function ProductsAdminPage() {
  const products = await listProducts({ activeOnly: false }).catch(() => []);
  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Admin" }, { label: "Produk" }]} />}
        title="Produk"
        subtitle="Kelola katalog produk dan urutan tampilan."
      />
      <ProductsClient initialProducts={products} />
    </>
  );
}
