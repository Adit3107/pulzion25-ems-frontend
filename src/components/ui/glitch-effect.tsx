"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchEffectProps {
  children: React.ReactNode;
}

export function GlitchEffect({ children }: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), Math.random() * 200 + 50);
    }, Math.random() * 5000 + 2000); // Glitch every 2-7 seconds

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className={`relative ${isGlitching ? 'animate-glitch' : ''}`}>
      {children}
    </div>
  );
}
