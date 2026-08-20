import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CompactHero } from "@/components/sections/Hero";
import { Vision, Mission } from "@/components/sections/AboutSections";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("en");
  return { title: { absolute: meta.about.title }, description: meta.about.description };
}

export default async function Page() {
  const copy = await getContent("en");

  return (
    <PageShell locale="en" page="about">
      <CompactHero content={copy.about.hero} statement={copy.about.statement} />
      <Vision content={copy.about.vision} />
      <Mission content={copy.about.mission} />
    </PageShell>
  );
}
