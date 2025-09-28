"use client";

import React, { useState } from 'react';

interface Team {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  rank: number;
  points: number;
  members: number;
  recentWins: string[];
  progress: number;
  badge: string;
}

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  onClick: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, isSelected, onClick }) => {
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

  // Convert hex to rgba
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
          backdrop-blur-lg rounded-xl p-6 border cursor-pointer
          transition-all duration-200 ease-out transform-gpu preserve-3d
          ${isSelected ? 'ring-2' : ''}
          ${isHovered ? 'shadow-2xl' : 'shadow-lg shadow-black/20'}
        `}
        style={{
          borderColor: isHovered ? team.color : `${hexToRgba(team.color, 0.3)}`,
          transform: isHovered
            ? `rotateX(${-mousePosition.y * 12}deg) rotateY(${mousePosition.x * 12}deg) translateZ(20px) scale3d(1.03, 1.03, 1.03)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out',
          boxShadow: isHovered 
            ? `0 25px 50px -12px ${hexToRgba(team.color, 0.4)}, 0 0 30px ${hexToRgba(team.color, 0.2)}`
            : '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        
        {/* Dynamic glow that follows cursor */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-200"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, ${hexToRgba(team.color, 0.3)} 0%, ${hexToRgba(team.color, 0.1)} 40%, transparent 70%)`
              : 'transparent',
            opacity: isHovered ? 1 : 0,
            filter: 'blur(20px)',
          }}
        />

        {/* Content with 3D transform */}
        <div 
          className="relative z-10"
          style={{
            transform: isHovered 
              ? `translateZ(15px) translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)` 
              : 'translateZ(0px)',
            transition: 'transform 0.15s ease-out'
          }}
        >
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span 
                className="text-2xl p-2 rounded-lg border"
                style={{ 
                  borderColor: team.color,
                  backgroundColor: hexToRgba(team.color, 0.1),
                  textShadow: `0 0 10px ${team.color}`
                }}
              >
                {team.badge}
              </span>
              <div>
                <h3 className="text-lg font-bold font-mono" style={{ color: team.color }}>
                  {team.name}
                </h3>
                <p className="text-sm text-gray-400 font-mono">{team.subtitle}</p>
              </div>
            </div>
            <div className="text-right">
              <div 
                className="text-2xl font-bold font-mono"
                style={{ color: team.color }}
              >
                #{team.rank}
              </div>
              <div className="text-xs text-gray-500 font-mono">RANK</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-black/50 rounded-lg border border-gray-700/50">
              <div className="text-xl font-bold font-mono text-white">
                {team.points.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 font-mono">POINTS</div>
            </div>
            <div className="text-center p-3 bg-black/50 rounded-lg border border-gray-700/50">
              <div className="text-xl font-bold font-mono text-white">
                {team.members}
              </div>
              <div className="text-xs text-gray-400 font-mono">OPERATIVES</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs font-mono text-gray-400 mb-2">
              <span>MISSION PROGRESS</span>
              <span>{team.progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 relative"
                style={{ 
                  width: `${team.progress}%`,
                  backgroundColor: team.color,
                  boxShadow: `0 0 10px ${hexToRgba(team.color, 0.5)}`
                }}
              >
                {/* Animated glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${hexToRgba(team.color, 0.8)}, transparent)`,
                    animation: 'progress-glow 2s ease-in-out infinite'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Recent Wins */}
          <div className="mb-4">
            <div className="text-xs font-mono text-gray-400 mb-2">RECENT VICTORIES</div>
            <div className="flex flex-wrap gap-1">
              {team.recentWins.slice(0, 2).map((win, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded border font-mono"
                  style={{
                    borderColor: hexToRgba(team.color, 0.5),
                    backgroundColor: hexToRgba(team.color, 0.1),
                    color: team.color
                  }}
                >
                  {win}
                </span>
              ))}
              {team.recentWins.length > 2 && (
                <span className="text-xs px-2 py-1 rounded border border-gray-600 bg-gray-800 text-gray-400 font-mono">
                  +{team.recentWins.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 font-mono italic">
            {team.description}
          </p>

          {/* Expand Indicator */}
          {isSelected && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-xs font-mono text-center" style={{ color: team.color }}>
                ▼ EXPANDED VIEW ▼
              </div>
            </div>
          )}

        </div>

        {/* Corner accent */}
        <div 
          className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-xl"
          style={{ borderColor: team.color }}
        />
        <div 
          className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-xl"
          style={{ borderColor: team.color }}
        />

      </div>

      <style jsx>{`
        @keyframes progress-glow {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default TeamCard;