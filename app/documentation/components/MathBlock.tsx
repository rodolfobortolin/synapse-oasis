"use client";

/**
 * A block of Markdown with LaTeX in it, typeset the way the macro typesets it.
 *
 * It exists because the page that documents the maths support was showing the
 * `$$…$$` source as plain text, one line under a sentence promising it would be
 * "typeset by KaTeX in the browser". A documentation page that describes a
 * rendering and then does not render is worse than one that never claimed to:
 * the reader concludes the feature does not work.
 *
 * Client-side for the same reason `DiagramBlock` is: the documentation is
 * prerendered at build time, and this shows the reader the browser doing the
 * work, which is exactly what happens inside a Confluence page.
 *
 * The delimiters are the app's own, and so is the rule that guards them: a `$`
 * followed by a space, or a closing `$` followed by a digit, is money and not
 * maths. Without that, "costs $10 … and $25" became one span of mathematics
 * covering the whole sentence.
 */

import { useEffect, useId, useRef, useState } from "react";
import "katex/dist/katex.min.css";

/** Display maths: `$$ … $$` on its own lines. */
const DISPLAY = /\$\$([\s\S]+?)\$\$/g;
/** Inline maths: `$ … $`, with no space just inside and no digit just after. */
const INLINE = /\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d)/g;

interface Piece {
  kind: "text" | "inline" | "display";
  value: string;
}

/** Split a document into text and the maths inside it, display first. */
export function splitMath(source: string): Piece[] {
  const out: Piece[] = [];

  let last = 0;
  for (const m of source.matchAll(DISPLAY)) {
    if (m.index > last) out.push({ kind: "text", value: source.slice(last, m.index) });
    out.push({ kind: "display", value: m[1].trim() });
    last = m.index + m[0].length;
  }
  if (last < source.length) out.push({ kind: "text", value: source.slice(last) });

  // Inline maths is found inside what display maths left behind, so a `$` that
  // is part of a display block is never considered twice.
  return out.flatMap((piece) => {
    if (piece.kind !== "text") return [piece];
    const parts: Piece[] = [];
    let cursor = 0;
    for (const m of piece.value.matchAll(INLINE)) {
      if (m.index > cursor) parts.push({ kind: "text", value: piece.value.slice(cursor, m.index) });
      parts.push({ kind: "inline", value: m[1] });
      cursor = m.index + m[0].length;
    }
    if (cursor < piece.value.length) parts.push({ kind: "text", value: piece.value.slice(cursor) });
    return parts;
  });
}

export default function MathBlock({
  text,
  caption,
  label,
}: {
  text: string;
  caption?: string;
  label?: string;
}) {
  const id = useId();
  const host = useRef<HTMLDivElement>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const target = host.current;
    if (!target) return;

    import("katex")
      .then(({ default: katex }) => {
        if (cancelled) return;
        target.replaceChildren();

        for (const piece of splitMath(text)) {
          if (piece.kind === "text") {
            // Plain text keeps its line breaks; this is a Markdown snippet, not
            // a paragraph, so the shape of it is part of the example.
            const span = document.createElement("span");
            span.style.whiteSpace = "pre-wrap";
            span.textContent = piece.value;
            target.appendChild(span);
            continue;
          }
          const el = document.createElement(piece.kind === "display" ? "div" : "span");
          katex.render(piece.value, el, {
            displayMode: piece.kind === "display",
            throwOnError: false,
          });
          target.appendChild(el);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      });

    return () => {
      cancelled = true;
    };
  }, [text, id]);

  return (
    <figure className="m-0 mb-7">
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--diagram-surface)" }}
      >
        <div
          className="flex items-center gap-3 px-3 py-1.5"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--offwhite)" }}
        >
          <span
            className="text-[10.5px] font-semibold uppercase tracking-wider truncate"
            style={{ color: "var(--grey)", fontFamily: "var(--font-mono)" }}
          >
            {label ? `KaTeX · ${label}` : "KaTeX"}
          </span>
          <span
            className="ml-auto text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0"
            style={{ background: "rgba(9,30,66,0.06)", color: "var(--grey)" }}
          >
            Example
          </span>
          <button
            type="button"
            onClick={() => setSourceOpen((v) => !v)}
            className="text-[11px] font-semibold hover:opacity-70 shrink-0"
            style={{ color: "var(--blue-cta)" }}
            aria-expanded={sourceOpen}
          >
            {sourceOpen ? "Hide source" : "Show source"}
          </button>
        </div>

        {sourceOpen && (
          <pre
            className="m-0 overflow-x-auto p-4 text-[12px] leading-relaxed"
            style={{
              background: "var(--navy-deep)",
              color: "#D6DBE6",
              fontFamily: "var(--font-mono)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <code>{text}</code>
          </pre>
        )}

        {error ? (
          <pre className="m-0 overflow-x-auto p-4 text-[12px]" style={{ color: "#B45309" }}>
            {error}
          </pre>
        ) : (
          <div ref={host} className="p-4 text-[13.5px] leading-relaxed overflow-x-auto">
            {/* Server-rendered fallback, replaced on hydration. Without it the
                block is empty for anyone with JavaScript off, and empty is the
                one thing this component exists to prevent. */}
            <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-2 text-[12.5px]" style={{ color: "var(--grey)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
