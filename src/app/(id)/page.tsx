import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Split } from "@/components/sections/Split";
import { FeatureSwitcher } from "@/components/sections/FeatureSwitcher";
import { Gallery } from "@/components/sections/Gallery";
import { Closing } from "@/components/sections/Closing";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("id");
  return { title: { absolute: meta.home.title }, description: meta.home.description };
}

export default async function Page() {
  const copy = await getContent("id");

  return (
    <PageShell locale="id" page="home">
      <Hero content={copy.home.hero} />
      <Split content={copy.home.intro} />
      <FeatureSwitcher items={copy.home.features.items} />
      <Gallery images={copy.home.gallery.images} caption={copy.home.gallery.caption} />
      <Closing content={copy.home.closing} />
    </PageShell>
  );
}
