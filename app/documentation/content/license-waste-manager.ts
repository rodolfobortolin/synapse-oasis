import type { AppDocs } from "../types";

export const licenseWasteManager: AppDocs = {
  slug: "license-waste-manager",
  name: "License Waste Manager for Jira",
  shortName: "License Waste Manager",
  tagline:
    "Finds the licensed accounts nobody uses across Jira, Jira Service Management, Confluence, Jira Product Discovery and Bitbucket. Shows how many seats are dormant, lets you act in bulk or on a schedule — re-checking every person live before touching them — and records every change. Reads your organisation by API key or by importing the admin-console CSV exports.",
  products: "Jira · JSM · Confluence · Product Discovery",
  color: "#9B59B6",
  icon: "/license-waste.png",
  updated: "2026-08-31",
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
          text: "**Who uses it.** A [Jira administrator](/documentation/start-here/jira-words) opens the app. Before it can do anything at all you also need an **organisation administrator** to create an API key, once — this is a prerequisite, not an upgrade.",
        },

        { type: "h", level: 2, text: "What it does" },
        {
          type: "list",
          items: [
            "**Scans** your organisation's users, their product access and their group membership into a snapshot, with last-activity dates per product — on demand, or [on a schedule](/documentation/license-waste-manager/settings) so nobody has to remember.",
            "**Imports** the admin-console CSV exports instead, when you have them: seconds on tens of thousands of accounts, no API key needed for the data, and three facts a scan cannot reach. See [Importing the CSV exports](/documentation/license-waste-manager/csv-import).",
            "**Shows** licence utilisation per product, inactivity distribution, a breakdown by email domain — and what **Atlassian Guard** is billing you for, including accounts whose access lives on somebody else's instance.",
            "**Filters** every user by product, account state, how long they have been inactive, paid seat, Guard billing, which sites their access reaches, two-step verification, department, job title, email domain and name.",
            "**Acts in bulk**: remove people from access groups, revoke the product licences you pick, grant access back, add people to a group, suspend an account or restore one — from the Users tab or from a scheduled rule. See [Browsing and acting on users](/documentation/license-waste-manager/users).",
            "**Automates** the same actions daily, weekly, every two weeks or monthly — and **re-checks every person live** at the moment of acting, so someone who came back after the scan is left alone and counted. See [Automation rules](/documentation/license-waste-manager/automation).",
            "**Shows who administers what** — organisation admins, site admins, product admins — and which of them are dormant or unprotected. See [Admin roles](/documentation/license-waste-manager/admin-roles).",
            "**Sweeps API tokens**: which accounts hold them, which have sat unused for months, and revocation one click away. See [API tokens](/documentation/license-waste-manager/api-tokens).",
            "**Records** every action, per user, with the result, the reason it was skipped, and who or what asked for it — searchable, filterable and exportable. See [Audit log](/documentation/license-waste-manager/audit-log).",
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
            "Go to **Dashboard** and click **Scan Users**, with the scope left on **Licensed users only**.",
            "Read the numbers. Then go to the **Users** tab and look at the actual names before you act on anything.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "The organisation API key is required to scan and to act — the CSV import is the one exception",
          text: "Every scan read and every write goes through the organisation admin API, so without a key the **Scan Users** button is disabled and the Dashboard says why. The one path that works without it is [importing the admin-console CSV exports](/documentation/license-waste-manager/csv-import), which fills the same snapshot from files you download yourself — actions still need the key. This is not a choice we made. Changing group membership needs organisation admin rights, and an app's own token does not have them — Jira answers 403 whatever permissions the app is granted. Reading membership with the app's own token was possible, but only for the price of `manage:jira-configuration`, which the Marketplace listing shows every prospective customer as full Jira administration. That is too much to ask of a licence-hygiene app, so the read moved to the organisation API alongside the writes. One key does both, which is why it is the one credential this app asks for. Apps built on a personal user token need two.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "If the key is removed while a scan is running, the licence-group phase is skipped whole",
          text: "It is not degraded, and it does not report empty groups. Fanning out without the credential would visit every group, read nobody, and write a snapshot in which every licence group has no members — which reads as *nobody holds a seat* rather than *we could not look*, and that is the one answer a licence tool must never give. So the phase is dropped and the scan goes straight to finalising. Reconnect the key in **Settings** and scan again.",
        },

        { type: "h", level: 2, text: "What happens without an app licence" },
        {
          type: "p",
          text: "Three things need an active licence: **starting a scan**, **running a bulk action**, and **running a rule** (by schedule or with **Run Now**). Everything else stays open, on purpose — a lapsed subscription should not lock an administrator out of data they already collected.",
        },
        {
          type: "list",
          items: [
            "The **snapshot you already have** stays readable: the dashboard, every filter on the Users tab, and **Export CSV**.",
            "The **audit log** stays readable, including the per-user detail behind each entry.",
            "**Settings** stay editable: the API connection, the inactivity threshold and the protected lists.",
            "**Force Unlock** still works, so a job interrupted on the last day of a trial does not leave you stuck.",
          ],
        },
        {
          type: "p",
          text: "An unlicensed installation shows a warning at the top of the page — *“This app does not have an active licence”* — and greys out the three buttons above, each with a line under it saying why. A site administrator can start a trial or renew from the Atlassian Marketplace.",
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
      description: "The two scan scopes, what the numbers mean, and how to unstick a stalled scan.",
      blocks: [
        {
          type: "p",
          text: "**What this tab is for.** Running a scan and reading the summary. Everything else in the app reads from the snapshot a scan produces, so nothing works until you have run one.",
        },
        { type: "mock", id: "lwm-dashboard" },

        { type: "h", level: 2, text: "One button, two scopes — and a third way in" },
        {
          type: "p",
          text: "There is a single **Scan Users** button. Clicking it asks what the scan should cover; both answers run the same phases, and the difference is which population they read. The same dialog also offers the third way to fill a snapshot: [importing the admin-console CSV exports](/documentation/license-waste-manager/csv-import), which needs no API key for the data and takes seconds on tens of thousands of accounts.",
        },
        {
          type: "table",
          head: ["Scope", "Who it reads", "When to use it"],
          rows: [
            [
              "**Licensed users only**",
              "The people who hold a product licence — the seats you are billed for.",
              "Routine use. Run it before every review.",
            ],
            [
              "**Everyone in the directory**",
              "The same, plus accounts in your directory that hold no licence: guests, external accounts and leftovers from an integration. Noticeably slower on a large organisation.",
              "Before a licence renewal, a formal audit, or a directory clean-up.",
            ],
          ],
        },
        {
          type: "p",
          text: "Scans run in the background in phases and report progress. **Only one scan or bulk action runs at a time.** If a run was interrupted, **Force Unlock** releases the lock so you can start a new one.",
        },

        { type: "h", level: 2, text: "The phases a scan goes through" },
        {
          type: "p",
          text: "The progress panel names the phase it is on. Two of them depend on the organisation API key, and one only runs for the wider scope — which is why the same scan can look different on two sites.",
        },
        {
          type: "diagram",
          label: "flowchart",
          caption: "Reading everyone in the directory is skipped for the narrower scope. Collecting group membership is skipped whole if the organisation key has gone away mid-run — no empty groups are written.",
          text: `flowchart TD
    A[Preparing the snapshot] --> B[Reading licensed users]
    B --> Q{scope}
    Q -->|Everyone in the directory| C[Reading everyone in the directory]
    Q -->|Licensed users only| D
    C --> D{organisation key present?}
    D -->|yes| E[Collecting group membership]
    D -->|no| F
    E --> F[Finalising]

    classDef p fill:#E9F2FF,stroke:#0055CC
    class A,B,C,E,F p`,
        },
        {
          type: "callout",
          variant: "tip",
          title: "If the bar stops moving",
          text: "After ten minutes the dashboard says so itself and offers **Force Unlock**. The lock carries a heartbeat, so an invocation killed by the platform is detected rather than leaving you on a spinner for ever.",
        },

        { type: "h", level: 2, text: "What the four numbers mean" },
        {
          type: "fields",
          items: [
            {
              name: "Billable Seats",
              text: "Seats you are billed for, **counted once per product**. Somebody with Jira and Confluence is two seats. This is the number that lines up with your invoice.",
            },
            {
              name: "Licensed People",
              text: "How many *people* hold at least one product, out of everyone the scan read. The same population as above, counted as colleagues rather than as seats — both are correct, and they answer different questions.",
            },
            {
              name: "Dormant Seats",
              text: "Seats with no activity for longer than your inactivity threshold. These are your candidates.",
            },
            {
              name: "Seats Dormant",
              text: "The dormant share **as a percentage** — not a monetary figure. The app has no price data. Multiply it, or the dormant seat count, by your own per-seat price before quoting a saving to anybody.",
            },
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

        { type: "h", level: 2, text: "Atlassian Guard — a different bill, answered on the same screen" },
        {
          type: "p",
          text: "Guard is billed **per managed account**, not per seat: every person whose email domain your organisation verified costs you Guard money, whether or not they ever open a product. The Guard block answers the questions that follow from that, and every figure is a link — click it and the Users tab opens on exactly those people.",
        },
        {
          type: "fields",
          items: [
            {
              name: "Managed accounts",
              text: "What Guard is charged on. **Not** the same population as “managed” in the account filter — verifying a domain makes an account manageable; being billed is a separate fact the scan reads separately. On one real customer, 8,551 of 37,686 managed accounts were billed.",
            },
            {
              name: "Paying Guard, holding no seat",
              text: "Secured, but not using any of your products. A licence scan cannot see these — they hold no seat to be found by — so this figure needs the wider scan scope or a CSV import, and shows an em dash until it has one.",
            },
            { name: "Paying Guard, dormant", text: "Billed for Guard and inactive past your threshold. The double waste." },
            {
              name: "Paying Guard, working elsewhere",
              text: "Accounts on your verified domain whose product access lives on instances that are not yours — you pay Guard for them wherever they work. The sites are listed by name with a count each, and each one clicks through to the people who reach it.",
            },
          ],
        },

        { type: "h", level: 2, text: "Two more views under the tiles" },
        {
          type: "fields",
          items: [
            {
              name: "Inactivity Distribution",
              text: "Seats bucketed by how long they have sat idle: active (under 30 days), 30–60, 60–90, 90–180, 180+ and never active. This is the picture that tells you whether you have a slow drift or a cliff, and it is what makes the case for a threshold.",
            },
            {
              name: "Users by email domain",
              text: "People, licence holders, dormant seats and the share of seats, grouped by email domain — the fastest way to see a contractor population or an acquired company. Atlassian withholds the email address on many accounts; those are grouped as **Email not visible** rather than dropped.",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Let the scan re-run itself",
          text: "A snapshot is a moment in time, and presenting three-week-old numbers costs credibility. Rather than remembering to re-scan, set the **Scheduled scan** in [Settings](/documentation/license-waste-manager/settings) — weekly, biweekly or monthly — and the line next to the Scan button will tell you when the next one runs. And for anyone a **rule** is about to touch, staleness stops mattering entirely: the rule re-checks that person live at the moment of acting.",
        },
      ],
    },

    {
      slug: "csv-import",
      title: "Importing the CSV exports",
      description: "Fill a snapshot from the admin-console exports: no API key for the data, seconds on tens of thousands of accounts, and three facts a scan cannot reach.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** The other way to fill a snapshot. Atlassian Administration can export your whole directory as CSV; the app reads those files **in your browser**, keeps only the normalised rows, and builds the same snapshot a scan builds — every tab works on it identically.",
        },
        {
          type: "p",
          text: "**Why you would.** Three reasons. It is fast: tens of thousands of accounts in seconds, where a scan of the same organisation is a long background job. It needs **no API key for the data** — the files come from your own admin console. And it carries three facts no API will hand a scan: **who your organisation admins are**, **Atlassian's own Guard billing flag** per account, and whether **single sign-on is enforced** — which is also what makes the 2FA and Guard filters, and much of the [Admin roles](/documentation/license-waste-manager/admin-roles) page, light up.",
        },

        { type: "h", level: 2, text: "The two files" },
        {
          type: "table",
          head: ["File", "Where it comes from", "What it carries"],
          rows: [
            [
              "**Managed accounts export**",
              "admin.atlassian.com → Users → “…” menu → **Export managed accounts**",
              "One row per managed account: status, last-active dates per product and per site, the Guard billing flag, verified email, two-step verification, single sign-on.",
            ],
            [
              "**Users and groups export**",
              "admin.atlassian.com → Users → “…” menu → **Export users**",
              "One row per group membership — who is in which group — plus the **Org role** column that names your organisation admins outright.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Export with all columns",
          text: "The app validates the headers before importing and names any column that is missing. If the admin console asks which columns to include, include them all — a narrowed export is recognised and refused with the list of what it lacks, rather than silently importing less.",
        },

        { type: "h", level: 2, text: "How the import runs" },
        {
          type: "steps",
          items: [
            "On the **Dashboard**, click **Scan Users** — the dialog that asks about scope also offers the import, under “Already have your Atlassian Administration exports?”.",
            "Drop in one file or both. The app recognises which is which; order does not matter.",
            "Answer **“Which of these sites are yours?”** — the one judgement call the files cannot make for you, explained below.",
            "Choose the scope: **everyone in the file**, or only people holding a product on the sites you ticked.",
            "Watch the progress in the dialog. The import runs through the same background pipeline as a scan, so leaving the page does not lose it, and the Dashboard shows it running like any scan.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Which sites are yours — why it asks, and what it pre-ticks",
          text: "The export lists every site each person can reach, including other companies' instances — a consultant on your domain appears with their customers' sites. Ticking a site as **yours** decides one number: how many of your people hold access **outside** your organisation, which feeds the Guard block's “working elsewhere” figure and the **Access reaches** filter. The app pre-ticks your busiest site, anything sharing its name or holding many of the same people, every sandbox, and Bitbucket and Trello — those are Atlassian's own addresses, not another company's instance. Review the list; it is a heuristic, stated as one.",
        },
        {
          type: "list",
          items: [
            "**Sandboxes are set aside**, not counted: a sandbox seat comes with a Premium or Enterprise plan rather than being billed per user, and on one measured customer it was 43.9% of all product grants — counting it would nearly double the reported waste.",
            "**A plan tier is not a site.** The Trello column carries values like `Free`; the import knows the difference and does not invent a site called Free.",
            "**Whole-file imports see the most.** A scoped import has the same blind spot a licence scan has — accounts holding no seat are left out — and the dashboard says so where it matters.",
          ],
        },

        { type: "h", level: 2, text: "What still needs the API key" },
        {
          type: "p",
          text: "Everything that **changes** an account: removing groups, revoking products, suspending, restoring — and the [API-token sweep](/documentation/license-waste-manager/api-tokens). The import replaces the reading, not the acting. It is the right first step for a security review, a one-off analysis, or evaluating the app before your organisation approves a key.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Importing another organisation's exports",
          text: "The files never leave your browser as files — only the normalised rows are stored, inside your own site. Be aware that importing a directory makes this installation hold those people's account IDs, names and emails, with everything that implies: they enter the snapshot, the filters, and the app's daily personal-data report to Atlassian, until a newer snapshot replaces them or you uninstall.",
        },
      ],
    },
    {
      slug: "users",
      title: "Browsing and acting on users",
      description: "The filters, the CSV export, and the six bulk actions ranked by risk.",
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
            [
              "**Product**",
              "“Who has Confluence but never opens it?” Pick several and choose **Holds any of these** or **Holds all of these**.",
            ],
            [
              "**Status**: All, Enabled accounts, Disabled accounts, **Never signed in**",
              "Whether the **account is switched on** — which decides whether it costs anything. Disabled accounts keep their product columns in an export but occupy no seat. Where the source distinguishes, rows say the specific word: *Suspended* can be restored, *Deactivated* is on its way out. *Never signed in* is your highest-confidence group: a licence assigned and never used at all.",
            ],
            [
              "**Inactive For**",
              "A slider from 0 to 365 days, defaulting to the threshold you set in Settings — how long since the person actually used anything, a separate fact from the account being enabled. The STATUS column says the account's state; the LAST ACTIVE column says this.",
            ],
            [
              "**Licence**",
              "Any, **Holds a paid seat**, or **Holds no paid seat**. A seat is only a seat while the account is on: product access AND an enabled account, which is the dashboard's own definition of Licensed People — so the filter and the figure always agree.",
            ],
            [
              "**Account**: Billed for Guard, Managed, Unmanaged",
              "**Billed for Guard** is what Atlassian actually charges Guard on — the population every Guard figure on the dashboard counts. **Managed** means you verified their email domain and can administer the account; it is a much larger set. **Unmanaged** accounts you cannot administer, and Guard is not billed for them.",
            ],
            [
              "**Access reaches**",
              "Any site, also other sites, only this site — or **one named site**: the sites your people reach outside this one are listed by name with a count each, straight from the same figures the dashboard charts. Clicking a site chip on the dashboard lands here with the site pre-selected.",
            ],
            ["**2FA**", "With or without two-step verification — as reported for managed accounts. Needs a CSV import or the data stays unknown rather than pretending."],
            ["**Domain**", "Contractors, an acquired company, a partner. Each domain carries its own count."],
            ["**Department / Job title**", "Identity-provider attributes, when your directory sets them. Frequently blank — the filters appear only when the snapshot actually carries values."],
            ["**Search**", "One person by name or email."],
          ],
        },
        {
          type: "p",
          text: "Arriving from the **Dashboard** — a Guard figure, a site chip — lands here with the matching filter already applied, and the filter controls show it, so the number you clicked and the list you got always agree.",
        },

        { type: "h", level: 2, text: "What each row tells you" },
        {
          type: "fields",
          items: [
            {
              name: "User",
              text: "Avatar, name and email. The name links to that account's page in **admin.atlassian.com**, so acting on one person is a click, not a search in another tab. Two flags appear where they apply: **External account** — a domain you never verified, so Guard is not billed and you cannot administer it — and **Also on N other site(s)**, for access that reaches beyond this instance.",
            },
            {
              name: "Status",
              text: "Whether the **account is switched on** — the fact that decides whether it costs anything. *Disabled* accounts show their specific state where the source said it: *Suspended* can be restored, *Deactivated* is on its way out.",
            },
            { name: "Products", text: "One badge per seat the person holds. What the badges show is what the seat filters count." },
            {
              name: "Last Active",
              text: "*Today*, *yesterday*, *53d ago* — in the page's language. The colour bands come from **your** threshold, not a fixed 90: past a third of it is amber, past all of it is red, and **Never** carries the invitation date when there is one.",
            },
            { name: "Domain", text: "The email domain, or *Email not visible* where Atlassian withholds the address." },
            {
              name: "Groups",
              text: "**Group membership** opens the person's groups in place — the licence groups marked apart — so you can see exactly which membership grants the seat you are about to reclaim.",
            },
          ],
        },
        {
          type: "p",
          text: "Sort by name, email, last activity or domain from the column headers. Ticking people raises the bulk bar with the count and the actions; the selection belongs to the page you are on — changing page or filter clears it, so an action never carries invisible passengers from three pages back.",
        },
        {
          type: "p",
          text: "**Reset** clears them all. **Export CSV** hands the current list to a spreadsheet — the file uses exactly the filters on screen, which is still how most licence reviews actually happen.",
        },

        { type: "h", level: 2, text: "The six bulk actions, least risky first" },
        {
          type: "table",
          head: ["Action", "What it does", "Reversible?", "Use when"],
          rows: [
            [
              "**Add to Group**",
              "Adds the selected people to a group. Most often used to grant access back, or to tag a set of people you have just acted on.",
              "Yes — remove them from the group.",
              "Marking a set of users for follow-up.",
            ],
            [
              "**Grant Product Access**",
              "Adds the selected people to the groups that grant the products you pick. The dialog says plainly that each product they gain becomes a seat you are billed for.",
              "Yes — revoke it again.",
              "Putting access back after a reclaim went too far, or onboarding a set of people at once.",
            ],
            [
              "**Remove from Group…**",
              "Removes the selected people from the group you pick. Groups managed by your identity provider are skipped, because it would put everyone back on its next sync. A person who was not in the group is recorded as skipped, not as a success.",
              "Yes — add them back to the same group.",
              "You want to free the seats a specific group grants, and you know which group grants them.",
            ],
            [
              "**Revoke Product Access…**",
              "You tick which licences to revoke; the app works out which groups grant them and removes the person from those, so you do not have to know the mapping. The account stays active and keeps its Atlassian identity, so access can be granted again later. Tick nothing and it tells you nothing would be revoked rather than running empty.",
              "Yes — grant the products back. The audit log lists who was affected.",
              "You want the seats back but the person may return, or you do not know which groups to name.",
            ],
            [
              "**Suspend Users**",
              "Suspends the accounts at organisation level. Requires the organisation API connection **and a directory ID**, which is detected during a successful scan.",
              "Yes — with **Restore Users**, below.",
              "Genuine leavers, after HR has confirmed.",
            ],
            [
              "**Restore Users**",
              "Lifts a suspension and hands the account back its access.",
              "Yes — suspend again.",
              "A suspension that turned out to be wrong, or somebody returning from a long absence.",
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
      slug: "admin-roles",
      title: "Admin roles",
      description: "Who administers what, whether they still sign in, and which of them a second factor is not protecting.",
      blocks: [
        {
          type: "p",
          text: "**What this tab is for.** The accounts that can do the most damage, on one page: organisation admins, site admins, Jira system administrators, product admins and user-access admins — each with their last activity, their two-step verification, and whether the account is even one you manage.",
        },
        {
          type: "p",
          text: "**Where the roles come from — read this once.** Atlassian publishes **no API for roles**: every candidate endpoint answers 404, and the role field the directory does have comes back empty. So the page reads roles from two honest sources and says which it used. **Group names** — `org-admins`, `site-admins`, `system-administrators`, and the product patterns — cover roles granted through groups. The **Org role column of the users-and-groups export** names organisation admins outright, including the ones no admin-named group would ever reveal; on one real customer, all nineteen organisation admins were visible only that way. A role granted directly to a person, outside both, cannot be seen by anyone — which is why the page says *at least this many*.",
        },

        { type: "h", level: 2, text: "Two views of the same people" },
        {
          type: "fields",
          items: [
            {
              name: "By person",
              text: "A table: who, which roles (with the group each role was read from, or “named by the export”), last active, two-step verification, and whether the account is yours to manage.",
            },
            {
              name: "By level",
              text: "The same people as a ladder — most powerful role at the top, the people who hold it on each rung, with the role's reach explained in a sentence. Someone holding two roles appears on **both** rungs, deliberately: the lower rung is the access that survives revoking the top one.",
            },
          ],
        },

        { type: "h", level: 2, text: "What to look for" },
        {
          type: "list",
          items: [
            "**Dormant admins** — an account that can grant itself anything and has not signed in for months is the risk column's first row. The *Only those worth a look* toggle narrows to these.",
            "**No second factor and no single sign-on** — counted separately from accounts merely lacking 2FA: someone behind an enforced identity provider is protected, and calling them exposed would describe your SSO configuration as a breach. This split needs the [CSV import](/documentation/license-waste-manager/csv-import), because no API reports SSO.",
            "**Admins you do not manage** — a role held by an account on a domain you never verified is a role you cannot revoke from here.",
            "**App accounts** are listed apart from people, not counted as administrators alongside them.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          text: "Protect this page's people before automating anything: add `org-admins` and `site-admins` to **Protected Groups** in Settings, so no rule can ever act on them.",
        },
      ],
    },
    {
      slug: "api-tokens",
      title: "API tokens",
      description: "Which accounts hold API tokens, which tokens have sat unused for months, and revocation one click away.",
      blocks: [
        {
          type: "p",
          text: "**What this tab is for.** API tokens are credentials that outlive intentions: created for a script years ago, never expiring, still valid after their owner changed teams. Atlassian shows them one account at a time; this tab sweeps every managed account and lists what it finds in one table.",
        },

        { type: "h", level: 2, text: "The sweep" },
        {
          type: "p",
          text: "Atlassian publishes no organisation-wide token listing, so the sweep asks **one account at a time**, through the organisation API key, as a background job you can watch — on a large organisation it takes a while, and the table says when its rows were read, because every “unused for N days” is relative to that moment. Accounts Atlassian refuses to reveal tokens for are counted and said, not silently skipped.",
        },
        {
          type: "list",
          items: [
            "**Filter** to the tokens that matter: unused for 90+ days, no expiry date, or sitting on a disabled account.",
            "**Each row** carries the owner, the token's label — the owner's own words for what it is for — when it was created, last used, and when it expires.",
            "**Revoke** ends the token immediately. The owner keeps their account; the credential dies. Every revocation lands in the [audit log](/documentation/license-waste-manager/audit-log).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "A token on a disabled account still works",
          text: "Disabling an account stops the person signing in — it does not stop their API tokens authenticating. A leaver's forgotten token is a live credential with nobody watching it, which is exactly the row this tab sorts to the top.",
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
              name: "Scope",
              text: "Who the rule can touch: **All users** matching the condition, **Users in selected group**, or **External users** on the email domains you name.",
            },
            {
              name: "Action",
              text: "**Remove user from selected access groups**, **Remove every product licence the user holds**, or **Change user status to deactivated**. Groups your identity provider synchronises are locked out of the picker and badged *Managed externally*.",
            },
            {
              name: "Condition",
              text: "Last active more than N days ago, or **Users who have never been active** — which the rule processes first, because they are the safest.",
            },
            {
              name: "Then also add the affected users to a group",
              text: "Optional, and the most useful setting on the page. Everyone the rule acts on is added to a group you pick, so that group becomes the list of who was affected — and putting a licence back is a matter of removing them from it.",
            },
            {
              name: "Schedule",
              text: "**Daily**, **Weekly** with a day, **Every 2 weeks**, or **Monthly** with a day of the month, plus the hour in UTC. A day-of-month past the end of a short month clamps to the last day. The panel previews the **next scheduled runs** so you can see what you have actually asked for.",
            },
            { name: "Enabled", text: "A rule can exist and be switched off. New rules should start off." },
          ],
        },
        { type: "h", level: 2, text: "The last look: every person is re-checked live" },
        {
          type: "p",
          text: "A rule's candidates come from the snapshot, and a snapshot is stale by construction — someone seen idle 80 days at scan time crosses the 90-day line by arithmetic alone, and someone seen idle two years may have come back yesterday. So **before a rule touches anyone, it re-asks the live APIs about that person**: still inactive past the threshold? Still in the scoped groups? Whoever came back since the scan, or left the scope, is left alone — and counted, by reason, in the result line on the rule's card: *“3 left alone: the live check found them active or out of scope since the scan.”*",
        },
        {
          type: "list",
          items: [
            "Every uncertain answer lands on **leave this person alone**: a read that fails skips the person with its own named reason, never a revocation on a guess.",
            "The one deliberate exception is a **dead API key** — that is a verdict about the run, not the person, so the run stops with a single clear message instead of dressing up as a green success with a thousand skips.",
            "Verification is always on for rules whose condition involves activity or group scope. There is no toggle to act unseen.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "What a rule still refuses to do",
          text: "It will not run against a snapshot more than **45 days old** — at that age the candidate list no longer describes the organisation; run a scan, or turn on the [scheduled scan](/documentation/license-waste-manager/settings) so it never happens. Below that, an older snapshot only costs coverage (someone who went idle after the scan is not on the list yet) and the run's result says its age. If a rule's group scope resolves to no known membership, it fails rather than treating “nobody matched” as “act on everybody”. Rules also need the organisation API connection, and an active app licence, both to run on schedule and to **Run Now**. There is no size cap: a run larger than one background invocation continues across as many as it needs, and if it ever meets the platform's chain ceiling it pauses as an honest *partial* — the next scheduled firing picks up exactly where the filter still matches.",
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
          text: "Each rule records its **last run**, the result — `success`, `partial` or `failed` — how many accounts it affected, and one sentence saying what shaped the outcome: how many the live check left alone, the snapshot's age when it mattered, or the reason a run refused to start. A rule that keeps returning `partial` is usually hitting accounts managed by another organisation.",
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
            "**When** it ran and **what** the action was — removed from group, added to group, revoked product access, suspended account, restored account.",
            "**Triggered by**: **Manual**, with the administrator's name and avatar, or **Automated**, with the rule's name. An action whose actor could not be resolved says *Actor not recorded* rather than guessing.",
            "**Per-person outcome**: account ID, display name, success, failure or **skipped**, and the reason text in either of the last two cases — including which protection list spared somebody.",
            "**Counts** of successes, failures and skips, so a partial run is obvious at a glance.",
            "**The groups** the action targeted.",
          ],
        },
        { type: "h", level: 2, text: "Finding the entry you are looking for" },
        {
          type: "list",
          items: [
            "**Search** reaches every entry's summary, rule name and target groups, and the matched term is **highlighted** where it hit — each surviving row shows why it survived.",
            "**Date**: all, last 7 / 30 / 90 days, or a period with two dates.",
            "**Actor**: the administrators who actually appear in the log, plus **Automated** for entries nobody clicked.",
            "**Status**: Success, **Partial** — some people failed — or Failed.",
            "**Action**, **Trigger** and **Rule** narrow by what ran and what asked for it.",
            "The header counts both sides — *789 entries — showing 12* — so a narrow filter never reads as a small log, and **Reset** clears everything.",
          ],
        },
        {
          type: "p",
          text: "**Show details** expands one entry into its per-person rows: search for a person, filter by outcome — Changed, Failed or **Skipped** — and each name links to that account's page in **admin.atlassian.com**, so acting on what you find is one click.",
        },
        { type: "h", level: 2, text: "Taking the evidence with you" },
        {
          type: "list",
          items: [
            "**Export CSV** writes the log **under exactly the filters on screen** — the file holds what you were looking at, no more and no less, with the same columns the table shows.",
            "**Export these people (CSV)**, inside an expanded entry, writes that run's named people with each one's result and error — the attachment a licence-reduction ticket actually needs.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Entries are kept for 180 days, and there is no way to keep them longer",
          text: "The audit trail is swept at the end of every scan: an entry older than 180 days is deleted, **and so is its per-user detail, on the same horizon**. That pairing is deliberate. An entry that outlived its detail would say “504 users affected” with no way left to see who they were — an audit trail decaying into a number. One horizon means a row is either fully answerable or gone.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Keep the evidence before it ages out",
          text: "The audit entry is your proof that the seats you stopped paying for were released on a specific date. If a compliance review runs more than six months behind your clean-up, **Export CSV** the relevant entries somewhere outside the app while they are still there.",
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
            "Go to **admin.atlassian.com → Settings → API keys** and create a key. Choose **Create API key without scopes** — this matters, see the note below. It requires **Organization admin** permissions.",
            "Copy the organisation ID, or click **Use detected Org ID** if the app has already worked it out from the key.",
            "Paste both values into **Settings** and click **Test Connection**. If the organisation ID is wrong, the app lists the organisations your key can actually reach.",
            "Click **Save**. The app can then detect your licence groups automatically, so product access maps to the right groups.",
          ],
        },
        {
          type: "table",
          head: ["", "With the connection", "Without it"],
          rows: [
            ["Running a scan at all", "Yes", "**No** — the button is disabled and the Dashboard says why"],
            ["Last-active dates, per product", "Yes", "No"],
            ["Visibility across your organisation's sites", "Yes", "No"],
            ["Automatic licence-group detection", "Yes", "No"],
            ["Group membership and product access", "Yes", "No — both are read through the organisation API"],
            ["Suspend and restore accounts", "Yes", "No — the app says so instead of failing"],
            ["Automation rules", "Yes", "No — rules will not fire, and the scheduler says so in the log"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Create the key without scopes",
          text: "Atlassian offers a choice when you create an organisation API key: **with scopes** or **without**. This app needs one **without**. A scoped key reaches only the endpoints in [Atlassian’s scope table](https://developer.atlassian.com/cloud/admin/scopes/), and suspending or restoring an account is not in it — Atlassian’s own words are that any endpoint not listed “needs an API key without scopes”. The trap is that a scoped key **passes Test Connection**, because reading your organisation is scoped. Everything looks right until the first revocation, which fails with a rejected credential and no obvious cause.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "The API key is a powerful credential",
          text: "An organisation admin key can change access across your whole organisation. The app keeps it in Forge's **encrypted secret store** rather than alongside the rest of its configuration, and masks it on screen — but treat it like any other admin credential: create it for this purpose, rotate it on your normal schedule, and use **Disconnect** when the app no longer needs it. It is listed as stored data in the [privacy policy](/privacy/license-waste-manager).",
        },
        {
          type: "p",
          text: "If the key is revoked, expires, or stops being an organisation admin key, the app notices the first time a call is rejected and marks the connection as disconnected rather than retrying against a dead credential.",
        },

        { type: "h", level: 2, text: "Scheduled scan" },
        {
          type: "p",
          text: "Scans can run themselves — **weekly, every two weeks or monthly**, on the day and UTC hour you pick, reading either scope. The point is the rules: they act on the snapshot, and an admin should not have to remember to feed them. The panel previews the next three runs, and the Dashboard shows the next one beside the Scan button.",
        },
        {
          type: "list",
          items: [
            "**Saving never starts a scan.** The first scheduled run waits for the next due moment — turning the schedule on at 16:00 does not surprise you with a scan at 16:01.",
            "**No daily option, deliberately.** The freshness rules need comes from the live per-person check at action time, not from scanning more often; a daily walk of a large directory multiplies API cost and lock time for nothing.",
            "**Scans and rules take turns.** Only one operation runs at a time. On an hour when both a scan and a rule are due, the scan goes first and the rule follows on the next hourly tick — landing on the snapshot the scan just wrote. Nothing is lost; a blocked firing simply retries.",
            "**Off by default.** `Off — scans start manually` is the state every installation begins in.",
          ],
        },

        { type: "h", level: 2, text: "Default inactivity threshold" },
        {
          type: "p",
          text: "The number of days after which an account counts as inactive, set on a slider from 7 to 365. It drives the dashboard's dormant-seat count and the default position of the **Inactive For** filter. Ninety days is a common starting point; a quarterly business rhythm may justify more.",
        },

        { type: "h", level: 2, text: "Product licence groups" },
        {
          type: "p",
          text: "A read-only list of the groups the app believes grant each product, detected from your organisation when the screen opens. It is here to be read, not edited — it is what every **Revoke Product Access** and every licence-group rule acts on, so it is worth checking once. Groups your identity provider synchronises are badged, because membership changes there would be overwritten on the next sync.",
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
            ["`read:jira-user`", "Look up users and groups by name, so you can pick the accounts and groups to protect."],
            ["`read:jira-work`", "Check that the caller holds Jira administration before a resolver acts, and identify which site the app is installed on."],
            ["`storage:app`", "Store configuration, job state and snapshots."],
            ["`report:personal-data`", "Report to Atlassian the account IDs held in snapshots and audit records, so a closed account can be erased."],
          ],
        },
        {
          type: "p",
          text: "Outbound access is limited to `api.atlassian.com`: your own site's APIs and, when you connect it, the Atlassian organisation admin API. Nothing goes anywhere else.",
        },

        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "p",
          text: "Two stores, because the two shapes are different. Everything that grows with the size of your organisation — users, group membership, per-product activity, audit rows — is **Forge SQL**, one row per thing. Configuration and job state are key-value records.",
        },
        {
          type: "fields",
          items: [
            {
              name: "User snapshots (SQL)",
              text: "Per account: account ID, display name, **email address** and domain, active flag and account state, account type, managed status, whether Guard bills the account, last-active date, date added to the organisation, product access, licence groups, avatar URL, the sites their access reaches — and, when a CSV import supplied them, two-step verification, verified email, single sign-on, department, job title and organisation-admin role. One further row per account per product, carrying that product's own last-active date.",
            },
            { name: "Groups (SQL)", text: "Group IDs, names and kinds, and who belongs to which group in a snapshot." },
            { name: "API tokens (SQL)", text: "From a token sweep: the owner's account ID, the token's ID and label, created / last-used / expiry dates. Replaced by the next sweep." },
            { name: "Jobs (SQL)", text: "Scan and action jobs: type, status, phase, who requested them — a person, or the schedule — timings, metrics and errors." },
            { name: "Audit log (SQL)", text: "Every action with its per-user outcome, kept for **180 days** — the entry and its detail on the same horizon." },
            { name: "Rules", text: "Your automation rules and their run state." },
            {
              name: "Configuration",
              text: "Inactivity threshold, protected entities, detected licence groups and the organisation ID. The **API key** is held separately, in Forge's encrypted secret store.",
            },
          ],
        },
        {
          type: "p",
          text: "Only the current snapshot and the one before it are kept; older ones are deleted at the end of every scan, along with finished jobs more than 30 days old.",
        },

        { type: "h", level: 2, text: "What happens when you uninstall" },
        {
          type: "p",
          text: "The app runs an uninstall handler that empties both stores before it goes. It deletes the SQL tables' contents **most sensitive first** — audit detail and user snapshots before jobs and metadata — so if the handler runs out of its 45-second budget on a very large organisation, what survives longest is configuration rather than names and email addresses. Then it sweeps the key-value store, repeating whole passes until a pass finds nothing, because deleting under a cursor leaves keys behind.",
        },
        {
          type: "callout",
          variant: "info",
          title: "This only became true recently",
          text: "The handler existed for months wired to a Forge event that does not exist, so it had never run once. It is a `preUninstall` module now, and it actually deletes. Independently of it, Atlassian detaches the installation's data on uninstall and destroys it under its own retention policy — see [Where your data goes](/documentation/start-here/your-data).",
        },
        {
          type: "p",
          text: "The [privacy policy](/privacy/license-waste-manager) is the authoritative statement on all of the above.",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "“No user data to browse yet”",
              text: "Run a scan on the **Dashboard**. The Users, Automation and Audit tabs all read from a snapshot.",
            },
            {
              name: "The Scan Users button is greyed out",
              text: "Either the organisation API is not connected — the Dashboard says so above the button — or the app has no active licence, in which case a warning sits at the top of the page. They are two different problems with two different fixes.",
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
              text: "Because every read this app does — users, group membership, product access, last activity — goes through the organisation admin API, and so does every write. Jira's own APIs cannot supply them at an acceptable permission cost. **Without the key there is no app**: the scan button is disabled and there is nothing to browse. This is the one credential it asks for, and it is asked for once.",
            },
            {
              name: "Can I try it without a key, just to see?",
              text: "Yes — with your own files. [Import the admin-console CSV exports](/documentation/license-waste-manager/csv-import): every dashboard figure, every filter, the Guard block, admin roles and the audit views work on an imported snapshot, and the data never needed a credential. What stays locked without the key is **acting** — revoking, suspending, rules, the token sweep.",
            },
            {
              name: "Where is the key stored?",
              text: "In Forge's encrypted secret store, inside your own Atlassian site, and masked in the interface. We never see it. You can remove it any time with **Disconnect**.",
            },
            {
              name: "Can I use a key with fewer permissions?",
              text: "Atlassian's organisation API keys require organisation admin permissions. That is Atlassian's model, not ours.",
            },
            {
              name: "What if our security policy forbids storing that key?",
              text: "Use the [CSV import](/documentation/license-waste-manager/csv-import): the whole read side — dashboard, filters, Guard, admin roles — works from exports you download yourself, with no credential stored. What you give up is acting from the app and the scheduled scan. [Admin Toolkit's User Analysis](/documentation/admin-toolkit/users) remains the lighter-weight alternative for a one-off review.",
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
              name: "How long do you keep the audit log?",
              text: "**180 days**, for the entry and for the per-user detail behind it alike. There is no setting; older rows are deleted at the end of every scan. **Export CSV** keeps evidence past the horizon.",
            },
            {
              name: "Does a closed Atlassian account get erased?",
              text: "Yes. The app reports the account IDs it holds to Atlassian daily, and when Atlassian answers that an account is closed, that person's snapshot rows, per-product rows, group membership and audit detail are deleted. The audit *entry* survives without them, so “what ran, when, and to how many accounts” stays answerable without keeping a closed person's name.",
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
              name: "What stops a rule from acting on somebody who just came back?",
              text: "The rule itself. Before it changes anyone, it re-checks that person against the live APIs — still inactive past the threshold, still in the scoped groups. Someone who returned after the scan is left alone and counted in the run's result. A read that fails is a skip, never a revocation on a guess.",
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
              name: "What happens if the app licence lapses?",
              text: "You can still read everything: the last snapshot, every filter, the CSV export, the audit log and all your settings. What stops is starting a new scan, running a bulk action, and running a rule — by schedule or by hand. A warning at the top of the page says so, and the three buttons are greyed out with a line explaining why.",
            },
            {
              name: "What happens when I uninstall?",
              text: "The app runs an uninstall handler that empties both of its stores — the SQL tables most sensitive first, then the key-value store — before Atlassian detaches the installation's data and destroys it under its own retention policy. That covers the snapshots, the rules, the audit log and the API key, so **export the audit evidence first**. See [Where your data goes](/documentation/start-here/your-data). Access changes already applied stay applied, because they were made in Atlassian.",
            },
          ],
        },
      ],
    },
  ],
};
