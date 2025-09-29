"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), Math.random() * 200 + 50);
    }, Math.random() * 5000 + 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <span className={cn('relative', isGlitching ? 'animate-glitch' : '', className)}>
      {text}
    </span>
  );
}
