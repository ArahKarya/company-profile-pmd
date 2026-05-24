import "server-only";
import { prisma } from "@/lib/prisma";

const DEFAULTS = {
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
} as const;

export type Settings = typeof DEFAULTS;

export async function getSettings(): Promise<Settings> {
  const rows = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    ...DEFAULTS,
    ...(Object.fromEntries(
      Object.keys(DEFAULTS).map((k) => [k, map[k] ?? DEFAULTS[k as keyof Settings]])
    ) as Settings),
  };
}

export async function setSetting(key: string, value: string) {
  return prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });
}
