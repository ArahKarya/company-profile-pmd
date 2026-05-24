import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "./login-form";

interface LoginPageProps {
  searchParams: Promise<{ from?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();
  if (session) redirect("/admin/dashboard");

  const params = await searchParams;
  const from = params.from ?? "/admin/dashboard";

  return (
    <div className="min-h-screen flex bg-ink-900 relative isolate">
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-900/95 to-pmd-gold-950/60" />

      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface-card border-2 border-paper-base/20 shadow-xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-pmd-gold-500 flex items-center justify-center font-display text-xl text-ink-900">
              P
            </div>
            <div>
              <div className="font-display text-heading-lg text-text-primary leading-none">
                PMD
              </div>
              <div className="font-mono text-mono-xs uppercase tracking-[0.15em] text-text-muted mt-1">
                Admin CMS
              </div>
            </div>
          </div>
          <h1 className="font-display text-display-sm text-text-primary mb-2">
            Masuk Admin
          </h1>
          <p className="text-body-sm text-text-secondary mb-8">
            Kelola konten website PT Pangan Masa Depan.
          </p>

          <LoginForm callbackUrl={from} initialError={params.error} />
        </div>
      </div>
    </div>
  );
}
