"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Briefcase,
  Users,
  Building2,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  group: "content" | "settings";
}

const NAV: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "content" },
  { href: "/admin/pages", label: "Halaman", icon: FileText, group: "content" },
  { href: "/admin/products", label: "Produk", icon: Package, group: "content" },
  { href: "/admin/careers", label: "Karier", icon: Briefcase, group: "content" },
  { href: "/admin/team", label: "Tim", icon: Users, group: "content" },
  { href: "/admin/clients", label: "Mitra", icon: Building2, group: "content" },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings, group: "settings" },
];

const STORAGE_KEY = "pmd-admin-sidebar-collapsed";

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setCollapsed(stored === "true");
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    window.localStorage.setItem(STORAGE_KEY, String(next));
  };

  const groups = {
    content: NAV.filter((n) => n.group === "content"),
    settings: NAV.filter((n) => n.group === "settings"),
  };

  return (
    <aside
      className={cn(
        "shrink-0 sticky top-0 h-screen bg-ink-900 dark:bg-paper-darker text-paper-base border-r-2 border-ink-700 dark:border-ink-700 flex flex-col transition-[width] duration-default ease-snap",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center gap-3 h-16 px-4 border-b-2 border-ink-700 shrink-0">
        <div className="w-8 h-8 bg-pmd-gold-500 flex items-center justify-center font-display text-lg text-ink-900 shrink-0">
          P
        </div>
        {mounted && !collapsed && (
          <div>
            <div className="font-display text-heading-sm leading-none">PMD</div>
            <div className="font-mono text-mono-xs uppercase tracking-wider text-paper-base/60 mt-0.5">
              ADMIN
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <NavGroup label="Konten" collapsed={collapsed} items={groups.content} pathname={pathname} />
        <NavGroup label="Sistem" collapsed={collapsed} items={groups.settings} pathname={pathname} />
      </nav>

      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Buka sidebar" : "Kecilkan sidebar"}
        className="h-12 border-t-2 border-ink-700 hover:bg-ink-700 transition-colors flex items-center justify-center text-paper-base/70 hover:text-paper-base"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}

function NavGroup({
  label,
  items,
  collapsed,
  pathname,
}: {
  label: string;
  items: NavItem[];
  collapsed: boolean;
  pathname: string;
}) {
  return (
    <div className="mb-2">
      {!collapsed && (
        <div className="px-4 mb-2 font-mono text-mono-xs uppercase tracking-[0.15em] text-paper-base/50">
          {label}
        </div>
      )}
      <ul>
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 h-10 px-4 transition-colors duration-fast",
                  active
                    ? "bg-pmd-gold-500 text-ink-900"
                    : "text-paper-base/80 hover:bg-ink-700 hover:text-paper-base"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={16} strokeWidth={1.75} className="shrink-0" />
                {!collapsed && (
                  <span className="font-mono text-mono-sm uppercase tracking-wider">
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
