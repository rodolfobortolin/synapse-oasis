import type { ReactNode } from "react";
import {
  ATL,
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

const TABS = ["Findings", "Dismissed", "Bulk Scan", "Analytics", "Audit Log", "Scanning Rules", "Project Exclusions", "Settings"];

/* ── Findings ──────────────────────────────────────────────────────────── */

const findings = (
  <Screen where="Jira → Apps → Secret Scanner → Findings" width={880}>
    <PageTitle>Secret Scanner</PageTitle>
    <Sub>
      Detected secrets, credentials, PII and sensitive data exposed in Jira issues.
    </Sub>
    <Tabs items={TABS} active="Findings" />

    <Row gap={10}>
      <Stat value="18" label="Total" />
      <Stat value="11" label="Open" tone={ATL.red} />
      <Stat value="4" label="In Progress" tone={ATL.primary} />
      <Stat value="3" label="Resolved" tone={ATL.green} />
    </Row>

    <div className="mt-4">
      <Table
        head={["Issue", "Field", "Category", "Pattern", "Match", "Detected", "Status", "Actions"]}
        rows={[
          [
            <Code key="i">SUP-1182</Code>,
            "Description",
            <Lozenge key="c" tone="danger">Cloud Providers</Lozenge>,
            "AWS Access Key ID",
            <Code key="m">AKIA****</Code>,
            "2 hours ago",
            <Lozenge key="s" tone="danger">Open</Lozenge>,
            <Row key="a" gap={4}>
              <Btn>Create Issue</Btn>
              <Btn variant="subtle">Dismiss</Btn>
            </Row>,
          ],
          [
            <Code key="i">SUP-1174</Code>,
            "Comment",
            <Lozenge key="c" tone="purple">AI &amp; ML Services</Lozenge>,
            "OpenAI API Key",
            <Code key="m">sk-p****</Code>,
            "5 hours ago",
            <Lozenge key="s" tone="info">In Progress</Lozenge>,
            <Row key="a" gap={4}>
              <Btn variant="subtle">SEC-42</Btn>
            </Row>,
          ],
          [
            <Code key="i">OPS-901</Code>,
            "Attachment · config.yaml",
            <Lozenge key="c" tone="warn">Database Connections</Lozenge>,
            "PostgreSQL connection string",
            <Code key="m">post****</Code>,
            "yesterday",
            <Lozenge key="s" tone="success">Resolved</Lozenge>,
            <Row key="a" gap={4}>
              <Lozenge tone="teal">Redacted</Lozenge>
            </Row>,
          ],
        ]}
      />
    </div>
  </Screen>
);

/* ── Dismiss dialog ────────────────────────────────────────────────────── */

const dismissDialog = (
  <Screen where="Findings → Dismiss" width={560}>
    <PageTitle>Dismiss Finding</PageTitle>
    <Sub>
      This finding will be permanently dismissed and will not be detected again for this exact match.
    </Sub>
    <Panel tone="subtle">
      <span className="text-[12px]">
        <strong>AWS Access Key ID</strong> in <Code>SUP-1182</Code> · Description
      </span>
    </Panel>
    <Field label="Reason (required)" value="False positive — value is from the AWS documentation example" />
    <Row gap={8}>
      <Btn variant="danger">Dismiss</Btn>
      <Btn variant="subtle">Cancel</Btn>
    </Row>
  </Screen>
);

/* ── Bulk scan ─────────────────────────────────────────────────────────── */

const bulkScan = (
  <Screen where="Jira → Apps → Secret Scanner → Bulk Scan" width={860}>
    <PageTitle>Bulk Scan</PageTitle>
    <Sub>Scan existing Jira issues for exposed secrets, credentials and PII using a JQL query.</Sub>
    <Tabs items={TABS} active="Bulk Scan" />

    <Field
      label="JQL"
      value="project in (SUP, OPS) AND created >= -365d ORDER BY created DESC"
      help="The scan walks the result set in batches. Validate the query before starting."
    />
    <Row gap={8}>
      <Btn>Validate JQL</Btn>
      <Btn variant="primary">Start Bulk Scan</Btn>
      <Btn variant="subtle">Reset</Btn>
    </Row>

    <div className="mt-5">
      <Panel tone="info" title="Scanning — 2,140 of 3,806 issues">
        <Bar pct={56} tone={ATL.primary} label="7 new findings so far · running in the background, safe to leave this page" />
      </Panel>
    </div>
  </Screen>
);

/* ── Scanning rules ────────────────────────────────────────────────────── */

const rules = (
  <Screen where="Jira → Apps → Secret Scanner → Scanning Rules" width={880}>
    <PageTitle>Scanning Rules</PageTitle>
    <Tabs items={TABS} active="Scanning Rules" />

    <Row gap={8}>
      <Field placeholder="Search rules by name..." width={300} />
      <Btn>Enable All</Btn>
      <Btn variant="subtle">Disable All</Btn>
      <span className="text-[11px] self-center ml-auto" style={{ color: ATL.subtle }}>
        128 of 142 rules enabled
      </span>
    </Row>

    <div className="mt-3">
      <Table
        head={["Category", "Patterns", "Covers", "Enabled"]}
        rows={[
          ["Cloud Providers", "12", "AWS, GCP, Azure and Firebase credentials", <Toggle key="t" on label="" />],
          ["AI & ML Services", "6", "OpenAI, Anthropic, HuggingFace, Perplexity keys", <Toggle key="t" on label="" />],
          ["Source Control & CI/CD", "16", "GitHub, GitLab, Terraform Cloud, CircleCI, Docker Hub", <Toggle key="t" on label="" />],
          ["Private Keys & Certificates", "5", "PEM, PGP, PuTTY, AGE keys", <Toggle key="t" on label="" />],
          ["PII — Financial", "7", "Visa, Mastercard, Amex, Discover, JCB card numbers", <Toggle key="t" on label="" />],
          ["PII — Contact & Network", "3", "IPv4, MAC addresses, phone numbers", <Toggle key="t" on={false} label="" />],
        ]}
      />
    </div>

    <SectionLabel>Custom Regex Patterns</SectionLabel>
    <Panel tone="subtle">
      <Row gap={16}>
        <Field label="Pattern Name" value="Internal API Key" width="40%" />
        <Field label="Regex Pattern" value="MYCO-[A-Za-z0-9]{32}" width="60%" />
      </Row>
      <Row gap={8}>
        <Field label="Test String (optional)" value="key=MYCO-8f2b41d09c7e4a15b6d3e0f7a9c25813" width={380} />
        <span className="text-[12px] self-end pb-3" style={{ color: ATL.green }}>
          ✓ Match found
        </span>
      </Row>
      <Row gap={8}>
        <Btn variant="primary">Add Pattern</Btn>
        <Btn variant="subtle">Save Patterns</Btn>
      </Row>
    </Panel>
  </Screen>
);

/* ── Settings ──────────────────────────────────────────────────────────── */

const settings = (
  <Screen where="Jira → Apps → Secret Scanner → Settings" width={860}>
    <PageTitle>Secret &amp; PII Scanner</PageTitle>
    <Tabs items={TABS} active="Settings" />

    <Toggle on label="Secret & PII Scanner Enabled" />

    <SectionLabel>Scanning scope</SectionLabel>
    <Toggle on label="Scan Attachments — text-based files up to 1 MB (.txt, .json, .yaml, .env…)" />
    <Toggle on label="Scan change history (changelog)" />

    <SectionLabel>Remediation</SectionLabel>
    <Toggle on={false} label="Auto-Redaction" />
    <Panel tone="warn">
      <span className="text-[12px]">
        Auto-redaction permanently modifies issue content. Secrets will be replaced with{" "}
        <Code>[REDACTED]</Code>.
      </span>
    </Panel>
    <Toggle on label="Require Reason When Dismissing" />

    <SectionLabel>Issue Creation</SectionLabel>
    <Row gap={16}>
      <Select label="Target Project" value="Security (SEC)" width="50%" />
      <Select label="Issue Type" value="Task" width="50%" />
    </Row>
    <Btn variant="primary">Save</Btn>
  </Screen>
);

/* ── Webhook notifications ─────────────────────────────────────────────── */

const webhook = (
  <Screen where="Jira → Apps → Secret Scanner → Settings → Webhook Notifications" width={820}>
    <PageTitle>Webhook Notifications</PageTitle>
    <Sub>
      Send real-time notifications to Automation for Jira when secrets are detected, dismissed, resolved or redacted.
    </Sub>

    <Toggle on label="Webhook Notifications Enabled" />
    <Field label="Automation Webhook URL" value="https://automation.atlassian.com/pro/hooks/••••••••" help="URL must start with https://" />
    <Field label="Webhook Secret" value="••••••••••••••••" help="Paste the secret from Automation for Jira" />
    <Row gap={8}>
      <Btn>Test Connection</Btn>
      <span className="text-[12px] self-center" style={{ color: ATL.green }}>
        Connection successful
      </span>
    </Row>

    <SectionLabel>Notification Events — 3 events selected</SectionLabel>
    <Panel tone="subtle">
      <Checkbox on label="secret-detected" />
      <Checkbox on label="secret-redacted" />
      <Checkbox on label="bulk-scan-complete" />
      <Checkbox on={false} label="secret-dismissed" />
      <Checkbox on={false} label="secret-resolved" />
      <div className="text-[11px] mt-2" style={{ color: ATL.subtle }}>
        Unselected events are silently skipped.
      </div>
    </Panel>
  </Screen>
);

/* ── Analytics ─────────────────────────────────────────────────────────── */

const analytics = (
  <Screen where="Jira → Apps → Secret Scanner → Analytics" width={880}>
    <PageTitle>Security Analytics</PageTitle>
    <Sub>Detection trends, compliance metrics and remediation progress over the last 90 days.</Sub>
    <Tabs items={TABS} active="Analytics" />

    <Row gap={10}>
      <Stat value="11" label="Active Findings" tone={ATL.red} />
      <Stat value="146" label="Total Detected" />
      <Stat value="97" label="Dismissed" tone={ATL.subtle} />
      <Stat value="38" label="Auto-Redacted" tone={ATL.teal} />
    </Row>

    <SectionLabel>Detection Timeline</SectionLabel>
    <Panel tone="plain">
      <div className="flex items-end gap-1.5" style={{ height: 90 }}>
        {[8, 14, 6, 11, 4, 9, 17, 12, 5, 7, 13, 10, 3, 6, 9, 15, 8, 4, 11, 7].map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t"
            style={{ height: `${h * 5}px`, background: i % 4 === 3 ? ATL.teal : ATL.primary, opacity: 0.85 }}
          />
        ))}
      </div>
      <div className="text-[10px] mt-2" style={{ color: ATL.subtle }}>
        New detections (blue) · auto-redactions (teal) · daily, last 90 days
      </div>
    </Panel>

    <Row gap={12}>
      <div className="flex-1">
        <SectionLabel>Findings by Category</SectionLabel>
        <Panel tone="plain">
          {[
            ["Cloud Providers", 42],
            ["Source Control & CI/CD", 31],
            ["AI & ML Services", 24],
            ["PII — Financial", 11],
          ].map(([label, pct]) => (
            <div key={label as string} className="mb-2">
              <div className="text-[11px] mb-1">{label}</div>
              <Bar pct={pct as number} />
            </div>
          ))}
        </Panel>
      </div>
      <div className="flex-1">
        <SectionLabel>Findings by Field Type</SectionLabel>
        <Panel tone="plain">
          {[
            ["Description", 48],
            ["Comment", 34],
            ["Attachment", 12],
            ["Custom field", 6],
          ].map(([label, pct]) => (
            <div key={label as string} className="mb-2">
              <div className="text-[11px] mb-1">{label}</div>
              <Bar pct={pct as number} tone={ATL.purple} />
            </div>
          ))}
        </Panel>
      </div>
    </Row>
  </Screen>
);

export const SECRET_SCANNER_MOCKS: Record<string, ReactNode> = {
  "ss-findings": findings,
  "ss-dismiss": dismissDialog,
  "ss-bulk-scan": bulkScan,
  "ss-rules": rules,
  "ss-settings": settings,
  "ss-webhook": webhook,
  "ss-analytics": analytics,
};
