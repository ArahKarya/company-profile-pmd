"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { Drawer } from "@/components/ui/Drawer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Label, FieldGroup } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useToast } from "@/components/ui/Toast";

interface Member {
  id: string;
  name: string;
  roleId: string;
  roleEn: string;
  photoUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface TeamClientProps {
  initialMembers: Member[];
}

const empty = {
  name: "",
  roleId: "",
  roleEn: "",
  photoUrl: null as string | null,
  sortOrder: 0,
  isActive: true,
};

export function TeamClient({ initialMembers }: TeamClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [deleting, setDeleting] = useState<Member | null>(null);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState(empty);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setDrawerOpen(true);
  };

  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({
      name: m.name,
      roleId: m.roleId,
      roleEn: m.roleEn,
      photoUrl: m.photoUrl,
      sortOrder: m.sortOrder,
      isActive: m.isActive,
    });
    setDrawerOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const url = editing ? `/api/admin/team/${editing.id}` : "/api/admin/team";
        const res = await fetch(url, {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        toast.success(editing ? "Anggota diperbarui" : "Anggota ditambah");
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
        const res = await fetch(`/api/admin/team/${deleting.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast.success("Anggota dihapus");
        setDeleting(null);
        router.refresh();
      } catch {
        toast.error("Gagal menghapus");
      }
    });
  };

  const columns: DataTableColumn<Member>[] = [
    {
      key: "name",
      header: "Nama",
      sortable: true,
      sortFn: (a, b) => a.name.localeCompare(b.name),
      cell: (m) => (
        <div className="flex items-center gap-3">
          <Avatar src={m.photoUrl} alt={m.name} size="md" />
          <div>
            <div className="font-display text-heading-sm">{m.name}</div>
            <div className="font-mono text-mono-xs text-text-muted">{m.roleId}</div>
          </div>
        </div>
      ),
    },
    {
      key: "sortOrder",
      header: "Urutan",
      sortable: true,
      sortFn: (a, b) => a.sortOrder - b.sortOrder,
      align: "right",
      cell: (m) => <span className="font-mono text-mono-sm">{m.sortOrder}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (m) => (
        <Badge variant={m.isActive ? "success" : "steel"} size="sm">
          {m.isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button variant="primary" size="md" leadingIcon={<Plus size={16} strokeWidth={2} />} onClick={openCreate}>
          Tambah Anggota
        </Button>
      </div>

      <DataTable
        data={initialMembers}
        columns={columns}
        rowKey={(m) => m.id}
        searchable={(m) => `${m.name} ${m.roleId} ${m.roleEn}`}
        emptyState="Belum ada anggota tim."
        rowActions={(m) => (
          <>
            <IconButton aria-label="Ubah" variant="ghost" size="sm" onClick={() => openEdit(m)}>
              <Pencil size={14} strokeWidth={1.75} />
            </IconButton>
            <IconButton aria-label="Hapus" variant="ghost" size="sm" onClick={() => setDeleting(m)}>
              <Trash2 size={14} strokeWidth={1.75} className="text-danger" />
            </IconButton>
          </>
        )}
      />

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editing ? "Ubah Anggota Tim" : "Anggota Baru"} size="lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <Label htmlFor="m-name" required>Nama Lengkap</Label>
            <Input id="m-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </FieldGroup>
          <BilingualField
            idPrefix="m-role"
            label="Jabatan"
            required
            valueId={form.roleId}
            valueEn={form.roleEn}
            onChangeId={(v) => setForm({ ...form, roleId: v })}
            onChangeEn={(v) => setForm({ ...form, roleEn: v })}
          />
          <FieldGroup>
            <Label>Foto</Label>
            <ImageUpload value={form.photoUrl} onChange={(url) => setForm({ ...form, photoUrl: url })} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="m-sort">Urutan Tampilan</Label>
            <Input id="m-sort" type="number" min={0} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="m-active">Status</Label>
            <div className="flex items-center gap-3">
              <Switch id="m-active" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <span className="font-mono text-mono-sm uppercase text-text-secondary">
                {form.isActive ? "Aktif" : "Nonaktif"}
              </span>
            </div>
          </FieldGroup>
          <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
            <Button type="submit" variant="primary" size="lg" loading={pending}>
              {editing ? "Simpan Perubahan" : "Tambah Anggota"}
            </Button>
          </div>
        </form>
      </Drawer>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Hapus anggota "${deleting?.name ?? ""}"?`}
        confirmLabel="Hapus"
        loading={pending}
      />
    </>
  );
}
