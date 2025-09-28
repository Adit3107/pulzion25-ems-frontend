"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/layout/header";

// Enhanced Localized Spotlight Card Component
const DarkRoomCard = ({ 
  children, 
  className, 
  glowColor = "255, 0, 65", 
  spotlightRadius = 200,
  darkOpacity = 0.995,
  revealOpacity = 0.05,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: -100, y: -100 });
  }, []);

  // Calculate border glow intensity based on mouse position
  const getBorderGlow = (side) => {
    if (!isHovered || !cardRef.current) return 0;
    const rect = cardRef.current.getBoundingClientRect();
    const { width, height } = rect;
    const { x, y } = mousePosition;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDistance = Math.min(width, height) / 2;
    
    let distance = 0;
    switch(side) {
      case 'top':
        distance = Math.abs(y);
        break;
      case 'bottom':
        distance = Math.abs(height - y);
        break;
      case 'left':
        distance = Math.abs(x);
        break;
      case 'right':
        distance = Math.abs(width - x);
        break;
      default:
        distance = Math.hypot(x - centerX, y - centerY);
    }
    
    return Math.max(0, 1 - (distance / maxDistance));
  };

  const topGlow = getBorderGlow('top');
  const bottomGlow = getBorderGlow('bottom');
  const leftGlow = getBorderGlow('left');
  const rightGlow = getBorderGlow('right');

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-pointer transform transition-all duration-300 ${className}`}
      {...props}
      style={{
        transform: isHovered ? 'scale(1.01)' : 'scale(1)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Dynamic Border Glow Effects */}
      {isHovered && (
        <>
          {/* Top Border */}
          <div 
            className="absolute top-0 left-0 right-0 transition-all duration-150"
            style={{
              height: `${Math.max(2, topGlow * 12)}px`,
              background: `linear-gradient(to bottom, rgba(${glowColor}, ${Math.min(1, topGlow * 1.2)}) 0%, rgba(${glowColor}, ${topGlow * 0.6}) 50%, transparent 100%)`,
              boxShadow: topGlow > 0.2 ? `
                0 -3px ${topGlow * 15}px rgba(${glowColor}, ${topGlow * 0.9}),
                0 -8px ${topGlow * 30}px rgba(${glowColor}, ${topGlow * 0.6}),
                0 -15px ${topGlow * 50}px rgba(${glowColor}, ${topGlow * 0.3})
              ` : 'none',
              filter: `blur(${topGlow * 0.5}px)`,
            }}
          />
          
          {/* Bottom Border */}
          <div 
            className="absolute bottom-0 left-0 right-0 transition-all duration-150"
            style={{
              height: `${Math.max(2, bottomGlow * 12)}px`,
              background: `linear-gradient(to top, rgba(${glowColor}, ${Math.min(1, bottomGlow * 1.2)}) 0%, rgba(${glowColor}, ${bottomGlow * 0.6}) 50%, transparent 100%)`,
              boxShadow: bottomGlow > 0.2 ? `
                0 3px ${bottomGlow * 15}px rgba(${glowColor}, ${bottomGlow * 0.9}),
                0 8px ${bottomGlow * 30}px rgba(${glowColor}, ${bottomGlow * 0.6}),
                0 15px ${bottomGlow * 50}px rgba(${glowColor}, ${bottomGlow * 0.3})
              ` : 'none',
              filter: `blur(${bottomGlow * 0.5}px)`,
            }}
          />
          
          {/* Left Border */}
          <div 
            className="absolute top-0 bottom-0 left-0 transition-all duration-150"
            style={{
              width: `${Math.max(2, leftGlow * 12)}px`,
              background: `linear-gradient(to right, rgba(${glowColor}, ${Math.min(1, leftGlow * 1.2)}) 0%, rgba(${glowColor}, ${leftGlow * 0.6}) 50%, transparent 100%)`,
              boxShadow: leftGlow > 0.2 ? `
                -3px 0 ${leftGlow * 15}px rgba(${glowColor}, ${leftGlow * 0.9}),
                -8px 0 ${leftGlow * 30}px rgba(${glowColor}, ${leftGlow * 0.6}),
                -15px 0 ${leftGlow * 50}px rgba(${glowColor}, ${leftGlow * 0.3})
              ` : 'none',
              filter: `blur(${leftGlow * 0.5}px)`,
            }}
          />
          
          {/* Right Border */}
          <div 
            className="absolute top-0 bottom-0 right-0 transition-all duration-150"
            style={{
              width: `${Math.max(2, rightGlow * 12)}px`,
              background: `linear-gradient(to left, rgba(${glowColor}, ${Math.min(1, rightGlow * 1.2)}) 0%, rgba(${glowColor}, ${rightGlow * 0.6}) 50%, transparent 100%)`,
              boxShadow: rightGlow > 0.2 ? `
                3px 0 ${rightGlow * 15}px rgba(${glowColor}, ${rightGlow * 0.9}),
                8px 0 ${rightGlow * 30}px rgba(${glowColor}, ${rightGlow * 0.6}),
                15px 0 ${rightGlow * 50}px rgba(${glowColor}, ${rightGlow * 0.3})
              ` : 'none',
              filter: `blur(${rightGlow * 0.5}px)`,
            }}
          />

          {/* Corner Glow Effects */}
          {topGlow > 0.4 && leftGlow > 0.4 && (
            <div 
              className="absolute top-0 left-0 transition-all duration-150"
              style={{
                width: `${Math.max(6, (topGlow + leftGlow) * 8)}px`,
                height: `${Math.max(6, (topGlow + leftGlow) * 8)}px`,
                background: `radial-gradient(circle at 0% 0%, rgba(${glowColor}, ${Math.min(0.8, (topGlow + leftGlow) * 0.6)}) 0%, transparent 70%)`,
                boxShadow: `-5px -5px ${(topGlow + leftGlow) * 20}px rgba(${glowColor}, ${(topGlow + leftGlow) * 0.4})`,
                filter: `blur(1px)`,
              }}
            />
          )}

          {topGlow > 0.4 && rightGlow > 0.4 && (
            <div 
              className="absolute top-0 right-0 transition-all duration-150"
              style={{
                width: `${Math.max(6, (topGlow + rightGlow) * 8)}px`,
                height: `${Math.max(6, (topGlow + rightGlow) * 8)}px`,
                background: `radial-gradient(circle at 100% 0%, rgba(${glowColor}, ${Math.min(0.8, (topGlow + rightGlow) * 0.6)}) 0%, transparent 70%)`,
                boxShadow: `5px -5px ${(topGlow + rightGlow) * 20}px rgba(${glowColor}, ${(topGlow + rightGlow) * 0.4})`,
                filter: `blur(1px)`,
              }}
            />
          )}

          {bottomGlow > 0.4 && leftGlow > 0.4 && (
            <div 
              className="absolute bottom-0 left-0 transition-all duration-150"
              style={{
                width: `${Math.max(6, (bottomGlow + leftGlow) * 8)}px`,
                height: `${Math.max(6, (bottomGlow + leftGlow) * 8)}px`,
                background: `radial-gradient(circle at 0% 100%, rgba(${glowColor}, ${Math.min(0.8, (bottomGlow + leftGlow) * 0.6)}) 0%, transparent 70%)`,
                boxShadow: `-5px 5px ${(bottomGlow + leftGlow) * 20}px rgba(${glowColor}, ${(bottomGlow + leftGlow) * 0.4})`,
                filter: `blur(1px)`,
              }}
            />
          )}

          {bottomGlow > 0.4 && rightGlow > 0.4 && (
            <div 
              className="absolute bottom-0 right-0 transition-all duration-150"
              style={{
                width: `${Math.max(6, (bottomGlow + rightGlow) * 8)}px`,
                height: `${Math.max(6, (bottomGlow + rightGlow) * 8)}px`,
                background: `radial-gradient(circle at 100% 100%, rgba(${glowColor}, ${Math.min(0.8, (bottomGlow + rightGlow) * 0.6)}) 0%, transparent 70%)`,
                boxShadow: `5px 5px ${(bottomGlow + rightGlow) * 20}px rgba(${glowColor}, ${(bottomGlow + rightGlow) * 0.4})`,
                filter: `blur(1px)`,
              }}
            />
          )}
        </>
      )}

      {/* Background content */}
      <div className="absolute inset-0" style={{ opacity: isHovered ? 1 : 0.15 }}>
        {children}
      </div>
      
      {/* Localized Spotlight Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 z-30 pointer-events-none transition-all duration-200"
          style={{
            background: `radial-gradient(circle ${spotlightRadius}px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0,0,0,${revealOpacity}) 0%, 
              rgba(0,0,0,${revealOpacity + 0.3}) 40%, 
              rgba(0,0,0,${darkOpacity - 0.1}) 70%,
              rgba(0,0,0,${darkOpacity}) 100%)`,
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* Neighborhood Illumination Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 z-35 pointer-events-none transition-all duration-200"
          style={{
            background: `radial-gradient(circle ${spotlightRadius * 1.8}px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(${glowColor}, 0.15) 0%, 
              rgba(${glowColor}, 0.08) 30%,
              rgba(${glowColor}, 0.04) 50%,
              transparent 70%)`,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Dark overlay for non-hovered state */}
      {!isHovered && (
        <div 
          className="absolute inset-0 z-20 transition-all duration-300"
          style={{
            background: `rgba(0, 0, 0, ${darkOpacity})`,
            backdropFilter: 'blur(1px)',
          }}
        />
      )}

      {/* Content layer */}
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

const FACTIONS = [
  {
    id: "CHARLIE",
    name: "FACTION CHARLIE", 
    role: "DECRYPTION SPECIALISTS",
    description: "Elite cryptographers who break the unbreakable",
    color: "#00ff41",
    rank: 1,
    operatives: 45,
    points: 15420
  },
  {
    id: "DELTA",
    name: "FACTION DELTA",
    role: "FIELD OPERATIVES", 
    description: "Swift infiltration specialists",
    color: "#ff073a",
    rank: 2,
    operatives: 42,
    points: 14875
  },
  {
    id: "ECHO",
    name: "FACTION ECHO",
    role: "INTELLIGENCE & RECON",
    description: "Information warfare experts",
    color: "#4fe6ee", 
    rank: 3,
    operatives: 38,
    points: 13290
  },
  {
    id: "BRAVO",
    name: "FACTION BRAVO",
    role: "TACTICAL ENGINEERS",
    description: "System architects and builders",
    color: "#ff6b35",
    rank: 4,
    operatives: 41,
    points: 12640
  }
];

// Elite Operatives Database - Top 5 from each faction
const ELITE_OPERATIVES = {
  CHARLIE: [
    { codename: "CRYPTOMANCER", score: 9847, rank: 1, status: "ACTIVE", specialty: "QUANTUM CRYPTANALYSIS", clearance: 5 },
    { codename: "CODEBREAKER_7", score: 8987, rank: 2, status: "ANALYZING", specialty: "ALGORITHMIC WARFARE", clearance: 4 },
    { codename: "CIPHER_WRAITH", score: 8654, rank: 3, status: "DEPLOYED", specialty: "STEGANOGRAPHY", clearance: 4 },
    { codename: "LOGIC_PHANTOM", score: 8432, rank: 4, status: "STANDBY", specialty: "PATTERN ANALYSIS", clearance: 3 },
    { codename: "DATA_SAGE", score: 8210, rank: 5, status: "SURVEILLANCE", specialty: "ENCRYPTION BREAKING", clearance: 3 }
  ],
  DELTA: [
    { codename: "SHADOWSTRIKE", score: 9654, rank: 1, status: "DEPLOYED", specialty: "INFILTRATION PROTOCOLS", clearance: 5 },
    { codename: "VELOCITY_7", score: 8756, rank: 2, status: "ACTIVE", specialty: "RAPID RESPONSE", clearance: 4 },
    { codename: "GHOST_RUNNER", score: 8543, rank: 3, status: "INFILTRATING", specialty: "STEALTH OPERATIONS", clearance: 4 },
    { codename: "BLITZ_OPERATIVE", score: 8321, rank: 4, status: "MISSION_PREP", specialty: "SPEED HACKING", clearance: 3 },
    { codename: "STORM_AGENT", score: 8098, rank: 5, status: "STANDBY", specialty: "TACTICAL BREACH", clearance: 3 }
  ],
  ECHO: [
    { codename: "SIGNAL_GHOST", score: 9432, rank: 1, status: "SURVEILLANCE", specialty: "DIGITAL RECONNAISSANCE", clearance: 4 },
    { codename: "RADAR_PHANTOM", score: 8665, rank: 2, status: "SCANNING", specialty: "NETWORK MAPPING", clearance: 4 },
    { codename: "INTEL_HAWK", score: 8445, rank: 3, status: "MONITORING", specialty: "DATA INTERCEPTION", clearance: 3 },
    { codename: "ECHO_VIPER", score: 8234, rank: 4, status: "ACTIVE", specialty: "SIGNAL ANALYSIS", clearance: 3 },
    { codename: "WATCH_TOWER", score: 8012, rank: 5, status: "OBSERVING", specialty: "PERIMETER CONTROL", clearance: 3 }
  ],
  BRAVO: [
    { codename: "ARCHITECT_X", score: 9201, rank: 1, status: "BUILDING", specialty: "SYSTEM MANIPULATION", clearance: 4 },
    { codename: "FORGE_MASTER", score: 8543, rank: 2, status: "CONSTRUCTING", specialty: "INFRASTRUCTURE DESIGN", clearance: 4 },
    { codename: "STEEL_FRAMEWORK", score: 8321, rank: 3, status: "OPTIMIZING", specialty: "DATABASE ARCHITECTURE", clearance: 3 },
    { codename: "TITAN_BUILDER", score: 8109, rank: 4, status: "ACTIVE", specialty: "SYSTEM FORTIFICATION", clearance: 3 },
    { codename: "CIRCUIT_WEAVER", score: 7887, rank: 5, status: "DESIGNING", specialty: "NETWORK ENGINEERING", clearance: 3 }
  ]
};

export default function AIGridLockDarkRoom() {
  const [selectedFaction, setSelectedFaction] = useState("CHARLIE");
  const [terminalActive, setTerminalActive] = useState(false);
  const [threatLevel, setThreatLevel] = useState(73.2);
  const [missionProgress, setMissionProgress] = useState(67.3);
  const [userAgent, setUserAgent] = useState({ name: "AGENT_NEXUS", team: "CHARLIE", rank: 7, score: 7543 });
  const [showThreatIntro, setShowThreatIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [roomLightsOn, setRoomLightsOn] = useState(false);

  useEffect(() => {
    // Threat intro sequence
    if (showThreatIntro) {
      const introSequence = [
        () => setIntroStep(1), 
        () => setIntroStep(2), 
        () => setIntroStep(3), 
        () => {
          setShowThreatIntro(false);
          setTerminalActive(true);
        }
      ];

      let currentStep = 0;
      const advanceIntro = () => {
        if (currentStep < introSequence.length) {
          introSequence[currentStep]();
          currentStep++;
        }
      };

      const introTimer = setInterval(advanceIntro, 2500);
      
      const handleSkip = () => {
        clearInterval(introTimer);
        setShowThreatIntro(false);
        setTerminalActive(true);
      };

      document.addEventListener('click', handleSkip);
      
      return () => {
        clearInterval(introTimer);
        document.removeEventListener('click', handleSkip);
      };
    }

    // Terminal boot sequence
    setTimeout(() => setTerminalActive(true), 1000);
    
    // Dynamic threat level
    const threatTimer = setInterval(() => {
      setThreatLevel(prev => Math.max(65, Math.min(85, prev + (Math.random() * 4 - 2))));
    }, 3000);

    // Mission progress updates
    const missionTimer = setInterval(() => {
      setMissionProgress(prev => Math.max(60, Math.min(95, prev + (Math.random() * 1 - 0.3))));
    }, 5000);

    return () => {
      clearInterval(threatTimer);
      clearInterval(missionTimer);
    };
  }, [showThreatIntro]);

  const getStatusColor = (status: string) => {
    const colors = {
      ACTIVE: 'text-green-400',
      DEPLOYED: 'text-red-400', 
      SURVEILLANCE: 'text-blue-400',
      BUILDING: 'text-orange-400',
      ANALYZING: 'text-yellow-400',
      SCANNING: 'text-cyan-400',
      CONSTRUCTING: 'text-purple-400',
      INFILTRATING: 'text-pink-400',
      MONITORING: 'text-indigo-400',
      STANDBY: 'text-gray-400',
      MISSION_PREP: 'text-amber-400',
      OBSERVING: 'text-teal-400',
      OPTIMIZING: 'text-lime-400',
      DESIGNING: 'text-violet-400'
    };
    return colors[status as keyof typeof colors] || 'text-gray-400';
  };

  const getIntroMessage = () => {
    const messages = [
      {
        title: "⚠️ POWER GRID COMPROMISED - ENTERING DARK MODE",
        message: "CRITICAL: GRIDLOCK AI has triggered emergency blackout protocol. All surveillance systems offline. Operatives must navigate using tactical scanners only. The darkness conceals threats.",
        color: "text-red-400",
        countdown: "3"
      },
      {
        title: "🔦 TACTICAL SCANNER DEPLOYMENT AUTHORIZED", 
        message: "DIRECTIVE: Use your cursor as emergency illumination device. Intel cards contain classified data visible only under direct scan. Stay vigilant - GRIDLOCK may be watching from the shadows.",
        color: "text-yellow-400",
        countdown: "2"
      },
      {
        title: "🎯 MISSION: SURVIVE THE DARK ROOM",
        message: "FINAL WARNING: The facility is now in complete darkness. Only your tactical scanner can reveal operative positions and faction intel. Navigate carefully - one wrong move could alert the AI. Begin reconnaissance.",
        color: "text-green-400",
        countdown: "1"
      }
    ];
    
    return messages[introStep - 1] || messages[0];
  };

  // Enhanced Dark Room Intro Screen
  if (showThreatIntro) {
    const currentMessage = getIntroMessage();
    
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center relative overflow-hidden">
        {/* Flickering Emergency Lights */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-50">
          <div className="h-full bg-red-400 animate-pulse" style={{
            animation: 'flicker 0.5s infinite alternate'
          }}></div>
        </div>

        {/* Power Grid Failure Effect */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,0,0,0.3) 2px, transparent 2px),
                radial-gradient(circle at 80% 70%, rgba(255,0,0,0.2) 2px, transparent 2px),
                linear-gradient(45deg, rgba(255,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '150px 150px, 200px 200px, 50px 50px',
              animation: 'powerFlicker 3s ease-in-out infinite'
            }}
          />
        </div>

        {/* Static/Noise Effect */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div 
            className="w-full h-full"
            style={{
              background: `
                repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px),
                repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px)
              `,
              animation: 'staticNoise 0.1s linear infinite'
            }}
          />
        </div>

        {/* Main Alert Content */}
        <div className="text-center z-10 max-w-4xl px-6">
          {/* Emergency Status */}
          <div className="mb-8 p-6 bg-red-900/30 border-2 border-red-500/80 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4 text-sm mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-red-300">POWER STATUS: GRID_FAILURE</span>
              </div>
              <div className="text-gray-300">|</div>
              <div className="text-yellow-300">EMERGENCY_MODE: ACTIVE</div>
              <div className="text-gray-300">|</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-orange-300">BACKUP_SYSTEMS: {3 - introStep}MIN</span>
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-6 animate-pulse">
              <span className="text-red-400 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">DARK</span>
              <span className="text-orange-500 drop-shadow-[0_0_20px_rgba(255,165,0,0.8)]">_ROOM</span>
              <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(255,255,0,0.8)]">_MODE</span>
            </h1>
          </div>

          {/* Mission Brief */}
          <div className="bg-black/70 border-2 border-orange-500/80 p-8 rounded-lg backdrop-blur-md shadow-2xl mb-6">
            <div className={`text-3xl font-bold mb-4 ${currentMessage.color} flex items-center justify-center gap-3`}>
              {currentMessage.title}
              <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            
            <div className="bg-black/80 p-6 rounded border border-red-500/30 font-mono text-left">
              <div className="text-green-400 mb-2">{'>'} EMERGENCY_PROTOCOL.log</div>
              <div className="text-red-400 text-xs mb-3">⚠️ FACILITY BLACKOUT • SCANNER REQUIRED ⚠️</div>
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                {currentMessage.message}
              </p>
              <div className="mt-4 text-yellow-400 animate-pulse">{'>'} SCANNING_DEVICE_READY...</div>
            </div>
          </div>

          {/* Scanner Tutorial */}
          <div className="bg-yellow-900/20 border border-yellow-500/50 p-6 rounded-lg mb-6">
            <div className="text-yellow-400 font-bold text-xl mb-3 flex items-center justify-center gap-2">
              🔦 TACTICAL SCANNER OPERATION
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="text-yellow-200 text-lg">
              Your cursor is now a tactical flashlight. Move it over dark areas to reveal hidden intel. 
              The room is completely dark - only your scanner can illuminate classified data.
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-8">
            <div className="text-2xl font-mono text-red-400">
              ENTERING DARK ROOM IN: <span className="text-4xl font-bold animate-pulse">{currentMessage.countdown}</span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-400 animate-pulse">
            Click anywhere to enter the dark room immediately
          </div>
        </div>

        <style jsx>{`
          @keyframes flicker {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
          }
          
          @keyframes powerFlicker {
            0%, 70% { opacity: 0.2; }
            71%, 85% { opacity: 0.05; }
            86%, 100% { opacity: 0.3; }
          }
          
          @keyframes staticNoise {
            0% { transform: translateX(0px) translateY(0px); }
            10% { transform: translateX(-1px) translateY(1px); }
            20% { transform: translateX(1px) translateY(-1px); }
            30% { transform: translateX(-1px) translateY(-1px); }
            40% { transform: translateX(1px) translateY(1px); }
            50% { transform: translateX(-1px) translateY(0px); }
            60% { transform: translateX(1px) translateY(0px); }
            70% { transform: translateX(0px) translateY(-1px); }
            80% { transform: translateX(0px) translateY(1px); }
            90% { transform: translateX(-1px) translateY(1px); }
            100% { transform: translateX(0px) translateY(0px); }
          }
        `}</style>
      </div>
    );
  }

  // Main Dark Room Interface
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <Header />
      
      {/* Dark Room Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div 
          className="w-full h-full opacity-30"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(255,0,65,0.15) 0%, transparent 50%),
              radial-gradient(circle at 85% 75%, rgba(0,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255,255,0,0.05) 0%, transparent 70%)
            `,
            animation: 'ambientPulse 8s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Emergency Lighting */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 animate-pulse z-10" />
      
      {/* Dark Room Header */}
      <div className="border-b border-red-400/20 p-6 bg-black/95 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-red-400 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">DARK</span>
                <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]">_ROOM</span>
                <span className="text-yellow-400 animate-pulse drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]"> PROTOCOL</span>
              </h1>
              <p className="text-sm text-gray-400">EMERGENCY BLACKOUT MODE - SCANNER REQUIRED</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-gray-400">POWER:</span>
                <span className="text-red-400 font-bold">CRITICAL</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">SCANNER:</span>
                <span className="text-orange-400 font-bold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-30">
        
        {/* Scanner Instructions Banner */}
        <DarkRoomCard
          className="mb-8 rounded-lg"
          glowColor="255, 165, 0"
          spotlightRadius={300}
          darkOpacity={0.98}
          revealOpacity={0.05}
        >
          <div className="bg-orange-900/40 border-2 border-orange-500/60 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="flex-1">
                <div className="text-orange-400 font-bold text-xl mb-2 flex items-center gap-2">
                  🔦 TACTICAL SCANNER OPERATION GUIDE
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-orange-200 text-base mb-3">
                  FACILITY IN COMPLETE DARKNESS • USE CURSOR AS EMERGENCY ILLUMINATION • MOVE OVER AREAS TO REVEAL CLASSIFIED DATA
                </div>
                <div className="text-yellow-300 text-sm font-mono bg-black/50 px-3 py-2 rounded">
                  STATUS: ROOM BLACKOUT ACTIVE • SCANNER OPERATIONAL • INTEL HIDDEN UNTIL SCANNED
                </div>
              </div>
              <div className="text-right">
                <div className="text-orange-400 font-mono text-lg font-bold animate-pulse">
                  SCAN MODE
                </div>
                <div className="text-orange-300 text-xs">ILLUMINATE TO REVEAL</div>
              </div>
            </div>
          </div>
        </DarkRoomCard>

        {/* Mission Status - Hidden in Darkness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <DarkRoomCard
            className="rounded-lg"
            glowColor="0, 255, 65"
            spotlightRadius={250}
            darkOpacity={0.99}
            revealOpacity={0.05}
          >
            <div className="bg-green-900/40 border-2 border-green-400/50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-400 text-lg font-bold flex items-center gap-2">
                  🔒 GRIDLOCK NEUTRALIZATION STATUS
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                </h3>
                <div className="text-sm text-gray-300 bg-black/50 px-3 py-1 rounded">
                  PROGRESS: {missionProgress.toFixed(1)}%
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-600/50 shadow-inner">
                  <div 
                    className="h-full transition-all duration-1000 rounded-full relative"
                    style={{
                      width: `${missionProgress}%`,
                      background: `linear-gradient(90deg, #00ff41 0%, #4fe6ee 50%, #ff073a 100%)`,
                      boxShadow: '0 0 15px rgba(0,255,65,0.6)',
                      animation: 'progressPulse 2s ease-in-out infinite alternate'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-900/20 border border-green-400/30 rounded text-xs">
                <div className="text-green-400 font-bold mb-1">📊 MISSION INTEL</div>
                <div className="text-gray-200">
                  Scanner reveals: Network security protocols are {missionProgress > 80 ? 'SECURED' : 'COMPROMISED'}. 
                  Continue scanning for more intelligence.
                </div>
              </div>
            </div>
          </DarkRoomCard>

          <DarkRoomCard
            className="rounded-lg"
            glowColor="79, 230, 238"
            spotlightRadius={250}
            darkOpacity={0.99}
            revealOpacity={0.05}
          >
            <div className="bg-cyan-900/40 border-2 border-cyan-400/50 p-6 rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cyan-400 text-lg font-bold flex items-center gap-2">
                  👤 YOUR OPERATIVE PROFILE
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </h3>
                <div className="text-sm text-gray-300 bg-black/50 px-3 py-1 rounded">
                  SECURITY: LEVEL_4
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border border-gray-600/30 rounded transition-all duration-300 hover:border-cyan-400/50">
                  <span className="text-gray-300">Agent ID:</span>
                  <span className="text-white font-bold font-mono">{userAgent.name}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 border border-gray-600/30 rounded transition-all duration-300 hover:border-cyan-400/50">
                  <span className="text-gray-300">Faction:</span>
                  <span 
                    className="font-bold font-mono"
                    style={{ color: FACTIONS.find(f => f.id === userAgent.team)?.color }}
                  >
                    {userAgent.team}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 border border-gray-600/30 rounded transition-all duration-300 hover:border-cyan-400/50">
                  <span className="text-gray-300">Ranking:</span>
                  <span className="text-yellow-400 font-bold">#{userAgent.rank}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 border border-gray-600/30 rounded transition-all duration-300 hover:border-cyan-400/50">
                  <span className="text-gray-300">Scanner Points:</span>
                  <span className="text-green-400 font-bold">{userAgent.score.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 border border-cyan-400/30 rounded text-xs transition-all duration-300 hover:border-cyan-400/50">
                <div className="text-cyan-400 font-bold mb-1">🔦 SCANNER STATUS</div>
                <div className="text-gray-200">
                  Your tactical scanner is operational. Use it to navigate the dark room and uncover faction intelligence.
                </div>
              </div>
            </div>
          </DarkRoomCard>
        </div>

        {/* Faction Intelligence Cards - All Hidden in Darkness */}
        <div className="mb-10">
          <div className="text-green-400 text-2xl mb-6 border-b border-green-400/20 pb-3 flex items-center gap-3">
            <span>&gt; FACTION_INTELLIGENCE_VAULT.db</span>
            <div className="text-sm text-gray-400 border border-gray-600/30 px-3 py-1 rounded transition-all duration-300 hover:border-green-400/50">
              SCAN TO REVEAL • DARKNESS ACTIVE
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {FACTIONS.map((faction, index) => (
              <DarkRoomCard
                key={faction.id}
                className={`rounded-lg cursor-pointer transition-all duration-500 ${
                  selectedFaction === faction.id ? 'ring-2 ring-current' : ''
                }`}
                glowColor={faction.color.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}
                spotlightRadius={200}
                darkOpacity={0.992}
                revealOpacity={0.02}
                onClick={() => setSelectedFaction(faction.id)}
              >
                {/* Faction Card Content */}
                <div className="relative p-6 h-full">
                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Faction Rank Badge */}
                    <div className="absolute -top-3 -right-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-black text-sm font-bold shadow-lg animate-pulse ring-4 ring-black/30"
                        style={{ 
                          backgroundColor: faction.color,
                          boxShadow: `0 0 20px ${faction.color}70`
                        }}
                      >
                        #{faction.rank}
                      </div>
                    </div>

                    {/* Classification Header */}
                    <div className="text-center mb-4">
                      <div className="text-xs text-gray-400 border border-gray-600/30 px-2 py-1 rounded mb-3">
                        CLASSIFIED INTEL • SCAN REQUIRED
                      </div>
                    </div>

                    {/* Faction Details */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2" style={{ color: faction.color }}>
                        {faction.name}
                      </h3>
                      <div className="text-xs text-gray-300 mb-3 uppercase tracking-wider border border-gray-600/30 px-2 py-1 rounded">
                        {faction.role}
                      </div>
                      <p className="text-gray-200 text-sm mb-4 h-12 leading-tight italic">"{faction.description}"</p>
                      
                      {/* Mission Stats */}
                      <div className="space-y-2 text-xs">
                        <div className="border border-gray-600/30 p-3 rounded transition-all duration-300 hover:border-current/50">
                          <div className="text-gray-300 uppercase mb-1">Active Operatives</div>
                          <div className="text-white font-bold text-lg">{faction.operatives}</div>
                        </div>
                        <div className="border border-gray-600/30 p-3 rounded transition-all duration-300 hover:border-current/50">
                          <div className="text-gray-300 uppercase mb-1">Mission Points</div>
                          <div className="text-yellow-400 font-bold text-lg">{faction.points.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Scan Status */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-xs text-center text-gray-400 bg-black/60 px-2 py-1 rounded">
                        {selectedFaction === faction.id ? '🔦 SCANNED • DATA REVEALED' : '🌑 HIDDEN • SCAN TO REVEAL'}
                      </div>
                    </div>
                  </div>

                  {/* Selection Effect */}
                  {selectedFaction === faction.id && (
                    <div className="absolute inset-0 rounded-lg pointer-events-none">
                      <div 
                        className="absolute inset-0 rounded-lg animate-pulse"
                        style={{ 
                          background: `linear-gradient(45deg, ${faction.color}30, transparent, ${faction.color}30)`,
                          animation: 'pulse 2s infinite'
                        }}
                      />
                    </div>
                  )}
                </div>
              </DarkRoomCard>
            ))}
          </div>
        </div>

        {/* Elite Operatives in the Dark */}
        <div>
          <div className="text-green-400 text-2xl mb-6 border-b border-green-400/20 pb-3 flex items-center justify-between">
            <span>&gt; ELITE_OPERATIVES_{selectedFaction}.vault</span>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>FACTION: {selectedFaction}</span>
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: FACTIONS.find(f => f.id === selectedFaction)?.color }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {ELITE_OPERATIVES[selectedFaction as keyof typeof ELITE_OPERATIVES]?.map((operative, index) => {
              const faction = FACTIONS.find(f => f.id === selectedFaction);
              const isUserAgent = operative.codename === userAgent.name && selectedFaction === userAgent.team;
              
              return (
                <DarkRoomCard
                  key={operative.codename}
                  className={`rounded-lg group transition-all duration-300 ${
                    isUserAgent ? 'ring-2 ring-cyan-400 ring-opacity-60' : ''
                  }`}
                  glowColor={
                    isUserAgent 
                      ? "79, 230, 238" 
                      : faction?.color.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')
                  }
                  spotlightRadius={180}
                  darkOpacity={0.995}
                  revealOpacity={0.02}
                >
                  {/* User Badge */}
                  {isUserAgent && (
                    <div className="absolute -top-2 -right-2 z-50">
                      <div className="bg-cyan-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        YOU
                      </div>
                    </div>
                  )}

                  {/* Operative Content */}
                  <div className="relative z-10 p-4">
                    {/* Rank & Status */}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-white font-bold">#{operative.rank}</span>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          operative.status === 'ACTIVE' ? 'bg-green-400' :
                          operative.status === 'DEPLOYED' ? 'bg-red-400' :
                          operative.status === 'SURVEILLANCE' ? 'bg-blue-400' : 'bg-gray-400'
                        }`} />
                      </div>
                      <h4 
                        className={`font-bold text-lg mb-1 ${isUserAgent ? 'text-cyan-300' : ''}`}
                        style={{ color: isUserAgent ? '#4fe6ee' : faction?.color }}
                      >
                        {operative.codename}
                      </h4>
                      <div className={`text-xs ${getStatusColor(operative.status)}`}>
                        {operative.status.replace('_', ' ')}
                      </div>
                    </div>

                    {/* Operative Stats */}
                    <div className="space-y-2 text-xs">
                      <div className="border border-gray-600/30 p-2 rounded transition-all duration-300 hover:border-current/50">
                        <div className="text-gray-300 uppercase mb-1">Score</div>
                        <div className="text-red-400 font-bold">{operative.score.toLocaleString()}</div>
                      </div>
                      
                      <div className="border border-gray-600/30 p-2 rounded transition-all duration-300 hover:border-current/50">
                        <div className="text-gray-300 uppercase mb-1">Clearance</div>
                        <div className="text-yellow-400 font-bold">LEVEL_{operative.clearance}</div>
                      </div>
                      
                      <div className="border border-gray-600/30 p-2 rounded transition-all duration-300 hover:border-current/50">
                        <div className="text-gray-300 uppercase mb-1">Specialty</div>
                        <div className="text-cyan-400 text-xs leading-tight">{operative.specialty}</div>
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="mt-3">
                      <div className="w-full border border-gray-600/30 rounded-full h-2 overflow-hidden transition-all duration-300 hover:border-current/50">
                        <div 
                          className="h-full transition-all duration-1000 rounded-full"
                          style={{
                            width: `${Math.min(100, (operative.score / 10000) * 100)}%`,
                            background: `linear-gradient(90deg, ${faction?.color} 0%, ${faction?.color}80 100%)`,
                            boxShadow: `0 0 10px ${faction?.color}40`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </DarkRoomCard>
              );
            })}
          </div>

          {/* Dark Room Navigation */}
          <div className="mt-8 text-center">
            <DarkRoomCard
              className="inline-block rounded-lg"
              glowColor="0, 255, 65"
              spotlightRadius={200}
              darkOpacity={0.98}
              revealOpacity={0.05}
            >
              <button className="bg-gray-800/50 hover:bg-gray-700/50 border border-green-400/30 hover:border-green-400/60 px-6 py-3 rounded-lg text-green-400 hover:text-green-300 transition-all duration-300 font-mono text-sm uppercase tracking-wider">
                &gt; SCAN_FULL_OPERATIVE_DATABASE_{selectedFaction}
              </button>
            </DarkRoomCard>
          </div>
        </div>

        {/* Dark Room Terminal Footer */}
        <div className="border-t border-green-400/20 pt-6 mt-12 text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <div>&gt; DARK_ROOM_PROTOCOL active | Scanner operational | {ELITE_OPERATIVES[selectedFaction as keyof typeof ELITE_OPERATIVES]?.length || 0} operatives detected</div>
            <div className="flex items-center gap-4">
              <div>BLACKOUT: {Math.floor(Date.now() / 1000 / 60)} mins</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>EMERGENCY_LIGHTING_ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ambientPulse {
          0% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
          100% { opacity: 0.1; transform: scale(1); }
        }
        
        @keyframes progressPulse {
          0% { 
            box-shadow: 0 0 10px rgba(0,255,65,0.5); 
          }
          100% { 
            box-shadow: 0 0 20px rgba(0,255,65,0.8), 0 0 30px rgba(79,230,238,0.4); 
          }
        }
      `}</style>
    </div>
  );
}
