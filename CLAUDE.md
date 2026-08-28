# synapse-oasis — the SynapseOasis website

Next.js site: marketing pages, `/blog`, `/documentation` (one guide per app) and
`/privacy` (one policy per app). A Vercel git integration publishes on push to
`main`, so **anything committed here is live**. Run `npm run build` before
committing — it prerenders every page, so a broken content entry fails the build
rather than shipping.

## Which apps this site covers

Eight, and **Health Hub is not one of them.** It belongs to Valiantys. It has no
page, no privacy entry and no card here, and adding one would say the wrong
thing about who is responsible for that data. The same applies to
`marketplace-assets/`.

## Never narrate the app's own past

The rule that has cost the most here. Documentation describes **what the product
is**. It does not describe what it used to be, what was removed, what used to be
broken, or how a page used to read.

This was violated in thirteen places across seven files at once — "Earlier
versions offered *Add internal comment*", "Earlier versions asked for six more
scopes", "the column that used to print App (automated) has been removed", and
the privacy policy narrating its own editorial history. Two of them told the
reader the app had been broken, and two invited a security reviewer to compare
against "an older listing".

Three reasons it is always wrong here:

- **None of these apps has been published.** There is no earlier version a
  reader could have seen, no older listing, no removed toggle anyone clicked.
  The history is real only inside the repositories.
- **It advertises defects for no reader's benefit.** "The handler was never once
  invoked" is a true sentence that costs a sale and helps nobody.
- **The reason for a change belongs in the commit that made it.** That is what a
  commit is for. Keep a *fact about the design* — a validator allows rather than
  blocks; an audit entry and its detail share one horizon — and drop the
  chronology that produced it.

The trap is that the house voice for a commit message is "what was claimed
versus what is true", and it reads well. Do not carry it into `app/`.

## The app's source is the authority

Where this site and an app's code disagree, **the site is wrong**. Every claim
here — a feature, a screen, who can use it, what is stored, which scopes are
requested — is checkable against that app's `manifest.yml`, `src/index.ts`,
resolvers and UI. Check before writing.

Audits have found the site advertising a feature that no longer existed (a whole
page, an FAQ pair and homepage copy), fourteen scopes six apps no longer request,
twelve tools where there are fourteen, and a "no way to undo this" beside a
button labelled Restore. Assume drift and go looking for it.

## Where the facts live

- `app/privacy/facts.ts` — the source every privacy page is built from: one entry
  per app with `persisted`, `transient`, `personal`, `scopes` and `storageTech`.
  Reconcile `scopes` against the app's manifest **in both directions**. Keep
  `UPDATED` current when a policy changes.
- `app/documentation/content/<app>.ts` — the guide. Block types are in
  `../types.ts`.
- `app/documentation/mocks/<app>.tsx` — HTML mocks of the real screens.
- `marketplace-assets/PRIVACY-SECURITY.md` in the sibling repo is **generated**
  from `listing/security.mjs` plus each app's live manifest. Edit the source, not
  the output.

## Diagrams

`{ type: "diagram", text, caption? }` renders Mermaid in the browser
(`app/documentation/components/DiagramBlock.tsx`). Use it where a flow is
genuinely clearer drawn than written, and keep the source short — a reader
learns more from a ten-line flowchart than a hundred-line one. Wide diagrams
scroll inside their own container; the page must never scroll sideways.

An example must look like an example. Follow the framing the mocks already use
(the uppercase **Example** badge, a caption, a **Show source** toggle) rather
than inventing another. And do not embed a whole real document: a full
architecture doc or postmortem inside a page reads as though it *is* the page,
and the reader loses the line between the explanation and the illustration.
