import type { ReactNode } from "react";

/**
 * Primitives for the simulated app screens used across the documentation.
 *
 * These are illustrations, not screenshots: they are built from the same labels the
 * apps ship (taken from each app's UI source and locale files) so the docs can show
 * where a control lives without shipping binary screenshots that go stale silently.
 *
 * Colors follow the Atlassian design tokens the apps render with, so a reader
 * recognises the screen. Everything is inert markup — no interactivity, no scripts.
 */

export const ATL = {
  text: "#172B4D",
  subtle: "#6B778C",
  border: "#DFE1E6",
  bg: "#FFFFFF",
  bgSubtle: "#F4F5F7",
  primary: "#0052CC",
  primaryBg: "#DEEBFF",
  green: "#006644",
  greenBg: "#E3FCEF",
  red: "#BF2600",
  redBg: "#FFEBE6",
  yellow: "#974F0C",
  yellowBg: "#FFFAE6",
  purple: "#403294",
  purpleBg: "#EAE6FF",
  teal: "#008DA6",
  tealBg: "#E6FCFF",
} as const;

/* ── Frame ─────────────────────────────────────────────────────────────── */

/**
 * Window chrome around a simulated screen. `where` names the place in Jira,
 * Confluence or the portal the screen is reached from.
 */
export function Screen({
  where,
  children,
  width = 900,
}: {
  where: string;
  children: ReactNode;
  width?: number;
}) {
  return (
    // The text column is ~790px; screens are wider, so they break out on large
    // viewports rather than living permanently inside a horizontal scrollbar.
    <div className="my-7 lg:-mx-8 xl:-mx-12">
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: `1px solid ${ATL.border}`, boxShadow: "0 8px 24px rgba(9,30,66,0.08)" }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: ATL.bgSubtle, borderBottom: `1px solid ${ATL.border}` }}
        >
          <span className="flex gap-1.5">
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </span>
          <span
            className="ml-2 text-[11px] font-medium truncate"
            style={{ color: ATL.subtle, fontFamily: "var(--font-mono, monospace)" }}
          >
            {where}
          </span>
          <span
            className="ml-auto text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
            style={{ background: "rgba(9,30,66,0.06)", color: ATL.subtle }}
          >
            Illustration
          </span>
        </div>
        {/* Body */}
        <div className="overflow-x-auto" style={{ background: ATL.bg }}>
          <div style={{ minWidth: width, color: ATL.text }} className="p-5 text-[13px] leading-normal">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs italic text-center -mt-4 mb-7" style={{ color: "var(--grey)" }}>
      {children}
    </p>
  );
}

/* ── Structure ─────────────────────────────────────────────────────────── */

export function PageTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <h4 className="text-[20px] font-semibold m-0" style={{ color: ATL.text }}>
        {children}
      </h4>
      {action}
    </div>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] m-0 mb-4" style={{ color: ATL.subtle }}>
      {children}
    </p>
  );
}

export function Tabs({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="flex gap-5 mb-5 overflow-x-auto" style={{ borderBottom: `2px solid ${ATL.border}` }}>
      {items.map((it) => {
        const on = it === active;
        return (
          <span
            key={it}
            className="pb-2 text-[13px] whitespace-nowrap"
            style={{
              color: on ? ATL.primary : ATL.subtle,
              fontWeight: on ? 600 : 400,
              boxShadow: on ? `inset 0 -2px 0 ${ATL.primary}` : "none",
            }}
          >
            {it}
          </span>
        );
      })}
    </div>
  );
}

export function SideTabs({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="w-[172px] shrink-0 pr-4" style={{ borderRight: `1px solid ${ATL.border}` }}>
      {items.map((it) => {
        const on = it === active;
        return (
          <div
            key={it}
            className="px-2.5 py-1.5 rounded text-[13px] mb-0.5"
            style={{
              background: on ? ATL.primaryBg : "transparent",
              color: on ? ATL.primary : ATL.text,
              fontWeight: on ? 600 : 400,
            }}
          >
            {it}
          </div>
        );
      })}
    </div>
  );
}

export function Row({ children, gap = 12 }: { children: ReactNode; gap?: number }) {
  return (
    <div className="flex items-start" style={{ gap }}>
      {children}
    </div>
  );
}

export function Panel({
  children,
  title,
  tone = "plain",
}: {
  children: ReactNode;
  title?: string;
  tone?: "plain" | "subtle" | "info" | "warn" | "success";
}) {
  const tones = {
    plain: { bg: ATL.bg, border: ATL.border },
    subtle: { bg: ATL.bgSubtle, border: ATL.border },
    info: { bg: ATL.primaryBg, border: "#B3D4FF" },
    warn: { bg: ATL.yellowBg, border: "#FFE380" },
    success: { bg: ATL.greenBg, border: "#ABF5D1" },
  } as const;
  const s = tones[tone];
  return (
    <div className="rounded-md p-3.5 mb-3" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      {title && (
        <div className="text-[12px] font-semibold mb-2" style={{ color: ATL.text }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[11px] font-bold uppercase tracking-wider mt-5 mb-2.5"
      style={{ color: ATL.subtle }}
    >
      {children}
    </div>
  );
}

/* ── Controls ──────────────────────────────────────────────────────────── */

export function Btn({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "primary" | "default" | "subtle" | "danger";
}) {
  const styles = {
    primary: { background: ATL.primary, color: "#fff", border: ATL.primary },
    default: { background: "rgba(9,30,66,0.04)", color: ATL.text, border: "rgba(9,30,66,0.08)" },
    subtle: { background: "transparent", color: ATL.subtle, border: "transparent" },
    danger: { background: "#DE350B", color: "#fff", border: "#DE350B" },
  } as const;
  const s = styles[variant];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[12px] font-medium whitespace-nowrap"
      style={{ background: s.background, color: s.color, border: `1px solid ${s.border}` }}
    >
      {children}
    </span>
  );
}

export function Field({
  label,
  value,
  help,
  placeholder,
  width,
}: {
  label?: string;
  value?: string;
  help?: string;
  placeholder?: string;
  width?: number | string;
}) {
  return (
    <div className="mb-3" style={{ width: width ?? "100%" }}>
      {label && (
        <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
          {label}
        </div>
      )}
      <div
        className="rounded px-2.5 py-1.5 text-[12px]"
        style={{
          border: `1px solid ${ATL.border}`,
          background: ATL.bg,
          color: value ? ATL.text : "#8993A4",
        }}
      >
        {value || placeholder || ""}
      </div>
      {help && (
        <div className="text-[11px] mt-1" style={{ color: ATL.subtle }}>
          {help}
        </div>
      )}
    </div>
  );
}

export function Select({ label, value, width }: { label?: string; value: string; width?: number | string }) {
  return (
    <div className="mb-3" style={{ width: width ?? "100%" }}>
      {label && (
        <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
          {label}
        </div>
      )}
      <div
        className="rounded px-2.5 py-1.5 text-[12px] flex items-center justify-between gap-2"
        style={{ border: `1px solid ${ATL.border}`, background: ATL.bg }}
      >
        <span>{value}</span>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke={ATL.subtle} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function Toggle({ on, label }: { on: boolean; label?: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span
        className="inline-flex items-center rounded-full p-0.5"
        style={{ width: 28, background: on ? ATL.green : "#A5ADBA", justifyContent: on ? "flex-end" : "flex-start" }}
      >
        <span className="rounded-full bg-white" style={{ width: 12, height: 12 }} />
      </span>
      {label && <span className="text-[12px]">{label}</span>}
    </div>
  );
}

export function Checkbox({ on, label }: { on: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span
        className="inline-flex items-center justify-center rounded"
        style={{
          width: 14,
          height: 14,
          background: on ? ATL.primary : ATL.bg,
          border: `1px solid ${on ? ATL.primary : "#8993A4"}`,
        }}
      >
        {on && (
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M3.5 8.5l3 3 6-6.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="text-[12px]">{label}</span>
    </div>
  );
}

export function Lozenge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "danger" | "warn" | "info" | "purple" | "teal";
}) {
  const tones = {
    default: { bg: "rgba(9,30,66,0.06)", fg: ATL.subtle },
    success: { bg: ATL.greenBg, fg: ATL.green },
    danger: { bg: ATL.redBg, fg: ATL.red },
    warn: { bg: ATL.yellowBg, fg: ATL.yellow },
    info: { bg: ATL.primaryBg, fg: ATL.primary },
    purple: { bg: ATL.purpleBg, fg: ATL.purple },
    teal: { bg: ATL.tealBg, fg: ATL.teal },
  } as const;
  const s = tones[tone];
  return (
    <span
      className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide align-middle"
      style={{ background: s.bg, color: s.fg }}
    >
      {children}
    </span>
  );
}

export function Avatar({ initials, color = ATL.primary }: { initials: string; color?: string }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-[10px] font-bold text-white shrink-0"
      style={{ width: 22, height: 22, background: color }}
    >
      {initials}
    </span>
  );
}

export function Bar({ pct, tone = ATL.primary, label }: { pct: number; tone?: string; label?: string }) {
  return (
    <div className="w-full">
      <div className="rounded-full overflow-hidden" style={{ height: 6, background: "rgba(9,30,66,0.08)" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: tone }} />
      </div>
      {label && (
        <div className="text-[10px] mt-1" style={{ color: ATL.subtle }}>
          {label}
        </div>
      )}
    </div>
  );
}

export function Stat({ value, label, tone = ATL.text }: { value: string; label: string; tone?: string }) {
  return (
    <div
      className="rounded-md px-3.5 py-3 flex-1 min-w-[110px]"
      style={{ border: `1px solid ${ATL.border}`, background: ATL.bg }}
    >
      <div className="text-[22px] font-semibold leading-none tabular-nums" style={{ color: tone }}>
        {value}
      </div>
      <div className="text-[11px] mt-1.5" style={{ color: ATL.subtle }}>
        {label}
      </div>
    </div>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="rounded-md overflow-hidden" style={{ border: `1px solid ${ATL.border}` }}>
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr style={{ background: ATL.bgSubtle }}>
            {head.map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider"
                style={{ color: ATL.subtle, borderBottom: `1px solid ${ATL.border}` }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td
                  key={j}
                  className="px-3 py-2 align-middle"
                  style={{ borderTop: i === 0 ? "none" : `1px solid ${ATL.border}` }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Jira-style field on an issue view. */
export function IssueField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-3">
      <div className="text-[11px] font-semibold mb-1" style={{ color: ATL.subtle }}>
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code
      className="rounded px-1 py-0.5 text-[11px]"
      style={{ background: ATL.bgSubtle, border: `1px solid ${ATL.border}`, fontFamily: "var(--font-mono, monospace)" }}
    >
      {children}
    </code>
  );
}
