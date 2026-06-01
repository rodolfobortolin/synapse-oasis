# Turn Jira Fields Into Guardrails, Not Just Data Entry

**Most custom fields only collect data. The best ones quietly enforce the process you actually want people to follow.**

---

## A field is a chance to shape behavior

Every custom field on a Jira issue is a small decision about how work should happen. A free-text box says *"type whatever you want."* A well-designed field says *"here's the right way to do this — and I'll help you get it right."*

The difference between a form that **collects** data and one that **guides** the process is enormous. One gives you fields to clean up later; the other gives you clean data and a followed process by default.

**Custom Fields Toolkit for Jira** ships three field types built for the second kind of form.

## 1. Checklists that block "Done" until the work is actually done

A checklist on its own is just a to-do list. Pair it with a **transition gate** and it becomes process enforcement.

The toolkit's **Checklist** field tracks items and progress on the issue — Definition of Done, a deployment pre-flight, an onboarding sequence, a change-approval list. Then the **Checklist Completion Validator** sits on your workflow transition and **blocks the move** until the checklist is satisfied.

You decide how strict the gate is:

- **All items** must be checked, or
- only the **mandatory** items, or
- **at least N** of them.

The result: nobody drags a ticket to *Done* with half the steps skipped. The process isn't a wiki page people are supposed to remember — it's built into the transition itself, with progress visible right on the issue.

## 2. Issue Pickers that capture real relationships, not typed-in keys

"Which incident is this linked to?" "What service does this affect?" "Which stories does this depend on?"

When the answer lives in a **free-text field**, you get inconsistent keys, typos, and relationships you can't report on. When it lives in the toolkit's **Issue Picker** field, users choose from a **JQL-filtered list** — so they can only pick issues that actually qualify (the right project, type, status, or component). Selections can **auto-link** the issues when the ticket is created, turning a vague mention into a structured, reportable relationship.

You stop chasing "what was this related to again?" because the relationship was captured correctly at the source.

## 3. Masked Inputs that keep data clean at the point of entry

Phone numbers, asset tags, account codes, reference numbers — the data that's only useful if it's *consistent*. The **Masked Input** field applies a live input mask and validation preset as the user types, so the value is formatted correctly before it's ever saved. Bad formats simply can't be entered.

It's the difference between validating data at entry and cleaning it up in a spreadsheet three months later.

## Designing the process, not just the form

Used together, these fields let you design the *behavior* you want, not just the data you'll collect:

- An **Issue Picker** captures the dependency or affected service — accurately.
- **Masked Inputs** keep identifiers and codes consistent.
- A **Checklist + Validator** makes sure the required steps are genuinely complete before the issue can advance.

The form stops being a passive container and starts being a set of guardrails — guiding people toward the right outcome and refusing the wrong one.

## How it works

**Custom Fields Toolkit for Jira** runs entirely on Atlassian Forge — no external infrastructure, no data leaving your tenant. Add the **Issue Picker**, **Checklist**, or **Masked Input** field like any custom field, attach the **Checklist Completion Validator** to the transitions you want to gate, and configure each field per project.

Your fields stop being places to type things and start being the quiet system that keeps your process on track.
