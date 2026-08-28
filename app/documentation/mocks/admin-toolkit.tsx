import type { ReactNode } from "react";
import {
  ATL,
  Avatar,
  Bar,
  Btn,
  Checkbox,
  Code,
  Field,
  Lozenge,
  PageTitle,
  Panel,
  Row,
  Screen,
  SectionLabel,
  Select,
  Stat,
  Sub,
  Table,
} from "./ui";

/* ── The tool list ─────────────────────────────────────────────────────── */

function ToolCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-md p-3" style={{ border: `1px solid ${ATL.border}`, background: ATL.bg }}>
      <div className="text-[12.5px] font-semibold mb-1">{title}</div>
      <div className="text-[11px] leading-snug" style={{ color: ATL.subtle }}>
        {desc}
      </div>
    </div>
  );
}

const toolList = (
  <Screen where="Jira → Apps → Admin Toolkit" width={880}>
    <PageTitle>Admin Tools</PageTitle>
    <Sub>Jira administration utilities.</Sub>

    <SectionLabel>Projects</SectionLabel>
    <div className="grid grid-cols-3 gap-2.5">
      <ToolCard title="Projects Manager" desc="View and manage all projects with inline editing for names, keys and leads." />
      <ToolCard title="Project Activity" desc="Visualise issue creation activity across all projects over the last 12 months." />
    </div>

    <SectionLabel>Configuration</SectionLabel>
    <div className="grid grid-cols-3 gap-2.5">
      <ToolCard title="Unused Schemes Cleanup" desc="Find and remove unused configuration schemes to keep your instance clean." />
      <ToolCard title="Custom Fields Health Assessment" desc="Assess custom fields for cleanup, consolidation, naming, searchability and option quality." />
      <ToolCard title="Custom Field Merger" desc="Merge duplicate custom fields by generating CSV import files and replacing screen references." />
      <ToolCard title="Field Screens Migrator" desc="Swap one field for another on every screen where it appears — same tab, same position." />
      <ToolCard title="Filter Management" desc="Audit saved filters, review sharing permissions and take bulk actions." />
      <ToolCard title="Scheme Deduplication" desc="Find duplicate schemes that share the same settings and can be consolidated." />
      <ToolCard title="Workflow Health" desc="Scan workflows for bad practices — oversized workflows, unreachable statuses, and start/end statuses in the wrong category." />
    </div>

    <SectionLabel>Users</SectionLabel>
    <div className="grid grid-cols-3 gap-2.5">
      <ToolCard title="Mirror User" desc="Copy project roles and groups from one user to another." />
      <ToolCard title="User Analysis" desc="Import Atlassian Admin CSV exports to analyse users, licences and generate recommendations." />
      <ToolCard title="User Offboarding" desc="Find and transfer all ownership and role assignments from a departing user." />
    </div>

    <SectionLabel>Migration</SectionLabel>
    <div className="grid grid-cols-3 gap-2.5">
      <ToolCard title="Migrated Fields Cleaner" desc="Remove “(migrated)” tags from field names, descriptions and configurations." />
      <ToolCard title="Migrated Project Roles Cleanup" desc="Remove “migrated” suffixes and consolidate users and groups back to original roles." />
    </div>

    <div className="mt-5">
      <Panel tone="info" title="Missing a tool?">
        <Row gap={10}>
          <span className="text-[11.5px] self-center">
            Tell us which Jira admin task is eating your time and we will consider building it.
          </span>
          <Btn variant="primary">Suggest a tool</Btn>
        </Row>
      </Panel>
    </div>
  </Screen>
);

/* ── Projects Manager ──────────────────────────────────────────────────── */

const projectsManager = (
  <Screen where="Admin Toolkit → Projects Manager" width={880}>
    <PageTitle action={<Btn variant="primary">Load Projects</Btn>}>Projects Manager</PageTitle>
    <Sub>View and manage all projects with inline editing for names, keys and leads.</Sub>

    <Table
      head={["", "Name", "Key", "Style", "Lead", "Issues", "Last Updated", "Issue Type Scheme"]}
      rows={[
        [
          <Checkbox key="c" on label="" />,
          "Operations",
          <Code key="k">OPS</Code>,
          <Lozenge key="s" tone="info">Company Managed</Lozenge>,
          <Row key="l" gap={5}>
            <Avatar initials="MR" color="#6554C0" />
            <span>Marina Rocha</span>
          </Row>,
          "12,481",
          "Just now",
          "OPS: Scrum Issue Type Scheme",
        ],
        [
          <Checkbox key="c" on label="" />,
          "Legacy CRM",
          <Code key="k">CRM</Code>,
          <Lozenge key="s" tone="purple">Team Managed</Lozenge>,
          <Row key="l" gap={5}>
            <Avatar initials="JL" color="#00A3BF" />
            <span>João Lima</span>
          </Row>,
          "318",
          "Never updated",
          "Default Issue Type Scheme",
        ],
      ]}
    />

    <div className="mt-4">
      <Panel tone="subtle" title="Bulk actions — 2 projects selected">
        <Row gap={8}>
          <Btn>Change Lead</Btn>
          <Btn>Transfer Lead</Btn>
          <Btn variant="danger">Archive</Btn>
          <Btn>Restore</Btn>
          <Btn variant="subtle">Confirm changes</Btn>
        </Row>
      </Panel>
    </div>
  </Screen>
);

/* ── Project Activity ──────────────────────────────────────────────────── */

const projectActivity = (
  <Screen where="Admin Toolkit → Project Activity" width={880}>
    <PageTitle
      action={
        <Row gap={8}>
          <Btn>Export CSV</Btn>
          <Btn variant="primary">Re-scan</Btn>
        </Row>
      }
    >
      Project Activity
    </PageTitle>
    <Sub>Issue creation activity across all projects over the last 12 months. Last scan: today 07:40 UTC.</Sub>

    <Row gap={10}>
      <Stat value="142" label="Total Projects" />
      <Stat value="61" label="Active (3mo)" tone={ATL.green} />
      <Stat value="28" label="Moderate (3-6mo)" tone={ATL.primary} />
      <Stat value="53" label="Low / Dormant" tone={ATL.red} />
    </Row>

    <div className="mt-4">
      <Table
        head={["Project", "Issues Created (12mo)", "Last Active", "Status"]}
        rows={[
          ["Operations (OPS)", "4,182", "today", <Lozenge key="s" tone="success">Active</Lozenge>],
          ["Support (SUP)", "2,904", "today", <Lozenge key="s" tone="success">Active</Lozenge>],
          ["Marketing Site (MKT)", "94", "4 months ago", <Lozenge key="s" tone="warn">Moderate</Lozenge>],
          ["Legacy CRM (CRM)", "0", "2 years ago", <Lozenge key="s" tone="danger">Dormant</Lozenge>],
        ]}
      />
    </div>
  </Screen>
);

/* ── Custom Fields Health Assessment ───────────────────────────────────── */

const cfAssessment = (
  <Screen where="Admin Toolkit → Custom Fields Health Assessment" width={880}>
    <PageTitle
      action={
        <Row gap={8}>
          <Btn>Export CSV</Btn>
          <Btn>Export PDF</Btn>
        </Row>
      }
    >
      Custom Fields Health Assessment
    </PageTitle>
    <Sub>Cleanup, consolidation, naming, searchability and option quality across every custom field.</Sub>

    <Row gap={10}>
      <Stat value="1,916" label="Custom fields" />
      <Stat value="412" label="Empty fields" tone={ATL.red} />
      <Stat value="88" label="Duplicate definitions" tone={ATL.yellow} />
      <Stat value="203" label="Migration residue" tone={ATL.purple} />
    </Row>

    <SectionLabel>Findings by category</SectionLabel>
    <Table
      head={["Category", "Fields", "Recommended action"]}
      rows={[
        ["Empty fields", "412", "Retire unused custom fields"],
        ["Duplicate definitions", "88", "Consolidate duplicate definitions"],
        ["Migration residue", "203", "Delete empty migrated copies"],
        ["Naming hygiene", "156", "Standardize field naming"],
        ["Option quality", "74", "Normalize select options and contexts"],
        ["Searchability", "61", "Review non-searchable migrated fields"],
        ["Redundant contexts", "39", "Normalize select options and contexts"],
      ]}
    />

    <div className="mt-4">
      <Panel tone="warn" title="High-priority actions">
        <div className="text-[12px] space-y-1">
          <div>• Retire 412 custom fields with no values on any issue.</div>
          <div>• Consolidate 88 duplicate definitions into 31 surviving fields.</div>
          <div>• 3 projects are within 50 fields of the 700-field limit.</div>
        </div>
      </Panel>
    </div>
  </Screen>
);

/* ── Custom Field Merger ───────────────────────────────────────────────── */

const cfMerger = (
  <Screen where="Admin Toolkit → Custom Field Merger" width={880}>
    <PageTitle>Custom Field Merger</PageTitle>
    <Sub>Merge duplicate custom fields by generating CSV import files and replacing screen references.</Sub>

    <Row gap={8}>
      <Btn variant="primary">Auto-Analyze</Btn>
      <Btn>Manual Select</Btn>
      <Btn variant="subtle">Re-Analyze</Btn>
    </Row>

    <SectionLabel>Mergeable group</SectionLabel>
    <Table
      head={["", "Field", "ID", "Issues", "Screens", "Role"]}
      rows={[
        [
          <Checkbox key="c" on label="" />,
          "Affected Service",
          <Code key="i">customfield_10233</Code>,
          "8,412",
          "6",
          <Lozenge key="r" tone="success">TARGET</Lozenge>,
        ],
        [
          <Checkbox key="c" on label="" />,
          "Service affected",
          <Code key="i">customfield_11042</Code>,
          "1,187",
          "3",
          <Lozenge key="r" tone="default">Source</Lozenge>,
        ],
        [
          <Checkbox key="c" on label="" />,
          "Affected service (migrated)",
          <Code key="i">customfield_11890</Code>,
          "204",
          "1",
          <Lozenge key="r" tone="default">Source</Lozenge>,
        ],
      ]}
    />

    <SectionLabel>Steps</SectionLabel>
    <Panel tone="subtle">
      <div className="text-[12px] space-y-1.5">
        <div>
          <strong>1.</strong> Generate CSV — <Code>1,391 rows generated</Code> · batch size 4,000
        </div>
        <div>
          <strong>2.</strong> Download the CSV and its Config file, then import them in Jira under{" "}
          <em>Settings → System → External System Import</em>. Repeat for each batch.
        </div>
        <div>
          <strong>3.</strong> Replace screen references — <Code>4 screens to update</Code>
        </div>
        <div>
          <strong>4.</strong> Move source fields to trash
        </div>
      </div>
      <Row gap={8}>
        <Btn variant="primary">Generate CSV</Btn>
        <Btn>Download All as ZIP</Btn>
        <Btn>Preview screens</Btn>
        <Btn>Replace on screens</Btn>
        <Btn variant="danger">Move to trash</Btn>
      </Row>
    </Panel>
  </Screen>
);

/* ── Unused schemes / dedup ────────────────────────────────────────────── */

const unusedSchemes = (
  <Screen where="Admin Toolkit → Unused Schemes Cleanup" width={880}>
    <PageTitle action={<Btn variant="primary">Scan for Unused Schemes</Btn>}>Unused Schemes Cleanup</PageTitle>
    <Sub>Pick one object type at a time. The selector is grouped by area.</Sub>

    {/* The grouped type selector, which is where the tool's real scope shows */}
    <Panel tone="subtle">
      {[
        ["Workflows", ["Workflow Schemes", "Workflows", "Statuses"], 0],
        ["Screens", ["Work Type Screen Schemes", "Screen Schemes", "Screens"], -1],
        ["Fields", ["Field Config Schemes", "Field Configurations"], -1],
        ["Work Types", ["Work Type Schemes", "Work Types"], -1],
        ["Priority", ["Priority Schemes", "Priorities"], -1],
        ["Resolutions", ["Resolutions"], -1],
        ["Security & Permissions", ["Issue Security Schemes", "Permission Schemes"], -1],
        ["Notifications", ["Notification Schemes"], -1],
      ].map(([group, items, active]) => (
        <div key={group as string} className="mb-2">
          <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: ATL.subtle }}>
            {group}
          </div>
          <Row gap={6}>
            {(items as string[]).map((it, i) => (
              <Btn key={it} variant={i === (active as number) ? "primary" : "default"}>
                {it}
              </Btn>
            ))}
          </Row>
        </div>
      ))}
    </Panel>

    <SectionLabel>Workflow Schemes — schemes not assigned to any project</SectionLabel>
    <Row gap={10}>
      <Stat value="212" label="Total" />
      <Stat value="147" label="In Use" tone={ATL.green} />
      <Stat value="65" label="Unused" tone={ATL.red} />
    </Row>

    <div className="mt-4">
      <Table
        head={["", "Name", "Description"]}
        rows={[
          [<Checkbox key="c" on label="" />, "CRM: Software Simplified Workflow Scheme", "Created for a project archived in 2023"],
          [<Checkbox key="c" on label="" />, "Copy of ITSM Workflow Scheme", "—"],
          [<Checkbox key="c" on={false} label="" />, "OPS: Incident Workflow Scheme", "In use by Operations"],
        ]}
      />
    </div>

    <div className="mt-4">
      <Row gap={8}>
        <Btn variant="danger">Delete selected (2)</Btn>
        <Btn variant="subtle">Show Details</Btn>
        <Btn variant="subtle">Start Over</Btn>
      </Row>
    </div>
  </Screen>
);

/* ── Filter Hygiene ────────────────────────────────────────────────────── */

const filterHygiene = (
  <Screen where="Admin Toolkit → Filter Management" width={880}>
    <PageTitle action={<Btn variant="primary">Search</Btn>}>Filter Management</PageTitle>
    <Sub>Audit saved filters, review sharing permissions and take bulk actions.</Sub>

    <Row gap={8}>
      <Btn variant="primary">By Name</Btn>
      <Btn>By Owner</Btn>
      <Btn>By Project</Btn>
      <Btn>By JQL</Btn>
      <Field placeholder="Enter filter name (substring match)..." width={240} />
      <Select value="All" width={110} />
    </Row>

    <Row gap={10}>
      <Stat value="1,204" label="Total Filters" />
      <Stat value="218" label="Unique Owners" />
      <Stat value="76" label="Shared globally" tone={ATL.red} />
    </Row>

    <div className="mt-4">
      <Table
        head={["", "Filter Name", "Owner", "Sharing", "JQL"]}
        rows={[
          [
            <Checkbox key="c" on label="" />,
            "All open incidents",
            "Marina Rocha",
            <Lozenge key="s" tone="danger">Global</Lozenge>,
            <Code key="j">project = OPS AND resolution = Unresolved</Code>,
          ],
          [
            <Checkbox key="c" on label="" />,
            "Board — team alpha",
            "(deactivated user)",
            <Lozenge key="s" tone="warn">Group</Lozenge>,
            <Code key="j">project = ALPHA ORDER BY Rank</Code>,
          ],
          [
            <Checkbox key="c" on={false} label="" />,
            "My tickets",
            "João Lima",
            <Lozenge key="s" tone="default">Private</Lozenge>,
            <Code key="j">assignee = currentUser()</Code>,
          ],
        ]}
      />
    </div>

    <div className="mt-4">
      <Panel tone="subtle" title="Bulk actions — 2 filters selected">
        <Row gap={8}>
          <Btn>Reassign Owner</Btn>
          <Btn>Make Private</Btn>
          <Btn>Remove Global Share</Btn>
          <Btn>Replace in JQL</Btn>
          <Btn variant="subtle">Export CSV</Btn>
        </Row>
      </Panel>
    </div>
  </Screen>
);

/* ── Mirror User ───────────────────────────────────────────────────────── */

const mirrorUser = (
  <Screen where="Admin Toolkit → Mirror User" width={860}>
    <PageTitle>Mirror User</PageTitle>
    <Sub>Copy project roles and groups from one user to another.</Sub>

    <Row gap={12}>
      <Field label="Source User" value="Marina Rocha" width="50%" />
      <Field label="Target User" value="Pedro Alves (new joiner)" width="50%" />
    </Row>
    <Row gap={8}>
      <Btn variant="primary">Scan</Btn>
      <Select label="" value="Add (merge)" width={180} />
    </Row>

    <Row gap={10}>
      <Stat value="7" label="Groups" />
      <Stat value="14" label="Role Assignments" />
      <Stat value="9" label="Projects with Roles" />
      <Stat value="142" label="Projects Scanned" tone={ATL.subtle} />
    </Row>

    <div className="mt-4">
      <Panel tone="warn" title="Group membership could not be changed">
        <span className="text-[12px]">
          Jira rejected 2 group change(s). Group membership can only be changed by a site admin. Project roles were
          still mirrored.
        </span>
      </Panel>
      <Panel tone="success" title="Verification">
        <Row gap={6}>
          <Lozenge tone="success">Project roles in sync</Lozenge>
          <Lozenge tone="warn">2 groups missing on target</Lozenge>
        </Row>
      </Panel>
    </div>
  </Screen>
);

/* ── User Offboarding ──────────────────────────────────────────────────── */

const offboarding = (
  <Screen where="Admin Toolkit → User Offboarding" width={880}>
    <PageTitle>User Offboarding</PageTitle>
    <Sub>Find and transfer all ownership and role assignments from a departing user to a replacement.</Sub>

    <Row gap={12}>
      <Field label="User to Offboard" value="Carla Nunes" width="50%" />
      <Field label="Select replacement user" value="Marina Rocha" width="50%" />
    </Row>

    <SectionLabel>Select categories to scan</SectionLabel>
    <Panel tone="subtle">
      <Checkbox on label="Project & Component Leads" />
      <Checkbox on label="Dashboards" />
      <Checkbox on label="Filters" />
      <Checkbox on label="Permission Schemes" />
      <Checkbox on label="Project Roles" />
      <Checkbox on label="Assigned Issues" />
    </Panel>
    <Btn variant="primary">Scan</Btn>

    <SectionLabel>Scan complete</SectionLabel>
    <Table
      head={["Category", "Found", "Action"]}
      rows={[
        ["Project Leads", "4", <Btn key="a">Transfer</Btn>],
        ["Component Leads", "11", <Btn key="a">Transfer</Btn>],
        ["Dashboards", "6", <Btn key="a">Transfer</Btn>],
        ["Filters", "23", <Btn key="a">Transfer</Btn>],
        ["Permission Grants", "3", <Lozenge key="a" tone="warn">Info only — manual transfer required</Lozenge>],
        ["Automation Rules", "2", <Lozenge key="a" tone="warn">Info only — manual transfer required</Lozenge>],
        ["Assigned Issues", "184", <Checkbox key="a" on label="Reassign to replacement" />],
      ]}
    />
    <Panel tone="warn" title="What a scan cannot see">
      <span className="text-[12px]">
        Objects the app cannot enumerate — some automation rules, third-party app data and personal boards — are
        reported for manual handling rather than silently skipped.
      </span>
    </Panel>
    <Btn variant="primary">Apply Transfer</Btn>
  </Screen>
);

/* ── User Analysis ─────────────────────────────────────────────────────── */

const userAnalysis = (
  <Screen where="Admin Toolkit → User Analysis" width={880}>
    <PageTitle>User Analysis</PageTitle>
    <Sub>Import Atlassian Admin CSV exports to analyse users, licences and generate recommendations.</Sub>

    <Row gap={12}>
      <div className="flex-1">
        <Panel tone="subtle" title="Managed Accounts CSV">
          <div className="text-center py-4 text-[11.5px]" style={{ color: ATL.subtle }}>
            Drop file or click to browse
          </div>
          <Lozenge tone="success">Valid · 1,402 managed users</Lozenge>
        </Panel>
      </div>
      <div className="flex-1">
        <Panel tone="subtle" title="Export Users CSV">
          <div className="text-center py-4 text-[11.5px]" style={{ color: ATL.subtle }}>
            Drop file or click to browse
          </div>
          <Lozenge tone="success">Valid · 1,388 export rows</Lozenge>
        </Panel>
      </div>
    </Row>

    <Row gap={12}>
      <Field label="Inactivity Threshold (days)" value="90" help="Minimum: 30 days." width={200} />
      <div className="self-end pb-3">
        <Btn variant="primary">Analyze</Btn>
      </div>
    </Row>

    <Row gap={10}>
      <Stat value="1,402" label="Total Users" />
      <Stat value="184" label="Unique Groups" />
      <Stat value="6" label="Org Admins" tone={ATL.red} />
      <Stat value="37" label="Users with No Group" tone={ATL.yellow} />
    </Row>

    <SectionLabel>Report — 14 sections</SectionLabel>
    <Panel tone="plain">
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {[
          "1. Executive Summary",
          "8. Org Admins",
          "2. Activity Analysis",
          "9. External Users",
          "3. Product Segmentation",
          "10. Group Analysis",
          "4. License Waste",
          "11. Service Accounts",
          "5. Never-Accessed Users",
          "12. Onboarding Timeline",
          "6. Security Compliance",
          "13. License Overview",
          "7. Site Activity",
          "14. Recommendations",
        ].map((sec) => (
          <div key={sec} className="text-[11.5px]" style={{ color: ATL.text }}>
            {sec}
          </div>
        ))}
      </div>
    </Panel>
    <Btn>Export PDF</Btn>
  </Screen>
);

/* ── Migrated Fields Cleaner ───────────────────────────────────────────── */

const migratedFields = (
  <Screen where="Admin Toolkit → Migrated Fields Cleaner" width={880}>
    <PageTitle action={<Btn variant="primary">Scan for Migrated Fields</Btn>}>Migrated Fields Cleaner</PageTitle>
    <Sub>Remove “(migrated)” tags from field names, descriptions and configurations after migration.</Sub>

    <SectionLabel>Cleanup Mode</SectionLabel>
    <Panel tone="subtle">
      <Checkbox on label="Field Names — remove migrated tags from custom field names" />
      <Checkbox on label="Field Descriptions — remove migrated tags from custom field descriptions" />
      <Checkbox on={false} label="Field Configurations — remove migrated tags from descriptions inside field configurations" />
    </Panel>

    <Table
      head={["", "ID", "Configuration", "Current Value", "Cleaned Value"]}
      rows={[
        [
          <Checkbox key="c" on label="" />,
          <Code key="i">customfield_11890</Code>,
          "Default Field Configuration",
          "Affected service (migrated)",
          "Affected service",
        ],
        [
          <Checkbox key="c" on label="" />,
          <Code key="i">customfield_11902</Code>,
          "ITSM Field Configuration",
          "Impact (migrated 2024-06)",
          "Impact",
        ],
      ]}
    />
    <Row gap={8}>
      <Btn variant="primary">Clean up selected</Btn>
      <Btn variant="subtle">Show Details</Btn>
    </Row>
  </Screen>
);

export const ADMIN_TOOLKIT_MOCKS: Record<string, ReactNode> = {
  "adm-tool-list": toolList,
  "adm-projects-manager": projectsManager,
  "adm-project-activity": projectActivity,
  "adm-cf-assessment": cfAssessment,
  "adm-cf-merger": cfMerger,
  "adm-unused-schemes": unusedSchemes,
  "adm-filter-hygiene": filterHygiene,
  "adm-mirror": mirrorUser,
  "adm-offboarding": offboarding,
  "adm-user-analysis": userAnalysis,
  "adm-migrated-fields": migratedFields,
};
