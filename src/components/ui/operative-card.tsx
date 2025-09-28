"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Operative {
  name: string;
  team: string;
  points: number;
  rank: number;
  avatar: string;
  specialization: string;
}

interface OperativeCardProps {
  operative: Operative;
  index: number;
}

const OperativeCard: React.FC<OperativeCardProps> = ({ operative, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const getTeamColor = (team: string) => {
    switch (team) {
      case 'CHARLIE': return '#00ff41';
      case 'DELTA': return '#ff073a';
      case 'ECHO': return '#4fe6ee';
      case 'BRAVO': return '#ff6b35';
      default: return '#9ca3af';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🎖️';
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffd700'; // Gold
    if (rank === 2) return '#c0c0c0'; // Silver
    if (rank === 3) return '#cd7f32'; // Bronze
    return '#4fe6ee'; // Cyan
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div 
      className="perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`
          relative bg-gradient-to-br from-gray-900/95 to-black/95 
          backdrop-blur-lg rounded-xl p-4 border cursor-pointer
          transition-all duration-200 ease-out transform-gpu preserve-3d
          ${isHovered ? 'shadow-2xl' : 'shadow-lg shadow-black/20'}
        `}
        style={{
          borderColor: isHovered ? getTeamColor(operative.team) : `${hexToRgba(getTeamColor(operative.team), 0.3)}`,
          transform: isHovered
            ? `rotateX(${-mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(15px) scale3d(1.05, 1.05, 1.05)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out',
          boxShadow: isHovered 
            ? `0 20px 40px -8px ${hexToRgba(getTeamColor(operative.team), 0.3)}, 0 0 20px ${hexToRgba(getTeamColor(operative.team), 0.2)}`
            : '0 8px 20px -4px rgba(0, 0, 0, 0.5)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Dynamic glow effect */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-200"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, ${hexToRgba(getTeamColor(operative.team), 0.2)} 0%, transparent 70%)`
              : 'transparent',
            opacity: isHovered ? 1 : 0,
            filter: 'blur(15px)',
          }}
        />

        {/* Content */}
        <div 
          className="relative z-10"
          style={{
            transform: isHovered 
              ? `translateZ(10px) translateX(${mousePosition.x * 1}px) translateY(${mousePosition.y * 1}px)` 
              : 'translateZ(0px)',
            transition: 'transform 0.15s ease-out'
          }}
        >
          
          {/* Rank badge */}
          <div className="absolute -top-2 -right-2 z-20">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold"
              style={{
                backgroundColor: getRankColor(operative.rank),
                borderColor: getRankColor(operative.rank),
                color: operative.rank <= 3 ? 'black' : 'white',
                boxShadow: `0 0 10px ${getRankColor(operative.rank)}`,
              }}
            >
              #{operative.rank}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-3">
            <div 
              className="relative w-16 h-16 rounded-full overflow-hidden border-2"
              style={{ borderColor: getTeamColor(operative.team) }}
            >
              <Image
                src={operative.avatar}
                alt={operative.name}
                fill
                className="object-cover"
                style={{
                  transform: isHovered 
                    ? `scale(1.1) translateX(${mousePosition.x * -1}px) translateY(${mousePosition.y * -1}px)`
                    : 'scale(1)',
                  transition: 'transform 0.2s ease-out'
                }}
              />
              
              {/* Rank overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-2xl">{getRankIcon(operative.rank)}</span>
              </div>
            </div>
          </div>

          {/* Operative Info */}
          <div className="text-center">
            <h4 className="font-bold font-mono text-white text-sm mb-1">
              {operative.name}
            </h4>
            <p 
              className="text-xs font-mono font-medium mb-2"
              style={{ color: getTeamColor(operative.team) }}
            >
              {operative.team}
            </p>
            
            {/* Points */}
            <div className="bg-black/50 rounded-lg p-2 mb-2 border border-gray-700/50">
              <div className="text-lg font-bold font-mono text-white">
                {operative.points}
              </div>
              <div className="text-xs text-gray-400 font-mono">POINTS</div>
            </div>

            {/* Specialization */}
            <div 
              className="text-xs px-2 py-1 rounded border font-mono"
              style={{
                borderColor: hexToRgba(getTeamColor(operative.team), 0.5),
                backgroundColor: hexToRgba(getTeamColor(operative.team), 0.1),
                color: getTeamColor(operative.team)
              }}
            >
              {operative.specialization}
            </div>
          </div>

          {/* Hover effect indicators */}
          {isHovered && (
            <div className="absolute inset-0 rounded-xl border-2 pointer-events-none animate-pulse"
                 style={{ borderColor: getTeamColor(operative.team) }} />
          )}

        </div>

        {/* Corner accents */}
        <div 
          className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2"
          style={{ borderColor: getTeamColor(operative.team) }}
        />
        <div 
          className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2"
          style={{ borderColor: getTeamColor(operative.team) }}
        />

      </div>
    </div>
  );
};

export default OperativeCard;