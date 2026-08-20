import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Showcase } from "@/components/sections/Showcase";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("en");
  return { title: { absolute: meta.services.title }, description: meta.services.description };
}

export default async function Page() {
  const copy = await getContent("en");

  return (
    <PageShell locale="en" page="services" solidNav>
      <Showcase content={copy.services} />
    </PageShell>
  );
}
