import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  /** Short, eye-catching stat or phrase used as the thumbnail-free card accent. */
  kicker: string;
  tag: string;
  tagColor: string;
  readTime: string;
  /** Which Synapse Oasis app this article maps to (shown as a chip). */
  app: string;
  /** ISO date (YYYY-MM-DD) used for sitemap lastmod + Article structured data + ordering. */
  date: string;
  content: string;
}

const posts: Omit<BlogPost, "content">[] = [
  // ── New app-focused posts ───────────────────────────────────────────────
  {
    slug: "stop-writing-jira-scripts",
    title: "Stop Writing Jira Scripts. Start Describing What You Want.",
    subtitle:
      "Workflow scripting is a relic. With Workflow Toolkit for Jira, you describe the rule in plain English and the AI builds the condition, validator, or post-function for you.",
    kicker: "English > Groovy",
    tag: "NO-CODE WORKFLOWS",
    tagColor: "#C27EEA",
    readTime: "7 min read",
    app: "Workflow Toolkit for Jira",
    date: "2026-05-31",
  },
  {
    slug: "saas-license-waste",
    title: "Organizations Waste $21M a Year on SaaS Licenses. Your Atlassian Seats Are Part of It.",
    subtitle:
      "Half the licenses you pay for are sitting idle, and per-user pricing turns every inactive user into a recurring line item.",
    kicker: "$21M/yr wasted",
    tag: "LICENSE WASTE",
    tagColor: "#1B9E6B",
    readTime: "8 min read",
    app: "License Waste Manager for Jira",
    date: "2026-05-22",
  },
  {
    slug: "secrets-leaking-in-jira",
    title: "6.1% of Jira Tickets Contain a Leaked Credential. That's the Worst Rate of Any Collaboration Tool.",
    subtitle:
      "Your code repos are scanned for secrets. Your Jira instance — full of pasted API keys, passwords, and tokens — almost certainly is not.",
    kicker: "6.1% of Jira tickets",
    tag: "SECRETS SPRAWL",
    tagColor: "#E25656",
    readTime: "8 min read",
    app: "Secret Scanner for Jira",
    date: "2026-05-15",
  },
  {
    slug: "jira-configuration-sprawl",
    title: "1,916 Custom Fields Turned a 2-Second Action Into a 13-Second One. That's Configuration Debt.",
    subtitle:
      "Every unused field, workflow, and scheme you never deleted is a tax your whole company pays on every click — and in 2026, Atlassian starts enforcing the limit.",
    kicker: "2s → 13s per action",
    tag: "CONFIG SPRAWL",
    tagColor: "#7E7CDE",
    readTime: "8 min read",
    app: "Health Hub for Jira",
    date: "2026-05-08",
  },
  {
    slug: "offboarding-and-admin-toil",
    title: "Only 34% of Companies Cut Access on a Departing Employee's Last Day. The Rest Leave the Door Open.",
    subtitle:
      "Manual Jira offboarding and admin cleanup don't just waste your team's time — they leave orphaned access that becomes a breach waiting to happen.",
    kicker: "Only 34% revoke on day 1",
    tag: "ADMIN TOIL",
    tagColor: "#EC8546",
    readTime: "8 min read",
    app: "Admin Toolkit for Jira",
    date: "2026-04-29",
  },
  {
    slug: "confluence-runs-on-markdown",
    title: "The AI Era Runs on Markdown. Confluence Doesn't. Here's the Bridge.",
    subtitle:
      "Every LLM reads and writes Markdown — Confluence doesn't. Markdown Toolkit makes Confluence speak Markdown both ways: AI writes your pages, diagrams render natively, and exports stay token-light for models.",
    kicker: "AI writes · Markdown renders",
    tag: "AI-NATIVE DOCS",
    tagColor: "#51A2E7",
    readTime: "7 min read",
    app: "Markdown Toolkit for Confluence",
    date: "2026-04-22",
  },
  {
    slug: "delegate-select-list-options",
    title: "Your Jira Admins Shouldn't Be a Dropdown Help Desk",
    subtitle:
      "Why editing a select-list option is a global-admin job in Jira — and how to give that power back to the people who own the process.",
    kicker: "0 admin tickets",
    tag: "FIELD GOVERNANCE",
    tagColor: "#2B2ED8",
    readTime: "5 min read",
    app: "Custom Fields Toolkit for Jira",
    date: "2026-04-15",
  },
  {
    slug: "fields-that-enforce-process",
    title: "Turn Jira Fields Into Guardrails, Not Just Data Entry",
    subtitle:
      "Most custom fields only collect data. The best ones quietly enforce the process you actually want people to follow.",
    kicker: "Forms → guardrails",
    tag: "PROCESS DESIGN",
    tagColor: "#7E7CDE",
    readTime: "6 min read",
    app: "Custom Fields Toolkit for Jira",
    date: "2026-04-08",
  },

  // ── Original AI Portal Chat / AI Triage posts ───────────────────────────
  {
    slug: "ticket-misrouting-hidden-cost",
    title: "23% of Your Tickets Go to the Wrong Team. Each One Wastes 109 Minutes.",
    subtitle: "The silent budget drain that no one tracks — but every support organization pays for.",
    kicker: "+109 min / misroute",
    tag: "MISROUTING",
    tagColor: "#EC8546",
    readTime: "8 min read",
    app: "AI Triage for Jira",
    date: "2026-03-31",
  },
  {
    slug: "incomplete-tickets-cost",
    title: "80% of Your Lost Productivity Comes From Just 12.6% of Tickets.",
    subtitle: "The incomplete ticket problem is smaller than you think — and more expensive than you imagine.",
    kicker: "12.6% → 80% loss",
    tag: "INCOMPLETE",
    tagColor: "#7E7CDE",
    readTime: "7 min read",
    app: "AI Portal Chat",
    date: "2026-03-24",
  },
  {
    slug: "portal-abandonment-crisis",
    title: "Only 14% of Self-Service Issues Get Resolved. Your Portal Has a $104M Problem.",
    subtitle: "Gartner published the number. CIO Magazine quantified the fallout.",
    kicker: "$104M problem",
    tag: "ABANDONMENT",
    tagColor: "#C27EEA",
    readTime: "9 min read",
    app: "AI Portal Chat",
    date: "2026-03-17",
  },
  {
    slug: "language-barriers-enterprise-cost",
    title: "Your Global Team Speaks 12 Languages. Your Portal Speaks One.",
    subtitle: "49% of global executives report annual losses of $8–11M from language barriers.",
    kicker: "$8–11M / year",
    tag: "LANGUAGE",
    tagColor: "#51A2E7",
    readTime: "9 min read",
    app: "AI Portal Chat",
    date: "2026-03-10",
  },
  {
    slug: "escalation-cost-analysis",
    title: "Every Escalated Ticket Costs 9x More. 67% of Frustrated Customers Just Leave.",
    subtitle: "The financial case for catching frustration before it becomes an escalation.",
    kicker: "9× cost per escalation",
    tag: "ESCALATION",
    tagColor: "#E25656",
    readTime: "10 min read",
    app: "AI Triage for Jira",
    date: "2026-03-03",
  },
  {
    slug: "proactive-escalation-prevention",
    title: "Your Agents Detect Frustration After the Damage Is Done. AI Detects It in 3 Seconds.",
    subtitle: "Why proactive sentiment detection is the highest-ROI investment in modern ITSM.",
    kicker: "3-second detection",
    tag: "PROACTIVE SUPPORT",
    tagColor: "#1B9E6B",
    readTime: "9 min read",
    app: "AI Triage for Jira",
    date: "2026-02-24",
  },
];

export function getAllPosts(): BlogPost[] {
  return posts
    .map((post) => {
      const filePath = path.join(process.cwd(), "content", "blog", `${post.slug}.md`);
      const content = fs.readFileSync(filePath, "utf-8");
      // Strip the leading H1 + subtitle block (kept in metadata); body starts after the first "---".
      const lines = content.split("\n");
      const bodyStart = lines.findIndex((l, i) => i > 0 && l.startsWith("---"));
      const body = bodyStart > 0 ? lines.slice(bodyStart + 1).join("\n").trim() : lines.slice(3).join("\n").trim();
      return { ...post, content: body };
    })
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
