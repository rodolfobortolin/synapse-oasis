"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * Word-by-word blur reveal animation.
 * Words start blurred + transparent and reveal sequentially.
 */
export function HeroWordReveal({
  children,
  className = "",
  delayMs = 0,
  staggerMs = 120,
  onComplete,
}: {
  children: string;
  className?: string;
  delayMs?: number;
  staggerMs?: number;
  onComplete?: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const words = children.split(/\n/).flatMap((line, lineIdx, arr) => {
    const lineWords = line.trim().split(/\s+/).map((w) => ({ text: w, br: false }));
    if (lineIdx < arr.length - 1) {
      lineWords.push({ text: "", br: true });
    }
    return lineWords;
  });

  const totalWords = words.filter((w) => !w.br).length;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let wordIdx = 0;
    words.forEach((w, i) => {
      if (w.br) return;
      const currentIdx = wordIdx;
      timers.push(
        setTimeout(() => {
          setVisibleCount(currentIdx + 1);
          if (currentIdx === totalWords - 1 && onComplete) {
            setTimeout(onComplete, 200);
          }
        }, delayMs + currentIdx * staggerMs)
      );
      wordIdx++;
    });
    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let wordCounter = 0;
  return (
    <span className={className}>
      {words.map((w, i) => {
        if (w.br) return <br key={`br-${i}`} />;
        const idx = wordCounter++;
        return (
          <span
            key={i}
            className={`hero-word ${idx < visibleCount ? "hero-word--visible" : ""}`}
          >
            {w.text}{" "}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Generic blur reveal for block elements (paragraphs, buttons, badges).
 * Fades in from blur after a specified delay.
 */
export function HeroBlurIn({
  children,
  delayMs = 0,
  className = "",
  trigger = true,
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
  trigger?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(t);
  }, [trigger, delayMs]);

  return (
    <div className={`hero-blur-block ${visible ? "hero-blur-block--visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
