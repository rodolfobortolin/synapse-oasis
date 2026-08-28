import type { AppDocs } from "../types";

export const markdownToolkit: AppDocs = {
  slug: "markdown-toolkit",
  name: "Markdown Toolkit for Confluence",
  shortName: "Markdown Toolkit",
  tagline:
    "Export Confluence pages, page trees or whole spaces to Markdown files. Write Markdown directly on a page, with Mermaid diagrams, KaTeX maths and syntax-highlighted code rendered where the content lives.",
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
          text: "**What it is.** Two things. A way to get Confluence content out as Markdown files, and a macro that renders Markdown — diagrams, maths and highlighted code included — inside a Confluence page.",
        },
        {
          type: "p",
          text: "**Why you would want it.** Documentation that also needs to live in a repository. Content you want to feed to a static site generator or an AI pipeline. Diagrams that must be editable as text by anyone who can edit the page, rather than uploaded as images nobody can correct.",
        },
        {
          type: "p",
          text: "**Who can use it.** The bulk export screen sits in a space's settings, so it needs space administrator rights. Exporting a single page from the **•••** menu, and writing in the macro, need nothing beyond your normal page permissions. There is no global admin screen and nothing to configure.",
        },
        {
          type: "callout",
          variant: "info",
          title: "The app reads. It does not write.",
          text: "Markdown Toolkit requests no write permission of any kind, so it cannot create, edit or delete a Confluence page. Content goes **out** as Markdown files; Markdown files do not come back in. See [Permissions, data and limits](/documentation/markdown-toolkit/reference).",
        },

        { type: "h", level: 2, text: "What the macro does to a page" },
        {
          type: "p",
          text: "This is the whole of it. You type a fenced `mermaid` block into the macro, and the page draws it. The diagram below is rendered by the same library the macro runs — open **Show source** to see the eight lines behind it.",
        },
        {
          type: "diagram",
          label: "flowchart",
          caption: "An escalation path lifted from a real runbook. Eight lines of text on the page, and no image to keep up to date.",
          text: `flowchart LR
    P[On-call] -->|"not resolved in 30 min"| PL[Platform team]
    PL -->|"suspected Forge bug"| AT[Atlassian Support]
    P -->|"more than 5 users affected"| IM[Incident manager]

    classDef p fill:#E9F2FF,stroke:#0055CC
    class P,PL,AT,IM p`,
        },
        {
          type: "p",
          text: "Twenty-one diagram types render this way, alongside KaTeX maths and syntax-highlighted code, so an architecture note or a runbook keeps its pictures in the page rather than in a folder of screenshots. [The gallery](/documentation/markdown-toolkit/diagrams) renders one example of every type.",
        },

        { type: "h", level: 2, text: "The three places you will find it" },
        {
          type: "table",
          head: ["Feature", "Where", "What it does"],
          rows: [
            [
              "**Markdown Toolkit** settings screen",
              "**Space settings** in any space",
              "Bulk export: pick pages from the tree, or take the whole space.",
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
            "Open a space, go to **Space settings**, and look for **Markdown Toolkit**.",
            "That is all. There is no setup screen, no credentials and no global settings.",
          ],
        },

        { type: "h", level: 2, text: "What “conversion” means, and its one limitation" },
        {
          type: "p",
          text: "Confluence stores pages in its own XHTML dialect, not Markdown. Exporting converts that format to Markdown: text, headings, lists, tables, links, images and code blocks all come across cleanly.",
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
      slug: "macro",
      title: "The Markdown macro",
      description: "Write Markdown on a Confluence page, with Mermaid diagrams, KaTeX maths and highlighted code.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Renders Markdown you type into a block on the page. Insert it by typing `/Markdown`.",
        },
        {
          type: "p",
          text: "**When to use it.** For content that is written in Markdown by the people who own it: runbooks kept next to code, architecture notes, generated documentation. It stays Markdown instead of being rewritten into the Confluence editor — and the diagrams inside it stay text, which is the part that pays off six months later.",
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
            ["A fenced code block with a language", "A code block with syntax highlighting, via highlight.js."],
            [
              "A fenced `mermaid` block",
              "A rendered diagram. Twenty-one types, from a flowchart to a Gantt chart to a C4 context diagram — see [the gallery](/documentation/markdown-toolkit/diagrams).",
            ],
            ["`$…$` or `$$…$$`", "Maths, typeset with KaTeX."],
            ["`> [!NOTE]`, `> [!WARNING]`", "Coloured panels."],
          ],
        },
        { type: "mock", id: "md-macro-rendered", caption: "The same macro content, rendered on the page." },

        { type: "h", level: 2, text: "A diagram, in eleven lines" },
        {
          type: "p",
          text: "One more example of the row above, rendered here by the same library the macro runs. It is a decision tree out of a runbook — the kind of thing that normally arrives as a screenshot nobody can correct.",
        },
        {
          type: "diagram",
          label: "flowchart",
          caption: "Eleven lines of Markdown. Editable by anyone who can edit the paragraph above it, and it leaves a Markdown export as the same eleven lines.",
          text: `flowchart TD
    S[Report of a stuck export] --> Q1{has progress moved<br/>in the last 10 min?}
    Q1 -->|yes| N1[Not stuck.<br/>A large space is slow.]
    Q1 -->|no| Q2{any error in the logs?}
    Q2 -->|yes| N2[Follow the error.<br/>Not this runbook.]
    Q2 -->|no| Q3{does the cursor repeat<br/>between invocations?}
    Q3 -->|no| N3[The consumer is not<br/>being invoked. Check the queue.]
    Q3 -->|yes| A1[Known cause.<br/>Reset and escalate.]

    classDef action fill:#DFFCF0,stroke:#216E4E
    classDef stop fill:#E9F2FF,stroke:#0055CC
    class A1 action
    class N1,N2,N3 stop`,
        },

        { type: "h", level: 2, text: "Maths, on the page" },
        {
          type: "p",
          text: "The `$$…$$` block below is from the app's own architecture note, where it costs an export job. It is typed as LaTeX and typeset by KaTeX in the browser — no image, no external service.",
        },
        {
          type: "code",
          label: "In the macro",
          text: `The total time of an export is dominated by I/O, not by conversion:

$$
T_{total} = \\sum_{i=1}^{n} \\left( t_{fetch}(p_i) + t_{conv}(p_i) \\right)
          + \\left\\lceil \\frac{B}{184320} \\right\\rceil \\cdot t_{kvs}
$$

where $n$ is the number of pages and $B$ the total bytes of attachments.`,
        },

        { type: "h", level: 2, text: "Sizing a diagram" },
        {
          type: "p",
          text: "Each macro carries its own layout settings, because a sequence diagram and a pie chart do not want the same treatment.",
        },
        {
          type: "fields",
          items: [
            {
              name: "Width",
              text: "**Natural** keeps the diagram's own width and scrolls inside the block — the default, and the right answer for anything wide. **Fit** shrinks it to the column. A number caps it at that many pixels.",
            },
            {
              name: "Max height",
              text: "Caps the block and scrolls inside it. Useful for a long Gantt chart you do not want owning the whole page.",
            },
            {
              name: "Alignment",
              text: "Left by default. A diagram is only centred when it actually fits: centring something wider than the column pushes its left edge out of reach.",
            },
          ],
        },

        {
          type: "callout",
          variant: "tip",
          title: "Diagrams as text beat diagrams as images",
          text: "A Mermaid diagram in a macro can be edited by anyone who can edit the page, and it survives a Markdown export as its original source. An exported PNG cannot be corrected without the tool that made it, and that tool is usually on somebody's old laptop.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Where macro content lives",
          text: "Not with the app. The Markdown you type is Forge macro configuration, which Confluence keeps inside the page itself — the same place a built-in macro's settings live. So it survives an uninstall, it is in the page history, and it goes with the page when the page is deleted. What an uninstall takes away is the rendering: without the app the macro has nothing to draw it, so the page shows an unrendered placeholder until the app is installed again. See the [privacy policy](/privacy/markdown-toolkit).",
        },
      ],
    },

    {
      slug: "diagrams",
      title: "Diagram gallery",
      description: "Every Mermaid diagram type the macro renders, with the source behind each one.",
      blocks: [
        {
          type: "p",
          text: "Twenty-one diagram types, each rendered here by the same library the macro runs in Confluence. Every panel has a **Show source** button: what you read there is exactly what goes inside a fenced `mermaid` block on the page.",
        },
        {
          type: "callout",
          variant: "info",
          text: "Every example on this page is lifted from a real Confluence space that documents the app itself, which is why they are about export jobs and Forge runtimes rather than about cats. Each one is short on purpose: a ten-line diagram is read, a hundred-line one is scrolled past.",
        },

        { type: "h", level: 2, text: "Flow and structure" },

        { type: "h", level: 3, text: "flowchart" },
        {
          type: "p",
          text: "The one you will use most. Nodes, edges, subgraphs, and `classDef` for colour the author controls.",
        },
        {
          type: "diagram",
          label: "flowchart",
          text: `flowchart LR
    subgraph risk["Risk class"]
        B[Low] --- M[Medium] --- H[High]
    end

    B --> AP1["Approver:<br/>tech lead"]
    M --> AP2["Approvers:<br/>tech lead<br/>+ manager"]
    H --> AP3["Approvers:<br/>tech lead<br/>+ manager<br/>+ CAB"]

    AP1 --> W1["Window:<br/>any time"]
    AP2 --> W2["Window:<br/>off-peak"]
    AP3 --> W3["Window:<br/>Saturday night"]

    classDef low fill:#DFFCF0,stroke:#216E4E,color:#172B4D
    classDef mid fill:#FFF7D6,stroke:#A54800,color:#172B4D
    classDef high fill:#FFECEB,stroke:#AE2E24,color:#172B4D
    class B,AP1,W1 low
    class M,AP2,W2 mid
    class H,AP3,W3 high`,
        },

        { type: "h", level: 3, text: "sequenceDiagram" },
        { type: "p", text: "Participants over time, with `alt`, `loop` and `autonumber`." },
        {
          type: "diagram",
          label: "sequenceDiagram",
          text: `sequenceDiagram
    autonumber
    participant T as scheduledTrigger
    participant S as personal-data.ts
    participant KVS as Forge KVS
    participant API as Atlassian

    T->>S: fires (daily)
    S->>KVS: scan the operation keys
    KVS-->>S: stored account IDs
    alt accounts to report
        S->>API: POST /app/report-accounts/
        API-->>S: closed[] and updated[]
        loop each closed account
            S->>KVS: delete everything of that person's
        end
    else nothing new
        S-->>T: done
    end`,
        },

        { type: "h", level: 3, text: "stateDiagram-v2" },
        { type: "p", text: "States, transitions and choice pseudo-states." },
        {
          type: "diagram",
          label: "stateDiagram-v2",
          text: `stateDiagram-v2
    [*] --> Idle
    Idle --> Validating : startExport()

    state decide <<choice>>
    Validating --> decide
    decide --> Refused : a job is already running
    decide --> Reclaiming : previous job finished
    decide --> Queued : no job

    Reclaiming --> Queued
    Queued --> Processing
    Processing --> Processing : self-chain
    Processing --> Complete
    Processing --> Failed : unrecoverable error
    Complete --> Downloading
    Downloading --> [*]
    Failed --> Idle : reset()
    Refused --> [*]`,
        },

        { type: "h", level: 3, text: "classDiagram" },
        { type: "p", text: "Classes, generics, stereotypes and relationships." },
        {
          type: "diagram",
          label: "classDiagram",
          text: `classDiagram
    direction LR

    class ExportJob {
        <<entity>>
        +string accountId
        +string spaceKey
        +JobStatus status
        +chain(cursor) Promise~void~
        +reclaim() Promise~void~
    }

    class JobStatus {
        <<enumeration>>
        PENDING
        RUNNING
        COMPLETE
        FAILED
    }

    class ChunkedStorage~T~ {
        <<service>>
        -CHUNK_SIZE: number
        +put(key, value) Promise~void~
        +get(key) Promise~T~
    }

    ExportJob --> JobStatus : uses
    ExportJob ..> ChunkedStorage~ExportJob~ : persists in

    note for ChunkedStorage "180 KB per chunk, KVS limit 240 KiB"`,
        },

        { type: "h", level: 3, text: "erDiagram" },
        { type: "p", text: "Entities, cardinality and attributes with comments." },
        {
          type: "diagram",
          label: "erDiagram",
          text: `erDiagram
    ACCOUNT ||--o{ EXPORT_JOB : "starts"
    SPACE ||--|{ PAGE : "contains"
    PAGE ||--o{ PAGE : "parent of"
    PAGE ||--o{ ATTACHMENT : "has"
    EXPORT_JOB ||--|{ STORAGE_CHUNK : "serialised into"
    EXPORT_JOB }|--|{ PAGE : "exports"

    EXPORT_JOB {
        string key PK "export:operation:accountId"
        string status "PENDING RUNNING COMPLETE FAILED"
        int processed
        string cursor "self-chain"
    }
    STORAGE_CHUNK {
        string key PK "key plus index"
        int index "negative = metadata"
        string payload "up to 180 KB"
    }`,
        },

        { type: "h", level: 3, text: "C4Context" },
        { type: "p", text: "The C4 model's first level: people, systems, and the boundary around them." },
        {
          type: "diagram",
          label: "C4Context",
          text: `C4Context
    title System context

    Person(author, "Content author", "Writes and organises pages")
    Person(admin, "Administrator", "Installs and licenses")

    Enterprise_Boundary(atlassian, "Atlassian Cloud") {
        System(app, "Markdown Toolkit", "Export and rendering")
        System_Ext(confluence, "Confluence", "Pages, spaces, attachments")
        System_Ext(marketplace, "Marketplace", "Licensing")
    }

    Rel(author, app, "Uses")
    Rel(admin, marketplace, "Subscribes")
    Rel(app, confluence, "Reads over REST v2")
    Rel(marketplace, app, "context.license")`,
        },

        { type: "h", level: 3, text: "block-beta" },
        { type: "p", text: "A grid of blocks, for a layered picture that a flowchart would arrange badly." },
        {
          type: "diagram",
          label: "block-beta",
          text: `block-beta
    columns 4

    browser["The user's browser"]:4

    space:4

    ui1["main-ui"] ui2["content-action-ui"] ui3["macro-ui"] ui4["macro-config-ui"]

    space:4

    block:runtime:4
        columns 2
        resolver["resolver"]
        expc["export-consumer"]
    end

    space:4

    block:persist:4
        columns 2
        kvs[("KVS chunks")]
        api["Confluence REST v2"]
    end

    ui1 --> resolver
    ui2 --> resolver
    resolver --> expc
    expc --> kvs
    expc --> api

    style browser fill:#DEEBFF,stroke:#0052CC
    style kvs fill:#E3FCEF,stroke:#006644
    style api fill:#FFFAE6,stroke:#FF8B00`,
        },

        { type: "h", level: 3, text: "architecture-beta" },
        { type: "p", text: "Services and groups, with edges that attach to a named side of each box." },
        {
          type: "diagram",
          label: "architecture-beta",
          text: `architecture-beta
    group atlassian(cloud)[Atlassian Cloud]
    group forge(server)[Forge Runtime] in atlassian
    group data(database)[Storage] in atlassian

    service ui(internet)[React iframes] in forge
    service resolver(server)[Resolver] in forge
    service consumers(server)[Queue Consumers] in forge
    service kvs(database)[Forge KVS] in data
    service confluence(database)[Confluence Content] in atlassian

    ui:R --> L:resolver
    resolver:R --> L:consumers
    consumers:B --> T:kvs
    consumers:R --> L:confluence
    resolver:B --> T:kvs`,
        },

        { type: "h", level: 3, text: "mindmap" },
        { type: "p", text: "Indentation is the whole syntax. Good for a feature map nobody wants to lay out by hand." },
        {
          type: "diagram",
          label: "mindmap",
          text: `mindmap
  root((Markdown<br/>Toolkit))
    Export
      Single page
        from the page menu
      Page tree
        child-position
        many levels
      Whole space
        many roots
        no homepage
      Attachments
        base64 in the KVS
        path rewritten in the MD
    Macro
      markdown-it
        html
        linkify
        typographer
      highlight.js
      KaTeX
        inline
        display
      Mermaid
    Compliance
      Personal Data API
        closed accounts
      Licensing
      No personal data in logs`,
        },

        { type: "h", level: 3, text: "requirementDiagram" },
        { type: "p", text: "Requirements, their risk and verification method, and what satisfies them." },
        {
          type: "diagram",
          label: "requirementDiagram",
          text: `requirementDiagram

    requirement compliance {
        id: 1
        text: The app must meet the Marketplace rules
        risk: high
        verifymethod: inspection
    }

    functionalRequirement report_accounts {
        id: 1.1
        text: Report stored account IDs once per cycle
        risk: high
        verifymethod: test
    }

    performanceRequirement chunk_limit {
        id: 2.1
        text: No KVS value may exceed 240KiB
        risk: medium
        verifymethod: test
    }

    element personal_data_service {
        type: module
        docref: "src/services/personal-data.ts"
    }

    element storage_service {
        type: module
        docref: "src/services/storage.ts"
    }

    compliance - contains -> report_accounts
    personal_data_service - satisfies -> report_accounts
    storage_service - satisfies -> chunk_limit`,
        },

        { type: "h", level: 3, text: "packet-beta" },
        { type: "p", text: "Bit ranges in a binary layout. Niche, and exactly right when you need it." },
        {
          type: "diagram",
          label: "packet-beta",
          text: `packet-beta
    title Layout of a chunk in the KVS
    0-15: "Chunk index (negative = metadata)"
    16-31: "Format version"
    32-63: "Payload length"
    64-95: "CRC32"
    96-127: "Flags (compressed, base64, final)"
    128-255: "Payload (up to 180 KB, truncated)"`,
        },

        { type: "h", level: 2, text: "Plans and time" },

        { type: "h", level: 3, text: "gantt" },
        {
          type: "p",
          text: "Dates, dependencies (`after`), and task states. Wide by nature — this is the type the **Width** setting exists for.",
        },
        {
          type: "diagram",
          label: "gantt",
          text: `gantt
    title Markdown Toolkit roadmap
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    excludes weekends

    section Backend
    Confluence v2 client        :done,    be1, 2026-06-01, 10d
    HTML to Markdown converter  :done,    be2, after be1, 14d
    Chunked KVS storage         :done,    be3, after be1, 8d
    Self-chaining consumer      :done,    be4, after be2, 12d
    Personal Data Reporting     :active,  be5, after be4, 7d

    section Macro
    markdown-it renderer        :done,    mc1, 2026-07-01, 6d
    Mermaid + highlight.js      :done,    mc2, after mc1, 8d
    KaTeX                       :done,    mc3, after mc2, 4d
    Unify view and config       :crit,    mc4, after mc3, 5d`,
        },

        { type: "h", level: 3, text: "timeline" },
        { type: "p", text: "Periods and the events inside them. No dates to get wrong." },
        {
          type: "diagram",
          label: "timeline",
          text: `timeline
    title How the app grew
    section Foundation
        Jun 2026 : Forge scaffold
                 : Confluence v2 client
                 : First single-page export
    section Scale
        Jul 2026 : Chunked KVS storage
                 : Async consumers
                 : Self-chaining for large spaces
                 : Whole-space export
    section Experience
        Aug 2026 : Page tree selector
                 : Markdown macro with Mermaid
                 : Nine locales
    section Marketplace
        Sep 2026 : Personal Data Reporting
                 : Licensing gate
                 : Submitted for review`,
        },

        { type: "h", level: 3, text: "journey" },
        { type: "p", text: "Steps scored 1–5 by who lives them. The low scores are the point." },
        {
          type: "diagram",
          label: "journey",
          text: `journey
    title Exporting a whole space to Markdown
    section Discovery
        Open the space settings: 4: User
        Find Markdown Toolkit: 3: User
    section Setup
        Pick the pages: 5: User
        Tick include attachments: 4: User
        Click Export: 5: User
    section Waiting
        Watch the progress bar: 3: User, App
        Poll every 3 seconds: 2: App
        Self-chain on a large space: 1: App
    section Result
        ZIP assembled in the browser: 4: App
        Download finished: 5: User`,
        },

        { type: "h", level: 3, text: "kanban" },
        { type: "p", text: "Columns, cards, and per-card metadata such as priority and assignee." },
        {
          type: "diagram",
          label: "kanban",
          text: `kanban
    backlog[Backlog]
        t1[Unify the macro view and config renderers]@{ priority: 'Very High' }
        t2[Sanitise HTML before rendering]@{ priority: 'Very High' }
        t3[Preserve table alignment]@{ priority: 'High' }
    todo[To do]
        t5[Skeletons on every screen]@{ priority: 'High' }
        t6[i18n tests]@{ priority: 'Low' }
    doing[In progress]
        t7[Personal Data Reporting]@{ priority: 'Very High' }
    done[Done]
        t9[KaTeX with a static import]
        t10[180 KB chunking]
        t11[Self-chaining consumers]`,
        },

        { type: "h", level: 2, text: "Numbers" },

        { type: "h", level: 3, text: "pie" },
        { type: "p", text: "One line per slice. `showData` prints the values." },
        {
          type: "diagram",
          label: "pie",
          text: `pie showData title Where the time goes in a 500-page export
    "Fetching pages" : 4210
    "Downloading attachments" : 3105
    "HTML to Markdown" : 1890
    "Base64 + chunking" : 1420
    "Assembling the ZIP" : 860
    "Runtime overhead" : 515`,
        },

        { type: "h", level: 3, text: "xychart-beta" },
        { type: "p", text: "Bars and lines on the same axes." },
        {
          type: "diagram",
          label: "xychart-beta",
          text: `xychart-beta
    title "Average days in each status"
    x-axis ["Backlog", "Selected", "Dev", "Review", "Test"]
    y-axis "Days" 0 --> 14
    bar [12, 2, 3, 4, 1]`,
        },

        { type: "h", level: 3, text: "sankey-beta" },
        { type: "p", text: "Flows and where they go. Three comma-separated columns: from, to, value." },
        {
          type: "diagram",
          label: "sankey-beta",
          text: `sankey-beta

Storage format,Tokenizer,100
Tokenizer,Markdown body,62
Tokenizer,Tables,18
Tokenizer,Code blocks,12
Tokenizer,Dropped,8
Markdown body,KVS chunk,62
Tables,KVS chunk,18
Code blocks,KVS chunk,12
KVS chunk,ZIP,92
ZIP,Download,92`,
        },

        { type: "h", level: 3, text: "radar-beta" },
        { type: "p", text: "Several things scored on the same axes, overlaid." },
        {
          type: "diagram",
          label: "radar-beta",
          text: `radar-beta
    title Coverage by surface
    axis cov["Test coverage"], i18n["i18n"], perf["Performance"]
    axis a11y["Accessibility"], err["Error handling"], doc["Documentation"]
    curve backend["Backend (src/)"]{90, 100, 75, 40, 85, 80}
    curve mainui["main-ui"]{60, 95, 70, 65, 70, 55}
    curve macro["markdown-macro-ui"]{35, 20, 55, 45, 50, 40}
    max 100
    min 0`,
        },

        { type: "h", level: 3, text: "treemap-beta" },
        { type: "p", text: "Nested proportions. Here, lines of code per module." },
        {
          type: "diagram",
          label: "treemap-beta",
          text: `treemap-beta
"Markdown Toolkit"
    "src (backend)"
        "services"
            "html-to-markdown": 820
            "confluence-client": 540
            "storage": 380
            "personal-data": 210
        "resolvers"
            "export": 340
            "spaces": 90
        "consumers"
            "export-consumer": 470
    "static (frontend)"
        "main-ui": 1240
        "markdown-macro-ui": 419
        "markdown-macro-config-ui": 385
        "content-action-ui": 260`,
        },

        { type: "h", level: 3, text: "quadrantChart" },
        { type: "p", text: "Two axes, four named quadrants, points placed by coordinate." },
        {
          type: "diagram",
          label: "quadrantChart",
          text: `quadrantChart
    title Which workflow to use
    x-axis "Little ceremony" --> "Much ceremony"
    y-axis "Low-risk change" --> "High-risk change"
    quadrant-1 "Critical change"
    quadrant-2 "Too much process"
    quadrant-3 "Everyday task"
    quadrant-4 "Risk without control"
    "Simple task": [0.12, 0.15]
    "Development": [0.45, 0.40]
    "Change with approvals": [0.88, 0.85]
    "Production bug": [0.30, 0.75]
    "Documentation": [0.10, 0.08]`,
        },

        {
          type: "callout",
          variant: "tip",
          title: "If a diagram does not appear",
          text: "Check the fence says exactly `mermaid`, then switch the macro to **Preview** — Mermaid reports its own syntax errors there, with the line number. A diagram type Mermaid does not know reports itself the same way.",
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
            ["`storage:app`", "Hold in-flight job data."],
            ["`report:personal-data`", "Report to Atlassian the account ID on each job record, so a closed account's jobs can be erased."],
          ],
        },
        {
          type: "p",
          text: "There is no `write:` scope in the list, and that is not an omission: the app has no code path that creates or changes Confluence content. It also declares **no external network access** — conversion happens inside Forge.",
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
            "**Job data** — a manifest of what an export covers, plus the converted content in chunks while the job runs and until you download or reset it.",
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
              name: "I cannot find the Markdown Toolkit screen",
              text: "It is in **Space settings**, not the space sidebar, and it needs space administrator rights. To export a single page or a page tree without those rights, use **•••** → **Export to Markdown** on the page itself.",
            },
            {
              name: "A Mermaid diagram does not render",
              text: "Check the fence says exactly `mermaid`, then use **Preview** — Mermaid reports its own syntax errors there.",
            },
            {
              name: "A wide diagram is cut off",
              text: "It is not cut off, it is scrolling: the default **Width** setting keeps a diagram's natural size and scrolls inside the block, because shrinking a wide sequence or ER diagram to the column makes its labels unreadable. Set **Width** to **Fit** if you would rather have it small.",
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
              name: "Can the app change our pages?",
              text: "No. It requests no write permission of any kind, so it cannot create, edit or delete a page or an attachment.",
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

        { type: "h", level: 2, text: "Export" },
        {
          type: "fields",
          items: [
            {
              name: "Can I import Markdown files and turn them into Confluence pages?",
              text: "No. The app exports Confluence to Markdown; it does not create pages. It holds no write permission for Confluence content at all, which is also why it cannot alter a page it exports.",
            },
            {
              name: "Can I export a whole space?",
              text: "Yes, with **Export Entire Space**. For very large spaces, export branch by branch instead.",
            },
            {
              name: "Are attachments included?",
              text: "Only if you enable **Include attachments**. Then the files are downloaded and the links are rewritten to point at them.",
            },
            {
              name: "How faithful is the Markdown?",
              text: "Text, headings, lists, tables, links, images, code blocks and info/note/warning panels all convert. Confluence macros with no Markdown equivalent cannot: the export leaves a comment naming the macro where it was.",
            },
            {
              name: "Do I need to be an admin?",
              text: "For the bulk export screen, yes — it lives in **Space settings**. For **•••** → **Export to Markdown** on a page, and for the macro, no.",
            },
          ],
        },

        { type: "h", level: 2, text: "The macro" },
        {
          type: "fields",
          items: [
            {
              name: "Which Mermaid diagrams does it support?",
              text: "Twenty-one types, from flowcharts and sequence diagrams to Gantt charts, Sankey diagrams, radar charts and C4 context diagrams. [The gallery](/documentation/markdown-toolkit/diagrams) renders one of each.",
            },
            {
              name: "Does it support maths?",
              text: "Yes, LaTeX between `$…$` or `$$…$$`, rendered with KaTeX.",
            },
            {
              name: "Does it follow Confluence's dark mode?",
              text: "Yes. The macro reads the page's colour mode and re-renders when it changes, rather than reloading.",
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
