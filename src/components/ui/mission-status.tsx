"use client";

import React, { useState, useEffect } from 'react';

interface MissionStatusProps {
  progress: number;
}

const MissionStatus: React.FC<MissionStatusProps> = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [pulseEffect, setPulseEffect] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 500);

    // Pulse effect
    const pulseTimer = setInterval(() => {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 300);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, [progress]);

  const getStatusColor = () => {
    if (progress >= 80) return '#00ff41'; // Matrix green
    if (progress >= 60) return '#ffff00'; // Yellow warning
    if (progress >= 40) return '#ff9500'; // Orange alert
    return '#ff073a'; // Red critical
  };

  const getStatusText = () => {
    if (progress >= 80) return 'MISSION CRITICAL: NEARLY COMPLETE';
    if (progress >= 60) return 'OPERATIONS: ON TRACK';
    if (progress >= 40) return 'STATUS: MODERATE PROGRESS';
    return 'ALERT: IMMEDIATE ACTION REQUIRED';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-xl p-6 border border-cyan-400/30 relative overflow-hidden">
      
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(79, 230, 238, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 230, 238, 0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-mono font-bold text-cyan-400">
            🎯 GLOBAL MISSION STATUS
          </h3>
          <div className={`w-3 h-3 rounded-full ${pulseEffect ? 'animate-ping' : ''}`} 
               style={{ backgroundColor: getStatusColor() }} />
        </div>

        {/* Main Progress Circle */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(79, 230, 238, 0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={getStatusColor()}
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - animatedProgress / 100)}`}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 10px ${getStatusColor()})`
                }}
              />
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div 
                  className="text-2xl font-bold font-mono"
                  style={{ color: getStatusColor() }}
                >
                  {progress}%
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  COMPLETE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center mb-4">
          <p 
            className="text-sm font-mono font-bold"
            style={{ color: getStatusColor() }}
          >
            {getStatusText()}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 relative"
              style={{ 
                width: `${animatedProgress}%`,
                backgroundColor: getStatusColor(),
                boxShadow: `0 0 10px ${getStatusColor()}`
              }}
            >
              {/* Animated scanner */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)`,
                  animation: 'scanner 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold font-mono text-white">
              {Math.floor(progress * 2.5)}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              EVENTS COMPLETED
            </div>
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-white">
              {Math.floor((100 - progress) * 1.2)}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              REMAINING TASKS
            </div>
          </div>
        </div>

        {/* Estimated completion */}
        <div className="mt-4 pt-4 border-t border-gray-700/50 text-center">
          <p className="text-xs text-gray-400 font-mono">
            EST. COMPLETION: {progress >= 90 ? 'IMMINENT' : progress >= 70 ? '2-3 HOURS' : progress >= 50 ? '4-6 HOURS' : '8+ HOURS'}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanner {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default MissionStatus;