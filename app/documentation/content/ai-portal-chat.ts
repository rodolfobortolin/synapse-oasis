import type { AppDocs } from "../types";

export const aiPortalChat: AppDocs = {
  slug: "ai-portal-chat",
  name: "AI Portal Chat for Jira",
  shortName: "AI Portal Chat",
  tagline:
    "Adds a chat assistant to your Jira Service Management portal. It answers customer questions from your Confluence knowledge base, works out which request type they need, collects the fields in the conversation, takes attachments, and creates the ticket.",
  products: "Jira Service Management",
  color: "#2B2ED8",
  icon: "/ai-portal.png",
  ai: true,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "What the assistant does, who configures it, and how to get it live on one service desk.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** A chat window in your customer portal. The customer describes their problem in their own words. The assistant answers it, or creates the right request for them.",
        },
        {
          type: "p",
          text: "**Why you would want it.** Customers do not know which of your request types matches their situation. So they pick the closest one and leave half the fields empty. Your agents then spend two replies asking for information the form should have collected. The assistant asks those questions up front, and does not create a ticket at all when the answer is already in your knowledge base.",
        },
        {
          type: "p",
          text: "**Who sets it up.** A [Jira administrator](/documentation/start-here/jira-words). Individual service desk teams can add temporary notices themselves, which is covered in [Operational notices](/documentation/ai-portal-chat/operational-notices).",
        },

        { type: "h", level: 2, text: "What the customer sees" },
        {
          type: "p",
          text: "The assistant is offered in the Help Center, above your normal request types. Nothing else about the portal changes.",
        },
        { type: "mock", id: "ap-portal-trigger", caption: "The banner trigger in the Help Center, above the usual request type list." },
        {
          type: "p",
          text: "Clicking **Start a conversation** opens the chat window, which explains what it can do before the customer types anything.",
        },
        { type: "mock", id: "ap-chat-empty" },

        { type: "h", level: 2, text: "What it can do in a conversation" },
        {
          type: "fields",
          items: [
            {
              name: "Answer from your knowledge base",
              text: "It searches the Confluence spaces you choose and answers before offering to create anything.",
            },
            {
              name: "Choose the request type and fill it in",
              text: "It picks the right request type and shows its fields as a small form inside the chat, so the customer never browses your portal menu.",
            },
            {
              name: "Accept file attachments",
              text: "Up to 5 MB per file and 10 MB per conversation. Only when the request type accepts attachments; if it does not, the assistant says so instead of silently dropping the file.",
            },
            {
              name: "Ask for confirmation",
              text: "It shows what it is about to create and waits for a yes. You can switch this off, but we recommend leaving it on.",
            },
            { name: "Collect feedback", text: "A thumbs up or down at the end of the conversation, which feeds the statistics." },
          ],
        },
        { type: "mock", id: "ap-portal-chat", caption: "A full conversation: a question answered from the knowledge base, the request type fields collected in the chat, and the ticket created." },

        { type: "h", level: 2, text: "What you need before you start" },
        {
          type: "list",
          items: [
            "**Jira Service Management**, with at least one service desk that customers can reach through the portal.",
            "**Jira administrator** rights.",
            "**Confluence** with at least one space of customer-facing articles, if you want knowledge base answers. This is optional but it is where most of the value is.",
            "Nothing else. There is no API key to buy: the AI runs on Atlassian's own Forge LLM service.",
          ],
        },

        { type: "h", level: 2, text: "Set it up on one service desk" },
        {
          type: "p",
          text: "Do not enable every desk at once. Pick the busiest one, get it right, then copy the pattern.",
        },
        {
          type: "steps",
          items: [
            "Install the app, then open **Jira → Apps → AI Portal Chat**.",
            "Go to the **Portal Assistant** tab. In the **Company Instructions** card, set **Ticket & Knowledge Base language** and write your **Custom instructions for AI Portal Chat** — tone, and anything the assistant must never promise. Two or three sentences is enough. Click **Save Instructions**.",
            "In the **Service Desk Configuration** card, pick your service desk and switch **Enable AI Portal Chat** on.",
            "Leave **Auto-confirm tickets** off. Customers then see what will be created before it happens.",
            "Switch **Enable Knowledge Base Search** on. A **Confluence Space Keys** field appears: type the space keys to search, separated by commas, for example `KB, IT`.",
            "Add **service desk instructions** for this desk: what it covers, and any rule an agent always repeats, such as an approval requirement.",
            "For your two or three busiest request types, add **request type instructions**. Write the questions your agents always end up asking.",
            "Go to the **Branding** tab, choose the trigger layout, set your colours and give the assistant a name.",
            "Open the portal as a customer and have a real conversation with it.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Test as a customer, not as an admin",
          text: "Open the portal in a private browser window, signed in as a test customer. The assistant sees the request types and knowledge base articles that **that user** is allowed to see, so testing as an administrator gives you a misleading result.",
        },

        { type: "h", level: 2, text: "Where each screen lives" },
        {
          type: "table",
          head: ["Screen", "Where", "Who can use it"],
          rows: [
            ["The chat itself", "Your JSM portal: the header, plus an entry in the customer's menu", "Customers"],
            ["Statistics, Portal Assistant, Branding, API, Audit Log", "**Jira → Apps → AI Portal Chat**", "Jira administrator"],
            ["Agent Instructions (temporary notices)", "The service desk project → **Agent Instructions**", "Project administrator"],
          ],
        },
        {
          type: "p",
          text: "Next: [Instructions and knowledge base](/documentation/ai-portal-chat/instructions), which is where you actually control how the assistant behaves.",
        },
      ],
    },

    {
      slug: "instructions",
      title: "Instructions and knowledge base",
      description: "The three places you write instructions, and how to connect your Confluence articles.",
      blocks: [
        {
          type: "p",
          text: "**What this page is for.** The assistant does what your instructions tell it to. This page explains where to write them and which level to use.",
        },
        {
          type: "p",
          text: "There are three levels. All of them are combined when a conversation happens, so put each rule at the level where it is actually true. A rule in the wrong place either applies everywhere when it should not, or never applies at all.",
        },
        { type: "mock", id: "ap-desk-config" },

        { type: "h", level: 2, text: "The three levels" },
        {
          type: "table",
          head: ["Level", "Where", "Applies to", "Use it for"],
          rows: [
            [
              "**Company Instructions** → *Custom instructions for AI Portal Chat*",
              "Portal Assistant tab, first card",
              "Every conversation, every desk",
              "Tone, hard rules, and anything true of your whole organisation.",
            ],
            [
              "**Service desk specific instructions**",
              "Service Desk Configuration card",
              "One service desk",
              "What that desk covers, its approval rules, who it escalates to.",
            ],
            [
              "**Request type specific instructions**",
              "Request Type Instructions section",
              "One request type",
              "The specific questions to ask for that kind of request.",
            ],
          ],
        },
        {
          type: "p",
          text: "Each card has its own save button — **Save Instructions**, **Save Configuration** and **Save Request Type Instructions**. Saving one does not save the others.",
        },

        { type: "h", level: 2, text: "The language setting, which is not an instruction" },
        {
          type: "p",
          text: "Above the company instructions there is a dropdown called **Ticket & Knowledge Base language**. It ships as **Auto-detect (user language)**, and it does something instructions cannot: it fixes the language used for **ticket fields** (summary, description) and for **knowledge base searches**, no matter which language the customer writes in.",
        },
        {
          type: "table",
          head: ["Setting", "What happens"],
          rows: [
            [
              "**Auto-detect (user language)**",
              "Tickets are written in the language the customer used. Natural for the customer, mixed for your agents.",
            ],
            [
              "A specific language — English, Português (Brasil), Português (Portugal), Español, Français, Deutsch, Italiano or 日本語",
              "Customers still write in their own language, but every ticket lands in the language you chose, and knowledge base searches run in it too.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Pick a fixed language if your agents share one",
          text: "A queue where every summary is in the same language is far easier to work, and JQL searches actually find things. Set it to your agents' language and let customers keep writing in theirs.",
        },
        {
          type: "table",
          head: ["Example rule", "Where it belongs"],
          rows: [
            ["Always answer in the customer's language.", "Global"],
            ["Never give a resolution time.", "Global"],
            ["Offer the knowledge base before creating a request.", "Global"],
            ["Hardware replacement needs manager approval. Say so before raising the request.", "Service desk"],
            ["Always ask which device is affected and whether the person can still work.", "Request type"],
            ["Ask which environment the problem happens in, and for a screenshot.", "Request type"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "How to write good request type instructions in ten minutes",
          text: "Open the last twenty tickets of one request type and read the **first reply your agents sent**. If it is nearly always “which environment?” or “can you send a screenshot?”, put that sentence in the instructions. The assistant will collect it before the ticket exists, and those two replies disappear from your queue.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Be careful what you promise",
          text: "The assistant follows your instructions literally. Do not write anything that commits you to a timescale, a price or an outcome, because it will repeat it to customers.",
        },

        { type: "h", level: 2, text: "Knowledge base search" },
        {
          type: "p",
          text: "Switch **Enable Knowledge Base Search** on for the desk. A **Confluence Space Keys** field then appears — it is hidden while the toggle is off, which is why people think it is missing. List the space keys the assistant may search, separated by commas. A space key is the short code in a space's URL, for example `KB` in `/wiki/spaces/KB/`.",
        },
        {
          type: "p",
          text: "Listing spaces one by one is deliberate. It keeps the answers relevant, and it keeps internal spaces out of customer conversations.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Check what is in a space before you add it",
          text: "Only add spaces whose content is safe for the people using that portal. A space that mixes customer-facing articles with internal runbooks is not a good candidate. Split it first.",
        },
        {
          type: "p",
          text: "Customer permissions still apply on top of your list: the search runs as the signed-in customer, so they cannot be shown an article they could not open themselves.",
        },

        { type: "h", level: 2, text: "Auto-confirm: leave it off" },
        {
          type: "p",
          text: "With **Auto-confirm tickets** off, the assistant shows a summary of the request and waits for the customer to agree. With it on, the request is created immediately.",
        },
        {
          type: "p",
          text: "Keep it off. The confirmation step is where customers notice a wrong request type and correct it, and correcting it there costs nothing. Only turn it on for a desk where every request is trivial and speed matters more than accuracy.",
        },
      ],
    },

    {
      slug: "operational-notices",
      title: "Operational notices and the API",
      description:
        "Tell the assistant about today: an outage, a maintenance window, a delayed supplier. Manually, or from your own tooling.",
      blocks: [
        {
          type: "p",
          text: "**What this is.** A short, temporary message the assistant takes into account and mentions to customers when it is relevant.",
        },
        {
          type: "p",
          text: "**Why it matters.** Instructions describe how things normally work. A notice describes today. During an incident, a notice stops the wave of duplicate tickets about something you already know is broken.",
        },
        { type: "mock", id: "ap-notice" },

        { type: "h", level: 2, text: "Setting a notice by hand" },
        {
          type: "steps",
          items: [
            "Open the service desk project and click **Agent Instructions** in the project menu.",
            "Type the notice in **Operational notice**. State the fact and when it ends, for example: “The website is down for maintenance until 12 February, 14:00 UTC.”",
            "Set **Auto-expire** to the time it stops being true.",
            "Click **Set prompt**. Use **Clear prompt** to remove it earlier.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Always set an expiry",
          text: "A notice with no expiry is worse than no notice. The assistant will keep telling customers about a maintenance window that finished last week, and you will not notice until somebody complains. The auto-expire field exists so nobody has to remember.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Who should write these",
          text: "The service desk team, not the Jira administrator. That is why this screen lives in the project and only needs project admin rights. The person who knows the site is down should be able to say so without raising a request with you.",
        },

        { type: "h", level: 2, text: "Setting notices from your own tools" },
        {
          type: "p",
          text: "If you already have a status page, a deployment pipeline or incident tooling, it can set and clear notices automatically. The app exposes a private URL, called a web trigger, protected by a token you generate.",
        },
        { type: "mock", id: "ap-api" },
        {
          type: "steps",
          items: [
            "Open the **API** tab and click **Generate Token**.",
            "Copy the token immediately and store it where you keep other secrets. It is shown once and cannot be displayed again.",
            "Copy the **API Endpoint** shown underneath. It is your site's web trigger URL.",
            "Call that endpoint with the token. **Every operation is a `POST` to the same URL**; what changes is the `action` field in the body.",
            "Connect it to whatever already knows about your incidents: set the notice when the incident opens, delete it when it closes.",
          ],
        },
        {
          type: "table",
          head: ["`action`", "What it does", "Other fields"],
          rows: [
            ["`set`", "Sets or replaces the notice for a project.", "`projectKey`, `prompt`, optional `expiresAt`"],
            ["`get`", "Returns the current notice.", "`projectKey`"],
            ["`delete`", "Removes the notice.", "`projectKey`"],
            ["`list`", "Lists the service desks the app can see, with their project keys.", "none"],
          ],
        },
        {
          type: "code",
          label: "Set a notice, with an expiry",
          text: `curl -X POST "<API Endpoint>" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "action": "set",
    "projectKey": "SD",
    "prompt": "Website down for maintenance until Feb 12 at 14:00 UTC",
    "expiresAt": "2026-02-12T14:00:00Z"
  }'`,
        },
        {
          type: "code",
          label: "Clear it when the incident closes",
          text: `curl -X POST "<API Endpoint>" \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{ "action": "delete", "projectKey": "SD" }'`,
        },
        {
          type: "callout",
          variant: "info",
          title: "It takes a project key, not a desk ID",
          text: "Pass the Jira **project key**, such as `SD` or `ITSD`. The app resolves it to the service desk itself. Run the `list` action once if you are not sure which keys it can see.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Treat the token as a password",
          text: "Anybody who has it can change what your assistant tells customers. If it might have leaked, click **Regenerate**. That invalidates the old token immediately, so update your integration at the same time.",
        },
        {
          type: "p",
          text: "You do not need this feature to use the app. If nobody is going to automate it, skip it and set notices by hand.",
        },
      ],
    },

    {
      slug: "branding",
      title: "Branding and the portal trigger",
      description: "How the assistant looks in your portal, and which trigger layout to choose.",
      blocks: [
        {
          type: "p",
          text: "**What this page is for.** Making the assistant look like part of your service, and deciding how visible it is.",
        },
        { type: "mock", id: "ap-branding" },
        {
          type: "table",
          head: ["Setting", "What it controls", "What we recommend"],
          rows: [
            [
              "**Trigger Layout**",
              "How the chat is offered in the portal header: **Compact** is a small pill on the right, **Banner** is a full-width bar with a button.",
              "Choose **Banner** if you want people to use it. Compact gets far fewer conversations because people do not notice it.",
            ],
            ["**Primary Color**", "Header, buttons and the customer's own messages.", "Your main brand colour."],
            ["**Secondary Color**", "Hover and accent colour.", "A lighter shade of the primary."],
            [
              "**Avatar Name**",
              "The name shown in the chat header.",
              "A short, human name. “Ava” reads better than “AI Assistant” and sets the right expectation.",
            ],
            ["**Avatar Image**", "The picture next to every assistant message.", "Any square image. A simple icon works better than a photo."],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Be honest that it is an assistant",
          text: "Customers behave better when they know. They write more directly, and they are far less annoyed when the conversation ends in a ticket. Give it a name, and let the welcome message make clear what it is.",
        },
      ],
    },

    {
      slug: "reference",
      title: "Permissions, data and limits",
      description: "What the app can access, what it stores, its limits, and what to check when something breaks.",
      blocks: [
        {
          type: "p",
          text: "This page is for you when something is not working, and for your security team when they ask what the app can reach.",
        },

        { type: "h", level: 2, text: "Limits worth knowing" },
        {
          type: "table",
          head: ["Limit", "Value"],
          rows: [
            ["Attachment size, per file", "5 MB"],
            ["Attachment size, per conversation", "10 MB"],
            ["Attachments at all", "Only when the request type accepts them"],
            ["Knowledge base scope", "Only the Confluence spaces you list, and only what the customer can already see"],
            ["Where AI runs", "Forge LLM, inside Atlassian, with Atlassian-hosted models"],
          ],
        },

        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "p",
          text: "Atlassian shows this list when you install. Each item is a scope; the app can do nothing outside it.",
        },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            ["`read:servicedesk-request`, `write:servicedesk-request`", "Read the customer's requests and create new ones."],
            [
              "`read:servicedesk:jira-service-management`, `read:requesttype:jira-service-management`",
              "List service desks and request types, and read which fields each one has.",
            ],
            ["`write:request:jira-service-management`", "Create the request and attach files to it."],
            ["`manage:servicedesk-customer`", "Identify the portal customer in the conversation."],
            ["`read:jira-work`, `write:jira-work`", "Read and write the underlying issue."],
            ["`read:jira-user`", "Resolve names of users and agents."],
            ["`search:confluence`, `read:space:confluence`", "Search the knowledge base spaces you listed."],
            ["`manage:jira-configuration`", "Read configuration needed by the admin screens."],
            ["`storage:app`", "Store the app's own data inside your site."],
          ],
        },
        {
          type: "p",
          text: "The only outside address the app may contact is `api.atlassian.com`, which is Atlassian itself.",
        },

        { type: "h", level: 2, text: "What the app stores" },
        {
          type: "fields",
          items: [
            {
              name: "Conversations",
              text: "The messages, the status, the desks and spaces the session could search, timestamps and any feedback. **Chat text is stored as written**, so if a customer types personal data into the chat, it is kept until the conversation is deleted or the app is uninstalled.",
            },
            { name: "Configuration", text: "Your instructions at all three levels, knowledge base spaces, branding, and the API token." },
            { name: "Statistics and audit entries", text: "Daily counters and a record of what the app did." },
          ],
        },
        {
          type: "p",
          text: "The [privacy policy](/privacy/ai-portal-chat) is the full, authoritative list, including exactly what goes into a prompt.",
        },

        { type: "h", level: 2, text: "Statistics, and how to read them" },
        { type: "mock", id: "ap-statistics" },
        {
          type: "p",
          text: "Pick a range with **Today**, **This Week**, **This Month** or **Custom**. The tab shows three counters and two charts, switchable between **Last 12 Weeks** and **Last 12 Months**.",
        },
        {
          type: "fields",
          items: [
            { name: "Conversations", text: "How many chat sessions happened in the range." },
            { name: "Tickets created", text: "How many of those ended in a request being created." },
            { name: "Feedback", text: "Thumbs up and thumbs down counts from the end of conversations." },
            { name: "Charts", text: "**Tickets Created** and **Conversations** per ISO week." },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "The number to watch is the gap between the first two",
          text: "Conversations minus tickets created is roughly your deflection: questions the assistant answered without adding to your queue. The app does not calculate it for you, but the two counters sit side by side. Track the ratio month to month, because that is the figure that justifies the app.",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "The chat does not appear in the portal",
              text: "The desk is not enabled. Open **Portal Assistant**, select that service desk, and check **Enable AI Portal Chat**. Also confirm you are looking at the desk you configured.",
            },
            {
              name: "It never uses the knowledge base",
              text: "Three things to check: **Enable Knowledge Base Search** is on for that desk, the space keys are correct, and the customer can actually open those Confluence pages.",
            },
            {
              name: "Attachments are refused",
              text: "Either the file is over 5 MB, the conversation total is over 10 MB, or the request type does not accept attachments. The assistant says which.",
            },
            {
              name: "It picks the wrong request type",
              text: "Add request type instructions that say what each type is for, especially for two types that overlap. This is the same fix as for a confusing portal menu, written once in one place.",
            },
            {
              name: "It mentions an outage that is over",
              text: "An operational notice with no expiry. Clear it on the project's **Agent Instructions** page and set **Auto-expire** next time.",
            },
          ],
        },
        {
          type: "p",
          text: "Still stuck? [Open a ticket](https://synapseoasis.atlassian.net/servicedesk/customer/portals) with the service desk name, roughly when the conversation happened, and what you expected.",
        },
      ],
    },

    {
      slug: "faq",
      title: "FAQ",
      description: "The questions people ask before installing, and the ones security reviews always ask.",
      blocks: [
        { type: "h", level: 2, text: "Data and security" },
        {
          type: "fields",
          items: [
            {
              name: "Does customer data leave Atlassian?",
              text: "No. The app runs on Atlassian Forge and the only outside address it may contact is `api.atlassian.com`. See [Where your data goes](/documentation/start-here/your-data).",
            },
            {
              name: "Which AI provider do you use? Do I need an API key?",
              text: "Atlassian's own Forge LLM service, with models Atlassian hosts. You need no API key and no account with any AI vendor.",
            },
            {
              name: "Is our data used to train a model?",
              text: "No. We do not train models, and we hold no keys to third-party AI providers.",
            },
            {
              name: "Where are the conversations stored, and for how long?",
              text: "In the app's storage inside your own Atlassian site, until the conversation is deleted or the app is uninstalled. Everything is deleted on uninstall.",
            },
            {
              name: "Can the assistant show a customer something they should not see?",
              text: "Knowledge base search runs with the signed-in customer's own permissions, on top of the space list you configured. It cannot return an article they could not open themselves.",
            },
          ],
        },

        { type: "h", level: 2, text: "What it can and cannot do" },
        {
          type: "fields",
          items: [
            {
              name: "Does it work with team-managed projects?",
              text: "It works with Jira Service Management projects that have a customer portal. The features it configures — request types, portal, knowledge base — are JSM features, not company-managed-only Jira features.",
            },
            {
              name: "Does it replace my portal?",
              text: "No. The portal stays exactly as it is. The assistant is an additional way in, for people who do not know which request type to pick.",
            },
            {
              name: "Which languages does it handle?",
              text: "It answers in the customer's language when you tell it to in the global instructions. The admin interface itself ships in English, Portuguese, Spanish, French, German, Italian and Japanese.",
            },
            {
              name: "Can it update an existing request instead of creating a new one?",
              text: "It works with the customer's requests and can act on them, but its main job is answering questions and creating the right request. Use your normal portal flow for long follow-up threads.",
            },
            {
              name: "Can I stop it creating tickets in a specific request type?",
              text: "Yes. Only the request types of enabled desks are available to it, and your instructions can tell it which ones to avoid and what to do instead.",
            },
          ],
        },

        { type: "h", level: 2, text: "Rollout and cost" },
        {
          type: "fields",
          items: [
            {
              name: "Can I try it on one service desk only?",
              text: "Yes, and you should. Enablement is per service desk. Nothing happens on desks you have not enabled.",
            },
            {
              name: "What happens if I turn it off?",
              text: "The chat disappears from the portal. Requests it already created stay in Jira, because they are ordinary Jira issues.",
            },
            {
              name: "What happens when I uninstall?",
              text: "The app's stored data is cleared and detached immediately, so nobody can read it any more — then Atlassian destroys it under its own retention policy, documented as 28 days. See [Where your data goes](/documentation/start-here/your-data). That includes the conversations. Issues and comments the assistant created stay in Jira.",
            },
            {
              name: "Do customers need a licence?",
              text: "No. Portal customers do not consume a Jira Service Management agent licence, and the app does not change that.",
            },
            {
              name: "How do I prove it is working?",
              text: "The **Statistics** tab. Look at conversations that ended without a ticket, and at how many requests were created with complete fields.",
            },
          ],
        },
      ],
    },
  ],
};
