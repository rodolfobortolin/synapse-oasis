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
  Sub,
  Table,
  Tabs,
  Toggle,
} from "./ui";

/** The global admin page has three tabs; the agents are configured per project. */
const GLOBAL_TABS = ["Statistics", "Connection", "Audit Log"];
const PROJECT_TABS = ["Statistics", "Dispatcher Agent", "Smart Escalation", "Incident Detection"];

/** The enable toggle plus its explanation, repeated at the top of each agent tab. */
function EnableRow({ title, desc, on = true }: { title: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-start gap-2.5 mb-5">
      <div className="shrink-0 pt-0.5">
        <Toggle on={on} label="" />
      </div>
      <div>
        <div className="text-[13px] font-medium" style={{ color: ATL.text }}>
          {title}
        </div>
        <div className="text-[11.5px] mt-0.5" style={{ color: ATL.subtle }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

/** A collapsible section header, as the app draws them. */
function SectionBar({ title, state = "Collapse" }: { title: string; state?: "Collapse" | "Expand" }) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2 rounded-t"
      style={{ background: "#EBECF0", border: `1px solid ${ATL.border}` }}
    >
      <span className="text-[12.5px] font-semibold" style={{ color: ATL.text }}>
        {state === "Collapse" ? "▾" : "▸"} {title}
      </span>
      <span className="text-[11.5px]" style={{ color: ATL.subtle }}>
        {state}
      </span>
    </div>
  );
}

function StepToggle({ steps, active }: { steps: string[]; active: number }) {
  return (
    <div className="flex rounded overflow-hidden mb-4" style={{ border: `1px solid ${ATL.border}` }}>
      {steps.map((s, i) => {
        const on = i === active;
        return (
          <span
            key={s}
            className="flex-1 flex items-center justify-center gap-2 py-2 text-[12.5px]"
            style={{
              background: on ? ATL.primaryBg : "#F4F5F7",
              color: on ? ATL.primary : ATL.subtle,
              fontWeight: on ? 600 : 400,
              boxShadow: on ? `inset 0 -2px 0 ${ATL.primary}` : "none",
              borderRight: i < steps.length - 1 ? `1px solid ${ATL.border}` : "none",
            }}
          >
            <span
              className="inline-flex items-center justify-center rounded-full text-[10px] font-bold"
              style={{ width: 16, height: 16, background: on ? ATL.primary : "#C1C7D0", color: "#fff" }}
            >
              {i + 1}
            </span>
            {s}
          </span>
        );
      })}
    </div>
  );
}

/* ── Global: the Teams API connection ──────────────────────────────────── */

const connection = (
  <Screen where="Jira → Apps → AI Triage → Connection" width={860}>
    <PageTitle>AI Triage</PageTitle>
    <Tabs items={GLOBAL_TABS} active="Connection" />

    <div className="text-[15px] font-semibold mb-1" style={{ color: ATL.text }}>
      Atlassian Teams API Connection
    </div>
    <Sub>
      Configure the Atlassian Teams API credentials used by the Dispatcher Agent to access organization teams and
      members. This is a global setting shared across all projects.
    </Sub>

    <Panel tone="plain">
      <Row gap={12}>
        <Field label="Atlassian Email" value="admin@example.com" help="Email of an Atlassian admin with organization access" width="38%" />
        <Field label="API Token" value="••••••••••••" help="Create at id.atlassian.com/manage-profile/security/api-tokens" width="32%" />
        <Field label="Organization ID" value="auto-discovered" help="Override if needed (found at admin.atlassian.com)" width="30%" />
      </Row>
      <Row gap={8}>
        <Btn variant="primary">Validate &amp; Connect</Btn>
        <Btn>Save Connection</Btn>
        <span className="text-[12px] self-center" style={{ color: ATL.green }}>
          Connected successfully!
        </span>
      </Row>
    </Panel>
  </Screen>
);

/* ── Project: Dispatcher Agent ─────────────────────────────────────────── */

const dispatcher = (
  <Screen where="Project settings → AI Triage → Dispatcher Agent" width={860}>
    <PageTitle>AI Triage</PageTitle>
    <Tabs items={PROJECT_TABS} active="Dispatcher Agent" />

    <EnableRow
      title="Enable Dispatcher Agent"
      desc="Automatically route new tickets to the right team and member."
    />

    <SectionBar title="Dispatch Configuration" state="Expand" />

    <div className="rounded-b px-4 py-4 mb-4" style={{ border: `1px solid ${ATL.border}`, borderTop: "none" }}>
      <div className="text-[13px] font-semibold mb-1" style={{ color: ATL.text }}>
        Routing Setup
      </div>
      <div className="text-[11.5px] mb-3.5" style={{ color: ATL.subtle }}>
        Configure which service desks, teams, and members are available for automatic ticket routing.
      </div>

      <StepToggle steps={["Teams", "Members"]} active={0} />

      <div className="text-[11.5px] mb-2.5" style={{ color: ATL.text }}>
        Select which teams participate in ticket routing and configure a routing prompt for each one.
      </div>

      <div className="rounded" style={{ border: `1px solid ${ATL.border}` }}>
        <div className="px-3 py-2 text-[12px]" style={{ background: "#F4F5F7", color: "#8993A4" }}>
          🔍 Search teams...
        </div>
        <div
          className="flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ background: "#F4F5F7", borderTop: `1px solid ${ATL.border}`, color: ATL.subtle }}
        >
          <span className="flex items-center gap-2">
            <Checkbox on label="" /> Team
          </span>
          <span>2 of 2 selected</span>
        </div>
        {["Platform Engineering", "Endpoint Support"].map((t) => (
          <div key={t} className="px-3 py-2" style={{ borderTop: `1px solid ${ATL.border}` }}>
            <Checkbox on label={t} />
          </div>
        ))}
        <div
          className="flex items-center justify-between px-3 py-1.5 text-[11px]"
          style={{ background: "#F4F5F7", borderTop: `1px solid ${ATL.border}`, color: ATL.subtle }}
        >
          <span>1-2 of 2</span>
          <Row gap={6}>
            <Btn variant="subtle">« Prev</Btn>
            <Btn variant="subtle">Next »</Btn>
          </Row>
        </div>
        <div className="px-3 py-2" style={{ borderTop: `1px solid ${ATL.border}` }}>
          <Row gap={6}>
            <Btn>Platform Engineering ✕</Btn>
            <Btn>Endpoint Support ✕</Btn>
          </Row>
        </div>
      </div>

      <SectionLabel>Team Routing Prompts</SectionLabel>
      <div className="text-[11.5px] mb-2.5" style={{ color: ATL.subtle }}>
        Configure what each selected team handles. The AI uses these to match tickets.
      </div>
      {[
        ["P", "Platform Engineering", "Owns authentication, SSO, API gateways and anything about logging in."],
        ["E", "Endpoint Support", null],
      ].map(([ini, name, prompt]) => (
        <div
          key={name as string}
          className="flex items-center gap-2.5 rounded px-3 py-2.5 mb-2"
          style={{ border: `1px solid ${ATL.border}` }}
        >
          <span
            className="inline-flex items-center justify-center rounded text-[10px] font-bold text-white shrink-0"
            style={{ width: 22, height: 22, background: ATL.primary }}
          >
            {ini}
          </span>
          <span className="text-[12px] font-medium">{name}</span>
          <span className="ml-auto text-[11.5px]" style={{ color: ATL.subtle }}>
            {prompt ? (
              <span style={{ color: ATL.text }}>{prompt as string}</span>
            ) : (
              <>
                <em>No prompt</em>{" "}
                <span style={{ color: ATL.primary, textDecoration: "underline" }}>Add</span>
              </>
            )}
          </span>
        </div>
      ))}
    </div>

    <Btn variant="primary">Save Configuration</Btn>
  </Screen>
);

/* ── Project: Smart Escalation ─────────────────────────────────────────── */

const escalation = (
  <Screen where="Project settings → AI Triage → Smart Escalation" width={860}>
    <PageTitle>AI Triage</PageTitle>
    <Tabs items={PROJECT_TABS} active="Smart Escalation" />

    <EnableRow
      title="Enable Smart Escalation"
      desc="Automatically analyze customer comments for negative sentiment and trigger escalation actions."
    />

    <SectionBar title="General Settings" />
    <div className="rounded-b px-4 py-4 mb-4" style={{ border: `1px solid ${ATL.border}`, borderTop: "none" }}>
      <Select
        label="Sentiment Threshold"
        value="Negative or worse (recommended)"
      />
      <div className="text-[11px] -mt-2 mb-3" style={{ color: ATL.subtle }}>
        Escalation actions trigger when sentiment meets or exceeds this level.
      </div>
      <Field
        label="Escalation Label"
        value="escalation-risk"
        help='Label added to issues when the "Flag with label" action is enabled.'
      />
      <Field
        label="Custom AI Instructions"
        placeholder="Additional instructions for sentiment analysis..."
        help="Optional instructions appended to the sentiment analysis prompt."
      />
    </div>

    <SectionBar title="Escalation Actions" />
    <div className="rounded-b px-4 py-4 mb-4" style={{ border: `1px solid ${ATL.border}`, borderTop: "none" }}>
      <div className="text-[11.5px] mb-2.5" style={{ color: ATL.subtle }}>
        Select which actions to perform when negative sentiment is detected.
      </div>
      <Checkbox on={false} label="Reassign to escalation user" />
      <Checkbox on label="Add escalation user as watcher" />
      <Checkbox on label="Flag with label" />
    </div>

    <SectionBar title="Escalation Users" />
    <div className="rounded-b px-4 py-4 mb-4" style={{ border: `1px solid ${ATL.border}`, borderTop: "none" }}>
      <div className="text-[11.5px] mb-2.5" style={{ color: ATL.subtle }}>
        Assign an escalation user for this service desk. This user will be used for reassign and watcher actions.
      </div>
      <Select label="" value="Priya Raman — Service Desk Lead" width={420} />
    </div>

    <Btn variant="primary">Save Configuration</Btn>
  </Screen>
);

/* ── Project: Incident Detection ───────────────────────────────────────── */

const incident = (
  <Screen where="Project settings → AI Triage → Incident Detection" width={820}>
    <PageTitle>AI Triage</PageTitle>
    <Tabs items={PROJECT_TABS} active="Incident Detection" />

    <EnableRow
      title="Enable Incident Detection"
      desc="Detect clusters of similar tickets and promote one of them to a major incident."
    />

    <SectionBar title="General Settings" />
    <div className="rounded-b px-4 py-4 mb-4" style={{ border: `1px solid ${ATL.border}`, borderTop: "none" }}>
      <Select label="Scan Interval" value="Every hour" width={420} />
      <div className="text-[11px] -mt-2 mb-3" style={{ color: ATL.subtle }}>
        How often to scan for trending issues.
      </div>
      <Field label="Time Window (minutes)" value="90" help="Look back this many minutes when scanning for similar issues." width={420} />
      <Field label="Cluster Threshold" value="10" help="Minimum number of similar issues to trigger incident creation." width={420} />
      <Select label="Link Type (required)" value="relates to" width={420} />
      <div className="text-[11px] -mt-2 mb-3" style={{ color: ATL.subtle }}>
        Jira link type used to link related issues to the incident.
      </div>
      <Select label="Which issue types are incidents (required)" value="Incident" width={420} />
      <div className="text-[11px] -mt-2 mb-3" style={{ color: ATL.subtle }}>
        Choose at least one issue type, or the detector cannot tell which tickets are incidents.
      </div>
      <Field
        label="Custom AI Instructions"
        placeholder="Additional instructions for issue clustering..."
        help="Optional instructions appended to the clustering prompt."
      />
    </div>

    <Btn variant="primary">Save Configuration</Btn>
  </Screen>
);

/* ── Issue panel ───────────────────────────────────────────────────────── */

const issuePanel = (
  <Screen where="Jira issue ITSD-8841 → AI Triage panel" width={620}>
    <PageTitle action={<Btn variant="subtle">Refresh</Btn>}>AI Triage</PageTitle>

    <Panel tone="info" title="Routing Decision">
      <div className="text-[12px] space-y-1">
        <div>
          <strong>Team:</strong> Platform Engineering
        </div>
        <div>
          <strong>Assigned to:</strong> <Avatar initials="MR" color="#6554C0" /> Marina Rocha
        </div>
        <div>
          <strong>Reason:</strong> SSO redirect loop affects authentication, owned by Platform Engineering. Marina
          handles access and identity requests.
        </div>
        <Row gap={6}>
          <Lozenge tone="success">Assigned</Lozenge>
          <Lozenge tone="info">Routed</Lozenge>
        </Row>
      </div>
    </Panel>

    <Panel tone="warn" title="Sentiment Analysis">
      <div className="text-[12px] space-y-1">
        <Row gap={6}>
          <Lozenge tone="danger">critical</Lozenge>
          <span>
            <strong>Score:</strong> −0.82 · <strong>Escalation Risk:</strong> Yes
          </span>
        </Row>
        <div>
          <strong>Key phrases:</strong> “third time this week”, “considering other vendors”
        </div>
        <div>
          <strong>Actions:</strong> watcher added, flagged <Code>escalation-risk</Code>
        </div>
      </div>
    </Panel>

    <Panel tone="subtle" title="Incident Detection">
      <div className="text-[12px]">
        Part of incident <Code>ITSD-8852</Code> · topic “SSO redirect loop” <Lozenge tone="teal">Real-time</Lozenge>
      </div>
    </Panel>
  </Screen>
);

/* ── My Skills (personal settings) ─────────────────────────────────────── */

const mySkills = (
  <Screen where="Jira → Personal settings → My Skills" width={620}>
    <PageTitle action={<Btn variant="primary">Save</Btn>}>My Skills</PageTitle>
    <Sub>Tell the Dispatcher Agent what you are the right person for.</Sub>
    <Field
      label="Skills"
      value="Identity and access: SSO, SAML, Okta, MFA enrolment. Also handles Jira permission schemes."
      help="Used alongside the team routing prompt when the AI picks an assignee."
    />
    <Panel tone="subtle">
      <div className="text-[11.5px]" style={{ color: ATL.subtle }}>
        Your Jira administrator can also maintain a skill prompt for you in the Dispatcher Agent configuration.
      </div>
    </Panel>
  </Screen>
);

/* ── Statistics ────────────────────────────────────────────────────────── */

const statistics = (
  <Screen where="Project settings → AI Triage → Statistics" width={860}>
    <PageTitle>AI Triage</PageTitle>
    <Tabs items={PROJECT_TABS} active="Statistics" />

    <div className="flex items-center justify-between mb-4">
      <Row gap={6}>
        <Btn variant="subtle">Today</Btn>
        <Btn variant="subtle">This Week</Btn>
        <Btn variant="primary">This Month</Btn>
        <Btn variant="subtle">Custom</Btn>
      </Row>
      <span className="text-[11.5px]" style={{ color: ATL.primary }}>
        Refresh
      </span>
    </div>

    <Row gap={12}>
      {[
        ["Team assignments", "128"],
        ["User assignments", "121"],
      ].map(([label, value]) => (
        <div
          key={label}
          className="flex-1 rounded-md px-4 py-3.5 text-center"
          style={{ border: `1px solid ${ATL.border}`, borderTop: `3px solid ${ATL.primary}` }}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: ATL.subtle }}>
            {label}
          </div>
          <div className="text-[24px] font-semibold mt-1" style={{ color: ATL.text }}>
            {value}
          </div>
        </div>
      ))}
    </Row>

    <Row gap={12}>
      <div className="flex-1">
        <Panel tone="plain" title="Team Dispatch Distribution">
          {[
            ["Platform Engineering", 58],
            ["Endpoint Support", 34],
            ["Facilities", 8],
          ].map(([t, pct]) => (
            <div key={t as string} className="mb-2.5">
              <div className="text-[11.5px] mb-1">{t}</div>
              <Bar pct={pct as number} />
            </div>
          ))}
        </Panel>
      </div>
      <div className="flex-1">
        <Panel tone="plain" title="Top Assignees">
          {[
            ["MR", "Marina Rocha", 41],
            ["JL", "João Lima", 28],
            ["AS", "Ana Sousa", 19],
          ].map(([ini, name, n]) => (
            <div key={name as string} className="flex items-center gap-2.5 mb-2">
              <Avatar initials={ini as string} color="#6554C0" />
              <span className="text-[11.5px]">{name}</span>
              <span className="ml-auto text-[11.5px] font-semibold" style={{ color: ATL.text }}>
                {n as number}
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </Row>

    <div className="flex justify-end mb-2">
      <Row gap={0}>
        <Btn variant="primary">Last 12 Weeks</Btn>
        <Btn>Last 12 Months</Btn>
      </Row>
    </div>
    <Panel tone="plain" title="Team Assignments">
      <div className="flex items-end gap-2" style={{ height: 80 }}>
        {[6, 9, 4, 11, 8, 14, 10, 7, 12, 9, 15, 11].map((h, i) => (
          <span key={i} className="flex-1 rounded-t" style={{ height: h * 5, background: ATL.primary, opacity: 0.85 }} />
        ))}
      </div>
      <div className="flex justify-between text-[9.5px] mt-1.5" style={{ color: ATL.subtle }}>
        {["2026-W23", "2026-W25", "2026-W27", "2026-W29", "2026-W31", "2026-W33"].map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
    </Panel>
  </Screen>
);

export const AI_TRIAGE_MOCKS: Record<string, ReactNode> = {
  "at-connection": connection,
  "at-dispatcher": dispatcher,
  "at-escalation": escalation,
  "at-incident": incident,
  "at-issue-panel": issuePanel,
  "at-my-skills": mySkills,
  "at-statistics": statistics,
};
