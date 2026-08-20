"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SearchItem } from "../lib";

/**
 * Substring search over the flattened page text. The index is small enough
 * (tens of pages) to ship with the page and filter synchronously — no service,
 * no external search provider, nothing to keep in sync.
 */
export default function DocsSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const terms = query.split(/\s+/);
    return items
      .map((item) => {
        const haystack = `${item.title} ${item.app} ${item.description}`.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (haystack.includes(t)) score += 4;
          else if (item.body.includes(t)) score += 1;
          else return null;
        }
        return { item, score };
      })
      .filter((r): r is { item: SearchItem; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.item);
  }, [items, query]);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2.5 rounded-lg px-3 py-2"
        style={{ border: "1px solid var(--border)", background: "#fff" }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--grey)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4.5-4.5" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the documentation"
          className="w-full bg-transparent outline-none text-[13.5px]"
          style={{ color: "var(--navy)" }}
          aria-label="Search the documentation"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-[11px] px-1.5 py-0.5 rounded"
            style={{ color: "var(--grey)", border: "1px solid var(--border)" }}
            aria-label="Clear search"
          >
            esc
          </button>
        )}
      </div>

      {query.length >= 2 && (
        <div
          className="absolute z-40 left-0 right-0 mt-2 rounded-lg overflow-hidden"
          style={{ background: "#fff", border: "1px solid var(--border)", boxShadow: "0 12px 32px rgba(9,30,66,0.14)" }}
        >
          {results.length === 0 ? (
            <p className="px-4 py-3 text-[13px] m-0" style={{ color: "var(--grey)" }}>
              No page matches “{q}”.
            </p>
          ) : (
            results.map((r, i) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setQ("")}
                className="block px-4 py-2.5 transition-colors hover:bg-[var(--offwhite)]"
                style={{ borderTop: i === 0 ? "none" : "1px dashed var(--border)" }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[13.5px] font-semibold" style={{ color: "var(--navy)" }}>
                    {r.title}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--purple)" }}>
                    {r.app}
                  </span>
                </div>
                <div className="text-[12px] mt-0.5 line-clamp-1" style={{ color: "var(--grey)" }}>
                  {r.description}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
