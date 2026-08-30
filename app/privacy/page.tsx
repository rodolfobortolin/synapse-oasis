import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PRIVACY_FACTS, UPDATED } from "./facts";

export const metadata: Metadata = {
  title: "Privacy policies",
  description:
    "One privacy policy per SynapseOasis app for Jira, Jira Service Management and Confluence — what each app stores, what it only reads, and how the data is deleted.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyIndex() {
  return (
    <div className="max-w-[900px] mx-auto px-5 md:px-8 py-12 md:py-16">
      <h1
        className="font-semibold mb-4"
        style={{ color: "var(--navy)", fontSize: "clamp(26px, 3.2vw, 36px)", lineHeight: 1.15, letterSpacing: "-0.03em" }}
      >
        Privacy policies
      </h1>
      <p className="text-[15.5px] leading-relaxed mb-8" style={{ color: "var(--grey)" }}>
        We publish a separate policy for every app, because every app stores something different. Each one lists the
        exact data held in your Atlassian tenant, the data that is only read in memory, and what happens on uninstall.
        Last updated {UPDATED}.
      </p>

      <div
        className="rounded-xl p-6 mb-10"
        style={{ background: "var(--offwhite)", border: "1px dashed var(--border)" }}
      >
        <h2
          className="font-bold m-0 mb-3"
          style={{ color: "var(--navy)", fontSize: 17, lineHeight: 1.3, letterSpacing: "-0.01em" }}
        >
          True of every SynapseOasis app
        </h2>
        <ul className="space-y-2">
          {[
            "Built on Atlassian Forge. Data is stored in your own Atlassian tenant, in your site's cloud region.",
            "No servers, databases or logs operated by SynapseOasis. We have no standing access to your data.",
            "AI features, where present, run on Atlassian's Forge LLM. No third-party AI provider, and nothing used to train a model.",
            "No analytics, tracking or telemetry. No sale or transfer of data to third parties.",
            "All stored data is deleted when the app is uninstalled.",
          ].map((t) => (
            <li key={t} className="flex gap-2.5 text-[14px] leading-relaxed" style={{ color: "#3F4756" }}>
              <span className="shrink-0 mt-[8px] w-1.5 h-1.5 rounded-full" style={{ background: "var(--purple)" }} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: "1px dashed var(--border)" }}>
        {PRIVACY_FACTS.map((p, i) => (
          <Link
            key={p.slug}
            href={`/privacy/${p.slug}`}
            className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--offwhite)]"
            style={{ borderTop: i === 0 ? "none" : "1px dashed var(--border)" }}
          >
            <Image src={p.icon} alt="" width={32} height={32} className="rounded shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-semibold" style={{ color: "var(--navy)" }}>
                {p.name}
              </div>
              <div className="text-[11.5px] mt-0.5" style={{ color: "var(--grey)" }}>
                {p.products}
                {p.ai && " · Forge LLM"}
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="var(--blue-cta)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ))}
      </div>

      <p className="text-[13px] mt-8" style={{ color: "var(--grey)" }}>
        Questions about any of these policies, or a data request?{" "}
        <a
          href="mailto:contact@synapseoasis.com"
          className="underline underline-offset-2"
          style={{ color: "var(--blue-cta)" }}
        >
          contact@synapseoasis.com
        </a>
      </p>
    </div>
  );
}
