"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Flow node data ── */
const FLOW_NODES = [
  { type: "trigger", label: "Trigger", detail: "When someone Checkout Started", icon: "⚡" },
  { type: "delay", label: "Wait 30 min", icon: "⏳" },
  { type: "email", label: "E1: Recovery Nudge", detail: "Where'd ya go??", icon: "✉️", stats: { open: "52.3%", click: "3.3%", rev: "$1.26K" } },
  { type: "delay", label: "Wait 1 day", icon: "⏳" },
  { type: "split", label: "Conditional Split", detail: "Checkout Value ≥ $20", icon: "🔀", stats: { a: "Yes: 0.1%", b: "No: 97.9%" } },
  { type: "email", label: "E2 (≥$20): Incentive", detail: "Quest unlocked: $5 off + free shipping", icon: "✉️", stats: { open: "—", click: "25%", rev: "$0" }, dimmed: true },
  { type: "email", label: "E2 (<$20): Incentive", detail: "A $5 boost for your quest", icon: "✉️", stats: { open: "49.3%", click: "6.5%", rev: "$525" } },
  { type: "delay", label: "Wait 2 days", icon: "⏳" },
  { type: "email", label: "E3 (≥$20): Final Call", detail: "Last call! Your $5 + free shipping deal...", icon: "✉️", stats: { open: "—", click: "33.3%", rev: "$0" }, dimmed: true },
  { type: "email", label: "E3 (<$20): Final Call", detail: "Last call! Your $5 shipping credit expires...", icon: "✉️", stats: { open: "45.6%", click: "3.1%", rev: "$332" } },
];

/* ── Color map ── */
const NODE_COLORS: Record<string, { border: string; glow: string; bg: string }> = {
  trigger: { border: "#22c55e", glow: "rgba(34, 197, 94, 0.4)", bg: "rgba(34, 197, 94, 0.08)" },
  split:   { border: "#a855f7", glow: "rgba(168, 85, 247, 0.4)", bg: "rgba(168, 85, 247, 0.08)" },
  email:   { border: "#3b82f6", glow: "rgba(59, 130, 246, 0.35)", bg: "rgba(59, 130, 246, 0.06)" },
  delay:   { border: "#64748b", glow: "rgba(100, 116, 139, 0.25)", bg: "rgba(100, 116, 139, 0.06)" },
};

export default function AbandonedCheckoutFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const animFrame = useRef<number>(0);
  const scrollPos = useRef(0);
  const direction = useRef(1);

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

  useEffect(() => {
    if (!isVisible || !scrollRef.current) return;
    const el = scrollRef.current;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const SPEED = 0.35;
    const PAUSE_TOP = 120;
    const PAUSE_BOTTOM = 120;
    let pauseCount = 0;

    const tick = () => {
      if (maxScroll <= 0) { animFrame.current = requestAnimationFrame(tick); return; }
      if (direction.current === 1 && scrollPos.current >= maxScroll) {
        pauseCount++;
        if (pauseCount > PAUSE_BOTTOM) { direction.current = -1; pauseCount = 0; }
      } else if (direction.current === -1 && scrollPos.current <= 0) {
        pauseCount++;
        if (pauseCount > PAUSE_TOP) { direction.current = 1; pauseCount = 0; }
      } else {
        scrollPos.current += SPEED * direction.current;
        scrollPos.current = Math.max(0, Math.min(maxScroll, scrollPos.current));
        el.scrollTop = scrollPos.current;
        pauseCount = 0;
      }
      const progress = scrollPos.current / maxScroll;
      const idx = Math.min(Math.floor(progress * FLOW_NODES.length), FLOW_NODES.length - 1);
      setActiveNode(idx);
      animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame.current);
  }, [isVisible]);

  return (
    <div className="welcome-flow-wrapper" ref={containerRef}>
      <div className="wf-header">
        <div className="wf-header-left">
          <span className="wf-klaviyo-logo">klaviyo</span>
          <span className="wf-flow-name">CC - Abandoned Checkout Nov 1, 2025</span>
          <span className="wf-live-badge">● Live</span>
        </div>
      </div>

      <div className="wf-canvas" ref={scrollRef}>
        <div className="wf-flow-track">
          {FLOW_NODES.map((node, i) => {
            const c = NODE_COLORS[node.type];
            const isActive = i === activeNode;
            const isDimmed = (node as any).dimmed;
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
                    opacity: isDimmed ? 0.45 : 1,
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
                      {node.stats.rev && <div className="wf-stat"><span className="wf-stat-label">Rev</span><span className="wf-stat-value" style={{ color: "#f59e0b" }}>{node.stats.rev}</span></div>}
                    </div>
                  )}
                  {node.type === "split" && node.stats && (
                    <div className="wf-node-stats">
                      <div className="wf-stat"><span className="wf-stat-value" style={{ color: "#22c55e", fontSize: "0.65rem" }}>{node.stats.a}</span></div>
                      <div className="wf-stat"><span className="wf-stat-value" style={{ color: "#ef4444", fontSize: "0.65rem" }}>{node.stats.b}</span></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="wf-summary">
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#22c55e" }}>50.5%</span><span className="wf-summary-label">Avg Open</span></div>
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#3b82f6" }}>3.2%</span><span className="wf-summary-label">Avg Click</span></div>
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#f59e0b" }}>$5.8K</span><span className="wf-summary-label">Revenue</span></div>
        <div className="wf-summary-stat"><span className="wf-summary-num" style={{ color: "#a855f7" }}>+177%</span><span className="wf-summary-label">YoY</span></div>
      </div>
    </div>
  );
}
