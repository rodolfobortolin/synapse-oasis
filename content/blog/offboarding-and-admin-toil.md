# Only 34% of Companies Cut Access on a Departing Employee's Last Day. The Rest Leave the Door Open.

**Manual Jira offboarding and admin cleanup don't just waste your team's time — they leave orphaned access that becomes a breach waiting to happen.**

---

A user leaves the company on Friday. By the following Wednesday, their Jira account is still active. They're still a member of four project roles. They're still assigned issues, still listed on three permission schemes, and the custom fields someone created for their old team are still cluttering every screen.

Nobody is being careless. Your admin simply has a queue. Deprovisioning is a manual, multi-step chore competing with fifty other tickets — and so it slips. The problem is that every day that account stays live is a day of standing risk, and every minute your admin spends clicking through it by hand is time they aren't spending on anything that matters.

This is the quiet, compounding cost of manual Jira administration. The data on it is unambiguous.

---

## Most Access Isn't Revoked When People Leave

The single most damaging assumption in identity management is that offboarding happens on the last day. It usually doesn't.

In the Identity Defined Security Alliance's study *Identity and Access Management: The Stakeholder Perspective* — a survey of 313 HR, sales, and IT help-desk professionals at U.S. companies with 1,000+ employees — only [**34% of organizations** revoke a departing worker's system access on the day they leave](https://www.globenewswire.com/en/news-release/2021/02/04/2169876/0/en/New-Report-Reveals-Significant-Delays-Revoking-System-Access-Impacting-Security-Risk.html). For half of all organizations, full revocation takes **three days or longer**. And only **35%** of organizations have automated revocation at all — meaning roughly two-thirds are still doing it by hand, ticket by ticket.

Three days does not sound like much until you map it onto reality:

- A contractor's contract ends, but their Jira account stays active for a week.
- An employee moves teams; nobody removes them from the old project's roles, so they keep visibility into work they shouldn't see.
- A vendor's engagement wraps, but their named account lingers in your permission schemes for a quarter.

Each of these is an **orphaned account** — a credential that still works but no longer maps to anyone who should have it. In Jira specifically, orphaned access rarely sits in one place. It's spread across project role memberships, permission schemes, notification schemes, filters, dashboards, and issue assignments. Cleaning it up manually means hunting it down in all of those places, one project at a time.

---

## What Lingering Access Actually Costs

Orphaned access is not a tidiness problem. It's the exact attack surface that drives the most expensive breaches.

Verizon's *2024 Data Breach Investigations Report* found that [**68% of breaches** involved a non-malicious human element](https://www.verizon.com/about/news/2024-data-breach-investigations-report-vulnerability-exploitation-boom) — people, process, and access mistakes rather than zero-day wizardry. Over the past decade, [the use of stolen credentials appeared in **31% of all breaches**](https://www.verizon.com/about/news/2024-data-breach-investigations-report-vulnerability-exploitation-boom), making it the single most durable way attackers get in. An orphaned account is a stolen credential that hasn't been stolen yet: a working login with no owner watching it.

The price tag when that access is abused is steep and rising:

- The Ponemon Institute's *Cost of Insider Risks Global Report* put the average total cost of insider-driven incidents at [**$16.2 million per organization per year**](https://ponemonsullivanreport.com/2023/10/cost-of-insider-risks-global-report-2023/) in 2023, with credential-theft incidents costing an average of **$679,621 each** to resolve. By the 2026 edition that annual figure had climbed to [**$19.5 million**](https://www.globenewswire.com/news-release/2026/02/24/3243891/0/en/Insider-Risk-Costs-Hit-19-5M-USD-Per-Year-as-AI-Creates-New-Blind-Spots.html).
- Insider incidents are also slow to catch: the same Ponemon research found it takes an average of [**86 days to contain** an insider incident](https://ponemonsullivanreport.com/2023/10/cost-of-insider-risks-global-report-2023/).
- And credentials are the worst-aging risk of all. IBM's *Cost of a Data Breach 2024* report found that breaches involving stolen credentials took an average of [**292 days to identify and contain** — the longest of any attack vector](https://www.ibm.com/think/insights/whats-new-2024-cost-of-a-data-breach-report) — against a global average breach cost of **$4.88 million**.

Put those together and the math is brutal: orphaned access is the most common breach vector, it's the slowest to detect, and it's among the costliest to clean up. The three-day deprovisioning gap isn't a clerical lag — it's the front edge of a 292-day exposure window.

---

## The Other Cost: Your Admins' Time

Set the breach risk aside for a moment. Even when nothing goes wrong, manual administration is a steady drain on the people doing it.

Smartsheet's *Automation in the Workplace* survey found that [**over 40% of workers spend at least a quarter of their work week on manual, repetitive tasks**](https://www.smartsheet.com/content-center/product-news/automation/workers-waste-quarter-work-week-manual-repetitive-tasks), and nearly **60%** believe automation could recover them **six or more hours a week — almost a full workday**. McKinsey's research on automation potential reached the same conclusion from the top down: work activities accounting for roughly [**45% of what people are paid to do are technically automatable**](https://www.mckinsey.com/mgi/overview/in-the-news/how-many-of-your-daily-tasks-could-be-automated) with already-available technology — and rules-based, digital administrative work is exactly the category that's easiest to automate.

Jira administration is a textbook example. Consider the genuinely repetitive, rules-based jobs that pile onto an admin's plate:

- **Offboarding:** find every project role, permission scheme, filter, and dashboard a leaver touches; reassign their open issues; remove them everywhere.
- **Mirroring access:** a new hire needs "the same access as Maria" — which means manually reconstructing Maria's role memberships across dozens of projects.
- **Post-migration cleanup:** after a Cloud migration or a tool consolidation, you inherit hundreds of duplicate or unused custom fields, dead project roles, and stale schemes that have to be located and removed one by one.

None of this requires judgment. All of it requires clicking. And because it's tedious, it gets deprioritized — which is precisely how the three-day deprovisioning gap opens in the first place.

---

## Why the Problem Persists

If the risk is this clear, why is two-thirds of the market still offboarding by hand?

- **Native Jira tooling is single-target.** Out of the box, you remove a user from one project role in one project at a time, delete one custom field at a time, and audit access project by project. There is no native "show me everything this person can touch, then remove all of it" view.
- **Access is scattered by design.** A single user's footprint lives across project roles, global and project permission schemes, notification schemes, saved filters, dashboards, and issue assignments. No single screen reconstructs it.
- **It's invisible until it isn't.** An orphaned account generates no alert. It sits quietly until an audit, a failed access review, or a breach surfaces it — at which point it's an incident, not a chore.
- **Manual work doesn't scale.** What's tolerable at 50 users becomes unmanageable at 5,000. The bigger the instance, the wider the deprovisioning gap grows.

The result is a process that is slow when it works and dangerous when it slips — and at scale, it always eventually slips.

---

## How Admin Toolkit for Jira Closes the Gap

The fix is not "try harder." It's to stop doing in dozens of manual steps what should be a single bulk operation. That's the entire premise of **Admin Toolkit for Jira**: turn scattered, per-project, per-field admin work into fast, auditable bulk actions.

**Deprovision a user completely, in one pass.** Instead of hunting through every project, see a user's full access footprint — project roles, permissions, assignments — and remove it across the whole instance at once. The three-day gap collapses to a single action on the last day.

**Mirror access without rebuilding it by hand.** When a new hire needs the same access as an existing team member, copy role and permission membership across projects in bulk rather than reconstructing it project by project. Onboarding stops being an afternoon of clicking.

**Bulk-clean migrated and orphaned configuration.** After a migration or consolidation, find and remove unused custom fields, dead project roles, and stale memberships in bulk — the post-migration cleanup that otherwise drags on for weeks gets done in an afternoon.

**Audit before you act.** Surface who has access to what across projects and roles, so access reviews and offboarding verification become a report instead of a manual investigation — directly addressing the visibility gap that lets orphaned accounts hide.

The payoff lands on both cost lines this article opened with. On **security**, you close the deprovisioning gap that feeds the 68%-of-breaches human element and the 292-day credential exposure window. On **time**, you reclaim the workday-a-week that manual, rules-based admin quietly consumes — exactly the automatable toil McKinsey and Smartsheet quantified.

---

## The Question to Ask This Quarter

Pull a list of everyone who left your organization in the last 90 days. Now check how many still have an active Jira account, sit in a project role, or own an open issue.

If that number isn't zero, you already have orphaned access — and you found it manually, the slow way, which is the same way you'd have to remove it. The organizations getting this right aren't more diligent. They've simply stopped treating offboarding and cleanup as one-at-a-time chores and made them one-click bulk operations.

Manual Jira administration isn't free. It costs you in admin hours every week, and it costs you in standing risk every day an account stays open longer than it should. Bulk admin tooling pays for itself the first time it closes a deprovisioning gap before someone else finds it.

---

## Sources

[1] Identity Defined Security Alliance (IDSA) — *Identity and Access Management: The Stakeholder Perspective* (2021). <https://www.globenewswire.com/en/news-release/2021/02/04/2169876/0/en/New-Report-Reveals-Significant-Delays-Revoking-System-Access-Impacting-Security-Risk.html>

[2] Verizon — *2024 Data Breach Investigations Report* (2024). <https://www.verizon.com/about/news/2024-data-breach-investigations-report-vulnerability-exploitation-boom>

[3] Ponemon Institute / DTEX Systems — *Cost of Insider Risks Global Report 2023* (2023). <https://ponemonsullivanreport.com/2023/10/cost-of-insider-risks-global-report-2023/>

[4] Ponemon Institute / DTEX Systems — *2026 Cost of Insider Risks Global Report* (2026). <https://www.globenewswire.com/news-release/2026/02/24/3243891/0/en/Insider-Risk-Costs-Hit-19-5M-USD-Per-Year-as-AI-Creates-New-Blind-Spots.html>

[5] IBM Security — *Cost of a Data Breach Report 2024* (2024). <https://www.ibm.com/think/insights/whats-new-2024-cost-of-a-data-breach-report>

[6] Smartsheet — *Automation in the Workplace* (survey). <https://www.smartsheet.com/content-center/product-news/automation/workers-waste-quarter-work-week-manual-repetitive-tasks>

[7] McKinsey Global Institute — *How many of your daily tasks could be automated?* <https://www.mckinsey.com/mgi/overview/in-the-news/how-many-of-your-daily-tasks-could-be-automated>
