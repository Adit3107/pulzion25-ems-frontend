"use client";

import { useRef, useEffect } from 'react';

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 80;
    const maxDist = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x > width + 50) p1.x = -50;
        if (p1.y > height + 50) p1.y = -50;
        if (p1.x < -50) p1.x = width + 50;
        if (p1.y < -50) p1.y = height + 50;
        
        ctx.fillStyle = 'hsl(271, 76%, 70%)';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(271, 76%, 53%, ${1 - dist / maxDist})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    draw();

    return () => {
        window.removeEventListener('resize', () => {});
    }

  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.5
      }}
    />
  );
}
