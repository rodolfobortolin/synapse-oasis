import type { AppDocs } from "../types";

export const adminToolkit: AppDocs = {
  slug: "admin-toolkit",
  name: "Admin Toolkit for Jira",
  shortName: "Admin Toolkit",
  tagline:
    "Fourteen tools for the Jira administration jobs that have no screen in Jira: bulk project management, custom field assessment and merging, scheme, workflow and filter cleanup, copying a user's access, offboarding a leaver, and cleaning up after a migration.",
  products: "Jira · Jira Service Management",
  color: "#EC8546",
  icon: "/admin-toolkit.png",
  ai: false,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "The fourteen tools, how they all work the same way, and what to do first.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** A collection of separate tools on one admin page. You use one at a time. No tool runs on a schedule and none runs by itself — every one of them waits for you to click it.",
        },
        {
          type: "p",
          text: "**Why it exists.** Every Jira administrator has jobs that take hours because Jira has no screen for them: finding out which of 1,900 custom fields are actually used, merging two fields that mean the same thing, transferring everything a leaver owned, working out which schemes nothing references any more.",
        },
        {
          type: "p",
          text: "**Who uses it.** A [Jira administrator](/documentation/start-here/jira-words). Some operations additionally need a **site administrator**, and the tool tells you when Jira refuses.",
        },
        { type: "mock", id: "adm-tool-list" },

        { type: "h", level: 2, text: "The fourteen tools" },
        {
          type: "table",
          head: ["Group", "Tool", "What it does"],
          rows: [
            ["Projects", "**Projects Manager**", "Every project in one table. Edit names, keys and leads inline; archive and restore in bulk."],
            ["Projects", "**Project Activity**", "Issue creation per project over 12 months, so you can tell live projects from dormant ones."],
            ["Configuration", "**Unused Schemes Cleanup**", "Finds 16 kinds of unused configuration object — schemes, and also the workflows, statuses, screens, field configurations, work types, priorities and resolutions inside them — and deletes the ones you select."],
            [
              "Configuration",
              "**Custom Fields Health Assessment**",
              "Grades every custom field for cleanup, duplication, naming, searchability and option quality. Exports CSV and PDF.",
            ],
            [
              "Configuration",
              "**Custom Field Merger**",
              "Merges duplicate fields: generates the CSV import for the values and replaces the field on every screen.",
            ],
            [
              "Configuration",
              "**Field Screens Migrator**",
              "Swaps one field for another on every screen where it appears, in the same tab at the same position — then offers to trash the old one.",
            ],
            ["Configuration", "**Filter Management**", "Audits every listable saved filter and how it is shared. Bulk reassign, unshare, and find-and-replace inside the JQL."],
            ["Configuration", "**Scheme Deduplication**", "Compares eleven kinds of scheme and groups the ones with identical settings, so you can consolidate them. Report only."],
            [
              "Configuration",
              "**Workflow Health**",
              "Scans workflows for bad practice: oversized ones, statuses nothing can reach, and start and end statuses in the wrong category. Report only.",
            ],
            ["Users", "**Mirror User**", "Copies groups and project roles from one person to another, then verifies the result."],
            ["Users", "**User Analysis**", "Turns the two CSV exports from admin.atlassian.com into a licence, activity and security report, with drill-down lists you can download."],
            ["Users", "**User Offboarding**", "Finds everything a departing person owns and transfers it to a replacement."],
            ["Migration", "**Migrated Fields Cleaner**", "Removes “(migrated)” from field names, descriptions and configurations."],
            [
              "Migration",
              "**Migrated Project Roles Cleanup**",
              "Removes “migrated” from role names and moves the members back into the original roles.",
            ],
          ],
        },

        { type: "h", level: 2, text: "Every tool works the same way" },
        {
          type: "p",
          text: "The pattern is deliberate: nothing changes until you have seen what will change.",
        },
        {
          type: "steps",
          items: [
            "**Scan.** The tool reads your configuration in the background and shows progress. On a large site this takes minutes, not seconds.",
            "**Review.** Results come back as a table you can inspect and filter. Many tools show the current value next to the value after the change.",
            "**Select.** You tick the rows to act on. Nothing is selected for you.",
            "**Apply.** The action runs in the background and reports what succeeded, what was skipped and what failed.",
            "**Start Over** resets the tool so you can run it again with different settings.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "These tools change real configuration",
          text: "Deleting schemes, merging fields, reassigning filters and transferring ownership are genuine administrative changes, and most cannot be undone with one click. Use a test site if you have one. If you do not, start with the smallest possible scope and read the review step properly. That step is the whole point.",
        },

        { type: "h", level: 2, text: "What you need first" },
        {
          type: "list",
          items: [
            "Jira Cloud and **Jira administrator** rights.",
            "For group membership changes: a **site administrator**. This is an Atlassian restriction, and no app can work around it.",
            "For **User Analysis**: the CSV exports you download from **admin.atlassian.com**. The app reads files you provide, so it needs no organisation API key.",
            "An active app licence for anything that **starts work**. Reading, exporting and recovering stay available without one — see below.",
          ],
        },

        { type: "h", level: 2, text: "What happens without an app licence" },
        {
          type: "p",
          text: "Twenty-six resolvers are gated, and they are all of one kind: the ones that start a scan or write to Jira. Everything else is deliberately left open, because locking an administrator out of results they already have — or out of the button that clears a stuck job — turns a lapsed subscription into a support ticket.",
        },
        {
          type: "list",
          items: [
            "**Results you already have** stay readable, in every tool, along with their **CSV and PDF exports** — those are generated in your browser from data already fetched.",
            "**Every user, group, project and field picker** still searches, so you can look something up.",
            "**Cancel and start over** works in every tool. A job interrupted on the last day of a trial does not leave you stuck.",
            "**User Analysis works in full.** It parses the CSVs you drop into it in the browser and calls no resolver at all, so it has no licence gate.",
          ],
        },
        {
          type: "p",
          text: "An unlicensed installation shows a warning at the top of the page — *“This app does not have an active licence”* — and greys out the buttons that start work, each with a line under it saying why.",
        },

        { type: "h", level: 2, text: "Where to start" },
        {
          type: "p",
          text: "Run **Project Activity** and **Custom Fields Health Assessment**, in that order. Neither changes anything, and between them you get the two facts that drive every cleanup decision: which projects still matter, and which fields are dead weight.",
        },
        {
          type: "steps",
          items: [
            "Install the app and open **Jira → Apps → Admin Toolkit**.",
            "Run **Project Activity**. Export the CSV. You now know which projects are dormant.",
            "Run **Custom Fields Health Assessment**. Export the PDF. You now have the cleanup case in writing.",
            "Pick one finding and act on it with the relevant tool. Do not try to fix everything in one session.",
          ],
        },
      ],
    },

    {
      slug: "projects",
      title: "Projects Manager and Project Activity",
      description: "Manage every project from one table, and find out which ones are still alive.",
      blocks: [
        { type: "h", level: 2, text: "Projects Manager" },
        {
          type: "p",
          text: "**What it does.** Shows every project in one table: name, key, style, lead, issue count, last update and issue type scheme. Names, keys and leads can be edited inline, and projects can be archived or restored in bulk.",
        },
        {
          type: "p",
          text: "**Use it when** you need to see all projects side by side, or change the same thing on many of them. Jira makes you open each project separately.",
        },
        { type: "mock", id: "adm-projects-manager" },
        {
          type: "p",
          text: "**Inline edits are staged, not applied.** Change a name, a key or a lead and the row is marked **Unsaved**, with an **Undo this change** beside it. Nothing reaches Jira until you click **Confirm changes** and read the from-and-to list in the dialog. That is the review step, and on this tool it is the only thing standing between a mistyped key and every issue in the project being renumbered.",
        },
        {
          type: "table",
          head: ["Bulk action", "What it does", "Reversible?"],
          rows: [
            ["**Change Lead**", "Sets a new lead on the selected projects.", "Yes, set it back."],
            [
              "**Transfer Lead**",
              "Moves lead ownership from one person to another across the selection. The bulk version of somebody changing role.",
              "Yes.",
            ],
            ["**Archive**", "Archives the selected projects, hiding them from normal use.", "Yes, with **Restore**."],
            ["**Restore**", "Brings archived projects back. The table has an **Archived** filter to find them.", "Yes, archive again."],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "The most useful filter here is “Never updated”",
          text: "Projects that were created and then forgotten. They keep consuming schemes, fields and everyone's attention in project pickers.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Changing a project key rewrites every issue key",
          text: "Jira redirects the old keys, but every external reference sees the new one: bookmarks, wiki pages, tickets in other systems, scripts that match on the prefix. Treat a key change as a communications task, not a settings tweak.",
        },

        { type: "h", level: 2, text: "Project Activity" },
        {
          type: "p",
          text: "**What it does.** Counts issue creation per project over the last 12 months and sorts every project into a band: **Active (3mo)**, **Moderate (3–6mo)**, **Low (6–12mo)** or **Dormant**. Searchable, sortable and exportable as CSV.",
        },
        { type: "mock", id: "adm-project-activity" },
        {
          type: "callout",
          variant: "tip",
          title: "Run this before any configuration cleanup",
          text: "“Is this scheme still needed?” really means “is any live project using it?”. Once you know which projects are dormant, most cleanup decisions stop being a judgement call. The CSV export is also what you send to project owners before you archive anything, so nobody is surprised.",
        },
      ],
    },

    {
      slug: "custom-fields",
      title: "Custom field assessment and merging",
      description: "Find out which fields are dead weight, then merge duplicates without losing existing values.",
      blocks: [
        {
          type: "p",
          text: "Custom fields are the classic Jira problem: easy to create, frightening to delete, and slow for everybody once there are thousands. Two tools handle the two halves — knowing what you have, and safely reducing it.",
        },

        { type: "h", level: 2, text: "Custom Fields Health Assessment" },
        {
          type: "p",
          text: "**What it does.** Scans every custom field on the site and groups the problems it finds into categories. It changes nothing, so it is safe to run any time.",
        },
        { type: "mock", id: "adm-cf-assessment" },
        {
          type: "table",
          head: ["Category", "What it means", "What to do about it"],
          rows: [
            [
              "**Empty fields**",
              "The field has no values on any issue.",
              "Delete them. These are the safest deletions you will ever make.",
            ],
            [
              "**Duplicate definitions**",
              "Several fields that mean the same thing.",
              "Merge them with the Custom Field Merger, below.",
            ],
            [
              "**Migration residue**",
              "Copies left behind by a migration, usually empty and usually tagged “(migrated)”.",
              "Delete them, or clean the names with the [migration tools](/documentation/admin-toolkit/migration).",
            ],
            [
              "**Naming hygiene**",
              "ALL CAPS names, unnamed fields, inconsistent conventions.",
              "Rename them. This is why nobody can find the right field.",
            ],
            ["**Option quality**", "Select fields with a single option, or option lists that need tidying.", "Normalise the options."],
            [
              "**Searchability**",
              "Fields that cannot be searched properly, usually migrated fields with the wrong searcher.",
              "Review them; a field nobody can search is not doing its job.",
            ],
            ["**Redundant contexts**", "Several contexts on one field where one would do.", "Consolidate the contexts."],
          ],
        },
        {
          type: "p",
          text: "The assessment produces prioritised recommendations and exports as **CSV** or **PDF**. Send the PDF to whoever has to approve a cleanup: it makes the case without them opening an admin screen. Take the CSV if you want to sort and filter it yourself.",
        },

        { type: "h", level: 2, text: "Custom Field Merger" },
        {
          type: "p",
          text: "**What it does.** Merges duplicate fields into one. Doing this by hand means copying values issue by issue, then hunting down every screen that references the old field. This tool does both halves.",
        },
        { type: "mock", id: "adm-cf-merger" },
        {
          type: "steps",
          items: [
            "**Auto-Analyze** finds mergeable groups automatically, or use **Manual Select** to choose the fields yourself.",
            "Pick the **target** field — the one that survives — and confirm the source fields.",
            "**Generate CSV.** The tool produces a CSV of the issue values plus a config file, split into batches — 4,000 rows each by default, adjustable between 2,000 and 7,000. **Download All as ZIP** takes every batch at once.",
            "In Jira, go to **Settings → System → External System Import**, choose **Select CSV as the import source**, and point it at the CSV together with the generated config file. Repeat for each batch.",
            "**Preview screens** shows every screen and tab that references the source fields. **Replace on screens** swaps them for the target field.",
            "**Move source fields to trash** once the values and screens are done.",
          ],
        },
        {
          type: "diagram",
          label: "flowchart",
          caption: "Six steps, and step three is not the app's. The tool writes the file; Jira performs the import; the tool picks the work up again afterwards.",
          text: `flowchart TD
    A[Auto-Analyze or Manual Select] --> B[Generate CSV + config file]
    B --> C[Import in Jira:<br/>Settings, System,<br/>External System Import]
    C --> D[Preview screens]
    D --> E[Replace on screens]
    E --> F[Move source fields to trash]

    classDef app fill:#E9F2FF,stroke:#0055CC
    classDef you fill:#FFF7D6,stroke:#946F00
    class A,B,D,E,F app
    class C you`,
        },
        {
          type: "callout",
          variant: "warning",
          title: "The import is the step you own",
          text: "The tool generates the file; **Jira** performs the import. Do it on a test site first and check a handful of issues before running it in production. And use the generated config file: importing the CSV without it will not map the values correctly.",
        },
        {
          type: "callout",
          variant: "info",
          text: "Source fields are moved to **trash**, not deleted outright, so a mistake is recoverable inside Jira's retention window.",
        },

        { type: "h", level: 2, text: "Field Screens Migrator" },
        {
          type: "p",
          text: "**What it does.** The screen half of a merge, on its own. You pick a field to remove from screens and a field to put in its place, and it does the swap everywhere the first one appears — same tab, same position.",
        },
        {
          type: "p",
          text: "**Use it when** the values do not need to move: a field being retired that was never filled in, a rename that turned into a replacement, or the tail end of a merge you did by hand. If the values matter, use the Custom Field Merger, which does this step as part of a longer sequence.",
        },
        {
          type: "steps",
          items: [
            "Pick **Field to remove from screens** and **Field to put in its place**.",
            "Optionally tick **Also mark which screens are used by workflow transitions** — a transition screen is the one where an unexpected change is noticed last.",
            "**Preview Screens.** It lists every screen tab the source field sits on, and says for each whether the target is already there. The preview changes nothing.",
            "Apply. Where the target is already present, only the source is removed; where it is not, it is added in the source's slot.",
            "If the source field is now on no screen at all, the tool offers to **move it to trash** — restorable from the Custom fields admin page for 60 days.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          text: "The result reports tabs checked, updated, skipped and failed. Failures are listed first; if there are more rows than it will show, it says how many it left out rather than quietly truncating.",
        },
      ],
    },

    {
      slug: "schemes-and-filters",
      title: "Schemes, workflows and filters",
      description: "Delete schemes nothing uses, consolidate identical ones, find bad practice in workflows, and clean up saved filters.",
      blocks: [
        {
          type: "p",
          text: "If the word *scheme* is unfamiliar, read the [Jira words](/documentation/start-here/jira-words) page. In short: a scheme is a bundle of configuration that projects share, and instances tend to accumulate hundreds of them.",
        },

        { type: "h", level: 2, text: "Unused Schemes Cleanup" },
        {
          type: "p",
          text: "**What it does.** The name undersells it. It finds **16 kinds of unused configuration object**, not only schemes: also the workflows, statuses, screens, field configurations, work types, priorities and resolutions that sit inside them. You pick one type at a time, scan, and it reports how many exist, how many are in use and how many are unused. Then you select rows and delete.",
        },
        { type: "mock", id: "adm-unused-schemes" },
        {
          type: "p",
          text: "The type selector is grouped, so you can work down a whole area — for example clear unused workflow schemes, then the workflows nothing references, then the statuses no workflow uses.",
        },
        {
          type: "table",
          head: ["Group", "Type", "What “unused” means for it"],
          rows: [
            ["Workflows", "**Workflow Schemes**", "Not assigned to any project."],
            ["Workflows", "**Workflows**", "Not in any workflow scheme."],
            ["Workflows", "**Statuses**", "Not used in any workflow."],
            ["Screens", "**Work Type Screen Schemes**", "Not assigned to any project."],
            ["Screens", "**Screen Schemes**", "Not used in any work type screen scheme."],
            ["Screens", "**Screens**", "Not in any screen scheme or workflow."],
            ["Fields", "**Field Config Schemes**", "Not assigned to any project."],
            ["Fields", "**Field Configurations**", "Not used in any field config scheme."],
            ["Work Types", "**Work Type Schemes**", "Not associated with any project."],
            ["Work Types", "**Work Types**", "Not in any work type scheme."],
            ["Priority", "**Priority Schemes**", "Not assigned to any project."],
            ["Priority", "**Priorities**", "Not used by any issue."],
            ["Resolutions", "**Resolutions**", "Not used by any issue."],
            ["Security & Permissions", "**Issue Security Schemes**", "Not assigned to any project."],
            ["Security & Permissions", "**Permission Schemes**", "Not assigned to any project."],
            ["Notifications", "**Notification Schemes**", "Not assigned to any project."],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Clean from the outside in",
          text: "Delete unused **schemes** first, then re-scan the objects inside them. A workflow that looked used five minutes ago becomes unused the moment the scheme referencing it is gone, so the second pass always finds more than the first.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Priorities and resolutions are judged by usage, not by reference",
          text: "“Not used by any issue” means no issue currently has that value. That is a good reason to remove it from the dropdown, but check first whether a filter, dashboard or automation rule names it — those are not part of the check.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Start with anything called “Copy of…”",
          text: "Copies made during a change and never removed are the bulk of the sprawl. They are unused, unreferenced and unambiguous. Clear those before you consider anything that looks deliberate.",
        },

        { type: "h", level: 2, text: "Scheme Deduplication" },
        {
          type: "p",
          text: "**What it does.** Finds schemes that are *in use* but identical to another scheme. It groups them, shows which projects use each one, and reports totals for schemes scanned, duplicate groups found and schemes inside those groups.",
        },
        {
          type: "p",
          text: "It compares eleven kinds of object: **Issue Type**, **Workflow**, **Workflow Scheme**, **Screen**, **Screen Scheme**, **Issue Type Screen Scheme**, **Field Configuration**, **Field Configuration Scheme**, **Permission**, **Notification** and **Priority** schemes.",
        },
        {
          type: "p",
          text: "**Why bother.** Ten identical schemes means ten places to make the same change, and nine chances to forget one.",
        },
        {
          type: "callout",
          variant: "info",
          title: "It reports; it does not consolidate for you",
          text: "There is no button here that repoints a project or deletes a scheme. You get the groups, the projects using each one, and a **CSV export** — the change itself is made in Jira, deliberately, because deciding which of two identical schemes survives is not a decision an app should make. Once you have repointed the projects the duplicates become unused, and **Unused Schemes Cleanup** can delete them.",
        },
        {
          type: "p",
          text: "Two settings decide how strict *identical* is. For **workflows**, you choose whether conditions, validators, post-functions and properties have to match as well as the transitions. For **screens**, whether the tabs have to match or only the set of fields. Loosen them and you find more groups that are harder to justify merging; tighten them and you find fewer, which you can act on with more confidence.",
        },
        {
          type: "p",
          text: "**Team-managed projects are excluded**, and that is not an oversight: a team-managed project keeps private copies of its own configuration, so its schemes are duplicates by design and cannot be consolidated. If the scan could not read everything within its budget it says **This scan did not read everything**, rather than presenting a partial sweep as a complete one.",
        },
        {
          type: "callout",
          variant: "info",
          title: "This is the tool to run before Unused Schemes Cleanup",
          text: "Deduplication points projects at one shared scheme, which turns the duplicates into unused schemes. Then the cleanup tool can delete them. Doing it the other way round leaves the duplicates in place, because they were all in use.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Identical today is not identical forever",
          text: "Two teams may deliberately keep separate schemes so they can diverge later. Ask the project owners before consolidating a scheme that is actually in use.",
        },

        { type: "h", level: 2, text: "Workflow Health" },
        {
          type: "p",
          text: "**What it does.** Reads your company-managed workflows and reports the three kinds of bad practice that make a workflow expensive to live with. It changes nothing.",
        },
        {
          type: "table",
          head: ["Check", "What it finds", "Why it matters"],
          rows: [
            [
              "**Oversized workflows**",
              "More statuses or transitions than the limits you set — 15 and 30 by default, adjustable from 5 to 40 and 5 to 80.",
              "A workflow nobody can hold in their head is a workflow nobody will maintain correctly.",
            ],
            [
              "**Broken reachability**",
              "Orphaned statuses with no transition leading into them, and statuses that cannot be reached from the initial status at all.",
              "An issue can never arrive there, so the status is a lie in every report that counts it.",
            ],
            [
              "**Wrong status categories**",
              "Final statuses that are not in **Done**, and initial statuses that are not in **To Do**.",
              "An issue that ends outside Done never counts as completed — not on a board, not in a burndown, not in any `statusCategory` query.",
            ],
          ],
        },
        {
          type: "p",
          text: "Before it scans you choose whether to cover **all workflows** or **only active ones**, and set the two size limits. Results are searchable, filterable by finding type, show which projects use each workflow, and export as **CSV**. A workflow list that stopped before the end is reported as **This scan did not read everything**, not as a clean bill of health.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Scan the active workflows first",
          text: "An unreachable status in a workflow no project uses is a curiosity. The same finding in a workflow behind four hundred issues is a reporting bug somebody is already living with.",
        },

        { type: "h", level: 2, text: "Filter Management" },
        {
          type: "p",
          text: "**What it does.** Lists saved filters with their owner, their sharing scope and their JQL, and lets you act in bulk. Search **By Name**, **By Owner**, **By Project** or **By JQL** — that last one finds every filter whose query mentions a given string — and narrow by sharing scope: All, Private, Project, Group or Global.",
        },
        {
          type: "p",
          text: "**Why it matters.** Saved filters are the configuration nobody audits, and the most common way Jira data ends up shared more widely than anyone intended.",
        },
        { type: "mock", id: "adm-filter-hygiene" },
        {
          type: "callout",
          variant: "warning",
          title: "It cannot see other people's private filters, and it says so",
          text: "Jira's API only exposes filters that are shared or that you own, so a private filter belonging to somebody else cannot be listed — by this app or any other. The tool states that above the results rather than presenting the list as complete. Read the audit as covering shared filters plus your own.",
        },
        {
          type: "table",
          head: ["Action", "What it does", "Use it for"],
          rows: [
            [
              "**Reassign Owner**",
              "Moves ownership to another person.",
              "Filters owned by deactivated users. These are what break dashboards and boards when an account goes away.",
            ],
            ["**Make Private**", "Removes all sharing from the selected filters.", "Filters that were shared by accident."],
            ["**Remove Global Share**", "Removes only the global scope, leaving other sharing intact.", "Reducing exposure without breaking a team's access."],
            [
              "**Replace in JQL**",
              "Find-and-replace inside the JQL of the selected filters. Before you commit, it says how many filters would change and validates each result, naming any that would become invalid JQL — those are left untouched.",
              "A project key that changed, a renamed custom field, a status that no longer exists. This is the alternative to opening two hundred filters by hand.",
            ],
            ["**Export CSV**", "Exports the current list, up to 20,000 rows.", "Evidence for an audit, and a before/after record."],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Two searches worth running today",
          text: "Filters shared **globally**, and filters owned by **deactivated users**. The first is an information-exposure question. The second is a list of dashboards and boards that are already broken or about to break.",
        },
      ],
    },

    {
      slug: "users",
      title: "User tools",
      description: "Copy someone's access to a new joiner, analyse your user base, and offboard a leaver properly.",
      blocks: [
        { type: "h", level: 2, text: "Mirror User" },
        {
          type: "p",
          text: "**What it does.** Copies one person's groups and project roles to another person.",
        },
        {
          type: "p",
          text: "**Use it when** you get the request every administrator gets: “give the new person the same access as Marina”. Answering that by hand means checking every project role in every project.",
        },
        { type: "mock", id: "adm-mirror" },
        {
          type: "table",
          head: ["Mode", "What it does", "When to use it"],
          rows: [
            ["**Add (merge)**", "Adds the source person's groups and roles on top of whatever the target already has.", "Almost always. This is the safe choice."],
            [
              "**Replace (overwrite)**",
              "Removes the target from all current groups and roles first, then applies the source's.",
              "Only when you want an exact copy and you know what the target currently has. This is destructive.",
            ],
          ],
        },
        {
          type: "p",
          text: "After applying, the tool runs a **Verification**: it compares the two people and reports what matches, what is missing on the target and what exists only on the target. Read it. It is how you know the copy actually worked.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Jira may refuse the group changes, and that is normal",
          text: "Group membership can only be changed by a **site administrator**. When Jira refuses, the tool tells you how many changes were blocked and confirms that project roles were still copied. Either re-run it signed in as a site admin, or send the group list to whoever has that right.",
        },

        { type: "h", level: 2, text: "User Analysis" },
        {
          type: "p",
          text: "**What it does.** Analyses the CSV exports you can already download from **admin.atlassian.com**: the **Managed Accounts** export and the **Users** export. It validates the columns, tells you if one is missing, then produces a report.",
        },
        { type: "mock", id: "adm-user-analysis" },
        {
          type: "steps",
          items: [
            "Download both CSVs from **admin.atlassian.com**: the **Managed Accounts** export and the **Users** export. The tool has the four-step instructions on screen, including which options to tick in the export dialog.",
            "Drop each file into its box. The tool validates the columns and names any that are missing.",
            "Set an **Inactivity Threshold** in days — minimum 30 — to decide what counts as dormant.",
            "Click **Analyze**.",
          ],
        },
        {
          type: "p",
          text: "What comes back is not a summary. It is a report you read top to bottom, and it is the part of the toolkit people underestimate.",
        },
        {
          type: "fields",
          items: [
            {
              name: "The headline row",
              text: "Product users, managed accounts, sites in the org, groups, org admins and Atlassian Guard billable seats — with a second line under each giving the number that qualifies it, such as how many of those accounts are disabled.",
            },
            {
              name: "Three alerts, each of which opens a list",
              text: "**Ghost seat holders** — active people holding billable seats who have never used any of them. **Paid seats idle** — the percentage unused past your threshold. **Stale group members** — suspended or deactivated users still sitting in groups, who regain access the instant somebody re-enables them. Click any of the three and the holder list loads at the bottom of the page.",
            },
            {
              name: "License Optimization — paid seats only",
              text: "The centre of the report: one row per product per site, with seats, active holders, a usage band breakdown, and a **Reclaimable** count. Filter by site and by product. A separate table lists what is **included with your plans** and therefore is not a seat you are paying for — Rovo, platform apps, features of a JSM tier — each with the reason.",
            },
            {
              name: "Who holds paid seats",
              text: "The people behind the numbers, with an onboarding note when a year's intake shows up as a wave of accounts that never signed in.",
            },
            {
              name: "Directory activity",
              text: "Last activity across the whole organisation directory, and how many accounts have never been active on any Atlassian product — usually provisioned-but-unused identities from a directory sync.",
            },
            {
              name: "Security posture",
              text: "From the managed-accounts export: how many accounts are under enforced SSO, how many sign in with an Atlassian password, how many of those passwords are weak, and how many email addresses are unverified.",
            },
            {
              name: "Org admins, sites footprint and groups",
              text: "Who holds organisation administration — with a badge counting the never-seen service accounts among them — how many sites the org contains including sandboxes and personal ones, and the group picture.",
            },
            {
              name: "Recommended actions",
              text: "Six, each with the number of users, seats, accounts or sites it would affect: reclaim never-used paid seats, trim idle access on the biggest products, clean groups of suspended users, review org-admin service accounts, close the non-SSO gap, and audit the site long tail.",
            },
          ],
        },
        {
          type: "p",
          text: "Every drill-down list has **Download CSV**, and when the table shows only the first N rows it says so and confirms the CSV covers them all.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Ghost seat holders, service accounts, org admins — in that order",
          text: "**Ghost seat holders** is your cheapest win: a seat bought and never once used. **Service accounts** is what stops you breaking an integration while chasing that win. **Org admins** is the one that starts an uncomfortable but necessary conversation.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Everything here happens in your browser",
          text: "The two CSVs are parsed and analysed in the page. Nothing is uploaded, nothing is stored by the app, and no resolver is called — which is also why this one tool keeps working when the app has no licence.",
        },
        {
          type: "callout",
          variant: "info",
          title: "This tool or License Waste Manager?",
          text: "**User Analysis** reads CSV files and needs no credentials. Good for a one-off review, or when you cannot get an organisation API key. **[License Waste Manager](/documentation/license-waste-manager/overview)** connects to the organisation API, sees live activity data, and can act on what it finds on a schedule.",
        },

        { type: "h", level: 2, text: "User Offboarding" },
        {
          type: "p",
          text: "**What it does.** Finds everything a departing person owns — projects they lead, components, dashboards, filters, permission grants, automation rules, boards, assigned issues — and transfers what can be transferred to a replacement.",
        },
        {
          type: "p",
          text: "**Why.** Deactivating the account is the easy part. What breaks is everything that pointed at them.",
        },
        { type: "mock", id: "adm-offboarding" },
        {
          type: "steps",
          items: [
            "Pick the **user to offboard**.",
            "Select the **categories to scan**. There are nine — project leads, component leads, dashboards, filters, permission grants, project roles, notifications, security levels and boards — plus their assigned issues. **Select All** takes the lot.",
            "Click **Scan**. Results are grouped by category with a count for each.",
            "Choose the **replacement user**.",
            "Per section, choose **Transfer to the replacement user** or **Remove without a replacement**. They are not the same decision, and for a permission grant or a notification recipient the second is often the right one.",
            "For issues, choose whether to **reassign them to the replacement user**. This is slow for large numbers, up to a maximum of 10,000.",
            "Click **Apply Transfer**. The tool reports what succeeded and what was skipped, per category.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "It tells you what it cannot do, and what it could not see",
          text: "Some things cannot be transferred automatically: certain automation rules, permission grants that name the person directly, third-party app data. Those are listed as **info only — manual transfer required**, under a heading that says exactly that. Separately, a **What a scan cannot see** panel names the blind spots — among them private filters belonging to other people, which Jira's API does not expose to anybody. A tool that silently skipped either would be worse than useless during an offboarding.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Run the scan before the account is deactivated",
          text: "Once an account is gone, several of these relationships are much harder to enumerate. Make the scan part of your leaver checklist, on the day.",
        },
      ],
    },

    {
      slug: "migration",
      title: "Post-migration cleanup",
      description: "Remove the “(migrated)” names a Server-to-Cloud migration leaves behind.",
      blocks: [
        {
          type: "p",
          text: "**The problem.** A Server-to-Cloud migration renames anything that collides. Fields become “Impact (migrated)”. Roles become “Developers (migrated)”. It is a sensible thing for the migration tool to do, and a bad thing to keep. Two tools undo it.",
        },

        { type: "h", level: 2, text: "Migrated Fields Cleaner" },
        {
          type: "p",
          text: "Choose the **Cleanup Mode** — **Field Names**, **Field Descriptions** or **Field Configurations** — then scan. The results table shows each field's ID, the configuration it belongs to, its **current value** and the **cleaned value** it will become.",
        },
        {
          type: "p",
          text: "You approve the exact rename before it happens. Nothing is renamed until you select rows and apply.",
        },
        { type: "mock", id: "adm-migrated-fields" },

        { type: "h", level: 2, text: "Migrated Project Roles Cleanup" },
        {
          type: "p",
          text: "The role equivalent, and it does more than rename. It removes the “migrated” suffix **and** moves the users and groups from the migrated role back into the original role.",
        },
        {
          type: "p",
          text: "That second half is the step people skip, which is why permissions stay split across two nearly identical roles for years.",
        },
        {
          type: "steps",
          items: [
            "Choose where to look: **permission schemes**, **projects**, **workflows**, or projects and permission schemes together. A migrated role can be referenced in all three, and they are worth clearing in that order.",
            "**Scan** to find migrated roles and their members.",
            "Decide what happens to the migrated role itself: **copy** leaves it in place with its members, or **move** empties it of the actors it can prove came from the migration. Copy first if you are not certain.",
            "Review which members will move into which original role.",
            "Apply the cleanup to the roles you selected.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          text: "If the scan or the cleanup could not cover everything in its budget, it says **This scan did not finish** or **This cleanup did not finish** and gives the numbers. A partial sweep is never reported as a complete one.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Merging roles changes who can do what",
          text: "Moving members back into the original role changes their effective permissions. Confirm the two roles really are the same role. A migration that renamed a role for a genuine reason is an exception you want to keep.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Do this within weeks of the migration",
          text: "Once people start creating new configuration that references the “(migrated)” objects, this stops being cosmetic and becomes a project.",
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
            ["`read:jira-work`, `write:jira-work`", "Read configuration and issues; reassign issues and apply changes."],
            ["`read:project:jira`, `manage:jira-project`", "Read and manage projects, leads, components and archiving."],
            ["`manage:jira-configuration`", "Read and modify fields, schemes, contexts and filters. This is the core of most tools."],
            ["`read:jira-user`", "Resolve users and groups for the user tools."],
            ["`read:board-scope:jira-software`, `read:board-scope.admin:jira-software`", "Read boards, so offboarding can report board ownership."],
            ["`storage:app`", "Store job progress, results and tool settings."],
            ["`report:personal-data`", "Report to Atlassian the account IDs held in job results, so a closed account can be erased from them."],
          ],
        },
        {
          type: "p",
          text: "The app declares **no external network access at all** — there is no allowed-host list in its manifest, because it never calls anything outside the Atlassian APIs it is already running against. The PDF and CSV files are generated in your browser, not by a service.",
        },
        {
          type: "p",
          text: "It is available in nine locales: English (US and UK), Portuguese (Brazil and Portugal), Spanish, French, German, Italian and Japanese.",
        },

        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "list",
          items: [
            "**Job progress and results** for the operations you run: assessments, merger analyses and generated CSV rows, offboarding scans, cleanup scans. Results are kept so you can review a completed run.",
            "**Tool settings**, such as the target project and issue type used when a tool creates an issue.",
          ],
        },
        {
          type: "p",
          text: "Results contain user names, account IDs and group names when that is what you asked the tool to analyse — a permission audit is a report about people. It is all in the app's own key-value storage inside your Atlassian site; there is no database and nothing leaves.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "There is no audit log, and no automatic expiry",
          text: "This app keeps no record of what you did with it — the tools report their results and that is the whole of it. Nor is there a retention clock: a completed job's results sit in storage until you press **Start Over** in that tool, run it again, or uninstall the app. If a scan named people you would rather not keep on file, reset the tool when you are done with the results. The one thing that removes data on its own is the daily closed-account sweep below.",
        },

        { type: "h", level: 2, text: "Closed accounts, and uninstalling" },
        {
          type: "p",
          text: "Once a day the app reports the Atlassian account IDs it is holding, so Atlassian can tell it which of those accounts have been closed. When one has been, the records naming that person are deleted. This runs whether or not the app is licensed, because it is a compliance obligation rather than a feature.",
        },
        {
          type: "p",
          text: "Uninstalling runs a handler that empties the app's storage before it goes, sweeping it repeatedly until a pass finds nothing — deleting under a cursor leaves keys behind, so one pass is not enough. Independently, Atlassian detaches the installation's data and destroys it under its own retention policy. See [Where your data goes](/documentation/start-here/your-data).",
        },
        {
          type: "callout",
          variant: "info",
          title: "This only became true recently",
          text: "The uninstall handler existed for months wired to a Forge event that does not exist, so it had never run once. It is a `preUninstall` module now, and it actually deletes.",
        },
        {
          type: "p",
          text: "The [privacy policy](/privacy/admin-toolkit) is the authoritative statement on all of the above.",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "A scan seems stuck",
              text: "Large instances genuinely take minutes. If it has actually stalled, use **Start Over** and re-run with a narrower scope.",
            },
            {
              name: "Group changes were rejected",
              text: "Expected. Only a site administrator can change group membership. Project roles are still applied, and the tool reports how many group changes were blocked.",
            },
            {
              name: "A scheme will not delete",
              text: "Something still references it. Re-scan: a scheme that became used between your scan and your delete is reported rather than force-deleted.",
            },
            {
              name: "The merger CSV did not import",
              text: "Use the generated **config file** alongside the CSV, import one batch at a time, and make sure the target field is on the relevant screens first.",
            },
            {
              name: "User Analysis rejects a CSV",
              text: "The tool names the **missing columns**. Re-export from admin.atlassian.com without opening the file in a spreadsheet first — that round-trip is the usual cause.",
            },
            {
              name: "A button is greyed out and I do not know why",
              text: "If there is a warning at the top of the page saying the app has no active licence, that is the reason — the actions that start work are gated, and there is a line under each disabled button saying so. Reads, exports and **Cancel and start over** are not gated.",
            },
            {
              name: "Offboarding did not move everything",
              text: "Categories marked **info only** cannot be transferred automatically. They are listed so you can handle them by hand.",
            },
          ],
        },
        {
          type: "p",
          text: "Missing a tool? The **Suggest a tool** button on the tool list and the [support portal](https://synapseoasis.atlassian.net/servicedesk/customer/portals) go to the same queue.",
        },
      ],
    },

    {
      slug: "faq",
      title: "FAQ",
      description: "Questions people ask before installing, and the ones security reviews always ask.",
      blocks: [
        { type: "h", level: 2, text: "Safety" },
        {
          type: "fields",
          items: [
            {
              name: "Can this app break my Jira?",
              text: "It can delete schemes, merge fields and change ownership, because that is what you are asking it to do. It never acts without a review step and an explicit selection. Use a test site for the destructive tools, and start with the smallest scope.",
            },
            {
              name: "Does anything run automatically?",
              text: "No tool does. Nothing scans, deletes, merges or transfers unless you click it. There is exactly one scheduled job in the app and it touches nothing in your Jira: once a day it reports the account IDs it holds to Atlassian, so a closed account can be erased from its records.",
            },
            {
              name: "Can I undo a cleanup?",
              text: "Depends on the tool. Archiving projects and moving fields to trash are reversible. Deleting a scheme is not. The guides mark which is which.",
            },
            {
              name: "Does data leave Atlassian?",
              text: "No. The app runs on Atlassian Forge and declares no external network access at all — there is no allowed-host list in its manifest for anything to be sent to. The CSVs and PDFs are built in your browser.",
            },
            {
              name: "Does it use AI?",
              text: "No. Every tool is deterministic: it reads your configuration and reports facts.",
            },
          ],
        },

        { type: "h", level: 2, text: "Permissions" },
        {
          type: "fields",
          items: [
            {
              name: "Why does it need such broad permissions?",
              text: "Because the tools work across the whole site: all projects, all fields, all schemes. A tool that could only see one project could not tell you that a scheme is unused. Each scope is explained on the [reference page](/documentation/admin-toolkit/reference).",
            },
            {
              name: "Can a project administrator use it?",
              text: "No. The tools are on a global admin page and require Jira administrator rights.",
            },
            {
              name: "Why did my group change fail?",
              text: "Atlassian only allows site administrators to change group membership. The tool reports this clearly instead of failing silently.",
            },
            {
              name: "Does User Analysis need an API key?",
              text: "No. You upload the CSV exports from admin.atlassian.com. If you want live licence data and automated action, use [License Waste Manager](/documentation/license-waste-manager/overview) instead.",
            },
          ],
        },

        { type: "h", level: 2, text: "Practical" },
        {
          type: "fields",
          items: [
            {
              name: "Where do I start if my instance is a mess?",
              text: "Project Activity, then Custom Fields Health Assessment. Both are read-only, and together they tell you what matters and what is dead.",
            },
            {
              name: "Does it work with team-managed projects?",
              text: "They appear in Projects Manager and Project Activity. The configuration cleanup tools work on company-managed configuration, because team-managed projects keep their settings to themselves.",
            },
            {
              name: "Will the field merger lose data?",
              text: "The values are moved by a Jira CSV import that you review and run, and source fields go to trash rather than being deleted. Test on a non-production site first.",
            },
            {
              name: "Can I export the results?",
              text: "Yes, and from more tools than you might expect. **CSV** from Project Activity, Custom Fields Health Assessment, Workflow Health, Scheme Deduplication, Filter Management, the Custom Field Merger and every User Analysis drill-down. **PDF** from the Custom Fields Health Assessment — that is the only one. Exports are generated in your browser, so they keep working even without an app licence.",
            },
            {
              name: "What can I still do if the licence lapses?",
              text: "Read every result you already have, export it, search for users and projects, and reset a stuck tool. What stops is starting a scan and writing to Jira. **User Analysis works in full**, because it never calls the backend at all.",
            },
            {
              name: "What happens when I uninstall?",
              text: "The app runs an uninstall handler that empties its storage before it goes — sweeping repeatedly until a pass finds nothing — and independently Atlassian detaches the installation's data and destroys it under its own retention policy. See [Where your data goes](/documentation/start-here/your-data). Changes the tools already made to your Jira configuration stay, because they are now part of Jira.",
            },
          ],
        },
      ],
    },
  ],
};
