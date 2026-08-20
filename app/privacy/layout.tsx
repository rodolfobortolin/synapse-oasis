import type { Metadata } from "next";
import Link from "next/link";
import SynapseOasisLogo from "../components/SynapseOasisLogo";

export const metadata: Metadata = {
  title: {
    default: "Privacy policies | SynapseOasis",
    template: "%s | SynapseOasis",
  },
  description:
    "Privacy policy for every SynapseOasis app for Jira, Jira Service Management and Confluence: what each app stores, what it only reads, and how the data is deleted.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <header style={{ borderBottom: "1px dashed var(--border)" }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-3.5 flex items-center gap-4">
          <Link href="/privacy" className="flex items-center gap-2.5">
            <SynapseOasisLogo size={26} />
            <span className="flex items-baseline gap-2">
              <span className="font-bold text-[13px] uppercase tracking-wider" style={{ color: "var(--navy)" }}>
                SynapseOasis
              </span>
              <span className="text-[13px]" style={{ color: "var(--grey)" }}>
                Privacy
              </span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-5 text-[12.5px]">
            <Link href="/documentation" style={{ color: "var(--blue-cta)" }} className="font-semibold">
              Documentation
            </Link>
            <a
              href="https://synapseoasis.atlassian.net/servicedesk/customer/portals"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--grey)" }}
            >
              Support
            </a>
          </div>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer style={{ background: "var(--navy-deep)" }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SynapseOasisLogo size={22} />
            <span className="font-bold text-white text-[11px] uppercase tracking-wider" style={{ opacity: 0.7 }}>
              SynapseOasis
            </span>
          </div>
          <a href="mailto:support@synapseoasis.com" className="text-[11.5px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            support@synapseoasis.com
          </a>
          <p className="text-[11px] m-0" style={{ color: "rgba(255,255,255,0.18)" }}>
            &copy; 2026 SynapseOasis
          </p>
        </div>
      </footer>
    </div>
  );
}
