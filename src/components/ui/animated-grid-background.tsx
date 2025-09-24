"use client";

import React, { useEffect, useRef } from 'react';

export function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let columns = Math.floor(width / 20);
    let character = '01'.split('');

    let drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    let frameCount = 0;

    const drawRain = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        requestAnimationFrame(drawRain);
        return;
      }

      ctx.fillStyle = 'rgba(2, 8, 23, 0.1)'; // Corresponds to --background
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'hsl(var(--accent))'; // Accent Green
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        let text = character[Math.floor(Math.random() * character.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };
    
    const drawGrid = () => {
        if(!ctx) return;
        ctx.strokeStyle = 'hsl(var(--primary) / 0.1)'; 
        ctx.lineWidth = 1;

        for (let i = 0; i < width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }

        for (let i = 0; i < height; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }
    }
    
    const draw = () => {
        ctx.clearRect(0,0,width,height);
        drawGrid();
        drawRain();
    }

    const intervalId = setInterval(draw, 50);
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / 20);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
      draw();
    };

    window.addEventListener('resize', handleResize);
    
    draw();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.3,
      }}
    />
  );
}
