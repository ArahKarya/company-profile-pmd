import "dotenv/config";
import { hash } from "bcryptjs";

const { PrismaClient } = require("../src/generated/prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@panganmasadepan.com" },
    update: {},
    create: {
      email: "admin@panganmasadepan.com",
      password: passwordHash,
      name: "Admin PMD",
    },
  });

  const settings = [
    ["companyName", "PT Pangan Masa Depan"],
    ["taglineId", "Teknologi Modern untuk Ketahanan Pangan Indonesia"],
    ["taglineEn", "Modern Technology for Indonesian Food Security"],
    ["phone", "+62 811-3880-0034"],
    ["email", "info@panganmasadepan.com"],
    ["address", "Jalan Rancahan, Blok Sukamelang Desa No.RT. 08/04, Karangmulya, Kec. Kandanghaur, Kabupaten Indramayu, Jawa Barat 45254"],
    ["whatsapp", "6281138800034"],
    ["primaryColor", "#D4A017"],
    ["secondaryColor", "#1B7A2F"],
  ];

  for (const [key, value] of settings) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  const products = [
    { nameId: "Wa Lemu", nameEn: "Wa Lemu", descId: "Long Grain Pilihan Keluarga Indonesia. Cocok untuk konsumsi rumah tangga, kuliner & grosir.", descEn: "Long Grain Indonesian Family Choice. Suitable for household, culinary & wholesale.", category: "main", features: "5kg, 10kg, 25kg, 50kg", sortOrder: 1 },
    { nameId: "Nick Well", nameEn: "Nick Well", descId: "Beras Medium Tanpa Pengawet, Pewarna dan Pengharum. Cocok untuk konsumsi rumah tangga, kuliner premium & grosir.", descEn: "Medium Rice without Preservatives, Coloring and Fragrance. Suitable for household, premium culinary & wholesale.", category: "main", features: "10kg, 25kg, 50kg", sortOrder: 2 },
    { nameId: "Cruise", nameEn: "Cruise", descId: "Elegan, Murni dan Selektif. Cocok untuk konsumsi rumah tangga, hotel, restoran dan pasar premium.", descEn: "Elegant, Pure and Selective. Suitable for household, hotel, restaurant and premium market.", category: "main", features: "10kg, 25kg", sortOrder: 3 },
    { nameId: "Menir", nameEn: "Broken Rice", descId: "Butiran beras patah yang ukurannya jauh lebih kecil dari beras utuh. Meskipun ukurannya lebih kecil, menir masih memiliki kandungan gizi yang mirip dengan beras utuh.", descEn: "Broken rice grains that are much smaller than whole rice. Despite its smaller size, broken rice still has nutritional content similar to whole rice.", category: "circular", sortOrder: 4 },
    { nameId: "Sekam Padi Pellet", nameEn: "Rice Husk Pellet", descId: "Sumber energi terbarukan yang berasal dari limbah pertanian serta dapat mengurangi ketergantungan bahan bakar fosil.", descEn: "Renewable energy source from agricultural waste that can reduce dependence on fossil fuels.", category: "circular", sortOrder: 5 },
    { nameId: "Bekatul", nameEn: "Rice Bran", descId: "Lapisan luar beras yang kaya akan nutrisi seperti serat, vitamin B kompleks, mineral, dan antioksidan.", descEn: "Outer layer of rice rich in nutrients such as fiber, B-complex vitamins, minerals, and antioxidants.", category: "circular", sortOrder: 6 },
  ];

  for (const p of products) {
    const existing = await prisma.product.findFirst({ where: { nameId: p.nameId } });
    if (!existing) {
      await prisma.product.create({ data: { ...p, isActive: true } });
    }
  }

  const teamMembers = [
    { name: "Yenny Cyndiani", roleId: "Komisaris", roleEn: "Commissioner", sortOrder: 1 },
    { name: "Arif Wahyu", roleId: "Komisaris", roleEn: "Commissioner", sortOrder: 2 },
    { name: "Bambang Supeno", roleId: "Direktur Utama", roleEn: "President Director", sortOrder: 3 },
  ];

  for (const m of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: m.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: { ...m, isActive: true } });
    }
  }

  const clients = [
    { name: "Mayora", sortOrder: 1 },
    { name: "Food Station", sortOrder: 2 },
    { name: "Bulog", sortOrder: 3 },
    { name: "Pokphand", sortOrder: 4 },
    { name: "Pasar Induk Cipinang", sortOrder: 5 },
    { name: "RM Taman Selera", sortOrder: 6 },
  ];

  for (const c of clients) {
    const existing = await prisma.client.findFirst({ where: { name: c.name } });
    if (!existing) {
      await prisma.client.create({ data: { ...c, isActive: true } });
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
