import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CompactHero } from "@/components/sections/Hero";
import { Vision, Mission } from "@/components/sections/AboutSections";
import { Values } from "@/components/sections/Values";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("id");
  return { title: { absolute: meta.about.title }, description: meta.about.description };
}

export default async function Page() {
  const copy = await getContent("id");

  return (
    <PageShell locale="id" page="about">
      <CompactHero content={copy.about.hero} statement={copy.about.statement} />
      <Vision content={copy.about.vision} />
      <Mission content={copy.about.mission} />
      <Values content={copy.about.values} />
    </PageShell>
  );
}
