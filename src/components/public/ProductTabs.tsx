"use client";

import { useState } from "react";
import { Package } from "lucide-react";

const products = [
  {
    id: "walemu",
    name: "Wa Lemu",
    quality: "Medium Quality",
    desc: "Long Grain Pilihan Keluarga Indonesia. Beras berkualitas medium yang cocok untuk konsumsi sehari-hari dengan harga terjangkau.",
    sizes: "5kg, 10kg, 25kg, 50kg",
    usage: "Rumah tangga, kuliner & grosir",
    color: "from-green-600 to-green-800",
  },
  {
    id: "nickwell",
    name: "Nick Well",
    quality: "Medium Quality",
    desc: "Beras Medium tanpa pengawet, pewarna, dan pengharum. Pilihan tepat untuk yang mengutamakan kealamian dan kualitas.",
    sizes: "10kg, 25kg, 50kg",
    usage: "Rumah tangga, kuliner premium & grosir",
    color: "from-amber-600 to-amber-800",
  },
  {
    id: "cruise",
    name: "Cruise",
    quality: "Premium - Super Premium",
    desc: "Elegan, murni, dan selektif. Beras premium pilihan untuk standar tertinggi, diproses dengan teknologi modern.",
    sizes: "10kg, 25kg",
    usage: "Hotel, restoran & pasar premium",
    color: "from-blue-700 to-blue-900",
  },
];

export default function ProductTabs() {
  const [active, setActive] = useState(0);
  const product = products[active];

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-12">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className={`px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all ${
              active === i
                ? "bg-pmd-gold text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
          <div className="text-center text-white">
            <Package size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-2xl font-bold">{product.name}</p>
            <p className="text-white/90 text-sm mt-1">{product.quality}</p>
          </div>
        </div>
        <div>
          <span className="inline-block bg-pmd-dark text-pmd-gold text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            {product.quality}
          </span>
          <h3 className="text-3xl font-bold text-pmd-dark mb-4">
            {product.name}
          </h3>
          <p className="text-pmd-gray leading-relaxed mb-6">{product.desc}</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-20">Ukuran</span>
              <span className="text-sm text-pmd-dark">{product.sizes}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 w-20">Cocok untuk</span>
              <span className="text-sm text-pmd-dark">{product.usage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
