import type { AppDocs } from "../types";

export const customFieldsToolkit: AppDocs = {
  slug: "custom-fields-toolkit",
  name: "Custom Fields Toolkit for Jira",
  shortName: "Custom Fields Toolkit",
  tagline:
    "Three field types Jira does not ship: a picker whose options come from a JQL query, a checklist with statuses and a transition validator, and a text field that formats and validates as you type. Plus select list options that project admins can manage themselves.",
  products: "Jira · Jira Service Management",
  color: "#3B9FE3",
  icon: "/cf-toolkit.png",
  ai: false,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "What the toolkit adds, how to create one of its fields, and where the settings live.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** Three new custom field types, one workflow validator, and a way to hand select list options over to project administrators.",
        },
        {
          type: "p",
          text: "If terms like *custom field*, *field context* or *screen* are unfamiliar, read [Jira words used in these guides](/documentation/start-here/jira-words) first. This page assumes them.",
        },

        { type: "h", level: 2, text: "What you get" },
        {
          type: "table",
          head: ["Feature", "What it is for"],
          rows: [
            [
              "**[Issue Picker](/documentation/custom-fields-toolkit/issue-picker)**",
              "A field whose options are the results of a JQL query. Users pick one issue or several, and the app can create real Jira issue links for each selection.",
            ],
            [
              "**[Checklist](/documentation/custom-fields-toolkit/checklist)**",
              "One or more checklists on an issue, with per-item statuses, descriptions, due dates, mandatory flags and assignees. Progress is searchable in JQL.",
            ],
            [
              "**[Masked Input](/documentation/custom-fields-toolkit/masked-input)**",
              "A text field that formats while the user types and refuses values that do not match the format. 21 ready-made presets.",
            ],
            [
              "**Checklist Completion Validator**",
              "A workflow validator that blocks a transition while checklist items are still open. Covered on the Checklist page.",
            ],
            [
              "**[Select list options](/documentation/custom-fields-toolkit/select-list-options)**",
              "Lets a project administrator add and edit the options of their own select field, without giving them Jira administration rights.",
            ],
          ],
        },

        { type: "h", level: 2, text: "What you need first" },
        {
          type: "list",
          items: [
            "Jira Cloud. Works with Jira Software, Jira Work Management and Jira Service Management.",
            "**Jira administrator** rights to create fields, edit their configuration and edit workflows.",
            "**Project administrator** rights are enough to manage delegated select list options, once a Jira admin has enabled the field.",
          ],
        },

        { type: "h", level: 2, text: "Create one of the fields" },
        {
          type: "steps",
          items: [
            "Install the app.",
            "Go to **Jira → Settings → Issues → Custom fields** and click **Create field**.",
            "Choose **Issue Picker**, **Checklist** or **Masked Input**. They appear in the list alongside Jira's own field types.",
            "Name the field and associate it with the screens where it should appear. **A field that is not on a screen is invisible**, and this is the most common reason people think the app is not working.",
            "Open the field's **Contexts** and click **Edit configuration**. Every setting described in these guides lives there.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Configuration is per context, and this matters",
          text: "A **field context** is the field's settings for a specific set of projects and issue types. The same Checklist field can require all items in one project and nothing in another. If a field behaves differently than you expect, check which context covers that project first.",
        },

        { type: "h", level: 2, text: "Where each screen lives" },
        {
          type: "table",
          head: ["Screen", "Where", "Who"],
          rows: [
            [
              "Field configuration",
              "**Settings → Issues → Custom fields → *your field* → Contexts → Edit configuration**",
              "Jira administrator",
            ],
            ["Select List Option Management", "**Jira → Apps → Custom Fields Toolkit**", "Jira administrator"],
            ["Select List Options", "Project settings → **Select List Options**", "Project administrator"],
            ["The Checklist Completion Validator", "**Settings → Issues → Workflows** → transition → Validators", "Jira administrator"],
          ],
        },

        { type: "h", level: 2, text: "Where the data lives" },
        {
          type: "p",
          text: "Field values — selected issues, checklist items, masked text — are stored by **Jira** as ordinary custom field values on the issue. They follow the issue's permissions, exports and backups. The app's own storage holds only configuration. See the [privacy policy](/privacy/custom-fields-toolkit).",
        },
      ],
    },

    {
      slug: "issue-picker",
      title: "Issue Picker",
      description: "A field whose options come from a JQL query, with optional real Jira links.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Jira lets you link any issue to any issue. It does not let you say “*these* are the issues this field accepts”. The Issue Picker does: you write a JQL query, and the field offers exactly the issues that query returns.",
        },
        {
          type: "p",
          text: "**Typical uses.** “Affected service” pointing at a service catalogue project. “Caused by change” pointing at your change project. “Parent programme” pointing at an epic-level project.",
        },
        { type: "mock", id: "cft-issue-picker-config" },

        { type: "h", level: 2, text: "The JQL query" },
        {
          type: "p",
          text: "**JQL to limit search options** is the only required setting. Whatever the query returns becomes the list of options.",
        },
        {
          type: "code",
          label: "Example: only open incidents, newest first",
          text: "project = OPS AND type = Incident AND statusCategory != Done ORDER BY created DESC",
        },
        {
          type: "fields",
          items: [
            {
              name: "Test JQL",
              text: "Validates the query and tells you how many issues it currently returns. Always use it: a query that returns nothing gives your users an empty field and no explanation.",
            },
            {
              name: "Limit field options to current project",
              text: "Scopes the query to the project of the issue being created or edited, so one configuration works across many projects.",
            },
            { name: "Max Results", text: "How many issues come back, 1 to 200. Users narrow the list by typing, rather than scrolling." },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Whose permissions run the query",
          text: "By default the query runs as the person using the field, so nobody sees an issue they could not already see. **Use App Permissions** switches it to the app's own access instead. That is useful when the picker must offer issues from a project the user cannot browse, but it means the dropdown can show issue keys and summaries they are not otherwise allowed to see. Turn it on deliberately, not by default.",
        },

        { type: "h", level: 2, text: "Single or multiple selection" },
        {
          type: "p",
          text: "**Allow to select multiple Issues** switches between **Single Select** and **Multi Select**. Multi-select fields show each selection as a removable chip on the issue.",
        },

        { type: "h", level: 2, text: "Creating real Jira links" },
        {
          type: "p",
          text: "A field value is data. An issue link is something Jira understands everywhere: in the issue view, in JQL, in reports. **Add an Issue Link towards the selected Issue** makes the app create a real link of the type you choose whenever a selection is made, including on the create screen.",
        },
        {
          type: "fields",
          items: [
            { name: "Link Type", text: "Any link type configured on your site, such as `relates to`, `blocks` or `duplicates`." },
            {
              name: "Delete all Issue Links of selected type when unselected",
              text: "Removes the links again when the field is cleared. **Leave this off if people also create links of that type by hand** — the cleanup does not know who created a link.",
            },
          ],
        },

        { type: "h", level: 2, text: "The selection dialog" },
        { type: "mock", id: "cft-issue-picker-modal" },
        {
          type: "table",
          head: ["Setting", "What it does", "Recommendation"],
          rows: [
            [
              "**Display Columns**",
              "Which columns the dialog shows: Key, Summary, Status, Assignee, Priority, Issue Type.",
              "Include whatever makes the choice obvious. A list of keys and summaries alone is often ambiguous.",
            ],
            [
              "**Quick Filters**",
              "Up to five one-click filters. Three presets ship — **Assigned to me**, **Unresolved**, **Open Sprints** — and you can add your own with a label and a JQL snippet.",
              "Add one for the case your users pick 80% of the time.",
            ],
            ["**Preload issues**", "Loads results as soon as the dialog opens.", "On, unless the query is very large."],
            ["**Show Issue Count during edit**", "Shows how many issues match, under the dropdown.", "On while you are tuning the query."],
          ],
        },

        { type: "h", level: 2, text: "How selections look on the issue" },
        {
          type: "list",
          items: [
            "**Show status of selected Issues** adds the status next to each selection, so a stale reference is obvious.",
            "**Show Issue Key of selected Issues** prefixes each selection with its key, for example `OPS-4412`.",
          ],
        },
      ],
    },

    {
      slug: "checklist",
      title: "Checklist",
      description: "Checklists on the issue with statuses, due dates and mandatory items, searchable in JQL and enforceable on a transition.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Holds one or more named checklists on a single field. Items carry a **status**, not just a tick, so “not started”, “in progress” and “skipped” stop being the same thing.",
        },
        { type: "mock", id: "cft-checklist-view" },

        { type: "h", level: 2, text: "Item capabilities: switch on only what you need" },
        {
          type: "table",
          head: ["Setting", "What it adds", "When to enable"],
          rows: [
            ["**Allow Descriptions**", "Collapsible description text on each item.", "When items need detail that does not fit in the title."],
            ["**Allow Due Dates**", "A date badge per item, coloured for overdue, due today and future.", "For checklists with real deadlines."],
            ["**Allow Mandatory Items**", "Users can flag items as mandatory. Mandatory items can be enforced on a transition.", "Whenever you plan to use the validator."],
            ["**Allow Assignees (@mentions)**", "Items can be assigned to a person.", "For checklists worked by several people."],
            ["**Max Items per Checklist**", "A ceiling. `0` means unlimited.", "Leave at 0 unless people abuse it."],
            [
              "**Lock Checklist**",
              "Users can only tick and untick. They cannot add, edit, reorder or delete items.",
              "For a compliance checklist that must be identical on every issue. Combine it with **Default Items**.",
            ],
          ],
        },

        { type: "h", level: 2, text: "Statuses" },
        {
          type: "p",
          text: "**Status Display Mode** decides how people set item state: **Checkbox only**, **Status dropdown**, or **Both**. Four statuses ship with the app — **Open**, **In Progress**, **Done** and **Skipped** — and you can add your own under **Custom Statuses**.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "The “Marks complete” flag is the important one",
          text: "Each custom status declares whether it counts as complete. A **Blocked** status that does *not* mark complete keeps the item in the incomplete count, so a validator keeps blocking the transition. A **Waived** status that *does* mark complete lets the work move on. That is how you model exceptions without pretending the work is finished.",
        },

        { type: "h", level: 2, text: "Default items" },
        {
          type: "p",
          text: "**Default Items** pre-fill the checklist the first time the field is used on an issue, and each one can be flagged mandatory. Combined with **Lock Checklist**, the field becomes a fixed procedure instead of a blank box.",
        },
        { type: "mock", id: "cft-checklist-config" },

        { type: "h", level: 2, text: "Editing on the issue" },
        {
          type: "list",
          items: [
            "**Add item** appends to the current checklist. **Add Checklist** starts a second named list on the same field.",
            "**Edit Checklist** opens the full editor in a dialog, for reordering and bulk changes.",
            "**Bulk Edit (Markdown)** takes the whole checklist as Markdown text. This is the fastest way to paste a procedure from a runbook or a Confluence page.",
          ],
        },

        { type: "h", level: 2, text: "Blocking a transition until the checklist is done" },
        {
          type: "p",
          text: "This takes **two** steps. The field defines what “complete” means; the workflow validator applies it when the issue moves.",
        },
        {
          type: "steps",
          items: [
            "In the field configuration, set **Validation Mode**: **None**, **At least N** (with a minimum number), **Mandatory only**, or **All items**.",
            "Go to **Jira → Settings → Issues → Workflows**, edit the workflow, open the transition, and add the **Checklist Completion Validator**.",
            "**Publish the workflow.** The transition now fails with a message naming the checklist and the items still open.",
          ],
        },
        { type: "mock", id: "cft-validator-config" },
        {
          type: "callout",
          variant: "warning",
          title: "Setting a Validation Mode on its own does nothing",
          text: "Without the validator on the transition, nothing is enforced. The field configuration screen says so too. This is the single most common support question about this field.",
        },

        { type: "h", level: 2, text: "Searching checklists in JQL" },
        {
          type: "p",
          text: "The app publishes checklist progress as searchable values, so you can report on checklist state like any other field.",
        },
        {
          type: "table",
          head: ["JQL name", "What it holds"],
          rows: [
            ["`Checklist-Total-Items`", "How many items exist."],
            ["`Checklist-Completed-Items`", "How many are in a status that marks complete."],
            ["`Checklist-Progress`", "Completion percentage, 0 to 100."],
            ["`Checklist-Has-Incomplete`", "`1` when at least one item is not complete."],
            ["`Checklist-Has-Mandatory-Incomplete`", "`1` when at least one mandatory item is not complete."],
            ["`Checklist-Item-Texts`", "The text of the items, for keyword search."],
          ],
        },
        {
          type: "code",
          label: "Example queries",
          text: `-- Work blocked on a mandatory checklist item
project = OPS AND "Checklist-Has-Mandatory-Incomplete" = 1

-- Nearly finished, for a stand-up
"Checklist-Progress" >= 80 AND "Checklist-Has-Incomplete" = 1

-- Every issue whose checklist mentions a rollback
"Checklist-Item-Texts" ~ "rollback"`,
        },
        {
          type: "callout",
          variant: "info",
          text: "Two practical notes: put the name in quotes, and remember the values are refreshed shortly after a checklist changes. A query run in the same second as an edit can still see the previous numbers.",
        },
      ],
    },

    {
      slug: "masked-input",
      title: "Masked Input",
      description: "A text field that formats as the user types and refuses values in the wrong format.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Asset tags, cost centres, serial numbers and phone numbers all have a shape. A plain text field accepts every variation of that shape, and the cleanup lands on whoever has to report on the data later. This field applies the format while the value is being typed.",
        },
        { type: "mock", id: "cft-masked-config" },

        { type: "h", level: 2, text: "Start from a preset" },
        {
          type: "p",
          text: "The **Template Library** ships **21 presets**: US phone (local, with country code, with extension), international phone, ZIP and ZIP+4, asset tag, project code, cost centre, serial number, hostname, SKU, purchase order, order reference, invoice number, contract number, IPv4 address, MAC address, UUID and others.",
        },
        {
          type: "p",
          text: "Clicking a preset fills in the mask, the regular expression and the algorithm check. Everything stays editable afterwards. **Start from a preset even if you need to change it** — it is faster than writing a mask from scratch.",
        },

        { type: "h", level: 2, text: "How the mask works" },
        {
          type: "p",
          text: "**Mask Pattern** describes the value position by position: `#` means a digit, `A` means a letter, and any other character is a literal that the app inserts for the user. `AT-####-AAA` accepts `AT-4192-XDR` and adds the dashes automatically.",
        },
        {
          type: "table",
          head: ["Setting", "What it does", "Notes"],
          rows: [
            ["**Allowed Characters**", "Restricts typing to **Digits**, **Letters**, **Alphanumeric** or **Hexadecimal**.", "Blocks the wrong keystroke before it becomes a wrong value."],
            [
              "**Letter Transform**",
              "**No transform**, **Uppercase** or **Lowercase**, applied while typing.",
              "This is why `at-4192-xdr` and `AT-4192-XDR` do not both end up in your reports.",
            ],
            [
              "**Validation Regex**",
              "An extra check against the raw value, with the mask literals removed.",
              "For rules a mask cannot express.",
            ],
            [
              "**Algorithm Check**",
              "**No algorithm check**, **US phone rules** or **IPv4 parser**.",
              "Structural validation beyond the pattern, so `999.999.999.999` is rejected as an IP address.",
            ],
          ],
        },

        { type: "h", level: 2, text: "What the user sees" },
        {
          type: "fields",
          items: [
            {
              name: "Helper Text",
              text: "Shown under the field. Say where the value comes from: “Asset tag printed on the device label” is useful; “Enter asset tag” is not.",
            },
            { name: "Invalid Value Message", text: "Shown when validation fails. Always include a correct example." },
            {
              name: "Block invalid values",
              text: "On: the value cannot be saved. Off: the user is warned but the value is accepted. **Start with it off** on an existing field, then turn it on once the legacy values are cleaned up.",
            },
            { name: "Preview", text: "Types a sample value through your current settings, inside the configuration screen. Use it before saving." },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Masking is formatting, not encryption",
          text: "This field keeps values in a consistent shape. The value is stored as an ordinary Jira custom field value and is visible to anyone who can see the issue. Do not use it for passwords or keys. To find credentials that are already in your issues, see [Secret Scanner](/documentation/secret-scanner/overview).",
        },
      ],
    },

    {
      slug: "select-list-options",
      title: "Select list options",
      description: "Let project admins maintain their own dropdown options, without Jira admin rights.",
      blocks: [
        {
          type: "p",
          text: "**The problem.** Adding one option to a select list is a Jira administrator task. That is why a request as small as “please add our new vendor to the dropdown” sits in a queue for a week.",
        },
        {
          type: "p",
          text: "**What this does.** Moves that one specific job to the people who own the process, and nothing else. The project admin cannot change the field, its contexts, its screens or its type.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Why a project-scoped context is required",
          text: "Options are edited per **field context**. Delegation is only offered for select fields that have a context limited to a single project, so a project admin can never change options that another project depends on. If your field has one site-wide context, create a project-scoped one first.",
        },

        { type: "h", level: 2, text: "Step 1 — a Jira admin enables the field" },
        { type: "mock", id: "cft-global-settings" },
        {
          type: "steps",
          items: [
            "Make sure the select list field has a **field context limited to one project**. Create one in **Settings → Issues → Custom fields → *field* → Contexts** if needed.",
            "Open **Jira → Apps → Custom Fields Toolkit → Select List Option Management**.",
            "Find the field and context in the table and switch **Enabled** on. Single-select and multi-select lists are both supported.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          text: "If the table is empty, no select list on your site has a project-scoped context yet. That is the prerequisite, not a bug.",
        },

        { type: "h", level: 2, text: "Step 2 — the project admin manages the options" },
        { type: "mock", id: "cft-project-settings" },
        {
          type: "list",
          items: [
            "The page is at **Project settings → Select List Options**, and lists only the fields enabled for that project.",
            "**Add Option** adds a value. **Edit** renames one. **Delete** removes it after a confirmation.",
            "An option can be **disabled** instead of deleted. Disabling keeps it on the issues that already use it, while removing it from the dropdown for new work.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Teach your project admins to disable, not delete",
          text: "Deleting an option that is in use makes historical issues harder to read and reports harder to trust. Disabling achieves the same thing for new work with none of the damage.",
        },
        {
          type: "table",
          head: ["Action", "Who can do it"],
          rows: [
            ["Enable a field for delegation", "Jira administrator"],
            ["Add, rename, disable or delete an option of an enabled field", "Anyone with **Administer projects** on that project"],
            ["Anything else about the field", "Jira administrator only"],
          ],
        },
      ],
    },

    {
      slug: "reference",
      title: "Permissions, data and limits",
      description: "What the app can access, where values are stored, and troubleshooting.",
      blocks: [
        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            ["`read:jira-work`", "Run the Issue Picker query, read field values, read field and project configuration."],
            [
              "`write:jira-work`",
              "Store field values, create and remove the issue links the picker manages, and publish checklist progress for JQL.",
            ],
            ["`read:jira-user`", "Resolve names and avatars for checklist assignees and picker columns."],
            ["`manage:jira-configuration`", "Read and edit field contexts and select list options — the delegation feature."],
            ["`storage:app`", "Store the app's own configuration."],
          ],
        },
        {
          type: "p",
          text: "The app declares **no external network access at all**. There is nothing outside Atlassian for it to call.",
        },

        { type: "h", level: 2, text: "What is stored where" },
        {
          type: "table",
          head: ["Data", "Stored by", "What that means"],
          rows: [
            [
              "Field values: selected issues, checklist items, masked text",
              "**Jira**",
              "They follow the issue's permissions, exports, backups and deletion, like any other custom field.",
            ],
            ["Checklist progress values used by JQL", "**Jira**", "Stored as an issue property so Jira can search them."],
            [
              "Field configuration and delegation settings",
              "**The app**",
              "Deleted when the app is uninstalled.",
            ],
          ],
        },
        {
          type: "p",
          text: "The [privacy policy](/privacy/custom-fields-toolkit) is the authoritative version.",
        },

        { type: "h", level: 2, text: "Uninstalling" },
        {
          type: "p",
          text: "Uninstalling deletes the app's configuration. Field values stay in Jira, because Jira owns them, but the app's field types stop rendering. If you are removing the app from a production site, export the values you need first.",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "The field does not appear on the issue",
              text: "It is not on the screen. Add it in **Settings → Issues → Screens**, or through the field's own configuration.",
            },
            {
              name: "The Issue Picker dropdown is empty",
              text: "Run **Test JQL**. Usual causes: the query returns nothing, it is scoped to the wrong project, or **Limit field options to current project** is on and you are looking at an issue in a different project.",
            },
            {
              name: "A user sees fewer issues than I do",
              text: "Expected. The query runs with their permissions unless **Use App Permissions** is enabled.",
            },
            {
              name: "The transition is not blocked",
              text: "The **Checklist Completion Validator** is not on that transition, or the workflow was not published after you added it.",
            },
            {
              name: "Checklist JQL returns nothing",
              text: "Put the name in quotes: `\"Checklist-Progress\" >= 80`. Also, the values only exist for issues whose checklist has been saved at least once since the app was installed.",
            },
            {
              name: "The field behaves differently in two projects",
              text: "Two contexts, two configurations. Check which context covers each project and issue type.",
            },
          ],
        },
        {
          type: "p",
          text: "Still stuck? [Open a ticket](https://synapseoasis.atlassian.net/servicedesk/customer/portals) with the field name, the project key and what you expected to happen.",
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
              name: "Where are the field values stored?",
              text: "In Jira, as ordinary custom field values on the issue. The app stores only its configuration.",
            },
            {
              name: "Does anything leave Atlassian?",
              text: "No. This app declares no external network access at all.",
            },
            {
              name: "Does it use AI?",
              text: "No.",
            },
            {
              name: "Is the Masked Input field encrypted?",
              text: "No. It formats and validates input. The value is a normal Jira field value, visible to anyone who can see the issue. Do not store secrets in it.",
            },
            {
              name: "What happens to my data if I uninstall?",
              text: "Field values stay in Jira, because Jira owns them. The app's configuration is cleared and detached immediately, and its field types stop rendering — so export anything you need to keep readable first. See [Where your data goes](/documentation/start-here/your-data).",
            },
          ],
        },

        { type: "h", level: 2, text: "How the fields behave" },
        {
          type: "fields",
          items: [
            {
              name: "Can I search these fields in JQL?",
              text: "Checklist progress, yes, through the `Checklist-*` values described on the [Checklist page](/documentation/custom-fields-toolkit/checklist). Issue Picker and Masked Input behave like the Jira field types they are built on.",
            },
            {
              name: "Do the fields work on the create screen?",
              text: "Yes, if you add them to the create screen. The Issue Picker even creates its issue links for values set at creation time.",
            },
            {
              name: "Do they appear in exports and reports?",
              text: "They are Jira field values, so they appear where Jira field values appear. Complex values such as checklists export as their stored text, not as a formatted list.",
            },
            {
              name: "Can several checklists live on one issue?",
              text: "Yes. One Checklist field can hold several named checklists, and you can also create more than one Checklist field.",
            },
            {
              name: "Does it work with team-managed projects?",
              text: "The field types are created and configured centrally, which is a company-managed concept. Use company-managed projects for the full feature set.",
            },
          ],
        },

        { type: "h", level: 2, text: "Delegating select list options" },
        {
          type: "fields",
          items: [
            {
              name: "Can a project admin break another project's field?",
              text: "No. Delegation is only offered for contexts limited to a single project, so the options they edit apply to their project only.",
            },
            {
              name: "Why is my select field not in the list?",
              text: "It has no project-scoped context. Create one, then it appears.",
            },
            {
              name: "Can I see who changed an option?",
              text: "Option changes are configuration changes made through Jira, so they follow Jira's own audit log rather than an app-specific log.",
            },
          ],
        },
      ],
    },
  ],
};
