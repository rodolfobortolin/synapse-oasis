import type { AppDocs } from "../types";

export const aiTriage: AppDocs = {
  slug: "ai-triage",
  name: "AI Triage for JSM",
  shortName: "AI Triage",
  tagline:
    "Three assistants for a service desk. One routes each new ticket to the right team and person. One reads the customer's tone and escalates when they are losing patience. One spots when many tickets are the same incident and groups them.",
  products: "Jira Service Management · Jira",
  color: "#7E7CDE",
  icon: "/ai-triage.png",
  ai: true,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "What the three agents do, the order to switch them on, and what you need first.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** Three separate features, each of which you enable independently. You can use one and ignore the others.",
        },
        {
          type: "table",
          head: ["Agent", "When it runs", "What it does"],
          rows: [
            [
              "**Dispatcher Agent**",
              "A ticket is created",
              "Chooses the team, then the person, and assigns the ticket. Optionally leaves a comment explaining why.",
            ],
            [
              "**Smart Escalation**",
              "A customer adds a comment",
              "Scores how negative the comment is. Past your threshold it can reassign, add a watcher, comment internally or add a label.",
            ],
            [
              "**Incident Detection**",
              "A ticket is created, plus a recurring scan",
              "Groups tickets about the same problem, promotes one of them to major incident, and links the rest to it. **No new issue is created.**",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "None of the three ever writes a comment",
          text: "The app holds no code path that posts to an issue's activity feed. Every decision is written to the **AI Triage** panel on the issue and to the global **Audit Log** instead. That is worth knowing before you plan a rollout around “let it explain itself in the ticket first” — the explanation is there, just not in the comment stream.",
        },
        {
          type: "p",
          text: "**Who sets it up.** A [Jira administrator](/documentation/start-here/jira-words) for the global configuration. Teams that own their own service desk can configure their desk themselves, if it is not already covered globally.",
        },

        { type: "h", level: 2, text: "What you need first" },
        {
          type: "list",
          items: [
            "**Jira Service Management** for the service desk features. The app is installed into Jira.",
            "**Jira administrator** rights.",
            "**For team-based routing only:** an Atlassian account with organisation access and an API token, so the app can read your Atlassian Teams. Everything else works without it.",
            "Nothing to buy for the AI. It runs on Atlassian's Forge LLM.",
          ],
        },

        { type: "h", level: 2, text: "Switch them on in this order" },
        {
          type: "p",
          text: "This order exists so you can see the app's judgement before it changes anything important.",
        },
        {
          type: "steps",
          items: [
            "Install the app, open **Jira → Apps → AI Triage → Connection**, and enter the Atlassian Teams credentials. Do this once; every project uses them.",
            "Open **one** service desk project and go to **Project settings → AI Triage → Dispatcher Agent**. Switch **Enable Dispatcher Agent** on.",
            "Select the teams and write a routing prompt for each one. Leave **Use Team Routing Prompts** on if you want it to pick a person as well as a team; turn it off and it assigns the team only.",
            "Watch it for a few days. Read the **AI Triage** panel on routed tickets and the global **Audit Log** — the app never writes a comment on a ticket, so those two are your evidence. When it gets one wrong, fix that team's prompt. The prompt is where accuracy comes from.",
            "Move to the **Smart Escalation** tab. Enable it, leave **Sentiment Threshold** at **Negative or worse (recommended)**, and select **no** actions. The scores appear in the issue panel and the audit log without anything changing on the ticket.",
            "When the scores match what your team would have judged, add the actions you want — **Flag with label** first, then reassignment and the watcher once you trust it. See the [Smart Escalation page](/documentation/ai-triage/smart-escalation).",
            "Enable **Incident Detection** last, with a cluster threshold high enough that it only fires on a real wave.",
            "Repeat for the next project.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Watch first, act later",
          text: "Every agent records its reasoning before it changes anything. Enable one with no actions selected for a week: the scores and routing decisions still land in the issue panel and the audit log, nothing on the ticket moves, and “can we trust this?” becomes a question you can answer with evidence.",
        },

        { type: "h", level: 2, text: "Two screens, and which one does what" },
        {
          type: "p",
          text: "This is the thing that trips people up, so get it straight before you start. **The agents are configured per project.** The global page only holds the shared Atlassian Teams credentials, the statistics and the audit log.",
        },
        {
          type: "table",
          head: ["Screen", "Tabs", "What you do there"],
          rows: [
            [
              "**Jira → Apps → AI Triage** (global)",
              "Statistics · Connection · Audit Log",
              "Enter the Atlassian Teams API credentials once, for the whole site. Review statistics and the audit log.",
            ],
            [
              "**Project settings → AI Triage** (per project)",
              "Statistics · Dispatcher Agent · Smart Escalation · Incident Detection",
              "Enable and configure each agent for that project's service desk. This is where you spend your time.",
            ],
            [
              "The **AI Triage** panel on an issue",
              "—",
              "See what the agents decided and why. Anyone who can see the issue.",
            ],
            [
              "**Personal settings → My Skills**",
              "—",
              "Each agent describes their own specialities, for routing.",
            ],
          ],
        },
        { type: "mock", id: "at-connection", caption: "The global Connection tab: enter these credentials once and every project uses them." },
        {
          type: "callout",
          variant: "info",
          title: "Who can configure what",
          text: "The **Connection** tab needs a Jira administrator, because those credentials are shared by every project. The agent tabs live in project settings, so a team that administers its own service desk can set up its own routing without waiting for you.",
        },
      ],
    },

    {
      slug: "dispatcher",
      title: "Dispatcher Agent",
      description: "Route new tickets to the right team and person. This page includes how to write prompts that work.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** When a ticket is created, the agent reads it, picks a team, then picks a person on that team, and assigns it.",
        },
        {
          type: "p",
          text: "**How it decides.** Not by keywords. It compares the ticket against the description **you write** for each team, and optionally for each person. If routing is wrong, the description is wrong. That is the one thing to remember from this page.",
        },
        { type: "mock", id: "at-dispatcher" },

        { type: "h", level: 2, text: "Dispatch Configuration" },
        {
          type: "p",
          text: "The collapsible **Dispatch Configuration** section holds the settings that apply to every decision this agent makes. Click **Expand** to open it.",
        },
        {
          type: "table",
          head: ["Setting", "What it does", "What we recommend"],
          rows: [
            [
              "**Dispatch Instructions**",
              "Rules that apply to every routing decision. Team and member details are appended automatically, so do not repeat them here. Up to 1,200 characters.",
              "Two or three rules, such as “route by affected service first” and “never assign to someone on leave”.",
            ],
            [
              "**Use Team Routing Prompts**",
              "On, the agent picks a team and then a person inside it. Off, it assigns the team only and leaves the person to you.",
              "Leave it on unless your teams do their own intake. With it off, the whole **Members** step is skipped.",
            ],
            [
              "**When no one matches the required skill**",
              "What happens when nobody is a confident match. Three options: **Leave unassigned — a human triages it (default)**, **Assign the closest expertise — always someone**, and **Assign the project lead**.",
              "Leave it unassigned and let your existing queue process handle it. Guessing is worse than not guessing.",
            ],
            [
              "**Issue Types**",
              "Only these issue types are dispatched. Leave it empty to allow all of them.",
              "Empty, until you find a type that should never be routed automatically.",
            ],
            [
              "**Only process tickets matching this JQL**",
              "A JQL filter evaluated before anything else. A ticket that does not match is left completely alone — no model call, no decision, no audit entry.",
              "The cheapest scope control the app has, and the one to reach for when you want to pilot on part of a desk rather than all of it. The field validates the query as you type.",
            ],
          ],
        },

        { type: "h", level: 2, text: "Before anything else: the Teams connection" },
        {
          type: "p",
          text: "Teams come from **Atlassian Teams**, so the app needs credentials to read them. This is a **global** setting: enter it once in **Jira → Apps → AI Triage → Connection** and every project uses it.",
        },
        {
          type: "steps",
          items: [
            "**Atlassian Email** — the email of an Atlassian admin with organisation access.",
            "**API Token** — create one at `id.atlassian.com/manage-profile/security/api-tokens`, signed in as that account.",
            "**Organization ID** — the app discovers it from the token. Only override it if you have more than one organisation.",
            "Click **Validate & Connect**, then **Save Connection**. If it fails, the message tells you which of the three values is wrong.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "No teams in the list later? Come back here",
          text: "An empty team list on the project screen almost always means this connection is missing, or the account behind the token has no organisation access.",
        },

        { type: "h", level: 2, text: "Step 1 — Teams" },
        {
          type: "p",
          text: "In **Project settings → AI Triage → Dispatcher Agent**, the **Routing Setup** card has two steps. Step 1 lists your Atlassian teams with a search box and a checkbox each. Tick the teams that should receive tickets from this service desk; the ones you pick appear as chips underneath.",
        },
        {
          type: "p",
          text: "Then give each selected team a **routing prompt** under **Team Routing Prompts**: a plain description of what that team handles. A team with **No prompt** shows an **Add** link, and until you fill it in the agent has nothing to match against.",
        },
        {
          type: "table",
          head: ["Prompt that misroutes", "Prompt that works"],
          rows: [
            [
              "Handles infrastructure.",
              "Owns authentication, single sign-on, API gateways and anything about logging in. Does not handle laptops or other hardware.",
            ],
            [
              "Second-level support.",
              "Laptops, peripherals, operating system images, printers and VPN client problems. Sends network outages to Platform Engineering.",
            ],
            [
              "Does data things.",
              "Owns the data warehouse, the ETL jobs and the BI dashboards. Does not handle application databases, which belong to the product teams.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Write the boundaries, not the job title",
          text: "Almost all misrouting happens between two teams whose responsibilities touch. Saying what a team does **not** handle removes more errors than any amount of describing what it does.",
        },

        { type: "h", level: 2, text: "Step 2 — Members (optional)" },
        {
          type: "p",
          text: "You can add a short description per person, such as “Expert in password resets, Active Directory and access permissions”. The agent uses it to pick the best individual inside the team it chose.",
        },
        {
          type: "p",
          text: "Agents can also write their own, under **Personal settings → My Skills**. That is the better route: it keeps the descriptions current without an administrator in the loop.",
        },
        { type: "mock", id: "at-my-skills" },
        {
          type: "callout",
          variant: "warning",
          title: "The API token is a credential",
          text: "It belongs to a real Atlassian account and is shared by every project. It is stored inside your own site and masked on screen, but treat it like any other admin token: create it for this purpose only, and rotate it on your normal schedule. It is listed in the [privacy policy](/privacy/ai-triage).",
        },
      ],
    },

    {
      slug: "smart-escalation",
      title: "Smart Escalation",
      description: "Notice when a customer is losing patience, and act before the relationship breaks.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Every time a customer comments, the agent judges how negative the comment is. If it crosses your threshold, it performs the actions you allowed.",
        },
        {
          type: "p",
          text: "**Why.** The clearest sign that a ticket is going wrong is in the customer's words, not in the SLA clock. By the time the SLA breaches, the damage is done.",
        },
        { type: "mock", id: "at-escalation" },

        { type: "h", level: 2, text: "The threshold" },
        {
          type: "p",
          text: "Comments are classified as **positive**, **neutral**, **negative** or **critical**. **Sentiment Threshold** is the level at which actions fire, and the dropdown names the levels in plain language.",
        },
        {
          type: "table",
          head: ["Threshold", "Effect", "Use when"],
          rows: [
            [
              "**Negative or worse (recommended)**",
              "Acts early. More escalations, including some that did not need it.",
              "Most desks. This is the default and the one we recommend.",
            ],
            [
              "**Critical only**",
              "Acts only on the clearest cases.",
              "High volumes, or while you are still calibrating and do not want noise.",
            ],
          ],
        },

        { type: "h", level: 2, text: "The actions" },
        {
          type: "p",
          text: "Three, and they work from a global configuration or a per-project one. Tick as many as you want, or none.",
        },
        {
          type: "table",
          head: ["Action", "What it does", "Needs"],
          rows: [
            [
              "**Flag with label**",
              "Adds the label you configure, so escalated tickets are one JQL query away.",
              "The **Escalation Label** field. Nothing else.",
            ],
            [
              "**Reassign to escalation user**",
              "Hands the ticket to the escalation owner for that desk.",
              "An escalation user for that desk. Visible to the customer — see the warning below.",
            ],
            [
              "**Add escalation user as watcher**",
              "Keeps the current assignee and adds a senior person as a watcher.",
              "An escalation user for that desk. The gentlest of the three.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "The app does not comment on issues",
          text: "Nothing it does writes to an issue. The score, the reasoning and the key phrases appear in the **AI Triage** panel on the issue itself and in the audit log, where they are attached to the analysis rather than mixed into the conversation the requester is reading.",
        },

        { type: "h", level: 2, text: "The other settings" },
        {
          type: "fields",
          items: [
            {
              name: "Escalation Label",
              text: "The label used by the **Flag with label** action. It ships as `escalation-risk`; keep it or pick something else you can query.",
            },
            {
              name: "Custom AI Instructions",
              text: "Your own rules, added to the analysis. This is where domain-specific triggers go, for example: “treat contract-renewal language and legal threats as critical regardless of tone”.",
            },
            {
              name: "Escalation Users",
              text: "One person per service desk, used by the reassign and watcher actions. It is a **user picker** — search by name and choose. Configure this before ticking either of those two actions; without a user for that desk, both are skipped.",
            },
            {
              name: "Issue Types (optional filter)",
              text: "Analyse only some issue types. Leave it empty to analyse all of them.",
            },
            {
              name: "Only process tickets matching this JQL",
              text: "A JQL filter checked before the comment is analysed. Anything that does not match is ignored entirely — no model call, no score, no audit entry. Useful for excluding a noisy request type, or for piloting on part of a desk.",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Reassignment is visible to the customer",
          text: "It changes who they are talking to, mid-conversation. During calibration use the label and the watcher, which the customer never sees. Enable reassignment when the scores have proven themselves.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Everything on this page is per project",
          text: "The three sections — **General Settings**, **Escalation Actions** and **Escalation Users** — are collapsible panels on the **Smart Escalation** tab of that project's settings. Two service desks can have completely different escalation policies, and neither needs a site-wide change.",
        },
      ],
    },

    {
      slug: "incident-detection",
      title: "Incident Detection",
      description: "Group a wave of similar tickets into one incident, automatically.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** During an outage the same problem arrives as many separate tickets. This agent notices they are the same problem, promotes one of the existing tickets to be the incident, and links the others to it. **It never creates a new issue** — the incident is always one of the tickets your customers already raised.",
        },
        {
          type: "p",
          text: "**When it runs.** Twice over: immediately when a ticket is created, and again on a recurring scan whose interval you choose. The scan catches a wave that builds slowly, which the per-ticket check would miss.",
        },
        { type: "mock", id: "at-incident" },

        { type: "h", level: 2, text: "The settings that decide whether this is useful or noisy" },
        {
          type: "table",
          head: ["Setting", "What it means", "How to choose"],
          rows: [
            [
              "**Scan Interval**",
              "How often the recurring scan runs. A dropdown: **Every hour**, 2, 4, 6, 12 or 24 hours. One hour is the floor and the shipped default.",
              "**Every hour** for most desks. This is the slow half of the feature — a sharp outage is caught by the per-ticket check within seconds of the tickets arriving, so a longer interval costs you less than it looks like it does.",
            ],
            [
              "**Time Window (minutes)**",
              "How far back a scan looks for similar tickets. Ships as **90**.",
              "Match how fast your customers actually report things. A shorter window catches sharp spikes; a longer one catches a slow degradation.",
            ],
            [
              "**Cluster Threshold**",
              "How many similar tickets are needed before an incident is created. Ships as **10**.",
              "Look at your last real outage: how many tickets arrived inside your time window? Set it just under that number.",
            ],
            [
              "**Link Type**",
              "The Jira link type used to attach tickets to the incident. **Required.** It starts unset, showing “-- Select link type --”, and the screen will not let you save an enabled agent without it.",
              "`relates to`, unless your team already uses something else.",
            ],
            [
              "**Which issue types are incidents**",
              "**Required.** Which issue types the agent may promote to be the incident. It is a separate question from the filter below, and the screen says so: without it the detector cannot tell which tickets are incidents.",
              "Your desk's Incident type, if it has one. Otherwise the type your team actually treats as an outage record.",
            ],
            [
              "**Custom AI Instructions**",
              "Extra rules for grouping.",
              "Say what to group on and what never to group. For example: “group by affected service, not by wording” and “never cluster password resets”.",
            ],
          ],
        },
        {
          type: "list",
          items: [
            "**Service Desks** — which desks are monitored.",
            "**Issue Types (optional filter)** — which tickets are *analysed*. Leave it empty to analyse everything.",
            "**Only process tickets matching this JQL** — the same filter the other two agents have. A ticket that does not match is never looked at.",
          ],
        },

        { type: "h", level: 2, text: "What happens when a cluster is found" },
        {
          type: "steps",
          items: [
            "The agent works out the common topic across the tickets and picks one of them as the principal.",
            "It promotes the clearest ticket in the cluster: it sets Jira Service Management's **Major incident** field on that ticket. If your site has no such field, it falls back to adding a `major-incident` label, so the promotion is still visible and still queryable.",
            "It links the rest of the cluster to that ticket, using the link type you chose.",
            "Each ticket's **AI Triage** panel shows which incident it belongs to, and whether it was matched immediately or by a scheduled scan.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Start high, then lower it",
          text: "Set the threshold higher than you think you need. An agent that creates one incident during a genuine outage is valuable. One that creates incidents for every pair of vaguely related tickets gets ignored within a week, and then it is worthless even when it is right.",
        },
      ],
    },

    {
      slug: "issue-panel",
      title: "The issue panel, statistics and audit log",
      description: "Where to see what the agents did, and how to check whether they are getting it right.",
      blocks: [
        {
          type: "p",
          text: "**Why this page matters.** Automation that cannot explain itself gets switched off. Every decision is visible on the ticket, and in two review screens.",
        },
        { type: "mock", id: "at-issue-panel" },

        { type: "h", level: 2, text: "The AI Triage panel on the issue" },
        {
          type: "fields",
          items: [
            {
              name: "Routing Decision",
              text: "The team, the assignee, the reason in plain language, and whether the ticket was assigned or only routed. Warnings appear when the agent had to compromise.",
            },
            {
              name: "Sentiment Analysis",
              text: "The score, whether there is escalation risk, the reasoning, the phrases that drove it, and the actions taken.",
            },
            { name: "Incident Detection", text: "Which incident this ticket belongs to, its topic, and whether it was matched in real time or by a scan." },
          ],
        },
        {
          type: "p",
          text: "Older entries are collapsed so a long-running ticket does not bury its current state. **Refresh** re-reads the analysis after a new comment.",
        },

        { type: "h", level: 2, text: "Statistics" },
        { type: "mock", id: "at-statistics" },
        {
          type: "p",
          text: "The **Statistics** tab exists on both the global page and each project's page, and it covers all three agents — dispatch counts and distribution, escalations by sentiment level, and incidents detected. Pick a range with **Today**, **This Week**, **This Month** or **Custom**, and use **Refresh** after a busy period.",
        },
        {
          type: "fields",
          items: [
            { name: "Team assignments", text: "How many tickets the Dispatcher assigned to a team in the selected range." },
            { name: "User assignments", text: "How many it assigned to a specific person." },
            {
              name: "Team Dispatch Distribution",
              text: "Which teams received the work. A team you expected to see and do not is a prompt problem, not a volume problem.",
            },
            { name: "Top Assignees", text: "Who received the most tickets. Watch for one person absorbing everything." },
            {
              name: "Team Assignments over time",
              text: "A chart by ISO week, switchable between **Last 12 Weeks** and **Last 12 Months**.",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "How to judge accuracy, since the app does not do it for you",
          text: "These charts show volume, not correctness. Compare the distribution with what your team leads expected, and sample a handful of tickets to see whether a human reassigned them afterwards. Reassignments are the real signal that a routing prompt needs work.",
        },

        { type: "h", level: 2, text: "Audit log" },
        {
          type: "p",
          text: "A record of what the agents did and when, across all desks. Go here first when somebody asks why a ticket ended up where it did, or when you suspect a rule is firing more often than intended.",
        },
      ],
    },

    {
      slug: "reference",
      title: "Permissions, data and limits",
      description: "What the app can access, what it stores, what goes into a prompt, and troubleshooting.",
      blocks: [
        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            [
              "`read:servicedesk-request`",
              "List service desks and request types for the configuration screens, and read the request being triaged and its participants.",
            ],
            [
              "`read:jira-work`, `write:jira-work`",
              "Read issue data, comments and change history; assign the ticket, add a label, add a watcher, set the major-incident field, and link a cluster together. No issue is ever created.",
            ],
            ["`read:jira-user`", "Resolve agents, teams and escalation users."],
            ["`storage:app`", "Store configuration, decisions and statistics. The audit trail itself is **Forge SQL**, one row per event."],
            [
              "`report:personal-data`",
              "Atlassian's Personal Data Reporting cycle. Once a day the app reports the account IDs it holds — across its own storage **and the SQL audit table** — and erases what belongs to an account Atlassian reports as closed.",
            ],
          ],
        },
        {
          type: "p",
          text: "The only outside address is `api.atlassian.com`: your own site's APIs and, for team routing, the Atlassian Teams API.",
        },

        { type: "h", level: 2, text: "What goes into a prompt" },
        {
          type: "list",
          items: [
            "The summary, description, comments and selected field values of the ticket being handled.",
            "The list of candidate teams, people, request types and priorities, with the prompts you wrote.",
            "Your dispatch, escalation or clustering instructions.",
          ],
        },
        {
          type: "p",
          text: "Prompts are processed by Forge LLM inside Atlassian. Nothing goes to an outside AI provider and nothing is used to train a model. Full detail in the [privacy policy](/privacy/ai-triage).",
        },

        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "list",
          items: [
            "Configuration for all three agents, per service desk and per request type, plus the global Teams connection: email, organisation ID and **API token**.",
            "The decision made for each ticket, stored against the issue key.",
            "Skill descriptions, stored against the person's Atlassian account ID.",
            "Daily statistics, audit entries, and the time of the last incident scan per desk.",
          ],
        },

        { type: "h", level: 2, text: "What happens without an active licence" },
        {
          type: "p",
          text: "**Triage stops. Everything else stays open.** All three agents run from Jira event triggers and a scheduled trigger, and every one of those declares `appIsLicensed: true` in the manifest — so Forge does not invoke them at all. There is no half-run and no error on a ticket: new tickets simply arrive and sit there, exactly as they did before the app was installed.",
        },
        {
          type: "p",
          text: "Nothing in the admin screens is gated, and that is deliberate. Every configuration screen, the statistics, the audit log, the Connection tab, the issue panel and every decision already recorded stay fully readable and editable. A banner at the top of the app says the licence has lapsed and that triage is paused, because the failure mode this protects against is an administrator hunting a broken routing prompt for an hour. Nothing is deleted; renewing resumes triage on the next ticket, with no reconfiguration.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "The silence is the symptom",
          text: "Because the platform declines to invoke the triggers, an unlicensed install looks identical to one where every agent was switched off — no failures in the audit log, because nothing ran to fail. If routing stopped and nothing else changed, check the banner first.",
        },

        { type: "h", level: 2, text: "Uninstalling" },
        {
          type: "p",
          text: "Uninstalling erases what the app holds. A `preUninstall` handler empties the audit table first, then sweeps the key-value store — configuration, the Teams API token, per-issue decisions, skills and statistics — repeating until a pass finds nothing left, to a 45-second budget.",
        },
        {
          type: "p",
          text: "Assignments, labels, watchers, incident links and major-incident flags the agents set stay in Jira, because they are ordinary Jira data. See [Where your data goes](/documentation/start-here/your-data).",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "Nothing is being routed",
              text: "Check in order: there is **an active licence** — without one the triggers are never invoked and every agent goes quiet at once, which is the banner at the top of the app; **Enable Dispatcher Agent** is on for that project; at least one team is selected in **Step 1 — Teams**; each selected team has a routing prompt; the **Only process tickets matching this JQL** filter is not excluding the tickets; and the global **Connection** tab shows as connected. Also remember the Dispatcher only acts on tickets created **after** it was enabled.",
            },
            {
              name: "All three agents stopped at the same moment",
              text: "That is the shape of a lapsed licence rather than a configuration mistake. One agent breaking is a prompt or a setting; all three going silent together, with nothing in the audit log, is the platform declining to invoke the triggers.",
            },
            {
              name: "Tickets go to the wrong team",
              text: "Open the **AI Triage** panel on the ticket: it names the team, the reason and any warnings. Then fix the team prompts, focusing on the boundary between the two teams being confused.",
            },
            {
              name: "No teams appear in Step 1",
              text: "The Teams connection is missing or wrong. Go to **Jira → Apps → AI Triage → Connection**. The token must belong to an account with organisation access; if the organisation ID was discovered incorrectly, override it with the value from admin.atlassian.com.",
            },
            {
              name: "Escalation never triggers",
              text: "Common causes: **Enable Smart Escalation** is off for that project, the threshold is set to critical only, no action is ticked under **Escalation Actions**, the JQL filter excludes the ticket, or the comment was internal rather than from the customer. If the label appears but nothing is reassigned, the desk has no escalation user — the reassign and watcher actions are skipped without one.",
            },
            {
              name: "Escalation triggers too often",
              text: "Raise the threshold to `critical`, and add custom instructions describing what normal tone looks like for your customers.",
            },
            {
              name: "Incidents are created for unrelated tickets",
              text: "Raise the **Cluster Threshold**, shorten the **Time Window**, and add clustering instructions naming what must never be grouped.",
            },
            {
              name: "Incident Detection will not save",
              text: "Two fields are required once it is enabled: **Link Type**, and **Which issue types are incidents**. The screen names whichever is missing.",
            },
            {
              name: "A slow-building wave was caught late",
              text: "The recurring scan runs hourly at its fastest, so a trickle of tickets that never trips the per-ticket check waits for the next scan. Widen the **Time Window** rather than expecting a shorter interval — an hour is the floor.",
            },
            {
              name: "The agent tabs are missing from the global page",
              text: "They are not there by design. **Jira → Apps → AI Triage** has only **Statistics**, **Connection** and **Audit Log**. The agents are configured in **Project settings → AI Triage**, per project.",
            },
          ],
        },
        {
          type: "p",
          text: "Include the issue key and the service desk when you [open a ticket](https://synapseoasis.atlassian.net/servicedesk/customer/portals). The stored decision for that issue is the first thing we read.",
        },
      ],
    },

    {
      slug: "faq",
      title: "FAQ",
      description: "Questions people ask before installing, and the ones security reviews always ask.",
      blocks: [
        { type: "h", level: 2, text: "Data and security" },
        {
          type: "fields",
          items: [
            {
              name: "Does ticket data leave Atlassian?",
              text: "No. The app runs on Atlassian Forge, and the only outside address it may contact is `api.atlassian.com`.",
            },
            {
              name: "Which AI provider is used?",
              text: "Atlassian's own Forge LLM, with models Atlassian hosts. No API key to buy, no third-party AI vendor.",
            },
            {
              name: "Why does it need an Atlassian API token?",
              text: "Only for team-based routing, so it can read your Atlassian Teams and their members. Everything else works without it. The token is stored inside your own site and masked on screen.",
            },
            {
              name: "Does it store copies of our tickets?",
              text: "No. It stores the decision it made and a short justification, against the issue key. See the [privacy policy](/privacy/ai-triage).",
            },
            {
              name: "Can it read tickets in projects it is not configured for?",
              text: "It only acts on the service desks you select. The Jira scopes it holds are site-wide, as with any Jira app, which is why the configuration screens are restricted to Jira administrators.",
            },
          ],
        },

        { type: "h", level: 2, text: "Behaviour" },
        {
          type: "fields",
          items: [
            {
              name: "Will it reassign tickets my team already picked up?",
              text: "The Dispatcher acts on ticket creation. Smart Escalation can reassign later, but only if you enable that specific action.",
            },
            {
              name: "What happens if it cannot decide?",
              text: "It follows your **Fallback Behavior** setting. We recommend leaving the ticket unassigned rather than guessing.",
            },
            {
              name: "Can I use just one of the three agents?",
              text: "Yes. They are configured and enabled separately. Most people start with the Dispatcher alone.",
            },
            {
              name: "Does it work in Jira projects that are not service desks?",
              text: "The agents are built around service desks, request types and customer comments. Install it for Jira Service Management.",
            },
            {
              name: "Can agents see why a decision was made?",
              text: "Yes — in the **AI Triage** panel on the issue and in the global **Audit Log**. Not as a comment: the app does not write comments on tickets.",
            },
            {
              name: "Will it argue with my Jira Automation rules?",
              text: "It can. If an automation rule also assigns tickets, one of the two will win depending on order. Pick one owner for assignment and disable the other.",
            },
          ],
        },

        { type: "h", level: 2, text: "Rollout" },
        {
          type: "fields",
          items: [
            {
              name: "How do I pilot this safely?",
              text: "Set the global **Connection** once, then enable the Dispatcher on one project only, with routing comments on. Read those comments for a week before enabling anything that changes a ticket.",
            },
            {
              name: "How long until routing is accurate?",
              text: "It depends entirely on your team prompts, not on training time. Good boundary descriptions work from the first ticket; vague ones never improve on their own.",
            },
            {
              name: "What happens when I uninstall?",
              text: "The app erases what it holds: it empties the audit table, then sweeps its key-value store — configuration, the Teams API token, per-issue decisions, skills and statistics — until a pass finds nothing left. Whatever remains is detached by Atlassian immediately and destroyed under its own retention policy. See [Where your data goes](/documentation/start-here/your-data). Assignments, labels, watchers and incident links the agents set stay in Jira, because they are ordinary Jira data.",
            },
            {
              name: "What happens if our licence lapses?",
              text: "Triage stops and nothing else does. New tickets are not routed, comments are not scored and no clusters are detected, because the platform stops invoking the app's triggers entirely. Every screen stays open and editable — configuration, statistics, the audit log, the Connection tab, and every decision already recorded — and a banner says triage is paused so nobody spends an afternoon looking for a broken prompt. Renewing resumes it on the next ticket, with nothing to reconfigure.",
            },
          ],
        },
      ],
    },
  ],
};
