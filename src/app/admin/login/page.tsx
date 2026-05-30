import Link from "next/link";
import { Wheat } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { BrandPanel } from "@/components/auth/BrandPanel";
import { LoginForm } from "./login-form";

interface LoginPageProps {
  searchParams: Promise<{ from?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  if (session) redirect("/admin/dashboard");

  const params = await searchParams;
  // Sanitize callback to prevent open redirect: only internal admin paths.
  const rawFrom = params.from ?? "/admin/dashboard";
  const callbackUrl =
    rawFrom.startsWith("/admin") &&
    !rawFrom.startsWith("//") &&
    !rawFrom.startsWith("/\\")
      ? rawFrom
      : "/admin/dashboard";

  const year = new Date().getFullYear();

  return (
    <div className="relative grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <BrandPanel />

      {/* Form panel */}
      <main className="flex min-h-screen flex-col bg-surface-page">
        {/* Mobile brand strip — visible only on small screens */}
        <div className="flex items-center justify-between px-6 py-6 lg:hidden border-b border-surface-border">
          <div className="flex items-center gap-2.5 font-display text-heading-sm text-text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-pmd-gold-500 text-ink-900">
              <Wheat size={18} strokeWidth={1.75} />
            </div>
            PMD
          </div>
          <span className="font-mono text-mono-xs uppercase tracking-wider text-text-muted">
            Admin
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-8 md:px-10">
          <LoginForm callbackUrl={callbackUrl} initialError={params.error} />
        </div>

        {/* Mobile footer */}
        <div className="px-6 pb-6 text-center font-mono text-mono-xs uppercase tracking-wider text-text-muted lg:hidden">
          © {year} PT Pangan Masa Depan
        </div>

        {/* Desktop footer */}
        <div className="hidden px-12 pb-8 font-mono text-mono-xs uppercase tracking-wider text-text-muted lg:flex lg:justify-between">
          <span>Perlu bantuan? Hubungi administrator.</span>
          <Link
            href="/"
            className="hover:text-text-primary transition-colors underline-offset-4 hover:underline"
          >
            ← Kembali ke situs
          </Link>
        </div>
      </main>
    </div>
  );
}
