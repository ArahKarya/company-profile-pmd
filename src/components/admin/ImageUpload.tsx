"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  maxSizeMB?: number;
  accept?: string;
  uploadUrl?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  maxSizeMB = 5,
  accept = "image/jpeg,image/png,image/webp",
  uploadUrl = "/api/admin/upload",
  className,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const toast = useToast();

  const handleFile = async (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File terlalu besar (max ${maxSizeMB}MB)`);
      return;
    }
    if (!accept.split(",").map((s) => s.trim()).includes(file.type)) {
      toast.error("Tipe file tidak didukung");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(uploadUrl, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = (await res.json()) as { url: string };
      onChange(data.url);
      toast.success("Gambar terunggah");
    } catch {
      toast.error("Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (value) {
    return (
      <div className={cn("relative w-full max-w-sm", className)}>
        <div className="relative aspect-video bg-surface-sunken border-2 border-ink-900 dark:border-paper-base overflow-hidden">
          <Image
            src={value}
            alt="Preview"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => onChange(null)}
          leadingIcon={<X size={14} />}
          className="absolute top-2 right-2 shadow-md"
        >
          Hapus
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        disabled={uploading}
        className={cn(
          "w-full max-w-sm aspect-video border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors duration-fast",
          dragging
            ? "border-pmd-gold-500 bg-pmd-gold-50 dark:bg-pmd-gold-950/30"
            : "border-surface-border-bold bg-surface-sunken hover:border-ink-900 dark:hover:border-paper-base",
          uploading && "opacity-50 cursor-wait"
        )}
      >
        {uploading ? (
          <>
            <Upload size={32} strokeWidth={1.5} className="text-text-muted animate-pulse" />
            <span className="font-mono text-mono-sm uppercase tracking-wider text-text-muted">
              Mengunggah...
            </span>
          </>
        ) : (
          <>
            <ImageIcon size={32} strokeWidth={1.5} className="text-text-muted" />
            <div className="text-center">
              <div className="font-mono text-mono-sm uppercase tracking-wider text-text-primary">
                Klik atau Drop
              </div>
              <div className="font-mono text-mono-xs text-text-muted mt-1">
                JPG, PNG, WebP · max {maxSizeMB}MB
              </div>
            </div>
          </>
        )}
      </button>
    </div>
  );
}
