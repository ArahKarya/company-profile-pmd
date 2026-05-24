import { PageHeader, Breadcrumb } from "@/components/admin/PageHeader";
import { ClientsClient } from "./clients-client";
import { listClients } from "@/server/repositories/client.repo";

export default async function ClientsAdminPage() {
  const clients = await listClients({ activeOnly: false }).catch(() => []);
  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Admin" }, { label: "Mitra" }]} />}
        title="Mitra"
        subtitle="Kelola logo mitra yang ditampilkan di beranda."
      />
      <ClientsClient initialClients={clients} />
    </>
  );
}
