"use client";

import { useEffect, useRef } from "react";

/* ── Palette ───────────────────────────────── */
const SYNAPSE_BLUE: [number, number, number] = [43, 46, 216];
const ENERGY_CYAN: [number, number, number] = [81, 162, 231];
const PULSE_GREEN: [number, number, number] = [43, 196, 138];
const SPARK_ORANGE: [number, number, number] = [236, 133, 70];
const COLORS = [SYNAPSE_BLUE, ENERGY_CYAN, PULSE_GREEN, SPARK_ORANGE];

const NEURON_COUNT = 45;
const SYNAPSE_DIST = 180;
const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 0.6;
const PULSE_SPEED = 0.003;
const BASE_SPEED = 0.15;

/* ── Types ─────────────────────────────────── */
interface Dendrite {
  angle: number;
  length: number;
  branches: { angle: number; length: number }[];
}

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: [number, number, number];
  dendrites: Dendrite[];
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  color: [number, number, number];
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const neuronsRef = useRef<Neuron[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const animRef = useRef<number>(0);
  const dimRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Resize ──────────────────────────── */
    const resize = () => {
      const c = canvasRef.current!;
      const dpr = window.devicePixelRatio || 1;
      dimRef.current = { w: window.innerWidth, h: window.innerHeight };
      c.width = dimRef.current.w * dpr;
      c.height = dimRef.current.h * dpr;
      c.style.width = dimRef.current.w + "px";
      c.style.height = dimRef.current.h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Init neurons ────────────────────── */
    const makeDendrites = (): Dendrite[] => {
      const count = 3 + Math.floor(Math.random() * 3);
      return Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const length = 10 + Math.random() * 18;
        const branchCount = 1 + Math.floor(Math.random() * 2);
        const branches = Array.from({ length: branchCount }, () => ({
          angle: angle + (Math.random() - 0.5) * 1.2,
          length: 5 + Math.random() * 10,
        }));
        return { angle, length, branches };
      });
    };

    neuronsRef.current = Array.from({ length: NEURON_COUNT }, () => ({
      x: Math.random() * dimRef.current.w,
      y: Math.random() * dimRef.current.h,
      vx: (Math.random() - 0.5) * BASE_SPEED,
      vy: (Math.random() - 0.5) * BASE_SPEED,
      radius: 2 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      dendrites: makeDendrites(),
    }));

    /* ── Mouse ───────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    /* ── Render loop ─────────────────────── */
    const drawFrame = () => {
      const { w, h } = dimRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ctx.clearRect(0, 0, w, h);

      const neurons = neuronsRef.current;
      const pulses = pulsesRef.current;

      /* Update positions & repulsion */
      for (const n of neurons) {
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        n.vx *= 0.98;
        n.vy *= 0.98;
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around
        if (n.x < -40) n.x = w + 40;
        if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40;
        if (n.y > h + 40) n.y = -40;
      }

      /* Draw connections (synapses) */
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i];
          const b = neurons[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > SYNAPSE_DIST) continue;

          const alpha = (1 - dist / SYNAPSE_DIST) * 0.15;

          // Mouse proximity glow
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const mouseDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
          const glowAlpha = mouseDist < 150 ? alpha + (1 - mouseDist / 150) * 0.15 : alpha;

          // Curved bezier
          const cx1 = a.x + dx * 0.3 + dy * 0.1;
          const cy1 = a.y + dy * 0.3 - dx * 0.1;
          const cx2 = a.x + dx * 0.7 - dy * 0.1;
          const cy2 = a.y + dy * 0.7 + dx * 0.1;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.bezierCurveTo(cx1, cy1, cx2, cy2, b.x, b.y);
          const [r, g, bl] = a.color;
          ctx.strokeStyle = `rgba(${r},${g},${bl},${glowAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Synapse junction glow at midpoint
          if (glowAlpha > 0.12) {
            ctx.beginPath();
            ctx.arc(midX, midY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${bl},${glowAlpha * 0.5})`;
            ctx.fill();
          }

          // Spawn pulse occasionally
          if (Math.random() < 0.0004 && pulses.length < 30) {
            pulses.push({
              from: i,
              to: j,
              t: 0,
              color: a.color,
            });
          }
        }
      }

      /* Draw traveling pulses */
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += PULSE_SPEED;
        if (pulse.t > 1) {
          pulses.splice(p, 1);
          continue;
        }
        const a = neurons[pulse.from];
        const b = neurons[pulse.to];
        const px = a.x + (b.x - a.x) * pulse.t;
        const py = a.y + (b.y - a.y) * pulse.t;
        const [r, g, bl] = pulse.color;
        const pulseAlpha = Math.sin(pulse.t * Math.PI) * 0.3;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${bl},${pulseAlpha})`;
        ctx.fill();
      }

      /* Draw neurons (soma + dendrites) */
      for (const n of neurons) {
        const [r, g, bl] = n.color;

        // Dendrites
        for (const d of n.dendrites) {
          const endX = n.x + Math.cos(d.angle) * d.length;
          const endY = n.y + Math.sin(d.angle) * d.length;

          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          const cpX = n.x + Math.cos(d.angle + 0.3) * d.length * 0.6;
          const cpY = n.y + Math.sin(d.angle + 0.3) * d.length * 0.6;
          ctx.quadraticCurveTo(cpX, cpY, endX, endY);
          ctx.strokeStyle = `rgba(${r},${g},${bl},0.15)`;
          ctx.lineWidth = 0.6;
          ctx.stroke();

          // Sub-branches
          for (const br of d.branches) {
            const bx = endX + Math.cos(br.angle) * br.length;
            const by = endY + Math.sin(br.angle) * br.length;
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(${r},${g},${bl},0.08)`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }

        // Soma (cell body)
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${bl},0.6)`;
        ctx.fill();

        // Soma core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,0.4)`;
        ctx.fill();
      }

      /* Mouse aura (very subtle) */
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        grad.addColorStop(0, "rgba(43,46,216,0.04)");
        grad.addColorStop(1, "rgba(43,46,216,0)");
        ctx.beginPath();
        ctx.arc(mx, my, 80, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(drawFrame);
    };

    animRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
