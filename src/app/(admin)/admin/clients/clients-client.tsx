"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Drawer } from "@/components/ui/Drawer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Label, FieldGroup } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/components/ui/Toast";

interface Client {
  id: string;
  name: string;
  logoUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface ClientsClientProps {
  initialClients: Client[];
}

const empty = {
  name: "",
  logoUrl: null as string | null,
  sortOrder: 0,
  isActive: true,
};

export function ClientsClient({ initialClients }: ClientsClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState<Client | null>(null);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState(empty);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setDrawerOpen(true);
  };

  const openEdit = (c: Client) => {
    setEditing(c);
    setForm({
      name: c.name,
      logoUrl: c.logoUrl,
      sortOrder: c.sortOrder,
      isActive: c.isActive,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const url = editing ? `/api/admin/clients/${editing.id}` : "/api/admin/clients";
        const res = await fetch(url, {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        toast.success(editing ? "Mitra diperbarui" : "Mitra ditambah");
        setDrawerOpen(false);
        router.refresh();
      } catch {
        toast.error("Gagal menyimpan");
      }
    });
  };

  const handleDelete = () => {
    if (!deleting) return;
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/clients/${deleting.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast.success("Mitra dihapus");
        setDeleting(null);
        router.refresh();
      } catch {
        toast.error("Gagal menghapus");
      }
    });
  };

  const columns: DataTableColumn<Client>[] = [
    {
      key: "logo",
      header: "Logo",
      cell: (c) => (
        <div className="w-16 h-10 bg-surface-sunken border border-surface-border flex items-center justify-center">
          {c.logoUrl ? (
            <Image src={c.logoUrl} alt={c.name} width={56} height={32} className="max-h-8 w-auto object-contain" />
          ) : (
            <span className="font-mono text-mono-xs text-text-muted">—</span>
          )}
        </div>
      ),
    },
    {
      key: "name",
      header: "Nama",
      sortable: true,
      sortFn: (a, b) => a.name.localeCompare(b.name),
      cell: (c) => <span className="font-display text-heading-sm">{c.name}</span>,
    },
    {
      key: "sortOrder",
      header: "Urutan",
      sortable: true,
      sortFn: (a, b) => a.sortOrder - b.sortOrder,
      align: "right",
      cell: (c) => <span className="font-mono text-mono-sm">{c.sortOrder}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (c) => (
        <Badge variant={c.isActive ? "success" : "steel"} size="sm">
          {c.isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button variant="primary" size="md" leadingIcon={<Plus size={16} strokeWidth={2} />} onClick={openCreate}>
          Tambah Mitra
        </Button>
      </div>

      <DataTable
        data={initialClients}
        columns={columns}
        rowKey={(c) => c.id}
        searchable={(c) => c.name}
        emptyState="Belum ada mitra."
        rowActions={(c) => (
          <>
            <IconButton aria-label="Ubah" variant="ghost" size="sm" onClick={() => openEdit(c)}>
              <Pencil size={14} strokeWidth={1.75} />
            </IconButton>
            <IconButton aria-label="Hapus" variant="ghost" size="sm" onClick={() => setDeleting(c)}>
              <Trash2 size={14} strokeWidth={1.75} className="text-danger" />
            </IconButton>
          </>
        )}
      />

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editing ? "Ubah Mitra" : "Mitra Baru"} size="md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <Label htmlFor="c-name" required>Nama Mitra</Label>
            <Input id="c-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </FieldGroup>
          <FieldGroup>
            <Label>Logo</Label>
            <ImageUpload value={form.logoUrl} onChange={(url) => setForm({ ...form, logoUrl: url })} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="c-sort">Urutan Tampilan</Label>
            <Input id="c-sort" type="number" min={0} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="c-active">Status</Label>
            <div className="flex items-center gap-3">
              <Switch id="c-active" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <span className="font-mono text-mono-sm uppercase text-text-secondary">
                {form.isActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </FieldGroup>
          <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
            <Button type="submit" variant="primary" size="lg" loading={pending}>
              {editing ? "Simpan Perubahan" : "Tambah Mitra"}
            </Button>
          </div>
        </form>
      </Drawer>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Hapus mitra "${deleting?.name ?? ""}"?`}
        confirmLabel="Hapus"
        loading={pending}
      />
    </>
  );
}
