"use client";

import React, { useState, useEffect } from 'react';
import { X, Clock, Users, Target, Lock } from 'lucide-react';
import GlitchText from './GlitchText';

interface MissionBriefingProps {
  event: {
    name: string;
    category: 'Decryption' | 'Field Ops' | 'Recon' | 'Engineering';
    description: string;
    objectives: string[];
    startTime: Date;
    duration: string;
    teamSize: string;
    difficulty: 'Classified' | 'Restricted' | 'Confidential' | 'Top Secret';
    icon: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onJoinMission: () => void;
}

export const MissionBriefingModal: React.FC<MissionBriefingProps> = ({
  event,
  isOpen,
  onClose,
  onJoinMission
}) => {
  const [timeUntilStart, setTimeUntilStart] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
    } else {
      setTimeout(() => setIsActive(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const startTime = event.startTime.getTime();
      const timeDiff = startTime - now;

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeUntilStart(
          `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      } else {
        setTimeUntilStart('MISSION ACTIVE');
      }
    };

    if (isOpen) {
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, event.startTime]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Decryption': return '#00ff41'; // CHARLIE green
      case 'Field Ops': return '#ff073a'; // DELTA red
      case 'Recon': return '#4fe6ee'; // ECHO cyan
      case 'Engineering': return '#ff6b35'; // BRAVO orange
      default: return '#9ca3af';
    }
  };

  const getDifficultyLevel = (difficulty: string) => {
    switch (difficulty) {
      case 'Classified': return 1;
      case 'Restricted': return 2;
      case 'Confidential': return 3;
      case 'Top Secret': return 4;
      default: return 1;
    }
  };

  if (!isActive && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 backdrop-blur-0'
      }`}
      style={{ 
        background: isOpen ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
        backdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)'
      }}
      onClick={onClose}
    >
      <div 
        className={`bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-xl 
                   border-2 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto
                   transition-all duration-300 transform ${
                     isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                   }`}
        style={{ 
          borderColor: getCategoryColor(event.category),
          boxShadow: `0 0 50px ${getCategoryColor(event.category)}20, 0 20px 40px rgba(0, 0, 0, 0.5)`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b" style={{ borderColor: `${getCategoryColor(event.category)}30` }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl backdrop-blur-sm"
              style={{ 
                background: `${getCategoryColor(event.category)}20`,
                border: `1px solid ${getCategoryColor(event.category)}40`
              }}
            >
              {event.icon}
            </div>
            <div>
              <div className="text-sm font-mono mb-1" style={{ color: getCategoryColor(event.category) }}>
                {event.category.toUpperCase()} DIVISION
              </div>
              <h2 className="text-2xl font-headline font-bold">
                <GlitchText text={`MISSION: ${event.name.toUpperCase()}`} glitchIntensity="low" />
              </h2>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-black/50 rounded-lg p-4 border" style={{ borderColor: `${getCategoryColor(event.category)}30` }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} />
              <span className="text-sm font-mono">MISSION COUNTDOWN</span>
            </div>
            <div 
              className="text-3xl font-mono font-bold text-center tracking-wider"
              style={{ color: getCategoryColor(event.category) }}
            >
              {timeUntilStart}
            </div>
            {timeUntilStart !== 'MISSION ACTIVE' && (
              <div className="text-xs text-gray-400 text-center mt-1">
                DAYS:HOURS:MINUTES:SECONDS
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Mission Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Users className="mx-auto mb-2" size={20} style={{ color: getCategoryColor(event.category) }} />
              <div className="text-xs text-gray-400">TEAM SIZE</div>
              <div className="font-semibold">{event.teamSize}</div>
            </div>
            <div className="text-center">
              <Clock className="mx-auto mb-2" size={20} style={{ color: getCategoryColor(event.category) }} />
              <div className="text-xs text-gray-400">DURATION</div>
              <div className="font-semibold">{event.duration}</div>
            </div>
            <div className="text-center">
              <Lock className="mx-auto mb-2" size={20} style={{ color: getCategoryColor(event.category) }} />
              <div className="text-xs text-gray-400">CLEARANCE</div>
              <div className="font-semibold">{event.difficulty}</div>
            </div>
          </div>

          {/* Security Level Bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>SECURITY LEVEL</span>
              <span>{event.difficulty}</span>
            </div>
            <div className="bg-gray-800 rounded-full h-2">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${(getDifficultyLevel(event.difficulty) / 4) * 100}%`,
                  background: `linear-gradient(90deg, ${getCategoryColor(event.category)}, ${getCategoryColor(event.category)}80)`
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target size={20} style={{ color: getCategoryColor(event.category) }} />
              MISSION BRIEFING
            </h3>
            <p className="text-gray-300 leading-relaxed font-mono text-sm">
              {event.description}
            </p>
          </div>

          {/* Objectives */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target size={20} style={{ color: getCategoryColor(event.category) }} />
              PRIMARY OBJECTIVES
            </h3>
            <ul className="space-y-2">
              {event.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: getCategoryColor(event.category) }}
                  />
                  <span className="font-mono text-gray-300">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t" style={{ borderColor: `${getCategoryColor(event.category)}30` }}>
          <button
            onClick={onJoinMission}
            className="w-full py-3 px-6 rounded-lg font-semibold text-black transition-all duration-200 
                     hover:scale-105 hover:shadow-lg font-mono tracking-wider"
            style={{ 
              backgroundColor: getCategoryColor(event.category),
              boxShadow: `0 4px 20px ${getCategoryColor(event.category)}40`
            }}
          >
            [ ACCEPT MISSION ]
          </button>
          <p className="text-xs text-gray-400 text-center mt-3 font-mono">
            * MISSION ACCEPTANCE REQUIRES VALID OPERATIVE CREDENTIALS *
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionBriefingModal;