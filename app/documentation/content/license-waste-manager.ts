import type { AppDocs } from "../types";

export const licenseWasteManager: AppDocs = {
  slug: "license-waste-manager",
  name: "License Waste Manager for Jira",
  shortName: "License Waste Manager",
  tagline:
    "Finds the licensed accounts nobody uses across Jira, Jira Service Management, Confluence and Jira Product Discovery. Shows what they cost, lets you act in bulk or on a schedule, and records every change.",
  products: "Jira · JSM · Confluence · Product Discovery",
  color: "#9B59B6",
  icon: "/license-waste.png",
  ai: false,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "What it measures, what it needs to see everything, and how to get to a first scan safely.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** A licence review tool. It scans your users, shows which paid seats nobody is using, and lets you reclaim them.",
        },
        {
          type: "p",
          text: "**Why the gap exists.** Atlassian bills per licensed user, not per active user. Nobody sees the difference in the billing screen, and it grows every time someone changes team, leaves, or gets a licence “just in case”.",
        },
        {
          type: "p",
          text: "**Who uses it.** A [Jira administrator](/documentation/start-here/jira-words) opens the app. To unlock the full feature set you also need an **organisation administrator** to create an API key, once.",
        },

        { type: "h", level: 2, text: "What it does" },
        {
          type: "list",
          items: [
            "**Scans** your users and their product access into a snapshot, with last-activity dates.",
            "**Shows** licence utilisation per product: seats you pay for, seats in use, seats going to waste.",
            "**Filters** every user by product, activity, how long they have been inactive, group, email domain and name.",
            "**Acts in bulk**: remove people from access groups, revoke every licence a person holds, add people to a group, or suspend accounts — from the Users tab or from a scheduled rule. See [Browsing and acting on users](/documentation/license-waste-manager/users).",
            "**Automates** the same actions on a weekly, fortnightly or monthly schedule.",
            "**Records** every action, per user, with the result and any error.",
          ],
        },

        { type: "h", level: 2, text: "Read this before you touch anything" },
        {
          type: "callout",
          variant: "warning",
          title: "This app changes people's access",
          text: "Removing a group or suspending an account takes effect immediately for that person. Before you run anything in bulk, fill in **Protected Entities** in Settings. That list is what stops an aggressive rule from locking out your own administrators.",
        },

        { type: "h", level: 2, text: "Set it up" },
        {
          type: "steps",
          items: [
            "Install the app and open **Jira → Apps → License Waste Manager**.",
            "Go to **Settings** and connect the **Organization API**: paste your organisation ID and an API key created at **admin.atlassian.com → Settings → API keys**, then click **Test Connection**.",
            "Set the **Default Inactivity Threshold**. 90 days is a sensible start.",
            "Fill in **Protected Entities**: your admin accounts, the `org-admins` and `site-admins` groups, service accounts, and any domain that must never be touched.",
            "Go to **Dashboard** and run a **License Scan (fast)**.",
            "Read the numbers. Then go to the **Users** tab and look at the actual names before you act on anything.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "The organisation API key is required to change anything",
          text: "Without it the app still reads what Jira exposes and will show you a licence inventory, but it cannot act: you lose last-active dates, and every group change and suspension is skipped with a message telling you why. This is not a choice we made. Changing group membership needs organisation admin rights, and an app's own token does not have them — Jira answers 403 whatever permissions the app is granted. The organisation API key does have them, which is why it is the one credential this app asks for. Apps built on a personal user token need two.",
        },

        { type: "h", level: 2, text: "The five tabs" },
        {
          type: "table",
          head: ["Tab", "What it is for"],
          rows: [
            ["**Dashboard**", "Run scans and see utilisation per product. [Details](/documentation/license-waste-manager/dashboard)."],
            ["**Users**", "Filter the snapshot and act on people. [Details](/documentation/license-waste-manager/users)."],
            ["**Automation**", "Scheduled rules that do the same thing automatically. [Details](/documentation/license-waste-manager/automation)."],
            ["**Audit Log**", "Every action, per user, with the outcome. [Details](/documentation/license-waste-manager/audit-log)."],
            ["**Settings**", "API connection, inactivity threshold and protected entities. [Details](/documentation/license-waste-manager/settings)."],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "This app holds personal data on purpose",
          text: "Snapshots contain names, email addresses, group membership and last-activity dates, because that is what a licence review needs. It is all stored inside your own Atlassian site. The [privacy policy](/privacy/license-waste-manager) lists every field.",
        },
      ],
    },

    {
      slug: "dashboard",
      title: "Dashboard and scans",
      description: "The two scan types, what the numbers mean, and how to unstick a stalled scan.",
      blocks: [
        {
          type: "p",
          text: "**What this tab is for.** Running a scan and reading the summary. Everything else in the app reads from the snapshot a scan produces, so nothing works until you have run one.",
        },
        { type: "mock", id: "lwm-dashboard" },

        { type: "h", level: 2, text: "The two scans" },
        {
          type: "table",
          head: ["Scan", "What it reads", "When to use it"],
          rows: [
            [
              "**License Scan (fast)**",
              "Users, product access and group membership. Builds a fresh snapshot.",
              "Routine use. Run it before every review.",
            ],
            [
              "**Deep Reconciliation Scan**",
              "The same, plus reconciling activity data and directory details across the organisation. Takes longer.",
              "Before a licence renewal or a formal audit.",
            ],
          ],
        },
        {
          type: "p",
          text: "Scans run in the background in phases and report progress. **Only one scan or bulk action runs at a time.** If a run was interrupted, **Force Unlock** releases the lock so you can start a new one.",
        },

        { type: "h", level: 2, text: "What the four numbers mean" },
        {
          type: "fields",
          items: [
            { name: "Total Billable Users", text: "Accounts that consume a paid seat on at least one product. This is the number on your invoice." },
            {
              name: "Inactive (90d+)",
              text: "Billable accounts with no activity for longer than your inactivity threshold. These are your candidates.",
            },
            {
              name: "Recovery Potential",
              text: "The **share of tracked seats that are dormant, as a percentage** — not a monetary figure. The app has no price data. Multiply the percentage, or the inactive count, by your own per-seat price before quoting a saving to anybody.",
            },
            { name: "Total Users Scanned", text: "Everything in the snapshot, including unlicensed and suspended accounts." },
          ],
        },

        { type: "h", level: 2, text: "Utilisation by product" },
        {
          type: "p",
          text: "For each product: seats you are licensed for, seats in use, and the percentage. This tells you which of two very different actions to take.",
        },
        {
          type: "list",
          items: [
            "**Utilisation is low and users are dormant** — reclaim the seats. That is what this app does.",
            "**Utilisation is low because you bought a bigger tier than you need** — reduce the subscription with Atlassian. Reclaiming seats will not save you anything until you do.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Re-scan before every review",
          text: "A snapshot is a moment in time. If you present three-week-old numbers, somebody who came back from parental leave is on your dormant list, and your credibility goes with it.",
        },
      ],
    },

    {
      slug: "users",
      title: "Browsing and acting on users",
      description: "The filters, saved filters, CSV export, and the four bulk actions ranked by risk.",
      blocks: [
        {
          type: "p",
          text: "**What this tab is for.** Looking at the actual people behind the numbers, and acting on them. If it says there is no data, go and run a scan on the Dashboard first.",
        },
        { type: "mock", id: "lwm-users" },

        { type: "h", level: 2, text: "The filters" },
        {
          type: "table",
          head: ["Filter", "What it answers"],
          rows: [
            ["**Product**", "“Who has Confluence but never opens it?”"],
            [
              "**Status**: All, Active Only, Inactive Only, **Never Active**",
              "*Never Active* is your highest-confidence group: a licence that was assigned and never used at all.",
            ],
            ["**Inactive For**", "Separates 90 days from a year. Use it to prioritise."],
            ["**Domain**", "Contractors, an acquired company, a partner."],
            ["**Search**", "One person by name or email."],
          ],
        },
        {
          type: "p",
          text: "A combination you use often can be **saved** and recalled. **Export CSV** hands the current list to a spreadsheet, which is still how most licence reviews actually happen.",
        },

        { type: "h", level: 2, text: "The four bulk actions, least risky first" },
        {
          type: "table",
          head: ["Action", "What it does", "Reversible?", "Use when"],
          rows: [
            [
              "**Remove from Group…**",
              "Removes the selected people from the group you pick. Groups managed by your identity provider are skipped, because it would put everyone back on its next sync. A person who was not in the group is recorded as skipped, not as a success.",
              "Yes — add them back to the same group.",
              "You want to free the seats a specific group grants, and you know which group grants them.",
            ],
            [
              "**Revoke All Access…**",
              "Works out every licence group the person belongs to and removes them from all of them, so you do not have to know which group grants which product. The account stays active and keeps its Atlassian identity, so access can be granted again later.",
              "Yes — add them back to the groups they held. The audit log lists them.",
              "You want the seats back but the person may return, or you do not know which groups to name.",
            ],
            [
              "**Add to Group…**",
              "Adds the selected people to a group. Most often used to grant access back, or to tag a set of people you have just acted on.",
              "Yes — remove them from the group.",
              "Restoring access, or marking a set of users for follow-up.",
            ],
            [
              "**Suspend Users**",
              "Suspends the accounts at organisation level. Requires the organisation API connection **and a directory ID**, which is detected during a successful scan.",
              "Yes, but not from this app — restore the account at admin.atlassian.com.",
              "Genuine leavers, after HR has confirmed.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Removing a licence is not the same as removing a person",
          text: "Removing product access keeps the account, its history and its issue assignments. The person simply cannot use that product. Suspension blocks the account entirely. Always prefer the narrowest action that recovers the seat, which is usually removing one licence group.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "All three protection lists are enforced",
          text: "Accounts in **Protected Users**, members of **Protected Groups**, and anyone whose email is on a **Protected Domain** are skipped by every bulk action and every rule run, with no override. Each skip is recorded in the audit log with its reason, so you can see who was spared and why. One limit worth knowing: protection by domain can only match people whose email address the API returns, and Atlassian redacts that for many accounts — so protect those individually or by group.",
        },
        {
          type: "p",
          text: "Bulk actions run in the background and land in the [audit log](/documentation/license-waste-manager/audit-log) with a result for each person. Only one operation runs at a time.",
        },
      ],
    },

    {
      slug: "automation",
      title: "Automation rules",
      description: "Turn a filter and an action into a scheduled rule, and roll it out without frightening anyone.",
      blocks: [
        {
          type: "p",
          text: "**What a rule is.** The same thing you just did by hand, on a schedule: a filter that selects people, an action to apply, and a time to run.",
        },
        {
          type: "p",
          text: "**Why bother.** Licence hygiene done once a year is a project everybody dreads. Done monthly by a rule, it is invisible.",
        },
        { type: "mock", id: "lwm-rule" },

        { type: "h", level: 2, text: "What goes into a rule" },
        {
          type: "fields",
          items: [
            {
              name: "Name and description",
              text: "What it does and why. The next administrator reads this, not your filter settings.",
            },
            {
              name: "Filter",
              text: "Products, active or inactive or never-active, minimum days inactive, groups, email domains, and a search term. The rule shows how many people currently match.",
            },
            {
              name: "Action",
              text: "Remove from group, add to group, remove all product access, or suspend the user — with the target group where one is needed.",
            },
            {
              name: "Schedule",
              text: "**Weekly** with a day, **fortnightly**, or **monthly** with a day of the month, plus the hour in UTC.",
            },
            { name: "Enabled", text: "A rule can exist and be switched off. New rules should start off." },
          ],
        },

        { type: "h", level: 2, text: "How to roll out a rule without breaking anything" },
        {
          type: "steps",
          items: [
            "Build the filter on the **Users** tab first and read the names it selects. Actually read them.",
            "Create the rule with the same criteria, leave it **disabled**, and check the match count it reports.",
            "Click **Run Now** once. Then open the audit entry and read the per-user results.",
            "Only now enable the schedule.",
            "After the first scheduled run, read the audit log again. A result of `partial` means some people failed, and the error text says why.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "The first rule to build",
          text: "“Remove from the Jira Software licence group after 180 days of inactivity.” It recovers real seats, it is trivially reversible, and it never surprises anyone who is actually working. Suspension rules belong later, once the data has proven itself.",
        },
        {
          type: "p",
          text: "Each rule records its **last run**, the result — `success`, `partial` or `failed` — and how many accounts it affected. A rule that keeps returning `partial` is usually hitting accounts managed by another organisation.",
        },
      ],
    },

    {
      slug: "audit-log",
      title: "Audit log",
      description: "Every action, who or what triggered it, and what happened to each person.",
      blocks: [
        {
          type: "p",
          text: "**Why this exists.** Changing someone's access is exactly the kind of event an auditor asks about six months later, usually on a day when nobody remembers doing it.",
        },
        { type: "mock", id: "lwm-audit" },

        { type: "h", level: 2, text: "What each entry records" },
        {
          type: "list",
          items: [
            "**When** it ran and **what** the action was.",
            "**Triggered by**: `manual` for something an administrator did, or `rule` with the rule's name.",
            "**Per-person outcome**: account ID, display name, success or failure, and the error text when it failed.",
            "**Counts** of successes and failures, so a partial run is obvious at a glance.",
          ],
        },
        {
          type: "p",
          text: "Entries are grouped by month. You can clear a month, and delete individual entries. Both are deliberate acts, so decide your retention policy before anyone starts tidying up.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Keep the evidence before you clear anything",
          text: "The audit entry is your proof that the seats you stopped paying for were released on a specific date. Record or export it for a licence-reduction cycle before deleting the month.",
        },
      ],
    },

    {
      slug: "settings",
      title: "Settings and protection",
      description: "The API connection, the inactivity threshold, and the protected list that bounds everything.",
      blocks: [
        { type: "mock", id: "lwm-settings" },

        { type: "h", level: 2, text: "Organization API connection" },
        {
          type: "p",
          text: "**Why it is needed.** Jira alone cannot tell you when somebody last used Confluence, and it cannot suspend an organisation account. The Atlassian organisation API can do both.",
        },
        {
          type: "steps",
          items: [
            "Go to **admin.atlassian.com → Settings → API keys** and create a key. It requires **Organization admin** permissions.",
            "Copy the organisation ID, or click **Use detected Org ID** if the app has already worked it out from the key.",
            "Paste both values into **Settings** and click **Test Connection**. If the organisation ID is wrong, the app lists the organisations your key can actually reach.",
            "Click **Save**. The app can then detect your licence groups automatically, so product access maps to the right groups.",
          ],
        },
        {
          type: "table",
          head: ["", "With the connection", "Without it"],
          rows: [
            ["Last-active dates", "Yes", "No"],
            ["Visibility across your organisation's sites", "Yes", "No"],
            ["Automatic licence-group detection", "Yes", "No"],
            ["Suspend accounts", "Yes", "No — the app says so instead of failing"],
            ["Group and product data from Jira", "Yes", "Yes"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "The API key is a powerful credential",
          text: "An organisation admin key can change access across your whole organisation. The app stores it inside your own Atlassian site and masks it on screen, but treat it like any other admin credential: create it for this purpose, rotate it on your normal schedule, and use **Disconnect** when the app no longer needs it. It is listed as stored data in the [privacy policy](/privacy/license-waste-manager).",
        },

        { type: "h", level: 2, text: "Default inactivity threshold" },
        {
          type: "p",
          text: "The number of days after which an account counts as inactive. It drives the dashboard's inactive count and the default filters. Ninety days is a common starting point; a quarterly business rhythm may justify more.",
        },

        { type: "h", level: 2, text: "Protected entities — the most important screen in the app" },
        {
          type: "callout",
          variant: "warning",
          title: "What each of the three lists protects",
          text: "**Protected Users** protects named accounts. **Protected Groups** protects everyone in the group, and the scan now collects membership for the groups you name here even when they are not licence groups. **Protected Domains** protects by email domain — useful for a whole partner or contractor domain, with the caveat that Atlassian redacts the email address on many accounts, and a person whose email the API hides cannot be matched this way.",
        },
        {
          type: "list",
          items: [
            "Add your **admin accounts**, including the one you are signed in as. Adding `org-admins` as a group works, and is the more durable choice because it keeps protecting new admins as they join.",
            "Add **service and integration accounts** individually. They are inactive by definition, which makes them prime targets for exactly the wrong reason.",
            "Add the individual accounts of anyone whose suspension would be expensive — executives, auditors, a regulator-facing team.",
            "Prefer **Protected Groups** for anything that changes over time — a group keeps protecting people who join it later, where a list of accounts silently goes stale.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          text: "Fill this in before your first bulk action, not after your first incident. Protection is what makes an aggressive automation rule safe to enable.",
        },
        { type: "h", level: 2, text: "Groups your identity provider owns" },
        {
          type: "p",
          text: "If a group is synchronised from Azure AD, Okta or another directory, this app will not touch it — it is not selectable when you build a rule, and it is skipped at execution time with the reason recorded. That is not caution for its own sake: the provider would put everyone back on its next sync, the rule would remove them again on its next run, and you would have an audit log full of successes that never stuck and a savings figure counting seats that never came back. Change membership of those groups where they are actually managed.",
        },
      ],
    },

    {
      slug: "reference",
      title: "Permissions, data and limits",
      description: "What the app can access, what it stores, and troubleshooting.",
      blocks: [
        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            ["`read:jira-user`", "Read users, groups and product access."],
            ["`read:jira-work`, `write:jira-work`", "Read project and issue metadata used to judge activity, and store job state."],
            ["`manage:jira-project`, `manage:jira-configuration`", "Read configuration for the admin screens and apply group changes."],
            ["`storage:app`", "Store configuration, job state and snapshots."],
          ],
        },
        {
          type: "p",
          text: "Outbound access is limited to `api.atlassian.com`: your own site's APIs and, when you connect it, the Atlassian organisation admin API. Nothing goes anywhere else.",
        },

        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "fields",
          items: [
            {
              name: "User snapshots",
              text: "Per account: account ID, display name, **email address** and domain, active flag, account type, managed status, whether the seat is billable, last-active date, date added to the organisation, product access, licence groups and avatar URL.",
            },
            { name: "Groups", text: "Group IDs, names and kinds, and who belongs to which group in a snapshot." },
            { name: "Jobs", text: "Scan and action jobs: type, status, phase, who requested them, timings, metrics and errors." },
            { name: "Rules", text: "Your automation rules and their run state." },
            { name: "Audit log", text: "Every action with its per-user outcome." },
            {
              name: "Configuration",
              text: "Inactivity threshold, protected entities, detected licence groups, and the organisation ID and **API key**.",
            },
          ],
        },
        {
          type: "p",
          text: "All of it lives in your own Atlassian site and is deleted when the app is uninstalled. The [privacy policy](/privacy/license-waste-manager) is the authoritative statement.",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "“No scan data available”",
              text: "Run a scan on the **Dashboard**. The Users, Automation and Audit tabs all read from a snapshot.",
            },
            { name: "Last-active dates are empty", text: "That data comes from the organisation API. Connect it in **Settings**." },
            {
              name: "“Suspend requires Org API connection”",
              text: "Exactly that: suspension is an organisation-level operation. If you only need the seat back, use **Remove from Group** instead.",
            },
            {
              name: "Connection test fails and lists other organisations",
              text: "The key is valid but the organisation ID does not match. Use one of the IDs in the message, or click **Use detected Org ID**.",
            },
            {
              name: "“Another operation is in progress”",
              text: "One scan or bulk action at a time. Wait for it, or use **Force Unlock** if a previous run was interrupted.",
            },
            {
              name: "A rule reports `partial`",
              text: "Open the audit entry. The per-user errors name the cause, usually an account managed by another organisation or a group that no longer exists.",
            },
            {
              name: "Somebody was flagged as inactive but they are working",
              text: "The snapshot is stale, or their activity is in a product the app cannot see without the organisation API. Re-scan and check the connection before acting.",
            },
          ],
        },
        {
          type: "p",
          text: "When you [contact support](https://synapseoasis.atlassian.net/servicedesk/customer/portals), include the snapshot date and the rule or job in question. Never send the API key.",
        },
      ],
    },

    {
      slug: "faq",
      title: "FAQ",
      description: "Questions people ask before installing, and the ones security reviews always ask.",
      blocks: [
        { type: "h", level: 2, text: "The API key" },
        {
          type: "fields",
          items: [
            {
              name: "Why do you need an organisation API key?",
              text: "Because Jira does not expose last-activity data for other products, and it cannot suspend an organisation account. Only the organisation API can. Without the key the app still works, with less information.",
            },
            {
              name: "Where is the key stored?",
              text: "In the app's storage inside your own Atlassian site, masked in the interface. We never see it. You can remove it any time with **Disconnect**.",
            },
            {
              name: "Can I use a key with fewer permissions?",
              text: "Atlassian's organisation API keys require organisation admin permissions. That is Atlassian's model, not ours.",
            },
            {
              name: "What if our security policy forbids storing that key?",
              text: "Use [Admin Toolkit's User Analysis](/documentation/admin-toolkit/users) instead. It reads CSV exports you download yourself and needs no credentials, at the cost of live data and automation.",
            },
          ],
        },

        { type: "h", level: 2, text: "Data and privacy" },
        {
          type: "fields",
          items: [
            {
              name: "Does the app store email addresses?",
              text: "Yes. A licence review needs to identify people, so snapshots include names, email addresses, domains, group membership and last-activity dates. Everything stays inside your Atlassian site and is deleted on uninstall.",
            },
            {
              name: "Does any of it leave Atlassian?",
              text: "No. The only outside address is `api.atlassian.com`.",
            },
            {
              name: "Is this a GDPR problem?",
              text: "It is personal data processing you are already doing as an employer, inside a system you already control. The [privacy policy](/privacy/license-waste-manager) lists every stored field so your privacy team can review it properly.",
            },
            { name: "Does it use AI?", text: "No. Every number comes from your Atlassian data." },
          ],
        },

        { type: "h", level: 2, text: "Acting on users" },
        {
          type: "fields",
          items: [
            {
              name: "Will it delete people's accounts?",
              text: "No. It can remove group membership, remove product access, or suspend an account. It never deletes an account.",
            },
            {
              name: "Can it lock me out?",
              text: "Not if you add yourself to **Protected Entities**, which is step four of the setup. Protection has no override.",
            },
            {
              name: "What happens to a suspended user's issues?",
              text: "Nothing. Assignments, comments and history stay exactly as they are; the person simply cannot sign in.",
            },
            {
              name: "How do I undo a bulk action?",
              text: "Group changes: add the group back. Suspension: restore the account. The audit log tells you exactly who was affected, which is what makes undoing possible.",
            },
            {
              name: "Does removing a licence reduce my Atlassian bill automatically?",
              text: "It frees the seat. Whether your bill drops depends on your subscription tier and billing cycle with Atlassian. Check the tier as well as the seat count.",
            },
            {
              name: "What happens when I uninstall?",
              text: "The app's stored data is cleared and detached immediately, so nobody can read it any more — then Atlassian destroys it under its own retention policy, documented as 28 days. See [Where your data goes](/documentation/start-here/your-data). That includes the snapshots, the rules, the audit log and the API key — so export the audit evidence first. Access changes already applied stay applied, because they were made in Atlassian.",
            },
          ],
        },
      ],
    },
  ],
};
