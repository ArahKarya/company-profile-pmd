"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface MapEmbedProps {
  /** Google Maps query (e.g. address or place name). Used in iframe URL. */
  query: string;
  /** Accessible iframe title */
  title: string;
  className?: string;
}

/**
 * Lazy-load Google Maps iframe on scroll-into-view (saves bandwidth for users
 * who don't reach the contact section).
 */
export function MapEmbed({ query, title, className }: MapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [visible]);

  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/9] md:aspect-[21/9] bg-surface-sunken border-2 border-ink-900 dark:border-paper-base overflow-hidden",
        className
      )}
    >
      {visible ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-text-muted font-mono text-mono-sm uppercase tracking-wider">
          Memuat peta...
        </div>
      )}
    </div>
  );
}
