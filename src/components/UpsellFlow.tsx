"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const FLOW_NODES = [
  { type: "trigger", label: "Trigger", detail: "When someone Placed Order", icon: "⚡" },
  { type: "delay", label: "Wait 15 min", icon: "⏳" },
  { type: "email", label: "Upsell: E1", detail: "Re: Add Something To Your Order 🎁", icon: "✉️", stats: { open: "51.6%", click: "2.7%", rev: "$2.22K" } },
];

const NODE_COLORS: Record<string, { border: string; glow: string; bg: string }> = {
  trigger: { border: "#22c55e", glow: "rgba(34, 197, 94, 0.4)", bg: "rgba(34, 197, 94, 0.08)" },
  delay:   { border: "#64748b", glow: "rgba(100, 116, 139, 0.25)", bg: "rgba(100, 116, 139, 0.06)" },
  email:   { border: "#3b82f6", glow: "rgba(59, 130, 246, 0.35)", bg: "rgba(59, 130, 246, 0.06)" },
};

export default function UpsellFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const animFrame = useRef<number>(0);

  const obsCb = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(obsCb, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [obsCb]);

  /* Cycle through nodes since flow is short */
  useEffect(() => {
    if (!isVisible) return;
    let idx = 0;
    const cycle = () => {
      setActiveNode(idx);
      idx = (idx + 1) % FLOW_NODES.length;
      animFrame.current = window.setTimeout(cycle, 1800) as unknown as number;
    };
    cycle();
    return () => clearTimeout(animFrame.current);
  }, [isVisible]);

  return (
    <div className="welcome-flow-wrapper" ref={containerRef}>
      <div className="wf-header">
        <div className="wf-header-left">
          <span className="wf-klaviyo-logo">klaviyo</span>
          <span className="wf-flow-name">CC - Upsell Flow</span>
          <span className="wf-live-badge">● Live</span>
        </div>
      </div>

      <div className="wf-canvas" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="wf-flow-track">
          {FLOW_NODES.map((node, i) => {
            const c = NODE_COLORS[node.type];
            const isActive = i === activeNode;
            return (
              <div key={i} className="wf-node-group">
                {i > 0 && (
                  <div className="wf-connector">
                    <div className="wf-connector-line" style={{ borderColor: c.border }} />
                    <div className={`wf-connector-pulse ${isActive ? "wf-pulse-active" : ""}`} style={{ background: c.border }} />
                  </div>
                )}
                <div
                  className={`wf-node wf-node-${node.type} ${isActive ? "wf-node-active" : ""}`}
                  style={{
                    borderColor: c.border,
                    boxShadow: isActive ? `0 0 20px ${c.glow}, 0 0 40px ${c.glow}` : `0 0 8px ${c.glow}`,
                    background: c.bg,
                  }}
                >
                  <div className="wf-node-header">
                    <span className="wf-node-icon">{node.icon}</span>
                    <span className="wf-node-label">{node.label}</span>
                  </div>
                  {node.detail && <div className="wf-node-detail">{node.detail}</div>}
                  {node.type === "email" && node.stats && (
                    <div className="wf-node-stats">
                      <div className="wf-stat"><span className="wf-stat-label">Open</span><span className="wf-stat-value" style={{ color: "#22c55e" }}>{node.stats.open}</span></div>
                      <div className="wf-stat"><span className="wf-stat-label">Click</span><span className="wf-stat-value" style={{ color: "#3b82f6" }}>{node.stats.click}</span></div>
                      <div className="wf-stat"><span className="wf-stat-label">Rev</span><span className="wf-stat-value" style={{ color: "#f59e0b" }}>{node.stats.rev}</span></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="wf-summary">
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#22c55e" }}>51.6%</span><span className="wf-summary-label">Open Rate</span></div>
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#3b82f6" }}>2.7%</span><span className="wf-summary-label">Click Rate</span></div>
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#f59e0b" }}>$7.1K</span><span className="wf-summary-label">Revenue</span></div>
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#a855f7" }}>NEW</span><span className="wf-summary-label">vs Legacy</span></div>
      </div>
    </div>
  );
}
