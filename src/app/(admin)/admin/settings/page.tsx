import { PageHeader, Breadcrumb } from "@/components/admin/PageHeader";
import { SettingsClient } from "./settings-client";
import { getSettings } from "@/server/repositories/settings.repo";

export default async function SettingsAdminPage() {
  const settings = await getSettings().catch(() => null);
  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Admin" }, { label: "Pengaturan" }]} />}
        title="Pengaturan Situs"
        subtitle="Konfigurasi informasi perusahaan dan kontak yang tampil di publik."
      />
      <SettingsClient initialSettings={settings} />
    </>
  );
}
