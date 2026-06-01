import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/data";

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

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
