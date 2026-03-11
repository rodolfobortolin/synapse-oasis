"use client";

import { useEffect, useRef } from "react";

type Rgb = [number, number, number];

const INDIGO: Rgb = [106, 114, 255];
const CYAN: Rgb = [81, 162, 231];
const TEAL: Rgb = [43, 196, 138];
const AMBER: Rgb = [236, 133, 70];
const WHITE: Rgb = [255, 255, 255];

const MOBILE_BREAKPOINT = 820;
const FIELD_RADIUS = 200;
const MAX_PULSES = 48;
const MIN_IDLE_PULSES = 5;

interface Branch {
  angle: number;
  length: number;
  fork: number;
}

interface Dendrite {
  angle: number;
  length: number;
  curve: number;
  branches: Branch[];
}

interface Cluster {
  x: number;
  y: number;
  radius: number;
  color: Rgb;
}

interface Neuron {
  x: number;
  y: number;
  anchorX: number;
  anchorY: number;
  driftX: number;
  driftY: number;
  phase: number;
  speed: number;
  radius: number;
  depth: number;
  charge: number;
  signal: number;
  firing: number;
  refractory: number;
  excitability: number;
  flow: number;
  cluster: number;
  color: Rgb;
  axonAngle: number;
  dendrites: Dendrite[];
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  curve: number;
  bridge: boolean;
}

interface Pulse {
  connectionIndex: number;
  age: number;
  duration: number;
  intensity: number;
  color: Rgb;
  seed: number;
}

interface CubicPath {
  startX: number;
  startY: number;
  cp1X: number;
  cp1Y: number;
  cp2X: number;
  cp2Y: number;
  endX: number;
  endY: number;
}

interface Point {
  x: number;
  y: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const mix = (from: number, to: number, t: number) => from + (to - from) * t;

const mixColor = (from: Rgb, to: Rgb, t: number): Rgb => [
  Math.round(mix(from[0], to[0], t)),
  Math.round(mix(from[1], to[1], t)),
  Math.round(mix(from[2], to[2], t)),
];

const rgba = ([r, g, b]: Rgb, alpha: number) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

const pointOnCubic = (path: CubicPath, t: number) => {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;

  return {
    x:
      path.startX * mt2 * mt +
      3 * path.cp1X * mt2 * t +
      3 * path.cp2X * mt * t2 +
      path.endX * t2 * t,
    y:
      path.startY * mt2 * mt +
      3 * path.cp1Y * mt2 * t +
      3 * path.cp2Y * mt * t2 +
      path.endY * t2 * t,
  };
};

const tangentOnCubic = (path: CubicPath, t: number) => ({
  x:
    3 * (1 - t) * (1 - t) * (path.cp1X - path.startX) +
    6 * (1 - t) * t * (path.cp2X - path.cp1X) +
    3 * t * t * (path.endX - path.cp2X),
  y:
    3 * (1 - t) * (1 - t) * (path.cp1Y - path.startY) +
    6 * (1 - t) * t * (path.cp2Y - path.cp1Y) +
    3 * t * t * (path.endY - path.cp2Y),
});

const pulseNoise = (seed: number, step: number, phase: number) => {
  const value = Math.sin(seed * 91.173 + step * 17.719 + phase * 13.417) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
};

const buildLightningPath = (
  path: CubicPath,
  seed: number,
  phase: number,
  amplitude: number,
  segments: number,
): Point[] => {
  const points: Point[] = [];

  for (let step = 0; step <= segments; step += 1) {
    const t = step / segments;
    const point = pointOnCubic(path, t);

    if (step === 0 || step === segments) {
      points.push(point);
      continue;
    }

    const tangent = tangentOnCubic(path, t);
    const tangentLength = Math.hypot(tangent.x, tangent.y) || 1;
    const normalX = -tangent.y / tangentLength;
    const normalY = tangent.x / tangentLength;
    const envelope = Math.sin(Math.PI * t);
    const offset =
      pulseNoise(seed, step, phase) * amplitude * envelope +
      pulseNoise(seed + 7.4, step, phase * 1.37) * amplitude * 0.32 * envelope;

    points.push({
      x: point.x + normalX * offset,
      y: point.y + normalY * offset,
    });
  }

  return points;
};

const strokePolyline = (
  ctx: CanvasRenderingContext2D,
  points: Point[],
) => {
  if (points.length === 0) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y);
  }
};

const createClusters = (width: number, height: number): Cluster[] => {
  if (width < MOBILE_BREAKPOINT) {
    return [
      { x: width * 0.18, y: height * 0.22, radius: 110, color: INDIGO },
      { x: width * 0.84, y: height * 0.52, radius: 120, color: CYAN },
      { x: width * 0.2, y: height * 0.82, radius: 115, color: mixColor(CYAN, TEAL, 0.45) },
    ];
  }

  return [
    { x: width * 0.16, y: height * 0.24, radius: 150, color: INDIGO },
    { x: width * 0.2, y: height * 0.74, radius: 144, color: mixColor(CYAN, INDIGO, 0.2) },
    { x: width * 0.82, y: height * 0.28, radius: 156, color: CYAN },
    { x: width * 0.78, y: height * 0.74, radius: 148, color: mixColor(CYAN, TEAL, 0.3) },
  ];
};

const createDendrites = (axonAngle: number, depth: number): Dendrite[] => {
  const count = 4 + Math.floor(Math.random() * 2);
  const spreadBase = Math.PI * 1.25;
  const hemisphereCenter = axonAngle + Math.PI;

  return Array.from({ length: count }, () => {
    const angle =
      hemisphereCenter +
      (Math.random() - 0.5) * spreadBase +
      (Math.random() - 0.5) * 0.28;
    const length = 12 + depth * 12 + Math.random() * 12;
    const branches = Array.from(
      { length: 1 + Math.floor(Math.random() * 2) },
      () => ({
        angle: angle + (Math.random() - 0.5) * 0.95,
        length: 5 + depth * 5 + Math.random() * 8,
        fork: 0.42 + Math.random() * 0.28,
      }),
    );

    return {
      angle,
      length,
      curve: (Math.random() - 0.5) * 0.52,
      branches,
    };
  });
};

const createNetwork = (width: number, height: number) => {
  const clusters = createClusters(width, height);
  const counts =
    width < MOBILE_BREAKPOINT ? [7, 8, 7] : [8, 7, 8, 7];
  const neurons: Neuron[] = [];

  clusters.forEach((cluster, clusterIndex) => {
    const count = counts[clusterIndex] ?? 7;

    for (let index = 0; index < count; index += 1) {
      const theta = Math.random() * Math.PI * 2;
      const radial = Math.sqrt(Math.random());
      const x =
        cluster.x +
        Math.cos(theta) * cluster.radius * radial * 0.95 +
        (Math.random() - 0.5) * 18;
      const y =
        cluster.y +
        Math.sin(theta) * cluster.radius * radial * 0.68 +
        (Math.random() - 0.5) * 14;
      const depth = 0.68 + Math.random() * 0.52;

      neurons.push({
        x: clamp(x, 36, width - 36),
        y: clamp(y, 36, height - 36),
        anchorX: clamp(x, 36, width - 36),
        anchorY: clamp(y, 36, height - 36),
        driftX: 7 + Math.random() * 12,
        driftY: 5 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
        speed: 0.75 + Math.random() * 0.55,
        radius: 1.9 + depth * 1.6,
        depth,
        charge: Math.random() * 0.2,
        signal: 0,
        firing: 0,
        refractory: Math.random() * 0.25,
        excitability: 0.72 + Math.random() * 0.48,
        flow:
          x / width +
          (y / height) * 0.2 +
          clusterIndex * 0.04 +
          Math.random() * 0.04,
        cluster: clusterIndex,
        color: mixColor(cluster.color, WHITE, 0.08 + Math.random() * 0.08),
        axonAngle: 0,
        dendrites: [],
      });
    }
  });

  const connections: Connection[] = [];
  const outgoing = Array.from({ length: neurons.length }, () => [] as number[]);
  const incoming = Array.from({ length: neurons.length }, () => 0);
  const pairSet = new Set<string>();
  const localDistance = width < MOBILE_BREAKPOINT ? 155 : 185;
  const bridgeDistance = width < MOBILE_BREAKPOINT ? 280 : 400;

  const addConnection = (
    from: number,
    to: number,
    bridge: boolean,
    strength: number,
    curve: number,
  ) => {
    if (from === to) return false;

    const pairKey = from < to ? `${from}-${to}` : `${to}-${from}`;
    if (pairSet.has(pairKey)) return false;

    pairSet.add(pairKey);
    const connectionIndex =
      connections.push({
        from,
        to,
        strength,
        curve,
        bridge,
      }) - 1;
    outgoing[from].push(connectionIndex);
    incoming[to] += 1;
    return true;
  };

  const order = Array.from({ length: neurons.length }, (_, index) => index).sort(
    (left, right) => neurons[left].flow - neurons[right].flow,
  );

  for (const sourceIndex of order) {
    const source = neurons[sourceIndex];

    const localCandidates = neurons
      .map((target, targetIndex) => ({ target, targetIndex }))
      .filter(({ target, targetIndex }) => {
        if (targetIndex === sourceIndex) return false;
        if (target.cluster !== source.cluster) return false;
        if (target.flow <= source.flow - 0.02) return false;

        const distance = Math.hypot(target.x - source.x, target.y - source.y);
        return distance < localDistance;
      })
      .sort((left, right) => {
        const leftDistance = Math.hypot(
          left.target.x - source.x,
          left.target.y - source.y,
        );
        const rightDistance = Math.hypot(
          right.target.x - source.x,
          right.target.y - source.y,
        );

        return leftDistance - rightDistance;
      });

    const desiredLocal =
      source.flow > 0.78 ? 1 : 2 + (source.depth > 0.98 ? 1 : 0);

    for (const { target, targetIndex } of localCandidates) {
      if (outgoing[sourceIndex].length >= desiredLocal) break;
      if (incoming[targetIndex] >= 4) continue;

      const distance = Math.hypot(target.x - source.x, target.y - source.y);
      const strength = clamp(1 - distance / localDistance, 0.28, 0.92);

      addConnection(
        sourceIndex,
        targetIndex,
        false,
        strength,
        (Math.random() - 0.5) * 0.22,
      );
    }

    const shouldBridge =
      source.flow < 0.82 &&
      outgoing[sourceIndex].length > 0 &&
      Math.random() < (width < MOBILE_BREAKPOINT ? 0.42 : 0.56);

    if (!shouldBridge) continue;

    const bridgeCandidate = neurons
      .map((target, targetIndex) => ({ target, targetIndex }))
      .filter(({ target, targetIndex }) => {
        if (targetIndex === sourceIndex) return false;
        if (target.cluster === source.cluster) return false;
        if (target.flow <= source.flow + 0.06) return false;
        if (incoming[targetIndex] >= 5) return false;

        const distance = Math.hypot(target.x - source.x, target.y - source.y);
        return distance < bridgeDistance;
      })
      .sort((left, right) => {
        const leftDistance = Math.hypot(
          left.target.x - source.x,
          left.target.y - source.y,
        );
        const rightDistance = Math.hypot(
          right.target.x - source.x,
          right.target.y - source.y,
        );

        return leftDistance - rightDistance;
      })[0];

    if (!bridgeCandidate) continue;

    addConnection(
      sourceIndex,
      bridgeCandidate.targetIndex,
      true,
      0.34 + Math.random() * 0.22,
      (Math.random() - 0.5) * 0.34,
    );
  }

  const recurrentSources = order.filter((index) => neurons[index].flow > 0.36);
  const recurrentCount = width < MOBILE_BREAKPOINT ? 4 : 6;

  for (let i = 0; i < recurrentCount; i += 1) {
    const sourceIndex =
      recurrentSources[Math.floor(Math.random() * recurrentSources.length)];
    const source = neurons[sourceIndex];

    const recurrentTarget = neurons
      .map((target, targetIndex) => ({ target, targetIndex }))
      .filter(({ target, targetIndex }) => {
        if (targetIndex === sourceIndex) return false;
        if (target.cluster !== source.cluster) return false;
        if (target.flow >= source.flow - 0.02) return false;

        const distance = Math.hypot(target.x - source.x, target.y - source.y);
        return distance < localDistance * 0.9;
      })
      .sort((left, right) => {
        const leftDistance = Math.hypot(
          left.target.x - source.x,
          left.target.y - source.y,
        );
        const rightDistance = Math.hypot(
          right.target.x - source.x,
          right.target.y - source.y,
        );

        return leftDistance - rightDistance;
      })[0];

    if (!recurrentTarget) continue;

    addConnection(
      sourceIndex,
      recurrentTarget.targetIndex,
      false,
      0.24 + Math.random() * 0.18,
      (Math.random() - 0.5) * 0.18,
    );
  }

  neurons.forEach((neuron, index) => {
    const edges = outgoing[index];

    if (edges.length === 0) {
      neuron.axonAngle = Math.atan2(height * 0.5 - neuron.y, width * 0.5 - neuron.x);
      neuron.dendrites = createDendrites(neuron.axonAngle, neuron.depth);
      return;
    }

    let vectorX = 0;
    let vectorY = 0;

    edges.forEach((connectionIndex) => {
      const connection = connections[connectionIndex];
      const target = neurons[connection.to];
      const distance = Math.hypot(target.x - neuron.x, target.y - neuron.y) || 1;
      vectorX += (target.x - neuron.x) / distance;
      vectorY += (target.y - neuron.y) / distance;
    });

    neuron.axonAngle = Math.atan2(vectorY, vectorX);
    neuron.dendrites = createDendrites(neuron.axonAngle, neuron.depth);
  });

  const drivers = clusters.flatMap((_, clusterIndex) => {
    const candidates = order.filter(
      (index) => neurons[index].cluster === clusterIndex && outgoing[index].length > 0,
    );

    return candidates.slice(0, width < MOBILE_BREAKPOINT ? 2 : 3);
  });

  for (const driverIndex of drivers) {
    const neuron = neurons[driverIndex];
    neuron.charge = 0.94 + Math.random() * 0.2;
    neuron.signal = 0.14 + Math.random() * 0.12;
  }

  return { clusters, neurons, connections, outgoing, drivers };
};

const createConnectionPath = (
  from: Neuron,
  to: Neuron,
  curve: number,
): CubicPath => {
  const linkAngle = Math.atan2(to.y - from.y, to.x - from.x);
  const startReach = from.radius + 5 + from.depth * 5;
  const endReach = to.radius + 4;
  const startX = from.x + Math.cos(from.axonAngle) * startReach;
  const startY = from.y + Math.sin(from.axonAngle) * startReach;
  const endX = to.x - Math.cos(linkAngle) * endReach;
  const endY = to.y - Math.sin(linkAngle) * endReach;
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;
  const bend = curve * Math.min(length, 165);
  const hillock = 14 + from.depth * 10;

  return {
    startX,
    startY,
    cp1X: startX + Math.cos(from.axonAngle) * hillock + normalX * bend,
    cp1Y: startY + Math.sin(from.axonAngle) * hillock + normalY * bend,
    cp2X: endX - dx * 0.24 + normalX * bend * 0.55,
    cp2Y: endY - dy * 0.24 + normalY * bend * 0.55,
    endX,
    endY,
  };
};

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dimRef = useRef({ w: 0, h: 0 });
  const neuronsRef = useRef<Neuron[]>([]);
  const clustersRef = useRef<Cluster[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const outgoingRef = useRef<number[][]>([]);
  const driversRef = useRef<number[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const motionScaleRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initNetwork = () => {
      const network = createNetwork(dimRef.current.w, dimRef.current.h);
      neuronsRef.current = network.neurons;
      clustersRef.current = network.clusters;
      connectionsRef.current = network.connections;
      outgoingRef.current = network.outgoing;
      driversRef.current = network.drivers;
      pulsesRef.current = [];
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dimRef.current = { w: window.innerWidth, h: window.innerHeight };
      canvas.width = dimRef.current.w * dpr;
      canvas.height = dimRef.current.h * dpr;
      canvas.style.width = `${dimRef.current.w}px`;
      canvas.style.height = `${dimRef.current.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNetwork();
    };

    const fireNeuron = (index: number, intensity: number) => {
      const neuron = neuronsRef.current[index];
      if (!neuron || neuron.refractory > 0) return;

      neuron.charge = 0;
      neuron.signal = Math.max(neuron.signal, intensity * 0.45);
      neuron.firing = Math.max(neuron.firing, intensity);
      neuron.refractory = 0.34 + Math.random() * 0.28;

      const outgoing = outgoingRef.current[index];

      for (const connectionIndex of outgoing) {
        const connection = connectionsRef.current[connectionIndex];
        if (!connection) continue;
        if (Math.random() > 0.82 + connection.strength * 0.12) continue;
        if (pulsesRef.current.length >= MAX_PULSES) break;

        const baseColor = connection.bridge
          ? mixColor(CYAN, WHITE, 0.18)
          : mixColor(mixColor(neuron.color, CYAN, 0.58), WHITE, 0.08);

        pulsesRef.current.push({
          connectionIndex,
          age: 0,
          duration:
            (connection.bridge ? 0.22 : 0.16) /
            Math.max(0.55, motionScaleRef.current * (0.9 + Math.random() * 0.12)),
          intensity: intensity * (0.84 + connection.strength * 0.26),
          color: baseColor,
          seed: Math.random() * 1000,
        });
      }
    };

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      motionScaleRef.current = reducedMotionQuery.matches ? 0.48 : 1;
    };

    syncMotionPreference();
    resize();
    window.addEventListener("resize", resize);
    reducedMotionQuery.addEventListener("change", syncMotionPreference);

    const onMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const drawFrame = (timestamp: number) => {
      const dt = clamp((timestamp - (lastTimeRef.current || timestamp)) / 1000, 0.008, 0.04);
      lastTimeRef.current = timestamp;

      const motion = motionScaleRef.current;
      const { w, h } = dimRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const neurons = neuronsRef.current;
      const connections = connectionsRef.current;
      const pulses = pulsesRef.current;
      const fieldActive = mx > 0 && my > 0;

      ctx.clearRect(0, 0, w, h);

      for (const cluster of clustersRef.current) {
        const gradient = ctx.createRadialGradient(
          cluster.x,
          cluster.y,
          0,
          cluster.x,
          cluster.y,
          cluster.radius * 1.35,
        );
        gradient.addColorStop(0, rgba(cluster.color, 0.055));
        gradient.addColorStop(0.45, rgba(cluster.color, 0.018));
        gradient.addColorStop(1, rgba(cluster.color, 0));
        ctx.beginPath();
        ctx.arc(cluster.x, cluster.y, cluster.radius * 1.35, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      if (fieldActive) {
        const fieldGradient = ctx.createRadialGradient(mx, my, 0, mx, my, FIELD_RADIUS);
        fieldGradient.addColorStop(0, rgba(CYAN, 0.08));
        fieldGradient.addColorStop(0.28, rgba(INDIGO, 0.035));
        fieldGradient.addColorStop(1, rgba(INDIGO, 0));
        ctx.beginPath();
        ctx.arc(mx, my, FIELD_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = fieldGradient;
        ctx.fill();
      }

      for (let index = 0; index < neurons.length; index += 1) {
        const neuron = neurons[index];
        const driftTime = timestamp * 0.00016 * neuron.speed * motion;
        const fieldBoost = fieldActive
          ? clamp(1 - Math.hypot(neuron.x - mx, neuron.y - my) / FIELD_RADIUS, 0, 1)
          : 0;

        neuron.x =
          neuron.anchorX +
          Math.sin(driftTime + neuron.phase) * neuron.driftX +
          Math.cos(driftTime * 0.58 + neuron.phase * 0.7) * neuron.driftX * 0.32;
        neuron.y =
          neuron.anchorY +
          Math.cos(driftTime * 0.92 + neuron.phase) * neuron.driftY +
          Math.sin(driftTime * 0.54 + neuron.phase * 1.18) * neuron.driftY * 0.28;

        neuron.charge = Math.max(0, neuron.charge - dt * (0.24 + neuron.excitability * 0.08));
        neuron.signal = Math.max(0, neuron.signal - dt * 2.2);
        neuron.firing = Math.max(0, neuron.firing - dt * 1.8);
        neuron.refractory = Math.max(0, neuron.refractory - dt);

        if (fieldBoost > 0) {
          neuron.charge = clamp(neuron.charge + dt * fieldBoost * 0.24, 0, 1.35);
          neuron.signal = Math.max(neuron.signal, fieldBoost * 0.16);
        }

        const spontaneousRate = (0.022 + neuron.excitability * 0.012) * motion;
        if (Math.random() < dt * spontaneousRate) {
          neuron.charge = clamp(neuron.charge + 0.32 + Math.random() * 0.18, 0, 1.35);
        }

        if (neuron.charge > 0.92 + (1 - neuron.excitability) * 0.1 && neuron.refractory <= 0) {
          fireNeuron(index, 0.62 + Math.min(neuron.charge, 1) * 0.42);
        }
      }

      if (pulses.length < MIN_IDLE_PULSES && driversRef.current.length > 0) {
        const activationChance = dt * (3.2 + (MIN_IDLE_PULSES - pulses.length) * 0.8) * motion;
        if (Math.random() < activationChance) {
          const sourceIndex =
            driversRef.current[Math.floor(Math.random() * driversRef.current.length)];
          const source = neurons[sourceIndex];

          if (source && source.refractory <= 0) {
            source.charge = Math.max(source.charge, 1.06);
            fireNeuron(sourceIndex, 0.74 + Math.random() * 0.18);
          }
        }
      }

      for (const connection of connections) {
        const from = neurons[connection.from];
        const to = neurons[connection.to];
        const path = createConnectionPath(from, to, connection.curve);
        const midX = (path.startX + path.endX) * 0.5;
        const midY = (path.startY + path.endY) * 0.5;
        const fieldBoost = fieldActive
          ? clamp(1 - Math.hypot(midX - mx, midY - my) / (FIELD_RADIUS * 0.92), 0, 1)
          : 0;
        const activity = clamp(from.firing * 0.78 + to.signal * 0.68 + fieldBoost * 0.3, 0, 1);
        const baseColor = connection.bridge
          ? mixColor(CYAN, AMBER, 0.12)
          : mixColor(from.color, to.color, 0.42);
        const activeColor = connection.bridge
          ? mixColor(AMBER, CYAN, 0.3)
          : mixColor(baseColor, TEAL, 0.34 + activity * 0.2);
        const alpha =
          (connection.bridge ? 0.072 : 0.052) +
          connection.strength * 0.036 +
          activity * (connection.bridge ? 0.22 : 0.17);

        const gradient = ctx.createLinearGradient(
          path.startX,
          path.startY,
          path.endX,
          path.endY,
        );
        gradient.addColorStop(0, rgba(baseColor, alpha * 0.5));
        gradient.addColorStop(0.55, rgba(activeColor, alpha * 0.95));
        gradient.addColorStop(1, rgba(mixColor(to.color, TEAL, 0.18), alpha * 0.72));

        ctx.beginPath();
        ctx.moveTo(path.startX, path.startY);
        ctx.bezierCurveTo(
          path.cp1X,
          path.cp1Y,
          path.cp2X,
          path.cp2Y,
          path.endX,
          path.endY,
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = connection.bridge ? 1.08 : 0.88;
        ctx.stroke();

        if (activity > 0.08) {
          const terminalRadius = 1.4 + activity * 1.5;
          const terminalGlow = ctx.createRadialGradient(
            path.endX,
            path.endY,
            0,
            path.endX,
            path.endY,
            terminalRadius * 3.4,
          );
          terminalGlow.addColorStop(0, rgba(mixColor(to.color, WHITE, 0.22), 0.08 + activity * 0.12));
          terminalGlow.addColorStop(1, rgba(to.color, 0));
          ctx.beginPath();
          ctx.arc(path.endX, path.endY, terminalRadius * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = terminalGlow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(path.endX, path.endY, terminalRadius, 0, Math.PI * 2);
          ctx.fillStyle = rgba(mixColor(to.color, WHITE, 0.18), 0.08 + activity * 0.16);
          ctx.fill();
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let pulseIndex = pulses.length - 1; pulseIndex >= 0; pulseIndex -= 1) {
        const pulse = pulses[pulseIndex];
        const connection = connections[pulse.connectionIndex];
        if (!connection) {
          pulses.splice(pulseIndex, 1);
          continue;
        }

        pulse.age += dt;
        const phase = pulse.age / pulse.duration;

        if (phase >= 1) {
          const target = neurons[connection.to];
          target.signal = Math.max(target.signal, pulse.intensity * 0.52);
          target.charge = clamp(
            target.charge + pulse.intensity * (0.18 + connection.strength * 0.24),
            0,
            1.35,
          );
          pulses.splice(pulseIndex, 1);
          continue;
        }

        const path = createConnectionPath(
          neurons[connection.from],
          neurons[connection.to],
          connection.curve,
        );
        const pulseColor = mixColor(
          pulse.color,
          WHITE,
          0.18 + Math.sin(phase * Math.PI) * 0.24,
        );
        const energy = Math.sin(phase * Math.PI);
        const amplitude =
          (connection.bridge ? 5.6 : 4.2) *
          (0.64 + pulse.intensity * 0.2) *
          energy;
        const segments = connection.bridge ? 8 : 6;
        const outerBolt = buildLightningPath(
          path,
          pulse.seed,
          phase,
          amplitude,
          segments,
        );
        const innerBolt = buildLightningPath(
          path,
          pulse.seed + 18.7,
          phase + 0.14,
          amplitude * 0.42,
          segments,
        );

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        strokePolyline(ctx, outerBolt);
        ctx.strokeStyle = rgba(pulseColor, 0.05 + pulse.intensity * 0.05);
        ctx.lineWidth = 2.8 + pulse.intensity * 0.85;
        ctx.stroke();

        strokePolyline(ctx, outerBolt);
        ctx.strokeStyle = rgba(pulseColor, 0.16 + pulse.intensity * 0.08);
        ctx.lineWidth = 1.15 + pulse.intensity * 0.36;
        ctx.stroke();

        strokePolyline(ctx, innerBolt);
        ctx.strokeStyle = rgba(WHITE, 0.14 + pulse.intensity * 0.08);
        ctx.lineWidth = 0.48 + pulse.intensity * 0.14;
        ctx.stroke();

        const startFlash = pointOnCubic(path, 0);
        const endFlash = pointOnCubic(path, 1);

        ctx.beginPath();
        ctx.arc(startFlash.x, startFlash.y, 0.8 + energy * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(pulseColor, 0.08 + pulse.intensity * 0.06);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endFlash.x, endFlash.y, 1.1 + energy * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(WHITE, 0.1 + pulse.intensity * 0.07);
        ctx.fill();
      }

      ctx.restore();

      for (const neuron of neurons) {
        const dendriteColor = mixColor(neuron.color, TEAL, neuron.signal * 0.6);
        const branchAlpha = 0.065 + neuron.signal * 0.1 + neuron.firing * 0.06;

        for (const dendrite of neuron.dendrites) {
          const endX = neuron.x + Math.cos(dendrite.angle) * dendrite.length;
          const endY = neuron.y + Math.sin(dendrite.angle) * dendrite.length;
          const controlX =
            neuron.x +
            Math.cos(dendrite.angle + dendrite.curve) * dendrite.length * 0.56;
          const controlY =
            neuron.y +
            Math.sin(dendrite.angle + dendrite.curve) * dendrite.length * 0.56;

          ctx.beginPath();
          ctx.moveTo(neuron.x, neuron.y);
          ctx.quadraticCurveTo(controlX, controlY, endX, endY);
          ctx.strokeStyle = rgba(dendriteColor, branchAlpha);
          ctx.lineWidth = 0.54 + neuron.depth * 0.18;
          ctx.stroke();

          for (const branch of dendrite.branches) {
            const branchStartX = neuron.x + (endX - neuron.x) * branch.fork;
            const branchStartY = neuron.y + (endY - neuron.y) * branch.fork;
            const branchEndX = branchStartX + Math.cos(branch.angle) * branch.length;
            const branchEndY = branchStartY + Math.sin(branch.angle) * branch.length;

            ctx.beginPath();
            ctx.moveTo(branchStartX, branchStartY);
            ctx.lineTo(branchEndX, branchEndY);
            ctx.strokeStyle = rgba(dendriteColor, branchAlpha * 0.72);
            ctx.lineWidth = 0.38 + neuron.depth * 0.14;
            ctx.stroke();
          }
        }

        const axonEndX =
          neuron.x + Math.cos(neuron.axonAngle) * (neuron.radius + 6 + neuron.depth * 4);
        const axonEndY =
          neuron.y + Math.sin(neuron.axonAngle) * (neuron.radius + 6 + neuron.depth * 4);
        const somaColor = mixColor(neuron.color, WHITE, neuron.firing * 0.24);
        const somaGlowRadius = neuron.radius * 3.6 + neuron.firing * 8 + neuron.signal * 4;

        const halo = ctx.createRadialGradient(
          neuron.x,
          neuron.y,
          neuron.radius * 0.2,
          neuron.x,
          neuron.y,
          somaGlowRadius,
        );
        halo.addColorStop(0, rgba(mixColor(somaColor, TEAL, 0.12), 0.18 + neuron.firing * 0.16));
        halo.addColorStop(1, rgba(somaColor, 0));
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, somaGlowRadius, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(neuron.x, neuron.y);
        ctx.lineTo(axonEndX, axonEndY);
        ctx.strokeStyle = rgba(somaColor, 0.16 + neuron.firing * 0.22);
        ctx.lineWidth = 0.75 + neuron.depth * 0.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.radius + 0.9, 0, Math.PI * 2);
        ctx.fillStyle = rgba(mixColor(somaColor, WHITE, 0.08), 0.18 + neuron.firing * 0.22);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(somaColor, 0.56 + neuron.firing * 0.18);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, Math.max(0.75, neuron.radius * 0.46), 0, Math.PI * 2);
        ctx.fillStyle = rgba(WHITE, 0.18 + neuron.firing * 0.12 + neuron.signal * 0.08);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(drawFrame);
    };

    animRef.current = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      reducedMotionQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.95 }}
    />
  );
}
