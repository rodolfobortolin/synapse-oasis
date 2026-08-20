import type { ReactNode } from "react";
import {
  ATL,
  Avatar,
  Btn,
  Checkbox,
  Code,
  Field,
  Lozenge,
  PageTitle,
  Panel,
  Row,
  Screen,
  SectionLabel,
  Select,
  Stat,
  Sub,
  Table,
  Tabs,
  Toggle,
} from "./ui";

const TABS = ["Statistics", "Portal Assistant", "Branding", "API", "Audit Log"];

/* Atlassian's portal blue, which is not the same as the admin-UI blue. */
const PORTAL_BLUE = "#0C66E4";
const PORTAL_BODY = "#F1F2F4";

/* ── Shared pieces of the real portal chrome ───────────────────────────── */

function ChatIcon({ size = 16, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

/** The blue title bar of the chat window, with the + and × controls. */
function ChatHeader() {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-2.5" style={{ background: PORTAL_BLUE }}>
      <ChatIcon />
      <span className="text-[13px] font-semibold text-white">AI Portal Chat</span>
      <span className="ml-auto flex items-center gap-1.5">
        {["+", "✕"].map((c) => (
          <span
            key={c}
            className="inline-flex items-center justify-center rounded-full text-[11px] text-white"
            style={{ width: 20, height: 20, background: "rgba(255,255,255,0.22)" }}
          >
            {c}
          </span>
        ))}
      </span>
    </div>
  );
}

/** The message box at the bottom of the chat window. */
function ChatComposer({ enabled = false }: { enabled?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "#fff", borderTop: `1px solid ${ATL.border}` }}>
      <span
        className="inline-flex items-center justify-center rounded-full shrink-0"
        style={{ width: 26, height: 26, background: "#F1F2F4", border: `1px solid ${ATL.border}` }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ATL.subtle} strokeWidth="2" strokeLinecap="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 0118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" />
        </svg>
      </span>
      <span
        className="flex-1 rounded px-2.5 py-1.5 text-[12px]"
        style={{ border: `1px solid ${ATL.border}`, color: "#8993A4", background: "#fff" }}
      >
        Type your message...
      </span>
      <span
        className="rounded px-3 py-1.5 text-[12px] font-medium text-white shrink-0"
        style={{ background: enabled ? PORTAL_BLUE : "#8C9BAB" }}
      >
        Send
      </span>
    </div>
  );
}

function Bubble({ from, children }: { from: "bot" | "user"; children: ReactNode }) {
  const bot = from === "bot";
  return (
    <div className={`flex gap-2 mb-2.5 ${bot ? "" : "flex-row-reverse"}`}>
      {bot ? (
        <span
          className="inline-flex items-center justify-center rounded-full shrink-0"
          style={{ width: 22, height: 22, background: PORTAL_BLUE }}
        >
          <ChatIcon size={12} />
        </span>
      ) : (
        <Avatar initials="LC" color="#7A869A" />
      )}
      <div
        className="rounded-lg px-3 py-2 text-[12.5px] leading-relaxed"
        style={{
          maxWidth: "80%",
          background: bot ? "#fff" : PORTAL_BLUE,
          color: bot ? ATL.text : "#fff",
          border: bot ? `1px solid ${ATL.border}` : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── 1. The trigger, as it appears in the Help Center ──────────────────── */

const portalTrigger = (
  <Screen where="Jira Service Management portal → Help Center" width={860}>
    {/* Product bar */}
    <div className="rounded-t" style={{ background: PORTAL_BLUE, height: 26 }} />

    {/* Hero */}
    <div
      className="relative overflow-hidden px-6 py-8 text-center"
      style={{ background: "linear-gradient(180deg, #0C66E4 0%, #0B5ECB 100%)" }}
    >
      {/* Faint skyline, like the default Atlassian banner */}
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-2 opacity-25" style={{ height: 70 }}>
        {[30, 52, 24, 66, 40, 58, 28, 48, 36, 62, 26, 44].map((h, i) => (
          <span key={i} className="flex-1 rounded-t" style={{ height: h, background: "#0747A6" }} />
        ))}
      </div>
      <div className="relative">
        <div className="text-[19px] font-bold text-white mb-3.5">Welcome to the Help Center</div>
        <div
          className="mx-auto flex items-center gap-2 rounded px-3 py-2"
          style={{ maxWidth: 480, background: "#fff", border: "1px solid rgba(9,30,66,0.14)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B778C" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4.5-4.5" />
          </svg>
          <span className="text-[12.5px]" style={{ color: "#8993A4" }}>
            Search for information
          </span>
        </div>
      </div>
    </div>

    {/* The app's banner trigger, in the portal body */}
    <div className="px-6 py-6" style={{ background: "#fff" }}>
      <div className="mx-auto" style={{ maxWidth: 620 }}>
        <div className="text-[11.5px] font-bold mb-2" style={{ color: ATL.text }}>
          AI Portal Chat
        </div>
        <div
          className="flex items-center gap-3 rounded px-4 py-3"
          style={{ border: `1px solid ${ATL.border}`, background: "#fff" }}
        >
          <ChatIcon size={20} color={PORTAL_BLUE} />
          <div className="min-w-0">
            <div className="text-[12.5px] font-bold" style={{ color: ATL.text }}>
              AI Portal Chat
            </div>
            <div className="text-[11.5px]" style={{ color: ATL.subtle }}>
              How can I help you today?
            </div>
          </div>
          <span
            className="ml-auto rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white shrink-0"
            style={{ background: PORTAL_BLUE }}
          >
            Start a conversation
          </span>
        </div>

        {/* The normal portal content stays exactly where it was */}
        <div className="rounded mt-5 px-4 py-4" style={{ border: `1px solid ${ATL.border}` }}>
          <div className="text-[11.5px] mb-3" style={{ color: ATL.text }}>
            Welcome! You can raise a request for Support using the options provided.
          </div>
          <div className="text-[12px] font-bold mb-2.5" style={{ color: ATL.text }}>
            What can we help you with?
          </div>
          {[
            ["Ask a Question", "Ask a question about our apps or services."],
            ["Report an Incident", "Report a bug or incident with one of our apps."],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-2.5 mb-2.5">
              <span className="rounded-full shrink-0" style={{ width: 18, height: 18, background: "#42526E" }} />
              <div>
                <div className="text-[11.5px] font-semibold" style={{ color: PORTAL_BLUE }}>
                  {title}
                </div>
                <div className="text-[11px]" style={{ color: ATL.text }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Screen>
);

/* ── 2. The chat window when it opens ──────────────────────────────────── */

const chatEmpty = (
  <Screen where="Help Center → Start a conversation" width={520}>
    <div className="mx-auto rounded-lg overflow-hidden" style={{ maxWidth: 420, border: `1px solid ${ATL.border}` }}>
      <ChatHeader />
      <div className="px-5 py-10 text-center" style={{ background: PORTAL_BODY, minHeight: 260 }}>
        <div className="text-[14px] font-bold mb-1.5" style={{ color: ATL.text }}>
          Hi! How can I help you?
        </div>
        <div className="text-[12px] leading-relaxed mb-5" style={{ color: ATL.subtle }}>
          Describe what you need and I&apos;ll find the right service request for you.
        </div>
        <div className="inline-block text-left">
          {[
            ["📎", "Click the clip icon to attach files"],
            ["+", "Press + to start a new conversation"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px]" style={{ color: ATL.subtle, width: 12 }}>
                {icon}
              </span>
              <span className="text-[11.5px]" style={{ color: ATL.text }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ChatComposer />
    </div>
  </Screen>
);

/* ── 3. A real conversation in the same window ─────────────────────────── */

const portalChat = (
  <Screen where="Help Center → AI Portal Chat → a conversation" width={560}>
    <div className="mx-auto rounded-lg overflow-hidden" style={{ maxWidth: 460, border: `1px solid ${ATL.border}` }}>
      <ChatHeader />

      <div className="px-3.5 py-3.5" style={{ background: PORTAL_BODY }}>
        <Bubble from="bot">Hi! Describe what you need and I&apos;ll find the right service request for you.</Bubble>
        <Bubble from="user">my laptop won&apos;t connect to the vpn since the update this morning</Bubble>
        <Bubble from="bot">
          That sounds like the VPN client issue after the 14.2 update. There is a known workaround in the knowledge base
          — <span style={{ color: PORTAL_BLUE, textDecoration: "underline" }}>VPN fails after macOS update</span>. If
          that does not help, I can raise a request for the Endpoint Support team. Shall I?
        </Bubble>

        {/* The request type fields, rendered inside the chat */}
        <div className="rounded-lg px-3 py-3 mb-2.5" style={{ background: "#fff", border: `1px solid ${ATL.border}` }}>
          <div className="text-[11.5px] font-bold mb-2.5" style={{ color: ATL.text }}>
            Report a hardware or connectivity problem
          </div>
          <Select label="Affected device" value="MacBook Pro (INV-2291)" />
          <Select label="Urgency" value="High — cannot work" />
          <Field label="What changed?" value="macOS 14.2 update installed this morning" />
          <Row gap={8}>
            <span
              className="rounded px-3 py-1.5 text-[11.5px] font-medium text-white"
              style={{ background: PORTAL_BLUE }}
            >
              Submit
            </span>
            <span className="rounded px-3 py-1.5 text-[11.5px]" style={{ color: ATL.subtle }}>
              Cancel
            </span>
          </Row>
        </div>

        {/* Confirmation */}
        <div
          className="rounded-lg px-3 py-2.5 mb-2"
          style={{ background: ATL.greenBg, border: "1px solid #ABF5D1" }}
        >
          <div className="text-[11.5px] font-semibold mb-1" style={{ color: ATL.green }}>
            Request created successfully!
          </div>
          <div className="text-[11.5px]" style={{ color: ATL.text }}>
            <Code>ITSD-8841</Code> — Report a hardware or connectivity problem ·{" "}
            <span style={{ color: PORTAL_BLUE, textDecoration: "underline" }}>Click to follow up</span>
          </div>
        </div>
        <div className="text-[11px] text-center" style={{ color: ATL.subtle }}>
          Was this service helpful? &nbsp;👍&nbsp;&nbsp;👎
        </div>
      </div>

      <ChatComposer enabled />
    </div>
  </Screen>
);

/* ── Service desk configuration ────────────────────────────────────────── */

const deskConfig = (
  <Screen where="Jira → Apps → AI Portal Chat → Portal Assistant" width={860}>
    <PageTitle action={<Btn variant="subtle">••• Help</Btn>}>AI Portal Chat</PageTitle>
    <Tabs items={TABS} active="Portal Assistant" />

    <Panel tone="plain" title="Company Instructions">
      <Select label="Ticket & Knowledge Base language" value="🌐 Auto-detect (user language)" />
      <div className="text-[10.5px] -mt-2 mb-3" style={{ color: ATL.subtle }}>
        Defines the language for ticket fields (summary, description) and Knowledge Base searches. When set, the AI
        will use this language regardless of the language the user writes in.
      </div>
      <Field
        label="Custom instructions for AI Portal Chat"
        placeholder="e.g., Always ask for the employee ID. Our IT service desk handles VPN, email, and hardware requests..."
        help="These instructions are included in every AI conversation to guide behavior specific to your organization."
      />
      <Btn variant="primary">Save Instructions</Btn>
    </Panel>

    <Panel tone="plain" title="Service Desk Configuration">
      <Select label="Service Desk" value="Support (SUP)" width={320} />

      <Toggle on label="Enable AI Portal Chat" />
      <div className="text-[10.5px] mb-2.5" style={{ color: ATL.subtle }}>
        When disabled, this service desk will not appear in AI Portal Chat and users will not be able to create
        requests through it.
      </div>
      <Toggle on={false} label="Auto-confirm tickets" />
      <div className="text-[10.5px] mb-2.5" style={{ color: ATL.subtle }}>
        When enabled, tickets are created without asking the user for confirmation.
      </div>
      <Toggle on label="Enable Knowledge Base Search" />
      <div className="text-[10.5px] mb-2.5" style={{ color: ATL.subtle }}>
        When enabled, the AI will search Confluence articles to suggest relevant documentation before creating tickets.
      </div>
      <Field
        label="Confluence Space Keys"
        value="KB, IT"
        help="Only appears once Knowledge Base Search is enabled. Comma-separated space keys."
      />
      <Field
        label="Service desk specific instructions"
        placeholder="e.g., For this service desk, always categorize hardware requests under the Equipment category..."
        help="These instructions are appended for conversations in this service desk only."
      />
      <Btn variant="primary">Save Configuration</Btn>

      <SectionLabel>Request Type Instructions</SectionLabel>
      <Select label="Request Type" value="Ask a Question" width={320} />
      <Field
        label="Request type specific instructions"
        placeholder="e.g., For this request type, always ask about urgency level..."
        help="These instructions are included when the AI handles this request type."
      />
      <Btn variant="primary">Save Request Type Instructions</Btn>
    </Panel>
  </Screen>
);

/* ── Branding ──────────────────────────────────────────────────────────── */

const branding = (
  <Screen where="Jira → Apps → AI Portal Chat → Branding" width={840}>
    <PageTitle action={<Btn variant="subtle">••• Help</Btn>}>AI Portal Chat</PageTitle>
    <Tabs items={TABS} active="Branding" />

    <div className="text-[11.5px] font-semibold mb-2" style={{ color: ATL.text }}>
      Trigger Layout
    </div>
    <Row gap={12}>
      {[
        { name: "Compact", desc: "Small pill button aligned right", on: false },
        { name: "Banner", desc: "Full-width banner with CTA button", on: true },
      ].map((opt) => (
        <div
          key={opt.name}
          className="flex-1 rounded px-4 py-3 text-center"
          style={{
            border: `2px solid ${opt.on ? PORTAL_BLUE : ATL.border}`,
            background: opt.on ? "#E9F2FF" : "#fff",
          }}
        >
          {/* Miniature of the layout */}
          <div className="flex justify-center mb-2.5">
            {opt.name === "Compact" ? (
              <span className="rounded-full" style={{ width: 46, height: 14, background: PORTAL_BLUE }} />
            ) : (
              <span
                className="flex items-center justify-between rounded-full px-1"
                style={{ width: 120, height: 16, background: "#fff", border: `1px solid ${ATL.border}` }}
              >
                <span className="rounded-full" style={{ width: 40, height: 3, background: "#42526E" }} />
                <span className="rounded-full" style={{ width: 30, height: 12, background: PORTAL_BLUE }} />
              </span>
            )}
          </div>
          <div className="text-[12px] font-semibold" style={{ color: ATL.text }}>
            {opt.name}
          </div>
          <div className="text-[10.5px]" style={{ color: ATL.subtle }}>
            {opt.desc}
          </div>
        </div>
      ))}
    </Row>
    <div className="text-[10.5px] mt-1.5 mb-4" style={{ color: ATL.subtle }}>
      Choose how the chat trigger appears in the portal header.
    </div>

    {[
      ["Primary Color", "#0074e0", "Main color for header, buttons, and user messages."],
      ["Secondary Color", "#0065c3", "Hover and accent color."],
    ].map(([label, value, help]) => (
      <div key={label} className="mb-3">
        <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
          {label}
        </div>
        <Row gap={8}>
          <span className="rounded shrink-0" style={{ width: 30, height: 26, background: value, border: `1px solid ${ATL.border}` }} />
          <span
            className="rounded px-2.5 py-1.5 text-[12px]"
            style={{ border: `1px solid ${ATL.border}`, width: 240, color: ATL.text }}
          >
            {value}
          </span>
        </Row>
        <div className="text-[10.5px] mt-1" style={{ color: ATL.subtle }}>
          {help}
        </div>
      </div>
    ))}

    <Field label="Avatar Name" value="AI Portal Chat" help="Name displayed in the chat header." width={420} />

    <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
      Avatar Image
    </div>
    <div
      className="rounded text-center px-4 py-4"
      style={{ border: `1px dashed ${ATL.border}`, width: 120 }}
    >
      <div className="text-[16px]" style={{ color: ATL.subtle }}>
        🖼
      </div>
      <div className="text-[10px] mt-1" style={{ color: ATL.subtle }}>
        Click to upload image
      </div>
    </div>
    <div className="text-[10.5px] mt-1 mb-4" style={{ color: ATL.subtle }}>
      Avatar image shown next to assistant messages (max 128x128px). Leave empty for default icon.
    </div>

    {/* Live preview, as the tab renders it */}
    <div className="rounded overflow-hidden mb-4" style={{ width: 320, border: `1px solid ${ATL.border}` }}>
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#0074e0" }}>
        <ChatIcon size={13} />
        <span className="text-[12px] font-semibold text-white">AI Portal Chat</span>
      </div>
      <div className="px-3 py-3" style={{ background: PORTAL_BODY }}>
        <div className="flex justify-end mb-2">
          <span className="rounded px-2.5 py-1.5 text-[11.5px] text-white" style={{ background: "#0074e0" }}>
            Hello!
          </span>
        </div>
        <div className="flex justify-start mb-2">
          <span
            className="rounded px-2.5 py-1.5 text-[11.5px]"
            style={{ background: "#fff", border: `1px solid ${ATL.border}`, color: ATL.text }}
          >
            Hi! How can I help?
          </span>
        </div>
        <div className="flex justify-end">
          <span className="rounded px-3 py-1.5 text-[11.5px] font-medium text-white" style={{ background: "#0074e0" }}>
            Send
          </span>
        </div>
      </div>
    </div>

    <Btn variant="primary">Save Customization</Btn>
  </Screen>
);

/* ── Operational notice (project page) ─────────────────────────────────── */

const notice = (
  <Screen where="Jira project → Agent Instructions" width={760}>
    <h4 className="text-[20px] font-semibold m-0 mb-6" style={{ color: ATL.text }}>
      Agent Instructions
    </h4>

    <div style={{ maxWidth: 560 }}>
      <div className="text-[16px] font-semibold mb-1" style={{ color: ATL.text }}>
        Agent Prompts
      </div>
      <div className="text-[12px] mb-4" style={{ color: ATL.subtle }}>
        Set real-time operational notices that AI Portal Chat will consider when handling requests.
      </div>

      {/* One card per service desk in the project */}
      <div className="rounded-md px-4 py-4" style={{ border: `1px solid ${ATL.border}` }}>
        <div className="text-[13px] font-semibold mb-3.5" style={{ color: ATL.text }}>
          Support
        </div>

        <div
          className="rounded-md px-3 py-2.5 mb-3.5"
          style={{ background: ATL.yellowBg, border: "1px solid #FFE380" }}
        >
          <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.yellow }}>
            Active prompt
          </div>
          <div className="text-[12px]" style={{ color: ATL.text }}>
            Website is down for maintenance until 12 Feb at 14:00 UTC.
          </div>
          <div className="text-[10.5px] mt-1.5" style={{ color: ATL.subtle }}>
            Expires: 12 Feb 2026 14:00 · Updated: 12 Feb 2026 08:05
          </div>
        </div>

        <div className="text-[11.5px] mb-1" style={{ color: ATL.text }}>
          Operational notice
        </div>
        <div
          className="rounded px-2.5 py-2 text-[12px]"
          style={{ border: `1px solid ${ATL.border}`, color: "#8993A4", minHeight: 56 }}
        >
          e.g., Website is down for maintenance until Feb 12 at 14:00 UTC
        </div>
        <div className="text-[10.5px] mt-1 mb-3.5" style={{ color: ATL.subtle }}>
          The AI will proactively inform users about this notice when relevant.
        </div>

        <div className="text-[11.5px] mb-1" style={{ color: ATL.text }}>
          Auto-expire (optional)
        </div>
        <div
          className="rounded px-2.5 py-1.5 text-[12px] flex items-center justify-between"
          style={{ border: `1px solid ${ATL.border}`, width: 240, color: "#8993A4" }}
        >
          <span>mm/dd/yyyy, --:--</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ATL.subtle} strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </div>
        <div className="text-[10.5px] mt-1 mb-4" style={{ color: ATL.subtle }}>
          The prompt will be automatically ignored after this time.
        </div>

        <Row gap={8}>
          <span
            className="rounded px-3 py-1.5 text-[12px] font-medium"
            style={{ background: "#F1F2F4", color: "#8993A4", border: `1px solid ${ATL.border}` }}
          >
            Set prompt
          </span>
          <span className="rounded px-3 py-1.5 text-[12px]" style={{ color: ATL.subtle }}>
            Clear prompt
          </span>
        </Row>
      </div>
    </div>
  </Screen>
);

/* ── API tab ───────────────────────────────────────────────────────────── */

const api = (
  <Screen where="Jira → Apps → AI Portal Chat → API" width={860}>
    <PageTitle action={<Btn variant="subtle">••• Help</Btn>}>AI Portal Chat</PageTitle>
    <Tabs items={TABS} active="API" />

    <Panel tone="plain" title="API Configuration">
      <div className="text-[11.5px] mb-3" style={{ color: ATL.subtle }}>
        Generate an API token to allow external tools to set agent prompts via the web trigger API.
      </div>
      <div className="text-[11.5px] font-semibold mb-1" style={{ color: ATL.text }}>
        API Token
      </div>
      <div className="text-[11.5px] mb-2" style={{ color: ATL.subtle }}>
        No API token has been generated yet.
      </div>
      <Btn variant="primary">Generate Token</Btn>
    </Panel>

    <Panel tone="plain" title="API Usage">
      <div className="text-[11.5px] mb-3" style={{ color: ATL.subtle }}>
        Use the web trigger URL with the API token to manage agent prompts from external tools.
      </div>
      <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
        API Endpoint
      </div>
      <Row gap={8}>
        <span
          className="flex-1 rounded px-2.5 py-2 text-[11px] break-all"
          style={{ background: "#F4F5F7", border: `1px solid ${ATL.border}`, fontFamily: "var(--font-mono, monospace)" }}
        >
          https://ad98613a-3027-4c93-b019-7357f36cd1ab.hello.atlassian-dev.net/x1/OuhgR5H3jW6kV_anUAr…
        </span>
        <Btn variant="subtle">Copy</Btn>
      </Row>

      {[
        ["Set a prompt:", '{ "action": "set", "projectKey": "SD", "prompt": "Website down until Feb 12 14:00", "expiresAt": "2026-02-12T14:00:00Z" }'],
        ["Get current prompt:", '{ "action": "get", "projectKey": "SD" }'],
        ["Delete a prompt:", '{ "action": "delete", "projectKey": "SD" }'],
      ].map(([label, body]) => (
        <div key={label} className="mt-3">
          <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.text }}>
            {label}
          </div>
          <pre
            className="m-0 rounded px-2.5 py-2 text-[10.5px] leading-relaxed overflow-x-auto"
            style={{ background: "#F4F5F7", border: `1px solid ${ATL.border}`, fontFamily: "var(--font-mono, monospace)" }}
          >{`curl -X POST <endpoint> \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '${body}'`}</pre>
        </div>
      ))}
    </Panel>
  </Screen>
);

/* ── Statistics ────────────────────────────────────────────────────────── */

const statistics = (
  <Screen where="Jira → Apps → AI Portal Chat → Statistics" width={860}>
    <PageTitle action={<Btn variant="subtle">••• Help</Btn>}>AI Portal Chat</PageTitle>
    <Tabs items={TABS} active="Statistics" />

    <div className="flex items-center justify-between mb-4">
      <Row gap={6}>
        <Btn variant="subtle">Today</Btn>
        <Btn variant="subtle">This Week</Btn>
        <Btn variant="primary">This Month</Btn>
        <Btn variant="subtle">Custom</Btn>
      </Row>
      <span className="text-[11.5px]" style={{ color: ATL.subtle }}>
        Refreshing…
      </span>
    </div>

    <Row gap={12}>
      {[
        ["Conversations", "1,842", ATL.primary],
        ["Tickets created", "712", ATL.primary],
        ["Feedback", "👍 486   👎 41", "#946F00"],
      ].map(([label, value, accent]) => (
        <div
          key={label as string}
          className="flex-1 rounded-md px-4 py-3.5 text-center"
          style={{ border: `1px solid ${ATL.border}`, borderTop: `3px solid ${accent as string}` }}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: ATL.subtle }}>
            {label}
          </div>
          <div className="text-[20px] font-semibold mt-1" style={{ color: ATL.text }}>
            {value}
          </div>
        </div>
      ))}
    </Row>

    <div className="flex justify-end mt-4 mb-2">
      <Row gap={0}>
        <Btn variant="primary">Last 12 Weeks</Btn>
        <Btn>Last 12 Months</Btn>
      </Row>
    </div>

    {[
      ["Tickets Created", [4, 7, 5, 9, 6, 11, 8, 6, 10, 7, 12, 9], ATL.primary],
      ["Conversations", [11, 16, 12, 21, 15, 26, 19, 14, 24, 18, 29, 22], "#5243AA"],
    ].map(([title, bars, color]) => (
      <div key={title as string} className="mb-3">
        <Panel tone="plain" title={title as string}>
          <div className="flex items-end gap-2" style={{ height: 70 }}>
            {(bars as number[]).map((h, i) => (
              <span key={i} className="flex-1 rounded-t" style={{ height: h * 2.2, background: color as string, opacity: 0.85 }} />
            ))}
          </div>
          <div className="flex justify-between text-[9.5px] mt-1.5" style={{ color: ATL.subtle }}>
            {["2026-W23", "2026-W25", "2026-W27", "2026-W29", "2026-W31", "2026-W33"].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </Panel>
      </div>
    ))}
  </Screen>
);

export const AI_PORTAL_MOCKS: Record<string, ReactNode> = {
  "ap-portal-trigger": portalTrigger,
  "ap-chat-empty": chatEmpty,
  "ap-portal-chat": portalChat,
  "ap-desk-config": deskConfig,
  "ap-branding": branding,
  "ap-notice": notice,
  "ap-api": api,
  "ap-statistics": statistics,
};
