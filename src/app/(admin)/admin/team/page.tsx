import { PageHeader, Breadcrumb } from "@/components/admin/PageHeader";
import { TeamClient } from "./team-client";
import { listTeamMembers } from "@/server/repositories/team.repo";

export default async function TeamAdminPage() {
  const members = await listTeamMembers({ activeOnly: false }).catch(() => []);
  return (
    <>
      <PageHeader
        breadcrumb={<Breadcrumb items={[{ label: "Admin" }, { label: "Tim" }]} />}
        title="Tim"
        subtitle="Kelola anggota tim kepemimpinan."
      />
      <TeamClient initialMembers={members} />
    </>
  );
}
