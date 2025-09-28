"use client";

import React, { useState, useRef } from 'react';
import { Lock, Users, Clock, Target, Zap } from 'lucide-react';
import GlitchText from './GlitchText';

interface EventCardProps {
  event: {
    name: string;
    category: 'Decryption' | 'Field Ops' | 'Recon' | 'Engineering';
    description: string;
    startTime: Date;
    duration: string;
    teamSize: string;
    difficulty: 'Classified' | 'Restricted' | 'Confidential' | 'Top Secret';
    icon: string;
    isActive?: boolean;
    isCompleted?: boolean;
  };
  onCardClick: () => void;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onCardClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Decryption': return '#00ff41'; // CHARLIE green
      case 'Field Ops': return '#ff073a'; // DELTA red
      case 'Recon': return '#4fe6ee'; // ECHO cyan
      case 'Engineering': return '#ff6b35'; // BRAVO orange
      default: return '#9ca3af';
    }
  };

  const getDifficultyBars = (difficulty: string) => {
    switch (difficulty) {
      case 'Classified': return 1;
      case 'Restricted': return 2;
      case 'Confidential': return 3;
      case 'Top Secret': return 4;
      default: return 1;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Decryption': return <Lock size={16} />;
      case 'Field Ops': return <Target size={16} />;
      case 'Recon': return <Zap size={16} />;
      case 'Engineering': return <Users size={16} />;
      default: return <Lock size={16} />;
    }
  };

  const formatTimeUntil = (startTime: Date) => {
    const now = new Date();
    const timeDiff = startTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) return 'ACTIVE';
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const categoryColor = getCategoryColor(event.category);
  const timeUntil = formatTimeUntil(event.startTime);

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-pointer transition-all duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onClick={onCardClick}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y * 8}deg) rotateY(${mousePosition.x * 8}deg) translateZ(20px) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Card Container */}
      <div
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-xl 
                   border-2 p-6 h-full overflow-hidden relative"
        style={{
          borderColor: isHovered ? categoryColor : `${categoryColor}30`,
          boxShadow: isHovered
            ? `0 20px 40px -8px ${categoryColor}30, 0 0 20px ${categoryColor}20, inset 0 1px 0 ${categoryColor}20`
            : '0 8px 20px -4px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Animated Background Pattern */}
        <div
          className={`absolute inset-0 opacity-5 transition-opacity duration-300 ${
            isHovered ? 'opacity-10' : 'opacity-5'
          }`}
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              ${categoryColor} 10px,
              ${categoryColor} 12px
            )`
          }}
        />

        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          {event.isCompleted ? (
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          ) : event.isActive ? (
            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
          ) : (
            <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: categoryColor }} />
          )}
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl backdrop-blur-sm"
            style={{
              background: `${categoryColor}20`,
              border: `1px solid ${categoryColor}40`,
            }}
          >
            {event.icon}
          </div>
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: categoryColor }}>
              {event.category.toUpperCase()}
            </div>
            <h3 className="font-headline font-bold text-lg leading-tight">
              {isHovered ? (
                <GlitchText text={event.name.toUpperCase()} glitchIntensity="low" />
              ) : (
                event.name.toUpperCase()
              )}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-3 font-mono">
          {event.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs">
            <Clock size={14} style={{ color: categoryColor }} />
            <span className="text-gray-400">{timeUntil}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Users size={14} style={{ color: categoryColor }} />
            <span className="text-gray-400">{event.teamSize}</span>
          </div>
        </div>

        {/* Security Clearance */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 font-mono">CLEARANCE</span>
            <span className="text-xs font-mono" style={{ color: categoryColor }}>
              {event.difficulty}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  backgroundColor:
                    i < getDifficultyBars(event.difficulty)
                      ? categoryColor
                      : 'rgba(255, 255, 255, 0.1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 
                     flex items-center justify-center gap-2 font-mono tracking-wider
                     ${isHovered ? 'transform scale-105' : ''}`}
          style={{
            backgroundColor: `${categoryColor}20`,
            border: `1px solid ${categoryColor}60`,
            color: categoryColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = categoryColor;
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${categoryColor}20`;
            e.currentTarget.style.color = categoryColor;
          }}
        >
          {getCategoryIcon(event.category)}
          {event.isCompleted ? 'MISSION COMPLETE' : event.isActive ? 'JOIN MISSION' : 'ACCEPT MISSION'}
        </button>

        {/* Hover Overlay Effect */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-xl opacity-5 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, ${categoryColor} 0%, transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EventCard;