"use client";
import { useEffect, useRef, useCallback, useState } from "react";

interface KanbanCard {
  id: number;
  label: string;
  priority: "high" | "med" | "low";
  column: 0 | 1 | 2;
  animating: boolean;
}

const TASK_POOL = [
  "Set up welcome flow",
  "Segment VIP list",
  "A/B test subject lines",
  "Review Q2 campaign",
  "Fix checkout abandon flow",
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
  "Build post-purchase flow",
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
const COLUMNS = ["To Do", "In Progress", "Done"];
const MAX_PER_COLUMN = 3;

let nextId = 0;

export default function TaskPipeline() {
  const [cards, setCards] = useState<KanbanCard[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const usedLabels = useRef<Set<string>>(new Set());

  function getUniqueLabel(): string {
    const available = TASK_POOL.filter((t) => !usedLabels.current.has(t));
    if (available.length === 0) {
      // Reset pool if exhausted
      usedLabels.current.clear();
      return TASK_POOL[Math.floor(Math.random() * TASK_POOL.length)];
    }
    const label = available[Math.floor(Math.random() * available.length)];
    usedLabels.current.add(label);
    return label;
  }

  function createCard(col: 0 | 1 | 2 = 0): KanbanCard {
    return {
      id: nextId++,
      label: getUniqueLabel(),
      priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      column: col,
      animating: false,
    };
  }

  // Initialize
  useEffect(() => {
    const initial: KanbanCard[] = [];
    for (let i = 0; i < 3; i++) initial.push(createCard(0));
    for (let i = 0; i < 2; i++) initial.push(createCard(1));
    for (let i = 0; i < 1; i++) initial.push(createCard(2));
    setCards(initial);
    setCompletedCount(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tick = useCallback(() => {
    setCards((prev) => {
      const updated = [...prev];

      // Move a random card forward (only if target column has room)
      const moveable = updated.filter((c) => {
        if (c.animating || c.column >= 2) return false;
        const targetCol = (c.column + 1) as 0 | 1 | 2;
        const targetCount = updated.filter((x) => x.column === targetCol).length;
        return targetCount < MAX_PER_COLUMN;
      });

      if (moveable.length > 0) {
        const card = moveable[Math.floor(Math.random() * moveable.length)];
        const idx = updated.findIndex((c) => c.id === card.id);
        if (idx !== -1) {
          updated[idx] = {
            ...updated[idx],
            column: (updated[idx].column + 1) as 0 | 1 | 2,
            animating: true,
          };

          if (updated[idx].column === 2) {
            setCompletedCount((c) => c + 1);
          }

          setTimeout(() => {
            setCards((curr) =>
              curr.map((c) =>
                c.id === card.id ? { ...c, animating: false } : c
              )
            );
          }, 500);
        }
      }

      // Remove oldest done card if over limit
      const doneCards = updated.filter((c) => c.column === 2);
      if (doneCards.length > MAX_PER_COLUMN) {
        const toRemove = doneCards[0];
        const removeIdx = updated.findIndex((c) => c.id === toRemove.id);
        if (removeIdx !== -1) {
          usedLabels.current.delete(updated[removeIdx].label);
          updated.splice(removeIdx, 1);
        }
      }

      // Spawn new card if To Do has room
      const todoCards = updated.filter((c) => c.column === 0);
      if (todoCards.length < MAX_PER_COLUMN) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IntersectionObserver + interval
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.current) {
            isVisible.current = true;
            intervalRef.current = setInterval(tick, 1800);
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
  }, [tick]);

  const getColumnCards = (col: number) =>
    cards.filter((c) => c.column === col);

  return (
    <section className="taskpipeline-section" id="project-management">
      <div className="container">
        <div className="taskpipeline-grid">
          {/* Kanban Board Side */}
          <div className="kanban-visual" ref={containerRef}>
            <div className="kanban-board">
              {/* Header bar */}
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

              {/* Columns */}
              <div className="kanban-columns">
                {COLUMNS.map((colName, colIdx) => (
                  <div key={colName} className="kanban-column">
                    <div className="kanban-column-header">
                      <span
                        className={`kanban-col-dot kanban-col-dot-${colIdx}`}
                      />
                      <span className="kanban-col-title">{colName}</span>
                      <span className="kanban-col-count">
                        {getColumnCards(colIdx).length}
                      </span>
                    </div>
                    <div className="kanban-column-body">
                      {getColumnCards(colIdx).map((card) => (
                        <div
                          key={card.id}
                          className={`kanban-card ${
                            card.animating ? "kanban-card-entering" : ""
                          } ${card.column === 2 ? "kanban-card-done" : ""}`}
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
            </div>
          </div>

          {/* Text Side */}
          <div className="taskpipeline-content">
            <div
              className="cx-pill"
              style={{
                fontSize: "0.65rem",
                padding: "0.3rem 1rem",
                marginBottom: "1.25rem",
              }}
            >
              PROJECT MANAGEMENT
            </div>
            <h2 className="cx-section-title" style={{ textAlign: "left" }}>
              For the love of God, please use Asana 🙏🏾
            </h2>
            <p className="cx-section-desc" style={{ marginBottom: "1.25rem" }}>
              Okay I&apos;m biased, but the point is, having a system AND
              operations not built in the 1940s is ideal.
            </p>
            <p className="cx-section-desc">
              I create detailed projects &amp; automations so my team moves like
              we&apos;re about to pull off a heist (but like, legally).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
