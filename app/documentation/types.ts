/**
 * Content model for the documentation section.
 *
 * Pages are plain data (one module per app under ./content) so the sidebar, the
 * search index, the table of contents and prev/next navigation can all be derived
 * from the same source instead of being maintained by hand.
 *
 * Inline markup allowed in every `text` field: **bold**, `code`, [label](href).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "fields"; items: { name: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "code"; text: string; label?: string }
  | { type: "callout"; variant: "info" | "warning" | "tip"; title?: string; text: string }
  /** Renders a simulated app screen from the mock registry (see ./mocks). */
  | { type: "mock"; id: string; caption?: string };

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  blocks: Block[];
}

export interface AppDocs {
  /** URL segment, e.g. "admin-toolkit". */
  slug: string;
  /** Marketplace name, e.g. "Admin Toolkit for Jira". */
  name: string;
  /** Short name used in the sidebar. */
  shortName: string;
  /** One line for the documentation index. */
  tagline: string;
  /** Atlassian products the app is installed into. */
  products: string;
  /** Accent color, matching the app icon. */
  color: string;
  /** Icon in /public. */
  icon: string;
  /** True when the app uses Forge LLM. */
  ai: boolean;
  pages: DocPage[];
}
