import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { allApps, pageHref, hasPrivacyPolicy } from "./lib";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Setup and usage documentation for every SynapseOasis app for Jira, Jira Service Management and Confluence.",
  alternates: { canonical: "/documentation" },
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function DocsIndex() {
  // "Start here" is the shared introduction, not an app: it gets its own banner
  // above the grid so nobody looks for it in the Marketplace.
  const all = allApps();
  const intro = all.find((a) => a.slug === "start-here");
  const apps = all.filter((a) => a.slug !== "start-here");

  return (
    <div className="max-w-[1180px] mx-auto px-5 md:px-8 py-14 md:py-20">
      <header className="max-w-2xl mb-14">
        <span
          className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
          style={{ background: "rgba(43,46,216,0.07)", color: "var(--blue-cta)" }}
        >
          Documentation
        </span>
        <h1
          className="font-semibold mt-5 mb-4"
          style={{ color: "var(--navy)", fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          How every SynapseOasis app works
        </h1>
        <p className="text-[15.5px] leading-relaxed" style={{ color: "var(--grey)" }}>
          Installation, configuration and feature-by-feature guides for our apps for Jira, Jira Service
          Management and Confluence. Every app runs on Atlassian Forge, so setup happens entirely inside your
          own site — there is no external service to provision and no credentials to hand over.
        </p>
      </header>

      {intro && (
        <Link
          href={pageHref(intro.slug, intro.pages[0].slug)}
          className="block rounded-xl p-6 md:p-7 mb-8 transition-colors hover:bg-white"
          style={{ background: "var(--offwhite)", border: "1px dashed var(--border)" }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ background: "rgba(43,46,216,0.1)", color: "var(--blue-cta)" }}
            >
              New to Jira administration?
            </span>
            <span className="text-[15px] font-bold" style={{ color: "var(--navy)" }}>
              Start here
            </span>
          </div>
          <p className="text-[14px] leading-relaxed m-0 max-w-3xl" style={{ color: "#3F4756" }}>
            {intro.tagline}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
            {intro.pages.map((p) => (
              <span key={p.slug} className="text-[12.5px]" style={{ color: "var(--blue-cta)" }}>
                {p.title}
              </span>
            ))}
          </div>
        </Link>
      )}

      <div className="grid md:grid-cols-2 gap-px" style={{ border: "1px dashed var(--border)" }}>
        {apps.map((app, i) => (
          <div
            key={app.slug}
            className="p-7 md:p-8 h-full"
            style={{
              background: "#fff",
              borderRight: i % 2 === 0 ? "1px dashed var(--border)" : "none",
              borderBottom: i < apps.length - (apps.length % 2 === 0 ? 2 : 1) ? "1px dashed var(--border)" : "none",
            }}
          >
            <div className="flex items-start gap-4">
              <Image src={app.icon} alt="" width={44} height={44} className="rounded-lg shrink-0" />
              <div className="min-w-0">
                <h2
                  className="font-bold m-0"
                  style={{ color: "var(--navy)", fontSize: 16.5, lineHeight: 1.25, letterSpacing: "-0.01em" }}
                >
                  {app.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="text-[11px]" style={{ color: "var(--grey)" }}>
                    {app.products}
                  </span>
                  {app.ai && (
                    <span
                      className="text-[9.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(126,124,222,0.12)", color: "var(--purple)" }}
                    >
                      Forge LLM
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[14px] leading-relaxed mt-4 mb-5" style={{ color: "#3F4756" }}>
              {app.tagline}
            </p>

            <ul className="mb-6 space-y-1.5">
              {app.pages.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={pageHref(app.slug, p.slug)}
                    className="text-[13px] hover:underline underline-offset-2"
                    style={{ color: "var(--blue-cta)" }}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
              {app.pages.length > 5 && (
                <li className="text-[12px]" style={{ color: "var(--grey)" }}>
                  + {app.pages.length - 5} more {app.pages.length - 5 === 1 ? "page" : "pages"}
                </li>
              )}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={pageHref(app.slug, app.pages[0].slug)}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
                style={{ color: "var(--navy)" }}
              >
                Read the docs <ArrowIcon />
              </Link>
              {hasPrivacyPolicy(app.slug) && (
                <Link href={`/privacy/${app.slug}`} className="text-[12px]" style={{ color: "var(--grey)" }}>
                  Privacy policy
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-12 rounded-xl p-7 md:p-9 flex flex-wrap items-center justify-between gap-6"
        style={{ background: "var(--offwhite)", border: "1px dashed var(--border)" }}
      >
        <div className="max-w-xl">
          <h2
            className="font-bold m-0 mb-2"
            style={{ color: "var(--navy)", fontSize: 18, lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            Need something these pages do not answer?
          </h2>
          <p className="text-[14px] leading-relaxed m-0" style={{ color: "#3F4756" }}>
            Our support portal takes questions, bug reports and feature requests for every app. Include your
            site URL and the app name and we can usually reproduce an issue on the first pass.
          </p>
        </div>
        <a
          href="https://synapseoasis.atlassian.net/servicedesk/customer/portals"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          Open the support portal <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
