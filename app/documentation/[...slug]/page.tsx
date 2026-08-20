import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocsContent from "../components/DocsContent";
import DocsSidebar from "../components/DocsSidebar";
import DocsToc from "../components/DocsToc";
import { allApps, findApp, findPage, flatPages, headingAnchors, pageHref, DOCS_ROOT } from "../lib";

export const dynamicParams = false;

export function generateStaticParams() {
  return allApps().flatMap((app) => app.pages.map((p) => ({ slug: [app.slug, p.slug] })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = slug.length === 2 ? findPage(slug[0], slug[1]) : undefined;
  if (!found) return { title: "Documentation" };
  return {
    title: `${found.page.title} — ${found.app.name}`,
    description: found.page.description,
    alternates: { canonical: pageHref(found.app.slug, found.page.slug) },
  };
}

const ArrowIcon = ({ back = false }: { back?: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <path
      d={back ? "M13 8H3M7 4L3 8l4 4" : "M3 8h10M9 4l4 4-4 4"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  // A bare app slug lands on that app's first page.
  if (slug.length === 1) {
    const app = findApp(slug[0]);
    if (!app) notFound();
    const target = pageHref(app.slug, app.pages[0].slug);
    return (
      <div className="max-w-[900px] mx-auto px-6 py-24 text-center">
        <p className="text-[15px] mb-4" style={{ color: "var(--grey)" }}>
          {app.name} documentation
        </p>
        <Link href={target} className="cta-button">
          Open {app.pages[0].title} <ArrowIcon />
        </Link>
      </div>
    );
  }

  const found = slug.length === 2 ? findPage(slug[0], slug[1]) : undefined;
  if (!found) notFound();
  const { app, page } = found;

  const anchors = [...headingAnchors(page.blocks).values()];
  const flat = flatPages();
  const index = flat.findIndex((f) => f.href === pageHref(app.slug, page.slug));
  const prev = index > 0 ? flat[index - 1] : undefined;
  const next = index >= 0 && index < flat.length - 1 ? flat[index + 1] : undefined;

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-8 flex gap-10">
      {/* Sidebar — desktop */}
      <div className="hidden lg:block w-[248px] shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <DocsSidebar activeApp={app.slug} activePage={page.slug} />
        </div>
      </div>

      <main className="flex-1 min-w-0 max-w-[820px]">
        {/* Sidebar — mobile, no JavaScript needed */}
        <details className="lg:hidden mb-6 rounded-lg" style={{ border: "1px dashed var(--border)" }}>
          <summary className="px-4 py-3 text-[13px] font-semibold cursor-pointer" style={{ color: "var(--navy)" }}>
            Browse documentation
          </summary>
          <div className="px-3 pb-3">
            <DocsSidebar activeApp={app.slug} activePage={page.slug} />
          </div>
        </details>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-7 text-[12px]" style={{ color: "var(--grey)" }}>
          <Link href={DOCS_ROOT} className="hover:opacity-75">
            Docs
          </Link>
          <span>/</span>
          <span className="flex items-center gap-1.5">
            <Image src={app.icon} alt="" width={14} height={14} className="rounded" />
            <Link href={pageHref(app.slug, app.pages[0].slug)} className="hover:opacity-75">
              {app.shortName}
            </Link>
          </span>
          <span>/</span>
          <span style={{ color: "var(--navy)" }}>{page.title}</span>
        </div>

        <DocsContent title={page.title} description={page.description} blocks={page.blocks} />

        {/* Prev / next */}
        <div className="mt-16 grid sm:grid-cols-2 gap-4" style={{ borderTop: "1px dashed var(--border)", paddingTop: 24 }}>
          {prev ? (
            <Link
              href={prev.href}
              className="rounded-lg p-4 transition-colors hover:bg-[var(--offwhite)]"
              style={{ border: "1px dashed var(--border)" }}
            >
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--grey)" }}>
                <ArrowIcon back /> Previous
              </span>
              <span className="block text-[14px] font-semibold mt-1.5" style={{ color: "var(--navy)" }}>
                {prev.page.title}
              </span>
              <span className="block text-[11.5px] mt-0.5" style={{ color: "var(--grey)" }}>
                {prev.app.shortName}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={next.href}
              className="rounded-lg p-4 transition-colors hover:bg-[var(--offwhite)] sm:text-right"
              style={{ border: "1px dashed var(--border)" }}
            >
              <span
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider sm:justify-end"
                style={{ color: "var(--grey)" }}
              >
                Next <ArrowIcon />
              </span>
              <span className="block text-[14px] font-semibold mt-1.5" style={{ color: "var(--navy)" }}>
                {next.page.title}
              </span>
              <span className="block text-[11.5px] mt-0.5" style={{ color: "var(--grey)" }}>
                {next.app.shortName}
              </span>
            </Link>
          )}
        </div>

        <p className="mt-10 text-[12.5px]" style={{ color: "var(--grey)" }}>
          Something missing or wrong on this page?{" "}
          <a
            href="https://synapseoasis.atlassian.net/servicedesk/customer/portals"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: "var(--blue-cta)" }}
          >
            Tell us in the support portal
          </a>{" "}
          or email{" "}
          <a href="mailto:support@synapseoasis.com" className="underline underline-offset-2" style={{ color: "var(--blue-cta)" }}>
            support@synapseoasis.com
          </a>
          .
        </p>
      </main>

      <DocsToc anchors={anchors} />
    </div>
  );
}
