import type { AppDocs } from "../types";

export const markdownToolkit: AppDocs = {
  slug: "markdown-toolkit",
  name: "Markdown Toolkit for Confluence",
  shortName: "Markdown Toolkit",
  tagline:
    "Export Confluence pages, page trees or whole spaces to Markdown files. Import Markdown files and zip archives back into Confluence. Write Markdown directly on a page with code highlighting, Mermaid diagrams and maths.",
  products: "Confluence",
  color: "#2B9F6F",
  icon: "/markdown-toolkit.png",
  ai: false,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "What the app adds to Confluence, where each part is, and what conversion actually means.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** A two-way door between Confluence and Markdown, plus a macro for writing Markdown on a page.",
        },
        {
          type: "p",
          text: "**Why you would want it.** Documentation that also needs to live in a repository. Content you want to feed to a static site generator or an AI pipeline. A folder of Markdown from a developer team that should become real Confluence pages. Diagrams that must be editable as text rather than uploaded as images.",
        },
        {
          type: "p",
          text: "**Who can use it.** Anyone with normal Confluence permissions. There is no global admin screen and nothing to configure. You can export what you can read, and import where you can add pages.",
        },

        { type: "h", level: 2, text: "The three places you will find it" },
        {
          type: "table",
          head: ["Feature", "Where", "What it does"],
          rows: [
            [
              "**Markdown Toolkit** space page",
              "A space's sidebar",
              "Two tabs: **Export** for pages, trees and whole spaces, and **Import** for `.md` and `.zip` files.",
            ],
            [
              "**Export to Markdown**",
              "The **•••** menu on any page",
              "Exports that page, optionally with its children, without leaving the page.",
            ],
            ["**Markdown** macro", "Type `/Markdown` on any page", "Write Markdown, get rendered output on the page."],
          ],
        },

        { type: "h", level: 2, text: "Install it" },
        {
          type: "steps",
          items: [
            "Install **Markdown Toolkit for Confluence** from the Atlassian Marketplace.",
            "Open any space and look for **Markdown Toolkit** in the space sidebar.",
            "That is all. There is no setup screen, no credentials and no global settings.",
          ],
        },

        { type: "h", level: 2, text: "What “conversion” means, and its one limitation" },
        {
          type: "p",
          text: "Confluence stores pages in its own format, not Markdown. Exporting converts that format to Markdown; importing converts Markdown to it. Text, headings, lists, tables, links, images and code blocks all convert cleanly in both directions.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Some Confluence macros cannot become Markdown",
          text: "A live filter, a Jira issues macro or a complex layout has no Markdown equivalent. Instead of dropping them silently, the converter leaves a comment at that position naming the macro. So an exported page tells you where something dynamic was, rather than looking complete when it is not.",
        },
      ],
    },

    {
      slug: "export",
      title: "Exporting to Markdown",
      description: "Single pages, page trees or whole spaces, with or without attachments.",
      blocks: [
        {
          type: "p",
          text: "**How it runs.** Exports are background jobs, so a large space does not depend on your browser staying open. Progress is reported at each stage: fetching the page tree, converting pages, fetching attachments, finalising.",
        },
        { type: "mock", id: "md-export-tab" },

        { type: "h", level: 2, text: "Choosing what to export" },
        {
          type: "table",
          head: ["Option", "What you get"],
          rows: [
            ["**This page only**", "One page, one file."],
            ["**This page and all children**", "The page and everything beneath it, with the hierarchy kept as folders."],
            ["**Bulk Export**", "A hand-picked selection: tick exactly the pages you want in the tree."],
            ["**Export Entire Space**", "Everything in the space."],
          ],
        },

        { type: "h", level: 2, text: "The options that matter" },
        {
          type: "fields",
          items: [
            {
              name: "Include attachments",
              text: "Downloads the files attached to the exported pages and rewrites the links to point at them, so the export is self-contained. **This is the setting that makes an export large.** A space full of design files behaves very differently from a text-only space.",
            },
            {
              name: "Generate index file",
              text: "Adds an index listing the exported pages and their hierarchy. Useful when the target is a static site or a repository that expects an entry point.",
            },
            {
              name: "Export as single file",
              text: "Available from the page menu. Concatenates the page, and its children if selected, into one `.md` file instead of a file per page.",
            },
          ],
        },

        { type: "h", level: 2, text: "Exporting one page from the page itself" },
        { type: "mock", id: "md-content-action" },
        {
          type: "p",
          text: "**•••** → **Export to Markdown** on any page runs the same conversion for that page. **New Export** resets the dialog if you want to run it again with different options.",
        },

        { type: "h", level: 2, text: "What converts cleanly" },
        {
          type: "list",
          items: [
            "Headings, text formatting, lists, task lists, links and images.",
            "Tables, including header rows.",
            "Code blocks, with the language kept so syntax highlighting still works.",
            "Info, note and warning panels, converted to GitHub-style callouts such as `> [!NOTE]`.",
            "The page hierarchy, as a folder structure.",
            "Attachments, when you enable that option.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "How to export a big space without pain",
          text: "Run a **Bulk Export** on one branch of the tree first and check the output. Then run the full space export. Exports are held in the app's storage until you download them, so download promptly and use **Reset** to clear a job you no longer need.",
        },
      ],
    },

    {
      slug: "import",
      title: "Importing Markdown",
      description: "Turn `.md` files or a zip archive into real Confluence pages.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Takes Markdown files, or a `.zip` containing a folder structure, and creates Confluence pages from them. The zip route is how a folder of documentation from a repository arrives with its structure intact.",
        },
        { type: "mock", id: "md-import-tab" },

        { type: "h", level: 2, text: "How to import" },
        {
          type: "steps",
          items: [
            "Open **Markdown Toolkit** in the target space and switch to the **Import** tab.",
            "Confirm the **Target space**.",
            "Choose a **Parent page** if you want the imported pages created underneath it. This keeps an import out of the space root, and we recommend it.",
            "Drop `.md` files or a `.zip` onto the upload area, or click to browse.",
            "Review the file list, then click **Import**. Progress is reported per file.",
            "Read the result: how many pages were created, and how many failed.",
          ],
        },

        { type: "h", level: 2, text: "What becomes what" },
        {
          type: "table",
          head: ["In the Markdown", "In Confluence"],
          rows: [
            ["A file", "A page, titled from the first heading or the file name."],
            ["A folder inside a zip", "A parent page, with the folder's files as child pages."],
            ["Headings, lists, tables, links, images", "The equivalent Confluence content."],
            ["Fenced code blocks", "Code blocks, with the language kept."],
            ["`> [!NOTE]` style callouts", "Confluence panels."],
          ],
        },

        { type: "h", level: 2, text: "Do these three things before a large import" },
        {
          type: "list",
          items: [
            "**Import into a scratch space first.** Page titles must be unique within a space, and a clashing title is the most common cause of a failed file.",
            "**Check your relative links.** Links between files that are part of the same import are rewritten. Links to files you did not include stay as they were.",
            "**Include your images.** An image referenced by path but missing from the archive cannot become an attachment.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Import creates, it does not update",
          text: "Importing the same content twice creates a second set of pages rather than updating the first. To refresh imported content, delete or archive the previous pages, or import under a new parent page.",
        },
      ],
    },

    {
      slug: "macro",
      title: "The Markdown macro",
      description: "Write Markdown on a Confluence page, with code highlighting, Mermaid diagrams and maths.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Renders Markdown you type into a block on the page. Insert it by typing `/Markdown`.",
        },
        {
          type: "p",
          text: "**When to use it.** For content that is written in Markdown by the people who own it: runbooks kept next to code, architecture notes, generated documentation. It stays Markdown instead of being rewritten into the Confluence editor.",
        },
        {
          type: "p",
          text: "The macro has two modes: **Write**, where you type or paste, and **Preview**, which shows exactly what the page will render.",
        },
        { type: "mock", id: "md-macro-editor" },

        { type: "h", level: 2, text: "What it renders" },
        {
          type: "table",
          head: ["You write", "You get"],
          rows: [
            ["Standard and GitHub-flavoured Markdown", "Headings, emphasis, lists, task lists, links, images, quotes and tables."],
            ["A fenced code block with a language", "A code block with syntax highlighting."],
            ["A ```mermaid fenced block", "A rendered diagram: flowcharts, sequence diagrams, state diagrams, journeys."],
            ["`$…$` or `$$…$$`", "Maths, typeset with KaTeX."],
            ["`> [!NOTE]`, `> [!WARNING]`", "Coloured panels."],
          ],
        },
        { type: "mock", id: "md-macro-rendered", caption: "The same macro content, rendered on the page." },

        {
          type: "callout",
          variant: "tip",
          title: "Diagrams as text beat diagrams as images",
          text: "A Mermaid diagram in a macro can be edited by anyone who can edit the page, and it survives a Markdown export as its original source. An exported PNG cannot be corrected without the tool that made it, and that tool is usually on somebody's old laptop.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Where macro content is stored",
          text: "The Markdown you type is stored by the app against that macro, and is deleted when the app is uninstalled. Keep that in mind before putting a critical runbook only in a macro. See the [privacy policy](/privacy/markdown-toolkit).",
        },
      ],
    },

    {
      slug: "reference",
      title: "Permissions, data and limits",
      description: "What the app can access, what it stores during a job, and troubleshooting.",
      blocks: [
        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            ["`read:confluence-content.all`, `read:confluence-content.summary`", "Read page content and metadata in order to convert it."],
            [
              "`read:page:confluence`, `read:space:confluence`",
              "Read the page tree and space information for the selectors.",
            ],
            ["`storage:app`", "Hold macro content and in-flight job data."],
            ["`report:personal-data`", "Report to Atlassian the account ID on each job record, so a closed account's jobs can be erased."],
          ],
        },
        {
          type: "p",
          text: "The app declares **no external network access**. Conversion happens inside Forge.",
        },
        {
          type: "callout",
          variant: "info",
          title: "It cannot exceed your own permissions",
          text: "Exports run with your Confluence permissions, so you can only export what you can read. A restricted page is skipped rather than exported empty.",
        },

        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "list",
          items: [
            "**Macro content** — the Markdown of each macro, for as long as the macro exists on a page.",
            "**Job data** — a manifest of what an export or import covers, plus the converted content in chunks while the job runs and until you download or reset it.",
          ],
        },
        {
          type: "p",
          text: "Everything is deleted when the app is uninstalled. See the [privacy policy](/privacy/markdown-toolkit).",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "The export stops part-way",
              text: "Use **Reset** and re-run with a narrower selection. Very large spaces with attachments are the usual cause; exporting the tree in two halves normally works where one pass does not.",
            },
            {
              name: "Some pages are missing from the export",
              text: "You can only export what you can read. Restricted pages are skipped.",
            },
            {
              name: "An imported file failed",
              text: "Either a page with the same title already exists in the space, or the file is not valid UTF-8 Markdown. The result panel counts failures so you can retry just those files.",
            },
            {
              name: "A Mermaid diagram does not render",
              text: "Check the fence says exactly `mermaid`, then use **Preview** — Mermaid reports its own syntax errors there.",
            },
            {
              name: "Maths shows as plain text",
              text: "Use `$…$` for inline and `$$…$$` for a block. A lone `$` in a sentence about money is treated as text, which is deliberate.",
            },
            {
              name: "The exported page has a comment about a macro",
              text: "That macro has no Markdown equivalent. The comment marks where it was so you know something dynamic is missing.",
            },
          ],
        },
        {
          type: "p",
          text: "For anything else, the [support portal](https://synapseoasis.atlassian.net/servicedesk/customer/portals) needs the space key and, ideally, the page that failed to convert.",
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
              name: "Does our content leave Atlassian?",
              text: "No. The app declares no external network access at all. Conversion happens inside Atlassian Forge.",
            },
            {
              name: "Where does an export file live before I download it?",
              text: "In the app's storage inside your own Confluence site, until you download it, reset the job, or uninstall the app.",
            },
            {
              name: "Can somebody export a space they cannot read?",
              text: "No. Exports run with your own Confluence permissions, and restricted pages are skipped.",
            },
            { name: "Does it use AI?", text: "No. Conversion is deterministic." },
          ],
        },

        { type: "h", level: 2, text: "Export and import" },
        {
          type: "fields",
          items: [
            {
              name: "Can I export a whole space?",
              text: "Yes, with **Export Entire Space**. For very large spaces, export branch by branch instead.",
            },
            {
              name: "Are attachments included?",
              text: "Only if you enable **Include attachments**. Then the files are downloaded and the links are rewritten to point at them.",
            },
            {
              name: "Will an import overwrite existing pages?",
              text: "No. It always creates new pages. To refresh content, remove or archive the old pages first.",
            },
            {
              name: "Does a round trip give me back exactly the same page?",
              text: "For text, headings, lists, tables, links, images and code, yes. Confluence macros with no Markdown equivalent do not survive: the export marks where they were.",
            },
            {
              name: "What file types can I import?",
              text: "`.md` files, and `.zip` archives containing them.",
            },
          ],
        },

        { type: "h", level: 2, text: "The macro" },
        {
          type: "fields",
          items: [
            {
              name: "Does the macro support Mermaid diagrams?",
              text: "Yes, in a ```mermaid fenced block. Flowcharts, sequence diagrams, state diagrams and journeys all render.",
            },
            {
              name: "Does it support maths?",
              text: "Yes, LaTeX between `$…$` or `$$…$$`, rendered with KaTeX.",
            },
            {
              name: "Can I search macro content in Confluence?",
              text: "Confluence indexes what it stores for the page. Treat the macro as a rendering block, not as a replacement for page text you rely on search to find.",
            },
            {
              name: "What happens to macros if I uninstall the app?",
              text: "The macro content is cleared and detached immediately, and the macro stops rendering. Export the pages that matter **before** removing the app. See [Where your data goes](/documentation/start-here/your-data).",
            },
          ],
        },
      ],
    },
  ],
};
