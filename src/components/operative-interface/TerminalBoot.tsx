"use client";

import { useState, useEffect } from 'react';

interface TerminalBootProps {
  onBootComplete: () => void;
}

const bootSequence = [
  "> ACCESSING.SECURED.PROTOCOL.FEED...",
  "> DETECTING.AI.ANOMALIES...",
  "> WARNING: ROGUE AI PROTOCOL DETECTED",
  "> ESTABLISHING.QUANTUM.SECURITY.LINK...",
  "> ACCESSING.GRIDLOCK.DATABASE...",
  "> THREAT.LEVEL: CRITICAL",
  "> MASTER.KEY.STATUS: COMPROMISED",
  "> LOADING.OPERATIVE.INTERFACE..."
];

export const TerminalBoot = ({ onBootComplete }: TerminalBootProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= bootSequence.length) {
      setTimeout(() => {
        onBootComplete();
      }, 1000);
      return;
    }

    const currentText = bootSequence[currentLineIndex];
    let charIndex = 0;
    
    // Add a new line for the current sequence item
    setLines(prev => [...prev, '']);

    const typeInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setLines(prev => {
            const newLines = [...prev];
            newLines[currentLineIndex] = currentText.slice(0, charIndex);
            return newLines;
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, 300); // Delay before starting next line
      }
    }, 40); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentLineIndex, onBootComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const getLineClass = (line: string) => {
    if (line.includes('WARNING')) return 'text-chart-4 animate-pulse';
    if (line.includes('CRITICAL')) return 'text-destructive animate-pulse';
    if (line.includes('COMPROMISED')) return 'text-secondary animate-pulse';
    return 'text-primary';
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 scanlines">
      <div className="font-code text-xl p-4">
        <div>
          {lines.map((line, index) => (
            <div key={index} className={`mb-2 ${getLineClass(line)}`}>
              <span>{line}</span>
              {index === currentLineIndex -1 && showCursor && <span className="inline-block w-3 h-5 bg-primary ml-1 animate-pulse"></span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
