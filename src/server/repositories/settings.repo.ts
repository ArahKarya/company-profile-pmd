import "server-only";
import { prisma } from "@/lib/prisma";

export interface Settings {
  companyName: string;
  taglineId: string;
  taglineEn: string;
  foundedYear: string;
  capacityTonsPerDay: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapUrl: string;
}

const DEFAULTS: Settings = {
  companyName: "PT Pangan Masa Depan",
  taglineId: "Penggilingan Beras Modern Untuk Indonesia",
  taglineEn: "Modern Rice Milling for Indonesia",
  foundedYear: "2021",
  capacityTonsPerDay: "300",
  address: "Jl. Raya Indramayu, Jawa Barat, Indonesia",
  phone: "+62 812-3456-7890",
  whatsapp: "6281234567890",
  email: "info@panganmasadepan.com",
  mapUrl: "https://maps.google.com/?q=Indramayu+Jawa+Barat+Indonesia",
};

export async function getSettings(): Promise<Settings> {
  const rows = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const merged = { ...DEFAULTS };
  for (const key of Object.keys(DEFAULTS) as Array<keyof Settings>) {
    const v = map[key];
    if (typeof v === "string") merged[key] = v;
  }
  return merged;
}

export async function setSetting(key: string, value: string) {
  return prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}
