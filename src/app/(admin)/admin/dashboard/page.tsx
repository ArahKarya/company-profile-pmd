import { prisma } from "@/lib/prisma";
import { Package, Briefcase, Users, Building } from "lucide-react";

export default async function DashboardPage() {
  let stats = { products: 0, careers: 0, team: 0, clients: 0 };

  try {
    const [products, careers, team, clients] = await Promise.all([
      prisma.product.count(),
      prisma.career.count({ where: { isActive: true } }),
      prisma.teamMember.count(),
      prisma.client.count(),
    ]);
    stats = { products, careers, team, clients };
  } catch {
    // DB not ready
  }

  const cards = [
    { label: "Produk", value: stats.products, icon: Package, color: "bg-amber-500" },
    { label: "Lowongan Aktif", value: stats.careers, icon: Briefcase, color: "bg-green-500" },
    { label: "Anggota Tim", value: stats.team, icon: Users, color: "bg-blue-500" },
    { label: "Klien", value: stats.clients, icon: Building, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
              >
                <card.icon size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
