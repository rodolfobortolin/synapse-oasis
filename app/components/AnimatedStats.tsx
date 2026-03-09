"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

function AnimatedNumber({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setStarted(true);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observerCallback]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let frame: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function AnimatedStats({ stats }: { stats: Stat[] }) {
  return (
    <div className={`grid grid-cols-3 gap-8 mt-6`}>
      {stats.map(s => (
        <div key={s.label}>
          <p className="text-3xl font-bold tabular-nums" style={{ color: "var(--blue-cta)" }}>
            <AnimatedNumber target={s.target} suffix={s.suffix} />
          </p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--grey)" }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}
