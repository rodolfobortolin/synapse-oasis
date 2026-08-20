import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocsContent from "../../documentation/components/DocsContent";
import { buildPolicy } from "../build";
import { PRIVACY_FACTS, findPrivacy, UPDATED } from "../facts";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRIVACY_FACTS.map((p) => ({ app: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ app: string }> }): Promise<Metadata> {
  const { app } = await params;
  const facts = findPrivacy(app);
  if (!facts) return { title: "Privacy policy" };
  return {
    title: `${facts.name} — Privacy policy`,
    description: `Privacy policy for ${facts.name}: what the app stores in your Atlassian tenant, what it only reads in memory, and how the data is deleted. Last updated ${UPDATED}.`,
    alternates: { canonical: `/privacy/${facts.slug}` },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ app: string }> }) {
  const { app } = await params;
  const facts = findPrivacy(app);
  if (!facts) notFound();

  return (
    <div className="max-w-[820px] mx-auto px-5 md:px-8 py-12 md:py-16">
      <div className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "var(--grey)" }}>
        <Link href="/privacy" className="hover:opacity-75">
          Privacy policies
        </Link>
        <span>/</span>
        <span style={{ color: "var(--navy)" }}>{facts.name}</span>
      </div>

      <div className="flex items-center gap-3.5 mb-8">
        <Image src={facts.icon} alt="" width={40} height={40} className="rounded-lg shrink-0" />
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--purple)" }}>
            {facts.products}
          </div>
          <Link
            href={`/documentation/${facts.slug}/overview`}
            className="text-[12.5px] font-semibold hover:underline underline-offset-2"
            style={{ color: "var(--blue-cta)" }}
          >
            Documentation for this app →
          </Link>
        </div>
      </div>

      <DocsContent
        title={`${facts.name} — Privacy policy`}
        description="What this app stores inside your Atlassian tenant, what it only reads in memory, who it shares data with, and how everything is deleted."
        blocks={buildPolicy(facts)}
      />
    </div>
  );
}
