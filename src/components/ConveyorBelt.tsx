"use client";
import { useEffect, useRef } from "react";

/**
 * Revenue Factory / Conveyor Belt Animation
 * Ported from copyculture.io/agency → outcome_v2.js
 * Envelopes enter raw, pass through the "system", exit green with floating revenue metrics.
 * Hover to speed up production.
 */
export default function ConveyorBelt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      baseSpeed: 3,
      boostSpeed: 5.5,
      spawnRate: 30,
      colors: {
        belt: "#334155",
        raw: "#94a3b8",
        processed: "#22c55e",
        glow: "rgba(34, 197, 94, 0.5)",
      },
    };

    let items: {
      x: number;
      y: number;
      w: number;
      h: number;
      type: "raw" | "processed";
      progress: number;
      remove?: boolean;
    }[] = [];

    let particles: {
      type: "text" | "dot";
      text?: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color?: string;
    }[] = [];

    let frame = 0;
    let isHovering = false;
    let isRunning = false;

    let width = 0;
    let height = 0;
    let beltY = 0;
    let machineX = 0;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      beltY = height * 0.65;
      machineX = width * 0.5;
    }

    function spawnItem() {
      items.push({
        x: -30,
        y: beltY - 20,
        w: 26,
        h: 20,
        type: "raw",
        progress: 0,
      });
    }

    function spawnParticles(px: number, py: number) {
      const randRange = (min: number, max: number, fixed = 0) =>
        (Math.random() * (max - min) + min).toFixed(fixed);

      const metricTypes = [
        () => `+${randRange(2, 10, 1)}% Click Rate`,
        () => `+${randRange(10, 25, 1)}% Open Rate`,
        () => `+$${randRange(100, 1500, 0)} Placed Order`,
        () => `+${randRange(1, 3, 1)}% RPR`,
      ];

      const text =
        metricTypes[Math.floor(Math.random() * metricTypes.length)]();

      ctx!.font = "bold 11px sans-serif";
      const textWidth = ctx!.measureText(text).width;

      particles.push({
        type: "text",
        text,
        x: px - textWidth / 2,
        y: py - 28,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.6,
        life: 1.5,
        color: "#ffffff",
      });

      for (let i = 0; i < 3; i++) {
        particles.push({
          type: "dot",
          x: px,
          y: py,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1.5,
          life: 1.0,
        });
      }
    }

    function update() {
      frame++;
      const currentSpeed = isHovering ? config.boostSpeed : config.baseSpeed;
      const spawnRate = isHovering ? 20 : 60;

      if (frame % spawnRate === 0) spawnItem();

      items.forEach((item) => {
        item.x += currentSpeed;
        if (item.type === "raw" && item.x > machineX - 20) {
          item.type = "processed";
          spawnParticles(item.x + item.w / 2, item.y + item.h / 2);
        }
        if (item.x > width + 50) item.remove = true;
      });

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
      });

      items = items.filter((i) => !i.remove);
      particles = particles.filter((p) => p.life > 0);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Belt
      ctx.fillStyle = config.colors.belt;
      ctx.fillRect(0, beltY, width, 6);

      // Belt treads
      ctx.fillStyle = "#1e293b";
      const treadOffset =
        (frame * (isHovering ? config.boostSpeed : config.baseSpeed)) % 24;
      for (let x = -treadOffset; x < width; x += 24) {
        ctx.fillRect(x, beltY + 1, 3, 4);
      }

      // Machine back pillars
      const mw = 70;
      const mh = 65;
      const mx = machineX - mw / 2;
      const my = beltY - mh;

      ctx.fillStyle = "#334155";
      ctx.fillRect(mx + 3, my, 6, mh);
      ctx.fillRect(mx + mw - 9, my, 6, mh);

      // Envelopes
      items.forEach((item) => {
        const isProcessed = item.type === "processed";
        ctx.fillStyle = isProcessed
          ? config.colors.processed
          : config.colors.raw;

        if (isProcessed) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = config.colors.processed;
        }

        ctx.fillRect(item.x, item.y, item.w, item.h);
        ctx.shadowBlur = 0;

        // Flap
        ctx.strokeStyle = isProcessed ? "#064e3b" : "#475569";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(item.x, item.y);
        ctx.lineTo(item.x + item.w / 2, item.y + item.h * 0.6);
        ctx.lineTo(item.x + item.w, item.y);
        ctx.stroke();
        ctx.strokeRect(item.x, item.y, item.w, item.h);

        if (isProcessed) {
          ctx.fillStyle = "#064e3b";
          ctx.font = "bold 8px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("@", item.x + item.w / 2, item.y + 15);
        }
      });

      // Machine front
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(mx, my, mw, 14);

      ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
      ctx.fillRect(mx, my, 3, mh);
      ctx.fillRect(mx + mw - 3, my, 3, mh);

      // Scan field
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const pulse = Math.sin(frame * 0.1) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(34, 197, 94, ${0.1 + pulse * 0.2})`;
      ctx.fillRect(mx + 3, my + 14, mw - 6, mh - 14);
      ctx.restore();

      // Status light
      const lightColor = isHovering ? "#22c55e" : "#eab308";
      ctx.fillStyle = lightColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = lightColor;
      ctx.beginPath();
      ctx.arc(mx + mw / 2, my + 7, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.fillStyle = "#fff";
      ctx.font = "bold 8px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SYSTEM", mx + mw / 2, my - 5);

      // Floating metrics
      ctx.textAlign = "left";
      particles.forEach((p) => {
        if (p.type === "text") {
          ctx.save();
          ctx.font = "bold 11px sans-serif";
          ctx.shadowColor = "rgba(0,0,0,0.9)";
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
          ctx.fillStyle = `rgba(74, 222, 128, ${p.life})`;
          ctx.fillText(p.text || "", p.x, p.y);
          ctx.restore();
        } else if (p.type === "dot") {
          ctx.fillStyle = `rgba(34, 197, 94, ${p.life})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    function animate() {
      if (!isRunning) return;
      update();
      draw();
      requestAnimationFrame(animate);
    }

    // Events
    const onEnter = () => {
      isHovering = true;
    };
    const onLeave = () => {
      isHovering = false;
    };
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Intersection Observer
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

    setTimeout(() => resize(), 100);

    return () => {
      isRunning = false;
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="conveyor-belt-wrapper">
      <div className="conveyor-belt-canvas-wrap">
        <canvas ref={canvasRef} className="conveyor-belt-canvas" />
        <div className="conveyor-belt-overlay" />
      </div>
      <span className="conveyor-belt-subtitle">When Josh manages your emails</span>
      <span className="kanban-hover-hint">Hover to boost production ✨</span>
    </div>
  );
}
