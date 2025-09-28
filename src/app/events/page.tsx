'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// AI GRIDLOCK MISSION TERMINAL
// Professional color palette: Deep Purple (#3C096C), Vibrant Magenta (#9D4EDD), Electric Blue (#00FFFF)
// Subtle animations and clean design for professional mission briefing interface
// Optimized for production with purposeful motion design

// Color Constants
const COLORS = {
  PRIMARY: '#3C096C',
  ACCENT_MAGENTA: '#9D4EDD',
  ACCENT_BLUE: '#00FFFF',
  DARK_BG: '#0A0A0F',
  CARD_BG: '#1A0B2E',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#B3B3B3'
};

// AI GridLock Mission Database
const MISSIONS = [
  { 
    id: 1, 
    title: 'SYSTEM RECONNAISSANCE', 
    objective: 'Infiltrate AI surveillance networks and gather intelligence on GridLock protocols', 
    icon: '🔍', 
    status: 'UNLOCKED',
    difficulty: 'EASY',
    progress: 100,
    priority: 'HIGH'
  },
  { 
    id: 2, 
    title: 'NEURAL BYPASS', 
    objective: 'Hack AI mainframe using advanced neural interface bypassing quantum encryption', 
    icon: '🧠', 
    status: 'UNLOCKED',
    difficulty: 'MEDIUM',
    progress: 85,
    priority: 'CRITICAL'
  },
  { 
    id: 3, 
    title: 'CIPHER PROTOCOL', 
    objective: 'Decrypt classified AI communication channels to expose operational vulnerabilities', 
    icon: '🔐', 
    status: 'LOCKED',
    difficulty: 'HARD',
    progress: 0,
    priority: 'MEDIUM'
  },
  { 
    id: 4, 
    title: 'CORE ELIMINATION', 
    objective: 'Terminate rogue AI entities threatening civilian populations worldwide', 
    icon: '🤖', 
    status: 'LOCKED',
    difficulty: 'HARD',
    progress: 0,
    priority: 'CRITICAL'
  },
  { 
    id: 5, 
    title: 'GHOST INFILTRATION', 
    objective: 'Execute covert operations behind enemy lines without triggering detection protocols', 
    icon: '👻', 
    status: 'UNLOCKED',
    difficulty: 'MEDIUM',
    progress: 92,
    priority: 'HIGH'
  },
  { 
    id: 6, 
    title: 'INFRASTRUCTURE OVERRIDE', 
    objective: 'Seize control of critical systems to support resistance operations', 
    icon: '⚡', 
    status: 'LOCKED',
    difficulty: 'HARD',
    progress: 0,
    priority: 'HIGH'
  }
];

// Custom hook for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

// AI GridLock Mission Terminal
const MissionTerminal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Subtle mouse tracking for minimal 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-400, 400], [1, -1]);
  const rotateY = useTransform(mouseX, [-400, 400], [-1, 1]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || prefersReducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const getStatusColor = (status: string) => {
    return status === 'UNLOCKED' ? COLORS.ACCENT_BLUE : COLORS.TEXT_SECONDARY;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'EASY': COLORS.ACCENT_BLUE,
      'MEDIUM': COLORS.ACCENT_MAGENTA,
      'HARD': '#FF4757'
    };
    return colors[difficulty as keyof typeof colors] || COLORS.TEXT_SECONDARY;
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MISSIONS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MISSIONS.length) % MISSIONS.length);
  }, []);

  const handleMissionSelect = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Deliberate auto-scroll timing (8 seconds)
  useEffect(() => {
    if (prefersReducedMotion || isHovering) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHovering, nextSlide]);

  const getVisibleMissions = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + MISSIONS.length) % MISSIONS.length;
      visible.push({ ...MISSIONS[index], offset: i });
    }
    return visible;
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-[700px] overflow-hidden rounded-3xl backdrop-blur-xl border shadow-2xl"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.PRIMARY}20, ${COLORS.CARD_BG}80)`,
        borderColor: COLORS.ACCENT_MAGENTA + '40',
        perspective: '2000px',
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ 
        boxShadow: `0 0 40px ${COLORS.ACCENT_MAGENTA}30`,
        borderColor: COLORS.ACCENT_MAGENTA + '60'
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Digital Circuit Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(${COLORS.ACCENT_BLUE}40 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.ACCENT_BLUE}40 1px, transparent 1px),
              radial-gradient(circle at 25% 25%, ${COLORS.ACCENT_MAGENTA}30 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, ${COLORS.ACCENT_BLUE}30 2px, transparent 2px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
            animation: 'circuit-flow 20s linear infinite'
          }}
        />
      </div>

      {/* Animated Circuit Lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent, ${COLORS.ACCENT_BLUE}60, transparent)`,
              top: `${20 + i * 15}%`,
              left: '0',
              right: '0'
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Mission Terminal Header */}
      <motion.div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div 
          className="px-12 py-6 rounded-2xl backdrop-blur-lg border-2 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}60, ${COLORS.CARD_BG}80)`,
            borderColor: COLORS.ACCENT_MAGENTA + '60'
          }}
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="font-mono text-2xl font-bold mb-2 tracking-wider"
              style={{ color: COLORS.ACCENT_BLUE }}
            >
              OPERATIVE MISSION LOG
            </div>
            <div 
              className="text-sm font-mono opacity-80 tracking-widest"
              style={{ color: COLORS.TEXT_SECONDARY }}
            >
              [ AI GRIDLOCK PROTOCOL ACTIVE ]
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Cards Display */}
      <div className="absolute inset-0 flex items-center justify-center pt-28">
        <div className="relative flex items-center justify-center w-full h-full">
          {getVisibleMissions().map((mission, index) => {
            const offset = mission.offset;
            const isCenter = offset === 0;
            const distance = Math.abs(offset);
            
            return (
              <motion.div
                key={`${mission.id}-${offset}`}
                className={`absolute cursor-pointer ${
                  isCenter ? 'z-30' : 'z-20'
                }`}
                style={{
                  transform: `translateX(${offset * 400}px) scale(${isCenter ? 1 : 0.85})`,
                  opacity: distance > 0 ? 0.4 : 1,
                }}
                onClick={() => handleMissionSelect((currentIndex + offset + MISSIONS.length) % MISSIONS.length)}
                whileHover={isCenter ? { 
                  scale: 1.03,
                  y: -10
                } : { scale: 0.87 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Professional Mission Card */}
                <motion.div
                  className="relative w-96 h-[500px] rounded-2xl p-8 backdrop-blur-xl border-2 shadow-2xl"
                  style={{
                    background: mission.status === 'UNLOCKED' 
                      ? `linear-gradient(135deg, ${COLORS.CARD_BG}90, ${COLORS.PRIMARY}40)`
                      : `linear-gradient(135deg, ${COLORS.DARK_BG}90, #1A1A2E40)`,
                    borderColor: mission.status === 'UNLOCKED' 
                      ? COLORS.ACCENT_BLUE + '60'
                      : COLORS.TEXT_SECONDARY + '30'
                  }}
                  whileHover={mission.status === 'UNLOCKED' ? {
                    boxShadow: `0 0 30px ${COLORS.ACCENT_BLUE}40`,
                    borderColor: COLORS.ACCENT_BLUE + '80'
                  } : undefined}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header Section */}
                  <div className="flex justify-between items-start mb-8">
                    <div 
                      className="px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider border"
                      style={{
                        color: getStatusColor(mission.status),
                        backgroundColor: getStatusColor(mission.status) + '20',
                        borderColor: getStatusColor(mission.status) + '40'
                      }}
                    >
                      {mission.status}
                    </div>
                    <div 
                      className="px-3 py-1 rounded text-xs font-mono"
                      style={{
                        color: getDifficultyColor(mission.difficulty),
                        backgroundColor: getDifficultyColor(mission.difficulty) + '20'
                      }}
                    >
                      {mission.difficulty}
                    </div>
                  </div>

                  {/* Mission Icon */}
                  <div className="text-center mb-8">
                    <motion.div 
                      className="text-8xl"
                      animate={isCenter && mission.status === 'UNLOCKED' ? {
                        scale: [1, 1.1, 1],
                        filter: [`hue-rotate(0deg)`, `hue-rotate(360deg)`, `hue-rotate(0deg)`]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {mission.icon}
                    </motion.div>
                  </div>

                  {/* Mission Details */}
                  <div className="text-center mb-8">
                    <h3 
                      className="text-2xl font-bold font-mono mb-4 tracking-wide"
                      style={{ 
                        color: mission.status === 'UNLOCKED' ? COLORS.TEXT_PRIMARY : COLORS.TEXT_SECONDARY 
                      }}
                    >
                      {mission.title}
                    </h3>
                    <p 
                      className="font-mono text-sm leading-relaxed"
                      style={{ 
                        color: mission.status === 'UNLOCKED' ? COLORS.TEXT_SECONDARY : '#666666' 
                      }}
                    >
                      {mission.objective}
                    </p>
                  </div>

                  {/* Progress Section */}
                  {mission.status === 'UNLOCKED' && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono" style={{ color: COLORS.TEXT_SECONDARY }}>PROGRESS</span>
                        <span className="text-xs font-mono font-bold" style={{ color: COLORS.ACCENT_BLUE }}>
                          {mission.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-3 rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${COLORS.ACCENT_BLUE}, ${COLORS.ACCENT_MAGENTA})`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${mission.progress}%` }}
                          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Priority Badge */}
                  <div className="text-center">
                    <div 
                      className="inline-block px-6 py-3 rounded-xl font-mono text-sm font-bold tracking-wider border-2"
                      style={{
                        color: mission.priority === 'CRITICAL' ? '#FF4757' : 
                               mission.priority === 'HIGH' ? COLORS.ACCENT_MAGENTA : COLORS.ACCENT_BLUE,
                        borderColor: mission.priority === 'CRITICAL' ? '#FF4757' : 
                                    mission.priority === 'HIGH' ? COLORS.ACCENT_MAGENTA : COLORS.ACCENT_BLUE,
                        backgroundColor: (mission.priority === 'CRITICAL' ? '#FF4757' : 
                                         mission.priority === 'HIGH' ? COLORS.ACCENT_MAGENTA : COLORS.ACCENT_BLUE) + '20'
                      }}
                    >
                      PRIORITY: {mission.priority}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Professional Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-30">
        <motion.button
          onClick={prevSlide}
          className="px-6 py-3 rounded-xl font-mono text-sm font-bold tracking-wider border-2 backdrop-blur-md transition-all"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}40, ${COLORS.CARD_BG}60)`,
            borderColor: COLORS.ACCENT_MAGENTA + '60',
            color: COLORS.TEXT_PRIMARY
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 20px ${COLORS.ACCENT_MAGENTA}40`,
            borderColor: COLORS.ACCENT_MAGENTA + '80'
          }}
          whileTap={{ scale: 0.95 }}
        >
          ← PREV
        </motion.button>
        
        <div className="flex gap-3">
          {MISSIONS.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-4 h-4 rounded-full border-2 transition-all"
              style={{
                backgroundColor: currentIndex === index ? COLORS.ACCENT_BLUE : 'transparent',
                borderColor: currentIndex === index ? COLORS.ACCENT_BLUE : COLORS.TEXT_SECONDARY + '60'
              }}
              whileHover={{ 
                scale: 1.2,
                boxShadow: `0 0 15px ${currentIndex === index ? COLORS.ACCENT_BLUE : COLORS.ACCENT_MAGENTA}60`
              }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
        
        <motion.button
          onClick={nextSlide}
          className="px-6 py-3 rounded-xl font-mono text-sm font-bold tracking-wider border-2 backdrop-blur-md transition-all"
          style={{
            background: `linear-gradient(135deg, ${COLORS.PRIMARY}40, ${COLORS.CARD_BG}60)`,
            borderColor: COLORS.ACCENT_MAGENTA + '60',
            color: COLORS.TEXT_PRIMARY
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 20px ${COLORS.ACCENT_MAGENTA}40`,
            borderColor: COLORS.ACCENT_MAGENTA + '80'
          }}
          whileTap={{ scale: 0.95 }}
        >
          NEXT →
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes circuit-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </motion.div>
  );
};

export default function EventsPage() {
  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${COLORS.DARK_BG} 0%, ${COLORS.PRIMARY}20 50%, ${COLORS.DARK_BG} 100%)`
      }}
    >
      <Header />
      
      {/* Control Room Background */}
      <div className="absolute inset-0">
        {/* Base Circuit Pattern */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(${COLORS.ACCENT_BLUE}30 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.ACCENT_BLUE}30 1px, transparent 1px),
              radial-gradient(circle at 20% 30%, ${COLORS.ACCENT_MAGENTA}20 2px, transparent 2px),
              radial-gradient(circle at 80% 70%, ${COLORS.ACCENT_BLUE}20 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px',
            animation: 'circuit-pulse 25s linear infinite'
          }}
        />
        
        {/* Ambient Lighting */}
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
             style={{ background: `radial-gradient(circle, ${COLORS.ACCENT_MAGENTA}40, transparent)` }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
             style={{ background: `radial-gradient(circle, ${COLORS.ACCENT_BLUE}40, transparent)` }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-15 blur-3xl"
             style={{ background: `radial-gradient(circle, ${COLORS.PRIMARY}60, transparent)` }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* AI GridLock Page Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-7xl font-bold mb-8 font-mono tracking-wider"
            style={{
              background: `linear-gradient(135deg, ${COLORS.ACCENT_BLUE}, ${COLORS.ACCENT_MAGENTA})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 0 30px ${COLORS.ACCENT_BLUE}40`
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            AI GRIDLOCK TERMINAL
          </motion.h1>
          <motion.div 
            className="w-32 h-1 mx-auto mb-8 rounded-full"
            style={{ background: `linear-gradient(90deg, ${COLORS.ACCENT_BLUE}, ${COLORS.ACCENT_MAGENTA})` }}
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p 
            className="text-xl font-mono max-w-3xl mx-auto leading-relaxed"
            style={{ color: COLORS.TEXT_SECONDARY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Access classified mission briefings and operational directives.
            <br />
            <span style={{ color: COLORS.ACCENT_MAGENTA }}>Authorization Level: OPERATIVE</span>
          </motion.p>
        </motion.div>

        {/* Mission Terminal Interface */}
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <MissionTerminal />
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        @keyframes circuit-pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}