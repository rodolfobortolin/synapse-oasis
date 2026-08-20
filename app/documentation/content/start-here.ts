import type { AppDocs } from "../types";

/**
 * Not an app: the shared introduction. It exists so every app page can assume the
 * reader knows what a field context, a scheme or a service desk is, instead of
 * re-explaining Jira vocabulary on 47 pages.
 */
export const startHere: AppDocs = {
  slug: "start-here",
  name: "Start here",
  shortName: "Start here",
  tagline:
    "Read this first if you are new to administering Jira. It explains how these guides are organised, the Jira words used throughout, how to install any of our apps, and what happens to your data.",
  products: "All apps",
  color: "#2B2ED8",
  icon: "/logo-64.png",
  ai: false,
  pages: [
    {
      slug: "how-to-read-these-docs",
      title: "How to read these guides",
      description: "How the pages are organised and what to expect on each one.",
      blocks: [
        {
          type: "p",
          text: "Every app has its own set of pages. They always follow the same order, so you can jump straight to what you need.",
        },
        {
          type: "fields",
          items: [
            {
              name: "Overview and setup",
              text: "What the app does, who is allowed to configure it, and the steps to get it working. **Start here for any app.**",
            },
            {
              name: "One page per feature",
              text: "Each major feature gets its own page. Each page tells you where the screen is, what every setting does, and what we recommend setting it to.",
            },
            {
              name: "Permissions, data and limits",
              text: "The technical reference: what the app can access, what it stores, and a troubleshooting list. Useful when something does not work, and when your security team asks questions.",
            },
            {
              name: "FAQ",
              text: "Short answers to the questions people ask before installing, and the ones a security review always asks.",
            },
          ],
        },

        { type: "h", level: 2, text: "The screenshots are drawings, not photos" },
        {
          type: "p",
          text: "The app screens in these guides are recreations, built in HTML. Each one is marked **Illustration** in its top-right corner, and the grey bar at the top tells you the exact menu path to reach that screen in Jira or Confluence.",
        },
        {
          type: "p",
          text: "We do it this way because real screenshots go out of date silently. A drawing that uses the app's real labels stays useful for longer. If a label in the app does not match a label here, trust the app and tell us.",
        },

        { type: "h", level: 2, text: "How instructions are written" },
        {
          type: "fields",
          items: [
            { name: "**Bold text**", text: "The exact name of a button, a menu item or a setting. If it is bold, look for those words on your screen." },
            { name: "Arrows, like **Jira → Settings → Issues**", text: "A path. Click each item in order." },
            { name: "`Code style`", text: "Something you type or paste, such as a JQL query, a scope name or a field ID." },
            { name: "Numbered steps", text: "Do them in order. Skipping one is the most common reason something does not work." },
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Three kinds of coloured box",
          text: "**Note** adds context you can safely read later. **Tip** is our recommendation, based on what usually goes wrong. **Important** is a warning: read it before you click, because the action is hard to undo.",
        },

        { type: "h", level: 2, text: "If you get stuck" },
        {
          type: "p",
          text: "Every app page ends with a link to our support portal. When you write to us, include three things: the app name, your Jira site address, and what you expected to happen. That is usually enough for us to reproduce the problem without a back-and-forth.",
        },
        {
          type: "p",
          text: "Next: [the Jira words used in these guides](/documentation/start-here/jira-words).",
        },
      ],
    },

    {
      slug: "jira-words",
      title: "Jira words used in these guides",
      description:
        "Plain-language definitions of the Atlassian terms that appear throughout, including who is allowed to do what.",
      blocks: [
        {
          type: "p",
          text: "You do not need to memorise this page. Come back to it when a word in another page is unfamiliar.",
        },

        { type: "h", level: 2, text: "The basics" },
        {
          type: "fields",
          items: [
            { name: "Issue", text: "One record in Jira: a task, a bug, a support ticket. Everything in Jira hangs off issues." },
            { name: "Issue key", text: "The short identifier of an issue, like `OPS-4412`. `OPS` is the project, `4412` is the number." },
            { name: "Project", text: "A container for issues, with its own key, its own people and its own configuration." },
            {
              name: "Company-managed vs team-managed project",
              text: "Two kinds of Jira project. **Company-managed** projects share configuration (fields, workflows, schemes) across the site and are administered centrally. **Team-managed** projects keep their configuration to themselves and are simpler. Some app features only work in company-managed projects, because only those expose the configuration the feature needs. Your project's type is shown in Jira's project list.",
            },
            { name: "Field", text: "One piece of information on an issue: summary, assignee, priority. Jira ships many; you can create your own." },
            {
              name: "Custom field",
              text: "A field you or an administrator created. Our Custom Fields Toolkit adds new *types* of custom field that Jira does not offer.",
            },
            {
              name: "Field ID",
              text: "The internal name of a custom field, like `customfield_10016`. Jira uses it in queries and rules. You can see it in the URL when you edit the field.",
            },
          ],
        },

        { type: "h", level: 2, text: "Configuration words" },
        {
          type: "fields",
          items: [
            {
              name: "Field context",
              text: "The settings of one field for a specific set of projects and issue types. One field can have several contexts, which is why the same field can behave differently in two projects. When a guide says “configuration is per context”, it means: check which context covers the project you are looking at.",
            },
            {
              name: "Screen",
              text: "The list of fields shown when you create, edit or view an issue. A field only appears if it is on the screen.",
            },
            {
              name: "Scheme",
              text: "A reusable bundle of configuration that projects share. There are workflow schemes, permission schemes, notification schemes, screen schemes, field configuration schemes and issue type schemes. Sharing one scheme across ten projects is good. Having 200 schemes that nobody can account for is what our cleanup tools are for.",
            },
            {
              name: "Workflow",
              text: "The set of statuses an issue moves through, and the allowed moves between them.",
            },
            {
              name: "Transition",
              text: "One move between two statuses, such as *In Progress → Done*. The button a user clicks is a transition.",
            },
            {
              name: "Condition, validator, post function",
              text: "Three things you can attach to a transition. A **condition** decides whether the button is shown at all. A **validator** checks the issue when the user clicks and can refuse with a message. A **post function** runs after the move succeeds. Our Workflow Toolkit adds one of each.",
            },
            {
              name: "JQL",
              text: "Jira Query Language: the search syntax, like `project = OPS AND status != Done`. If you can build a filter in Jira's issue search, you can write JQL, because Jira shows you the query it built.",
            },
          ],
        },

        { type: "h", level: 2, text: "Service desk words" },
        {
          type: "fields",
          items: [
            {
              name: "Jira Service Management (JSM)",
              text: "The Atlassian product for support and service teams. It adds a customer-facing side to Jira.",
            },
            { name: "Service desk", text: "One JSM project seen from the service side: its queues, its agents, its customers." },
            {
              name: "Portal",
              text: "The simplified website your customers use to raise and follow requests. They never see Jira itself.",
            },
            {
              name: "Request type",
              text: "One option in the portal, such as “Report a hardware problem”. It maps to an issue type and decides which fields the customer fills in.",
            },
            { name: "Agent", text: "A licensed JSM user who works on requests. Customers are not agents and do not consume an agent licence." },
          ],
        },

        { type: "h", level: 2, text: "Who is allowed to do what" },
        {
          type: "p",
          text: "This is the single biggest source of “the app is not working”. Four different roles get called “admin”, and they are not the same thing.",
        },
        {
          type: "table",
          head: ["Role", "Where it comes from", "What it can do"],
          rows: [
            [
              "**Project administrator**",
              "The *Administer projects* permission in one project",
              "Change that project's own settings. Cannot create fields or edit schemes.",
            ],
            [
              "**Jira administrator**",
              "The *Administer Jira* global permission",
              "Create fields, edit workflows and schemes, open our apps' admin pages. This is the role most of these guides assume.",
            ],
            [
              "**Site administrator**",
              "Admin of the Atlassian site",
              "Everything a Jira admin can do, plus manage users and **group membership**. Some operations, such as adding somebody to a group, are refused for anyone else.",
            ],
            [
              "**Organization administrator**",
              "admin.atlassian.com",
              "Manages the whole organisation: all sites, all users, billing, API keys, and suspending accounts. Needed by License Waste Manager and by AI Triage's team routing.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Check this before you blame the app",
          text: "If an app reports that a change was refused, read the message: it usually names the permission you are missing. Group changes and account suspension in particular are blocked by Atlassian for anyone below site or organisation admin, and no app can work around that.",
        },

        { type: "h", level: 2, text: "Words about our apps" },
        {
          type: "fields",
          items: [
            {
              name: "Atlassian Forge",
              text: "Atlassian's platform for building apps that run **inside** Atlassian's own cloud. All our apps are Forge apps. There is no server of ours in the picture, which is why installation never asks you to open a firewall or hand over credentials.",
            },
            {
              name: "Scope",
              text: "A permission the app declares, like `read:jira-work`. Atlassian shows you the list when you install, and the app can do nothing outside it. Each app's reference page explains why every scope is needed.",
            },
            {
              name: "App storage",
              text: "Where a Forge app keeps its own data, inside your Atlassian site. When you uninstall the app, this is deleted.",
            },
            {
              name: "Forge LLM",
              text: "Atlassian's built-in AI service, using models Atlassian hosts. Our AI features use it. You do not buy an API key, and your data does not go to an outside AI provider.",
            },
            {
              name: "Web trigger",
              text: "A private URL that lets your own tools talk to an app. Only AI Portal Chat uses one, and only if you generate a token for it.",
            },
          ],
        },
        {
          type: "p",
          text: "Next: [installing one of our apps](/documentation/start-here/install-an-app).",
        },
      ],
    },

    {
      slug: "install-an-app",
      title: "Installing an app",
      description: "The same five steps for every SynapseOasis app, and where its screens show up afterwards.",
      blocks: [
        {
          type: "p",
          text: "Installation is the same for all our apps, takes about a minute, and does not require any preparation on your side. Nothing is switched on until you configure it.",
        },
        {
          type: "callout",
          variant: "info",
          title: "You need to be a Jira administrator",
          text: "Only a Jira or site administrator can install apps. If you cannot see **Apps** in the top navigation, ask whoever administers your site.",
        },

        { type: "h", level: 2, text: "Install" },
        {
          type: "steps",
          items: [
            "In Jira, open **Apps → Explore more apps**. This opens the Atlassian Marketplace inside your site.",
            "Search for the app by name, for example `Secret Scanner for Jira`.",
            "Click **Get it now**, or **Try it free** to start a trial. Atlassian handles the trial and the billing; we never see a payment method.",
            "Review the permissions Atlassian lists and confirm. Those are the scopes explained on each app's reference page.",
            "Wait for the confirmation. The app is now installed on your site.",
          ],
        },

        { type: "h", level: 2, text: "Where to find the app afterwards" },
        {
          type: "p",
          text: "Our apps put their screens in one of these places. Each app's overview page names the exact one.",
        },
        {
          type: "fields",
          items: [
            {
              name: "Jira → Apps → *app name*",
              text: "The global admin page. This is where Secret Scanner, License Waste Manager, Admin Toolkit, AI Triage and AI Portal Chat are configured.",
            },
            {
              name: "Project settings → *section*",
              text: "Configuration that belongs to one project, such as **Select List Options** or the per-desk AI Triage settings.",
            },
            {
              name: "Settings → Issues → Custom fields",
              text: "Where you create and configure the fields that Custom Fields Toolkit adds.",
            },
            {
              name: "Settings → Issues → Workflows",
              text: "Where you add Workflow Toolkit's condition, validator and post function to a transition.",
            },
            { name: "On the issue itself", text: "Panels and fields the apps add to the issue view, such as the AI Triage panel." },
            {
              name: "In Confluence",
              text: "Markdown Toolkit adds an item to a space's sidebar, an entry in a page's **•••** menu, and a macro you insert with `/Markdown`.",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Nothing happens automatically after installing",
          text: "Every app ships switched off or unconfigured on purpose. Secret Scanner scans nothing until you enable it. AI Triage routes nothing until you pick a service desk. That is deliberate: an app that started changing your issues the moment it was installed would be a bad app.",
        },

        { type: "h", level: 2, text: "Try it somewhere safe first" },
        {
          type: "p",
          text: "Several of our tools change configuration or user access. If you have a test site, use it. If you do not, pick one small project and scope the app to it. Every guide tells you how to limit the scope.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Free test sites exist",
          text: "You can create a free Atlassian Cloud site and install the app there on a trial. For anything involving deleting schemes, merging fields or suspending accounts, that hour of setup is cheaper than the alternative.",
        },

        { type: "h", level: 2, text: "Uninstalling" },
        {
          type: "p",
          text: "Uninstall from **Apps → Manage your apps**. Two different things then happen to two different kinds of data:",
        },
        {
          type: "list",
          items: [
            "**What the app stored** — configuration, results, its own records — is cleared by the app and detached by Atlassian immediately, then destroyed by Atlassian after its retention period. See [Where your data goes](/documentation/start-here/your-data) for the exact behaviour.",
            "**What the app wrote into Jira or Confluence** — issues it created, field values, comments, pages — stays where it is, because Atlassian owns that data and it is now ordinary Jira or Confluence content.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Reinstalling does not bring your settings back",
          text: "A reinstall is treated as a brand new installation, so you configure the app again. If you uninstalled by accident, tell us within **21 days**: Atlassian can re-link the previous data to the new installation, and we have to raise that request with your consent.",
        },
      ],
    },

    {
      slug: "your-data",
      title: "Where your data goes",
      description:
        "The short version for your security team: nothing leaves Atlassian, and here is how you can verify that yourself.",
      blocks: [
        {
          type: "p",
          text: "This is the question every security review asks, so here is the direct answer: **your data stays inside your own Atlassian site.** We do not run servers, we do not have a database, and we cannot read your data.",
        },

        { type: "h", level: 2, text: "Why that is true, not just a promise" },
        {
          type: "p",
          text: "All our apps are built on **Atlassian Forge**. Forge apps run on Atlassian's infrastructure, store their data in your Atlassian site, and must declare every outside address they are allowed to contact. Atlassian enforces that list. An app cannot quietly send data somewhere it did not declare.",
        },
        {
          type: "p",
          text: "For our apps, the declared list is either empty or contains only Atlassian's own domains. You can check this yourself: the Marketplace listing shows the permissions, and each app's **Permissions, data and limits** page in these guides lists them with an explanation.",
        },

        { type: "h", level: 2, text: "What about the AI features?" },
        {
          type: "p",
          text: "Four apps use AI: AI Portal Chat, AI Triage, Workflow Toolkit and parts of the others' analysis. They all use **Forge LLM**, which is Atlassian's own AI service with models Atlassian hosts.",
        },
        {
          type: "list",
          items: [
            "You do not need to buy an API key from anybody.",
            "We do not hold API keys to outside AI providers, so we could not send your data to one.",
            "We do not use your data to train anything.",
            "Each app's privacy policy lists exactly what text is included in a prompt.",
          ],
        },

        { type: "h", level: 2, text: "What each app stores" },
        {
          type: "p",
          text: "Storing something is different from reading it. Most of what our apps read is used and thrown away; only configuration and results are kept. The details differ per app, so each one has its own privacy policy:",
        },
        {
          type: "list",
          items: [
            "[AI Portal Chat](/privacy/ai-portal-chat) — keeps conversations, so anything a customer types in the chat is stored.",
            "[AI Triage](/privacy/ai-triage) — keeps its decisions, and the Atlassian API token if you use team routing.",
            "[Secret Scanner](/privacy/secret-scanner) — never stores the secret it finds, only a masked preview and a one-way hash.",
            "[Workflow Toolkit](/privacy/workflow-toolkit) — keeps rules and their outcomes, not copies of issues.",
            "[Admin Toolkit](/privacy/admin-toolkit) — keeps the results of the reports you run.",
            "[Custom Fields Toolkit](/privacy/custom-fields-toolkit) — keeps only configuration; field values belong to Jira.",
            "[License Waste Manager](/privacy/license-waste-manager) — keeps user data including email addresses, because that is what a licence review needs, plus your organisation API key.",
            "[Markdown Toolkit](/privacy/markdown-toolkit) — keeps macro content and in-flight export jobs.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Two apps hold a credential you provide",
          text: "License Waste Manager needs an **organisation API key** to see licence data, and AI Triage needs an **Atlassian API token** if you want team-based routing. Both are stored inside your own site and masked in the interface, but they are still credentials: create them for this purpose, and rotate them on your normal schedule.",
        },

        { type: "h", level: 2, text: "Deleting the data" },
        {
          type: "p",
          text: "**Atlassian controls this, not us.** It is worth understanding, because “uninstall and it is gone” is not quite what happens.",
        },
        {
          type: "table",
          head: ["When", "What happens"],
          rows: [
            [
              "While the app is installed",
              "You delete data through the app's own screens. That deletion is immediate.",
            ],
            [
              "The moment you uninstall",
              "The app runs an uninstall handler that clears its storage. Independently, Atlassian detaches the installation's data: it becomes inaccessible to the app, to your users and to us straight away.",
            ],
            [
              "After uninstalling",
              "Atlassian keeps the detached data for a limited period before destroying it, under Atlassian's own retention policy. Atlassian's Forge documentation describes it as *soft deleted* and retained for **28 days**.",
            ],
            [
              "Within 21 days of uninstalling",
              "If you reinstall and want your previous configuration back, a **re-link request** can restore it. Only Atlassian can perform it, only we can raise it, and only if you ask us to.",
            ],
          ],
        },
        {
          type: "p",
          text: "Atlassian's own reference is [Data lifecycle for Forge-hosted storage](https://developer.atlassian.com/platform/forge/storage-reference/hosted-storage-data-lifecycle/). Atlassian's backups follow Atlassian's schedule and are outside any app's control.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "If you need something gone on a specific date",
          text: "Delete it inside the app **before** you uninstall. Once the app is uninstalled, nobody can reach into that storage on your behalf — not you, not us — and the clock is Atlassian's.",
        },
        {
          type: "p",
          text: "There is nothing to email us for. We cannot delete this data faster than Atlassian's process, and we have no access to it. If you want the deletion behaviour in writing for an audit, this page and the [privacy policies](/privacy) are it, and Atlassian's documentation is the primary source.",
        },
      ],
    },
  ],
};
