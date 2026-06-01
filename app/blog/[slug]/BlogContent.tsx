"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogContent({ content, tagColor }: { content: string; tagColor: string }) {
  return (
    <article className="blog-article">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="font-bold mt-12 mb-4" style={{ color: "var(--navy)", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.02em" }}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-bold mt-8 mb-3" style={{ color: "var(--navy)", fontSize: 20, lineHeight: 1.3 }}>{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#444" }}>{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold" style={{ color: "var(--navy)" }}>{children}</strong>
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:opacity-80" style={{ color: tagColor }}>{children}</a>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 space-y-1.5 pl-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 space-y-1.5 pl-1 list-decimal list-inside">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-[15px] leading-relaxed flex gap-2" style={{ color: "#444" }}>
              <span style={{ color: tagColor, flexShrink: 0 }}>-</span>
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="pl-5 my-6 italic" style={{ borderLeft: `3px solid ${tagColor}`, color: "var(--grey)" }}>{children}</blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-lg" style={{ border: "1px solid var(--border)" }}>
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ background: "var(--navy)", color: "white" }}>{children}</thead>
          ),
          th: ({ children }) => (
            <th className="text-left p-3 text-xs font-semibold uppercase tracking-wider">{children}</th>
          ),
          td: ({ children }) => (
            <td className="p-3 text-[13px]" style={{ borderTop: "1px solid var(--border)", color: "#555" }}>{children}</td>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-[var(--offwhite)]">{children}</tr>
          ),
          hr: () => (
            <hr className="my-10" style={{ border: "none", borderTop: "1px dashed var(--border)" }} />
          ),
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}
