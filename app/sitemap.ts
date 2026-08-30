import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/data";
import { DOCS_BASELINE, allApps, flatPages } from "./documentation/lib";
import { PRIVACY_FACTS } from "./privacy/facts";

const SITE_URL = "https://synapseoasis.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const latestPost = posts[0]?.date ? new Date(posts[0].date) : new Date("2026-05-31");

  // /about is a redirect to /#about (the homepage section), so it is intentionally
  // excluded from the sitemap — only real, indexable URLs belong here.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: latestPost, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Documentation and the per-app privacy policies are not linked from the marketing
  // navigation yet, so the sitemap is how they get discovered.
  //
  // Each app carries its own `updated` date. These used to take the newest blog
  // post's date instead, which moved every documentation URL whenever an
  // unrelated article was published -- a `lastmod` that is wrong in both
  // directions is worse than no `lastmod` at all.
  const docsUpdated = (iso?: string) => new Date(iso ?? DOCS_BASELINE);
  const newestDoc = new Date(
    Math.max(...allApps().map((a) => docsUpdated(a.updated).getTime()))
  );

  const docRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/documentation`, lastModified: newestDoc, changeFrequency: "monthly", priority: 0.7 },
    ...flatPages().map((f) => ({
      url: `${SITE_URL}${f.href}`,
      lastModified: docsUpdated(f.app.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const privacyRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy`, lastModified: latestPost, changeFrequency: "yearly", priority: 0.4 },
    ...PRIVACY_FACTS.map((p) => ({
      url: `${SITE_URL}/privacy/${p.slug}`,
      lastModified: latestPost,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...docRoutes, ...privacyRoutes];
}
