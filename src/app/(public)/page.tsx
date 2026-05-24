import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollIndicator from "@/components/public/ScrollIndicator";
import SectionReveal from "@/components/public/SectionReveal";
import ProductTabs from "@/components/public/ProductTabs";

const stats = [
  { value: "300", unit: "Ton/Hari", label: "Kapasitas Giling" },
  { value: "100+", unit: "", label: "Mitra & Agen" },
  { value: "6", unit: "Tahap", label: "Proses Otomatis" },
  { value: "2021", unit: "", label: "Berdiri Sejak" },
];

const clients = [
  "Mayora",
  "Food Station",
  "Bulog",
  "Pokphand",
  "Pasar Induk Cipinang",
  "RM Taman Selera",
];

export default function HomePage() {
  return (
    <>
      {/* Hero - Full Screen */}
      <section className="relative h-screen flex items-center justify-center bg-pmd-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
            Teknologi Modern untuk Ketahanan Pangan Indonesia
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Pelopor transformasi industri beras melalui inovasi, teknologi, dan
            kolaborasi untuk mewujudkan pertanian yang efisien dan berkelanjutan.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-400">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-pmd-gold hover:bg-pmd-gold-light text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-colors"
            >
              Lihat Produk <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-colors"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
        <ScrollIndicator label="Gulir untuk Jelajahi" />
      </section>

      {/* About Intro - Text Left / Image Right */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-pmd-gold-text text-sm font-semibold uppercase tracking-widest mb-4">
                  Tentang Kami
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-pmd-dark leading-tight">
                  Pangan Berkualitas untuk Masa Depan Indonesia
                </h2>
                <p className="mt-6 text-pmd-gray leading-relaxed">
                  Di PT Pangan Masa Depan, teknologi bukan sekadar alat produksi,
                  melainkan fondasi utama untuk menciptakan efisiensi, konsistensi
                  mutu, dan keberlanjutan. Kami terus berinovasi untuk menghadirkan
                  sistem penggilingan padi yang modern, ramah lingkungan, dan
                  berbasis data.
                </p>
                <p className="mt-4 text-pmd-gray leading-relaxed">
                  Dengan kapasitas giling mencapai <strong>300 ton gabah per hari</strong>,
                  sistem kami didukung oleh lini mesin otomatis mulai dari
                  pre-cleaning, drying, husking, whitening, grading, hingga packaging modern.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-pmd-gold-text hover:text-pmd-green-dark font-medium mt-8 transition-colors group underline decoration-pmd-gold-text/30 hover:decoration-pmd-green-dark/30"
                >
                  Pelajari lebih lanjut
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-pmd-gold/20 to-pmd-green/20 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Fasilitas Pabrik</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-pmd-gold rounded-xl p-6 shadow-lg">
                  <p className="text-3xl font-bold text-white">300</p>
                  <p className="text-white text-sm">Ton/Hari</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-pmd-dark py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-4xl md:text-5xl font-bold text-pmd-gold">
                    {s.value}
                    {s.unit && (
                      <span className="text-lg font-normal text-pmd-gold ml-1">
                        {s.unit}
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-gray-400 text-sm uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Vision - Image Left / Text Right */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-pmd-green/20 to-pmd-gold/10 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Proses Produksi</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-pmd-gold-text text-sm font-semibold uppercase tracking-widest mb-4">
                  Visi Kami
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-pmd-dark leading-tight">
                  Menjadi Pelopor Transformasi Industri Beras
                </h2>
                <p className="mt-6 text-pmd-gray leading-relaxed">
                  Menjadi pelopor transformasi industri beras melalui inovasi,
                  teknologi, dan kolaborasi untuk mewujudkan pertanian yang
                  efisien, berkelanjutan dan menyejahterakan.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Pengolahan modern berstandar tinggi",
                    "Integrasi teknologi dan data",
                    "Ekosistem pertanian kolaboratif",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pmd-gold rounded-full" />
                      <span className="text-pmd-gray">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-pmd-gold-text text-sm font-semibold uppercase tracking-widest mb-4">
                Produk Kami
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-pmd-dark">
                Beras Berkualitas untuk Setiap Kebutuhan
              </h2>
            </div>
            <ProductTabs />
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-pmd-gold-text hover:text-pmd-green-dark font-medium transition-colors group underline decoration-pmd-gold-text/30 hover:decoration-pmd-green-dark/30"
              >
                Lihat semua produk
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <p className="text-center text-sm uppercase tracking-widest text-gray-600 mb-12">
              Dipercaya oleh
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {clients.map((name) => (
                <div
                  key={name}
                  className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center hover:border-pmd-gold hover:shadow-sm transition-all"
                >
                  <span className="text-gray-700 font-semibold text-sm text-center">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-pmd-gray text-sm">
              Dan <strong className="text-pmd-dark">100+ agen</strong> lainnya
              di seluruh Indonesia
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* CTA - Full Width Dark */}
      <section className="relative py-24 bg-pmd-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <SectionReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Bermitra dengan Kami?
            </h2>
            <p className="text-white/80 mb-10 text-lg">
              Hubungi kami untuk informasi kemitraan dan distribusi beras
              berkualitas tinggi.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-pmd-gold hover:bg-pmd-gold-light text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-colors"
            >
              Hubungi Kami <ArrowRight size={18} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
