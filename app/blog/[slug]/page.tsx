import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostSlugs } from "../data";
import BlogContent from "./BlogContent";
import NavBar from "../../components/NavBar";
import SynapseOasisLogo from "../../components/SynapseOasisLogo";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Same header/menu as the main site (anchors point back to the homepage sections).
const NAV_LINKS = [
  { label: "What We Build", href: "/#what-we-build" },
  { label: "Our Approach", href: "/#approach" },
  { label: "Blog", href: "/blog", active: true },
  { label: "Docs", href: "/documentation" },
  { label: "About", href: "/#about" },
  { label: "Support", href: "https://synapseoasis.atlassian.net/servicedesk/customer/portals" },
  { label: "Contact", href: "/#contact" },
];

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

const SITE_URL = "https://synapseoasis.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog | SynapseOasis" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | SynapseOasis Blog`,
    description: post.subtitle,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.subtitle,
      siteName: "SynapseOasis",
      publishedTime: post.date,
      authors: ["SynapseOasis"],
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const related = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.subtitle,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.app,
    keywords: [post.tag, post.app, "Jira", "Atlassian Forge", "SynapseOasis"],
    image: `${SITE_URL}/og-image.png`,
    author: { "@type": "Organization", name: "SynapseOasis", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "SynapseOasis",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar links={NAV_LINKS} ctaHref="/#contact" ctaLabel="Contact Us" />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16" style={{ background: "var(--hero-gradient)" }}>
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-8 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: post.tagColor }}>
              {post.tag}
            </span>
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              {post.readTime}
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              {post.app}
            </span>
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
            {post.title}
          </h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            {post.subtitle}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <BlogContent content={post.content} tagColor={post.tagColor} />

          {/* App CTA tying the problem to the product */}
          <div
            className="mt-14 rounded-xl p-8 md:p-10"
            style={{ background: "var(--offwhite)", border: "1px dashed var(--border)" }}
          >
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: post.tagColor }}>
              {post.app}
            </span>
            <h3 className="font-bold mt-3 mb-3" style={{ color: "var(--navy)", fontSize: 22, letterSpacing: "-0.02em" }}>
              See how {post.app} solves this.
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--grey)" }}>
              {post.app} runs natively on Atlassian Forge — no external infrastructure, no data leaving your tenant.
              Let&apos;s show you how it fits your service desk.
            </p>
            <Link href="/#contact" className="cta-button">
              Request a Demo <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      <section className="py-12 md:py-16 geo-pattern" style={{ borderTop: "1px dashed var(--border)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <h2 className="font-bold mb-8" style={{ color: "var(--navy)", fontSize: 24, letterSpacing: "-0.02em" }}>
            Continue Reading
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                <article
                  className="h-full rounded-lg p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                  style={{ background: "white", border: "1px dashed var(--border)", borderLeft: `3px solid ${p.tagColor}` }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: p.tagColor }}>
                    {p.tag}
                  </span>
                  <h3
                    className="text-sm font-bold mt-2 mb-2 transition-colors group-hover:text-[var(--blue-cta)]"
                    style={{ color: "var(--navy)", lineHeight: 1.3 }}
                  >
                    {p.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: p.tagColor }}>
                    Read <ArrowIcon />
                  </span>
                </article>
              </Link>
            ))}
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
