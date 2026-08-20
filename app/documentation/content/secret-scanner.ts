import type { AppDocs } from "../types";

export const secretScanner: AppDocs = {
  slug: "secret-scanner",
  name: "Secret Scanner for Jira",
  shortName: "Secret Scanner",
  tagline:
    "Finds passwords, API keys, private keys and personal data that people have pasted into Jira issues, comments, change history and attachments. 142 detection patterns, findings stored masked, and a bulk scan for everything already in your instance.",
  products: "Jira · Jira Service Management",
  color: "#E5484D",
  icon: "/secret-scanner.png",
  ai: false,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "What it scans, what it stores, and the exact order to switch it on.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** A scanner that watches your Jira issues for credentials and personal data, and shows you a queue of what it found.",
        },
        {
          type: "p",
          text: "**Why this happens in the first place.** Jira is where debugging happens. Someone pastes a stack trace that contains a connection string. Someone attaches a config file to explain a problem. Someone drops an API key in a comment to unblock a colleague on a Friday. None of them are careless people; the ticket just felt like a private conversation.",
        },
        {
          type: "p",
          text: "**Who sets it up.** A [Jira administrator](/documentation/start-here/jira-words). The screens are global, because the findings cover every project.",
        },

        { type: "h", level: 2, text: "What gets scanned, and when" },
        {
          type: "callout",
          variant: "warning",
          title: "It starts scanning the moment you install it",
          text: "There is no master enable switch. With no configuration saved, every one of the 142 patterns is active, and any issue created, updated or commented on is scanned. To narrow it, switch categories or rules off on **Scanning Rules**, or exclude projects on **Project Exclusions**. Nothing is scanned retroactively, so your history stays untouched until you run a bulk scan.",
        },
        {
          type: "p",
          text: "Scanning happens as things change. There is no batch job running overnight, and nothing slows down for the user.",
        },
        {
          type: "table",
          head: ["What", "When", "Notes"],
          rows: [
            [
              "Summary, description and every text custom field",
              "Any issue create, update or new comment",
              "Always on. Each event triggers a **full re-scan of the whole issue**, not just the part that changed.",
            ],
            [
              "Every comment on the issue",
              "Any issue create, update or new comment",
              "Always on. Editing an existing comment is not itself a trigger — the edit is picked up on the issue's next scan.",
            ],
            ["Change history", "The same events", "Optional, off by default. Reads both sides of every change, so a value pasted and later replaced is caught."],
            [
              "Attachments",
              "The same events",
              "Optional, off by default. Text-based files up to 1 MB — 51 extensions including `.env`, `.yaml`, `.json`, `.sql`, `.tf`, `.properties`, `.pem` and `.key`. Binary files are not read.",
            ],
            ["Everything that already exists", "When you run it", "The [bulk scan](/documentation/secret-scanner/bulk-scan), driven by a JQL query."],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "The secret itself is never stored",
          text: "A finding keeps the issue key, the field, which pattern matched, a **masked** preview showing only the first four characters, and a one-way hash of the value so the same finding is not reported twice. The hash cannot be turned back into the secret. This matters, because a security tool that kept a database of your passwords would be the problem, not the solution.",
        },

        { type: "h", level: 2, text: "What you need first" },
        {
          type: "list",
          items: [
            "Jira Cloud. Works with Jira Software, Jira Work Management and Jira Service Management.",
            "**Jira administrator** rights.",
            "A project where remediation tickets should be created, if you want to use the **Create Issue** button on a finding. A small `SEC` project works well.",
          ],
        },

        { type: "h", level: 2, text: "Switch it on in this order" },
        {
          type: "steps",
          items: [
            "Install the app and open **Jira → Apps → Secret Scanner**.",
            "Understand that scanning is **already running**: from the moment the app is installed, every issue create, update and comment event is scanned with all 142 patterns. There is no master on/off switch.",
            "Open **Scanning Rules** first and review the 17 categories. Switch off anything that will be pure noise in your instance — this is how you narrow the scope.",
            "On the same tab, enable **Scan Issue Changelog** and **Scan Attachments**. These are where most real findings hide, and they are off by default.",
            "Leave **Auto-Redaction** off. Do not enable it yet; see the warning below.",
            "Go to **Settings → Issue Creation** and set the **Target Project** and **Issue Type** used when you create a remediation ticket from a finding.",
            "Open **Project Exclusions** and exclude projects that legitimately contain credential-shaped sample text, such as a sandbox or a training project.",
            "Run a [bulk scan](/documentation/secret-scanner/bulk-scan) over the last year of one project, to see what your instance looks like.",
            "Work through that queue before scanning everything else.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Do not enable auto-redaction on day one",
          text: "Auto-redaction edits real issue content, replacing the value with `[REDACTED]`. Until you know your false-positive profile, you would be editing your colleagues' tickets based on patterns you have not reviewed. Turn it on later, once the findings have proven accurate.",
        },

        { type: "h", level: 2, text: "The eight tabs" },
        {
          type: "table",
          head: ["Tab", "What it is for"],
          rows: [
            ["**Findings**", "Your working queue. Everything the scanner found, with the actions to deal with it."],
            ["**Dismissed**", "What was dismissed, by whom, when and why."],
            ["**Bulk Scan**", "Scan issues that already exist, using a JQL query."],
            ["**Analytics**", "Trends over 90 days, by day, category and field."],
            ["**Audit Log**", "App events for 90 days, filterable and exportable as CSV."],
            [
              "**Scanning Rules**",
              "The 17 categories and individual rules, your own regular expressions, **and the four scanning switches**: Scan Issue Changelog, Scan Attachments, Auto-Redaction and Require Reason When Dismissing.",
            ],
            ["**Project Exclusions**", "Projects the scanner skips silently."],
            ["**Settings**", "Two cards only: **Issue Creation** (target project and issue type) and **Webhook Notifications**."],
          ],
        },
      ],
    },

    {
      slug: "findings",
      title: "Findings and triage",
      description: "How to read a finding, and which of the four actions to use.",
      blocks: [
        {
          type: "p",
          text: "**What this page is for.** Working the queue. The **Findings** tab is where you spend your time; everything else configures it.",
        },
        { type: "mock", id: "ss-findings" },

        { type: "h", level: 2, text: "How to read a row" },
        {
          type: "fields",
          items: [
            { name: "Issue", text: "The issue containing the secret. The link takes you straight to it." },
            {
              name: "Field",
              text: "Where in the issue: the summary, the description, a comment, a custom field, the change history, or a named attachment.",
            },
            {
              name: "Category and Pattern",
              text: "What matched, for example *Cloud Providers* → *AWS Access Key ID*. **This tells you what to rotate**, which is the most important information on the row.",
            },
            {
              name: "Match",
              text: "The masked preview: the first four characters only. Enough to find the value in the issue, not enough to use it.",
            },
            { name: "Status", text: "**Open**, **In Progress** or **Resolved**. A finding linked to a remediation ticket follows that ticket's status." },
            { name: "Redacted", text: "A badge shown when auto-redaction replaced the value in the issue." },
          ],
        },

        { type: "h", level: 2, text: "The three actions, and when to use each" },
        {
          type: "p",
          text: "**Create Issue** is a button in the *Issue* column. **Resolve** and **Dismiss (false positive)** are in the row's ⋮ menu.",
        },
        {
          type: "table",
          head: ["Action", "Use it when", "What happens"],
          rows: [
            [
              "**Create Issue**",
              "The finding is real and a credential must be rotated.",
              "Creates a ticket in your target project — summary `[Secret Detected] pattern in ISSUE-KEY` — links it to the finding, and tracks its status on this row. It is created **as you**, so you need Create Issue permission in that project.",
            ],
            [
              "**Resolve**",
              "You have dealt with it and do not need a ticket.",
              "**Deletes the finding from the queue.** It is not recorded on the Dismissed tab and the value is not suppressed, so if the secret is still in the issue it will be found again on the next scan. The action is logged in the Audit Log.",
            ],
            [
              "**Dismiss (false positive)**",
              "It is a false positive.",
              "Suppresses that value so it is not reported again, and records who, when and why on the **Dismissed** tab. There is no un-dismiss.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Rotate first, clean up second",
          text: "Deleting a key from a Jira comment does not un-leak it. Everyone who could see that issue could see the value, and it is still in the change history. Treat every real finding as a rotation task first. Editing the ticket is the tidy-up, not the fix.",
        },

        { type: "h", level: 2, text: "Dismissing a false positive" },
        { type: "mock", id: "ss-dismiss" },
        {
          type: "p",
          text: "A dismissal covers that exact value, in that **kind** of field, on that one issue. So the same value in a different comment on the same issue counts as the same finding and stays suppressed, while the same value on another issue, or in a different kind of field, is a new finding.",
        },
        {
          type: "p",
          text: "Turn on **Require Reason When Dismissing** in Settings if anyone will ever audit this. The reason is stored with the dismissal, which is what makes the **Dismissed** tab useful six months later.",
        },

        { type: "h", level: 2, text: "Analytics" },
        { type: "mock", id: "ss-analytics" },
        {
          type: "p",
          text: "The **Analytics** tab answers the two questions a security review asks: is exposure going up or down, and where does it come from. Detections per day over 90 days, split by category and by field type, plus totals for dismissals and redactions.",
        },
      ],
    },

    {
      slug: "bulk-scan",
      title: "Bulk scan",
      description: "Scan the issues that already exist. Start small.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Real-time scanning only sees what changes from now on. A bulk scan looks at issues that are already in your instance, chosen by a JQL query.",
        },
        { type: "mock", id: "ss-bulk-scan" },

        { type: "h", level: 2, text: "How to run one" },
        {
          type: "steps",
          items: [
            "Open the **Bulk Scan** tab.",
            "Write a JQL query for the issues to cover and click **Validate**. A query is rejected if it matches nothing, or **more than 1,000 issues — the per-scan maximum**.",
            "Optionally override the scan settings for this run only: the changelog, attachment and auto-redaction switches and the whole category and rule tree are repeated on this tab, pre-filled from your saved configuration.",
            "Click **Start Scan (N issues)**. It runs in batches in the background, so you can close the page.",
            "Watch progress and the count of new findings. Review them on the **Findings** tab.",
            "**Cancel Scan** stops a running scan; **Scan Again** clears a finished one. Cancelling discards the remaining queue — there is no resume.",
          ],
        },
        {
          type: "code",
          label: "Queries worth using",
          text: `-- Start here: one project, three months
project = SUP AND created >= -90d

-- Widen in slices that stay under 1,000 issues
project = SUP AND created >= -365d AND created < -90d

-- Anywhere someone pasted a configuration block
text ~ "BEGIN RSA PRIVATE KEY" OR text ~ "connectionString"`,
        },
        {
          type: "callout",
          variant: "tip",
          title: "Scan in slices, not all at once",
          text: "A first scan over a large instance produces a backlog nobody works through. Go project by project, or year by year. You will also spot a noisy category early and switch it off before it fills the queue with false positives.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Why the scan can see projects you cannot",
          text: "The scanner reads issues with the app's own access, so a bulk scan covers every project in the query even if you personally cannot browse it. That is deliberate: an exposed key in a project you cannot see is still an exposed key. It is also why these screens are restricted to Jira administrators.",
        },
      ],
    },

    {
      slug: "scanning-rules",
      title: "Scanning rules and scope",
      description: "The 17 categories, your own patterns, what to scan, and which projects to skip.",
      blocks: [
        {
          type: "p",
          text: "**What this page is for.** Controlling what counts as a finding. Getting this right is the difference between a queue your team works and a queue your team ignores.",
        },
        {
          type: "p",
          text: "The app ships **142 detection patterns in 17 categories**. You can switch off a whole category, switch off individual rules, and add patterns of your own.",
        },
        { type: "mock", id: "ss-rules" },

        { type: "h", level: 2, text: "The 17 categories" },
        {
          type: "table",
          head: ["Category", "Patterns", "What it detects"],
          rows: [
            ["Cloud Providers", "12", "AWS, GCP, Azure and Firebase credentials"],
            ["AI & ML Services", "6", "OpenAI, Anthropic, HuggingFace, Perplexity keys"],
            ["Source Control & CI/CD", "16", "GitHub, GitLab, Terraform Cloud, CircleCI, Docker Hub and more"],
            ["Communication Platforms", "9", "Slack, Discord, Telegram and Teams tokens and webhooks"],
            ["Payment Processors", "10", "Stripe, Square, Shopify, Plaid, Braintree"],
            ["Email & SMS Services", "7", "SendGrid, Mailchimp, Mailgun, Twilio, Brevo"],
            ["Observability & Monitoring", "9", "New Relic, Grafana, Dynatrace, Sentry"],
            ["Infrastructure & DevOps", "12", "Vault, Heroku, DigitalOcean, Cloudflare and other infrastructure tokens"],
            ["Package Registries", "7", "npm, PyPI, RubyGems, Clojars, JFrog, NuGet"],
            ["Database Connections", "6", "MongoDB, PostgreSQL, MySQL, Redis, RabbitMQ connection strings"],
            ["Tokens & Auth Standards", "3", "JWT, Bearer tokens, Basic Auth headers"],
            ["Private Keys & Certificates", "5", "PEM, PGP, PuTTY and AGE private keys"],
            ["PII — Personal Identification", "4", "CPF, CNPJ, SSN, ITIN"],
            ["PII — Financial", "7", "Visa, Mastercard, Amex, Discover, Diners Club, JCB card numbers"],
            ["PII — Contact & Network", "3", "IP addresses, MAC addresses, phone numbers"],
            ["Generic Keyword Secrets", "4", "`password=` style assignments, secret variables, environment secrets"],
            ["Miscellaneous Services", "22", "Atlassian, 1Password, Notion, Linear, Postman, Figma, HubSpot and others"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Switch these two off first if the queue is too noisy",
          text: "**PII — Contact & Network** matches every IP address and phone number, which in an operations project means most tickets. **Generic Keyword Secrets** matches `password=` anywhere, including in sample code and documentation. Both are valuable in some instances and pure noise in others. Decide per category, not per finding.",
        },

        { type: "h", level: 2, text: "Adding your own patterns" },
        {
          type: "p",
          text: "Internal credentials have internal shapes, and no shipped pattern will know them. Under **Custom Regex Patterns** you give the pattern a name and a regular expression, and you can paste a sample string to check it matches before saving. There is no limit on how many you add.",
        },
        {
          type: "list",
          items: [
            "**Anchor it to a distinctive prefix.** `MYCO-[A-Za-z0-9]{32}` finds your keys. A bare `[A-Za-z0-9]{32}` finds every long word in your instance.",
            "**Test with a real sample and a near-miss.** The test box exists so you can confirm both.",
            "**Name it after the credential.** That name appears on the finding, and it tells the responder what to rotate.",
          ],
        },

        { type: "h", level: 2, text: "Scanning scope and remediation settings" },
        { type: "mock", id: "ss-settings" },
        {
          type: "table",
          head: ["Setting", "What it does", "What we recommend"],
          rows: [
            [
              "**Scan Attachments**",
              "Reads text-based attachments up to 1 MB: `.txt`, `.json`, `.yaml`, `.env` and similar. Binary files are never read.",
              "**On.** Config files are where the worst findings live.",
            ],
            [
              "**Scan change history**",
              "Covers values that were pasted and later edited out.",
              "**On.** The changelog keeps them, so your scanning should too.",
            ],
            [
              "**Auto-Redaction**",
              "Replaces every occurrence with `[REDACTED]` in the summary, description, comments and text custom fields. It **permanently changes issue content**, the edit is made by the app rather than by you, and it never touches change history or attachments — a secret in the changelog can only be removed by deleting the issue.",
              "**Off** at first. Turn it on only once you trust your pattern set.",
            ],
            [
              "**Require Reason When Dismissing**",
              "Forces a reason on every dismissal.",
              "**On** if anyone will audit this. It costs the person five seconds.",
            ],
            ["**Target Project / Issue Type**", "Where **Create Issue** files remediation tickets.", "A dedicated security project."],
          ],
        },

        { type: "h", level: 2, text: "Project exclusions" },
        {
          type: "p",
          text: "Some projects legitimately contain credential-shaped text: a sandbox, a training project, documentation examples. List them under **Project Exclusions** and the scanner skips them silently.",
        },
        {
          type: "p",
          text: "Do this rather than letting your team learn to ignore findings. A queue with known-fake entries in it stops being read.",
        },
      ],
    },

    {
      slug: "notifications",
      title: "Notifications and audit log",
      description: "Push findings into Automation for Jira, and keep a 90-day record of what happened.",
      blocks: [
        {
          type: "p",
          text: "**Why.** A finding nobody sees is not a control. Webhook notifications hand each event to **Automation for Jira**, and your existing automation rules decide what happens next: a Slack message, an email, a page, a ticket somewhere else.",
        },
        { type: "mock", id: "ss-webhook" },

        { type: "h", level: 2, text: "Setting it up" },
        {
          type: "steps",
          items: [
            "In Jira, go to **Project settings → Automation → Create rule** and choose the **Incoming webhook** trigger.",
            "Copy the webhook URL and the secret that Automation generates.",
            "In **Secret Scanner → Settings → Webhook Notifications**, switch notifications on and paste both values. The URL must start with `https://`.",
            "Choose which events should fire.",
            "Click **Test Connection** to confirm the rule receives a payload.",
            "Build the rest of your automation rule around that payload.",
          ],
        },
        {
          type: "table",
          head: ["Event", "Fires when", "Worth notifying?"],
          rows: [
            ["`secret-detected`", "A new finding is recorded.", "Yes. This is the one that needs a human."],
            ["`bulk-scan-complete`", "A bulk scan finishes.", "Yes, so somebody goes and reads the results."],
            ["`secret-redacted`", "Auto-redaction changed an issue.", "Yes, if redaction is enabled."],
            ["`secret-dismissed`", "Somebody dismissed a finding.", "Only if you review dismissals."],
            ["`secret-resolved`", "A finding was marked resolved.", "Usually not."],
          ],
        },
        {
          type: "callout",
          variant: "info",
          text: "Events you do not select are skipped silently. Start with the first two and add others when you have somewhere for them to go.",
        },

        { type: "h", level: 2, text: "Audit log" },
        {
          type: "p",
          text: "The **Audit Log** tab records app events for **90 days**. You can filter by account ID, event type and details, and export to CSV.",
        },
        {
          type: "p",
          text: "This is what answers “who dismissed that finding, and when”. The CSV export is what goes into an evidence pack for an audit.",
        },
      ],
    },

    {
      slug: "reference",
      title: "Permissions, data and limits",
      description: "What the app can access, exactly what it stores, retention, and troubleshooting.",
      blocks: [
        { type: "h", level: 2, text: "Limits and retention" },
        {
          type: "table",
          head: ["Item", "Value"],
          rows: [
            ["Detection patterns", "142, in 17 categories, plus your own"],
            ["Attachment scanning", "Text-based files up to 1 MB"],
            ["Audit log retention", "90 days"],
            ["Analytics window", "90 days"],
            ["Stored value of a secret", "Masked preview (4 characters) plus a one-way SHA-256 hash. Never the value itself."],
          ],
        },

        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            ["`read:jira-work`", "Read issue fields, comments, change history and attachments in order to scan them."],
            ["`write:jira-work`", "Create remediation issues, and apply auto-redaction when you enable it."],
            ["`read:jira-user`", "Resolve the comment author and the person who dismissed a finding."],
            ["`manage:jira-project`, `manage:jira-configuration`", "Read project and field configuration for the settings screens."],
            ["`storage:app`", "Store findings, configuration, the audit log and scan progress."],
          ],
        },
        {
          type: "p",
          text: "Outbound access is limited to `*.atlassian.com`, which covers the Automation for Jira webhook. Nothing is sent anywhere else.",
        },

        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "fields",
          items: [
            {
              name: "Findings",
              text: "Issue key and summary, the field and its label, the category and pattern, the **masked** match, a one-way hash for deduplication, the detection time, the comment author where relevant, the linked remediation ticket and its status, and the redaction flag.",
            },
            { name: "Dismissals", text: "Who dismissed a finding, when, and the reason." },
            {
              name: "Configuration",
              text: "Enabled categories and rules, your custom patterns, scanning scope, project exclusions, target project and issue type, and the webhook URL and **webhook secret**.",
            },
            { name: "Audit log", text: "App events, for 90 days." },
            { name: "Scan progress", text: "Cursors for bulk scans, so a long scan can resume." },
          ],
        },
        {
          type: "p",
          text: "The [privacy policy](/privacy/secret-scanner) is the full, authoritative list.",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "No findings at all",
              text: "Check in this order: the scanner is enabled in **Settings**; at least one category is on; the project is not excluded. Remember real-time scanning only covers changes made after you enabled it — run a bulk scan for history.",
            },
            {
              name: "Far too many findings",
              text: "Switch off **PII — Contact & Network** and **Generic Keyword Secrets** first, then exclude sandbox and training projects.",
            },
            {
              name: "A secret in an attachment was missed",
              text: "Three conditions: **Scan Attachments** enabled, file is text-based, file is under 1 MB. Archives, PDFs and images are not read.",
            },
            {
              name: "A dismissed finding came back",
              text: "Dismissal covers one exact value in one exact place. The same value pasted elsewhere is a new finding, by design.",
            },
            {
              name: "The webhook test fails",
              text: "The URL must be the Automation incoming-webhook URL and start with `https://`, with the secret Automation issued. A disabled automation rule also fails the test.",
            },
            {
              name: "Auto-redaction removed something it should not have",
              text: "The field cannot be un-redacted, but the original text is still in the issue's change history. Disable auto-redaction, dismiss the pattern that caused it, and restore the value from the history.",
            },
          ],
        },
        {
          type: "p",
          text: "When you [open a ticket](https://synapseoasis.atlassian.net/servicedesk/customer/portals), send us the pattern name and the field. Never send the secret itself.",
        },
      ],
    },

    {
      slug: "faq",
      title: "FAQ",
      description: "Questions people ask before installing, and the ones security reviews always ask.",
      blocks: [
        { type: "h", level: 2, text: "The obvious worry" },
        {
          type: "fields",
          items: [
            {
              name: "Does the app store our secrets?",
              text: "No. It stores a masked preview of four characters and a one-way SHA-256 hash used to recognise the same finding twice. The hash cannot be reversed.",
            },
            {
              name: "Does anything leave Atlassian?",
              text: "No. The app runs on Atlassian Forge, and its only allowed outside address is `*.atlassian.com`, used for the Automation for Jira webhook.",
            },
            {
              name: "Can SynapseOasis see our findings?",
              text: "No. Everything is stored inside your own Atlassian site, and we have no access to it.",
            },
            {
              name: "Does it use AI?",
              text: "No. Detection is pattern-based, which is why it is deterministic and fast, and why you can add your own regular expressions.",
            },
          ],
        },

        { type: "h", level: 2, text: "Coverage" },
        {
          type: "fields",
          items: [
            {
              name: "Does it scan attachments?",
              text: "Text-based files up to 1 MB, when you enable it. Binary formats such as PDFs, images and archives are not read.",
            },
            {
              name: "Does it scan Confluence?",
              text: "No. This app covers Jira issues, comments, change history and attachments.",
            },
            {
              name: "Will it find secrets in old tickets?",
              text: "Only if you run a bulk scan. Real-time scanning starts from the moment you enable it.",
            },
            {
              name: "Can I add patterns for our internal credentials?",
              text: "Yes, as many as you like, with a test box to check them before saving. See [Scanning rules](/documentation/secret-scanner/scanning-rules).",
            },
            {
              name: "Does it detect personal data as well as credentials?",
              text: "Yes: card numbers, national identifiers such as SSN, CPF and CNPJ, phone numbers, IP addresses. Those categories can be switched off if they are noise for you.",
            },
          ],
        },

        { type: "h", level: 2, text: "Operating it" },
        {
          type: "fields",
          items: [
            {
              name: "Will it slow Jira down for users?",
              text: "No. Scanning happens after the event, outside the user's request. Nobody waits for it.",
            },
            {
              name: "Should I enable auto-redaction?",
              text: "Not at first. It permanently edits issue content. Enable it after a few weeks, when the findings have shown themselves to be accurate.",
            },
            {
              name: "Who should own the findings queue?",
              text: "Whoever can rotate credentials. A queue owned by someone who has to ask another team to act stalls immediately.",
            },
            {
              name: "How do I prove to an auditor that we handle exposures?",
              text: "Two things: the **Analytics** tab for the trend, and the **Audit Log** CSV export for who did what and when.",
            },
            {
              name: "What happens when I uninstall?",
              text: "The app's stored data is cleared and detached immediately, so nobody can read it any more — then Atlassian destroys it under its own retention policy, documented as 28 days. See [Where your data goes](/documentation/start-here/your-data). That includes the findings and the audit log, so export the audit CSV first if you need it. Remediation tickets stay in Jira.",
            },
          ],
        },
      ],
    },
  ],
};
