import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Careers } from "@/components/sections/Careers";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("en");
  return { title: { absolute: meta.careers.title }, description: meta.careers.description };
}

export default async function Page() {
  const copy = await getContent("en");

  return (
    <PageShell locale="en" page="careers">
      <Careers content={copy.careers} />
    </PageShell>
  );
}
