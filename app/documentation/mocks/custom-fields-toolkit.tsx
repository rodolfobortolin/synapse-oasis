import type { ReactNode } from "react";
import {
  ATL,
  Avatar,
  Bar,
  Btn,
  Checkbox,
  Code,
  Field,
  IssueField,
  Lozenge,
  PageTitle,
  Panel,
  Row,
  Screen,
  SectionLabel,
  Select,
  Sub,
  Table,
  Toggle,
} from "./ui";

/* ── Issue Picker: field configuration ─────────────────────────────────── */

const issuePickerConfig = (
  <Screen where="Jira → Settings → Issues → Custom fields → Issue Picker → Contexts → Edit configuration">
    <PageTitle action={<Btn variant="primary">Save Configuration</Btn>}>Issue Picker configuration</PageTitle>

    <Field
      label="JQL to limit search options"
      value='project = OPS AND type = Incident AND statusCategory != Done ORDER BY created DESC'
      help="Issues returned by this JQL will be shown as options in the dropdown."
    />
    <Row gap={8}>
      <Btn>Test JQL</Btn>
      <span className="text-[12px] self-center" style={{ color: ATL.green }}>
        Valid — 42 issue(s) found
      </span>
    </Row>

    <SectionLabel>Scope and permissions</SectionLabel>
    <Toggle on label="Limit field options to current project" />
    <Toggle on={false} label="Use App Permissions" />

    <SectionLabel>Selection</SectionLabel>
    <Row gap={16}>
      <Select label="Allow to select multiple Issues" value="Multi Select" width={220} />
      <Field label="Max Results" value="50" help="Maximum issues returned (1-200)" width={120} />
    </Row>

    <SectionLabel>Issue links</SectionLabel>
    <Toggle on label="Add an Issue Link towards the selected Issue" />
    <Select label="Link Type" value="relates to" width={220} />
    <Toggle on label="Delete all Issue Links of selected type when unselected" />

    <SectionLabel>Display Columns</SectionLabel>
    <Row gap={6}>
      {["Key", "Summary", "Status", "Assignee"].map((c) => (
        <Btn key={c}>{c} ✓</Btn>
      ))}
      {["Priority", "Issue Type"].map((c) => (
        <Btn key={c} variant="subtle">
          + {c}
        </Btn>
      ))}
    </Row>

    <SectionLabel>Quick Filters</SectionLabel>
    <Panel tone="subtle">
      <div className="text-[11px] mb-2" style={{ color: ATL.subtle }}>
        Allow users to quickly narrow results using filter buttons. Up to 5 filters.
      </div>
      <Row gap={6}>
        <Btn>Assigned to me</Btn>
        <Btn>Unresolved</Btn>
        <Btn>Open Sprints</Btn>
        <Btn variant="subtle">+ Add Custom Filter</Btn>
      </Row>
    </Panel>
  </Screen>
);

/* ── Issue Picker: selection modal on the issue ────────────────────────── */

const issuePickerModal = (
  <Screen where="Jira issue → Related incidents (Issue Picker) → Select issues" width={760}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-[15px] font-semibold">Select Issues</span>
      <span style={{ color: ATL.subtle }}>✕</span>
    </div>

    <Field placeholder="Search issues..." />
    <Row gap={6}>
      <Btn variant="primary">Assigned to me</Btn>
      <Btn>Unresolved</Btn>
      <Btn>Open Sprints</Btn>
    </Row>

    <div className="mt-4">
      <Table
        head={["", "Key", "Summary", "Status", "Assignee"]}
        rows={[
          [
            <Checkbox key="c" on label="" />,
            <Code key="k">OPS-4412</Code>,
            "Checkout latency spike in eu-west-1",
            <Lozenge key="s" tone="info">
              In progress
            </Lozenge>,
            <Avatar key="a" initials="MR" color="#6554C0" />,
          ],
          [
            <Checkbox key="c" on label="" />,
            <Code key="k">OPS-4380</Code>,
            "Payment webhook retries exhausted",
            <Lozenge key="s" tone="warn">
              Waiting
            </Lozenge>,
            <Avatar key="a" initials="JL" color="#00A3BF" />,
          ],
          [
            <Checkbox key="c" on={false} label="" />,
            <Code key="k">OPS-4361</Code>,
            "Elevated 5xx from the search service",
            <Lozenge key="s" tone="default">
              To do
            </Lozenge>,
            <Avatar key="a" initials="AS" color="#FF8B00" />,
          ],
        ]}
      />
    </div>

    <div className="flex items-center justify-between mt-4">
      <span className="text-[11px]" style={{ color: ATL.subtle }}>
        42 issue(s) available
      </span>
      <Row gap={8}>
        <Btn variant="subtle">Cancel</Btn>
        <Btn variant="primary">Done (2)</Btn>
      </Row>
    </div>
  </Screen>
);

/* ── Checklist: field configuration ────────────────────────────────────── */

const checklistConfig = (
  <Screen where="Jira → Settings → Issues → Custom fields → Checklist → Contexts → Edit configuration">
    <PageTitle action={<Btn variant="primary">Save Configuration</Btn>}>Checklist configuration</PageTitle>

    <Row gap={16}>
      <Select label="Validation Mode" value="Mandatory only" width={220} />
      <Field label="Minimum items to complete" value="3" width={180} />
    </Row>
    <Panel tone="warn">
      <span className="text-[12px]">
        <strong>Important:</strong> you must also add the “Checklist Completion Validator” to the desired workflow
        transition.
      </span>
    </Panel>

    <Row gap={16}>
      <Select label="Status Display Mode" value="Both" width={220} />
      <Field label="Max Items per Checklist" value="0" help="0 = unlimited" width={180} />
    </Row>

    <SectionLabel>Item capabilities</SectionLabel>
    <Toggle on label="Allow Descriptions" />
    <Toggle on label="Allow Due Dates" />
    <Toggle on label="Allow Mandatory Items" />
    <Toggle on={false} label="Allow Assignees (@mentions)" />
    <Toggle on={false} label="Lock Checklist" />

    <SectionLabel>Custom Statuses</SectionLabel>
    <Panel tone="subtle">
      <Row gap={6}>
        <Lozenge tone="default">Open</Lozenge>
        <Lozenge tone="info">In progress</Lozenge>
        <Lozenge tone="success">Done</Lozenge>
        <Lozenge tone="default">Skipped</Lozenge>
        <Lozenge tone="purple">Blocked</Lozenge>
      </Row>
      <div className="text-[11px] mt-2" style={{ color: ATL.subtle }}>
        “Blocked” added by an administrator · Marks complete: no
      </div>
    </Panel>

    <SectionLabel>Default Items</SectionLabel>
    <Panel tone="subtle">
      <div className="text-[11px] mb-2" style={{ color: ATL.subtle }}>
        Pre-populate this checklist when the field is first used on an issue.
      </div>
      {["Change request approved", "Rollback plan attached", "Customer notified"].map((it, i) => (
        <div key={it} className="flex items-center gap-2 mb-1.5">
          <Code>{i + 1}</Code>
          <span className="text-[12px]">{it}</span>
          {i < 2 && <Lozenge tone="danger">Mandatory</Lozenge>}
        </div>
      ))}
    </Panel>
  </Screen>
);

/* ── Checklist: on the issue ───────────────────────────────────────────── */

const checklistView = (
  <Screen where="Jira issue OPS-4412 → Release checklist (Checklist field)" width={720}>
    <IssueField label="Release checklist">
      <div className="mb-3">
        <Row gap={10}>
          <span className="text-[12px] font-semibold whitespace-nowrap">3 of 5 complete</span>
          <Bar pct={60} tone={ATL.green} />
          <Btn variant="subtle">Edit Checklist</Btn>
        </Row>
      </div>

      {[
        { text: "Change request approved", done: true, mandatory: true, due: null, who: "MR" },
        { text: "Rollback plan attached", done: true, mandatory: true, due: null, who: "MR" },
        { text: "Load test signed off", done: true, mandatory: false, due: null, who: "JL" },
        { text: "Customer notified", done: false, mandatory: true, due: "Overdue · 2 days", who: "AS" },
        { text: "Status page updated", done: false, mandatory: false, due: "Due today", who: null },
      ].map((item) => (
        <div
          key={item.text}
          className="flex items-center gap-2.5 py-2"
          style={{ borderTop: `1px solid ${ATL.border}` }}
        >
          <Checkbox on={item.done} label="" />
          <span
            className="text-[12.5px]"
            style={{ color: item.done ? ATL.subtle : ATL.text, textDecoration: item.done ? "line-through" : "none" }}
          >
            {item.text}
          </span>
          {item.mandatory && !item.done && <Lozenge tone="danger">Mandatory</Lozenge>}
          {item.due && (
            <Lozenge tone={item.due.startsWith("Overdue") ? "danger" : "warn"}>{item.due}</Lozenge>
          )}
          <span className="ml-auto flex items-center gap-2">
            <Lozenge tone={item.done ? "success" : "default"}>{item.done ? "Done" : "Open"}</Lozenge>
            {item.who && <Avatar initials={item.who} color="#6554C0" />}
          </span>
        </div>
      ))}
    </IssueField>
  </Screen>
);

/* ── Checklist Completion Validator ────────────────────────────────────── */

const validatorConfig = (
  <Screen where="Jira → Workflows → Edit workflow → Transition “Ready for release” → Validators → Add validator" width={720}>
    <PageTitle>Checklist Completion Validator</PageTitle>
    <Sub>Blocks the transition if checklist items are not completed according to the validation rules.</Sub>

    <Panel tone="subtle" title="Fields checked by this validator">
      <Row gap={6}>
        <Btn>Release checklist ✓</Btn>
        <Btn>Definition of Done ✓</Btn>
        <Btn variant="subtle">+ add field</Btn>
      </Row>
      <div className="text-[11px] mt-2.5" style={{ color: ATL.subtle }}>
        Each field applies the Validation Mode set in its own field configuration.
      </div>
    </Panel>

    <Panel tone="warn" title="What the user sees when the transition is blocked">
      <span className="text-[12px]">
        Release checklist: 1 mandatory item is not complete — “Customer notified”.
      </span>
    </Panel>
  </Screen>
);

/* ── Masked Input configuration ────────────────────────────────────────── */

const maskedConfig = (
  <Screen where="Jira → Settings → Issues → Custom fields → Masked Input → Contexts → Edit configuration">
    <PageTitle action={<Btn variant="primary">Save Configuration</Btn>}>Masked Input configuration</PageTitle>

    <SectionLabel>Template Library</SectionLabel>
    <Panel tone="subtle">
      <Row gap={6}>
        <Btn variant="primary">Asset tag</Btn>
        <Btn>US phone (local)</Btn>
        <Btn>Cost center</Btn>
        <Btn>Serial number</Btn>
        <Btn>IPv4 address</Btn>
        <Btn>MAC address</Btn>
        <Btn variant="subtle">+ 12 more</Btn>
      </Row>
      <div className="text-[11px] mt-2" style={{ color: ATL.subtle }}>
        Clicking a preset preloads the mask, regex and algorithm. You can edit any of them afterwards.
      </div>
    </Panel>

    <Row gap={16}>
      <Field label="Mask Pattern" value="AT-####-AAA" width="60%" />
      <Select label="Allowed Characters" value="Alphanumeric" width="40%" />
    </Row>
    <Row gap={16}>
      <Select label="Letter Transform" value="Uppercase" width="50%" />
      <Select label="Algorithm Check" value="No algorithm check" width="50%" />
    </Row>
    <Field label="Validation Regex" value="^AT-\d{4}-[A-Z]{3}$" help="Regex runs against the raw value with mask literals removed." />
    <Field label="Helper Text" value="Asset tag printed on the device label." />
    <Field label="Invalid Value Message" value="Use the format AT-1234-ABC." />
    <Toggle on label="Block invalid values" />

    <SectionLabel>Preview</SectionLabel>
    <Panel tone="plain">
      <Row gap={12}>
        <Field value="AT-4192-XDR" width={200} />
        <span className="text-[12px] self-center" style={{ color: ATL.green }}>
          ✓ Formatted output: AT-4192-XDR
        </span>
      </Row>
    </Panel>
  </Screen>
);

/* ── Select list delegation: global settings ───────────────────────────── */

const globalSettings = (
  <Screen where="Jira → Apps → Custom Fields Toolkit → Select List Option Management">
    <PageTitle>Select List Option Management</PageTitle>
    <Sub>
      Enable Project Admins to manage options for select list fields that have a project-scoped field context.
    </Sub>
    <Table
      head={["Field", "Type", "Context", "Project", "Enabled"]}
      rows={[
        [
          "Affected Service",
          <Lozenge key="t" tone="info">
            Select list (single)
          </Lozenge>,
          "OPS context",
          "Operations (OPS)",
          <Toggle key="e" on label="" />,
        ],
        [
          "Environment",
          <Lozenge key="t" tone="info">
            Select list (single)
          </Lozenge>,
          "Platform context",
          "Platform (PLAT)",
          <Toggle key="e" on label="" />,
        ],
        [
          "Vendor",
          <Lozenge key="t" tone="purple">
            Select list (multiple)
          </Lozenge>,
          "Procurement context",
          "Procurement (PROC)",
          <Toggle key="e" on={false} label="" />,
        ],
      ]}
    />
  </Screen>
);

/* ── Select list delegation: project page ──────────────────────────────── */

const projectSettings = (
  <Screen where="Project settings → Select List Options" width={760}>
    <PageTitle action={<Btn variant="primary">Add Option</Btn>}>Select List Options</PageTitle>
    <Sub>Manage options for select list fields in this project.</Sub>

    <Select label="Field" value="Affected Service" width={280} />

    <Table
      head={["Option Value", "Status", "Actions"]}
      rows={[
        ["Checkout API", <Lozenge key="s" tone="success">Enabled</Lozenge>, <Row key="a" gap={6}><Btn>Edit</Btn><Btn variant="subtle">Delete</Btn></Row>],
        ["Payments", <Lozenge key="s" tone="success">Enabled</Lozenge>, <Row key="a" gap={6}><Btn>Edit</Btn><Btn variant="subtle">Delete</Btn></Row>],
        ["Legacy billing", <Lozenge key="s" tone="default">Disabled</Lozenge>, <Row key="a" gap={6}><Btn>Edit</Btn><Btn variant="subtle">Delete</Btn></Row>],
      ]}
    />
  </Screen>
);

export const CUSTOM_FIELDS_MOCKS: Record<string, ReactNode> = {
  "cft-issue-picker-config": issuePickerConfig,
  "cft-issue-picker-modal": issuePickerModal,
  "cft-checklist-config": checklistConfig,
  "cft-checklist-view": checklistView,
  "cft-validator-config": validatorConfig,
  "cft-masked-config": maskedConfig,
  "cft-global-settings": globalSettings,
  "cft-project-settings": projectSettings,
};
