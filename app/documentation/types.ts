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
  | { type: "mock"; id: string; caption?: string }
  /**
   * A Mermaid diagram, drawn in the browser by ../components/DiagramBlock.
   *
   * `text` is the diagram source exactly as it would sit inside a ```mermaid
   * fence in the app's macro, so the page shows the reader the same thing they
   * would type. `label` names the diagram type in the panel header.
   */
  | { type: "diagram"; text: string; caption?: string; label?: string }
  /**
   * A Markdown snippet containing LaTeX, typeset in the browser by KaTeX the
   * way the macro typesets it. Use it where the page claims maths renders --
   * showing the `$$…$$` source instead reads as the feature being broken.
   */
  | { type: "math"; text: string; caption?: string; label?: string };

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
