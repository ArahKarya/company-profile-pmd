"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Drawer } from "@/components/ui/Drawer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ProductForm } from "./product-form";
import { useToast } from "@/components/ui/Toast";

interface Product {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  imageUrl: string | null;
  category: string;
  features: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface ProductsClientProps {
  initialProducts: Product[];
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [pending, startTransition] = useTransition();

  const openCreate = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setDrawerOpen(true);
  };

  const handleDelete = () => {
    if (!deleting) return;
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/products/${deleting.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error();
        toast.success("Produk dihapus");
        setDeleting(null);
        router.refresh();
      } catch {
        toast.error("Gagal menghapus produk");
      }
    });
  };

  const columns: DataTableColumn<Product>[] = [
    {
      key: "name",
      header: "Nama",
      sortable: true,
      sortFn: (a, b) => a.nameId.localeCompare(b.nameId),
      cell: (p) => (
        <div>
          <div className="font-display text-heading-sm text-text-primary">
            {p.nameId}
          </div>
          <div className="font-mono text-mono-xs text-text-muted mt-0.5">{p.nameEn}</div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Kategori",
      sortable: true,
      sortFn: (a, b) => a.category.localeCompare(b.category),
      cell: (p) => (
        <Badge variant={p.category === "main" ? "gold" : "success"} size="sm">
          {p.category === "main" ? "Utama" : "Sirkular"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (p) => (
        <Badge variant={p.isActive ? "success" : "steel"} size="sm">
          {p.isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
    },
    {
      key: "sortOrder",
      header: "Urutan",
      sortable: true,
      sortFn: (a, b) => a.sortOrder - b.sortOrder,
      align: "right",
      cell: (p) => <span className="font-mono text-mono-sm">{p.sortOrder}</span>,
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          variant="primary"
          size="md"
          leadingIcon={<Plus size={16} strokeWidth={2} />}
          onClick={openCreate}
        >
          Tambah Produk
        </Button>
      </div>

      <DataTable
        data={initialProducts}
        columns={columns}
        rowKey={(p) => p.id}
        searchable={(p) => `${p.nameId} ${p.nameEn} ${p.category}`}
        searchPlaceholder="Cari produk..."
        emptyState="Belum ada produk. Klik 'Tambah Produk' untuk memulai."
        rowActions={(p) => (
          <>
            <IconButton aria-label="Ubah" variant="ghost" size="sm" onClick={() => openEdit(p)}>
              <Pencil size={14} strokeWidth={1.75} />
            </IconButton>
            <IconButton
              aria-label="Hapus"
              variant="ghost"
              size="sm"
              onClick={() => setDeleting(p)}
            >
              <Trash2 size={14} strokeWidth={1.75} className="text-danger" />
            </IconButton>
          </>
        )}
      />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Ubah Produk" : "Tambah Produk Baru"}
        description={
          editing ? "Perbarui detail produk" : "Lengkapi data produk untuk ditampilkan di katalog"
        }
        size="lg"
      >
        <ProductForm
          initial={editing}
          onSuccess={() => {
            setDrawerOpen(false);
            router.refresh();
          }}
        />
      </Drawer>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Hapus produk "${deleting?.nameId ?? ""}"?`}
        confirmLabel="Hapus"
        loading={pending}
      />
    </>
  );
}
