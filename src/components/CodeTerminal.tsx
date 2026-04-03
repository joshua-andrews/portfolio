"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * CodeTerminal — Interactive AI Code Generation Animation
 * Gamified: Click "Deploy" buttons to ship projects, watch the build counter climb
 * Same dark theme as ConveyorBelt & MiniKanban
 */

const CODE_SNIPPETS = [
  {
    label: "Klaviyo · Flow Builder",
    lines: [
      '<span class="ct-kw">const</span> <span class="ct-fn">welcomeFlow</span> = klaviyo.createFlow({',
      '  trigger: <span class="ct-str">"list.subscribe"</span>,',
      '  listId: <span class="ct-str">"VIP_CUSTOMERS"</span>,',
      '  steps: [',
      '    { delay: <span class="ct-str">"0h"</span>, template: <span class="ct-str">"welcome_hero"</span> },',
      '    { delay: <span class="ct-str">"24h"</span>, template: <span class="ct-str">"value_prop"</span> },',
      '    { delay: <span class="ct-str">"72h"</span>, template: <span class="ct-str">"first_offer"</span> },',
      "  ],",
      "});",
    ],
  },
  {
    label: "Klaviyo · Segmentation",
    lines: [
      '<span class="ct-kw">const</span> <span class="ct-fn">highValueSegment</span> = klaviyo.segment({',
      '  name: <span class="ct-str">"High-AOV Repeat Buyers"</span>,',
      '  conditions: [',
      '    { metric: <span class="ct-str">"Placed Order"</span>, count: <span class="ct-num">3</span> },',
      '    { property: <span class="ct-str">"total_spent"</span>, gte: <span class="ct-num">250</span> },',
      '    { timeframe: <span class="ct-str">"last_90_days"</span> },',
      "  ],",
      "});",
    ],
  },
  {
    label: "Klaviyo · Deliverability",
    lines: [
      '<span class="ct-kw">async function</span> <span class="ct-fn">auditDeliverability</span>(domain) {',
      '  <span class="ct-kw">const</span> spf = <span class="ct-kw">await</span> dns.resolve(domain, <span class="ct-str">"TXT"</span>);',
      '  <span class="ct-kw">const</span> dkim = <span class="ct-kw">await</span> validateDKIM(domain);',
      '  <span class="ct-kw">const</span> dmarc = <span class="ct-kw">await</span> checkDMARC(domain);',
      '  <span class="ct-kw">const</span> score = calculateReputation(spf, dkim, dmarc);',
      '  <span class="ct-kw">return</span> { score, authenticated: score > <span class="ct-num">95</span> };',
      "}",
    ],
  },
];

export default function CodeTerminal() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [deployed, setDeployed] = useState(0);
  const [deploying, setDeploying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  const snippet = CODE_SNIPPETS[currentSnippet];

  const startTyping = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setVisibleLines(0);
    setShowSuccess(false);
    setDeploying(false);
    let line = 0;
    intervalRef.current = setInterval(() => {
      line++;
      setVisibleLines(line);
      if (line >= CODE_SNIPPETS[currentSnippet].lines.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 100);
  }, [currentSnippet]);

  useEffect(() => {
    if (!isVisible.current) return;
    startTyping();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSnippet, startTyping]);

  // Intersection observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.current) {
            isVisible.current = true;
            startTyping();
          } else if (!entry.isIntersecting) {
            isVisible.current = false;
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startTyping]);

  // Auto-cycle snippets + auto-deploy on mobile
  useEffect(() => {
    if (!isVisible.current) return;
    const cycle = setInterval(() => {
      if (!deploying && !showSuccess) {
        // Auto-deploy if typing is complete
        if (visibleLines >= CODE_SNIPPETS[currentSnippet].lines.length) {
          handleDeploy();
        } else {
          setCurrentSnippet((s) => (s + 1) % CODE_SNIPPETS.length);
        }
      }
    }, 3000);
    return () => clearInterval(cycle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deploying, showSuccess, visibleLines, currentSnippet]);

  function handleDeploy() {
    if (deploying) return;
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setShowSuccess(true);
      setDeployed((d) => d + 1);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentSnippet((s) => (s + 1) % CODE_SNIPPETS.length);
      }, 1200);
    }, 1000);
  }

  function handleTabClick(idx: number) {
    if (idx !== currentSnippet) {
      setCurrentSnippet(idx);
    }
  }

  return (
    <div className="code-terminal-wrapper" ref={containerRef}>
      {/* Terminal header */}
      <div className="code-terminal-header">
        <div className="code-terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="code-terminal-tabs">
          {CODE_SNIPPETS.map((s, i) => (
            <button
              key={i}
              className={`code-terminal-tab ${i === currentSnippet ? "active" : ""}`}
              onClick={() => handleTabClick(i)}
            >
              {s.label.split(" · ")[1]}
            </button>
          ))}
        </div>
        <div className="code-terminal-deploy-count">
          {deployed} deployed
        </div>
      </div>

      {/* File label */}
      <div className="code-terminal-file-label">{snippet.label}</div>

      {/* Code area */}
      <div className="code-terminal-body">
        {snippet.lines.map((line, i) => (
          <div
            key={`${currentSnippet}-${i}`}
            className={`code-terminal-line ${i < visibleLines ? "visible" : ""}`}
          >
            <span className="line-number">{i + 1}</span>
            <span
              className="line-content"
              dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
            />
          </div>
        ))}
        {visibleLines >= snippet.lines.length && (
          <div className="code-terminal-cursor">▌</div>
        )}
      </div>

      {/* Deploy button */}
      <div className="code-terminal-footer">
        <button
          className={`code-terminal-deploy-btn ${deploying ? "deploying" : ""} ${showSuccess ? "success" : ""}`}
          onClick={handleDeploy}
          disabled={deploying || visibleLines < snippet.lines.length}
        >
          {showSuccess ? "✓ Shipped!" : deploying ? "Building..." : "⚡ Deploy"}
        </button>
      </div>
    </div>
  );
}
