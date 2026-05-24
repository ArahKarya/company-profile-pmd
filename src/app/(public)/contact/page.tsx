import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import SectionReveal from "@/components/public/SectionReveal";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-pmd-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-pmd-gold text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in-up">
            Kontak
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl animate-fade-in-up animate-delay-100">
            Hubungi Kami
          </h1>
          <p className="mt-6 text-white/90 text-lg max-w-xl animate-fade-in-up animate-delay-200">
            Informasi kemitraan dan kerjasama silakan menghubungi kontak berikut.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Cards */}
              <div className="space-y-6">
                <a
                  href="tel:+6281138800034"
                  className="flex items-start gap-5 bg-gray-50 rounded-xl p-6 hover:bg-pmd-gold/5 transition-colors group"
                >
                  <div className="w-14 h-14 bg-pmd-gold/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-pmd-gold/20 transition-colors">
                    <Phone size={24} className="text-pmd-gold-text" />
                  </div>
                  <div>
                    <h3 className="font-bold text-pmd-dark mb-1">Telepon</h3>
                    <p className="text-pmd-gray">+62 811-3880-0034</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/6281138800034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 bg-gray-50 rounded-xl p-6 hover:bg-green-50 transition-colors group"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                    <MessageCircle size={24} className="text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-pmd-dark mb-1">WhatsApp</h3>
                    <p className="text-pmd-gray">+62 811-3880-0034</p>
                    <p className="text-xs text-green-700 mt-1">Klik untuk chat langsung</p>
                  </div>
                </a>

                <a
                  href="mailto:info@panganmasadepan.com"
                  className="flex items-start gap-5 bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                    <Mail size={24} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-pmd-dark mb-1">Email</h3>
                    <p className="text-pmd-gray">info@panganmasadepan.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-5 bg-gray-50 rounded-xl p-6">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-pmd-dark mb-1">Head Office</h3>
                    <p className="text-pmd-gray text-sm leading-relaxed">
                      Jalan Rancahan, Blok Sukamelang Desa No.RT. 08/04,
                      Karangmulya, Kec. Kandanghaur, Kabupaten Indramayu,
                      Jawa Barat 45254
                    </p>
                  </div>
                </div>
              </div>

              {/* Map + CTA */}
              <div className="space-y-8">
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin size={48} className="mx-auto mb-3" />
                    <p className="font-medium">Google Maps</p>
                    <p className="text-sm">Indramayu, Jawa Barat</p>
                  </div>
                </div>

                <div className="bg-pmd-dark rounded-2xl p-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Datang Langsung
                  </h3>
                  <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
                    Kami terbuka untuk kunjungan dan diskusi kemitraan secara
                    langsung di fasilitas kami.
                  </p>
                  <a
                    href="https://wa.me/6281138800034?text=Halo%20PMD%2C%20saya%20ingin%20bertanya%20tentang%20kemitraan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pmd-gold hover:bg-pmd-gold-light text-white px-8 py-3.5 rounded-lg font-medium transition-colors group"
                  >
                    <MessageCircle size={18} />
                    Chat via WhatsApp
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
