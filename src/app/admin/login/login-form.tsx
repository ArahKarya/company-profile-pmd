"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/cn";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginInput = z.infer<typeof loginSchema>;

interface LoginFormProps {
  callbackUrl: string;
  initialError?: string;
}

export function LoginForm({ callbackUrl, initialError }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(initialError ?? null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = (input: LoginInput) => {
    setServerError(null);
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });
      if (result?.error) {
        setServerError("Email atau password salah. Silakan coba lagi.");
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    });
  };

  return (
    <div className="w-full max-w-md animate-enter-right">
      <div className="bg-surface-card border-2 border-ink-900 dark:border-paper-base shadow-lg p-6 md:p-8">
        <div className="mb-6 animate-enter-bottom">
          <div className="font-mono text-mono-sm uppercase tracking-[0.15em] text-pmd-gold-700 dark:text-pmd-gold-400 mb-2">
            Admin · Login
          </div>
          <h2 className="font-display text-display-sm text-text-primary">
            Selamat Datang
          </h2>
          <p className="mt-2 text-body-md text-text-secondary">
            Masuk untuk mengelola konten website PMD.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          {serverError && (
            <div
              role="alert"
              className="flex items-start gap-2 border-2 border-danger bg-danger/5 p-3 text-body-sm text-danger animate-enter-bottom"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span>{serverError}</span>
            </div>
          )}

          <div className="flex flex-col gap-1.5 animate-enter-bottom" style={{ animationDelay: "0.1s" }}>
            <label
              htmlFor="email"
              className="font-mono text-mono-xs uppercase tracking-wider text-text-secondary"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                strokeWidth={1.75}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
              <input
                id="email"
                type="email"
                placeholder="admin@panganmasadepan.com"
                autoComplete="email"
                autoFocus
                aria-invalid={!!errors.email}
                disabled={pending}
                className={cn(
                  "w-full h-12 pl-10 pr-4 bg-surface-card text-text-primary text-body-md rounded-xs border-2 transition-colors duration-fast",
                  "placeholder:text-text-muted",
                  "focus:outline-none focus:border-pmd-gold-500",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  errors.email ? "border-danger focus:border-danger" : "border-surface-border-bold",
                )}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-body-sm text-danger animate-enter-bottom">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 animate-enter-bottom" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-mono text-mono-xs uppercase tracking-wider text-text-secondary"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() =>
                  alert("Silakan hubungi administrator untuk reset password.")
                }
                className="font-mono text-mono-xs uppercase tracking-wider text-pmd-gold-700 dark:text-pmd-gold-400 hover:underline underline-offset-2"
              >
                Lupa?
              </button>
            </div>
            <div className="relative">
              <Lock
                size={16}
                strokeWidth={1.75}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                disabled={pending}
                className={cn(
                  "w-full h-12 pl-10 pr-12 bg-surface-card text-text-primary text-body-md rounded-xs border-2 transition-colors duration-fast",
                  "placeholder:text-text-muted",
                  "focus:outline-none focus:border-pmd-gold-500",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  errors.password
                    ? "border-danger focus:border-danger"
                    : "border-surface-border-bold",
                )}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-body-sm text-danger animate-enter-bottom">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className={cn(
              "group relative mt-2 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden bg-ink-900 dark:bg-paper-base text-paper-base dark:text-ink-900 font-mono text-mono-sm uppercase tracking-wider transition-all duration-fast ease-snap",
              "shadow-md hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-none",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md",
              "animate-enter-bottom",
            )}
            style={{ animationDelay: "0.2s" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-pmd-gold-300/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative inline-flex items-center justify-center gap-2">
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? "Memproses..." : "Masuk"}
              {!pending && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </span>
          </button>
        </form>

        <p
          className="mt-6 text-center font-mono text-mono-xs uppercase tracking-wider text-text-muted animate-enter-bottom"
          style={{ animationDelay: "0.35s" }}
        >
          Akses dibatasi untuk staff PMD yang berwenang
        </p>
      </div>
    </div>
  );
}
