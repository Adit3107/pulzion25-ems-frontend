import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  glitchEffect?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedCounter({ 
  value, 
  duration = 2000,
  glitchEffect = false,
  prefix = '',
  suffix = '',
  className = '',
  style = {}
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    setDisplayValue(0);

    const startTime = Date.now();
    const endValue = value;

    const animateNumber = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      if (glitchEffect && progress < 0.8) {
        // Add random glitch numbers during animation
        const glitchValue = Math.random() < 0.3 ? 
          Math.floor(Math.random() * endValue * 2) : 
          Math.floor(easeOutQuart * endValue);
        setDisplayValue(glitchValue);
      } else {
        setDisplayValue(Math.floor(easeOutQuart * endValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setDisplayValue(endValue);
        setIsAnimating(false);
      }
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(animateNumber);
    }, 100);

    return () => clearTimeout(timeout);
  }, [value, duration, glitchEffect]);

  return (
    <span 
      className={`${className} ${isAnimating ? 'animate-pulse' : ''}`}
      style={{
        ...style,
        textShadow: isAnimating ? '0 0 10px currentColor' : style.textShadow
      }}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}