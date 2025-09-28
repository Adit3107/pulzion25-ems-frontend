"use client";

import React, { useState, useEffect } from 'react';

interface ThreatIndicatorProps {
  level: number; // 0-100, where higher = more dangerous
}

const ThreatIndicator: React.FC<ThreatIndicatorProps> = ({ level }) => {
  const [animatedLevel, setAnimatedLevel] = useState(100);
  const [alertPulse, setAlertPulse] = useState(false);

  useEffect(() => {
    // Animate threat level decrease
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, 700);

    // Alert pulse for high threat
    if (level > 50) {
      const pulseTimer = setInterval(() => {
        setAlertPulse(true);
        setTimeout(() => setAlertPulse(false), 300);
      }, 1500);
      return () => {
        clearTimeout(timer);
        clearInterval(pulseTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [level]);

  const getThreatColor = () => {
    if (level <= 20) return '#00ff41'; // Safe - Matrix green
    if (level <= 40) return '#ffff00'; // Caution - Yellow
    if (level <= 70) return '#ff9500'; // Warning - Orange
    return '#ff073a'; // Critical - Red
  };

  const getThreatLevel = () => {
    if (level <= 20) return 'MINIMAL';
    if (level <= 40) return 'LOW';
    if (level <= 70) return 'MODERATE';
    if (level <= 90) return 'HIGH';
    return 'CRITICAL';
  };

  const getThreatDescription = () => {
    if (level <= 20) return 'AI THREAT NEUTRALIZED';
    if (level <= 40) return 'DEFENSIVE SYSTEMS OPERATIONAL';
    if (level <= 70) return 'ACTIVE COUNTERMEASURES DEPLOYED';
    return 'IMMEDIATE RESPONSE REQUIRED';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-xl p-6 border border-red-400/30 relative overflow-hidden">
      
      {/* Danger grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `conic-gradient(from 0deg at 50% 50%, ${getThreatColor()} 0deg, transparent 90deg, ${getThreatColor()} 180deg, transparent 270deg)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-mono font-bold text-red-400">
            ⚠️ AI THREAT LEVEL
          </h3>
          <div className={`w-3 h-3 rounded-full ${alertPulse && level > 50 ? 'animate-ping' : ''}`} 
               style={{ backgroundColor: getThreatColor() }} />
        </div>

        {/* Threat Level Display */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Hexagonal threat indicator */}
            <div 
              className="relative w-28 h-28 flex items-center justify-center"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                backgroundColor: getThreatColor(),
                filter: `drop-shadow(0 0 20px ${getThreatColor()})`,
                opacity: 0.2
              }}
            />
            
            {/* Inner hexagon with animation */}
            <div 
              className="absolute inset-2 flex items-center justify-center transition-all duration-1000"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                backgroundColor: getThreatColor(),
                filter: `drop-shadow(0 0 15px ${getThreatColor()})`,
                opacity: Math.max(0.3, 1 - (animatedLevel / 100))
              }}
            >
              <div className="text-center">
                <div 
                  className="text-xl font-bold font-mono"
                  style={{ color: level > 50 ? 'white' : 'black' }}
                >
                  {level}%
                </div>
              </div>
            </div>
          </div>
        </div>

        
        
        <div className="text-center mb-4">
          <div 
            className="text-xl font-bold font-mono mb-1"
            style={{ color: getThreatColor() }}
          >
            {getThreatLevel()}
          </div>
          <p className="text-sm font-mono text-gray-300">
            {getThreatDescription()}
          </p>
        </div>

        {/* Countdown/Progress indicators */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full bg-gray-800 overflow-hidden"
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: level > (i * 33.33) ? `${Math.min(100, (level - i * 33.33) * 3)}%` : '0%',
                  backgroundColor: getThreatColor(),
                  boxShadow: `0 0 5px ${getThreatColor()}`
                }}
              />
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-gray-400">FIREWALL STATUS:</span>
            <span style={{ color: level < 30 ? '#00ff41' : level < 70 ? '#ffff00' : '#ff073a' }}>
              {level < 30 ? 'SECURE' : level < 70 ? 'MONITORING' : 'COMPROMISED'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">ENCRYPTION:</span>
            <span style={{ color: level < 50 ? '#00ff41' : level < 80 ? '#ffff00' : '#ff073a' }}>
              {level < 50 ? 'INTACT' : level < 80 ? 'PARTIAL' : 'BREACHED'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">NETWORK ACCESS:</span>
            <span style={{ color: level < 40 ? '#00ff41' : level < 75 ? '#ffff00' : '#ff073a' }}>
              {level < 40 ? 'PROTECTED' : level < 75 ? 'LIMITED' : 'EXPOSED'}
            </span>
          </div>
        </div>

        {/* Emergency Protocol */}
        {level > 80 && (
          <div className="mt-4 pt-4 border-t border-red-400/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-red-400 font-bold">
                EMERGENCY PROTOCOL ACTIVE
              </span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatIndicator;