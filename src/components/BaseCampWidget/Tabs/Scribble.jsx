"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = ["#c8ff00", "#f0ece0", "#4a9eff", "#ff4a86"]; // lime, ivory, steel, pink

export default function Scribble() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // Setup high DPI canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
  }, []); // Run once to setup size

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
  }, [color]); // Update color

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    
    // Support both mouse and touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-5 h-5 rounded-full cursor-none transition-transform"
              style={{ 
                backgroundColor: c, 
                border: color === c ? "2px solid var(--ink)" : "2px solid transparent",
                boxShadow: color === c ? `0 0 0 1px ${c}` : "none",
                transform: color === c ? "scale(1.1)" : "scale(1)"
              }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
        <button 
          onClick={clearCanvas}
          className="text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors cursor-none"
          style={{ color: "var(--muted)" }}
        >
          Clear
        </button>
      </div>

      <div className="relative w-full h-[180px] rounded-lg overflow-hidden" style={{ background: "var(--ink-2)", border: "1px solid var(--border-2)" }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          className="w-full h-full touch-none cursor-none"
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
}
