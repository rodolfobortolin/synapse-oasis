import type { ReactNode } from "react";
import DiagramBlock from "./DiagramBlock";
import MathBlock from "./MathBlock";
import { MOCKS } from "../mocks";
import { headingAnchors } from "../lib";
import type { Block } from "../types";

/* ── Inline markup: **bold**, `code`, [label](href) ─────────────────────── */

function inline(text: string): ReactNode[] {
  // Bold is matched before italic so `**x**` is not read as two italics.
  //
  // Emphasis recurses into its own content: `**[label](href)**` matches the bold
  // pattern first, and without recursing the link inside it rendered as literal
  // markdown. Code spans do not recurse — their content is meant to be literal.
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold" style={{ color: "var(--navy)" }}>
          {inline(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {inline(part.slice(1, -1))}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded px-1.5 py-0.5 text-[0.86em]"
          style={{
            background: "var(--offwhite)",
            border: "1px solid var(--border)",
            color: "var(--navy)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      return (
        <a
          key={i}
          href={link[2]}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="underline underline-offset-2 hover:opacity-75"
          style={{ color: "var(--blue-cta)" }}
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

/* ── Callouts ──────────────────────────────────────────────────────────── */

const CALLOUTS = {
  info: { bg: "rgba(43,46,216,0.05)", border: "rgba(43,46,216,0.2)", fg: "#2B2ED8", label: "Note" },
  warning: { bg: "rgba(236,133,70,0.07)", border: "rgba(236,133,70,0.3)", fg: "#B45309", label: "Important" },
  tip: { bg: "rgba(43,196,138,0.07)", border: "rgba(43,196,138,0.3)", fg: "#0F7B58", label: "Tip" },
} as const;

function CalloutIcon({ variant }: { variant: keyof typeof CALLOUTS }) {
  const c = CALLOUTS[variant];
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.fg} strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5">
      {variant === "warning" ? (
        <>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>
      ) : variant === "tip" ? (
        <>
          <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </>
      )}
    </svg>
  );
}

/* ── Renderer ──────────────────────────────────────────────────────────── */

export default function DocsContent({
  title,
  description,
  blocks,
}: {
  title: string;
  description: string;
  blocks: Block[];
}) {
  const anchors = headingAnchors(blocks);

  return (
    <article className="min-w-0">
      <header className="mb-9">
        <h1
          className="font-semibold mb-3"
          style={{ color: "var(--navy)", fontSize: "clamp(26px, 3.2vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
        >
          {title}
        </h1>
        <p className="text-[15.5px] leading-relaxed" style={{ color: "var(--grey)" }}>
          {inline(description)}
        </p>
      </header>

      {blocks.map((b, i) => {
        switch (b.type) {
          case "h": {
            const a = anchors.get(i);
            const Tag = b.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={i}
                id={a?.id}
                className={b.level === 2 ? "font-bold mt-12 mb-4 scroll-mt-28" : "font-bold mt-8 mb-3 scroll-mt-28"}
                style={{
                  color: "var(--navy)",
                  fontSize: b.level === 2 ? 21 : 17,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                }}
              >
                {inline(b.text)}
              </Tag>
            );
          }

          case "p":
            return (
              <p key={i} className="text-[15px] leading-[1.75] mb-4" style={{ color: "#3F4756" }}>
                {inline(b.text)}
              </p>
            );

          case "list":
            return (
              <ul key={i} className="mb-5 space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2.5 text-[15px] leading-[1.7]" style={{ color: "#3F4756" }}>
                    <span className="shrink-0 mt-[9px] w-1.5 h-1.5 rounded-full" style={{ background: "var(--purple)" }} />
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ul>
            );

          case "steps":
            return (
              <ol key={i} className="mb-6 space-y-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-[1.7]" style={{ color: "#3F4756" }}>
                    <span
                      className="shrink-0 inline-flex items-center justify-center rounded-full text-[11px] font-bold"
                      style={{ width: 22, height: 22, background: "var(--blue-cta)", color: "#fff", marginTop: 2 }}
                    >
                      {j + 1}
                    </span>
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ol>
            );

          case "fields":
            return (
              <dl key={i} className="mb-6 rounded-lg overflow-hidden" style={{ border: "1px dashed var(--border)" }}>
                {b.items.map((f, j) => (
                  <div
                    key={j}
                    className="px-4 py-3 md:flex md:gap-5"
                    style={{ borderTop: j === 0 ? "none" : "1px dashed var(--border)", background: j % 2 ? "var(--offwhite)" : "#fff" }}
                  >
                    <dt
                      className="text-[13px] font-semibold md:w-52 md:shrink-0 mb-1 md:mb-0"
                      style={{ color: "var(--navy)" }}
                    >
                      {inline(f.name)}
                    </dt>
                    <dd className="text-[14px] leading-[1.6] m-0" style={{ color: "#3F4756" }}>
                      {inline(f.text)}
                    </dd>
                  </div>
                ))}
              </dl>
            );

          case "table":
            return (
              <div key={i} className="mb-6 overflow-x-auto rounded-lg" style={{ border: "1px solid var(--border)" }}>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ background: "var(--navy)" }}>
                      {b.head.map((h) => (
                        <th
                          key={h}
                          className="text-left px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="even:bg-[var(--offwhite)]">
                        {r.map((c, k) => (
                          <td
                            key={k}
                            className="px-3.5 py-2.5 text-[13px] align-top"
                            style={{ borderTop: "1px solid var(--border)", color: "#3F4756" }}
                          >
                            {inline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "code":
            return (
              <div key={i} className="mb-6">
                {b.label && (
                  <div
                    className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-t-lg"
                    style={{ background: "var(--navy)", color: "rgba(255,255,255,0.6)" }}
                  >
                    {b.label}
                  </div>
                )}
                <pre
                  className={`overflow-x-auto p-4 text-[12.5px] leading-relaxed ${b.label ? "rounded-b-lg" : "rounded-lg"}`}
                  style={{ background: "var(--navy-deep)", color: "#D6DBE6", fontFamily: "var(--font-mono)" }}
                >
                  <code>{b.text}</code>
                </pre>
              </div>
            );

          case "callout": {
            const c = CALLOUTS[b.variant];
            return (
              <div
                key={i}
                className="rounded-lg p-4 my-6 flex gap-3"
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              >
                <CalloutIcon variant={b.variant} />
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: c.fg }}>
                    {b.title || c.label}
                  </div>
                  <div className="text-[14px] leading-[1.65]" style={{ color: "#3F4756" }}>
                    {inline(b.text)}
                  </div>
                </div>
              </div>
            );
          }

          case "diagram":
            return <DiagramBlock key={i} text={b.text} caption={b.caption} label={b.label} />;

          case "math":
            return <MathBlock key={i} text={b.text} caption={b.caption} label={b.label} />;

          case "mock": {
            const mock = MOCKS[b.id];
            if (!mock) return null;
            return (
              <figure key={i} className="m-0">
                {mock}
                {b.caption && (
                  <figcaption className="text-xs italic text-center -mt-4 mb-7" style={{ color: "var(--grey)" }}>
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </article>
  );
}
