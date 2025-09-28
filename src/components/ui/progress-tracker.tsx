"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';
import GlitchText from './GlitchText';

interface ProgressTrackerProps {
  totalEvents?: number;
  completedEvents?: number;
  activeOperatives?: number;
  totalOperatives?: number;
  systemIntegrity?: number;
  className?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalEvents = 12,
  completedEvents = 0,
  activeOperatives = 0,
  totalOperatives = 1000,
  systemIntegrity = 100,
  className = ''
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [displayOperatives, setDisplayOperatives] = useState(0);
  const [displayIntegrity, setDisplayIntegrity] = useState(100);

  const missionProgress = (completedEvents / totalEvents) * 100;
  const operativeProgress = (activeOperatives / totalOperatives) * 100;
  
  // Calculate system integrity based on mission progress (decreases as AI grows stronger)
  const calculatedIntegrity = Math.max(20, systemIntegrity - (missionProgress * 0.8));

  useEffect(() => {
    // Animate progress values
    const animateValues = () => {
      const duration = 2000;
      const steps = 60;
      const progressStep = missionProgress / steps;
      const operativeStep = operativeProgress / steps;
      const integrityStep = (calculatedIntegrity - 100) / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setDisplayProgress(Math.min(progressStep * currentStep, missionProgress));
        setDisplayOperatives(Math.min(operativeStep * currentStep, operativeProgress));
        setDisplayIntegrity(Math.max(100 + (integrityStep * currentStep), calculatedIntegrity));
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    };

    const cleanup = animateValues();
    return cleanup;
  }, [missionProgress, operativeProgress, calculatedIntegrity]);

  const getIntegrityColor = (integrity: number) => {
    if (integrity > 80) return '#00ff41'; // Green - Safe
    if (integrity > 60) return '#ffff00'; // Yellow - Caution
    if (integrity > 40) return '#ff6b35'; // Orange - Warning
    return '#ff073a'; // Red - Critical
  };

  const getProgressColor = (progress: number) => {
    if (progress < 25) return '#ff073a'; // Red - Emergency
    if (progress < 50) return '#ff6b35'; // Orange - Alert
    if (progress < 75) return '#ffff00'; // Yellow - Progress
    return '#00ff41'; // Green - Success
  };

  return (
    <div className={`bg-black/60 backdrop-blur-lg border border-primary/30 rounded-xl p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-headline font-bold mb-2 flex items-center gap-2">
          <Shield className="text-primary" size={24} />
          <GlitchText text="OPERATION STATUS" glitchIntensity="low" />
        </h3>
        <div className="text-sm text-gray-400 font-mono">
          TRACKING MISSION PROGRESS AGAINST THE COLLECTIVE
        </div>
      </div>

      {/* Mission Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-mono text-gray-300">MISSION COMPLETION</span>
          <span className="text-sm font-mono font-bold" style={{ color: getProgressColor(displayProgress) }}>
            {completedEvents}/{totalEvents} ({displayProgress.toFixed(1)}%)
          </span>
        </div>
        <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300 relative"
            style={{ 
              width: `${displayProgress}%`,
              background: `linear-gradient(90deg, ${getProgressColor(displayProgress)}, ${getProgressColor(displayProgress)}80)`
            }}
          >
            {/* Pulsing effect */}
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${getProgressColor(displayProgress)}40, transparent)`
              }}
            />
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1 font-mono">
          EXTRACTING THE MASTER KEY... {displayProgress.toFixed(1)}% COMPLETE
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Active Operatives */}
        <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <Users className="text-cyan-400" size={16} />
            <span className="text-xs font-mono text-gray-400">ACTIVE</span>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {Math.floor(displayOperatives * totalOperatives / 100).toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 font-mono">OPERATIVES ONLINE</div>
        </div>

        {/* System Integrity */}
        <div className="bg-gray-900/50 rounded-lg p-4 border border-red-500/20">
          <div className="flex items-center justify-between mb-2">
            <Zap className="text-red-400" size={16} />
            <span className="text-xs font-mono text-gray-400">INTEGRITY</span>
          </div>
          <div 
            className="text-2xl font-bold font-mono"
            style={{ color: getIntegrityColor(displayIntegrity) }}
          >
            {displayIntegrity.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 font-mono">
            {displayIntegrity > 80 ? 'SYSTEMS SECURE' : 
             displayIntegrity > 60 ? 'MINOR BREACHES' :
             displayIntegrity > 40 ? 'COMPROMISED' : 'CRITICAL FAILURE'}
          </div>
        </div>
      </div>

      {/* Master Key Progress */}
      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-sm font-mono font-bold text-purple-300">THE MASTER KEY</span>
        </div>
        <div className="text-xs text-gray-400 mb-2">
          Quantum encryption fragments recovered: {completedEvents}/{totalEvents}
        </div>
        <div className="bg-gray-800 rounded-full h-2">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${displayProgress}%`,
              background: 'linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)'
            }}
          />
        </div>
      </div>

      {/* Warning Message */}
      {displayIntegrity < 60 && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-sm font-mono text-red-300">
              <GlitchText text="WARNING: THE COLLECTIVE IS GAINING STRENGTH" glitchIntensity="medium" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;