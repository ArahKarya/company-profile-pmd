import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SplitHero } from "@/components/sections/SplitHero";
import { Split } from "@/components/sections/Split";
import { Stats } from "@/components/sections/Stats";
import { Cards } from "@/components/sections/Cards";
import { ProcessBand } from "@/components/sections/ProcessBand";
import { Gallery } from "@/components/sections/Gallery";
import { Cta } from "@/components/sections/Cta";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("id");
  return { title: { absolute: meta.home.title }, description: meta.home.description };
}

export default async function Page() {
  const copy = await getContent("id");

  return (
    <PageShell locale="id" page="home">
      <SplitHero content={copy.home.hero} />
      <Split content={copy.home.intro} />
      <Stats content={copy.home.stats} />
      <Cards content={copy.home.products} index="02" />
      <ProcessBand content={copy.home.process} index="03" />
      <Gallery
        images={copy.home.gallery.images}
        caption={copy.home.gallery.caption}
        index="04"
      />
      <Cta content={copy.home.cta} />
    </PageShell>
  );
}
