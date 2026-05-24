import { Briefcase, MapPin, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import SectionReveal from "@/components/public/SectionReveal";

export default async function CareerPage() {
  let careers: { id: string; titleId: string; descId: string; location: string; type: string; createdAt: Date }[] = [];
  try {
    careers = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not ready
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-pmd-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-pmd-gold text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-in-up">
            Karir
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl animate-fade-in-up animate-delay-100">
            Bergabung dengan Tim Kami
          </h1>
          <p className="mt-6 text-white/90 text-lg max-w-xl animate-fade-in-up animate-delay-200">
            Jadilah bagian dari transformasi industri pangan Indonesia bersama
            PT Pangan Masa Depan.
          </p>
        </div>
      </section>

      {/* Careers List */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionReveal>
            {careers.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase size={36} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-pmd-dark">
                  Belum Ada Lowongan Terbuka
                </h2>
                <p className="text-pmd-gray mt-3 max-w-md mx-auto">
                  Saat ini belum ada posisi yang tersedia. Silakan cek kembali
                  secara berkala atau hubungi kami untuk informasi lebih lanjut.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {careers.map((c) => (
                  <div
                    key={c.id}
                    className="border border-gray-200 rounded-xl p-8 hover:border-pmd-gold/50 hover:shadow-sm transition-all"
                  >
                    <h3 className="text-xl font-bold text-pmd-dark">
                      {c.titleId}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-sm text-pmd-gray">
                        <MapPin size={14} className="text-pmd-gold-text" /> {c.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-pmd-gray">
                        <Clock size={14} className="text-pmd-gold-text" /> {c.type}
                      </span>
                    </div>
                    <p className="mt-4 text-pmd-gray text-sm leading-relaxed">
                      {c.descId}
                    </p>
                    <a
                      href="https://wa.me/6281138800034"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-pmd-gold hover:bg-pmd-gold-light text-white text-sm px-5 py-2.5 rounded-lg transition-colors mt-6"
                    >
                      Lamar via WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            )}
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
