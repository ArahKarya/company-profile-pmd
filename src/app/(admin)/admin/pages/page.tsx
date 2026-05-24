"use client";

import { useState, useEffect } from "react";
import { FileText, Loader2, Save, ChevronDown, ChevronRight } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface PageSection {
  id?: string;
  key: string;
  titleId: string;
  titleEn: string;
  contentId: string;
  contentEn: string;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  metadata: Record<string, string> | null;
}

interface PageData {
  id: string;
  slug: string;
  sections: PageSection[];
}

const pageConfigs = [
  {
    slug: "home",
    label: "Beranda",
    sections: [
      { key: "hero", label: "Hero Banner" },
      { key: "about-intro", label: "Tentang Singkat" },
      { key: "stats", label: "Statistik" },
      { key: "vision", label: "Visi" },
      { key: "cta", label: "Call to Action" },
    ],
  },
  {
    slug: "about",
    label: "Tentang Kami",
    sections: [
      { key: "hero", label: "Hero Banner" },
      { key: "company", label: "Profil Perusahaan" },
      { key: "vision-mission", label: "Visi & Misi" },
      { key: "values", label: "Nilai Perusahaan" },
      { key: "process", label: "Proses Produksi" },
    ],
  },
  {
    slug: "products",
    label: "Produk",
    sections: [
      { key: "hero", label: "Hero Banner" },
      { key: "intro", label: "Intro Produk" },
    ],
  },
  {
    slug: "career",
    label: "Karir",
    sections: [
      { key: "hero", label: "Hero Banner" },
      { key: "intro", label: "Intro Karir" },
      { key: "benefits", label: "Benefit Karyawan" },
    ],
  },
  {
    slug: "contact",
    label: "Kontak",
    sections: [
      { key: "hero", label: "Hero Banner" },
      { key: "intro", label: "Intro Kontak" },
      { key: "map", label: "Peta / Lokasi" },
    ],
  },
];

export default function PagesAdmin() {
  const [pages, setPages] = useState<Record<string, PageData>>({});
  const [drafts, setDrafts] = useState<Record<string, PageSection[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    const res = await fetch("/api/admin/pages");
    const data = await res.json();
    const pagesMap: Record<string, PageData> = {};
    for (const p of data.data ?? []) {
      pagesMap[p.slug] = p;
    }
    setPages(pagesMap);

    const initialDrafts: Record<string, PageSection[]> = {};
    for (const config of pageConfigs) {
      const existing = pagesMap[config.slug];
      initialDrafts[config.slug] = config.sections.map((sec) => {
        const found = existing?.sections.find((s: PageSection) => s.key === sec.key);
        return found ?? {
          key: sec.key,
          titleId: "",
          titleEn: "",
          contentId: "",
          contentEn: "",
          imageUrl: null,
          sortOrder: 0,
          isActive: true,
          metadata: null,
        };
      });
    }
    setDrafts(initialDrafts);
    setLoading(false);
  }

  function updateSection(slug: string, sectionKey: string, field: string, value: string | boolean | null) {
    setDrafts((prev) => ({
      ...prev,
      [slug]: (prev[slug] ?? []).map((s) =>
        s.key === sectionKey ? { ...s, [field]: value } : s
      ),
    }));
  }

  async function handleSavePage(slug: string) {
    setSaving(slug);
    setMessage("");
    const sections = drafts[slug];
    const res = await fetch("/api/admin/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, sections }),
    });
    if (res.ok) {
      setMessage(`Halaman "${slug}" berhasil disimpan!`);
      const data = await res.json();
      setPages((prev) => ({ ...prev, [slug]: data.data }));
    } else {
      setMessage(`Gagal menyimpan halaman "${slug}".`);
    }
    setSaving(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={24} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Halaman</h1>
      </div>

      {message && (
        <div className={`mb-6 p-3 rounded-lg text-sm ${message.includes("berhasil") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {pageConfigs.map((config) => {
          const isExpanded = expandedPage === config.slug;
          const sections = drafts[config.slug] ?? [];

          return (
            <div key={config.slug} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedPage(isExpanded ? null : config.slug)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-amber-500" />
                  <span className="font-semibold text-gray-900">{config.label}</span>
                  <span className="text-xs text-gray-400">/{config.slug}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{config.sections.length} seksi</span>
                </div>
                {isExpanded ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="border-t border-gray-100 px-6 py-6">
                  <div className="space-y-8">
                    {sections.map((section, idx) => {
                      const sectionConfig = config.sections.find((s) => s.key === section.key);
                      return (
                        <div key={section.key} className="border border-gray-200 rounded-lg p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">{sectionConfig?.label ?? section.key}</h3>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={section.isActive}
                                onChange={(e) => updateSection(config.slug, section.key, "isActive", e.target.checked)}
                                className="w-4 h-4"
                              />
                              <span className="text-xs text-gray-500">Aktif</span>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Judul (ID)</label>
                              <input
                                type="text"
                                value={section.titleId}
                                onChange={(e) => updateSection(config.slug, section.key, "titleId", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Judul (EN)</label>
                              <input
                                type="text"
                                value={section.titleEn}
                                onChange={(e) => updateSection(config.slug, section.key, "titleEn", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-500 mb-1">Konten (ID)</label>
                              <textarea
                                value={section.contentId}
                                onChange={(e) => updateSection(config.slug, section.key, "contentId", e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-500 mb-1">Konten (EN)</label>
                              <textarea
                                value={section.contentEn}
                                onChange={(e) => updateSection(config.slug, section.key, "contentEn", e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <ImageUpload
                                value={section.imageUrl}
                                onChange={(url) => updateSection(config.slug, section.key, "imageUrl", url)}
                                label="Gambar Seksi"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => handleSavePage(config.slug)}
                      disabled={saving === config.slug}
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      {saving === config.slug ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      Simpan {config.label}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
