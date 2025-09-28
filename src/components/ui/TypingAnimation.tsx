import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function TypingAnimation({ 
  text, 
  speed = 50,
  delay = 0,
  className = '',
  style = {},
  cursor = true,
  onComplete
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, onComplete]);

  useEffect(() => {
    if (cursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [cursor]);

  return (
    <span className={className} style={style}>
      {displayText}
      {cursor && !isComplete && (
        <span 
          className={`inline-block transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          style={{ color: '#4fe6ee' }}
        >
          |
        </span>
      )}
    </span>
  );
}