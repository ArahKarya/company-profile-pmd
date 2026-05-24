"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Label, FieldGroup } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { BilingualField } from "@/components/admin/BilingualField";
import { ImageUpload } from "@/components/admin/ImageUpload";
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

interface ProductFormProps {
  initial?: Product | null;
  onSuccess: () => void;
}

export function ProductForm({ initial, onSuccess }: ProductFormProps) {
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    nameId: initial?.nameId ?? "",
    nameEn: initial?.nameEn ?? "",
    descId: initial?.descId ?? "",
    descEn: initial?.descEn ?? "",
    imageUrl: initial?.imageUrl ?? null,
    category: initial?.category ?? "main",
    features: initial?.features ?? "",
    sortOrder: initial?.sortOrder ?? 0,
    isActive: initial?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const url = initial
          ? `/api/admin/products/${initial.id}`
          : "/api/admin/products";
        const res = await fetch(url, {
          method: initial ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        toast.success(initial ? "Produk diperbarui" : "Produk dibuat");
        onSuccess();
      } catch {
        toast.error("Gagal menyimpan produk");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <BilingualField
        idPrefix="prod-name"
        label="Nama Produk"
        required
        valueId={form.nameId}
        valueEn={form.nameEn}
        onChangeId={(v) => setForm({ ...form, nameId: v })}
        onChangeEn={(v) => setForm({ ...form, nameEn: v })}
      />

      <BilingualField
        idPrefix="prod-desc"
        label="Deskripsi"
        required
        multiline
        rows={4}
        valueId={form.descId}
        valueEn={form.descEn}
        onChangeId={(v) => setForm({ ...form, descId: v })}
        onChangeEn={(v) => setForm({ ...form, descEn: v })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup>
          <Label htmlFor="category" required>
            Kategori
          </Label>
          <Select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="main">Produk Utama</option>
            <option value="circular">Produk Sirkular</option>
          </Select>
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="sortOrder">Urutan Tampilan</Label>
          <Input
            id="sortOrder"
            type="number"
            min={0}
            value={form.sortOrder}
            onChange={(e) =>
              setForm({ ...form, sortOrder: Number(e.target.value) || 0 })
            }
          />
        </FieldGroup>
      </div>

      <FieldGroup>
        <Label htmlFor="features" optional>
          Fitur (pisahkan dengan koma)
        </Label>
        <Input
          id="features"
          value={form.features ?? ""}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
          placeholder="cth: Premium, Vacuum Pack, 5kg"
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Foto Produk</Label>
        <ImageUpload
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="isActive">Status</Label>
        <div className="flex items-center gap-3">
          <Switch
            id="isActive"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          <span className="font-mono text-mono-sm uppercase tracking-wider text-text-secondary">
            {form.isActive ? "Aktif (tampil di publik)" : "Nonaktif (tersembunyi)"}
          </span>
        </div>
      </FieldGroup>

      <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
        <Button type="submit" variant="primary" size="lg" loading={pending}>
          {initial ? "Simpan Perubahan" : "Buat Produk"}
        </Button>
      </div>
    </form>
  );
}
