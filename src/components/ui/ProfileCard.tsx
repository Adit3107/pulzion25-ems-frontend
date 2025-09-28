"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  title: string;
  handle?: string;
  status?: string;
  contactText?: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status = "Available",
  contactText = "Contact",
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate normalized position (-1 to 1) for precise control
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;
    
    setMousePosition({
      x: normalizedX,
      y: normalizedY
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`
          relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 
          backdrop-blur-lg rounded-2xl p-6 border border-slate-700/30
          transition-all duration-200 ease-out cursor-pointer
          transform-gpu preserve-3d
          ${isHovered 
            ? 'shadow-2xl shadow-cyan-500/30' 
            : 'shadow-lg shadow-black/20'
          }
        `}

        style={{
          // Enhanced 3D transform calculations
          transform: isHovered
            ? `rotateX(${-mousePosition.y * 18}deg) rotateY(${mousePosition.x * 18}deg) translateZ(30px) scale3d(1.05, 1.05, 1.05)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, box-shadow 0.2s ease-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
      
      {/* Dynamic glow that follows cursor position */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-200"
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(79, 230, 238, 0.6) 0%, rgba(138, 43, 226, 0.4) 30%, rgba(0, 191, 255, 0.3) 60%, transparent 80%)`
            : 'transparent',
          opacity: isHovered ? 1 : 0,
          transform: 'translateZ(5px)',
          filter: 'blur(25px)',
        }}
      />
      
      {/* Enhanced surface highlight following cursor */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-150"
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${(mousePosition.x + 1) * 50}% ${(mousePosition.y + 1) * 50}%, rgba(255, 255, 255, 0.4) 0%, rgba(79, 230, 238, 0.3) 25%, rgba(138, 43, 226, 0.2) 50%, transparent 70%)`
            : 'transparent',
          opacity: isHovered ? 1 : 0,
          transform: 'translateZ(8px)',
        }}
      />

      {/* Multi-layer gradient overlay with parallax */}
      <div className={`
        absolute inset-0 rounded-2xl transition-all duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        background: isHovered 
          ? 'linear-gradient(135deg, rgba(79, 230, 238, 0.2) 0%, rgba(138, 43, 226, 0.25) 50%, rgba(0, 191, 255, 0.2) 100%)'
          : 'transparent',
        transform: `translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`,
      }} />
      
      {/* Content with enhanced 3D transform and parallax */}
      <div 
        className="relative z-10"
        style={{
          transform: isHovered 
            ? `translateZ(40px) translateX(${mousePosition.x * 3}px) translateY(${mousePosition.y * 3}px)` 
            : 'translateZ(0px)',
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Avatar with individual parallax */}
        <div className="flex justify-center mb-4">
          <div 
            className="relative"
            style={{
              transform: isHovered 
                ? `translateZ(20px) translateX(${mousePosition.x * -2}px) translateY(${mousePosition.y * -2}px)` 
                : 'translateZ(0px)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-600/50">
              <Image
                src={avatarUrl}
                alt={name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                priority
                style={{
                  transform: isHovered 
                    ? `scale(1.05) translateX(${mousePosition.x * -1}px) translateY(${mousePosition.y * -1}px)`
                    : 'scale(1)',
                  transition: 'transform 0.25s ease-out'
                }}
              />
            </div>
            {/* Status indicator */}
            {status && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* User info with parallax */}
        {showUserInfo && (
          <div 
            className="text-center mb-4"
            style={{
              transform: isHovered 
                ? `translateZ(15px) translateX(${mousePosition.x * 1}px) translateY(${mousePosition.y * 1}px)` 
                : 'translateZ(0px)',
              transition: 'transform 0.18s ease-out'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
            <p className="text-slate-400 text-sm mb-1">{title}</p>
            {handle && (
              <p className="text-slate-500 text-xs">@{handle}</p>
            )}
          </div>
        )}

        {/* Contact button with enhanced parallax */}
        {onContactClick && (
          <div
            style={{
              transform: isHovered 
                ? `translateZ(25px) translateX(${mousePosition.x * -1.5}px) translateY(${mousePosition.y * -1.5}px)` 
                : 'translateZ(0px)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <button
              onClick={onContactClick}
              className={`
                w-full py-2 px-4 rounded-lg text-sm font-medium
                bg-gradient-to-r from-blue-600 to-purple-600
                hover:from-blue-500 hover:to-purple-500
                text-white transition-all duration-200
                transform hover:scale-105 active:scale-95
              `}
              style={{
                boxShadow: isHovered 
                  ? `0 10px 25px -5px rgba(79, 230, 238, 0.3), 0 4px 10px -2px rgba(138, 43, 226, 0.2)`
                  : '0 2px 4px -1px rgba(0, 0, 0, 0.3)',
                transition: 'box-shadow 0.2s ease-out, transform 0.2s ease-out'
              }}
            >
              {contactText}
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProfileCard;