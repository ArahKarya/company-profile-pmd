"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Eye, Lock } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Settings {
  companyName: string;
  taglineId: string;
  taglineEn: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
}

const fields: { key: keyof Settings; label: string; type?: string }[] = [
  { key: "companyName", label: "Nama Perusahaan" },
  { key: "taglineId", label: "Tagline (ID)" },
  { key: "taglineEn", label: "Tagline (EN)" },
  { key: "phone", label: "Telepon" },
  { key: "email", label: "Email", type: "email" },
  { key: "whatsapp", label: "WhatsApp (tanpa +)" },
  { key: "address", label: "Alamat" },
  { key: "primaryColor", label: "Warna Primer", type: "color" },
  { key: "secondaryColor", label: "Warna Sekunder", type: "color" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.data));
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setMessage(res.ok ? "Berhasil disimpan!" : "Gagal menyimpan.");
    setSaving(false);
  }

  async function handleChangePassword() {
    setPasswordMessage("");
    if (!newPassword || !currentPassword) {
      setPasswordMessage("Semua field harus diisi.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage("Password baru minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Konfirmasi password tidak cocok.");
      return;
    }
    setChangingPassword(true);
    const res = await fetch("/api/admin/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (res.ok) {
      setPasswordMessage("Password berhasil diubah!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      const data = await res.json();
      setPasswordMessage(data.error || "Gagal mengubah password.");
    }
    setChangingPassword(false);
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <div className="flex gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} /> Lihat Website
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Simpan
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-3 rounded-lg text-sm ${message.includes("Berhasil") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        {/* Logo Upload */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Logo Perusahaan</h2>
          <div className="max-w-sm">
            <ImageUpload
              value={settings.logoUrl || null}
              onChange={(url) => setSettings({ ...settings, logoUrl: url ?? "" })}
              label="Logo"
            />
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Umum</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                {f.key === "address" ? (
                  <textarea
                    value={settings[f.key]}
                    onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      type={f.type ?? "text"}
                      value={settings[f.key]}
                      onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                    {f.type === "color" && (
                      <div className="w-10 h-10 rounded-lg border border-gray-300 shrink-0" style={{ backgroundColor: settings[f.key] }} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Lock size={18} /> Ubah Password</h2>
          {passwordMessage && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${passwordMessage.includes("berhasil") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {passwordMessage}
            </div>
          )}
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
          </div>
          <button
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="mt-4 flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {changingPassword && <Loader2 size={16} className="animate-spin" />}
            Ubah Password
          </button>
        </div>
      </div>
    </div>
  );
}
