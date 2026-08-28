import type { AppDocs } from "../types";

export const workflowToolkit: AppDocs = {
  slug: "workflow-toolkit",
  name: "Workflow Toolkit for Jira",
  shortName: "Workflow Toolkit",
  tagline:
    "Write a workflow rule in plain English and the app turns it into a Jira expression you can read and edit. Adds one condition, one validator and one post function to the Jira workflow editor.",
  products: "Jira · Jira Service Management",
  color: "#51A2E7",
  icon: "/workflow-toolkit.png",
  ai: true,
  pages: [
    {
      slug: "overview",
      title: "Overview and setup",
      description: "The three modules, which one to pick, and how to add them to a transition.",
      blocks: [
        {
          type: "p",
          text: "**What it is.** Three items you can add to a workflow transition. All three take a rule written in plain English. What differs is when they run and what they are allowed to do.",
        },
        {
          type: "p",
          text: "If the words *transition*, *condition*, *validator* or *post function* are new, read [Jira words used in these guides](/documentation/start-here/jira-words) first. It takes two minutes and this page will make sense afterwards.",
        },
        {
          type: "table",
          head: ["Module", "When it runs", "What the user sees"],
          rows: [
            [
              "**AI Condition (Workflow Toolkit)**",
              "Before the transition button is drawn",
              "Nothing. The button is simply not there when the rule is not satisfied.",
            ],
            [
              "**AI Validator (Workflow Toolkit)**",
              "When the user clicks the button",
              "Jira's own generic “transition failed” message. The transition does not happen, but the app does **not** supply a reason — see [AI Validator](/documentation/workflow-toolkit/ai-validator).",
            ],
            [
              "**AI Post Function (Workflow Toolkit)**",
              "After the transition succeeds",
              "The result: a comment appears, a field is filled in, a sub-task is created.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Condition or validator? Use this rule of thumb",
          text: "Prefer the **condition** for anything you would explain to a user, because you can hide a button but you cannot explain a refusal — this app's validator has no custom error message. Use the **validator** when you need a hard block on every path into the transition, including Jira Automation and REST API calls, and you accept that the user only sees a generic failure.",
        },

        { type: "h", level: 2, text: "What the AI actually does" },
        {
          type: "p",
          text: "This matters for trust, so it is worth being precise.",
        },
        {
          type: "fields",
          items: [
            {
              name: "Conditions and validators: AI runs once, at setup",
              text: "You write a sentence, the app turns it into a Jira expression, and the expression is stored in the workflow. Every transition after that evaluates the expression itself. No AI call happens when a user clicks the button, so behaviour is deterministic, fast, and you can read the rule that is being applied.",
            },
            {
              name: "Post functions: AI runs each time",
              text: "The action depends on the issue, so the AI is called when the transition happens. It works as an agent: it can call several tools and repeat them in a loop, up to **20 iterations** per run, and it can only use the tools you enable.",
            },
          ],
        },
        {
          type: "p",
          text: "The AI is Atlassian's **Forge LLM** with Atlassian-hosted Claude models. No API key, no outside provider, nothing used for training. See [Where your data goes](/documentation/start-here/your-data).",
        },

        { type: "h", level: 2, text: "What you need first" },
        {
          type: "list",
          items: [
            "**Jira administrator** rights, to edit and publish workflows.",
            "A project whose workflow you can edit in **Settings → Issues → Workflows**. We have validated the modules in **company-managed** projects; that is where the workflow editor these modules plug into lives.",
            "Nothing else to install — no API key, no third-party account, no other app.",
          ],
        },

        { type: "h", level: 2, text: "Add a module to a transition" },
        {
          type: "steps",
          items: [
            "Install the app.",
            "Go to **Jira → Settings → Issues → Workflows** and click **Edit** on the workflow.",
            "Select the transition you want to control.",
            "Choose **Conditions**, **Validators** or **Post functions**, then add the matching **(Workflow Toolkit)** entry.",
            "Fill in the configuration, described on the next pages, and click **Add**.",
            "**Publish the workflow.** Nothing takes effect until you do this.",
          ],
        },
        { type: "mock", id: "wt-workflow-editor" },
        {
          type: "callout",
          variant: "warning",
          title: "The configuration panel has no Save button",
          text: "That is not a bug, and the panel says so itself: your settings are stored when you click **Add** or **Update** in the workflow editor, and applied when you publish the workflow. If you close the panel another way, the rule is lost.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "An unconfigured module allows everything",
          text: "Both the condition and the validator fall back to `true` when no expression is stored. So a module that was added but never configured — or whose configuration failed to save — silently permits every transition. That looks exactly like “the app is not installed”, which is why it is worth opening a saved rule to confirm the expression is there.",
        },

        { type: "h", level: 2, text: "Reading a rule without editing it" },
        {
          type: "p",
          text: "When Jira opens a configured module in view mode, the app shows a read-only summary: the module type, the rule description, the generated Jira expression, the AI's explanation of it, the context sources, the custom fields involved, your instruction text and the enabled tools. Use it to audit what a workflow is doing without risking a change.",
        },
      ],
    },

    {
      slug: "ai-condition",
      title: "AI Condition",
      description: "Hide a transition until the issue is ready for it. Includes how to write rules that work.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** Hides the transition button until the issue meets your rule. Typical uses: an estimate is present, an owner is set, a checklist is complete, a parent issue is in the right status.",
        },
        { type: "mock", id: "wt-condition-config" },

        { type: "h", level: 2, text: "The fields, one by one" },
        {
          type: "table",
          head: ["Field", "What it is for", "How to fill it in"],
          rows: [
            [
              "**Rule Description**",
              "A short label, shown in the workflow editor's condition list.",
              "Write it for the next administrator: “Needs an estimate and an owner” beats “AI condition 1”. Leave it blank and the AI fills it in with a generated title when you click Generate.",
            ],
            [
              "**Fields Involved**",
              "The **custom** fields your rule refers to. The picker offers custom fields only, labelled `Name (customfield_NNNNN)`.",
              "Select every custom field you mention. This is what makes the generated expression use the real field ID. System fields such as assignee, labels, due date and priority are not in the picker and do not need to be — the generator already knows them.",
            ],
            [
              "**Condition Description (Natural Language)**",
              "The rule itself, in plain English.",
              "Describe when the transition is **allowed**. The generated expression must evaluate to true for the button to appear.",
            ],
            ["**Generate Expression**", "Calls Forge LLM once and writes the result below.", "Click it after filling in the three fields above."],
            [
              "**Generated Expression (editable)**",
              "The Jira expression that will actually run, plus the AI's plain-language explanation of what it checks.",
              "Read both. You can edit the expression by hand, and hand-editing is a perfectly good outcome. Note that clicking Generate again overwrites your edits.",
            ],
            [
              "**Test Expression**",
              "The section under the expression. The button reads **Validate Syntax** while the issue-key box is empty, and **Test with Issue** once you type a key.",
              "Always use it. Check the syntax, then test one issue that should pass and one that should fail. With a key, the app tells you the result and whether the transition would be shown.",
            ],
          ],
        },

        { type: "h", level: 2, text: "How to write a rule the generator handles well" },
        {
          type: "list",
          items: [
            "**Use the exact field names from Jira**, and add every *custom* field you mention to **Fields Involved**. “Story Points” works. “the estimate” does not.",
            "**Say what allows the transition**, not what blocks it. (The validator is the opposite — see that page.)",
            "**One rule per condition.** Two unrelated checks are much easier to debug as two conditions on the same transition.",
            "**Be explicit about empty values.** “Team must not be empty” generates a real check. “Team should be valid” generates nothing useful.",
          ],
        },
        {
          type: "table",
          head: ["Rule you write", "What it enforces"],
          rows: [
            [
              "Allow the transition only when Story Points is filled in, the assignee is set, and Team is not empty.",
              "Refinement is finished before work starts. Add **Story Points** and **Team** to Fields Involved; assignee is a system field and needs no entry.",
            ],
            ["Allow only if the issue has at least one label and the Due Date is in the future.", "Basic hygiene on planned work. Both are system fields, so Fields Involved stays empty."],
            ["Allow only when Root Cause and Impact are both filled in.", "A post-incident review that cannot be skipped. Add both custom fields to Fields Involved."],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Always test before publishing",
          text: "A condition that accidentally evaluates to false for every issue removes the transition for everybody. To your users that looks like a broken Jira, not a misconfigured rule, and you will hear about it from twenty people at once.",
        },
      ],
    },

    {
      slug: "ai-validator",
      title: "AI Validator",
      description: "A hard block on the transition — with an important limitation you should know before choosing it.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** The user clicks the transition, Jira evaluates your rule, and if it fails the transition is refused.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "The user is not told why",
          text: "This app's validator does not supply a custom error message. The user gets Jira's own generic transition-failure message, with no mention of your rule and no hint about which field to fix. If explaining the failure matters, use an [AI Condition](/documentation/workflow-toolkit/ai-condition) and hide the button instead, or use one of Jira's built-in validators that does carry a message.",
        },
        { type: "mock", id: "wt-validator-blocked" },

        { type: "h", level: 2, text: "Configuration: same fields, opposite polarity" },
        {
          type: "p",
          text: "The fields are the same as the [AI Condition](/documentation/workflow-toolkit/ai-condition) — rule description, fields involved, the rule in plain English, a generated expression you can edit, and a test box. **The polarity is not the same**, and this is the mistake to avoid.",
        },
        {
          type: "table",
          head: ["Module", "Field label", "Describe…"],
          rows: [
            ["AI Condition", "**Condition Description (Natural Language)**", "when the transition is **allowed**"],
            ["AI Validator", "**Validation Rule (Natural Language)**", "when the transition should be **blocked**"],
          ],
        },
        {
          type: "p",
          text: "The app prefixes your validator text with that framing before generating, and the generated expression still returns true for *allowed*. So “Block the transition if the description is empty” is the right way to write it here. Read the generated expression afterwards to confirm which way round you ended up.",
        },

        { type: "h", level: 2, text: "When a validator is still the right choice" },
        {
          type: "list",
          items: [
            "**You need the block to be unavoidable.** A condition only hides a button. A validator refuses the transition on every path, including Jira Automation, other apps and REST API calls.",
            "**The rule is about data that must exist**, and your team already knows the requirement — so a generic failure is enough of a reminder.",
            "**You are protecting a status**, such as Done or Closed, where a wrong move is expensive to unwind.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Automation is subject to validators too",
          text: "Anything that transitions the issue goes through the validator: Jira Automation, other Marketplace apps, REST API calls. If an automation rule starts failing after you add a validator, the validator is doing its job on data the automation never had to supply before — and because there is no message, the automation's error will be unhelpfully vague. Either make the automation set that data, or restrict the validator to the transitions humans use.",
        },
        {
          type: "callout",
          variant: "info",
          title: "You can use both on one transition",
          text: "A condition for **who** may move the issue, a validator for **what** the issue must contain. They are evaluated independently.",
        },
      ],
    },

    {
      slug: "ai-post-function",
      title: "AI Post Function",
      description: "Do something after the transition: summarise, comment, update fields, create sub-tasks, notify.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** After the transition succeeds, the app does what your instruction says, using only the tools you allow. It runs as an agent: it can call several tools and repeat them, up to **20 iterations** in one run, which is why “create one sub-task per acceptance criterion” works.",
        },
        {
          type: "p",
          text: "**Why it is different from Jira Automation.** Automation does exactly what you configured, step by step. This handles the cases where the action depends on reading the issue, for example “summarise everything that changed and comment with the summary”.",
        },
        { type: "mock", id: "wt-postfunction-config" },

        { type: "h", level: 2, text: "What the AI reads — including what you cannot switch off" },
        {
          type: "callout",
          variant: "info",
          title: "A base context is always sent",
          text: "Before your toggles are considered, every run includes the issue's key, summary, **full description text**, status, priority, issue type, assignee, reporter, resolution, labels, components, fix versions, time tracking, parent, sprint, the transition being performed, **the transitions currently available on the issue**, **all of its issue links**, **all of its sub-tasks** with summary, status and assignee, and your site's issue link types. For each custom field you select, its list of allowed values is sent too.",
        },
        {
          type: "p",
          text: "The four toggles add to that base. Keep them minimal anyway: less context is faster and more predictable.",
        },
        {
          type: "table",
          head: ["Source", "What it adds", "Note"],
          rows: [
            [
              "**Change History**",
              "The 50 most recent changelog entries: what changed, when and by whom.",
              "The configuration screen labels this “Last 20 changelog entries”. The backend takes 50.",
            ],
            [
              "**Comments**",
              "The 20 most recent comments, newest first.",
              "The configuration screen labels this “Last 10 comments”. The backend takes 20.",
            ],
            [
              "**Attachments**",
              "For each file: name, MIME type, size in KB, who uploaded it and when.",
              "**File contents are never read.**",
            ],
            ["**Custom Fields**", "The specific custom fields you select, by ID, plus their allowed values.", "The picker offers custom fields only."],
          ],
        },

        { type: "h", level: 2, text: "Instructions" },
        {
          type: "p",
          text: "Describe what should happen. Be explicit about conditions, because the instruction is followed literally: “if the issue is moving to Done, also set the resolution field” works; “handle the resolution appropriately” does not.",
        },

        { type: "h", level: 2, text: "Enabled Tools: what the AI may do" },
        {
          type: "p",
          text: "Nothing happens that a tool does not permit. If a tool is unchecked, the AI cannot use it even if your instruction asks for it — the call is refused as an unknown tool. Enable only what the instruction needs. The list appears in this order, with **Transition Issue first**:",
        },
        {
          type: "table",
          head: ["Tool", "What it can do", "Risk"],
          rows: [
            ["**Transition Issue**", "Move the issue to a different status.", "**High** — see the warning below"],
            ["**Add Comment**", "Add a comment to the issue.", "Low"],
            ["**Edit Issue**", "Change fields: summary, priority, labels, custom fields.", "Medium — it edits real data"],
            [
              "**Create Sub-task**",
              "Create sub-tasks under this issue. Unless the model names a type, it uses the project's **first** sub-task type.",
              "Low",
            ],
            [
              "**Search Issues (JQL)**",
              "Search issues to gather data before acting. Returns 10 results by default and never more than 50.",
              "Low, read-only",
            ],
            ["**Link Issues**", "Link issues: blocks, relates to, duplicates.", "Low"],
            [
              "**Create Issue**",
              "Create any issue type in any project, optionally linked back to the current one. If the link fails, the creation is still reported as a success.",
              "Medium — it can create work elsewhere",
            ],
            ["**Send Notification**", "Email the assignee, reporter, watchers or named users.", "Medium — people receive mail"],
            ["**Log Work**", "Add a worklog entry.", "Low"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Transition Issue can chain",
          text: "A post function that transitions the issue can trigger the post functions of the **next** transition. Enable it only when you intend that chain, and never in a way that can transition back to where it came from. That is an infinite loop with your name on it.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "A failing post function is silent",
          text: "If the run fails, the transition still succeeds and nothing marks the issue: no comment, no error, no flag. Individual tool failures are handled the same way — the agent is told the tool failed and carries on. So “nothing happened” is a real outcome you have to detect yourself, by looking at the issue. Test on a scratch project before you rely on it.",
        },

        { type: "h", level: 2, text: "Three examples that work" },
        {
          type: "fields",
          items: [
            {
              name: "Close-out summary",
              text: "Context: change history and comments. Instruction: summarise everything that changed and comment with the summary; if the issue is moving to Done, set the resolution. Tools: Add Comment, Edit Issue.",
            },
            {
              name: "Escalation follow-up",
              text: "Context: comments and the Impact field. Instruction: when the issue moves to Escalated, create a task in the incident project, link it as *relates to*, and notify the reporter. Tools: Create Issue, Link Issues, Send Notification.",
            },
            {
              name: "Refinement breakdown",
              text: "Context: the description and the Acceptance Criteria field. Instruction: create one sub-task per acceptance criterion. Tools: Create Sub-task.",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Test on a scratch project first",
          text: "Post functions write to Jira, and they fail quietly. Publish the workflow on a test project, transition a couple of issues, read what actually changed on them, and only then use it where it affects real work.",
        },
      ],
    },

    {
      slug: "reference",
      title: "Permissions, data and limits",
      description: "What the app can access, what it stores, its limits, and how to diagnose a rule that misbehaves.",
      blocks: [
        { type: "h", level: 2, text: "Limits worth knowing" },
        {
          type: "table",
          head: ["Limit", "Value"],
          rows: [
            ["Post function agent loop", "20 iterations per run"],
            ["Change history sent to the AI", "50 most recent changelog entries"],
            ["Comments sent to the AI", "20 most recent"],
            ["Attachment contents", "Never read — metadata only"],
            ["Search Issues (JQL) tool", "10 results by default, 50 maximum"],
            ["Audit events kept", "800 per day, deleted after 90 days"],
            ["Custom error message on the validator", "Not supported"],
          ],
        },

        { type: "h", level: 2, text: "Permissions the app requests" },
        {
          type: "table",
          head: ["Scope", "Why it is needed"],
          rows: [
            ["`read:jira-work`", "Read issue fields, comments, change history, links, sub-tasks and available transitions, and analyse or evaluate Jira expressions."],
            ["`write:jira-work`", "Perform the post function tools you enable: comments, field edits, sub-tasks, issues, links, worklogs, transitions."],
            ["`read:jira-user`", "Return display names for the assignee, reporter, comment authors and changelog authors inside the issue data the app reads."],
            ["`manage:jira-configuration`", "Required by Jira for an app that plugs into the workflow editor and evaluates Jira expressions."],
            ["`send:notification:jira`", "The **Send Notification** tool."],
            ["`storage:app`", "Store the app's own audit trail."],
            ["`report:personal-data`", "Declared for Atlassian's Personal Data Reporting cycle. The app stores no account ID, so the cycle runs and reports nothing."],
          ],
        },
        {
          type: "p",
          text: "The app declares **no external network access at all**. AI calls go to Forge LLM inside the Atlassian platform. Jira is read with the app's own access, not the acting user's.",
        },

        { type: "h", level: 2, text: "Where your rules are stored — and it is not here" },
        {
          type: "p",
          text: "This surprises people, so it is worth stating plainly.",
        },
        {
          type: "table",
          head: ["Data", "Stored by", "Notes"],
          rows: [
            [
              "Your rule configuration: description, rule text, generated expression, selected fields, context sources, enabled tools",
              "**Jira**",
              "It lives in the workflow definition, exactly like the configuration of any built-in condition. It travels with the workflow, and it is covered by Atlassian's own data handling.",
            ],
            [
              "Audit events",
              "**The app**",
              "One bucket per day: what ran, when, on which issue key, the transition name and counts. Also the expression text and title each time you click Generate, and the token usage of each AI call. 800 events a day, deleted after 90 days.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "There is no screen for the audit trail",
          text: "This version ships no admin page. The audit events exist in storage but nothing in the product displays them, so treat the issue itself — its comments, field changes and history — as your evidence of what a post function did.",
        },
        {
          type: "p",
          text: "Full detail in the [privacy policy](/privacy/workflow-toolkit).",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "The rule has no effect",
              text: "Almost always one of two things: the workflow draft was not published, or the module was added to a different transition than the one being used. Also open the saved rule and confirm the expression is actually there — an empty expression falls back to `true` and allows everything.",
            },
            {
              name: "A transition disappeared for everyone",
              text: "An AI Condition is evaluating to false for every issue. Open its configuration, use **Validate Syntax** and then **Test with Issue** on a known-good issue, and read the generated expression. A field that is never populated is the usual cause.",
            },
            {
              name: "Generate Expression produced something wrong",
              text: "Add the custom fields to **Fields Involved**, use Jira's exact field names, and split compound rules. Then edit the expression by hand — it is editable for exactly this reason, and the edited text is what runs.",
            },
            {
              name: "The validator blocks but nobody knows why",
              text: "Expected: there is no custom error message. Put the requirement in the transition name, or switch to a condition so the button is simply unavailable.",
            },
            {
              name: "The post function did nothing",
              text: "Failures are silent. Check the issue for evidence it ran; if nothing changed, the tool the instruction needs is probably not enabled, or the instruction was conditional and the condition was not met.",
            },
            {
              name: "A message about content moderation",
              text: "Forge LLM refused the prompt. Rephrase the rule or the instruction. The app retries transient AI failures twice before giving up, but a moderation refusal is not retried.",
            },
            {
              name: "An automation rule started failing",
              text: "A validator is refusing the transition your automation performs. Make the automation supply the required data, or scope the validator to human transitions.",
            },
          ],
        },
        {
          type: "p",
          text: "Include the workflow name, the transition and an issue key when you [open a ticket](https://synapseoasis.atlassian.net/servicedesk/customer/portals).",
        },
      ],
    },

    {
      slug: "faq",
      title: "FAQ",
      description: "Questions people ask before installing, and the ones security reviews always ask.",
      blocks: [
        { type: "h", level: 2, text: "How the AI is used" },
        {
          type: "fields",
          items: [
            {
              name: "Is the AI called every time somebody clicks a transition?",
              text: "For conditions and validators, no. The AI generates the expression once at setup; the expression is what runs. Post functions do call the AI at run time, because the action depends on the issue.",
            },
            {
              name: "Can I see and edit what the AI produced?",
              text: "Yes. The generated Jira expression is shown in an editable field, with the AI's explanation of it underneath, and the expression is the version that runs. Hand-editing it is expected.",
            },
            {
              name: "Which AI provider? Do I need an API key?",
              text: "Atlassian's Forge LLM, with Atlassian-hosted Claude models. No API key and no third-party provider. Expression generation uses a larger model than post functions, because generating an expression once deserves more care than running an action.",
            },
            {
              name: "Does it read our attachments?",
              text: "Only the metadata — file name, type, size, uploader and upload date — and only if you enable that context source. File contents are never read.",
            },
            {
              name: "What exactly is sent to the AI on a post function run?",
              text: "A base context that cannot be switched off, plus whatever you toggle on. The full list is on the [AI Post Function page](/documentation/workflow-toolkit/ai-post-function) and in the [privacy policy](/privacy/workflow-toolkit). If your issue descriptions contain sensitive text, read that list before enabling post functions.",
            },
            { name: "Does anything leave Atlassian?", text: "No. This app declares no external network access at all." },
          ],
        },

        { type: "h", level: 2, text: "Behaviour and limits" },
        {
          type: "fields",
          items: [
            {
              name: "Why does the validator not tell the user what is wrong?",
              text: "Because it does not support a custom error message. Jira shows its generic failure. Use a condition when the user needs to understand the rule.",
            },
            {
              name: "Can I see a log of what the app did?",
              text: "Not in the product. The app records an audit trail internally, but there is no screen to read it. Evidence of a post function's work is on the issue itself.",
            },
            {
              name: "Can I use it alongside Jira's built-in conditions?",
              text: "Yes. Add it next to them on the same transition. They are evaluated independently.",
            },
            {
              name: "Does it replace Jira Automation?",
              text: "No, and it should not. Use Automation for deterministic “when X then Y” rules. Use a post function when the action depends on reading the issue.",
            },
            {
              name: "Can it fire on an issue transitioned via the API?",
              text: "Yes. Conditions and validators apply to every transition, including API-driven ones. That is often what you want, and occasionally a surprise for an integration.",
            },
          ],
        },

        { type: "h", level: 2, text: "Operating it" },
        {
          type: "fields",
          items: [
            {
              name: "How do I roll this out safely?",
              text: "Build it on a test project, transition a few issues, and inspect what changed on them. Then publish it on one real workflow, not five.",
            },
            {
              name: "What if the AI generates a rule I disagree with?",
              text: "Edit the expression, or write it yourself. The generator is a starting point, not an authority.",
            },
            {
              name: "Can a non-administrator create these rules?",
              text: "No. Editing workflows requires Jira administrator rights, which is a Jira restriction rather than ours.",
            },
            {
              name: "What happens when I uninstall?",
              text: "The app's audit trail is cleared and detached immediately, then destroyed by Atlassian under its own retention policy — see [Where your data goes](/documentation/start-here/your-data). Your rules travel with the workflow because Jira stores them, so the modules stop working but the configuration is not in our storage to delete. Anything a post function already wrote into Jira stays there.",
            },
          ],
        },
      ],
    },
  ],
};
