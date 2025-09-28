import React, { useRef, useEffect } from "react";

const TEAM_COLORS = [
  "#00ff41", // CHARLIE
  "#ff073a", // DELTA
  "#4fe6ee", // ECHO
  "#ff6b35"  // BRAVO
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingParticles({ teamColor = "#4fe6ee" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Create particles
    particles.current = Array.from({ length: 40 }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(2, 6),
      dx: randomBetween(-0.5, 0.5),
      dy: randomBetween(-0.5, 0.5),
      color: TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)],
      alpha: randomBetween(0.5, 1)
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.current.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      });
    }

    function update() {
      particles.current.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
        // Pulsing alpha
        p.alpha += Math.sin(Date.now() / 500 + p.x) * 0.01;
        p.alpha = Math.max(0.3, Math.min(1, p.alpha));
      });
    }

    function animate() {
      update();
      draw();
      requestAnimationFrame(animate);
    }
    animate();

    // Mouse interaction: particles move away from cursor
    function handleMouseMove(e: MouseEvent) {
      const mx = e.clientX;
      const my = e.clientY;
      particles.current.forEach(p => {
        const dist = Math.hypot(p.x - mx, p.y - my);
        if (dist < 80) {
          const angle = Math.atan2(p.y - my, p.x - mx);
          p.dx += Math.cos(angle) * 0.2;
          p.dy += Math.sin(angle) * 0.2;
        }
      });
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [teamColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
