"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/Tabs";
import { Label, FieldGroup } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import type { Settings } from "@/server/repositories/settings.repo";

const DEFAULTS: Settings = {
  companyName: "PT Pangan Masa Depan",
  taglineId: "Penggilingan Beras Modern Untuk Indonesia",
  taglineEn: "Modern Rice Milling for Indonesia",
  foundedYear: "2021",
  capacityTonsPerDay: "300",
  address: "Jl. Raya Indramayu, Jawa Barat, Indonesia",
  phone: "+62 812-3456-7890",
  whatsapp: "6281234567890",
  email: "info@panganmasadepan.com",
  mapUrl: "https://maps.google.com/?q=Indramayu+Jawa+Barat+Indonesia",
};

interface SettingsClientProps {
  initialSettings: Settings | null;
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [tab, setTab] = useState("umum");
  const [settings, setSettings] = useState<Settings>(initialSettings ?? DEFAULTS);
  const [pending, startTransition] = useTransition();

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        });
        if (!res.ok) throw new Error();
        toast.success("Pengaturan disimpan");
        router.refresh();
      } catch {
        toast.error("Gagal menyimpan");
      }
    });
  };

  return (
    <Card variant="bordered" padding="lg">
      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="umum">Umum</Tab>
          <Tab value="kontak">Kontak</Tab>
          <Tab value="lokasi">Lokasi</Tab>
        </TabList>

        <TabPanel value="umum">
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Label htmlFor="companyName" required>Nama Perusahaan</Label>
              <Input id="companyName" value={settings.companyName} onChange={(e) => update("companyName", e.target.value)} />
            </FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldGroup>
                <Label htmlFor="taglineId">Tagline (ID)</Label>
                <Textarea id="taglineId" rows={2} value={settings.taglineId} onChange={(e) => update("taglineId", e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="taglineEn">Tagline (EN)</Label>
                <Textarea id="taglineEn" rows={2} value={settings.taglineEn} onChange={(e) => update("taglineEn", e.target.value)} />
              </FieldGroup>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldGroup>
                <Label htmlFor="foundedYear">Tahun Berdiri</Label>
                <Input id="foundedYear" value={settings.foundedYear} onChange={(e) => update("foundedYear", e.target.value)} />
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="capacity">Kapasitas (ton/hari)</Label>
                <Input id="capacity" value={settings.capacityTonsPerDay} onChange={(e) => update("capacityTonsPerDay", e.target.value)} />
              </FieldGroup>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="kontak">
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Label htmlFor="phone" required>Telepon</Label>
              <Input id="phone" type="tel" value={settings.phone} onChange={(e) => update("phone", e.target.value)} />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="whatsapp" required>WhatsApp (tanpa +, format 628...)</Label>
              <Input id="whatsapp" value={settings.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="6281234567890" />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="email" required>Email</Label>
              <Input id="email" type="email" value={settings.email} onChange={(e) => update("email", e.target.value)} />
            </FieldGroup>
          </div>
        </TabPanel>

        <TabPanel value="lokasi">
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Label htmlFor="address" required>Alamat Lengkap</Label>
              <Textarea id="address" rows={3} value={settings.address} onChange={(e) => update("address", e.target.value)} />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="mapUrl">Google Maps URL</Label>
              <Input id="mapUrl" type="url" value={settings.mapUrl} onChange={(e) => update("mapUrl", e.target.value)} />
            </FieldGroup>
          </div>
        </TabPanel>
      </Tabs>

      <div className="flex justify-end gap-3 pt-6 mt-6 border-t-2 border-surface-border-bold">
        <Button variant="primary" size="lg" leadingIcon={<Save size={16} />} onClick={handleSave} loading={pending}>
          Simpan Pengaturan
        </Button>
      </div>
    </Card>
  );
}
