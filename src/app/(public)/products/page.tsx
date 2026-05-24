import { Package, Recycle, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/public/SectionReveal";

const mainProducts = [
  {
    name: "Wa Lemu",
    desc: "Long Grain Pilihan Keluarga Indonesia. Beras berkualitas medium dengan harga terjangkau untuk kebutuhan sehari-hari.",
    quality: "Medium Quality",
    sizes: "5kg, 10kg, 25kg, 50kg",
    usage: "Rumah tangga, kuliner & grosir",
    gradient: "from-green-600 to-green-800",
  },
  {
    name: "Nick Well",
    desc: "Beras Medium tanpa pengawet, pewarna, dan pengharum. Pilihan tepat untuk yang mengutamakan kealamian.",
    quality: "Medium Quality",
    sizes: "10kg, 25kg, 50kg",
    usage: "Rumah tangga, kuliner premium & grosir",
    gradient: "from-amber-600 to-amber-800",
  },
  {
    name: "Cruise",
    desc: "Elegan, murni, dan selektif. Beras premium pilihan untuk standar tertinggi.",
    quality: "Premium - Super Premium",
    sizes: "10kg, 25kg",
    usage: "Hotel, restoran & pasar premium",
    gradient: "from-blue-700 to-blue-900",
  },
];

const circularProducts = [
  {
    name: "Menir",
    desc: "Butiran beras patah yang masih memiliki kandungan gizi mirip beras utuh. Ukurannya kurang dari 2/10 bagian beras utuh.",
  },
  {
    name: "Sekam Padi Pellet",
    desc: "Sumber energi terbarukan dari limbah pertanian yang mengurangi ketergantungan bahan bakar fosil.",
  },
  {
    name: "Bekatul",
    desc: "Lapisan luar beras yang kaya nutrisi — serat, vitamin B kompleks, mineral, dan antioksidan.",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-pmd-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-pmd-gold text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in-up">
            Produk
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl animate-fade-in-up animate-delay-100">
            Beras Berkualitas untuk Setiap Kebutuhan
          </h1>
          <p className="mt-6 text-white/90 text-lg max-w-xl animate-fade-in-up animate-delay-200">
            Diproses dengan teknologi penggilingan modern berstandar tinggi
            melalui sistem otomasi presisi dan pengawasan mutu digital.
          </p>
        </div>
      </section>

      {/* Main Products - Alternating Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          {mainProducts.map((p, i) => (
            <SectionReveal key={p.name}>
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="text-center text-white">
                    <Package size={64} className="mx-auto mb-4 opacity-40" />
                    <p className="text-3xl font-bold">{p.name}</p>
                    <p className="text-white/90 text-sm mt-2">{p.quality}</p>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <span className="inline-block bg-pmd-dark text-pmd-gold text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    {p.quality}
                  </span>
                  <h2 className="text-3xl font-bold text-pmd-dark mb-4">
                    {p.name}
                  </h2>
                  <p className="text-pmd-gray leading-relaxed mb-8">
                    {p.desc}
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex gap-4">
                      <span className="text-sm font-medium text-gray-600 w-24">Tersedia</span>
                      <span className="text-sm text-pmd-dark">{p.sizes}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-sm font-medium text-gray-600 w-24">Cocok untuk</span>
                      <span className="text-sm text-pmd-dark">{p.usage}</span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-pmd-gold-text hover:text-pmd-green-dark font-medium transition-colors group underline decoration-pmd-gold-text/30 hover:decoration-pmd-green-dark/30"
                  >
                    Hubungi untuk pemesanan
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Circular Products */}
      <section className="py-24 bg-pmd-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-16">
              <p className="text-pmd-gold text-sm font-semibold uppercase tracking-widest mb-4">
                Circular Products
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Komitmen terhadap Keberlanjutan
              </h2>
              <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                Mengolah seluruh hasil samping produksi menjadi produk bernilai
                untuk zero waste production.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {circularProducts.map((p) => (
                <div
                  key={p.name}
                  className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10 hover:border-pmd-gold/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-pmd-green rounded-xl flex items-center justify-center mb-6">
                    <Recycle size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
