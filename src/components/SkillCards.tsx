"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import ConveyorBelt from "./ConveyorBelt";
import KlaviyoFlowViz from "./KlaviyoFlowViz";
import CodeTerminal from "./CodeTerminal";

/* ── Mini Kanban Board — Click-to-Complete Game ── */

interface KanbanCard {
  id: number;
  label: string;
  priority: "high" | "med" | "low";
  column: 0 | 1 | 2;
  animating: boolean;
}

interface EmojiParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const CELEBRATION_EMOJIS = ["🔥", "⚡", "✨", "🎯", "💪", "🚀", "💥", "⭐"];
let particleId = 0;

const TASK_POOL = [
  "Set up welcome flow",
  "Segment VIP list",
  "A/B test subject lines",
  "Review Q2 campaign",
  "Fix checkout abandon",
  "Update email templates",
  "Audit deliverability",
  "Build winback sequence",
  "Draft product launch",
  "Schedule SMS campaign",
  "Clean suppression list",
  "Optimize send times",
  "Design holiday promo",
  "Tag new subscribers",
  "Review bounce rates",
  "Set up sunset policy",
  "Create referral flow",
  "Analyze click maps",
  "Build post-purchase",
  "QA dark mode emails",
  "Set up browse abandon",
  "Configure signup form",
  "Draft cart reminder",
  "Build loyalty program",
  "Migrate ESP data",
  "Review flow filters",
  "Test dynamic content",
  "Schedule product drop",
  "Map customer journey",
  "Plan retention campaign",
];

const PRIORITIES: Array<"high" | "med" | "low"> = ["high", "med", "low"];
const COLUMNS = ["To Do", "Active", "Done"];
const MAX_PER_COLUMN = 3;

let nextId = 0;

function MiniKanban() {
  const [cards, setCards] = useState<KanbanCard[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [particles, setParticles] = useState<EmojiParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const usedLabels = useRef<Set<string>>(new Set());

  function spawnEmojis() {
    const burst: EmojiParticle[] = [];
    for (let i = 0; i < 6; i++) {
      burst.push({
        id: particleId++,
        emoji:
          CELEBRATION_EMOJIS[
            Math.floor(Math.random() * CELEBRATION_EMOJIS.length)
          ],
        x: 55 + Math.random() * 40,
        y: 20 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 8,
        vy: -(Math.random() * 4 + 2),
      });
    }
    setParticles((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !burst.find((b) => b.id === p.id))
      );
    }, 1200);
  }

  function getUniqueLabel(): string {
    const available = TASK_POOL.filter((t) => !usedLabels.current.has(t));
    if (available.length === 0) {
      usedLabels.current.clear();
      return TASK_POOL[Math.floor(Math.random() * TASK_POOL.length)];
    }
    const label = available[Math.floor(Math.random() * available.length)];
    usedLabels.current.add(label);
    return label;
  }

  function makeCard(col: 0 | 1 | 2 = 0): KanbanCard {
    return {
      id: nextId++,
      label: getUniqueLabel(),
      priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      column: col,
      animating: false,
    };
  }

  // Initialize board
  useEffect(() => {
    const initial: KanbanCard[] = [];
    for (let i = 0; i < 3; i++) initial.push(makeCard(0));
    for (let i = 0; i < 2; i++) initial.push(makeCard(1));
    initial.push(makeCard(2));
    setCards(initial);
    setCompletedCount(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-pipeline: completes 1 task per tick, immediately backfills Active
  const pipelineRunning = useRef(false);

  const autoPipeline = useCallback(() => {
    if (pipelineRunning.current) return;
    pipelineRunning.current = true;

    let didComplete = false;

    setCards((prev) => {
      const updated = [...prev];

      // Complete ONE Active → Done
      const activeCards = updated.filter((c) => c.column === 1 && !c.animating);
      if (activeCards.length > 0) {
        const card = activeCards[0];
        const aidx = updated.findIndex((c) => c.id === card.id);
        if (aidx !== -1) {
          updated[aidx] = { ...updated[aidx], column: 2, animating: true };
          setTimeout(() => {
            setCards((curr) =>
              curr.map((c) =>
                c.id === card.id ? { ...c, animating: false } : c
              )
            );
          }, 400);
          didComplete = true;
          setCompletedCount((c) => c + 1);
        }
      }

      // Immediately backfill: move ToDo → Active to keep Active at 2-3
      const activeNow = updated.filter((c) => c.column === 1).length;
      const todoCards = updated.filter((c) => c.column === 0 && !c.animating);
      if (todoCards.length > 0 && activeNow < 2) {
        const card = todoCards[0];
        const idx = updated.findIndex((c) => c.id === card.id);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], column: 1, animating: true };
          setTimeout(() => {
            setCards((curr) =>
              curr.map((c) =>
                c.id === card.id ? { ...c, animating: false } : c
              )
            );
          }, 400);
        }
      }

      // Remove oldest Done card if over limit
      const doneCards = updated.filter((c) => c.column === 2);
      if (doneCards.length > MAX_PER_COLUMN) {
        const toRemove = doneCards[0];
        const removeIdx = updated.findIndex((c) => c.id === toRemove.id);
        if (removeIdx !== -1) {
          usedLabels.current.delete(updated[removeIdx].label);
          updated.splice(removeIdx, 1);
        }
      }

      // Refill To Do if below max
      const currentTodo = updated.filter((c) => c.column === 0).length;
      if (currentTodo < MAX_PER_COLUMN) {
        updated.push({
          id: nextId++,
          label: getUniqueLabel(),
          priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
          column: 0,
          animating: false,
        });
      }

      return updated;
    });

    pipelineRunning.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Click an Active card → immediately complete it + backfill
  function completeTask(cardId: number) {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === cardId);
      if (idx === -1 || prev[idx].column !== 1) return prev;
      const updated = [...prev];

      // Complete clicked card → Done
      updated[idx] = { ...updated[idx], column: 2, animating: true };
      setTimeout(() => {
        setCards((curr) =>
          curr.map((c) =>
            c.id === cardId ? { ...c, animating: false } : c
          )
        );
      }, 400);

      // Immediately backfill Active from ToDo
      const activeNow = updated.filter((c) => c.column === 1).length;
      const todoCards = updated.filter((c) => c.column === 0 && !c.animating);
      const needed = Math.max(0, 2 - activeNow);
      for (let i = 0; i < needed && i < todoCards.length; i++) {
        const card = todoCards[i];
        const tidx = updated.findIndex((c) => c.id === card.id);
        if (tidx !== -1) {
          updated[tidx] = { ...updated[tidx], column: 1, animating: true };
          setTimeout(() => {
            setCards((curr) =>
              curr.map((c) =>
                c.id === card.id ? { ...c, animating: false } : c
              )
            );
          }, 400);
        }
      }

      // Refill ToDo if needed
      const currentTodo = updated.filter((c) => c.column === 0).length;
      if (currentTodo < MAX_PER_COLUMN) {
        updated.push({
          id: nextId++,
          label: getUniqueLabel(),
          priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
          column: 0,
          animating: false,
        });
      }

      // Clean Done overflow
      const doneCards = updated.filter((c) => c.column === 2);
      if (doneCards.length > MAX_PER_COLUMN) {
        const toRemove = doneCards[0];
        const removeIdx = updated.findIndex((c) => c.id === toRemove.id);
        if (removeIdx !== -1) {
          usedLabels.current.delete(updated[removeIdx].label);
          updated.splice(removeIdx, 1);
        }
      }

      return updated;
    });
    setCompletedCount((c) => c + 1);
    spawnEmojis();
  }

  // IntersectionObserver — start/stop auto-pipeline
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.current) {
            isVisible.current = true;
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(autoPipeline, 1400);
          } else if (!entry.isIntersecting && isVisible.current) {
            isVisible.current = false;
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPipeline]);

  const getColumnCards = (col: number) =>
    cards.filter((c) => c.column === col);

  return (
    <div className="kanban-wrapper">
      <div className="kanban-board" ref={containerRef}>
        <div className="kanban-topbar">
          <div className="kanban-topbar-left">
            <span className="kanban-dot kanban-dot-green" />
            <span className="kanban-project-name">
              Josh&apos;s Workspace
            </span>
          </div>
          <div className="kanban-topbar-right">
            <span className="kanban-stat">
              <span className="kanban-stat-num">{completedCount}</span>{" "}
              completed
            </span>
          </div>
        </div>
        <div className="kanban-columns">
          {COLUMNS.map((colName, colIdx) => (
            <div key={colName} className="kanban-column">
              <div className="kanban-column-header">
                <span
                  className={`kanban-col-dot kanban-col-dot-${colIdx}`}
                />
                <span className="kanban-col-title">{colName}</span>
              </div>
              <div className="kanban-column-body">
                {getColumnCards(colIdx).map((card) => (
                  <div
                    key={card.id}
                    className={`kanban-card ${
                      card.animating ? "kanban-card-entering" : ""
                    } ${card.column === 2 ? "kanban-card-done" : ""} ${
                      card.column === 1 && !card.animating
                        ? "kanban-card-clickable"
                        : ""
                    }`}
                    onClick={() => {
                      if (card.column === 1 && !card.animating)
                        completeTask(card.id);
                    }}
                  >
                    <div className="kanban-card-top">
                      <span className="kanban-card-label">
                        {card.column === 2 && (
                          <span className="kanban-check">✓ </span>
                        )}
                        {card.label}
                      </span>
                    </div>
                    <div className="kanban-card-bottom">
                      <span
                        className={`kanban-priority kanban-priority-${card.priority}`}
                      >
                        {card.priority}
                      </span>
                      <span className="kanban-card-id">
                        #{String(card.id).padStart(3, "0")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Emoji Particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="kanban-emoji-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              ["--vx" as string]: `${p.vx * 30}px`,
              ["--vy" as string]: `${p.vy * 40}px`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>
      <span className="kanban-hover-hint">Click the active tasks ✨</span>
    </div>
  );
}

/* ── Skill Cards Data ── */

const skills = [
  {
    label: "1. Email Deliverability",
    title: "",
    titleJsx: <>Pretty emails are cute, but in 2026,<br />Google doesn&apos;t give a damn.</>,
    desktopParagraphs: [
      "I don't just write emails. I understand the technical infrastructure behind consistent inbox placement. Authentication, sender reputation, suppression logic, and real-time metrics aren't afterthoughts.",
    ],
    mobileParagraphs: [
      "I don't just write emails. I understand the technical infrastructure behind consistent inbox placement.",
    ],
    footnote: null,
    customVisual: "conveyor",
  },
  {
    label: "2. Project Management",
    title: "",
    titleJsx: <>For the love of God, please use Asana&nbsp;🙏🏾</>,
    desktopParagraphs: [
      "Okay I'm biased, but the point is, having a system AND operations not built in the 1940s is ideal.",
      "I create detailed projects & automations so my team moves like we're about to pull off a heist (but like, legally).",
    ],
    mobileParagraphs: [
      "I create detailed projects and automations so my team moves like we're about to pull off a heist (but legally).",
    ],
    footnote: null,
    customVisual: "kanban",
  },
  {
    label: "4. Klaviyo",
    title: "",
    titleJsx: <>I Turn Klaviyo Into<br />35–40% of Your Revenue</>,
    desktopParagraphs: [
      "I create advanced flow segmentation and campaign strategies that work cohesively to improve your core KPIs.",
    ],
    mobileParagraphs: [
      "I create advanced flow segmentation and campaign strategies that work cohesively to improve your core KPIs.",
    ],
    footnote: null,
    customVisual: "klaviyoFlow",
  },
  {
    label: "5. Full-Stack Development",
    title: "",
    titleJsx: <>I Can Also Literally Make You<br />Anything You Want to See.</>,
    desktopParagraphs: [
      "I've developed everything from intelligent social media content generators to enterprise-grade internal software for B2B.",
      "What do you want to see?",
    ],
    mobileParagraphs: [
      "I've developed everything from intelligent social media content generators to enterprise-grade internal software for B2B.",
      "What do you want to see?",
    ],
    footnote: null,
    customVisual: "codeTerminal",
  },
];



function SkillCardGrid({ items }: { items: typeof skills }) {
  return (
    <div className="skills-grid">
      {items.map((skill) => (
        <div key={skill.label} className="skill-card">
          <div className="skill-card-content">
            <span className="skill-card-label">{skill.label}</span>
            <h3>{skill.titleJsx || skill.title}</h3>
            <div className="skill-card-paragraphs-desktop">
              {skill.desktopParagraphs.map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="skill-card-paragraphs-mobile">
              {skill.mobileParagraphs.map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {skill.footnote && (
              <p className="skill-card-footnote">{skill.footnote}</p>
            )}
          </div>
          <div className="skill-card-visual">
            {skill.customVisual === "kanban" ? (
              <MiniKanban />
            ) : skill.customVisual === "conveyor" ? (
              <ConveyorBelt />
            ) : skill.customVisual === "klaviyoFlow" ? (
              <KlaviyoFlowViz />
            ) : skill.customVisual === "codeTerminal" ? (
              <CodeTerminal />
            ) : (
              <div className="animation-placeholder">
                <span className="animation-placeholder-icon">📋</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Top 2 cards: Email Deliverability + Project Management */
export function SkillCardsTop() {
  return (
    <section className="skills-section" id="skills">
      <SkillCardGrid items={skills.slice(0, 2)} />
    </section>
  );
}

/* Bottom 3 cards: Engineering + Design + Operations */
export function SkillCardsBottom() {
  return (
    <section className="skills-section skills-section-bottom">
      <SkillCardGrid items={skills.slice(2)} />
    </section>
  );
}

export default function SkillCards() {
  return (
    <section className="skills-section" id="skills">
      <SkillCardGrid items={skills} />
    </section>
  );
}

