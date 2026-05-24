import { Eye, Target, Users } from "lucide-react";
import SectionReveal from "@/components/public/SectionReveal";

const values = [
  { letter: "T", name: "Tanggung Jawab", desc: "Menjunjung tinggi integritas dan tanggung jawab dalam setiap proses." },
  { letter: "E", name: "Efisiensi", desc: "Berkomitmen menciptakan sistem kerja yang hemat energi, waktu, dan biaya." },
  { letter: "R", name: "Realibilitas", desc: "Menjadi terpercaya dengan menjaga konsistensi mutu dan pelayanan terbaik." },
  { letter: "D", name: "Dedikasi", desc: "Bekerja dengan sepenuh hati untuk memberikan hasil terbaik." },
  { letter: "E", name: "Ekselensi", desc: "Terus mendorong perbaikan berkelanjutan dan inovasi." },
  { letter: "P", name: "Profesionalisme", desc: "Mengutamakan etika kerja, kompetensi, dan tanggung jawab." },
  { letter: "A", name: "Adaptif", desc: "Cepat beradaptasi terhadap perubahan teknologi dan kebutuhan pelanggan." },
  { letter: "N", name: "Nasionalisme", desc: "Bangga berkontribusi dalam memperkuat ketahanan pangan nasional." },
];

const missions = [
  "Meningkatkan nilai hasil panen melalui pengolahan modern yang efisien dan berstandar tinggi.",
  "Mengintegrasikan teknologi dan data dalam setiap lini bisnis, dari pasca panen hingga distribusi.",
  "Membangun ekosistem pertanian kolaboratif yang menghubungkan petani, mitra, dan pelanggan.",
  "Menciptakan budaya kerja inovatif dan adaptif untuk dampak nyata bagi ketahanan pangan nasional.",
  "Menjadi benchmark industri beras Indonesia dalam efisiensi, keberlanjutan, dan tanggung jawab sosial.",
];

const processes = [
  { step: 1, name: "Pre-cleaning", desc: "Pembersihan gabah dari kotoran dan benda asing." },
  { step: 2, name: "Drying", desc: "Pengeringan gabah hingga kadar air optimal." },
  { step: 3, name: "Husking", desc: "Pengupasan kulit gabah menjadi beras pecah kulit." },
  { step: 4, name: "Whitening", desc: "Penyosohan beras untuk menghasilkan beras putih." },
  { step: 5, name: "Grading", desc: "Pemilahan dan klasifikasi mutu beras." },
  { step: 6, name: "Packing", desc: "Pengemasan beras sesuai standar kualitas." },
];

const team = [
  { name: "Yenny Cyndiani", role: "Komisaris" },
  { name: "Arif Wahyu", role: "Komisaris" },
  { name: "Bambang Supeno", role: "Direktur Utama" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-pmd-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-pmd-gold text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in-up">
            Tentang Kami
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl animate-fade-in-up animate-delay-100">
            PT Pangan Masa Depan
          </h1>
          <p className="mt-6 text-white/90 text-lg max-w-xl animate-fade-in-up animate-delay-200">
            Perusahaan penggilingan beras modern yang menggabungkan teknologi
            pangan, digitalisasi industri, dan prinsip keberlanjutan.
          </p>
        </div>
      </section>

      {/* Visi Misi - Alternating */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Visi */}
              <div className="bg-gray-50 rounded-2xl p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pmd-gold rounded-xl flex items-center justify-center">
                    <Eye size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-pmd-dark">Visi</h2>
                </div>
                <p className="text-pmd-gray leading-relaxed text-lg">
                  Menjadi <strong className="text-pmd-dark">pelopor transformasi industri beras</strong>{" "}
                  melalui inovasi, teknologi, dan kolaborasi untuk mewujudkan
                  pertanian yang efisien, berkelanjutan dan menyejahterakan.
                </p>
              </div>

              {/* Misi */}
              <div className="bg-gray-50 rounded-2xl p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pmd-green rounded-xl flex items-center justify-center">
                    <Target size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-pmd-dark">Misi</h2>
                </div>
                <div className="space-y-4">
                  {missions.map((m, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="w-7 h-7 bg-pmd-green text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-pmd-gray text-sm leading-relaxed">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Values TERDEPAN */}
      <section className="py-24 bg-pmd-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-pmd-gold text-sm font-semibold uppercase tracking-widest mb-4">
                Nilai Perusahaan
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                TERDEPAN
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                Mencerminkan semangat kami untuk selalu menjadi yang terdepan
                dalam kualitas, inovasi, dan kontribusi bagi pangan Indonesia.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-pmd-gold/50 transition-colors"
                >
                  <span className="inline-flex w-10 h-10 bg-pmd-gold text-white rounded-lg items-center justify-center font-bold text-lg mb-4">
                    {v.letter}
                  </span>
                  <h3 className="font-semibold text-white mb-2">{v.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Proses Produksi */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-pmd-gold-text text-sm font-semibold uppercase tracking-widest mb-4">
                  Teknologi
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-pmd-dark leading-tight">
                  Proses Mesin Modern Bekerja
                </h2>
                <p className="mt-6 text-pmd-gray leading-relaxed">
                  Setiap tahap dikontrol melalui sistem sensorisasi dan kalibrasi
                  digital untuk memastikan hasil optimal dan mutu beras yang
                  konsisten di setiap batch produksi.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {processes.map((p) => (
                  <div
                    key={p.step}
                    className="bg-gray-50 rounded-xl p-5 hover:bg-pmd-gold/5 transition-colors"
                  >
                    <span className="inline-flex w-8 h-8 bg-pmd-gold text-white rounded-full items-center justify-center text-sm font-bold mb-3">
                      {p.step}
                    </span>
                    <h3 className="font-semibold text-pmd-dark text-sm">{p.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Tim */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-pmd-gold-text text-sm font-semibold uppercase tracking-widest mb-4">
                Struktur Organisasi
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-pmd-dark">
                Tim Kami
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {team.map((t) => (
                <div key={t.name} className="text-center">
                  <div className="w-28 h-28 bg-pmd-dark rounded-full mx-auto mb-5 flex items-center justify-center">
                    <Users size={36} className="text-pmd-gold" />
                  </div>
                  <h3 className="font-bold text-pmd-dark">{t.name}</h3>
                  <p className="text-sm text-pmd-gold-text mt-1">{t.role}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
