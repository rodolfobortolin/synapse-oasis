import type { AppDocs } from "../types";

export const workflowToolkit: AppDocs = {
  slug: "workflow-toolkit",
  name: "Workflow Toolkit for Jira",
  shortName: "Workflow Toolkit",
  tagline:
    "Three workflow rules written in plain English. A condition the AI compiles into a Jira expression you can read and edit, a validator that judges the live issue on every transition and blocks it with your own message, and a post function that acts once the transition is through.",
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
              "**The message you wrote.** The transition is refused and Jira shows your **Error message** — see [AI Validator](/documentation/workflow-toolkit/ai-validator).",
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
          text: "Prefer the **condition** when the rule can be settled by looking at field values: it compiles to a Jira expression once, and after that every transition is a deterministic check with no AI call and no latency. Use the **validator** when the rule needs judgement about what the issue actually says — and when you need a hard block on every path into the transition, including Jira Automation and REST API calls. Both explain themselves to the user; the condition by removing the button, the validator by showing the message you wrote.",
        },

        { type: "h", level: 2, text: "What the AI actually does, and when" },
        {
          type: "p",
          text: "This matters for trust, for latency and for your bill, so it is worth being precise. **The three modules do not work the same way**, and the difference is the single most useful thing on this page.",
        },
        {
          type: "fields",
          items: [
            {
              name: "Condition: AI runs once, at setup",
              text: "You write a sentence, the app turns it into a Jira expression, and **the expression is stored in the workflow**. Every transition after that is evaluated by Jira itself. No AI call happens when a user opens the issue, so behaviour is deterministic and fast, and you can read — and edit — the exact rule being applied.",
            },
            {
              name: "Validator: AI runs on every transition",
              text: "There is no expression. The app sends the live issue and your natural-language rule to the model each time somebody attempts the transition, and blocks it when the verdict is *not allowed*. That buys judgement an expression cannot express, and it costs a model call inside the user's click.",
            },
            {
              name: "Post function: AI runs on every transition",
              text: "The action depends on the issue, so the AI is called when the transition happens. It works as an agent: it can call several tools and repeat them in a loop, up to **20 iterations** per run, and it can only use the tools you enable.",
            },
          ],
        },
        {
          type: "diagram",
          label: "flowchart",
          caption:
            "Where each module sits in one transition. Only the condition is answered without a model call — the other two run inside the click.",
          text: `flowchart TD
    U[User opens the issue] --> C{"AI Condition<br/>Jira evaluates the<br/>stored expression"}
    C -->|false| H[Button not drawn]
    C -->|true| B[User clicks the transition]
    B --> V{"AI Validator<br/>model judges the<br/>live issue"}
    V -->|blocked| M["Your Error message<br/>is shown"]
    V -->|allowed| T[Transition happens]
    T --> P["AI Post Function<br/>agent runs the tools<br/>you enabled"]

    classDef ai fill:#EAE6FF,stroke:#5E4DB2,color:#172B4D
    classDef stop fill:#FFECEB,stroke:#AE2E24,color:#172B4D
    classDef go fill:#DFFCF0,stroke:#216E4E,color:#172B4D
    class V,P ai
    class H,M stop
    class T go`,
        },
        {
          type: "p",
          text: "The AI is Atlassian's **Forge LLM** with Atlassian-hosted Claude models. No API key, no outside provider, nothing used for training. Expression generation uses a larger model than the validator and post function, because generating a rule once deserves more care than running it. See [Where your data goes](/documentation/start-here/your-data).",
        },

        { type: "h", level: 2, text: "What you need first" },
        {
          type: "list",
          items: [
            "**Jira administrator** rights, to edit and publish workflows.",
            "A **company-managed** project. The three modules declare `projectTypes: company-managed` in the manifest, so Jira does not offer them in a team-managed project at all. That is a deliberate restriction, not an oversight: team-managed support has not been verified on a real site, and Atlassian's own list of team-managed workflow rules does not mention Marketplace rules.",
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
          text: "Every module fails open. The condition falls back to the literal `true` when no expression is stored; the validator allows the transition when it finds no rule, and also when the AI call itself fails; the post function simply does nothing. So a module that was added but never configured — or whose configuration failed to save — silently permits every transition. That looks exactly like “the app is not installed”, which is why it is worth opening a saved rule to confirm it is really there.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Configuration is limited to 32 KB",
          text: "Jira caps what a workflow rule may store at 32 KB, and going over makes the save fail. The panel warns you before you click **Add** or **Update**. In practice only a very long instruction plus a long list of custom fields gets near it.",
        },

        { type: "h", level: 2, text: "Reading a rule without editing it" },
        {
          type: "p",
          text: "When Jira opens a configured module in view mode, the app shows a read-only summary: the module type, the rule description, the generated Jira expression and the AI's explanation of it for a condition, the error message for a validator, the context sources, the custom fields involved, your instruction text and the enabled tools. Use it to audit what a workflow is doing without risking a change.",
        },

        { type: "h", level: 2, text: "What happens without an active licence" },
        {
          type: "p",
          text: "Licensing is enforced, and for this app the enforcement had to be designed rather than switched on. The three modules run **inside a customer's transition**, so the usual answer — refuse the work — would have meant refusing somebody's transition. The behaviour differs per module, and an administrator wondering why a rule stopped taking effect should read this table before looking for a broken rule.",
        },
        {
          type: "table",
          head: ["Module", "Without an active licence", "Why"],
          rows: [
            [
              "**AI Condition**",
              "**Unaffected. It keeps working.**",
              "There is no app code to gate. The generated Jira expression is saved into the workflow and Jira evaluates it itself, exactly like a built-in condition, so nothing of ours runs at transition time.",
            ],
            [
              "**AI Validator**",
              "**Allows the transition.** It does not block, and no model is called.",
              "A validator that kept blocking after a trial expired would freeze the customer's workflow over a subscription they no longer have — and they could not even transition an issue to sort it out. Losing a guardrail is recoverable; a frozen process on a Monday morning is an incident.",
            ],
            [
              "**AI Post Function**",
              "**Does nothing at all.** No model call, no comment, no field change, no sub-task.",
              "A post function writes to issues. Continuing to change a customer's data after their licence lapsed is worse than the lost revenue, because nobody can tell what is doing it.",
            ],
          ],
        },
        {
          type: "p",
          text: "Both skips are written to the [audit log](/documentation/workflow-toolkit/reference), so “why did my rule stop firing?” has an answer on the screen. Everything else stays available: the admin page and its audit log, the CSV export, and opening, reading and editing every saved rule. Nothing is deleted and nothing is locked — restoring the licence restores the behaviour with no reconfiguration.",
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
              "**Custom Fields Involved**",
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
            "**Use the exact field names from Jira**, and add every *custom* field you mention to **Custom Fields Involved**. “Story Points” works. “the estimate” does not.",
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
              "Refinement is finished before work starts. Add **Story Points** and **Team** to Custom Fields Involved; assignee is a system field and needs no entry.",
            ],
            ["Allow only if the issue has at least one label and the Due Date is in the future.", "Basic hygiene on planned work. Both are system fields, so Custom Fields Involved stays empty."],
            ["Allow only when Root Cause and Impact are both filled in.", "A post-incident review that cannot be skipped. Add both custom fields to Custom Fields Involved."],
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
      description: "A hard block on the transition, judged by the AI on every attempt, with the refusal message you wrote.",
      blocks: [
        {
          type: "p",
          text: "**What it does.** The user clicks the transition. The app sends the live issue and your rule to the AI, and if the verdict is *not allowed* the transition is refused and Jira shows the message you wrote.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "This one runs the AI inside the user's click",
          text: "Unlike the [AI Condition](/documentation/workflow-toolkit/ai-condition), the validator generates no expression. There is a model call on **every attempt at the transition**, by anybody, on any path — a person, Jira Automation, another app, the REST API. That is what buys it judgement a Jira expression cannot express, and it is also what it costs: latency inside the user's click, and a model call each time. Where a rule can be settled by comparing field values, the condition is the cheaper and more predictable answer.",
        },
        { type: "mock", id: "wt-validator-config" },

        { type: "h", level: 2, text: "The fields, one by one" },
        {
          type: "table",
          head: ["Field", "What it is for", "How to fill it in"],
          rows: [
            [
              "**Rule Description**",
              "A short label, shown in the workflow editor's validator list.",
              "Write it for the next administrator. “Description and components required before review” beats “AI validator 1”.",
            ],
            [
              "**Context Data**",
              "What the AI may read beyond the issue's basic fields: change history, attachment metadata, comments, and named custom fields.",
              "The same four toggles as the post function, and the same advice: add only what the rule needs. The base context that is always sent is listed on the [AI Post Function page](/documentation/workflow-toolkit/ai-post-function).",
            ],
            [
              "**Validation Rule (Natural Language)**",
              "The rule itself. The AI checks it against the issue every time the transition runs.",
              "Say when the transition should be allowed, or when it should be blocked, or both — this field takes either, unlike the condition, which wants the allowing case. The placeholder shows the mixed form: “Block the transition if the description is empty or if no components are selected. Allow if the issue has at least one label.”",
            ],
            [
              "**Error message**",
              "**The exact text the user sees when the transition is blocked.**",
              "This is the field that makes a validator usable. Tell the person what to fix, not which rule fired. Leave it empty and the app fills in a default that names the module but not the remedy.",
            ],
            [
              "**Test Rule**",
              "Runs the rule against a real issue and reports whether the AI would allow or block it, and why.",
              "Always use it, with one issue that should pass and one that should fail. When the verdict is *blocked*, the result also shows the exact message the user would have seen.",
            ],
          ],
        },
        { type: "mock", id: "wt-validator-blocked", caption: "What a blocked user sees: the Error message field, verbatim." },
        {
          type: "callout",
          variant: "info",
          title: "The AI's reason is not what the user is shown",
          text: "The model produces a reason for each verdict, and that reason goes to the [audit log](/documentation/workflow-toolkit/reference) — it is the answer to “why was *this* transition blocked?”. What the **user** sees is your fixed **Error message**, the same text every time. The split is deliberate: the reason is AI prose about the issue's contents, and that belongs in an administrator's record rather than in a dialog in front of whoever clicked the button.",
        },

        { type: "h", level: 2, text: "Writing a rule the validator applies well" },
        {
          type: "list",
          items: [
            "**Name fields the way Jira does.** The AI reads the real issue, so it sees real field names; a rule about “the estimate” is a rule about nothing in particular.",
            "**Describe the passing case as well as the blocking one.** A rule with only a block clause leaves every other situation to inference.",
            "**One requirement per validator.** Two unrelated checks are easier to debug — and easier to explain — as two validators with two error messages.",
            "**Write the error message at the same time as the rule.** They are the same thought, and the message is the half the user actually reads.",
          ],
        },

        { type: "h", level: 2, text: "It fails open, on purpose" },
        {
          type: "p",
          text: "Three situations make the validator allow a transition it might otherwise have blocked. All three are deliberate.",
        },
        {
          type: "list",
          items: [
            "**No rule is saved.** There is nothing to evaluate, so nothing is refused.",
            "**The AI call failed.** A broken model call must not freeze every transition on the workflow. The failure is recorded in the audit log as *Validator Failed* rather than swallowed.",
            "**There is no active licence.** The transition is allowed, no model is called, and the skip is written to the audit log — see [What happens without an active licence](/documentation/workflow-toolkit/overview).",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "So this is a guardrail, not a guarantee",
          text: "If the requirement is one you have to be able to prove was enforced on every single issue, a rule that passes when the model is unavailable is not the mechanism to prove it with. Use a required field or a built-in validator for that, and use this one for the judgement a field cannot make.",
        },

        { type: "h", level: 2, text: "When a validator is the right choice" },
        {
          type: "list",
          items: [
            "**You need the block to be unavoidable.** A condition only hides a button. A validator refuses the transition on every path, including Jira Automation, other apps and REST API calls.",
            "**The rule needs reading, not comparing.** “The description actually explains how to reproduce it” is a validator. “Story Points is not empty” is a condition.",
            "**You are protecting a status**, such as Done or Closed, where a wrong move is expensive to unwind.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Automation is subject to validators too",
          text: "Anything that transitions the issue goes through the validator: Jira Automation, other Marketplace apps, REST API calls. If an automation rule starts failing after you add a validator, the validator is doing its job on data the automation never had to supply before — and your **Error message** is the text that surfaces in the automation's error, so write it to be useful there as well. Either make the automation set that data, or restrict the validator to the transitions humans use.",
        },
        {
          type: "callout",
          variant: "info",
          title: "You can use both on one transition",
          text: "A condition for **who** may move the issue, a validator for **what** the issue must contain. They are evaluated independently, and the condition comes first: its expression decides whether the button is drawn at all.",
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
              "Labelled “Last 50 changelog entries” on the screen, which is what the backend takes.",
            ],
            [
              "**Comments**",
              "The 20 most recent comments, newest first.",
              "Labelled “Last 20 comments” on the screen, which is what the backend takes.",
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
        { type: "h", level: 2, text: "When a run fails" },
        {
          type: "p",
          text: "A post function can never block a transition, so a failed run still completes the transition. What it does not do any more is fail quietly.",
        },
        {
          type: "fields",
          items: [
            {
              name: "Comment on the issue when a run fails",
              text: "A toggle in the **When a Run Fails** section, **on by default**. It adds an **internal** comment naming the transition and the error, so the failure is visible on the issue rather than only in the audit log. On a service project the comment is not shared with the customer. Turn it off only if you are watching the audit log instead.",
            },
            {
              name: "Every failure reaches the audit log",
              text: "Successful and failed runs alike are recorded at **Jira → Apps → Workflow Toolkit**, with the transition and the error. See [the reference page](/documentation/workflow-toolkit/reference).",
            },
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "An individual tool failure is still quiet",
          text: "The two mechanisms above cover a run that throws. A single **tool** that fails is handled differently: the agent is told the call failed and carries on with the rest of its plan, so the run can finish and be recorded as a success having done only part of what you asked. “Some of it happened” is a real outcome, and the issue itself is where you see it. Test on a scratch project before you rely on it.",
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
            ["Saved configuration, per rule", "32 KB — Jira's limit, warned about before you save"],
            ["Audit retention", "90 days. No per-day cap: one row per event."],
            ["Audit events shown at once", "2,000, with a warning when there are more"],
            ["AI retries", "Two, on a transient failure. A content-moderation refusal is not retried."],
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
            ["`storage:app`", "The app's own storage. The audit trail itself lives in **Forge SQL**, one row per event."],
            [
              "`report:personal-data`",
              "Atlassian's Personal Data Reporting cycle, which the app now genuinely runs: once a day it walks its own storage for account IDs and reports what it finds, then erases anything belonging to an account Atlassian reports as closed. Today it finds none — see below.",
            ],
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
              "**The app**, in Forge SQL",
              "One row per event: what ran, when, on which issue key, the transition, the validator's reason or the generated expression, and the token usage of each AI call. Deleted after 90 days.",
            ],
          ],
        },
        {
          type: "p",
          text: "Full detail in the [privacy policy](/privacy/workflow-toolkit).",
        },

        { type: "h", level: 2, text: "The audit log, at Jira → Apps → Workflow Toolkit" },
        {
          type: "p",
          text: "The app ships one admin page, and it is read-only: a record of what the condition, validator and post function did. It is the place that answers **“why was this transition blocked?”** and **“what did the post function change?”** — and, since licensing was enforced, **“why did my rule stop taking effect?”**.",
        },
        {
          type: "table",
          head: ["Column", "What it holds"],
          rows: [
            ["**Date/Time**", "When the event happened. The table is sorted newest first."],
            ["**Event**", "Condition Generated, Validator Executed, Validator Failed, Post Function Executed, Post Function Failed, LLM Request."],
            ["**Issue**", "The issue key, linked. Blank for events that are not about one issue."],
            ["**Transition**", "The transition name, or *from → to* when the event did not carry a name."],
            [
              "**Reason / Expression**",
              "For a validator, the AI's reason for allowing or blocking — this is the field that answers *why*. For a condition, the expression that was generated.",
            ],
            ["**Tokens**", "What the AI call cost, split into prompt and completion in the CSV."],
          ],
        },
        {
          type: "p",
          text: "Filter by date range, by event type and by issue key, then **Export CSV** for the range you are looking at. The export carries the same columns the table shows and nothing more — it deliberately has no raw details column, because an export is the copy that gets mailed around.",
        },
        {
          type: "callout",
          variant: "info",
          title: "There is no “who did it” column, and that is honest",
          text: "Every event here is written by a background handler running inside a transition, not by a person clicking something in the app. The column that used to print “App (automated)” on every single row has been removed rather than left there implying the app knows who acted.",
        },

        { type: "h", level: 2, text: "Uninstalling" },
        {
          type: "p",
          text: "Uninstalling now erases. Earlier versions registered cleanup against a Forge event that does not exist, so the handler was never once invoked; it is a `preUninstall` module now, and it runs. It empties the audit table and deletes every key the app wrote, working to a 45-second budget and attempting each store even if the other fails.",
        },
        {
          type: "p",
          text: "Your rules travel with the workflow, because Jira stores them — so the modules stop working, but there is no rule configuration in our storage to delete. Anything a post function already wrote into Jira stays there. Export the audit CSV first if you need it. See [Where your data goes](/documentation/start-here/your-data).",
        },

        { type: "h", level: 2, text: "Troubleshooting" },
        {
          type: "fields",
          items: [
            {
              name: "The rule has no effect",
              text: "Check in this order. The workflow draft was not published. The module was added to a different transition than the one being used. The saved rule is empty — a condition with no expression falls back to `true`, and a validator with no rule allows. And, since licensing is enforced, **there is no active licence**: the validator then allows every transition and the post function does nothing, both recorded in the audit log. See [What happens without an active licence](/documentation/workflow-toolkit/overview).",
            },
            {
              name: "A rule stopped taking effect and nothing changed in the workflow",
              text: "Open **Jira → Apps → Workflow Toolkit** and look for skipped-unlicensed events on the transition. That is the app telling you the licence lapsed. The condition keeps working regardless, so a transition governed by both a condition and a validator will look half-broken rather than switched off.",
            },
            {
              name: "A transition disappeared for everyone",
              text: "An AI Condition is evaluating to false for every issue. Open its configuration, use **Validate Syntax** and then **Test with Issue** on a known-good issue, and read the generated expression. A field that is never populated is the usual cause.",
            },
            {
              name: "Generate Expression produced something wrong",
              text: "Add the custom fields to **Custom Fields Involved**, use Jira's exact field names, and split compound rules. Then edit the expression by hand — it is editable for exactly this reason, and the edited text is what runs.",
            },
            {
              name: "The validator blocks and the message is not helpful",
              text: "The user sees your **Error message** field, so rewrite that — it is the text a person reads at the moment they are stuck. To find out why *one particular* transition was refused, open the audit log: the AI's reason for that verdict is in the **Reason / Expression** column.",
            },
            {
              name: "The validator lets everything through",
              text: "It fails open in three cases: no rule saved, the AI call failed, or no active licence. The last two are both in the audit log, as *Validator Failed* and as a skipped-unlicensed event. If none of the three applies, use **Test Rule** on an issue you expect to be blocked and read the reason it gives.",
            },
            {
              name: "The post function did nothing",
              text: "Look at the issue for the internal failure comment, then at the audit log. If there is neither, the run itself did not happen: the licence, or an instruction whose condition was not met. If the run is recorded as executed but nothing changed, the tool the instruction needs is probably not enabled.",
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
              text: "It depends which module. **Conditions: no** — the AI generates a Jira expression once at setup and the expression is what runs. **Validators: yes** — the model judges the live issue on every attempt. **Post functions: yes**, because the action depends on the issue. Only the condition is free at transition time, which is a good reason to prefer it where it can do the job.",
            },
            {
              name: "Can I see and edit what the AI produced?",
              text: "For a **condition**, yes: the generated Jira expression is shown in an editable field with the AI's explanation underneath, and the edited text is the version that runs. Hand-editing it is expected. A **validator** produces no artefact to edit — it is your sentence, evaluated live — so what you tune there is the rule text, and the **Test Rule** box is how you check it.",
            },
            {
              name: "Which AI provider? Do I need an API key?",
              text: "Atlassian's Forge LLM, with Atlassian-hosted Claude models. No API key and no third-party provider. Expression generation uses a larger model than the validator and the post function, because generating a rule once deserves more care than running one.",
            },
            {
              name: "Does it read our attachments?",
              text: "Only the metadata — file name, type, size, uploader and upload date — and only if you enable that context source, on either the validator or the post function. File contents are never read.",
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
              name: "What does the user see when a validator blocks them?",
              text: "The **Error message** you wrote on that validator — the same text every time, so write it as an instruction rather than as a rule name. The AI's reason for that specific verdict is not shown to the user; it goes to the audit log.",
            },
            {
              name: "Can I see a log of what the app did?",
              text: "Yes, at **Jira → Apps → Workflow Toolkit**. It records every validator verdict with the reason behind it, every post function run and failure, every expression generated, and the token usage of each AI call. Filter it by date, event type and issue key, and export the range to CSV. Events are kept for 90 days.",
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
              text: "The app erases what it holds: it empties the audit table and deletes every key it wrote, then Atlassian detaches whatever is left and destroys it under its own retention policy — see [Where your data goes](/documentation/start-here/your-data). Your rules travel with the workflow because Jira stores them, so the modules stop working but the configuration is not in our storage to delete. Anything a post function already wrote into Jira stays there. Export the audit CSV first if you need it.",
            },
            {
              name: "What stops working if our licence lapses?",
              text: "The **validator allows** every transition and the **post function does nothing**, both recorded in the audit log. The **condition keeps working**, because its expression lives in the workflow and Jira evaluates it — there is no app code at transition time to switch off. Nothing is deleted, every rule stays readable and editable, the audit log and its CSV export stay open, and renewing restores the behaviour with no reconfiguration. The full reasoning is on the [overview page](/documentation/workflow-toolkit/overview).",
            },
            {
              name: "Why does an expired licence not just block everything?",
              text: "Because these modules run inside your users' transitions. A validator that kept refusing after a trial ended would freeze the workflow over a subscription you no longer have, and nobody could transition an issue to sort it out. A post function that kept writing would keep changing your issues with nothing on screen to explain it. So one passes and the other stops — the direction that fails safe in each case.",
            },
          ],
        },
      ],
    },
  ],
};
