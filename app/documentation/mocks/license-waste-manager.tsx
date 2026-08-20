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
  Tabs,
  Toggle,
} from "./ui";

const TABS = ["Dashboard", "Users", "Automation", "Audit Log", "Settings"];

/* ── Dashboard ─────────────────────────────────────────────────────────── */

const dashboard = (
  <Screen where="Jira → Apps → License Waste Manager → Dashboard" width={880}>
    <PageTitle
      action={
        <Row gap={8}>
          <Btn variant="primary">License Scan (fast)</Btn>
          <Btn>Deep Reconciliation Scan</Btn>
        </Row>
      }
    >
      License Waste Manager
    </PageTitle>
    <Tabs items={TABS} active="Dashboard" />

    <Row gap={10}>
      <Stat value="412" label="Total Billable Users" />
      <Stat value="87" label="Inactive (90d+)" tone={ATL.red} />
      <Stat value="$18,270/yr" label="Recovery Potential" tone={ATL.green} />
      <Stat value="486" label="Total Users Scanned" tone={ATL.subtle} />
    </Row>

    <div className="text-[11px] mt-2" style={{ color: ATL.subtle }}>
      Last scan: today 06:14 UTC · snapshot #47
    </div>

    <SectionLabel>License Utilization by Product</SectionLabel>
    <Panel tone="plain">
      {[
        ["Jira Software", 312, 350, 82],
        ["Jira Service Management", 48, 60, 71],
        ["Confluence", 260, 350, 64],
        ["Jira Product Discovery", 12, 25, 40],
      ].map(([name, used, seats, util]) => (
        <div key={name as string} className="mb-3">
          <div className="flex items-center justify-between text-[11.5px] mb-1">
            <span>{name}</span>
            <span style={{ color: ATL.subtle }}>
              {used as number} of {seats as number} licensed seats · {util as number}% utilized
            </span>
          </div>
          <Bar pct={util as number} tone={(util as number) < 65 ? ATL.red : ATL.primary} />
        </div>
      ))}
    </Panel>

    <Panel tone="subtle" title="Scan in progress">
      <Row gap={10}>
        <Bar pct={38} label="Phase: reconciling group membership (2 of 5)" />
        <Btn variant="subtle">Force Unlock</Btn>
      </Row>
    </Panel>
  </Screen>
);

/* ── Users browser ─────────────────────────────────────────────────────── */

const users = (
  <Screen where="Jira → Apps → License Waste Manager → Users" width={880}>
    <PageTitle>Users</PageTitle>
    <Tabs items={TABS} active="Users" />

    <Row gap={10}>
      <Select label="Product" value="Jira Software" width={160} />
      <Select label="Status" value="Inactive Only" width={140} />
      <Select label="Inactive For" value="90+ days" width={130} />
      <Select label="Domain" value="All Domains" width={150} />
      <Field label="Search" placeholder="Name or email..." width={190} />
    </Row>
    <Row gap={8}>
      <Btn variant="subtle">Reset</Btn>
      <Btn>Export CSV</Btn>
      <span className="text-[11px] self-center ml-auto" style={{ color: ATL.subtle }}>
        87 users match · 4 selected
      </span>
    </Row>

    <div className="mt-3">
      <Table
        head={["", "User", "Email", "Products", "Last active", "Groups"]}
        rows={[
          [
            <Checkbox key="c" on label="" />,
            <Row key="u" gap={6}>
              <Avatar initials="RM" color="#6554C0" />
              <span>Renata Marques</span>
            </Row>,
            "renata.marques@example.com",
            <Row key="p" gap={4}>
              <Lozenge tone="info">Jira</Lozenge>
              <Lozenge tone="teal">Confluence</Lozenge>
            </Row>,
            <Lozenge key="l" tone="danger">
              214 days
            </Lozenge>,
            "jira-software-users",
          ],
          [
            <Checkbox key="c" on label="" />,
            <Row key="u" gap={6}>
              <Avatar initials="TS" color="#00A3BF" />
              <span>Tomas Silva</span>
            </Row>,
            "tomas.silva@contractor.example",
            <Row key="p" gap={4}>
              <Lozenge tone="info">Jira</Lozenge>
            </Row>,
            <Lozenge key="l" tone="danger">
              Never active
            </Lozenge>,
            "jira-software-users",
          ],
          [
            <Checkbox key="c" on={false} label="" />,
            <Row key="u" gap={6}>
              <Avatar initials="AK" color="#FF8B00" />
              <span>Anna Kowalski</span>
            </Row>,
            "anna.kowalski@example.com",
            <Row key="p" gap={4}>
              <Lozenge tone="info">Jira</Lozenge>
              <Lozenge tone="purple">JSM</Lozenge>
            </Row>,
            <Lozenge key="l" tone="warn">
              96 days
            </Lozenge>,
            "jsm-agents, jira-software-users",
          ],
        ]}
      />
    </div>

    <div className="mt-4">
      <Panel tone="subtle" title="Bulk actions — 4 users selected">
        <Row gap={8}>
          <Btn>Remove from Group…</Btn>
          <Btn>Add to Group…</Btn>
          <Btn>Remove all product access</Btn>
          <Btn variant="danger">Suspend Users</Btn>
          <Btn variant="subtle">Clear selection</Btn>
        </Row>
      </Panel>
    </div>
  </Screen>
);

/* ── Automation rule ───────────────────────────────────────────────────── */

const rule = (
  <Screen where="Jira → Apps → License Waste Manager → Automation → Edit rule" width={840}>
    <PageTitle action={<Toggle on label="Enabled" />}>Reclaim dormant Jira Software seats</PageTitle>
    <Tabs items={TABS} active="Automation" />

    <Field label="Name" value="Reclaim dormant Jira Software seats" />
    <Field
      label="Description"
      value="Monthly cleanup of accounts with no Jira activity for six months, excluding protected entities."
    />

    <SectionLabel>Filter — which users the rule selects</SectionLabel>
    <Panel tone="subtle">
      <Row gap={12}>
        <Select label="Products" value="Jira Software" width="33%" />
        <Select label="Status" value="Inactive only" width="33%" />
        <Field label="Inactive for at least" value="180 days" width="33%" />
      </Row>
      <Row gap={12}>
        <Field label="Groups" value="jira-software-users" width="50%" />
        <Field label="Domains" value="(any)" width="50%" />
      </Row>
      <div className="text-[11px]" style={{ color: ATL.subtle }}>
        Matches 34 users in the current snapshot · protected users, groups and domains are always excluded
      </div>
    </Panel>

    <SectionLabel>Action</SectionLabel>
    <Row gap={12}>
      <Select label="Action" value="Remove from group" width="50%" />
      <Select label="Group" value="jira-software-users" width="50%" />
    </Row>

    <SectionLabel>Schedule</SectionLabel>
    <Row gap={12}>
      <Select label="Frequency" value="Monthly" width="33%" />
      <Select label="Day of month" value="1" width="33%" />
      <Select label="Hour (UTC)" value="03:00" width="33%" />
    </Row>

    <Row gap={8}>
      <Btn variant="primary">Save Rule</Btn>
      <Btn>Run Now</Btn>
      <Btn variant="subtle">Delete</Btn>
    </Row>

    <div className="mt-4">
      <Panel tone="success" title="Last run — 1 Aug 2026 03:00 UTC">
        <Row gap={6}>
          <Lozenge tone="success">success</Lozenge>
          <span className="text-[12px]">29 users affected · 0 failed</span>
        </Row>
      </Panel>
    </div>
  </Screen>
);

/* ── Audit log ─────────────────────────────────────────────────────────── */

const audit = (
  <Screen where="Jira → Apps → License Waste Manager → Audit Log" width={880}>
    <PageTitle>Audit Log</PageTitle>
    <Tabs items={TABS} active="Audit Log" />

    <Table
      head={["When", "Action", "Triggered by", "Rule", "Result", ""]}
      rows={[
        [
          "1 Aug 2026 03:00",
          "Remove from group",
          <Lozenge key="t" tone="purple">rule</Lozenge>,
          "Reclaim dormant Jira Software seats",
          <span key="r">
            <Lozenge tone="success">29 success</Lozenge> <Lozenge tone="default">0 failed</Lozenge>
          </span>,
          <Btn key="b" variant="subtle">View users</Btn>,
        ],
        [
          "24 Jul 2026 14:22",
          "Suspend user",
          <Lozenge key="t" tone="info">manual</Lozenge>,
          "—",
          <span key="r">
            <Lozenge tone="success">3 success</Lozenge> <Lozenge tone="danger">1 failed</Lozenge>
          </span>,
          <Btn key="b" variant="subtle">View users</Btn>,
        ],
      ]}
    />

    <div className="mt-4">
      <Panel tone="subtle" title="Affected users — 24 Jul 2026 14:22">
        <Table
          head={["User", "Account ID", "Result", "Error"]}
          rows={[
            ["Tomas Silva", <Code key="a">712020:d7a2…</Code>, <Lozenge key="r" tone="success">success</Lozenge>, "—"],
            [
              "External Auditor",
              <Code key="a">557058:e38a…</Code>,
              <Lozenge key="r" tone="danger">failed</Lozenge>,
              "User is managed by another organization",
            ],
          ]}
        />
      </Panel>
    </div>
  </Screen>
);

/* ── Settings: org API + protection ────────────────────────────────────── */

const settings = (
  <Screen where="Jira → Apps → License Waste Manager → Settings" width={860}>
    <PageTitle>Settings</PageTitle>
    <Tabs items={TABS} active="Settings" />

    <SectionLabel>Organization API Connection</SectionLabel>
    <Panel tone="plain">
      <Row gap={8}>
        <Lozenge tone="success">Connected</Lozenge>
        <span className="text-[11.5px] self-center" style={{ color: ATL.subtle }}>
          Enables real-time last-active tracking, cross-site visibility and user suspension.
        </span>
      </Row>
      <div className="mt-3">
        <Row gap={12}>
          <Field label="Organization ID" value="a1b2c3d4-5e6f-7890-abcd-ef1234567890" width="55%" />
          <Field label="API Key" value="••••••••••••••••••••" width="45%" />
        </Row>
        <Row gap={8}>
          <Btn>Test Connection</Btn>
          <Btn variant="primary">Save</Btn>
          <Btn variant="subtle">Disconnect</Btn>
          <Btn variant="subtle">Use detected Org ID</Btn>
        </Row>
        <div className="text-[11px] mt-2" style={{ color: ATL.subtle }}>
          Generate an API key at admin.atlassian.com → Settings → API keys. The key requires Organization admin
          permissions.
        </div>
      </div>
    </Panel>

    <SectionLabel>Default Inactivity Threshold</SectionLabel>
    <Field label="Days" value="90" help="Users inactive for more than this number of days will be flagged." width={160} />

    <SectionLabel>Protected Entities</SectionLabel>
    <Panel tone="warn">
      <div className="text-[11.5px] mb-2.5">
        Protected users, groups and domains are excluded from <strong>all</strong> bulk actions and automation rules.
      </div>
      <div className="mb-2">
        <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
          Protected Users
        </div>
        <Row gap={6}>
          <Btn>Rodolfo Bortolin ✕</Btn>
          <Btn>Site Admin ✕</Btn>
          <Btn variant="subtle">Search user to add…</Btn>
        </Row>
      </div>
      <div className="mb-2">
        <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
          Protected Groups
        </div>
        <Row gap={6}>
          <Btn>org-admins ✕</Btn>
          <Btn>site-admins ✕</Btn>
          <Btn variant="subtle">Search group to add…</Btn>
        </Row>
      </div>
      <div>
        <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
          Protected Domains
        </div>
        <Row gap={6}>
          <Btn>example.com ✕</Btn>
          <Btn variant="subtle">Add domain (e.g. company.com)</Btn>
        </Row>
      </div>
    </Panel>
  </Screen>
);

export const LICENSE_WASTE_MOCKS: Record<string, ReactNode> = {
  "lwm-dashboard": dashboard,
  "lwm-users": users,
  "lwm-rule": rule,
  "lwm-audit": audit,
  "lwm-settings": settings,
};
