"use client";

import React from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'normal' | 'fast';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  children, 
  className = '', 
  intensity = 'medium',
  speed = 'normal'
}) => {
  const getIntensityClass = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'glitch-low';
      case 'medium': return 'glitch-medium';
      case 'high': return 'glitch-high';
      default: return 'glitch-medium';
    }
  };

  const getSpeedClass = (speed: string) => {
    switch (speed) {
      case 'slow': return 'glitch-slow';
      case 'normal': return 'glitch-normal';
      case 'fast': return 'glitch-fast';
      default: return 'glitch-normal';
    }
  };

  return (
    <span 
      className={`glitch ${getIntensityClass(intensity)} ${getSpeedClass(speed)} ${className}`}
      data-text={children}
    >
      {children}
    </span>
  );
};

export default GlitchText;