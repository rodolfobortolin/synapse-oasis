import type { ReactNode } from "react";
import {
  ATL,
  Bar,
  Btn,
  Checkbox,
  PageTitle,
  Panel,
  Row,
  Screen,
  SectionLabel,
  Select,
  Sub,
  Tabs,
} from "./ui";

/* ── The space page: the export screen ────────────────────────────────── */
/* No tab strip: import is gone, and a tab strip with one tab is just chrome. */

const exportTab = (
  <Screen where="Confluence space → Markdown Toolkit → Export">
    <PageTitle>Markdown Toolkit</PageTitle>

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

    <SectionLabel>Options</SectionLabel>
    <Checkbox on label="Include attachments" />
    <Checkbox on label="Generate index file" />

    <div className="mt-4">
      <Row gap={8}>
        <Btn variant="primary">Export</Btn>
        <Btn>Export Entire Space</Btn>
        <Btn variant="subtle">Bulk Export</Btn>
      </Row>
    </div>

    <div className="mt-5">
      <Panel tone="info" title="Converting pages (9/14)…">
        <Bar pct={64} tone={ATL.primary} label="Fetching page tree → Converting pages → Fetching attachments → Finalizing" />
      </Panel>
    </div>
  </Screen>
);

/* ── Content action on a single page ───────────────────────────────────── */

const contentAction = (
  <Screen where="Confluence page → ••• → Export to Markdown" width={560}>
    <PageTitle>Export to Markdown</PageTitle>
    <Sub>Incident response — Runbooks — Engineering Handbook</Sub>

    <Checkbox on label="This page only" />
    <Checkbox on={false} label="This page and all children" />
    <div className="mt-2">
      <Checkbox on label="Export as single file" />
      <Checkbox on={false} label="Include attachments" />
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
  "md-content-action": contentAction,
  "md-macro-editor": macroEditor,
  "md-macro-rendered": macroRendered,
};
