# 1,916 Custom Fields Turned a 2-Second Action Into a 13-Second One. That's Configuration Debt.

**Every unused field, workflow, and scheme you never deleted is a tax your whole company pays on every click — and in 2026, Atlassian starts enforcing the limit.**

---

No one decides to make Jira slow. It happens one reasonable request at a time. A team needs "just one more field." A project lead wants "a slightly different workflow." A new business unit gets "its own scheme so we don't break anything." Each change is defensible in isolation. Compounded over five years and a few hundred projects, they become configuration debt: redundant statuses, near-duplicate workflows, orphaned schemes, and a custom field list no human has ever read to the bottom of.

The cost is real, it's measurable, and unlike most technical debt, Atlassian has now put a hard deadline on it. Starting in 2026, Jira Cloud begins **enforcing** data limits that used to be polite suggestions. This article lays out what the bloat actually costs, why it persists, and how to run continuous health checks before the cleanup becomes mandatory instead of optional.

---

## The 13-Second Issue: What Bloat Costs at the Click Level

The most concrete number in this entire topic comes from Atlassian's own support engineering. On a real customer production instance with **1,916 indexed custom fields** — 380 of which carried default values — simply creating an issue took **12 to 13 seconds**. After the unused fields were removed from the issue's context, the same action dropped to **~2 seconds**.

That is a 6x latency penalty on one of the three most frequent actions in all of Jira, caused entirely by fields that weren't even being used. As [Atlassian's support documentation](https://support.atlassian.com/jira/kb/how-to-assess-the-impact-of-too-many-custom-fields-in-jira-and-how-to-resolve-it/) puts it, fields with default values "add an overhead in Jira to persist and load the field values at every operation, even if they're not really used by the Issue."

This isn't an edge case. In Atlassian's own performance testing across eight different variables, [the number of custom fields had the single greatest effect on average response times](https://confluence.atlassian.com/enterprise/managing-custom-fields-in-jira-effectively-945523781.html). When they benchmarked instances with **1,400 versus 2,800 custom fields**, the larger instance showed significant slowdowns specifically in *Add Comment*, *Create Issue*, and *Edit Issue* — the three actions users spend most of their time on.

The math is brutal in its ordinariness. A two-second delay multiplied across thousands of issue operations per day, across every user, every working day, is not a UX annoyance. It's a productivity line item.

---

## Atlassian's Own Thresholds: You Are Probably Past Them

Atlassian publishes explicit guidance for how many custom fields a healthy instance should carry. For [Jira Data Center](https://confluence.atlassian.com/spaces/ENTERPRISE/pages/1488597907/Managing+number+of+custom+fields+in+Jira+Data+Center), the bands are:

| Custom field count | Atlassian's assessment |
|--------------------|------------------------|
| Less than 800 | Optimal |
| 800 – 1,200 | Warning zone |
| More than 1,200 | Performance concern |

These aren't hard limits — they're the point at which "your site will begin to experience degraded performance," in Atlassian's words. The trouble is that most mature enterprise instances blow past 800 fields without anyone noticing, because no single addition crosses the line. The line is crossed cumulatively, by people who each added one field and moved on.

And custom fields are only the most-measured symptom. The same accretion happens to:

- **Workflows** that were cloned "to be safe" and then diverged into dozens of near-identical variants.
- **Statuses** that mean the same thing with different names — "In Progress," "In Dev," "Working," "Started" — fragmenting every cross-project report.
- **Schemes** (workflow, permission, notification, issue type, field configuration) that pile up faster than anyone retires them.
- **Priorities, resolutions, and issue types** that no active project actually uses but that still clutter every dropdown and every JQL query.

Every one of these makes the system, in the words of the Atlassian community's own admins, "a little harder to understand, support, and evolve."

---

## In 2026, the Suggestions Become Rules

For years, configuration cleanup was something admins *should* do. That changes this year. Atlassian has announced [new enforced data limits for Jira Cloud](https://community.atlassian.com/forums/Enterprise-articles/Empowering-Jira-admins-to-optimize-usability-at-scale/ba-p/3098575), citing the same root cause: "This growing data can also lead to slower performance, making it harder for teams to be efficient."

The headline numbers, per the [official limits and guardrails documentation](https://support.atlassian.com/jira-cloud-administration/docs/data-limits-and-guardrails/):

- **700 fields per project (space)** — a hard, software-enforced ceiling. Exceed it and you are *prevented* from associating additional fields until you reduce your data.
- **150 work types per project (space)** — likewise enforced.
- Cloud's optimizer already flags spaces that reach **75% of the 700-field limit (525 fields)** as needing attention, and a separate Jira insight surfaces once your total custom fields exceed **24,000**.

Enforcement of the 700-field and 150-work-type limits begins in **March 2026**, with [an additional set of limits and guardrails arriving in September 2026](https://community.atlassian.com/forums/Enterprise-articles/Growing-our-investment-in-a-faster-cleaner-Jira/ba-p/3205375) covering data types such as field options, workflows per space, and statuses per workflow. The distinction matters: a *guardrail* is a recommendation you can exceed at your own performance risk; a *limit* is a wall. Teams that have been ignoring the guardrails are about to meet the walls — often at the worst possible moment, when they're mid-sprint and trying to add a field to ship something.

---

## Why Configuration Debt Always Wins

If the cost is this clear, why does every long-lived Jira instance end up bloated? Three structural reasons:

### 1. Adding is one click. Deleting is a research project.

Creating a custom field takes seconds and requires no justification. *Removing* one safely means answering: Which projects use it? Which screens? Which workflows reference it in a condition? Which automation rules read it? Which dashboards and saved filters break if it disappears? That investigation can take hours per field — so it never happens, and the field lives forever.

### 2. The damage is diffuse; the request is specific.

The person asking for a new workflow has a concrete, urgent need. The cost — a fraction of a second added to everyone's page loads, one more row in everyone's dropdowns — is spread invisibly across thousands of people who will never connect their sluggish Jira to that decision. There's no feedback loop, so the incentive always favors "yes."

### 3. Governance decays without continuous measurement.

Most teams audit configuration exactly once — during a migration, an upgrade, or a painful performance incident. Atlassian community guidance is blunt about the result: without ongoing guardrails, "every team starts customizing, and Jira turns into a Frankenstein's monster of workflows." A one-time cleanup is a haircut; the hair grows back. What governance actually requires is a recurring health check that runs whether or not anyone remembers to look.

---

## What Continuous Health Checks Actually Do — and How Health Hub for Jira Runs Them

The fix for configuration debt is not a heroic annual purge. It's instrumentation: a standing, automated read on the health of your configuration so that debt is visible *as it accumulates*, not after it has already cost you a year of slow page loads. That's the entire premise of **Health Hub for Jira**.

Health Hub runs **62 analyzers** across your instance and grades configuration against Atlassian best practices — the same thresholds and anti-patterns described above — so you get a continuous, evidence-based picture instead of a guess. Concretely, it lets admins:

- **Find the fields you're afraid to delete.** Surface custom fields that are unused, duplicated, or have no values across any issue — exactly the "default-value" overhead Atlassian identified as the cause of the 13-second issue create. It also flags how close each project sits to the **700-field limit** so you act before enforcement does.
- **Collapse workflow and status sprawl.** Detect duplicate and near-duplicate workflows, statuses that mean the same thing under different names, and orphaned schemes (workflow, permission, notification, field configuration) that no active project references.
- **Spot orphaned and redundant configuration objects.** Unused priorities, resolutions, issue types, and screens that bloat every dropdown and slow every query — with the redundancy made explicit, so the "research project" of safe deletion is already done for you.
- **Track health over time, not just once.** Because the 62 analyzers run continuously, you get a trend line on configuration debt rather than a single snapshot — turning governance from a periodic event into a standing control.
- **Prioritize by impact and prepare for 2026.** Rather than a flat list, you get a graded view of what's hurting performance and what's about to breach Atlassian's enforced limits, so cleanup targets the highest-cost, highest-risk items first.

The point isn't to make your Jira minimal for its own sake. It's to make every "yes" to a new field or workflow a *visible* decision with a *measured* cost — and to keep the instance under Atlassian's thresholds before those thresholds start saying no for you.

---

## The Question to Ask Before Your Next Field Request

Open your custom field list and scroll to the bottom — if you can find it. Count your workflows. Count how many statuses mean "done." If you're past 800 fields, you're already in Atlassian's warning zone. If you're past 1,200, you're in the zone they call a performance concern. And if any project is near 700 fields, you have a 2026 deadline whether you've planned for it or not.

Configuration debt is the rare kind of technical debt with a published interest rate and a hard payment date. The instances that stay fast and governable in 2026 won't be the ones that cleaned up once. They'll be the ones running a continuous health check that never lets the debt build in the first place.

---

## Sources

[1] Atlassian — How to assess the impact of too many custom fields in Jira and how to resolve it (Support KB). https://support.atlassian.com/jira/kb/how-to-assess-the-impact-of-too-many-custom-fields-in-jira-and-how-to-resolve-it/

[2] Atlassian — Managing custom fields in Jira effectively (Enterprise Data Center documentation). https://confluence.atlassian.com/enterprise/managing-custom-fields-in-jira-effectively-945523781.html

[3] Atlassian — Managing number of custom fields in Jira Data Center (Enterprise documentation). https://confluence.atlassian.com/spaces/ENTERPRISE/pages/1488597907/Managing+number+of+custom+fields+in+Jira+Data+Center

[4] Atlassian — Data limits and guardrails (Jira Cloud administration). https://support.atlassian.com/jira-cloud-administration/docs/data-limits-and-guardrails/

[5] Atlassian — Growing our investment in a faster, cleaner Jira: additional limits and guardrails arriving September 2026 (Atlassian Community, Enterprise). https://community.atlassian.com/forums/Enterprise-articles/Growing-our-investment-in-a-faster-cleaner-Jira/ba-p/3205375

[6] Atlassian — Optimize fields in your site (Jira Cloud administration). https://support.atlassian.com/jira-cloud-administration/docs/optimize-your-custom-fields/

[7] Atlassian — Too many custom fields (Jira insights / Site optimizer). https://support.atlassian.com/portfolio-insights/docs/too-many-custom-fields/

[8] Atlassian — Empowering Jira admins to optimize usability at scale: new limits, guardrails, and data management tools (Atlassian Community, Enterprise). https://community.atlassian.com/forums/Enterprise-articles/Empowering-Jira-admins-to-optimize-usability-at-scale/ba-p/3098575
