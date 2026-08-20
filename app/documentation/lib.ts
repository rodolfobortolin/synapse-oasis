import { APP_DOCS } from "./content";
import { PRIVACY_FACTS } from "../privacy/facts";
import type { AppDocs, Block, DocPage } from "./types";

export const DOCS_ROOT = "/documentation";

export function allApps(): AppDocs[] {
  return APP_DOCS;
}

/** "Start here" is documentation, not an app, so it has no privacy policy. */
export function hasPrivacyPolicy(slug: string): boolean {
  return PRIVACY_FACTS.some((p) => p.slug === slug);
}

export function findApp(slug: string): AppDocs | undefined {
  return APP_DOCS.find((a) => a.slug === slug);
}

export function findPage(appSlug: string, pageSlug: string): { app: AppDocs; page: DocPage } | undefined {
  const app = findApp(appSlug);
  if (!app) return undefined;
  const page = app.pages.find((p) => p.slug === pageSlug);
  return page ? { app, page } : undefined;
}

export function pageHref(appSlug: string, pageSlug: string): string {
  return `${DOCS_ROOT}/${appSlug}/${pageSlug}`;
}

/** Every page in sidebar order — drives prev/next navigation. */
export function flatPages(): { app: AppDocs; page: DocPage; href: string }[] {
  return APP_DOCS.flatMap((app) =>
    app.pages.map((page) => ({ app, page, href: pageHref(app.slug, page.slug) }))
  );
}

/** Strip inline markup so text can go into a search index or a TOC entry. */
export function plain(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function slugify(text: string): string {
  return plain(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface Anchor {
  id: string;
  title: string;
  level: 2 | 3;
}

/**
 * Anchors for the headings of a page. Built from the block list so the ids used by
 * the table of contents and by the rendered headings can never disagree.
 */
export function headingAnchors(blocks: Block[]): Map<number, Anchor> {
  const out = new Map<number, Anchor>();
  const seen = new Map<string, number>();
  blocks.forEach((b, i) => {
    if (b.type !== "h") return;
    const base = slugify(b.text) || `section-${i}`;
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.set(i, { id: n === 0 ? base : `${base}-${n + 1}`, title: plain(b.text), level: b.level });
  });
  return out;
}

export interface SearchItem {
  title: string;
  app: string;
  href: string;
  description: string;
  /** Flattened page text, lowercased, for substring matching. */
  body: string;
}

export function searchIndex(): SearchItem[] {
  return flatPages().map(({ app, page, href }) => {
    const parts: string[] = [page.title, page.description];
    for (const b of page.blocks) {
      switch (b.type) {
        case "p":
        case "h":
          parts.push(b.text);
          break;
        case "list":
        case "steps":
          parts.push(...b.items);
          break;
        case "fields":
          parts.push(...b.items.map((f) => `${f.name} ${f.text}`));
          break;
        case "table":
          parts.push(...b.head, ...b.rows.flat());
          break;
        case "callout":
          parts.push(b.title ?? "", b.text);
          break;
        case "code":
          parts.push(b.text);
          break;
      }
    }
    return {
      title: page.title,
      app: app.shortName,
      href,
      description: page.description,
      body: plain(parts.join(" ")).toLowerCase(),
    };
  });
}
