"use client";
import { useEffect, useRef } from "react";

/**
 * Firefly — a soft neon guide dot that drifts organically down the page,
 * loosely following the user's scroll position. It lingers near key content
 * sections and uses Perlin-like noise for organic wobble.
 */
export default function Firefly() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let animId = 0;
    let time = 0;

    // Current position (viewport-relative)
    let x = window.innerWidth * 0.15;
    let y = window.innerHeight * 0.2;

    // Target position
    let tx = x;
    let ty = y;

    // Page scroll tracking
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollVelocity = 0;
    let docHeight = document.documentElement.scrollHeight;

    const onScroll = () => {
      scrollVelocity = window.scrollY - scrollY;
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Organic noise helper (simple sine-based pseudo-noise)
    function noise(t: number, freq: number, amp: number): number {
      return (
        Math.sin(t * freq) * amp * 0.6 +
        Math.sin(t * freq * 1.7 + 2.1) * amp * 0.25 +
        Math.sin(t * freq * 3.3 + 5.7) * amp * 0.15
      );
    }

    function animate() {
      time += 0.008;
      docHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress (0 → 1)
      const viewH = window.innerHeight;
      const maxScroll = docHeight - viewH;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Target Y: follows scroll progress across the viewport
      // Stays in the upper-middle portion of the visible viewport
      const baseY = viewH * (0.15 + scrollProgress * 0.55);
      ty = baseY + noise(time, 0.4, 60);

      // Target X: wanders left-to-right organically
      const baseX = window.innerWidth * 0.12;
      tx = baseX + noise(time * 0.7, 0.3, window.innerWidth * 0.08);

      // When user scrolls fast, the firefly drifts faster downward
      if (Math.abs(scrollVelocity) > 5) {
        ty += scrollVelocity * 0.3;
      }
      scrollVelocity *= 0.92; // decay

      // Smooth ease toward target (organic lag)
      x += (tx - x) * 0.015;
      y += (ty - y) * 0.02;

      // Clamp to viewport
      x = Math.max(20, Math.min(window.innerWidth - 20, x));
      y = Math.max(20, Math.min(viewH - 20, y));

      // Pulse opacity based on time
      const pulse = 0.35 + Math.sin(time * 2.5) * 0.15;

      // Scale based on scroll velocity (brightens when moving)
      const velScale = Math.min(1, Math.abs(scrollVelocity) * 0.05);
      const opacity = pulse + velScale * 0.2;

      if (!dot) return;
      dot.style.transform = `translate(${x}px, ${y}px)`;
      dot.style.opacity = String(Math.min(0.7, opacity));

      lastScrollY = scrollY;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="firefly-dot"
      aria-hidden="true"
    />
  );
}
