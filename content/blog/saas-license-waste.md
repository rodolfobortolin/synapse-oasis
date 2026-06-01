# Organizations Waste $21M a Year on SaaS Licenses. Your Atlassian Seats Are Part of It.

**Half the licenses you pay for are sitting idle, and per-user pricing turns every inactive user into a recurring line item.**

---

Every Atlassian renewal starts with a number: your user count. Multiply it by the per-seat price, and that is your bill. Nobody disputes the arithmetic.

The problem is the inputs. That user count almost always includes people who left months ago, contractors whose projects ended, and accounts provisioned "just in case" that never logged in. You are not paying for software. You are paying for a headcount snapshot that stopped being accurate the day after it was taken.

This is not an Atlassian-specific failure. It is the defining pattern of the entire SaaS economy, and the numbers are large enough that finance teams have started treating it as a budget line of its own. This article quantifies SaaS license waste, explains why per-user products like Jira are especially exposed, and lays out how to continuously right-size your seat count instead of discovering the bloat once a year at renewal.

---

## The Headline Number: $21M Wasted, Per Company, Per Year

Zylo's 2025 SaaS Management Index, built on an analysis of more than 40 million SaaS licenses and $40 billion in managed spend, found that the average organization wastes **$21 million per year on unused SaaS licenses** — a **14.2% year-over-year increase**. The prior year's index put the figure at **$18 million**, with only **49% of provisioned licenses actually being used**. In other words, roughly **half of every license dollar is spent on seats nobody touches**.

That is not an outlier dataset. Productiv's State of SaaS research reached the same conclusion from a different angle: across the platforms it analyzed, **only 45% of company applications are used on a regular basis**, measured as engagement over a 60-day window.

The waste is also getting worse, not better. Flexera's 2025 State of ITAM Report found that **35% of organizations say their SaaS waste increased over the past year**, even as the same teams report shrinking visibility into what they actually own.

- [Zylo](https://zylo.com/news/2025-saas-management-index): **$21M** average annual SaaS license waste, up **14.2%** YoY (2025 SaaS Management Index)
- [Zylo](https://zylo.com/news/2024-saas-management-index/): only **49%** of provisioned licenses are actually used (2024 SaaS Management Index)
- [Productiv](https://productiv.com/blog/less-than-half-of-company-saas-applications-are-regularly-used-by-employees/): only **45%** of apps are used regularly (State of SaaS Sprawl 2021)
- [Flexera](https://www.flexera.com/about-us/press-center/it-teams-losing-visibility-according-to-flexera-2025-state-of-itam-report): **35%** of organizations say SaaS waste rose over the past year (2025 State of ITAM)

---

## Why Per-User Pricing Makes Atlassian a Prime Offender

The waste numbers above span the entire SaaS portfolio. But not all SaaS is equally exposed. The damage concentrates in **per-user, per-month products** — exactly the model Jira, Jira Service Management, and Confluence use.

Consider the mechanics. Atlassian Cloud bills on a per-user basis. Jira Standard lists at **$7.91 per user / month** and Premium at **$14.54 per user / month**. Every account that counts toward your billable user total costs you that amount whether the person logs in daily or left the company a year ago.

Now layer on how organizations actually grow their Atlassian footprint:

- **Onboarding adds users; offboarding rarely removes them.** Deactivation is a manual, easily-skipped step. The seat keeps billing.
- **Contractors and vendors get provisioned for short engagements** and are forgotten when the engagement ends.
- **"Just give them access" requests** create accounts for people who needed to view one board, once.
- **Group-based provisioning** can silently grant a product license to everyone in a directory group, including people who will never open the tool.

The result is structural drift. Your billable user count only ever ratchets upward, and the gap between "users you pay for" and "users who are active" widens every single month between renewals.

Gartner has put a forward-looking number on the consequence: **"By 2027, organizations that fail to attain centralized visibility and coordinate SaaS lifecycles will overspend on SaaS by at least 25% due to incorrect and unnecessary entitlements and not rationalizing overlapping tools and instances."** Inactive Atlassian seats are textbook unnecessary entitlements.

- [Atlassian](https://www.atlassian.com/software/jira/pricing): Jira Standard **$7.91**/user/mo, Premium **$14.54**/user/mo (official pricing)
- [Gartner via Zylo](https://zylo.com/blog/insights-from-the-2022-gartner-market-guide-for-saas-management-platforms/): organizations without centralized SaaS visibility will **overspend by at least 25%** through 2027 (2022 Market Guide for SaaS Management Platforms)

---

## What This Actually Costs a Jira Instance

The percentages above translate into concrete money the moment you apply them to a real user count. Use a conservative inactivity rate — well below the ~50% idle rate Zylo reports portfolio-wide — and the picture is still stark.

| Total billable Jira users | Inactive seats at 20% | Annual waste (Standard, $7.91/mo) | Annual waste (Premium, $14.54/mo) |
|---------------------------|------------------------|-----------------------------------|-----------------------------------|
| 250 | 50 | ~$4,746 | ~$8,724 |
| 1,000 | 200 | ~$18,984 | ~$34,896 |
| 5,000 | 1,000 | ~$94,920 | ~$174,480 |

These figures use a 20% inactivity assumption. If your instance mirrors the industry-average idle rate closer to 50%, double or more these numbers. And this is **per product**: the same inactive employee may also hold a billable seat in Confluence and Jira Service Management, multiplying the same waste across your stack.

The reason this hides so well is that it never appears as a spike. It is a steady, low-grade leak that finance only confronts once a year, at renewal, when the only available lever is to argue about discount percentage rather than the unit count being multiplied.

---

## Why the Waste Persists

If the money is this visible in aggregate, why does almost every organization still carry it? Three reasons.

**1. Right-sizing is invisible until renewal.** Seat counts grow continuously, but the bill arrives annually. By the time anyone reconciles the two, a year of waste is already sunk and the conversation is about next year, not this one.

**2. "Inactive" is hard to define and harder to measure manually.** Is a user who logged in 40 days ago inactive? 90 days? Did they actually do anything, or just authenticate? Answering this for thousands of accounts by hand is the kind of task that gets scheduled, deprioritized, and never done.

**3. Reclaiming a seat feels risky.** Admins fear deactivating someone who turns out to be on parental leave or about to return to a project. Without a clear, auditable activity signal, the safe default is always to leave the seat alone — which is exactly how waste compounds.

The Zylo and Productiv data make the same point implicitly: this is not a problem of awareness. Organizations *know* roughly half their licenses are idle. They lack a continuous, low-effort mechanism to find the specific idle seats and act on them safely.

---

## How License Waste Manager for Jira Fixes It

License Waste Manager for Jira attacks the problem at its root: it replaces the once-a-year, manual reconciliation with **continuous, evidence-based right-sizing** of your Atlassian seats. Instead of guessing at renewal, you know — every day — exactly which licensed users are inactive and reclaimable.

**Detect inactive users with real activity signals.** The app surfaces users who hold a billable license but show no meaningful activity over a window you define (last login, last action). That converts the fuzzy question of "who is inactive?" into a concrete, sortable list — the exact thing manual audits can never produce reliably at scale.

**Quantify the waste in dollars, continuously.** Rather than discovering the leak at renewal, you see the running cost of idle seats against your per-user price. The annual-waste math in the table above becomes a live number for *your* instance, not an industry estimate.

**Reclaim seats safely.** Because every flagged account is backed by an activity record, deactivation stops being a leap of faith. Admins act on evidence, with an audit trail, instead of leaving seats untouched out of caution. That removes the single biggest reason waste persists.

**Right-size before every renewal — and between them.** The point is to enter each renewal with a user count that reflects who is actually working in Jira, and to keep that count honest in the months between. You negotiate from an accurate baseline instead of paying for last year's headcount snapshot.

The economics are simple. If the industry average is ~50% idle licenses and a year of inaction costs the average company millions, then even a partial, conservative reclaim pays for the tooling many times over — and keeps paying, every renewal cycle, because the leak never gets a year to compound again.

---

## The Bottom Line

SaaS license waste is not a rounding error. It is **$21 million a year for the average organization**, roughly **half of every license dollar**, and it is growing. Per-user products like Jira concentrate that waste because billable seat counts only ever drift upward between renewals.

The fix is not a smarter annual audit. It is making right-sizing continuous: detect inactive users, quantify what they cost, and reclaim those seats with confidence. That is precisely what License Waste Manager for Jira is built to do — turn the seat count you pay for back into the seat count you actually use.

---

## Sources

[1] Zylo — 2025 SaaS Management Index (2025). https://zylo.com/news/2025-saas-management-index
[2] Zylo — 2024 SaaS Management Index (2024). https://zylo.com/news/2024-saas-management-index/
[3] Productiv — State of SaaS Sprawl (2021). https://productiv.com/blog/less-than-half-of-company-saas-applications-are-regularly-used-by-employees/
[4] Flexera — 2025 State of ITAM Report (2025). https://www.flexera.com/about-us/press-center/it-teams-losing-visibility-according-to-flexera-2025-state-of-itam-report
[5] Atlassian — Jira Cloud Pricing (2025). https://www.atlassian.com/software/jira/pricing
[6] Gartner via Zylo — 2022 Market Guide for SaaS Management Platforms (2022). https://zylo.com/blog/insights-from-the-2022-gartner-market-guide-for-saas-management-platforms/
