import { prisma } from "./prisma";

export type SiteSettings = {
  companyName: string;
  taglineId: string;
  taglineEn: string;
  phone: string;
  email: string;
  address: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  whatsapp: string;
  mapUrl: string;
};

const defaults: SiteSettings = {
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

export async function getSettings(): Promise<SiteSettings> {
  const rows = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return { ...defaults, ...map } as SiteSettings;
}

export async function updateSetting(key: string, value: string) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
