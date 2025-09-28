"use client";

import { useState, useEffect } from 'react';
import { TerminalBoot } from './TerminalBoot';
import { CommandCenter } from './CommandCenter';

export const OperativeInterface = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showInterface, setShowInterface] = useState(false);

  // Set to true for development to bypass boot animation
  const devMode = false;

  useEffect(() => {
    if (devMode) {
      setBootComplete(true);
      setShowInterface(true);
    }
  }, [devMode]);


  const handleBootComplete = () => {
    setBootComplete(true);
    setTimeout(() => {
      setShowInterface(true);
    }, 500);
  };

  useEffect(() => {
    if (!showInterface) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showInterface]);

  if (devMode && showInterface) {
    return <CommandCenter />;
  }

  return (
    <>
      {!bootComplete && (
        <TerminalBoot onBootComplete={handleBootComplete} />
      )}
      
      {bootComplete && (
        <div className={`transition-opacity duration-1000 ${
          showInterface ? 'opacity-100' : 'opacity-0'
        }`}>
          <CommandCenter />
        </div>
      )}
    </>
  );
};
