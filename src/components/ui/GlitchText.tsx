import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  glitchIntensity?: 'low' | 'medium' | 'high';
  duration?: number;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function GlitchText({ 
  text, 
  className = '', 
  style = {}, 
  glitchIntensity = 'low',
  duration = 3000 
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchFrequency = glitchIntensity === 'high' ? 5000 : 
                           glitchIntensity === 'medium' ? 8000 : 12000;

    const startGlitch = () => {
      if (isGlitching) return;
      
      setIsGlitching(true);
      const originalText = text;
      const glitchDuration = glitchIntensity === 'high' ? 200 : 
                            glitchIntensity === 'medium' ? 150 : 100;

      const glitchInterval = setInterval(() => {
        const glitchedText = originalText
          .split('')
          .map(char => {
            if (char === ' ') return ' ';
            return Math.random() < 0.7 ? char : 
                   GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('');
        
        setDisplayText(glitchedText);
      }, 30);

      setTimeout(() => {
        clearInterval(glitchInterval);
        setDisplayText(originalText);
        setIsGlitching(false);
      }, glitchDuration);
    };

    const glitchTimer = setInterval(startGlitch, glitchFrequency + Math.random() * 2000);

    return () => {
      clearInterval(glitchTimer);
    };
  }, [text, glitchIntensity, isGlitching]);

  return (
    <span 
      className={`${className} ${isGlitching ? 'animate-pulse' : ''}`}
      style={{
        ...style,
        textShadow: isGlitching ? 
          '0 0 5px #ff0000, 0 0 10px #00ff00, 0 0 15px #0000ff' : 
          style.textShadow
      }}
    >
      {displayText}
    </span>
  );
}