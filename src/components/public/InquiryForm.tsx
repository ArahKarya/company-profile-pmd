"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Send, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label, FieldGroup, HelperText } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface InquiryFormProps {
  whatsappNumber: string;
  recipientEmail: string;
  className?: string;
}

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function InquiryForm({
  whatsappNumber,
  recipientEmail,
  className,
}: InquiryFormProps) {
  const t = useTranslations("Contact");
  const toast = useToast();
  const [state, setState] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [pending, startTransition] = useTransition();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (state.name.trim().length < 2) next.name = "Min 2 karakter";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(state.email)) next.email = "Email tidak valid";
    if (state.message.trim().length < 10) next.message = "Min 10 karakter";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    startTransition(async () => {
      try {
        const res = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...state, to: recipientEmail }),
        });
        if (!res.ok) throw new Error("Failed");
        toast.success("Pesan terkirim. Tim sales akan menghubungi Anda.");
        setState(initial);
      } catch {
        toast.error("Gagal mengirim. Silakan coba via WhatsApp.");
      }
    });
  };

  const waMessage = encodeURIComponent(
    `Halo PMD, saya ${state.name || "[nama]"} dari ${state.company || "[perusahaan]"}.\n\n${state.message || "[pesan]"}\n\nKontak balik: ${state.email || "[email]"}, ${state.phone || "[nomor]"}`
  );
  const waUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      aria-label={t("formTitle")}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup>
          <Label htmlFor="name" required>
            {t("formName")}
          </Label>
          <Input
            id="name"
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            variant={errors.name ? "error" : "default"}
            required
          />
          {errors.name && <HelperText tone="error">{errors.name}</HelperText>}
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="company" optional>
            {t("formCompany")}
          </Label>
          <Input
            id="company"
            value={state.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="email" required>
            {t("formEmail")}
          </Label>
          <Input
            id="email"
            type="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            variant={errors.email ? "error" : "default"}
            required
          />
          {errors.email && <HelperText tone="error">{errors.email}</HelperText>}
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="phone">{t("formPhone")}</Label>
          <Input
            id="phone"
            type="tel"
            value={state.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+62..."
          />
        </FieldGroup>
      </div>
      <FieldGroup className="mt-4">
        <Label htmlFor="message" required>
          {t("formMessage")}
        </Label>
        <Textarea
          id="message"
          rows={5}
          value={state.message}
          onChange={(e) => update("message", e.target.value)}
          variant={errors.message ? "error" : "default"}
          required
        />
        {errors.message && <HelperText tone="error">{errors.message}</HelperText>}
      </FieldGroup>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={pending}
          leadingIcon={<Send size={16} strokeWidth={1.75} />}
        >
          {t("formSubmit")}
        </Button>
        <span className="font-mono text-mono-xs uppercase tracking-wider text-text-muted">
          atau
        </span>
        <Button
          type="button"
          variant="outline"
          size="lg"
          asChild
          leadingIcon={<MessageCircle size={16} strokeWidth={1.75} />}
        >
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            {t("formFallback")}
          </a>
        </Button>
      </div>
    </form>
  );
}
