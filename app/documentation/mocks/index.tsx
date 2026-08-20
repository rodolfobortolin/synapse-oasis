import type { ReactNode } from "react";
import { AI_PORTAL_MOCKS } from "./ai-portal-chat";
import { AI_TRIAGE_MOCKS } from "./ai-triage";
import { SECRET_SCANNER_MOCKS } from "./secret-scanner";
import { WORKFLOW_TOOLKIT_MOCKS } from "./workflow-toolkit";
import { ADMIN_TOOLKIT_MOCKS } from "./admin-toolkit";
import { CUSTOM_FIELDS_MOCKS } from "./custom-fields-toolkit";
import { LICENSE_WASTE_MOCKS } from "./license-waste-manager";
import { MARKDOWN_TOOLKIT_MOCKS } from "./markdown-toolkit";

/** id → simulated screen, referenced from content by `{ type: "mock", id }`. */
export const MOCKS: Record<string, ReactNode> = {
  ...AI_PORTAL_MOCKS,
  ...AI_TRIAGE_MOCKS,
  ...SECRET_SCANNER_MOCKS,
  ...WORKFLOW_TOOLKIT_MOCKS,
  ...ADMIN_TOOLKIT_MOCKS,
  ...CUSTOM_FIELDS_MOCKS,
  ...LICENSE_WASTE_MOCKS,
  ...MARKDOWN_TOOLKIT_MOCKS,
};
