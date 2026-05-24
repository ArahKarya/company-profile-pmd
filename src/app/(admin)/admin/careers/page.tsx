import { PageHeader, Breadcrumb } from "@/components/admin/PageHeader";
import { CareersClient } from "./careers-client";
import { listCareers } from "@/server/repositories/career.repo";

export default async function CareersAdminPage() {
  const careers = await listCareers({ activeOnly: false }).catch(() => []);
  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Admin" }, { label: "Karier" }]} />}
        title="Lowongan"
        subtitle="Kelola lowongan pekerjaan yang ditampilkan di halaman karier."
      />
      <CareersClient initialCareers={careers} />
    </>
  );
}
