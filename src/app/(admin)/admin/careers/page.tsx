"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Briefcase } from "lucide-react";

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

const emptyCareer: Omit<Career, "id"> = {
  titleId: "",
  titleEn: "",
  descId: "",
  descEn: "",
  location: "Indramayu, Jawa Barat",
  type: "Full-time",
  isActive: true,
};

export default function CareersAdmin() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [editing, setEditing] = useState<Partial<Career> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchCareers() {
    const res = await fetch("/api/admin/careers");
    const data = await res.json();
    setCareers(data.data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchCareers(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/careers?id=${editing.id}` : "/api/admin/careers";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null);
    setSaving(false);
    fetchCareers();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus lowongan ini?")) return;
    await fetch(`/api/admin/careers?id=${id}`, { method: "DELETE" });
    fetchCareers();
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-gray-400" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Karir</h1>
        <button onClick={() => setEditing({ ...emptyCareer })} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={16} /> Tambah Lowongan
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing.id ? "Edit" : "Tambah"} Lowongan</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Judul (ID)</label><input type="text" value={editing.titleId ?? ""} onChange={e => setEditing({ ...editing, titleId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Judul (EN)</label><input type="text" value={editing.titleEn ?? ""} onChange={e => setEditing({ ...editing, titleEn: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (ID)</label><textarea value={editing.descId ?? ""} onChange={e => setEditing({ ...editing, descId: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi (EN)</label><textarea value={editing.descEn ?? ""} onChange={e => setEditing({ ...editing, descEn: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label><input type="text" value={editing.location ?? ""} onChange={e => setEditing({ ...editing, location: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label><select value={editing.type ?? "Full-time"} onChange={e => setEditing({ ...editing, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></div>
              <div className="md:col-span-2 flex items-center gap-2"><input type="checkbox" checked={editing.isActive ?? true} onChange={e => setEditing({ ...editing, isActive: e.target.checked })} className="w-4 h-4" /><label className="text-sm font-medium text-gray-700">Aktif</label></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50">{saving && <Loader2 size={16} className="animate-spin" />}Simpan</button>
            </div>
          </div>
        </div>
      )}

      {careers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl"><Briefcase size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">Belum ada lowongan.</p></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Posisi</th><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Lokasi</th><th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th><th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {careers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><p className="font-medium text-gray-900">{c.titleId}</p><p className="text-sm text-gray-500">{c.type}</p></td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.location}</td>
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
