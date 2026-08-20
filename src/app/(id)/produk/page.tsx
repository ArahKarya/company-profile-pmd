import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Showcase } from "@/components/sections/Showcase";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("id");
  return { title: { absolute: meta.services.title }, description: meta.services.description };
}

export default async function Page() {
  const copy = await getContent("id");

  return (
    <PageShell locale="id" page="services" solidNav>
      <Showcase content={copy.services} />
    </PageShell>
  );
}
