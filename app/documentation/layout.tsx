import type { Metadata } from "next";
import Link from "next/link";
import SynapseOasisLogo from "../components/SynapseOasisLogo";
import DocsSearch from "./components/DocsSearch";
import { searchIndex, DOCS_ROOT } from "./lib";

export const metadata: Metadata = {
  title: {
    default: "Documentation | SynapseOasis",
    template: "%s | SynapseOasis Docs",
  },
  description:
    "Documentation for the SynapseOasis apps for Jira, Jira Service Management and Confluence: setup, configuration, and how every feature works.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const items = searchIndex();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      {/* Header — deliberately separate from the marketing site navigation. */}
      <header
        className="sticky top-0 z-50"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px dashed var(--border)" }}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-3 flex items-center gap-4 md:gap-8">
          <span className="flex items-center gap-2.5 shrink-0">
            {/* The wordmark goes home; "Docs" goes to the documentation index. */}
            <Link href="/" className="flex items-center gap-2.5">
              <SynapseOasisLogo size={26} />
              <span className="font-bold text-[13px] uppercase tracking-wider" style={{ color: "var(--navy)" }}>
                SynapseOasis
              </span>
            </Link>
            <Link href={DOCS_ROOT} className="text-[13px]" style={{ color: "var(--grey)" }}>
              Docs
            </Link>
          </span>

          <div className="flex-1 max-w-md ml-auto">
            <DocsSearch items={items} />
          </div>

          <a
            href="https://synapseoasis.atlassian.net/servicedesk/customer/portals"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-[12.5px] font-semibold shrink-0"
            style={{ color: "var(--blue-cta)" }}
          >
            Support portal
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer style={{ background: "var(--navy-deep)" }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SynapseOasisLogo size={22} />
            <span className="font-bold text-white text-[11px] uppercase tracking-wider" style={{ opacity: 0.7 }}>
              SynapseOasis Documentation
            </span>
          </div>
          <div className="flex items-center gap-5 text-[11.5px]">
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.5)" }}>
              Privacy policies
            </Link>
            <a
              href="https://synapseoasis.atlassian.net/servicedesk/customer/portals"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Support
            </a>
            <a href="mailto:contact@synapseoasis.com" style={{ color: "rgba(255,255,255,0.5)" }}>
              contact@synapseoasis.com
            </a>
          </div>
          <p className="text-[11px] m-0" style={{ color: "rgba(255,255,255,0.18)" }}>
            &copy; 2026 SynapseOasis
          </p>
        </div>
      </footer>
    </div>
  );
}
