import Link from "next/link";
import { getAllPosts } from "./data";
import NavBar from "../components/NavBar";
import SynapseOasisLogo from "../components/SynapseOasisLogo";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SITE_URL = "https://synapseoasis.com";
const BLOG_DESC =
  "Data-driven insights on IT service desk costs, ticket quality, portal abandonment, language barriers, escalation, license waste, secrets sprawl, and AI-native workflows — and how SynapseOasis apps fix them.";

export const metadata = {
  title: "Blog | SynapseOasis — AI for Jira & Jira Service Management",
  description: BLOG_DESC,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "SynapseOasis",
    title: "SynapseOasis Blog — The Hidden Costs of Enterprise Service Management",
    description: BLOG_DESC,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "SynapseOasis Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SynapseOasis Blog",
    description: BLOG_DESC,
    images: [`${SITE_URL}/og-image.png`],
  },
};

// Same header/menu as the main site (anchors point back to the homepage sections).
const NAV_LINKS = [
  { label: "What We Build", href: "/#what-we-build" },
  { label: "Our Approach", href: "/#approach" },
  { label: "Blog", href: "/blog", active: true },
  { label: "About", href: "/#about" },
  { label: "Support", href: "https://synapseoasis.atlassian.net/servicedesk/customer/portals" },
  { label: "Contact", href: "/#contact" },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen">
      <NavBar links={NAV_LINKS} ctaHref="/#contact" ctaLabel="Contact Us" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20" style={{ background: "var(--hero-gradient)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <span
            className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full mb-6"
            style={{ background: "rgba(236,133,70,0.15)", color: "#EC8546", border: "1px solid rgba(236,133,70,0.3)" }}
          >
            Research &amp; Insights
          </span>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.04em" }}>
            The Hidden Costs of
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Enterprise Service Management.</span>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            Data-driven analysis of the most expensive problems in enterprise IT service management — backed by research
            from Gartner, MetricNet, HappySignals, and more — and how SynapseOasis apps solve them.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 md:py-24 geo-pattern">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article
                  className="relative h-full rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl flex flex-col"
                  style={{ background: "white", border: "1px dashed var(--border)" }}
                >
                  {/* Color accent bar (replaces the thumbnail's visual weight) */}
                  <span style={{ display: "block", height: 4, background: post.tagColor }} />

                  {/* Stat kicker band */}
                  <div
                    className="px-8 md:px-10 pt-7 pb-6"
                    style={{ background: `${post.tagColor}0D`, borderBottom: "1px dashed var(--border)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: post.tagColor }}>
                        {post.tag}
                      </span>
                      <span className="text-[11px]" style={{ color: "var(--grey)" }}>
                        {post.readTime}
                      </span>
                    </div>
                    <div
                      className="font-bold"
                      style={{ fontFamily: "var(--font-mono)", color: post.tagColor, fontSize: "clamp(26px, 3.2vw, 38px)", lineHeight: 1, letterSpacing: "-0.02em" }}
                    >
                      {post.kicker}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-8 md:px-10 py-7 flex flex-col flex-1">
                    <h3
                      className="font-bold mb-3 transition-colors group-hover:text-[var(--blue-cta)]"
                      style={{ color: "var(--navy)", fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.25, letterSpacing: "-0.02em" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--grey)" }}>
                      {post.subtitle}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded"
                        style={{ background: "rgba(43,46,216,0.06)", color: "var(--blue-cta)", border: "1px solid rgba(43,46,216,0.1)" }}
                      >
                        {post.app}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-all group-hover:gap-2.5"
                        style={{ color: post.tagColor }}
                      >
                        Read article <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "var(--navy)" }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4" style={{ letterSpacing: "-0.03em" }}>
            Ready to Eliminate These Costs?
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            SynapseOasis apps tackle misrouting, incomplete tickets, portal abandonment, language barriers, and
            escalation — natively on Jira and Jira Service Management, running entirely on Atlassian Forge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact" className="cta-button">
              Request a Demo <ArrowIcon />
            </Link>
            <a
              href="https://synapseoasis.atlassian.net/servicedesk/customer/portals"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button-outline"
            >
              Visit Support Portal <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--navy-deep)", borderTop: "1px dashed rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SynapseOasisLogo size={24} />
            <span className="font-bold text-white text-xs uppercase tracking-wider" style={{ opacity: 0.7 }}>
              SynapseOasis
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; 2026 SynapseOasis. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
