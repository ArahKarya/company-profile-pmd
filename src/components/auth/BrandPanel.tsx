"use client";

import { useEffect, useState } from "react";
import {
  Wheat,
  Sprout,
  Leaf,
  Package,
  Truck,
  Factory,
  Award,
  Sun,
  Sparkles,
  ShieldCheck,
  Scale,
  Globe2,
  HandCoins,
  Recycle,
  type LucideIcon,
} from "lucide-react";

function useCounter(target: number, duration = 1500): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: "dot" | "ring";
}

interface FloatingIcon {
  id: number;
  Icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  tint: string;
  animation: "animate-float-slow" | "animate-float-medium" | "animate-float-fast" | "animate-bob";
}

const RICE_ICONS: LucideIcon[] = [
  Wheat,
  Sprout,
  Leaf,
  Package,
  Truck,
  Factory,
  Award,
  Sun,
  Scale,
  Recycle,
  HandCoins,
  Globe2,
];

const PARTICLE_PALETTE = [
  "rgba(255, 249, 232, 0.45)", // ivory soft
  "rgba(244, 224, 138, 0.45)", // gold light
  "rgba(214, 217, 168, 0.40)", // sage light
  "rgba(236, 201, 85, 0.35)", // gold mid
];

const ICON_TINTS = [
  "text-pmd-gold-200/30",
  "text-pmd-gold-100/25",
  "text-pmd-green-200/25",
  "text-pmd-green-100/30",
  "text-paper-base/15",
];

const ANIMATIONS: FloatingIcon["animation"][] = [
  "animate-float-slow",
  "animate-float-medium",
  "animate-float-fast",
  "animate-bob",
];

export function BrandPanel() {
  const year = new Date().getFullYear();

  const capacityCount = useCounter(300, 1400);
  const productCount = useCounter(6, 900);
  const partnerCount = useCounter(100, 1600);

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 3 + Math.random() * 6,
      duration: 14 + Math.random() * 12,
      delay: -Math.random() * 18,
      color: PARTICLE_PALETTE[Math.floor(Math.random() * PARTICLE_PALETTE.length)]!,
      shape: Math.random() > 0.75 ? "ring" : "dot",
    })),
  );

  const [floatingIcons] = useState<FloatingIcon[]>(() =>
    Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      Icon: RICE_ICONS[i % RICE_ICONS.length]!,
      top: `${5 + Math.random() * 85}%`,
      left: `${4 + Math.random() * 90}%`,
      size: 30 + Math.random() * 38,
      duration: 5 + Math.random() * 7,
      delay: -Math.random() * 6,
      tint: ICON_TINTS[i % ICON_TINTS.length]!,
      animation: ANIMATIONS[i % ANIMATIONS.length]!,
    })),
  );

  const sonarDelays = ["0s", "0.8s", "1.6s", "2.4s"];

  return (
    <aside
      className="relative hidden overflow-hidden text-paper-base animate-gradient-flow lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #1a160d 0%, #2a2618 20%, #4a361a 45%, #8a661c 70%, #687442 100%)",
        backgroundSize: "300% 300%",
      }}
    >
      {/* Rotating conic halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/3 -top-1/3 h-[140%] w-[140%] animate-spin-slow opacity-30"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255, 249, 232, 0.06) 60deg, transparent 120deg, rgba(236, 201, 85, 0.08) 200deg, transparent 260deg, rgba(214, 217, 168, 0.06) 320deg, transparent 360deg)",
        }}
      />

      {/* Particle field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`absolute bottom-[-20px] animate-drift-up ${
              p.shape === "ring" ? "rounded-full ring-1" : "rounded-full"
            }`}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.shape === "dot" ? p.color : "transparent",
              borderColor: p.shape === "ring" ? p.color : "transparent",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Floating ag/industry icons */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {floatingIcons.map((f) => {
          const Icon = f.Icon;
          return (
            <Icon
              key={f.id}
              className={`absolute ${f.tint} ${f.animation}`}
              style={{
                top: f.top,
                left: f.left,
                width: f.size,
                height: f.size,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
              }}
              strokeWidth={1.25}
            />
          );
        })}
      </div>

      {/* Bottom wave layers */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 overflow-hidden">
        <svg
          className="absolute inset-x-0 bottom-0 h-full w-[200%] animate-wave-x"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z"
            fill="rgba(255, 249, 232, 0.08)"
          />
          <path
            d="M0,80 C240,48 480,112 720,80 C960,48 1200,112 1440,80 L1440,120 L0,120 Z"
            fill="rgba(236, 201, 85, 0.05)"
            transform="translate(0,8)"
          />
        </svg>
      </div>

      {/* Header — logo + sonar rings + brand */}
      <div className="relative animate-enter-left">
        <div className="relative inline-flex h-16 w-16 items-center justify-center">
          {sonarDelays.map((d) => (
            <span
              key={d}
              aria-hidden
              className="absolute inset-0 animate-sonar-ping rounded-sm ring-2 ring-pmd-gold-300/50"
              style={{ animationDelay: d }}
            />
          ))}
          <div className="relative flex h-full w-full animate-pulse-soft items-center justify-center rounded-sm bg-paper-base/15 ring-1 ring-pmd-gold-300/40 backdrop-blur-sm">
            <Wheat className="h-8 w-8 text-pmd-gold-200" strokeWidth={1.5} />
          </div>
        </div>

        <p className="mt-6 font-mono text-mono-sm uppercase tracking-[0.2em] text-pmd-gold-200/80">
          Penggilingan Beras Modern
        </p>
        <h1
          className="mt-3 font-display text-display-md md:text-display-lg lg:text-display-xl leading-[1.0] tracking-tight"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #fff9e8 0%, #faf0c5 40%, #ecc955 70%, #d6d9a8 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "gradient-flow 6s ease infinite",
          }}
        >
          PMD
        </h1>
        <p className="mt-4 max-w-md text-body-lg leading-relaxed text-paper-base/90">
          PT Pangan Masa Depan — beras berkualitas premium dari Indramayu untuk
          ketahanan pangan Indonesia.
        </p>
      </div>

      {/* Feature pills */}
      <div className="relative mt-6 flex flex-wrap gap-2 animate-enter-bottom" style={{ animationDelay: "0.2s" }}>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-paper-base/10 px-3 py-1.5 font-mono text-mono-xs uppercase tracking-wider ring-1 ring-paper-base/20 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pmd-green-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pmd-green-300" />
          </span>
          Live · Online
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-paper-base/10 px-3 py-1.5 font-mono text-mono-xs uppercase tracking-wider ring-1 ring-paper-base/20 backdrop-blur-sm">
          <Award className="h-3.5 w-3.5" /> ISO 22000 · HALAL · SNI
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-paper-base/10 px-3 py-1.5 font-mono text-mono-xs uppercase tracking-wider ring-1 ring-paper-base/20 backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5" /> Audit-ready CMS
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-paper-base/10 px-3 py-1.5 font-mono text-mono-xs uppercase tracking-wider ring-1 ring-paper-base/20 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" /> Bilingual ID · EN
        </span>
      </div>

      {/* Animated stat strip */}
      <div className="relative mt-6 grid max-w-md grid-cols-3 gap-3 animate-enter-bottom" style={{ animationDelay: "0.3s" }}>
        <div className="rounded-sm bg-paper-base/10 border-l-2 border-pmd-gold-400 px-3 py-2 backdrop-blur-sm">
          <p className="font-display text-heading-xl tabular-nums">
            {capacityCount}
            <span className="ml-1 text-mono-sm text-pmd-gold-200/80">T/D</span>
          </p>
          <p className="font-mono text-mono-xs uppercase tracking-wider text-paper-base/70">
            Kapasitas
          </p>
        </div>
        <div className="rounded-sm bg-paper-base/10 border-l-2 border-pmd-gold-400 px-3 py-2 backdrop-blur-sm">
          <p className="font-display text-heading-xl tabular-nums">{productCount}</p>
          <p className="font-mono text-mono-xs uppercase tracking-wider text-paper-base/70">
            Produk
          </p>
        </div>
        <div className="rounded-sm bg-paper-base/10 border-l-2 border-pmd-gold-400 px-3 py-2 backdrop-blur-sm">
          <p className="font-display text-heading-xl tabular-nums">
            {partnerCount}
            <span className="ml-0.5 text-mono-sm text-pmd-gold-200/80">+</span>
          </p>
          <p className="font-mono text-mono-xs uppercase tracking-wider text-paper-base/70">
            Mitra
          </p>
        </div>
      </div>

      {/* Footer */}
      <p
        className="relative mt-6 font-mono text-mono-xs uppercase tracking-wider text-paper-base/60 animate-enter-bottom"
        style={{ animationDelay: "0.5s" }}
      >
        © {year} PT Pangan Masa Depan · Indramayu, Jawa Barat
      </p>
    </aside>
  );
}
