import type { ReactNode } from "react";
import {
  ATL,
  Bar,
  Btn,
  Checkbox,
  Field,
  PageTitle,
  Panel,
  Row,
  Screen,
  SectionLabel,
  Select,
  Sub,
  Tabs,
  Toggle,
} from "./ui";

/* ── The space page: Export ────────────────────────────────── */
/* The destination picker is the first control on purpose: it moves the two
   switches under it, and it is what decides whether the archive opens at all
   on the other side. */

const exportTab = (
  <Screen where="Confluence space → Markdown Toolkit → Export">
    <Tabs items={["Export", "Import"]} active="Export" />

    <Select label="Select a space" value="Engineering Handbook (ENG)" width={320} />

    <SectionLabel>Select pages to export</SectionLabel>
    <Panel tone="subtle">
      <Row gap={8}>
        <Btn>Select All</Btn>
        <Btn variant="subtle">Deselect All</Btn>
        <span className="ml-auto text-[11px] self-center" style={{ color: ATL.subtle }}>
          14 of 62 pages selected
        </span>
      </Row>
      <div className="mt-3">
        {[
          { t: "Engineering Handbook", d: 0, on: true },
          { t: "Onboarding", d: 1, on: true },
          { t: "Day one checklist", d: 2, on: true },
          { t: "Local environment", d: 2, on: true },
          { t: "Runbooks", d: 1, on: false },
          { t: "Incident response", d: 2, on: false },
        ].map((p) => (
          <div key={p.t} style={{ paddingLeft: p.d * 18 }}>
            <Checkbox on={p.on} label={p.t} />
          </div>
        ))}
      </div>
    </Panel>

    <SectionLabel>Open the export in</SectionLabel>
    <div style={{ maxWidth: 340 }}>
      <Select value="Docusaurus" />
    </div>
    <div className="text-[11.5px] -mt-2 mb-3" style={{ color: ATL.subtle }}>
      A folder gets index.md, and sidebar_position carries the page order.
    </div>

    <Row gap={20}>
      <Toggle on label="Include attachments" />
      <Toggle on label="Add YAML front matter" />
    </Row>
    <div className="mt-2">
      <Row gap={20}>
        <Toggle on={false} label="Number files to keep page order" />
        <Toggle on label="Generate index file" />
      </Row>
    </div>

    <div className="mt-4">
      <Row gap={8}>
        <Btn variant="primary">Bulk Export (14)</Btn>
        <Btn>Export Entire Space</Btn>
      </Row>
    </div>

    <div className="mt-5">
      <Panel tone="info" title="Converting pages (9/14)…">
        <Bar pct={64} tone={ATL.primary} label="Fetching page tree → Converting pages → Fetching attachments → Finalizing" />
      </Panel>
    </div>
  </Screen>
);

/* ── The space page: Import ────────────────────────────────── */
/* The file list shows the folder depth, because the shape of the archive is
   the thing people get wrong, and "+2" beside a page is how you see that the
   images it refers to were found. */

const importTab = (
  <Screen where="Confluence space → Markdown Toolkit → Import">
    <Tabs items={["Export", "Import"]} active="Import" />

    <div
      className="rounded-md text-center py-7 px-4 mb-4"
      style={{ border: `2px dashed ${ATL.border}`, background: ATL.bgSubtle }}
    >
      <div className="text-[13px] font-medium">Drag and drop files here, or click to browse</div>
      <div className="text-[11px] mt-1" style={{ color: ATL.subtle }}>
        Supported: .md, .zip
      </div>
    </div>

    <SectionLabel>Files to import: 5 · 2 attachments</SectionLabel>
    <Panel tone="subtle">
      {[
        { t: "Guide", d: 0, att: 0 },
        { t: "Install", d: 1, att: 1 },
        { t: "Configure", d: 1, att: 0 },
        { t: "Troubleshooting", d: 2, att: 1 },
        { t: "Reference", d: 0, att: 0 },
      ].map((f) => (
        <div key={f.t} className="text-[12px] py-0.5" style={{ paddingLeft: f.d * 18 }}>
          {"\u{1F4C4}"} {f.t}
          {f.att > 0 && (
            <span className="ml-1 text-[11px]" style={{ color: ATL.subtle }}>
              + {f.att}
            </span>
          )}
        </div>
      ))}
    </Panel>

    <Field
      label="Import everything under a page called"
      value="Engineering Handbook (imported)"
      help="Created first, in your name — which is also the permission check."
      width={360}
    />

    <div style={{ maxWidth: 360 }}>
      <Select label="When a page with that title already exists" value="Leave the existing page alone" />
    </div>

    <Row gap={20}>
      <Toggle on label="Upload images and files the pages refer to" />
    </Row>
    <div className="mt-2">
      <Row gap={20}>
        <Toggle on label="Take the page title from the first heading" />
      </Row>
    </div>

    <div className="mt-4">
      <Btn variant="primary">Import (5)</Btn>
    </div>

    <div className="mt-5">
      <Panel tone="success" title="Import complete. 4 created, 1 skipped, 2 attachments.">
        <div className="text-[12px]" style={{ color: ATL.subtle }}>
          One page was left alone because a page with that title already existed.
        </div>
      </Panel>
    </div>
  </Screen>
);

/* ── Content action on a single page ──────────────────────── */

const contentAction = (
  <Screen where="Confluence page → ••• → Export to Markdown" width={560}>
    <PageTitle>Export to Markdown</PageTitle>
    <Sub>Incident response — Runbooks — Engineering Handbook</Sub>

    <Checkbox on label="This page only" />
    <Checkbox on={false} label="This page and all children" />
    <div className="mt-2">
      <Checkbox on={false} label="Export as single file" />
      <Checkbox on label="Include attachments" />
    </div>

    <div className="mt-3" style={{ maxWidth: 260 }}>
      <Select label="Open the export in" value="Obsidian" />
    </div>

    <div className="mt-4">
      <Panel tone="success" title="Export complete!">
        <Row gap={8}>
          <Btn variant="primary">Download</Btn>
          <Btn variant="subtle">New Export</Btn>
        </Row>
      </Panel>
    </div>
  </Screen>
);

/* ── Macro: editing ───────────────────────────────────────────────────── */

const macroEditor = (
  <Screen where="Confluence page → /Markdown macro → Write" width={720}>
    <Tabs items={["Write", "Preview"]} active="Write" />
    <Panel tone="subtle">
      <pre
        className="m-0 text-[11.5px] leading-relaxed whitespace-pre-wrap"
        style={{ fontFamily: "var(--font-mono, monospace)", color: ATL.text }}
      >{`## Deploy flow

> [!NOTE]
> Requires the release checklist to be complete.

\`\`\`mermaid
graph LR
  A[PR merged] --> B[CI]
  B --> C{Tests pass?}
  C -->|yes| D[Deploy staging]
  C -->|no| E[Block]
\`\`\`

| Stage | Owner | SLA |
|-------|-------|-----|
| CI    | Platform | 10 min |
| Staging | Release | 30 min |

Error budget: $1 - \\frac{failures}{requests}$`}</pre>
    </Panel>
    <Row gap={8}>
      <Btn variant="primary">Preview</Btn>
      <Btn variant="subtle">Cancel</Btn>
    </Row>
  </Screen>
);

/* ── Macro: rendered on the page ──────────────────────────────────────── */

const macroRendered = (
  <Screen where="Confluence page → Markdown macro (rendered)" width={720}>
    <h4 className="text-[16px] font-semibold m-0 mb-3">Deploy flow</h4>

    <div className="rounded-md p-3 mb-4" style={{ background: ATL.primaryBg, borderLeft: `3px solid ${ATL.primary}` }}>
      <div className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: ATL.primary }}>
        Note
      </div>
      <div className="text-[12.5px]">Requires the release checklist to be complete.</div>
    </div>

    {/* Mermaid-style diagram, drawn statically */}
    <div className="rounded-md p-4 mb-4" style={{ border: `1px solid ${ATL.border}` }}>
      <div className="flex items-center gap-2 flex-wrap text-[11px]">
        {["PR merged", "CI"].map((n) => (
          <span key={n} className="rounded px-2.5 py-1.5" style={{ background: ATL.primaryBg, color: ATL.primary }}>
            {n}
          </span>
        ))}
        <span style={{ color: ATL.subtle }}>→</span>
        <span
          className="px-3 py-1.5"
          style={{ background: ATL.yellowBg, color: ATL.yellow, transform: "skewX(-12deg)", display: "inline-block" }}
        >
          <span style={{ display: "inline-block", transform: "skewX(12deg)" }}>Tests pass?</span>
        </span>
        <span style={{ color: ATL.subtle }}>→</span>
        <span className="rounded px-2.5 py-1.5" style={{ background: ATL.greenBg, color: ATL.green }}>
          Deploy staging
        </span>
        <span className="rounded px-2.5 py-1.5" style={{ background: ATL.redBg, color: ATL.red }}>
          Block
        </span>
      </div>
    </div>

    <table className="w-full border-collapse text-[12px] mb-4">
      <thead>
        <tr style={{ background: ATL.bgSubtle }}>
          {["Stage", "Owner", "SLA"].map((h) => (
            <th key={h} className="text-left px-3 py-1.5" style={{ border: `1px solid ${ATL.border}` }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          ["CI", "Platform", "10 min"],
          ["Staging", "Release", "30 min"],
        ].map((r) => (
          <tr key={r[0]}>
            {r.map((c) => (
              <td key={c} className="px-3 py-1.5" style={{ border: `1px solid ${ATL.border}` }}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    <div className="text-[12.5px]">
      Error budget: <em style={{ fontFamily: "Georgia, serif" }}>1 − failures / requests</em>{" "}
      <span className="text-[10px]" style={{ color: ATL.subtle }}>
        (rendered with KaTeX)
      </span>
    </div>
  </Screen>
);

export const MARKDOWN_TOOLKIT_MOCKS: Record<string, ReactNode> = {
  "md-export-tab": exportTab,
  "md-import-tab": importTab,
  "md-content-action": contentAction,
  "md-macro-editor": macroEditor,
  "md-macro-rendered": macroRendered,
};
