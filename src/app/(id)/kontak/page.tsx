import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";
import { getContent } from "@/server/content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getContent("id");
  return { title: { absolute: meta.contact.title }, description: meta.contact.description };
}

export default async function Page() {
  const copy = await getContent("id");

  return (
    <PageShell locale="id" page="contact" solidNav>
      <Contact content={copy.contact} />
    </PageShell>
  );
}
