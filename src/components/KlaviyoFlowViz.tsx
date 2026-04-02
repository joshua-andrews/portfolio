"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * KlaviyoFlowViz — Interactive Flow Network Animation
 * Gamified: Click nodes to "optimize" them and watch metrics improve
 * Same dark theme as ConveyorBelt & MiniKanban
 */

interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  optimized: boolean;
  pulsePhase: number;
  metric: string;
  metricValue: number;
}

interface FlowEdge {
  from: string;
  to: string;
  progress: number;
  particles: { pos: number; speed: number }[];
}

interface FloatingMetric {
  id: number;
  text: string;
  x: number;
  y: number;
  life: number;
  color: string;
}

let metricId = 0;

export default function KlaviyoFlowViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<FlowNode[]>([]);
  const edgesRef = useRef<FlowEdge[]>([]);
  const metricsRef = useRef<FloatingMetric[]>([]);
  const frameRef = useRef(0);
  const [optimizedCount, setOptimizedCount] = useState(0);
  const [totalRPR, setTotalRPR] = useState(0.12);

  const initNodes = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const rx = Math.min(w * 0.35, 180);
    const ry = Math.min(h * 0.32, 120);

    const nodeData = [
      { id: "welcome", label: "Welcome", metric: "Open Rate", metricValue: 45 },
      { id: "browse", label: "Browse\nAbandon", metric: "Click Rate", metricValue: 3.2 },
      { id: "cart", label: "Cart\nAbandon", metric: "Conv. Rate", metricValue: 5.1 },
      { id: "post", label: "Post\nPurchase", metric: "AOV", metricValue: 67 },
      { id: "winback", label: "Winback", metric: "RPR", metricValue: 0.12 },
    ];

    const nodes: FlowNode[] = nodeData.map((d, i) => {
      const angle = (i / nodeData.length) * Math.PI * 2 - Math.PI / 2;
      return {
        ...d,
        x: cx + Math.cos(angle) * rx,
        y: cy + Math.sin(angle) * ry,
        radius: 28,
        optimized: false,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    const edges: FlowEdge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const next = (i + 1) % nodes.length;
      edges.push({
        from: nodes[i].id,
        to: nodes[next].id,
        progress: 0,
        particles: Array.from({ length: 3 }, () => ({
          pos: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
        })),
      });
    }
    // Cross connections
    edges.push({
      from: "welcome",
      to: "cart",
      progress: 0,
      particles: [{ pos: Math.random(), speed: 0.003 }],
    });
    edges.push({
      from: "post",
      to: "welcome",
      progress: 0,
      particles: [{ pos: Math.random(), speed: 0.004 }],
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = false;
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      if (nodesRef.current.length === 0) initNodes(width, height);
    }

    function getNodeById(id: string) {
      return nodesRef.current.find((n) => n.id === id);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const frame = frameRef.current;

      // Draw edges
      edgesRef.current.forEach((edge) => {
        const from = getNodeById(edge.from);
        const to = getNodeById(edge.to);
        if (!from || !to) return;

        const bothOptimized = from.optimized && to.optimized;
        const lineColor = bothOptimized
          ? "rgba(34, 197, 94, 0.4)"
          : "rgba(139, 92, 246, 0.2)";

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = bothOptimized ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Animated particles along edges
        edge.particles.forEach((p) => {
          p.pos = (p.pos + p.speed * (bothOptimized ? 2 : 1)) % 1;
          const px = from.x + (to.x - from.x) * p.pos;
          const py = from.y + (to.y - from.y) * p.pos;

          ctx.fillStyle = bothOptimized
            ? "rgba(34, 197, 94, 0.8)"
            : "rgba(139, 92, 246, 0.5)";
          ctx.beginPath();
          ctx.arc(px, py, bothOptimized ? 3 : 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Draw nodes
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(frame * 0.05 + node.pulsePhase) * 0.15 + 1;
        const r = node.radius * pulse;

        // Glow
        if (node.optimized) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = "rgba(34, 197, 94, 0.6)";
        }

        // Node circle
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          r
        );
        if (node.optimized) {
          gradient.addColorStop(0, "#166534");
          gradient.addColorStop(1, "#14532d");
        } else {
          gradient.addColorStop(0, "#2d1f5e");
          gradient.addColorStop(1, "#1e1b4b");
        }
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = node.optimized
          ? "rgba(34, 197, 94, 0.7)"
          : "rgba(139, 92, 246, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = "#fff";
        ctx.font = "bold 9px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const lines = node.label.split("\n");
        lines.forEach((line, i) => {
          const yOffset = (i - (lines.length - 1) / 2) * 11;
          ctx.fillText(line, node.x, node.y + yOffset);
        });

        // Metric below node
        ctx.font = "600 8px Inter, sans-serif";
        ctx.fillStyle = node.optimized
          ? "rgba(74, 222, 128, 0.9)"
          : "rgba(167, 139, 250, 0.7)";
        let mText: string;
        if (node.metric === "RPR") {
          mText = node.optimized
            ? `${node.metric}: $${(node.metricValue * 1.65).toFixed(2)}`
            : `${node.metric}: $${node.metricValue.toFixed(2)}`;
        } else if (node.metric === "AOV") {
          mText = node.optimized
            ? `${node.metric}: $${(node.metricValue * 1.35).toFixed(0)}`
            : `${node.metric}: $${node.metricValue}`;
        } else {
          mText = node.optimized
            ? `${node.metric}: ${(node.metricValue * 1.35).toFixed(1)}%`
            : `${node.metric}: ${node.metricValue}%`;
        }
        ctx.fillText(mText, node.x, node.y + r + 14);
      });

      // Floating metrics
      metricsRef.current = metricsRef.current.filter((m) => m.life > 0);
      metricsRef.current.forEach((m) => {
        m.y -= 0.5;
        m.life -= 0.015;
        ctx.save();
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.fillStyle = `rgba(74, 222, 128, ${m.life})`;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 3;
        ctx.textAlign = "center";
        ctx.fillText(m.text, m.x, m.y);
        ctx.restore();
      });


    }

    function animate() {
      if (!isRunning) return;
      frameRef.current++;
      draw();
      requestAnimationFrame(animate);
    }

    // Click handler
    function handleClick(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      nodesRef.current.forEach((node) => {
        const dx = mx - node.x;
        const dy = my - node.y;
        if (dx * dx + dy * dy < node.radius * node.radius && !node.optimized) {
          node.optimized = true;
          setOptimizedCount((c) => c + 1);
          setTotalRPR((r) => Math.min(+(r + 0.08).toFixed(2), 0.55));

          // Spawn floating metric
          const boosts = [
            `+${(Math.random() * 8 + 4).toFixed(1)}% ${node.metric}`,
            `+$${(Math.random() * 15 + 5).toFixed(0)} AOV`,
            `+$${(Math.random() * 0.06 + 0.03).toFixed(2)} RPR`,
          ];
          boosts.forEach((text, i) => {
            metricsRef.current.push({
              id: metricId++,
              text,
              x: node.x + (Math.random() - 0.5) * 40,
              y: node.y - 40 - i * 16,
              life: 1.2,
              color: "#4ade80",
            });
          });
        }
      });
    }

    canvas.addEventListener("click", handleClick);
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isRunning) {
            isRunning = true;
            animate();
          } else if (!entry.isIntersecting) {
            isRunning = false;
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);
    setTimeout(resize, 100);

    return () => {
      isRunning = false;
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [initNodes]);

  return (
    <div className="klaviyo-flow-wrapper">
      <div className="klaviyo-flow-header">
        <span className="klaviyo-flow-stat">
          <span className="klaviyo-flow-stat-value">{optimizedCount}/5</span>{" "}
          Flows Optimized
        </span>
        <span className="klaviyo-flow-stat">
          <span className="klaviyo-flow-stat-value klaviyo-rpr">
            ${totalRPR.toFixed(2)}
          </span>{" "}
          RPR
        </span>
      </div>
      <div className="conveyor-belt-canvas-wrap">
        <canvas ref={canvasRef} className="conveyor-belt-canvas" />
      </div>
    </div>
  );
}
