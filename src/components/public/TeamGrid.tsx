import Image from "next/image";
import { cn } from "@/lib/cn";

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  photoUrl?: string | null;
}

interface TeamGridProps {
  members: TeamMemberItem[];
  className?: string;
}

export function TeamGrid({ members, className }: TeamGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {members.map((m) => (
        <li key={m.id} className="group">
          <article className="bg-surface-card border-2 border-surface-border-bold overflow-hidden transition-all duration-default hover:border-ink-900 dark:hover:border-paper-base hover:shadow-md">
            <div className="relative aspect-[4/5] bg-surface-sunken overflow-hidden">
              {m.photoUrl ? (
                <Image
                  src={m.photoUrl}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-smooth"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-display-lg text-surface-border-bold">
                    {m.name
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display text-heading-lg text-text-primary mb-1">
                {m.name}
              </h3>
              <p className="font-mono text-mono-sm uppercase tracking-wider text-pmd-gold-700 dark:text-pmd-gold-400">
                {m.role}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
