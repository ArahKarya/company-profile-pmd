"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Package } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface Product {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  category: string;
  features: string;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

const emptyProduct: Omit<Product, "id"> = {
  nameId: "", nameEn: "", descId: "", descEn: "",
  category: "main", features: "", imageUrl: null, sortOrder: 0, isActive: true,
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data.data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchProducts(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/products?id=${editing.id}` : "/api/admin/products";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null);
    setSaving(false);
    fetchProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    fetchProducts();
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-gray-400" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
        <button onClick={() => setEditing({ ...emptyProduct })} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing.id ? "Edit Produk" : "Tambah Produk"}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama (ID)</label><input type="text" value={editing.nameId ?? ""} onChange={e => setEditing({ ...editing, nameId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama (EN)</label><input type="text" value={editing.nameEn ?? ""} onChange={e => setEditing({ ...editing, nameEn: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (ID)</label><textarea value={editing.descId ?? ""} onChange={e => setEditing({ ...editing, descId: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (EN)</label><textarea value={editing.descEn ?? ""} onChange={e => setEditing({ ...editing, descEn: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label><select value={editing.category ?? "main"} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"><option value="main">Produk Utama</option><option value="circular">Circular Product</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label><input type="number" value={editing.sortOrder ?? 0} onChange={e => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Fitur (pisahkan dengan koma)</label><input type="text" value={editing.features ?? ""} onChange={e => setEditing({ ...editing, features: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" placeholder="5kg, 10kg, 25kg" /></div>
              <div className="md:col-span-2">
                <ImageUpload
                  value={editing.imageUrl ?? null}
                  onChange={(url) => setEditing({ ...editing, imageUrl: url })}
                  label="Foto Produk"
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-2"><input type="checkbox" checked={editing.isActive ?? true} onChange={e => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" /><label className="text-sm font-medium text-gray-700">Aktif</label></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50">{saving && <Loader2 size={16} className="animate-spin" />}Simpan</button>
            </div>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl"><Package size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">Belum ada produk.</p></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Produk</th><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Kategori</th><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th><th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                          <Image src={p.imageUrl} alt={p.nameId} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><Package size={16} className="text-gray-400" /></div>
                      )}
                      <div><p className="font-medium text-gray-900">{p.nameId}</p><p className="text-sm text-gray-500">{p.nameEn}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${p.category === "main" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{p.category === "main" ? "Utama" : "Circular"}</span></td>
                  <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{p.isActive ? "Aktif" : "Nonaktif"}</span></td>
                  <td className="px-6 py-4 text-right"><button onClick={() => setEditing(p)} className="text-gray-400 hover:text-amber-500 mr-3"><Pencil size={16} /></button><button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
