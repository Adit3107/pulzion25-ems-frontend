"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  startDelay?: number;
}

export function Typewriter({ text, delay = 50, startDelay = 0 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
        setIsReady(true);
    }, startDelay);
    
    return () => clearTimeout(startTimeout);
  }, [startDelay]);
  
  useEffect(() => {
      if (!isReady) return;

    let i = 0;
    setDisplayedText(''); // Reset on text change
    
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [text, delay, isReady]);

  return <span>{displayedText}</span>;
}
