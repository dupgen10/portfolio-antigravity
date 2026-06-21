"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };
    const onRingFrame = () => {
      const rx = parseFloat(ring.style.left || 0);
      const ry = parseFloat(ring.style.top || 0);
      ring.style.left = `${rx + (mx - rx) * 0.15}px`;
      ring.style.top = `${ry + (my - ry) * 0.15}px`;
      requestAnimationFrame(onRingFrame);
    };
    const onEnter = () => { dot.classList.add("hovering"); ring.classList.add("hovering"); };
    const onLeave = () => { dot.classList.remove("hovering"); ring.classList.remove("hovering"); };

    document.addEventListener("mousemove", onMove);
    const interactables = document.querySelectorAll("a, button, [class*='project-card'], [class*='btn-']");
    interactables.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    requestAnimationFrame(onRingFrame);
    return () => {
      document.removeEventListener("mousemove", onMove);
      interactables.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
