"use client";

/**
 * A Mermaid diagram, rendered in the browser.
 *
 * The documentation section is statically prerendered (every page is emitted at
 * build time), and Mermaid needs a DOM to measure text before it can lay a
 * diagram out. So this is a client component: the server ships the source and
 * the browser draws it on hydration. The <noscript> fallback keeps the source
 * readable when nothing runs.
 *
 * The palette below is the app's own — the light half of `mermaidConfigFor` in
 * `markdown-macro-ui/src/renderer.ts` — so a diagram on this page is coloured
 * the way the same diagram is coloured inside a Confluence page. What is *not*
 * copied here is the recolour pass in `mermaid-theme.ts`: that exists because
 * the Forge iframe's CSP drops the stylesheet Mermaid embeds in its SVG, which
 * is a Forge problem and not a problem this site has.
 */

import { useEffect, useId, useState } from "react";

type Mode = "light" | "dark";

/* ── Theme ─────────────────────────────────────────────────────────────── */

/**
 * The site paints a single light palette today: `globals.css` has no
 * `prefers-color-scheme` block, so following the OS here would put a dark
 * diagram on a permanently light page. The switch this watches is
 * `data-theme` on <html> — the moment the site grows a dark palette and sets
 * that attribute, diagrams follow it and re-render, with no change here.
 */
function useColorMode(): Mode {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const read = (): Mode =>
      document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setMode(read());
    const observer = new MutationObserver(() => setMode(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return mode;
}

function configFor(mode: Mode) {
  const dark = mode === "dark";
  return {
    startOnLoad: false,
    theme: (dark ? "dark" : "default") as "dark" | "default",
    // Let a diagram keep its natural width and scroll inside its panel. Fitting
    // to the container shrinks a wide ER or sequence diagram until the labels
    // are unreadable, and this column is narrow.
    useMaxWidth: false,
    flowchart: { useMaxWidth: false, htmlLabels: true },
    sequence: { useMaxWidth: false },
    // Gantt has no auto-sizing — Mermaid draws it on a fixed canvas however many
    // tasks it holds — so a roadmap needs to be told how wide it is.
    gantt: { useMaxWidth: false, useWidth: 1100 },
    journey: { useMaxWidth: false },
    er: { useMaxWidth: false, fontSize: 12 },
    class: { useMaxWidth: false },
    state: { useMaxWidth: false },
    pie: { useMaxWidth: false },
    // The newer types default to fitting the container, which in a 786px
    // documentation column squeezes a timeline's event labels down to a few
    // pixels. Same treatment as the rest: natural size, and scroll.
    timeline: { useMaxWidth: false },
    mindmap: { useMaxWidth: false },
    kanban: { useMaxWidth: false },
    c4: { useMaxWidth: false },
    packet: { useMaxWidth: false },
    treemap: { useMaxWidth: false },
    block: { useMaxWidth: false },
    requirement: { useMaxWidth: false },
    architecture: { useMaxWidth: false },
    // Sankey draws on a 600x400 canvas by default, which overlaps its node
    // labels as soon as the names are words rather than letters.
    sankey: { useMaxWidth: false, width: 1000, height: 430 },
    themeVariables: dark
      ? {
          background: "#1D2125",
          textColor: "#C7D1DB",
          titleColor: "#C7D1DB",
          primaryColor: "#1C2B41",
          primaryTextColor: "#C7D1DB",
          primaryBorderColor: "#579DFF",
          lineColor: "#8C9BAB",
          secondaryColor: "#22272B",
          tertiaryColor: "#282E33",
          nodeBorder: "#579DFF",
          mainBkg: "#1C2B41",
          clusterBkg: "#22272B",
          edgeLabelBackground: "#1D2125",
          taskBkgColor: "#0C66E4",
          activeTaskBkgColor: "#579DFF",
          doneTaskBkgColor: "#2ABB7F",
          taskTextColor: "#FFFFFF",
          taskTextDarkColor: "#FFFFFF",
          sectionBkgColor: "#22272B",
          sectionBkgColor2: "#282E33",
          gridColor: "#38414A",
          todayLineColor: "#FF5630",
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontSize: "14px",
        }
      : {
          background: "#FFFFFF",
          textColor: "#172B4D",
          titleColor: "#172B4D",
          primaryColor: "#E3F2FD",
          primaryTextColor: "#172B4D",
          primaryBorderColor: "#0052CC",
          lineColor: "#6B778C",
          secondaryColor: "#F4F5F7",
          tertiaryColor: "#DEEBFF",
          nodeBorder: "#0052CC",
          mainBkg: "#E3F2FD",
          clusterBkg: "#F4F5F7",
          edgeLabelBackground: "#FFFFFF",
          taskBkgColor: "#0052CC",
          activeTaskBkgColor: "#4C9AFF",
          doneTaskBkgColor: "#006644",
          taskTextColor: "#FFFFFF",
          taskTextDarkColor: "#FFFFFF",
          sectionBkgColor: "#F4F5F7",
          sectionBkgColor2: "#EBECF0",
          gridColor: "#DFE1E6",
          todayLineColor: "#FF5630",
          fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          fontSize: "14px",
        },
    // 'antiscript', not 'loose': Mermaid only runs DOMPurify over label text
    // when the level is not 'loose', and several of these diagrams carry <br/>
    // in their labels, which 'strict' would escape into visible markup.
    securityLevel: "antiscript" as const,
  };
}

/* ── Render queue ──────────────────────────────────────────────────────── */

type MermaidApi = typeof import("mermaid").default;

let mermaidApi: MermaidApi | null = null;
let initialisedFor: Mode | null = null;
let fibersHidden = false;

/**
 * Work around a Mermaid bug that breaks `block-beta` on any React page.
 *
 * Mermaid's block layout calls `log.debug("getBlocks", JSON.stringify(root))`,
 * and the argument is built whether or not debug logging is on. `root` reaches
 * a real DOM node, and React writes `__reactFiber$…` / `__reactProps$…` onto the
 * nodes it owns as plain enumerable properties whose values point back at the
 * element. So the stringify hits a cycle and throws, and every block diagram
 * fails with "Converting circular structure to JSON" — including a two-node one.
 *
 * The App Router renders <html> and <body> itself, which is why this site is
 * affected where a Vite app mounting into a #root div is not. Making those
 * properties non-enumerable removes them from JSON.stringify's view and changes
 * nothing else: React looks them up by name, and nothing else should be walking
 * a DOM node's own keys. Verified by reproducing the failure in a bare page with
 * a hand-made fiber, then fixing it with exactly this.
 */
function hideReactFibers() {
  if (fibersHidden) return;
  fibersHidden = true;
  for (const el of [document.documentElement, document.body]) {
    if (!el) continue;
    for (const key of Object.keys(el)) {
      if (key.startsWith("__react")) {
        try {
          Object.defineProperty(el, key, { enumerable: false });
        } catch {
          /* not configurable: nothing to do, block diagrams will report the error */
        }
      }
    }
  }
}

/**
 * Renders are serialised. `initialize` is global state and `render` appends a
 * temporary measuring element to <body>, so a page holding twenty diagrams that
 * all mount in the same tick would otherwise race each other through both.
 */
let queue: Promise<unknown> = Promise.resolve();

async function renderDiagram(id: string, text: string, mode: Mode): Promise<string> {
  const run = async () => {
    hideReactFibers();
    if (!mermaidApi) mermaidApi = (await import("mermaid")).default;
    if (initialisedFor !== mode) {
      mermaidApi.initialize(configFor(mode));
      initialisedFor = mode;
    }
    const { svg } = await mermaidApi.render(id, text);
    return svg;
  };
  const next = queue.then(run, run);
  queue = next.catch(() => undefined);
  return next;
}

/* ── Component ─────────────────────────────────────────────────────────── */

export default function DiagramBlock({
  text,
  caption,
  label,
}: {
  text: string;
  caption?: string;
  label?: string;
}) {
  // useId gives a value stable across server and client, so hydration matches.
  const id = "mmd" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const mode = useColorMode();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setSvg(null);
    setError(null);

    renderDiagram(id, text, mode).then(
      (out) => {
        if (!cancelled) setSvg(out);
      },
      (err: unknown) => {
        // A failed parse leaves Mermaid's measuring element behind — that is the
        // stray "Syntax error in text" graphic that turns up at the end of the
        // document, outside any block. Take it with the failure.
        document.querySelectorAll(`#d${id}, #${id}`).forEach((el) => el.remove());
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      },
    );

    return () => {
      cancelled = true;
    };
  }, [id, text, mode]);

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
            {label ? `\`\`\`mermaid · ${label}` : "```mermaid"}
          </span>
          {/* Same badge the simulated app screens carry (see ../mocks/ui.tsx):
              a reader has to be able to tell an example apart from the page. */}
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
          <pre
            className="m-0 overflow-x-auto p-4 text-[12px]"
            style={{ color: "#B45309", fontFamily: "var(--font-mono)" }}
          >
            <code>Mermaid could not render this diagram: {error}</code>
          </pre>
        ) : svg ? (
          // Mermaid sanitises label text at this security level, and every source
          // on this site is authored in the repository rather than user input.
          <div className="docs-diagram" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div
            className="px-4 py-8 text-[12px] text-center"
            style={{ color: "var(--grey)" }}
            aria-hidden
          >
            Rendering diagram…
          </div>
        )}

        <noscript>
          <pre
            className="m-0 overflow-x-auto p-4 text-[12px] leading-relaxed"
            style={{ background: "var(--navy-deep)", color: "#D6DBE6", fontFamily: "var(--font-mono)" }}
          >
            <code>{text}</code>
          </pre>
        </noscript>
      </div>

      {caption && (
        <figcaption className="text-xs italic text-center mt-2" style={{ color: "var(--grey)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
