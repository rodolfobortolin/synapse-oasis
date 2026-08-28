import type { AppDocs } from "../types";

export const customFieldsToolkit: AppDocs = {
  slug: "custom-fields-toolkit",
  name: "Custom Fields Toolkit for Jira",
  shortName: "Custom Fields Toolkit",
  tagline:
    "Three field types Jira does not ship: a picker whose options come from a JQL query, a checklist with statuses and a transition validator, and a text field that formats and validates as you type. Plus select list options that project admins can manage themselves. Holds no personal data at all.",
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
              "A text field that formats while the user types and refuses values that do not match the format. 19 ready-made presets.",
            ],
            [
              "**Checklist Completion Validator**",
              "A workflow validator that blocks a transition while checklist items are still open. Covered on the Checklist page.",
            ],
            [
              "**[Select list options](/documentation/custom-fields-toolkit/select-list-options)**",
              "Lets a project administrator add, edit, reorder and retire the options of their own select field, without giving them Jira administration rights.",
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

        { type: "h", level: 2, text: "Where the fields appear" },
        {
          type: "p",
          text: "All three field types are declared for the **issue view**, the **create screen**, **transition screens**, and the **Jira Service Management customer portal** — both for a customer filling in a request and for reading one back. A checklist on a portal request form works the same way it does on an issue.",
        },
        {
          type: "callout",
          variant: "info",
          title: "One place they fall back to Jira's plain editor",
          text: "On surfaces Jira renders itself — boards, the issue navigator, bulk edit — an app field can get Jira's default editor for its underlying data type rather than the app's. The Checklist field guards that case with a rule that every line must be a checklist item, a description line or the meta line, so free-typed text is refused rather than saved and silently dropped. Masked Input can only guard a length there, because the mask lives in per-context configuration and no static rule can see it. **Edit these fields on the issue view** and the real editors apply.",
        },

        { type: "h", level: 2, text: "Where the data lives" },
        {
          type: "p",
          text: "Field values — selected issues, checklist items, masked text — are stored by **Jira** as ordinary custom field values on the issue. So is every field's configuration: the JQL query, the checklist settings, the mask pattern all live in Jira's own field-context configuration, which is why they travel with a field export and follow the field's own permissions.",
        },
        {
          type: "p",
          text: "The app's own storage holds **one value**: the list of which field contexts are delegated to project administrators. That is the whole of it. See the [privacy policy](/privacy/custom-fields-toolkit).",
        },

        { type: "h", level: 2, text: "What happens without an app licence" },
        {
          type: "p",
          text: "**Your fields keep working.** The three field types render, edit and save exactly as before, on every issue and every portal request. That is deliberate: a licence lapse should cost the customer new configuration, not the contents of their issues, and blanking a field out would break a transition somebody is halfway through.",
        },
        {
          type: "table",
          head: ["Still works", "Stops until the licence is active"],
          rows: [
            [
              "Viewing and editing all three field types on issues, create screens, transition screens and the portal.",
              "**Adding, editing, reordering and deleting select list options** — the four writes behind the delegation feature.",
            ],
            [
              "Reading fields, contexts and the options already configured; changing which contexts are delegated.",
              "**Creating issue links for a picker value set on the create screen.** Links made by editing an existing issue still work — it is the background trigger that is gated.",
            ],
            [
              "Values already stored on your issues, untouched.",
              "**Refreshing the `Checklist-*` values that JQL searches.** Existing values stay; they stop being updated when a checklist changes.",
            ],
          ],
        },
        {
          type: "p",
          text: "Both admin screens show a warning — *“No active licence”* — saying which of the above applies, and the option buttons carry a **Needs an active licence** note. A site administrator can start a trial or renew from the Atlassian Marketplace.",
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
          type: "callout",
          variant: "info",
          title: "Links for a value set at creation arrive a moment later",
          text: "On an existing issue the link is made as you save. On the **create** screen there is no issue to link to yet, so a background trigger picks it up once the issue exists — normally within a second or two. That trigger is the one part of this feature that needs an active app licence.",
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
          type: "diagram",
          label: "flowchart",
          caption: "Two switches in two different places, and the transition only blocks when both are set. The left-hand branch is what almost every support question about this field turns out to be.",
          text: `flowchart TD
    T[User attempts the transition] --> V{validator on<br/>this transition?}
    V -->|no| OK[Transition allowed.<br/>Nothing is enforced.]
    V -->|yes| M{Validation Mode<br/>on the field context}
    M -->|None| OK
    M -->|At least N / Mandatory only / All items| C{items satisfied?}
    C -->|yes| OK
    C -->|no| NO[Blocked, naming the<br/>checklist and the open items]

    classDef good fill:#DFFCF0,stroke:#216E4E
    classDef bad fill:#FFECEB,stroke:#AE2A19
    class OK good
    class NO bad`,
        },
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
          text: "The **Template Library** ships **19 presets**, and this is all of them: US phone (local and with country code), phone extension, international phone, ZIP and ZIP+4, asset tag, project code, cost centre, serial number, hostname, SKU or part number, purchase order, order reference, invoice number, contract number, IPv4 address, MAC address and UUID.",
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
        {
          type: "callout",
          variant: "warning",
          title: "The mask applies where the app draws the editor",
          text: "That is the issue view, the create screen, transition screens and the portal — which is everywhere a person normally types into the field. It is **not** enforced on surfaces Jira renders with its own text editor, such as bulk edit or the issue navigator, nor on a write through the public REST API. The only rule that reaches those is a 255-character cap. If clean data matters more than convenience, say so in the **Helper Text** and check the field periodically rather than assuming the mask is a constraint on the database.",
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
            "Make sure the field has a **field context limited to one project**. Create one in **Settings → Issues → Custom fields → *field* → Contexts** if needed.",
            "Open **Jira → Apps → Custom Fields Toolkit → Select List Option Management**.",
            "Find the field and context in the table and switch **Delegate** on.",
          ],
        },
        {
          type: "p",
          text: "**Four field types can be delegated**, not only the two the name suggests: **Select List (single)**, **Select List (multiple)**, **Checkboxes** and **Radio Buttons**. They all hold a list of options and they are all edited the same way.",
        },
        {
          type: "p",
          text: "The table is searchable and paginated, and **Only fields with a delegable context** filters it down by probing each field's contexts — it reports progress as it goes, because on a site with thousands of custom fields that check takes a moment. Each row links straight out to the field's and the context's own Jira configuration screens.",
        },
        {
          type: "callout",
          variant: "warning",
          text: "If the table is empty, no field on your site has a project-scoped context yet. That is the prerequisite, not a bug. And if your site has more custom fields than can be read in one request, the screen says so above the list and asks you to narrow it with the search box — it does not present a partial list as the whole.",
        },

        { type: "h", level: 2, text: "Step 2 — the project admin manages the options" },
        { type: "mock", id: "cft-project-settings" },
        {
          type: "list",
          items: [
            "The page is at **Project settings → Select List Options**, and lists only the fields delegated for that project. If none are, it says a Jira administrator has to enable one first.",
            "**Add Option** adds a value. Click a value to rename it. **Delete** removes it after a confirmation that says the action cannot be undone.",
            "An option can be switched from **Enabled** to **Disabled** instead of deleted. Disabling keeps it on the issues that already use it, while removing it from the dropdown for new work.",
            "**Move up** and **Move down** reorder the list, which is the order users see in the dropdown. Long lists are paginated.",
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
            ["Add, rename, reorder, disable or delete an option of a delegated field", "Anyone with **Administer projects** on that project"],
            ["Anything else about the field — its contexts, screens, type or name", "Jira administrator only"],
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
          text: "The app declares **no external network access at all**. There is nothing outside Atlassian for it to call. It also does not declare `report:personal-data`, and that is not an omission — see below.",
        },

        { type: "h", level: 2, text: "What is stored where" },
        {
          type: "p",
          text: "Almost everything belongs to Jira. The app's own storage holds a single value.",
        },
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
              "Field configuration: the JQL query, checklist settings, mask patterns, custom statuses, default items",
              "**Jira**",
              "Held in the field's own context configuration, per context. It travels with the field, not with the app.",
            ],
            [
              "Which field contexts are delegated to project admins",
              "**The app**",
              "One key-value record, and the only thing the app stores. Deleted when the app is uninstalled.",
            ],
          ],
        },

        { type: "h", level: 2, text: "Personal data: there is none" },
        {
          type: "p",
          text: "This app stores **no Atlassian account ID anywhere**, no display name, no email address and no user-generated content. The one record it keeps is a map of custom field ids to context ids — configuration identifiers, with no person attached.",
        },
        {
          type: "p",
          text: "That is why it declares no `report:personal-data` scope and runs no Personal Data Reporting cycle: an app that holds no account identifier has nothing to report and nothing to erase on a closed-account request. A checklist assignee or a picker column showing somebody's avatar is read from Jira when the field renders and thrown away; it is never written to the app's storage.",
        },
        {
          type: "callout",
          variant: "info",
          text: "The consequence for your privacy review: a subject access request against this app has no records to return, and a deletion request has nothing to delete. What holds a person's data is the **issue**, and that is Jira's to answer for. The [privacy policy](/privacy/custom-fields-toolkit) is the authoritative version.",
        },

        { type: "h", level: 2, text: "Uninstalling" },
        {
          type: "p",
          text: "Uninstalling runs a handler that empties the app's storage — in practice, that one delegation record. It sweeps repeatedly until a pass finds nothing left, because deleting under a cursor leaves keys behind and “no more pages” is not the same statement as “the store is empty”. Independently, Atlassian detaches the installation's data and destroys it under its own retention policy; see [Where your data goes](/documentation/start-here/your-data).",
        },
        {
          type: "callout",
          variant: "info",
          title: "This only became true recently",
          text: "The handler existed for months wired to `avi:forge:uninstalled:app`, an event Forge does not publish, so it had never run once. It is a `preUninstall` module now, and it actually deletes.",
        },
        {
          type: "p",
          text: "Field values stay in Jira, because Jira owns them, but the app's field types stop rendering — so if you are removing the app from a production site, export the values you need to keep readable first.",
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
              text: "Put the name in quotes: `\"Checklist-Progress\" >= 80`. Also, the values only exist for issues whose checklist has been saved at least once since the app was installed — and they stop being refreshed while the app has no active licence.",
            },
            {
              name: "The mask let a bad value through",
              text: "Check where it was typed. The mask is enforced where the app draws the editor — the issue view, create, transition screens and the portal. A bulk edit, the issue navigator or a REST write gets Jira's plain editor, which only enforces a length cap.",
            },
            {
              name: "An option button says it needs a licence",
              text: "The four option writes — add, edit, reorder, delete — are the only things in this app gated on the licence. Your fields and their values are unaffected.",
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
              name: "Does the app store any personal data?",
              text: "No. It holds no Atlassian account ID, no name, no email address and no issue content. Its entire storage is one record listing which field contexts are delegated to project administrators — which is why it requests no personal-data reporting scope and has nothing to erase when an account is closed.",
            },
            {
              name: "Is the Masked Input field encrypted?",
              text: "No. It formats and validates input. The value is a normal Jira field value, visible to anyone who can see the issue. Do not store secrets in it.",
            },
            {
              name: "What happens to my data if I uninstall?",
              text: "Field values stay in Jira, because Jira owns them, and so does every field's configuration. The app runs an uninstall handler that empties its own storage — the one delegation record — before Atlassian detaches the installation's data and destroys it under its own retention policy. The field types stop rendering, so export anything you need to keep readable first. See [Where your data goes](/documentation/start-here/your-data).",
            },
            {
              name: "What stops working if our licence lapses?",
              text: "Four things, all of them administrative: adding, editing, reordering and deleting select list options. Plus two background jobs — issue links for a picker value set on the **create** screen, and the refresh of the `Checklist-*` values JQL searches. The fields themselves keep rendering and saving everywhere, and nothing already on an issue is touched.",
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
              text: "Yes, if you add them to the create screen — and on transition screens, and in the **Jira Service Management customer portal**, both for filling a request in and for reading it back. The Issue Picker even creates its issue links for values set at creation time, a moment after the issue exists.",
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
              text: "The field types are created and configured centrally, through field contexts, which is a company-managed concept — so use company-managed projects for the full feature set. The **Checklist Completion Validator** is the exception: it is declared for team-managed projects as well as company-managed ones.",
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
              text: "Most likely it has no project-scoped context — create one and it appears. Two other possibilities: the site has more custom fields than could be read in one request, in which case the screen says so and the search box will find it; or the field is not one of the four supported types (Select List single or multiple, Checkboxes, Radio Buttons).",
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
