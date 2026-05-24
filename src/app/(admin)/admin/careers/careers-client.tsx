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
import { Label, FieldGroup } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { BilingualField } from "@/components/admin/BilingualField";
import { useToast } from "@/components/ui/Toast";

interface Career {
  id: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  location: string;
  type: string;
  isActive: boolean;
}

interface CareersClientProps {
  initialCareers: Career[];
}

export function CareersClient({ initialCareers }: CareersClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Career | null>(null);
  const [deleting, setDeleting] = useState<Career | null>(null);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<Omit<Career, "id">>({
    titleId: "",
    titleEn: "",
    descId: "",
    descEn: "",
    location: "Indramayu",
    type: "Full-time",
    isActive: true,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      titleId: "",
      titleEn: "",
      descId: "",
      descEn: "",
      location: "Indramayu",
      type: "Full-time",
      isActive: true,
    });
    setDrawerOpen(true);
  };

  const openEdit = (c: Career) => {
    setEditing(c);
    setForm({
      titleId: c.titleId,
      titleEn: c.titleEn,
      descId: c.descId,
      descEn: c.descEn,
      location: c.location,
      type: c.type,
      isActive: c.isActive,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const url = editing ? `/api/admin/careers/${editing.id}` : "/api/admin/careers";
        const res = await fetch(url, {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        toast.success(editing ? "Lowongan diperbarui" : "Lowongan dibuat");
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
        const res = await fetch(`/api/admin/careers/${deleting.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast.success("Lowongan dihapus");
        setDeleting(null);
        router.refresh();
      } catch {
        toast.error("Gagal menghapus");
      }
    });
  };

  const columns: DataTableColumn<Career>[] = [
    {
      key: "title",
      header: "Posisi",
      sortable: true,
      sortFn: (a, b) => a.titleId.localeCompare(b.titleId),
      cell: (c) => (
        <div>
          <div className="font-display text-heading-sm">{c.titleId}</div>
          <div className="font-mono text-mono-xs text-text-muted">{c.titleEn}</div>
        </div>
      ),
    },
    { key: "location", header: "Lokasi", cell: (c) => c.location, sortable: true, sortFn: (a, b) => a.location.localeCompare(b.location) },
    { key: "type", header: "Tipe", cell: (c) => c.type },
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
          Tambah Lowongan
        </Button>
      </div>

      <DataTable
        data={initialCareers}
        columns={columns}
        rowKey={(c) => c.id}
        searchable={(c) => `${c.titleId} ${c.titleEn} ${c.location}`}
        searchPlaceholder="Cari lowongan..."
        emptyState="Belum ada lowongan."
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

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? "Ubah Lowongan" : "Lowongan Baru"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <BilingualField
            idPrefix="career-title"
            label="Judul Posisi"
            required
            valueId={form.titleId}
            valueEn={form.titleEn}
            onChangeId={(v) => setForm({ ...form, titleId: v })}
            onChangeEn={(v) => setForm({ ...form, titleEn: v })}
          />
          <BilingualField
            idPrefix="career-desc"
            label="Deskripsi"
            required
            multiline
            rows={5}
            valueId={form.descId}
            valueEn={form.descEn}
            onChangeId={(v) => setForm({ ...form, descId: v })}
            onChangeEn={(v) => setForm({ ...form, descEn: v })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup>
              <Label htmlFor="loc" required>Lokasi</Label>
              <Input id="loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="type" required>Tipe</Label>
              <Input id="type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Full-time / Kontrak / Magang" required />
            </FieldGroup>
          </div>
          <FieldGroup>
            <Label htmlFor="career-active">Status</Label>
            <div className="flex items-center gap-3">
              <Switch id="career-active" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <span className="font-mono text-mono-sm uppercase text-text-secondary">
                {form.isActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </FieldGroup>
          <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
            <Button type="submit" variant="primary" size="lg" loading={pending}>
              {editing ? "Simpan Perubahan" : "Buat Lowongan"}
            </Button>
          </div>
        </form>
      </Drawer>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Hapus lowongan "${deleting?.titleId ?? ""}"?`}
        confirmLabel="Hapus"
        loading={pending}
      />
    </>
  );
}
