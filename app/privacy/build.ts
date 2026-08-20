import type { Block } from "../documentation/types";
import { CONTACT_EMAIL, SUPPORT_PORTAL, UPDATED, VENDOR, type PrivacyFacts } from "./facts";

/**
 * Builds one app's privacy policy from its facts, so the wording of the shared
 * sections — retention, sharing, deletion, GDPR — cannot drift between apps while
 * the app-specific parts stay exact.
 */
export function buildPolicy(app: PrivacyFacts): Block[] {
  const blocks: Block[] = [];
  const externalSentence = app.external.length
    ? "It calls no external service other than the Atlassian APIs of your own site."
    : "It makes no outbound network calls to any external service.";

  blocks.push({
    type: "p",
    text: `**Last updated:** ${UPDATED} · **App:** ${app.name} · **Vendor:** ${VENDOR}`,
  });
  blocks.push({
    type: "p",
    text: `This policy explains what data ${app.name} collects, how it is processed and stored, and the choices available to you. ${app.summary}`,
  });
  blocks.push({
    type: "p",
    text: `${app.name} is built on Atlassian Forge. It runs inside Atlassian's infrastructure and stores its data in your own Atlassian tenant. ${externalSentence}`,
  });

  blocks.push({ type: "h", level: 2, text: "1. Data we collect" });
  blocks.push({
    type: "p",
    text: "The data falls into two categories: configuration and results held in app storage, and Atlassian data that is read and processed in memory but not retained.",
  });
  blocks.push({ type: "h", level: 3, text: "App storage (persisted inside your Atlassian tenant)" });
  blocks.push({ type: "list", items: app.persisted });
  blocks.push({ type: "h", level: 3, text: "Transient data (read and processed in memory, not retained)" });
  blocks.push({ type: "list", items: app.transient });
  blocks.push({
    type: "p",
    text: "Transient data is read through the standard Atlassian REST APIs, used to produce the result you asked for, and then discarded.",
  });

  blocks.push({ type: "h", level: 2, text: "2. Personal data" });
  blocks.push({ type: "list", items: app.personal });

  let n = 3;
  if (app.ai) {
    blocks.push({ type: "h", level: 2, text: `${n}. AI processing` });
    blocks.push({
      type: "p",
      text: "The AI features of this app run on **Forge LLM**, the AI runtime Atlassian provides inside the Atlassian platform, using Atlassian-hosted models. SynapseOasis operates no AI infrastructure of its own, holds no API keys to third-party AI providers, and never sends your data to one. Prompts are processed by Atlassian's service and are not used by SynapseOasis to train any model.",
    });
    blocks.push({ type: "p", text: "The following data is included in prompts when an AI feature runs:" });
    blocks.push({ type: "list", items: app.aiData ?? [] });
    blocks.push({
      type: "p",
      text: "Model responses produce the result shown in the app and, where the app records a decision, are stored as described in section 1. AI features run only when enabled by your administrators.",
    });
    n += 1;
  }

  blocks.push({ type: "h", level: 2, text: `${n}. Storage and retention` });
  blocks.push({
    type: "p",
    text: `All persisted data is stored in ${app.storageTech}, provisioned for your installation and located in the Atlassian cloud region of your site. SynapseOasis operates no servers, no databases and no logs outside Atlassian, and has no standing access to your data.`,
  });
  blocks.push({
    type: "p",
    text: "Configuration is retained for the life of the installation. Job data and results are retained until you delete or reset them, until they are replaced by a newer run, or until the app is uninstalled.",
  });
  n += 1;

  blocks.push({ type: "h", level: 2, text: `${n}. Data sharing` });
  blocks.push({
    type: "list",
    items: [
      "SynapseOasis does not share your data with third parties.",
      "There is no sale or transfer of data to third parties.",
      "There are no analytics, tracking or telemetry calls to external services.",
      app.external.length
        ? `The only outbound calls the app makes are to ${app.external.join(", ")}.`
        : "The app makes no outbound network calls at all.",
      "All data stays within Atlassian.",
    ],
  });
  n += 1;

  blocks.push({ type: "h", level: 2, text: `${n}. Security` });
  blocks.push({
    type: "p",
    text: "The app runs inside the Atlassian Forge sandbox and is subject to Atlassian's platform security controls. It requests only the scopes it needs:",
  });
  blocks.push({ type: "list", items: app.scopes.map((s) => `\`${s}\``) });
  blocks.push({
    type: "p",
    text: "Where the app acts on behalf of a user, Atlassian's permission model applies, so it cannot show a user data they could not already see. Administrative functions are restricted to users holding the corresponding Atlassian administration permission. All stored input is validated and size-capped before it is written.",
  });
  n += 1;

  blocks.push({ type: "h", level: 2, text: `${n}. Data deletion and retention` });
  blocks.push({
    type: "p",
    text: "Deletion is controlled by the Atlassian platform, not by SynapseOasis. This section describes what actually happens, because the difference matters for a data protection assessment.",
  });
  blocks.push({
    type: "list",
    items: [
      "**While the app is installed**, you can delete data through the app's own screens, and that deletion is immediate.",
      "**When you uninstall the app**, it runs an uninstall handler that clears its storage. Independently of that, Atlassian detaches the installation's data: it becomes inaccessible to the app, to your users and to us, right away.",
      "**After uninstalling**, Atlassian keeps the detached data for a limited period before destroying it, under Atlassian's own data retention policy. Atlassian's Forge documentation describes the storage as *soft deleted* on uninstall and retained for **28 days**, and separately notes that a re-link request must reach Atlassian **within 21 days** for previous data to be restored to a new installation. That restore only happens if you ask us to raise the request, with your consent. We never initiate it.",
      "**Atlassian's backups** follow Atlassian's own schedule and are outside any app's control.",
    ],
  });
  blocks.push({
    type: "p",
    text: "The practical consequences: we cannot delete this data faster than Atlassian's process allows, and we cannot read it after an uninstall. **If you need specific data gone on a specific date, delete it inside the app before you uninstall.**",
  });
  blocks.push({
    type: "p",
    text: "Atlassian documents this in [Data lifecycle for Forge-hosted storage](https://developer.atlassian.com/platform/forge/storage-reference/hosted-storage-data-lifecycle/). The retention periods are Atlassian's to change, so treat Atlassian's documentation as the current source rather than this page.",
  });
  n += 1;

  blocks.push({ type: "h", level: 2, text: `${n}. GDPR` });
  blocks.push({
    type: "list",
    items: [
      "**Data minimisation** — only the configuration and results needed for the app's function are stored; everything else is processed in memory and discarded.",
      "**Purpose limitation** — data is used solely to provide the app's functionality inside your tenant, and is never sold or transferred to third parties.",
      "**Data residency** — all persisted data remains in your Atlassian tenant on Forge infrastructure, in the Atlassian cloud region of your site.",
      "**Right to erasure** — data can be deleted through the app while it is installed. On uninstall it is detached immediately and then destroyed by Atlassian under Atlassian’s retention policy, as described in the section above.",
      "**Sub-processors** — SynapseOasis uses no sub-processors for app data. Atlassian is the infrastructure provider and processes the data under your existing agreement with Atlassian.",
    ],
  });
  n += 1;

  blocks.push({ type: "h", level: 2, text: `${n}. Contact` });
  blocks.push({
    type: "list",
    items: [
      `**Email:** [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})`,
      `**Support portal:** [Customer support portal](${SUPPORT_PORTAL})`,
    ],
  });
  n += 1;

  blocks.push({ type: "h", level: 2, text: `${n}. Changes to this policy` });
  blocks.push({
    type: "p",
    text: `We may update this policy from time to time. When we do, we revise the last-updated date at the top of this page. We encourage you to review it periodically to stay informed about how ${app.name} handles your data.`,
  });

  return blocks;
}
