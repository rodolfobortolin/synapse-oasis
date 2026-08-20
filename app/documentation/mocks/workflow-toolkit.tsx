import type { ReactNode } from "react";
import {
  ATL,
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
  Sub,
  Table,
  Toggle,
} from "./ui";

/* ── Adding a module in the workflow editor ────────────────────────────── */

const workflowEditor = (
  <Screen where="Jira → Settings → Issues → Workflows → Edit → Transition “Start progress”" width={780}>
    <PageTitle>Add condition</PageTitle>
    <Sub>Conditions restrict who can perform a transition and under which circumstances.</Sub>
    <Table
      head={["", "Condition", "Description"]}
      rows={[
        [
          <Checkbox key="c" on label="" />,
          <strong key="t">AI Condition (Workflow Toolkit)</strong>,
          "Define conditions using natural language. The AI generates a Jira expression that is evaluated on each transition to allow or block it.",
        ],
        [
          <Checkbox key="c" on={false} label="" />,
          "Only Assignee Condition",
          "Only the assignee of the issue can execute this transition.",
        ],
        [
          <Checkbox key="c" on={false} label="" />,
          "Permission Condition",
          "Condition to allow only users with a specific permission.",
        ],
      ]}
    />
    <div className="mt-4">
      <Row gap={8}>
        <Btn variant="primary">Add</Btn>
        <Btn variant="subtle">Cancel</Btn>
      </Row>
    </div>
  </Screen>
);

/* ── AI Condition configuration ────────────────────────────────────────── */

const conditionConfig = (
  <Screen where="Transition → Conditions → AI Condition (Workflow Toolkit) → Configure" width={780}>
    <PageTitle>AI Condition (Workflow Toolkit)</PageTitle>
    <Sub>The configuration is saved when you click “Add” or “Update” in the workflow editor.</Sub>
    <Field label="Rule Description" value="Needs an estimate and an owner" help="Short description (shown in workflow editor)" />

    <SectionLabel>Fields Involved</SectionLabel>
    <Row gap={6}>
      <Btn>Story Points (customfield_10016) ✕</Btn>
      <Btn>Team (customfield_10041) ✕</Btn>
      <Btn variant="subtle">Search and select custom fields…</Btn>
    </Row>

    <div className="mt-4">
      <Field
        label="Condition Description (Natural Language)"
        value="Allow the transition only when Story Points is filled in, the assignee is set, and Team is not empty."
      />
      <Row gap={8}>
        <Btn variant="primary">Generate Expression</Btn>
        <span className="text-[12px] self-center" style={{ color: ATL.green }}>
          Expression generated successfully.
        </span>
      </Row>
    </div>

    <SectionLabel>Generated Expression (editable)</SectionLabel>
    <Panel tone="subtle">
      <code className="text-[11.5px] leading-relaxed block" style={{ fontFamily: "var(--font-mono, monospace)", color: ATL.text }}>
        issue.customfield_10016 != null &amp;&amp; issue.assignee != null &amp;&amp; issue.customfield_10041 != null
      </code>
    </Panel>
    <Panel tone="info" title="What this checks">
      <span className="text-[12px]">
        Requires Story Points to have a value, an assignee to be set, and the Team field not to be empty. Written by
        the AI alongside the expression.
      </span>
    </Panel>

    <SectionLabel>Test Expression</SectionLabel>
    <Row gap={8}>
      <Field value="OPS-4412" width={220} />
      <Btn>Test with Issue</Btn>
      <span className="text-[11px] self-center" style={{ color: ATL.subtle }}>
        Empty box → the button reads “Validate Syntax”
      </span>
    </Row>
    <Panel tone="success" title="Result: TRUE (OPS-4412)">
      <span className="text-[12px]">The transition WOULD be shown for this issue.</span>
    </Panel>
  </Screen>
);

/* ── AI Validator: what the user sees ──────────────────────────────────── */

const validatorBlocked = (
  <Screen where="Jira issue OPS-4380 → Transition “Ready for review”" width={620}>
    <Panel tone="warn" title="Jira could not complete the transition">
      <div className="text-[12.5px] mb-2">
        <Lozenge tone="danger">Blocked</Lozenge>
        <span style={{ marginLeft: 6 }}>
          The transition failed. Jira shows its own generic message — the app supplies no reason and no field name.
        </span>
      </div>
      <div className="text-[11px]" style={{ color: ATL.subtle }}>
        Nothing here identifies the rule or the missing data. That is the trade-off of using a validator instead of a
        condition.
      </div>
    </Panel>
    <Row gap={8}>
      <Btn variant="subtle">Cancel</Btn>
      <Btn variant="primary">Edit issue</Btn>
    </Row>
  </Screen>
);

/* ── AI Post Function configuration ────────────────────────────────────── */

const postFunctionConfig = (
  <Screen where="Transition → Post functions → AI Post Function (Workflow Toolkit) → Configure" width={780}>
    <PageTitle>AI Post Function (Workflow Toolkit)</PageTitle>
    <Sub>
      Configure AI-powered actions to execute after a transition completes. The configuration is saved when you click
      “Add” or “Update” in the workflow editor.
    </Sub>

    <Field label="Rule Description" value="Close-out summary and resolution" />

    <SectionLabel>Context Data</SectionLabel>
    <Panel tone="subtle">
      <div className="text-[11px] mb-2.5" style={{ color: ATL.subtle }}>
        Basic fields (summary, description, status, priority, assignee, reporter) are always included.
      </div>
      <Toggle on label="Change History — last 20 changelog entries" />
      <Toggle on={false} label="Attachments — file metadata (name, type, size)" />
      <Toggle on label="Comments — last 10 comments" />
      <div className="mt-2.5">
        <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
          Custom Fields
        </div>
        <Row gap={6}>
          <Btn>Root Cause (customfield_10233) ✕</Btn>
          <Btn>Impact (customfield_10234) ✕</Btn>
        </Row>
      </div>
    </Panel>

    <div className="mt-4">
      <Field
        label="Instructions"
        value="Summarise everything that changed on this issue and add a comment with the summary. If the issue is moving to Done, also set the resolution field."
        help="Describe what the AI should do after the transition. It will use the enabled tools below."
      />
    </div>

    <SectionLabel>Enabled Tools</SectionLabel>
    <Panel tone="subtle">
      <Checkbox on={false} label="Transition Issue — move the issue to a different status" />
      <Checkbox on label="Add Comment — add a comment to the issue" />
      <Checkbox on label="Edit Issue — modify issue fields (summary, priority, labels, custom fields…)" />
      <Checkbox on={false} label="Create Sub-task — create sub-tasks under the current issue" />
      <Checkbox on={false} label="Search Issues (JQL) — search for issues to gather data or check conditions" />
      <Checkbox on={false} label="Link Issues — create links between issues" />
      <Checkbox on={false} label="Create Issue — create any issue type in any project" />
      <Checkbox on={false} label="Send Notification — email assignee, reporter, watchers or specific users" />
      <Checkbox on={false} label="Log Work — record time spent on the issue" />
    </Panel>

    <Panel tone="info" title="How it works">
      <span className="text-[12px]">
        It can call multiple tools and repeat actions in a loop (up to 20 iterations), so complex tasks like creating
        several sub-tasks or updating multiple fields are handled automatically in a single run.
      </span>
    </Panel>
  </Screen>
);

export const WORKFLOW_TOOLKIT_MOCKS: Record<string, ReactNode> = {
  "wt-workflow-editor": workflowEditor,
  "wt-condition-config": conditionConfig,
  "wt-validator-blocked": validatorBlocked,
  "wt-postfunction-config": postFunctionConfig,
};
