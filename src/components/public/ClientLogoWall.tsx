import Image from "next/image";
import { cn } from "@/lib/cn";

interface ClientItem {
  id: string;
  name: string;
  logoUrl?: string | null;
}

interface ClientLogoWallProps {
  clients: ClientItem[];
  footerNote?: string;
  className?: string;
}

export function ClientLogoWall({
  clients,
  footerNote,
  className,
}: ClientLogoWallProps) {
  return (
    <div className={cn("", className)}>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-surface-border-bold border border-surface-border-bold">
        {clients.map((c) => (
          <li
            key={c.id}
            className="bg-surface-card aspect-[3/2] flex items-center justify-center p-6 group"
            aria-label={c.name}
          >
            {c.logoUrl ? (
              <Image
                src={c.logoUrl}
                alt={c.name}
                width={120}
                height={60}
                className="max-h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-default"
              />
            ) : (
              <span className="font-mono text-mono-sm uppercase tracking-wider text-text-muted">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ul>
      {footerNote && (
        <p className="text-center mt-6 font-mono text-mono-sm uppercase tracking-wider text-text-secondary">
          {footerNote}
        </p>
      )}
    </div>
  );
}
