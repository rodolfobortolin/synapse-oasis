import type { AppDocs } from "../types";

export const secretScanner: AppDocs = {
  slug: "secret-scanner",
  name: "Secret Scanner for Jira",
  shortName: "Secret Scanner",
  tagline:
    "Finds passwords, API keys, private keys and personal data that people have pasted into Jira issues, comments, change history and attachments. 165 detection patterns, findings stored masked, and a bulk scan for everything already in your instance.",
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
          text: "There is a master switch — **Secret & PII Scanner**, at the top of **Scanning Rules** — and it ships **on**. So with no configuration saved, every one of the 165 patterns is active and any issue created, updated or commented on is scanned. To narrow it, switch categories or rules off on the same tab, or exclude projects on **Project Exclusions**. Nothing is scanned retroactively, so your history stays untouched until you run a bulk scan.",
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
              "Optional, off by default. Text-based files up to 1 MB — 55 extensions including `.env`, `.yaml`, `.json`, `.sql`, `.tf`, `.properties`, `.pem` and `.key`, against an allowlist of 24 MIME types. Binary files are not read.",
            ],
            ["Everything that already exists", "When you run it", "The [bulk scan](/documentation/secret-scanner/bulk-scan), driven by a JQL query."],
            [
              "Nothing, when an issue is deleted",
              "An issue is deleted",
              "The app listens for the deletion too, and clears that issue's findings out of the queue rather than leaving rows pointing at an issue nobody can open.",
            ],
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
            "Understand that scanning is **already running**: the **Secret & PII Scanner** master switch ships on, so from the moment the app is installed every issue create, update and comment event is scanned with all 165 patterns.",
            "Open **Scanning Rules** first and review the 17 categories. Switch off anything that will be pure noise in your instance — this is how you narrow the scope.",
            "On the same tab, enable **Scan Issue Changelog** and **Scan Attachments**. These are where most real findings hide, and they are off by default.",
            "Leave **Auto-Redaction** off. Do not enable it yet; see the warning below.",
            "Go to **Settings → Issue Creation** and set the **Tracking project**, **Issue Type** and **Priority** used when a remediation ticket is raised from a finding. Leave *Create the tracking ticket automatically* unticked until you trust the findings.",
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
            ["**Dismissed**", "What was dismissed or resolved, by whom, when and why \u2014 and where you undo it."],
            ["**Bulk Scan**", "Scan issues that already exist, using a JQL query."],
            ["**Analytics**", "Trends over 90 days, by day, category and field."],
            [
              "**Scanning Rules**",
              "The master **Secret & PII Scanner** switch, the 17 categories and individual rules, your own regular expressions, **and the four scanning switches**: Scan Issue Changelog, Scan Attachments, Auto-Redaction and Require Reason When Dismissing.",
            ],
            ["**Project Exclusions**", "Projects the scanner skips silently."],
            ["**Settings**", "One card: **Issue Creation** \u2014 the tracking project, issue type and priority for tickets raised from a finding, and whether to raise them automatically."],
            ["**Audit Log**", "App events for 90 days, filterable and exportable as CSV."],
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

        { type: "h", level: 2, text: "The actions, and when to use each" },
        {
          type: "p",
          text: "**Create Issue** is a button in the *Issue* column. **Resolve** and **Dismiss (false positive)** are in the row's ⋮ menu. **Restore** lives on the **Dismissed** tab, and it is the way back from either of them.",
        },
        {
          type: "table",
          head: ["Action", "Use it when", "What happens"],
          rows: [
            [
              "**Create Issue**",
              "The finding is real and a credential must be rotated.",
              "Creates a ticket in your tracking project — summary `[Secret Detected] pattern in ISSUE-KEY` — links it to the finding, and tracks its status on this row. It is created **as you**, so you need Create Issue permission in that project.",
            ],
            [
              "**Resolve**",
              "You have dealt with it and do not need a ticket.",
              "Takes the finding out of the working queue and records it on the **Dismissed** tab with the outcome *Resolved*. The value is **not** suppressed, so if the secret is still in the issue it will be found again on the next scan — which is the point. The action is logged in the Audit Log.",
            ],
            [
              "**Dismiss (false positive)**",
              "It is a false positive.",
              "Suppresses that value so it is not reported again, and records who, when and why on the **Dismissed** tab with the outcome *Dismissed*.",
            ],
            [
              "**Restore**",
              "You dismissed or resolved something you should not have.",
              "On the **Dismissed** tab, puts the finding back in the queue and lifts the suppression. There is a way back from every judgement on this screen.",
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
          text: "Turn on **Require Reason When Dismissing** on **Scanning Rules** if anyone will ever audit this. The reason is stored with the dismissal, which is what makes the **Dismissed** tab useful six months later.",
        },
        {
          type: "p",
          text: "The tab lists dismissals and resolutions together, filterable by issue key, pattern, category and outcome, with **Export CSV** for the whole history and a per-row **Restore**.",
        },

        { type: "h", level: 2, text: "Analytics" },
        { type: "mock", id: "ss-analytics" },
        {
          type: "p",
          text: "The **Analytics** tab answers the two questions a security review asks: is exposure going up or down, and where does it come from. Detections per day over 90 days, split by category and by field type, alongside totals for what is still open, what was dismissed, what was resolved and what was auto-redacted.",
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
          text: "The app ships **165 detection patterns in 17 categories**. You can switch off a whole category, switch off individual rules, and add patterns of your own.",
        },
        { type: "mock", id: "ss-rules" },

        { type: "h", level: 2, text: "The 17 categories" },
        {
          type: "table",
          head: ["Category", "Patterns", "What it detects"],
          rows: [
            ["Cloud Providers", "17", "AWS, GCP, Azure, Firebase and Supabase credentials"],
            ["AI & ML Services", "9", "OpenAI, Anthropic, HuggingFace, OpenRouter, Groq, xAI, Perplexity keys"],
            ["Source Control & CI/CD", "17", "GitHub, GitLab, Bitbucket, Terraform Cloud, CircleCI, Docker Hub, SonarQube"],
            ["Communication Platforms", "9", "Slack, Discord, Telegram and Teams tokens and webhooks"],
            ["Payment Processors", "11", "Stripe, Square, Shopify, Plaid, Braintree"],
            ["Email & SMS Services", "7", "SendGrid, Mailchimp, Mailgun, Twilio, Brevo"],
            ["Observability & Monitoring", "10", "New Relic, Grafana, Dynatrace, Sentry, Datadog"],
            ["Infrastructure & DevOps", "13", "Vault, Heroku, DigitalOcean, Cloudflare, Doppler, Pulumi, Databricks, Fly.io"],
            ["Package Registries", "8", "npm, PyPI, RubyGems, Clojars, JFrog, crates.io, NuGet"],
            ["Database Connections", "8", "MongoDB, PostgreSQL, MySQL, Redis, Snowflake, RabbitMQ connection strings"],
            ["Tokens & Auth Standards", "3", "JWT, Bearer tokens, Basic Auth headers"],
            ["Private Keys & Certificates", "5", "PEM, PGP, PuTTY and AGE private keys, X.509 certificates"],
            ["PII — Personal Identification", "8", "CPF, CNPJ, RG, PIS/PASEP, SSN, ITIN"],
            ["PII — Financial", "8", "Visa, Mastercard, Amex, Discover, Diners Club, JCB card numbers, IBAN"],
            ["PII — Contact & Network", "3", "IP addresses, MAC addresses, phone numbers"],
            ["Generic Keyword Secrets", "4", "`password=` style assignments, secret variables, environment secrets"],
            ["Miscellaneous Services", "25", "Atlassian, Okta, 1Password, Notion, Linear, Postman, Figma, HubSpot and others"],
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
            [
              "**Secret & PII Scanner** (the master switch)",
              "At the top of **Scanning Rules**. Off means nothing is scanned at all — no events, no bulk scans.",
              "**On**, which is how it ships. Use the categories to narrow the scope rather than this switch, unless you genuinely need to stop everything.",
            ],
            [
              "**Tracking project / Issue Type / Priority**",
              "On the **Settings** tab, under **Issue Creation**. Where **Create Issue** files remediation tickets, and at what priority.",
              "A dedicated security project. Priority defaults to the highest your site has.",
            ],
            [
              "**Create the tracking ticket automatically**",
              "A checkbox in the same card. Raises the remediation ticket the moment a finding is detected, without anybody clicking anything.",
              "**Off** until the findings have proven accurate. On a noisy pattern set it fills a project with tickets faster than anyone can close them.",
            ],
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
      slug: "audit-log",
      title: "Audit log",
      description: "A 90-day record of what the app did and who acted on a finding.",
      blocks: [
        {
          type: "p",
          text: "**Why.** A finding nobody can account for later is not evidence. The **Audit Log** tab records app events for **90 days**, so \u201cwho dismissed that finding, and when\u201d has an answer.",
        },
        {
          type: "p",
          text: "You can filter by user, event type and details, and export the page to CSV — `Time`, `Account ID`, `Event Type`, `Event Details`. That export is what goes into an evidence pack for an audit. When more events match than the screen will show, the page says so rather than letting you export a prefix believing it is the whole range.",
        },
        {
          type: "p",
          text: "Events are stored one row per event in **Forge SQL** and deleted after 90 days. There is no cap on how many a day may hold — a busy day is exactly when the log has to keep recording.",
        },
        {
          type: "p",
          text: "What is recorded: settings changes, the scanner being switched on or off, each dismissal, restore, resolution and redaction, bulk scans starting and finishing, and each pattern, rule or category being added, removed or toggled. Findings and dismissals evicted at their storage cap are recorded too, so a queue that quietly stopped growing has an explanation.",
        },
        {
          type: "callout",
          variant: "info",
          title: "No outbound notifications",
          text: "Secret Scanner sends nothing outside your Atlassian tenant \u2014 there is no webhook and no external address in its manifest at all. That is what earns it Atlassian's **Runs on Atlassian** badge, and for an app that reads credentials out of your issues we thought that mattered more than pushing events to a chat channel. To act on a finding automatically, have Automation for Jira watch the issues the app creates or the label it applies.",
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
            ["Detection patterns", "165, in 17 categories, plus your own"],
            ["Attachment scanning", "Text-based files up to 1 MB, 55 extensions and 24 MIME types"],
            ["Bulk scan", "1,000 issues per scan, processed 50 per batch"],
            ["Findings held in the queue", "500. The oldest are evicted past that, and the eviction is written to the audit log."],
            ["Dismissals and resolutions held", "1,000, evicted the same way"],
            ["Audit log retention", "90 days, one row per event, no per-day cap"],
            ["Analytics window", "90 days"],
            ["Stored value of a secret", "Masked preview (4 characters) plus a one-way SHA-256 hash. Never the value itself."],
          ],
        },

        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            [
              "`read:jira-work`",
              "Read issue fields, comments, change history and attachments in order to scan them, and read the project and field lists the settings screens offer you.",
            ],
            ["`write:jira-work`", "Create remediation issues, and apply auto-redaction when you enable it."],
            ["`read:jira-user`", "Resolve the comment author and the person who dismissed a finding — at the moment the screen draws them, not by storing the name."],
            ["`storage:app`", "Store findings, dismissals, configuration and scan progress. The audit log itself is **Forge SQL**, one row per event."],
            [
              "`report:personal-data`",
              "Atlassian's Personal Data Reporting cycle. Once a day the app reports every account ID it holds — on findings, on dismissals **and in the audit table** — and erases what belongs to an account Atlassian reports as closed.",
            ],
          ],
        },
        {
          type: "p",
          text: "The app declares no outbound network access at all. Nothing leaves your Atlassian tenant.",
        },
        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "fields",
          items: [
            {
              name: "Findings",
              text: "Issue key and summary, the field and its label, the category and pattern, the **masked** match, a one-way hash for deduplication, the detection time, the comment author where relevant, the linked remediation ticket and its status, and the redaction flag.",
            },
            { name: "Dismissals and resolutions", text: "Who actioned a finding, when, the outcome and the reason." },
            {
              name: "Configuration",
              text: "Enabled categories and rules, your custom patterns, scanning scope, project exclusions, and the tracking project, issue type and priority for created issues.",
            },
            { name: "Audit log", text: "App events, one row per event in Forge SQL, for 90 days." },
            { name: "Scan progress", text: "The issue list and position of a bulk scan, so it can carry on across invocations." },
          ],
        },
        {
          type: "p",
          text: "The [privacy policy](/privacy/secret-scanner) is the full, authoritative list.",
        },

        { type: "h", level: 2, text: "What happens without an active licence" },
        {
          type: "p",
          text: "Licensing is enforced, and the line was drawn so that a lapse can never trap you. **Two things stop:** real-time scanning of new events, and the two actions that make the app do work — **Create Issue** from a finding, and **Start Scan** on the Bulk Scan tab. Both buttons are disabled with a tooltip saying why, and a warning banner sits above the tabs.",
        },
        {
          type: "p",
          text: "**Everything else stays open**, on purpose. You can read every finding you already have, work the queue, dismiss, resolve and restore, read the analytics, read and **export** the audit log CSV, and change every setting. The bulk-scan status poll and its **Reset** stay open too, specifically so a licence that lapses mid-scan cannot leave an administrator stranded in front of a job with no way to clear it. Nothing is deleted, and renewing picks up exactly where you were.",
        },

        { type: "h", level: 2, text: "Uninstalling" },
        {
          type: "p",
          text: "Uninstalling erases what the app holds. A `preUninstall` handler empties the audit table first — that is the store holding account IDs — then sweeps the key-value store until a pass finds nothing left, working to a 45-second budget and attempting each store even if the other fails. Remediation tickets stay in Jira, because they are ordinary Jira issues.",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "No findings at all",
              text: "Check in this order: the **Secret & PII Scanner** master switch is on at the top of **Scanning Rules**; at least one category is on; the project is not excluded; and there is an active licence, without which real-time scanning does not run at all. Remember real-time scanning only covers changes made after the app was installed — run a bulk scan for history.",
            },
            {
              name: "New findings stopped appearing, but the old ones are still there",
              text: "That is the shape of a lapsed licence: the queue you already have stays fully readable and workable while nothing new is scanned. The banner above the tabs says so.",
            },
            {
              name: "The queue seems to have stopped growing",
              text: "The findings list holds 500 and the dismissed list 1,000; past that the oldest are evicted. The eviction is recorded in the **Audit Log**, so check there before assuming the scanner went quiet. Work the queue down, or narrow the categories producing the volume.",
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
              text: "Dismissal covers one exact value in one exact place. The same value pasted elsewhere is a new finding, by design. A **resolved** finding is different: resolving does not suppress the value, so if the secret is still in the issue the next scan finds it again — deliberately, because the point of resolving is that you dealt with it.",
            },
            {
              name: "I dismissed the wrong thing",
              text: "Open the **Dismissed** tab and use **Restore** on that row. It goes back in the queue and the suppression is lifted.",
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
              text: "No. The app runs on Atlassian Forge and declares no outbound address whatsoever, which is why it qualifies for Runs on Atlassian.",
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
              text: "The app erases what it holds: it empties the audit table and then sweeps its key-value store until nothing is left. Whatever remains is detached by Atlassian immediately and destroyed under its own retention policy. See [Where your data goes](/documentation/start-here/your-data). That includes the findings and the audit log, so export the audit CSV first if you need it. Remediation tickets stay in Jira.",
            },
            {
              name: "What can we still do if the licence lapses?",
              text: "Read and work everything you already have. Findings, analytics, the dismissed list and the audit log stay open, dismissing, resolving and restoring keep working, the CSV exports keep working, and every setting is still editable. What stops is the scanning: no new events are scanned, and **Create Issue** and **Start Scan** are disabled. Nothing is deleted, and renewing resumes it.",
            },
            {
              name: "Does it manage schemes, screens, project roles or groups?",
              text: "No, and it never has. An earlier build carried a large block of unreachable client code for those areas, copied in from another app; no screen and no resolver could reach any of it. It has been deleted, along with the two Jira administration scopes that had been declared for it.",
            },
          ],
        },
      ],
    },
  ],
};
