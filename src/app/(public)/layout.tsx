import { Suspense } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { getSettings } from "@/lib/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings;
  try {
    settings = await getSettings();
  } catch {
    settings = {
      companyName: "PT Pangan Masa Depan",
      taglineId: "Teknologi Modern untuk Ketahanan Pangan Indonesia",
      taglineEn: "Modern Technology for Indonesian Food Security",
      phone: "+62 811-3880-0034",
      email: "info@panganmasadepan.com",
      address:
        "Jalan Rancahan, Blok Sukamelang Desa No.RT. 08/04, Karangmulya, Kec. Kandanghaur, Kabupaten Indramayu, Jawa Barat 45254",
      logoUrl: "/images/logo-pmd.png",
      primaryColor: "#D4A017",
      secondaryColor: "#1B7A2F",
      whatsapp: "6281138800034",
      mapUrl: "",
    };
  }

  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer settings={settings} locale="id" />
    </>
  );
}
