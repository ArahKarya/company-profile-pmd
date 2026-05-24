"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Users } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  roleId: string;
  roleEn: string;
  photoUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

const emptyMember: Omit<TeamMember, "id"> = {
  name: "", roleId: "", roleEn: "", photoUrl: null, sortOrder: 0, isActive: true,
};

export default function TeamAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function fetchMembers() {
    const res = await fetch("/api/admin/team");
    const data = await res.json();
    setMembers(data.data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchMembers(); }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/team?id=${editing.id}` : "/api/admin/team";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    setEditing(null);
    setSaving(false);
    fetchMembers();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus anggota tim ini?")) return;
    await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
    fetchMembers();
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={24} className="animate-spin text-gray-400" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tim</h1>
        <button onClick={() => setEditing({ ...emptyMember })} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"><Plus size={16} /> Tambah Anggota</button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing.id ? "Edit" : "Tambah"} Anggota Tim</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama</label><input type="text" value={editing.name ?? ""} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Jabatan (ID)</label><input type="text" value={editing.roleId ?? ""} onChange={e => setEditing({ ...editing, roleId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Jabatan (EN)</label><input type="text" value={editing.roleEn ?? ""} onChange={e => setEditing({ ...editing, roleEn: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label><input type="number" value={editing.sortOrder ?? 0} onChange={e => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500" /></div>
              <ImageUpload
                value={editing.photoUrl ?? null}
                onChange={(url) => setEditing({ ...editing, photoUrl: url })}
                label="Foto Anggota"
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

      {members.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl"><Users size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">Belum ada anggota tim.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(m => (
            <div key={m.id} className="bg-white rounded-xl p-6 shadow-sm">
              {m.photoUrl ? (
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 relative">
                  <Image src={m.photoUrl} alt={m.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3"><Users size={28} className="text-amber-600" /></div>
              )}
              <h3 className="font-semibold text-gray-900 text-center">{m.name}</h3>
              <p className="text-sm text-amber-600 text-center">{m.roleId}</p>
              <p className="text-xs text-gray-400 text-center">{m.roleEn}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{m.isActive ? "Aktif" : "Nonaktif"}</span>
              </div>
              <div className="flex justify-center gap-3 mt-4">
                <button onClick={() => setEditing(m)} className="text-gray-400 hover:text-amber-500"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(m.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
