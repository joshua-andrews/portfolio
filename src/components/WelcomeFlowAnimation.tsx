"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Flow node data ── */
const FLOW_NODES = [
  { type: "trigger", label: "Trigger", detail: "When someone is added to All Subscribers", icon: "⚡" },
  { type: "split", label: "A/B Split", detail: "100% random sample", icon: "🔀", stats: { a: "Yes: 100%", b: "No: 0%" } },
  { type: "update", label: "Property Update", detail: "Welcome Flow → TRUE", icon: "🔧" },
  { type: "email", label: "E1: Welcome Discount", detail: "Thanks for Joining!", icon: "✉️", stats: { open: "57.0%", click: "26.4%", rev: "$1,414" } },
  { type: "delay", label: "Wait 1 day", icon: "⏳" },
  { type: "email", label: "E2: Urgency Nudge", detail: "Yep. This is your weird sign.", icon: "✉️", stats: { open: "42.2%", click: "2.4%" } },
  { type: "delay", label: "Wait 1 day", icon: "⏳" },
  { type: "email", label: "E3: Final Reminder", detail: "Don't make this awkward.", icon: "✉️", stats: { open: "38.6%", click: "2.0%", rev: "$64" } },
  { type: "delay", label: "Wait 2 days", icon: "⏳" },
  { type: "email", label: "E4: Brand Story", detail: "🐣 Ever wonder where new Jinkies come from?", icon: "✉️", stats: { open: "36.7%", click: "3.8%" } },
  { type: "delay", label: "Wait 2 days", icon: "⏳" },
  { type: "email", label: "E5: Community", detail: "A Book Club For Your GLASSES?", icon: "✉️", stats: { open: "34.6%", click: "2.2%" } },
  { type: "update", label: "Property Update", detail: "Welcome Flow Complete", icon: "✅" },
];

/* ── Color map ── */
const NODE_COLORS: Record<string, { border: string; glow: string; bg: string }> = {
  trigger: { border: "#22c55e", glow: "rgba(34, 197, 94, 0.4)", bg: "rgba(34, 197, 94, 0.08)" },
  split:   { border: "#a855f7", glow: "rgba(168, 85, 247, 0.4)", bg: "rgba(168, 85, 247, 0.08)" },
  email:   { border: "#3b82f6", glow: "rgba(59, 130, 246, 0.35)", bg: "rgba(59, 130, 246, 0.06)" },
  delay:   { border: "#64748b", glow: "rgba(100, 116, 139, 0.25)", bg: "rgba(100, 116, 139, 0.06)" },
  update:  { border: "#f59e0b", glow: "rgba(245, 158, 11, 0.35)", bg: "rgba(245, 158, 11, 0.08)" },
};

export default function WelcomeFlowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const animFrame = useRef<number>(0);
  const scrollPos = useRef(0);
  const direction = useRef(1);

  /* ── Intersection observer ── */
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

  /* ── Auto-scroll + node highlight ── */
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

      // highlight node based on scroll position
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
      {/* Header bar */}
      <div className="wf-header">
        <div className="wf-header-left">
          <span className="wf-klaviyo-logo">klaviyo</span>
          <span className="wf-flow-name">CC - Welcome Series - Welcome Bundle</span>
          <span className="wf-live-badge">● Live</span>
        </div>
      </div>

      {/* Flow canvas */}
      <div className="wf-canvas" ref={scrollRef}>
        <div className="wf-flow-track">
          {FLOW_NODES.map((node, i) => {
            const c = NODE_COLORS[node.type];
            const isActive = i === activeNode;
            return (
              <div key={i} className="wf-node-group">
                {/* Connector line */}
                {i > 0 && (
                  <div className="wf-connector">
                    <div className="wf-connector-line" style={{ borderColor: c.border }} />
                    <div
                      className={`wf-connector-pulse ${isActive ? "wf-pulse-active" : ""}`}
                      style={{ background: c.border }}
                    />
                  </div>
                )}

                {/* Node card */}
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
                      <div className="wf-stat">
                        <span className="wf-stat-label">Open</span>
                        <span className="wf-stat-value" style={{ color: "#22c55e" }}>{node.stats.open}</span>
                      </div>
                      <div className="wf-stat">
                        <span className="wf-stat-label">Click</span>
                        <span className="wf-stat-value" style={{ color: "#3b82f6" }}>{node.stats.click}</span>
                      </div>
                      {node.stats.rev && (
                        <div className="wf-stat">
                          <span className="wf-stat-label">Rev</span>
                          <span className="wf-stat-value" style={{ color: "#f59e0b" }}>{node.stats.rev}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {node.type === "split" && node.stats && (
                    <div className="wf-node-stats">
                      <div className="wf-stat">
                        <span className="wf-stat-value" style={{ color: "#22c55e", fontSize: "0.65rem" }}>{node.stats.a}</span>
                      </div>
                      <div className="wf-stat">
                        <span className="wf-stat-value" style={{ color: "#ef4444", fontSize: "0.65rem" }}>{node.stats.b}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary bar */}
      <div className="wf-summary">
        <div className="wf-summary-stat">
          <span className="wf-summary-num" style={{ color: "#22c55e" }}>54.2%</span>
          <span className="wf-summary-label">Avg Open</span>
        </div>
        <div className="wf-summary-stat">
          <span className="wf-summary-num" style={{ color: "#3b82f6" }}>6.8%</span>
          <span className="wf-summary-label">Avg Click</span>
        </div>
        <div className="wf-summary-stat">
          <span className="wf-summary-num" style={{ color: "#f59e0b" }}>$20.4K</span>
          <span className="wf-summary-label">Revenue</span>
        </div>
        <div className="wf-summary-stat">
          <span className="wf-summary-num" style={{ color: "#a855f7" }}>+143%</span>
          <span className="wf-summary-label">YoY</span>
        </div>
      </div>
    </div>
  );
}
