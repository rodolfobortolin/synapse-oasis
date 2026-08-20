"use client";

import { useEffect, useState } from "react";
import type { Anchor } from "../lib";

/** Right-hand table of contents with scroll spy over the rendered headings. */
export default function DocsToc({ anchors }: { anchors: Anchor[] }) {
  const [active, setActive] = useState<string>(anchors[0]?.id ?? "");

  useEffect(() => {
    if (anchors.length === 0) return;
    const nodes = anchors
      .map((a) => document.getElementById(a.id))
      .filter((n): n is HTMLElement => Boolean(n));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // Bias the band towards the top of the viewport: the heading the reader just
      // scrolled past is the one they are reading under.
      { rootMargin: "-96px 0px -65% 0px", threshold: [0, 1] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [anchors]);

  if (anchors.length < 2) return null;

  return (
    <aside className="hidden xl:block w-[210px] shrink-0">
      <div className="sticky top-24">
        <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--grey)" }}>
          On this page
        </div>
        <ul className="space-y-1.5" style={{ borderLeft: "1px dashed var(--border)" }}>
          {anchors.map((a) => {
            const on = a.id === active;
            return (
              <li key={a.id} style={{ paddingLeft: a.level === 3 ? 22 : 12 }}>
                <a
                  href={`#${a.id}`}
                  className="block text-[12.5px] leading-snug transition-colors"
                  style={{
                    color: on ? "var(--blue-cta)" : "#7A828F",
                    fontWeight: on ? 600 : 400,
                    marginLeft: -1,
                    borderLeft: on ? "2px solid var(--blue-cta)" : "2px solid transparent",
                    paddingLeft: 10,
                  }}
                >
                  {a.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
