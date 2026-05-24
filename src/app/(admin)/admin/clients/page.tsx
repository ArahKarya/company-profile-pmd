"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Building } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface Client {
  id: string;
  name: string;
  logoUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

const emptyClient: Omit<Client, "id"> = {
  name: "", logoUrl: null, sortOrder: 0, isActive: true,
};

export default function ClientsAdmin() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editing, setEditing] = useState<Partial<Client> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchClients() {
    const res = await fetch("/api/admin/clients");
    const data = await res.json();
    setClients(data.data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchClients(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/clients?id=${editing.id}` : "/api/admin/clients";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null);
    setSaving(false);
    fetchClients();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus klien ini?")) return;
    await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
    fetchClients();
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-gray-400" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Klien</h1>
        <button onClick={() => setEditing({ ...emptyClient })} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"><Plus size={16} /> Tambah Klien</button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing.id ? "Edit" : "Tambah"} Klien</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Klien</label><input type="text" value={editing.name ?? ""} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label><input type="number" value={editing.sortOrder ?? 0} onChange={e => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <ImageUpload
                value={editing.logoUrl ?? null}
                onChange={(url) => setEditing({ ...editing, logoUrl: url })}
                label="Logo Klien"
              />
              <div className="flex items-center gap-2"><input type="checkbox" checked={editing.isActive ?? true} onChange={e => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" /><label className="text-sm font-medium text-gray-700">Aktif</label></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50">{saving && <Loader2 size={16} className="animate-spin" />}Simpan</button>
            </div>
          </div>
        </div>
      )}

      {clients.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl"><Building size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">Belum ada klien.</p></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Klien</th><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th><th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {c.logoUrl ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative shrink-0">
                          <Image src={c.logoUrl} alt={c.name} fill className="object-contain" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0"><Building size={16} className="text-gray-400" /></div>
                      )}
                      <span className="font-medium text-gray-900">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${c.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.isActive ? "Aktif" : "Nonaktif"}</span></td>
                  <td className="px-6 py-4 text-right"><button onClick={() => setEditing(c)} className="text-gray-400 hover:text-amber-500 mr-3"><Pencil size={16} /></button><button onClick={() => handleDelete(c.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
