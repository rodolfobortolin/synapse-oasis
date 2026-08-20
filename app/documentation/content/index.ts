import type { AppDocs } from "../types";
import { startHere } from "./start-here";
import { aiPortalChat } from "./ai-portal-chat";
import { aiTriage } from "./ai-triage";
import { secretScanner } from "./secret-scanner";
import { workflowToolkit } from "./workflow-toolkit";
import { adminToolkit } from "./admin-toolkit";
import { customFieldsToolkit } from "./custom-fields-toolkit";
import { licenseWasteManager } from "./license-waste-manager";
import { markdownToolkit } from "./markdown-toolkit";

/**
 * Sidebar order: the shared introduction first, then the AI apps, security, the
 * toolkits, and the Confluence app.
 */
export const APP_DOCS: AppDocs[] = [
  startHere,
  aiPortalChat,
  aiTriage,
  secretScanner,
  workflowToolkit,
  adminToolkit,
  customFieldsToolkit,
  licenseWasteManager,
  markdownToolkit,
];
