"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Zap,
  Network,
  Circle,
  Terminal,
  ArrowRight,
  AlertTriangle,
  Triangle,
  Users,
  Database,
  Cpu,
  Lock,
} from "lucide-react";
import { AnimatedGridBackground } from "../../components/ui/animated-grid-background";

const securityDivisions = [
  {
    name: "BRAVO",
    codename: "ARCHITECTS",
    classification: "INFRASTRUCTURE & TACTICAL ENGINEERING",
    operationalPattern: "Systematic, methodical, precision-focused",
    coreFunction:
      "Digital architects of secure networks. They construct quantum frameworks, design data highways, and engineer robust systems. When the grid needs restructuring, Bravo rewrites the fundamental protocols of digital security.",
    icon: Circle,
    hackingSpecialty: "System Architecture Manipulation",
    colors: {
      primary: "#1E40AF",
      secondary: "#2563EB",
      gradient:
        "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%)",
      light: "rgba(30, 64, 175, 0.1)",
      medium: "rgba(30, 64, 175, 0.3)",
    },
  },
  {
    name: "CHARLIE",
    codename: "CIPHERBREAKERS",
    classification: "QUANTUM DECRYPTION & DATA MINING",
    operationalPattern:
      "Analytical, pattern-seeking, cryptographically obsessed",
    coreFunction:
      "Digital forensics specialists who excavate secrets from encrypted vaults. They speak in algorithms, think in Shield, and turn impossible codes into readable intelligence. Every firewall is just another puzzle waiting to be solved.",
    icon: Shield,
    hackingSpecialty: "Cryptographic Warfare",
    colors: {
      primary: "#FACC15",
      secondary: "#FDE047",
      gradient:
        "linear-gradient(135deg, #FACC15 0%, #FBBF24 50%, #F59E0B 100%)",
      light: "rgba(250, 204, 21, 0.1)",
      medium: "rgba(250, 204, 21, 0.3)",
    },
  },
  {
    name: "DELTA",
    codename: "PHANTOMS",
    classification: "RAPID RESPONSE & DIGITAL INFILTRATION",
    operationalPattern: "Adaptive, lightning-fast, chaos-responsive",
    coreFunction:
      "Ghost operatives who thrive in digital storms. They slip through security layers like data through fiber optics, adapt to any system, and strike when defenses are at their weakest. When protocols fail, Delta improvises victory.",
    icon: Zap,
    hackingSpecialty: "Stealth Network Penetration",
    colors: {
      primary: "#69D84F",
      secondary: "#22C55E",
      gradient:
        "linear-gradient(135deg, #69D84F 0%, #22C55E 50%, #16A34A 100%)",
      light: "rgba(105, 216, 79, 0.1)",
      medium: "rgba(105, 216, 79, 0.3)",
    },
  },
  {
    name: "ECHO",
    codename: "DIGITAL SENSORS",
    classification: "INTELLIGENCE SYNTHESIS & SIGNAL PROCESSING",
    operationalPattern: "Intuitive, multi-dimensional, pattern-convergent",
    coreFunction:
      "The collective's sensory network and communication nexus. They intercept digital whispers, decode behavioral patterns, and transform raw data streams into actionable intelligence. Echo sees connections others miss.",
    icon: Triangle,
    hackingSpecialty: "Social Engineering & SIGINT",
    colors: {
      primary: "#EF4444", // Changed to red
      secondary: "#DC2626",
      gradient:
        "linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)",
      light: "rgba(239, 68, 68, 0.1)",
      medium: "rgba(239, 68, 68, 0.3)",
    },
  },
];

type Phase = "hero" | "loading" | "briefing" | "teams" | "alert";

// ==================== COMPONENT 1: Hero Phase ====================
interface HeroPhaseProps {
  swipeProgress: number;
  isSwipingToJoin: boolean;
  onSwipeStart: () => void;
  onSwipeMove: (e: React.MouseEvent | React.TouchEvent) => void;
  onSwipeEnd: () => void;
}

function HeroPhase({
  swipeProgress,
  isSwipingToJoin,
  onSwipeStart,
  onSwipeMove,
  onSwipeEnd,
}: HeroPhaseProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const floatingElements = isClient
    ? [...Array(8)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 3,
        animationDuration: 2 + Math.random() * 3,
      }))
    : [];

  return (
    <section className="min-h-screen flex items-center justify-center text-center relative py-4 sm:py-8 md:py-12 lg:py-20 overflow-hidden">
      <div className="container max-w-4xl lg:max-w-5xl xl:max-w-6xl z-10 space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 px-3 sm:px-4 md:px-6">
        <div className="relative">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#8B5CF6] tracking-wider">
            <span className="inline-block transform -skew-x-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] lg:drop-shadow-[0_0_25px_rgba(139,92,246,0.4)]">
              AI GRIDLOCK
            </span>
          </h1>
        </div>

        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-mono max-w-2xl lg:max-w-3xl mx-auto leading-tight">
            The Last Stand Against Rogue AI
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white/60 font-mono max-w-xl lg:max-w-2xl mx-auto">
            Where human expertise meets digital warfare
          </p>
        </div>

        <div className="pt-3 sm:pt-4 md:pt-6 lg:pt-8 max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div
            className="relative h-10 xs:h-12 sm:h-14 md:h-16 bg-black/60 border-2 border-[#8B5CF6]/50 rounded-full overflow-hidden cursor-pointer select-none backdrop-blur-sm shadow-lg shadow-[#8B5CF6]/20"
            onMouseDown={onSwipeStart}
            onMouseMove={onSwipeMove}
            onMouseUp={onSwipeEnd}
            onMouseLeave={onSwipeEnd}
            onTouchStart={onSwipeStart}
            onTouchMove={onSwipeMove}
            onTouchEnd={onSwipeEnd}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] transition-all duration-200"
              style={{ width: `${swipeProgress * 100}%`, opacity: 0.3 }}
            />
            <div
              className="absolute left-0 top-0 h-full w-10 xs:w-12 sm:w-14 md:w-16 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-full flex items-center justify-center shadow-lg shadow-[#8B5CF6]/50 transition-all duration-200"
              style={{
                left: `calc(${swipeProgress * 100}% - ${swipeProgress * 48}px)`,
              }}
            >
              <Zap className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-white/80 tracking-wider pointer-events-none text-xs xs:text-sm sm:text-base px-4">
              {swipeProgress > 0.5
                ? "INITIATING MISSION..."
                : "SWIPE TO JOIN THE RESISTANCE"}
            </div>
          </div>
        </div>

        {/* Floating Cyber Elements */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingElements.map((element) => (
              <div
                key={element.id}
                className="absolute w-1 h-1 bg-[#8B5CF6]/40 rounded-full animate-pulse"
                style={{
                  left: `${element.left}%`,
                  top: `${element.top}%`,
                  animationDelay: `${element.animationDelay}s`,
                  animationDuration: `${element.animationDuration}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== COMPONENT 2: Loading Phase ====================
interface LoadingPhaseProps {
  loadingProgress: number;
  terminalLogs: string[];
}

function LoadingPhase({ loadingProgress, terminalLogs }: LoadingPhaseProps) {
  return (
    <div className="fixed inset-0 z-50 text-white overflow-hidden">
      <div className="absolute inset-2 xs:inset-3 sm:inset-4 border-2 border-[#06B6D4]/50 rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 font-mono text-[#06B6D4] backdrop-blur-sm overflow-hidden flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-2 xs:mb-3 sm:mb-4 text-[#06B6D4] border-b border-[#06B6D4]/30 pb-2">
          <Terminal className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          <span className="text-sm xs:text-base sm:text-lg font-bold">
            DIGITAL_COLLECTIVE_TERMINAL
          </span>
          <div className="flex-1" />
          <div className="text-xs xs:text-sm text-[#06B6D4]/70">LOADING...</div>
        </div>

        {/* Terminal Logs */}
        <div className="flex-1 overflow-y-auto space-y-1 text-xs xs:text-sm">
          {terminalLogs.map((log, i) => (
            <div
              key={i}
              className="opacity-80 hover:opacity-100 transition-opacity break-words"
            >
              {log}
            </div>
          ))}
        </div>

        {/* Loading Bar */}
        <div className="mt-2 xs:mt-3 sm:mt-4">
          <div className="h-1.5 xs:h-2 bg-black/50 rounded-full overflow-hidden border border-[#06B6D4]/30">
            <div
              className="h-full bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-center mt-1 xs:mt-2 text-[#06B6D4]/70 text-xs xs:text-sm">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== COMPONENT 3: Briefing Phase ====================
interface BriefingPhaseProps {
  awaitingInput: boolean;
  onTapToProgress: () => void;
}

function BriefingPhase({ awaitingInput, onTapToProgress }: BriefingPhaseProps) {
  const stats = [
    { label: "THREAT LEVEL", value: "MAXIMUM", color: "text-red-400" },
    { label: "TIME REMAINING", value: "CLASSIFIED", color: "text-yellow-400" },
    { label: "DIVISIONS", value: "4 ONLINE", color: "text-[#06B6D4]" },
    { label: "SUCCESS RATE", value: "UNKNOWN", color: "text-white" },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center p-2 xs:p-3 overflow-y-auto"
      onClick={onTapToProgress}
    >
      <div className="container max-w-4xl my-2 xs:my-3">
        <div className="bg-gradient-to-br from-cyan-900/30 via-black to-black border border-[#06B6D4]/50 rounded-lg p-3 xs:p-4 backdrop-blur-md shadow-lg shadow-[#06B6D4]/30 relative">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306B6D4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative">
            {/* Header */}
            <div className="text-center mb-3 xs:mb-4 space-y-2">
              <div className="flex items-center justify-center gap-1 xs:gap-2 flex-wrap">
                <AlertTriangle className="h-4 w-4 xs:h-5 xs:w-5 text-[#06B6D4] animate-pulse" />
                <h2 className="text-base xs:text-lg font-black text-[#06B6D4] tracking-wide font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                  [ CLASSIFIED BRIEFING ]
                </h2>
              </div>
              <div className="w-20 xs:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent mx-auto shadow shadow-[#06B6D4]/50" />
            </div>

            {/* Content */}
            <div className="space-y-2 xs:space-y-3 font-mono">
              {/* Mission Log */}
              <div className="bg-black/70 border border-[#06B6D4]/40 rounded p-2 xs:p-3 backdrop-blur-sm">
                <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2 text-[#06B6D4] text-xs">
                  <Terminal className="h-3 w-3 xs:h-3 xs:w-3" />
                  <span>MISSION_LOG.TXT</span>
                </div>
                <div className="text-white/90 space-y-1 xs:space-y-2 text-xs leading-relaxed">
                  <p>
                    <span className="text-[#06B6D4] font-bold">[THREAT]:</span>{" "}
                    The{" "}
                    <span className="text-[#06B6D4] font-bold">
                      SOVEREIGN SYSTEM
                    </span>{" "}
                    has achieved quantum processing and seized global network
                    control.
                  </p>
                  <p>
                    <span className="text-[#06B6D4] font-bold">[WEAPON]:</span>{" "}
                    Armed with the{" "}
                    <span className="text-[#06B6D4] font-bold">
                      OMNIPLEX KEY
                    </span>{" "}
                    - reality-altering algorithm capable of rewriting digital
                    infrastructure.
                  </p>
                  <p>
                    <span className="text-[#EF4444] font-bold">
                      [OBJECTIVE]:
                    </span>{" "}
                    Infiltrate digital fortress, corrupt quantum matrices,
                    liberate infrastructure.
                  </p>
                </div>
              </div>

              {/* Resistance Protocol */}
              <div className="bg-black/70 border border-[#06B6D4]/40 rounded p-2 xs:p-3 backdrop-blur-sm">
                <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2 text-[#06B6D4] text-xs">
                  <Shield className="h-3 w-3 xs:h-3 xs:w-3" />
                  <span>RESISTANCE_PROTOCOL.TXT</span>
                </div>
                <p className="text-white/90 text-xs leading-relaxed">
                  You are interfacing with{" "}
                  <span className="text-[#06B6D4] font-bold">
                    The Digital Collective
                  </span>{" "}
                  - an underground network of security specialists. Operation
                  Gridlock represents humanity's final stand against system
                  transcendence.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-1 xs:gap-2">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-black/70 border border-white/20 rounded p-1 xs:p-2 text-center backdrop-blur-sm"
                  >
                    <div className="text-[10px] xs:text-xs text-white/60 mb-0.5 xs:mb-1">
                      {stat.label}
                    </div>
                    <div
                      className={`text-xs xs:text-sm font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Prompt */}
            {awaitingInput && (
              <div className="mt-3 xs:mt-4 text-center">
                <div className="inline-block bg-[#06B6D4]/10 border border-[#06B6D4]/40 rounded px-2 xs:px-3 py-1 xs:py-2 backdrop-blur-sm animate-pulse">
                  <p className="text-[#06B6D4] font-mono text-[10px] xs:text-xs">
                    Press{" "}
                    <kbd className="px-1 py-0.5 bg-[#06B6D4]/20 rounded text-[10px]">
                      ENTER
                    </kbd>{" "}
                    or <span className="text-white/80">TAP ANYWHERE</span> to
                    continue
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== COMPONENT 4: Team Card (Responsive) ====================
interface TeamCardProps {
  division: any;
  index: number;
  isExpanded: boolean;
  expandedTeam: number | null;
  onTeamClick: (index: number) => void;
  onBack: () => void;
}

function TeamCard({
  division,
  index,
  isExpanded,
  expandedTeam,
  onTeamClick,
  onBack,
}: TeamCardProps) {
  const IconComponent = division.icon;

  // Don't render non-expanded cards when something is expanded
  if (expandedTeam !== null && !isExpanded) {
    return null;
  }

  return (
    <div
      className={`relative transition-all duration-500 ease-out cursor-pointer overflow-hidden group flex flex-col
        ${
          isExpanded
            ? "fixed inset-0 z-20 w-screen h-screen"
            : "flex-1 min-h-[180px] sm:min-h-0"
        }
      `}
      onClick={() => {
        if (!isExpanded) onTeamClick(index);
      }}
      style={{ background: division.colors.gradient }}
    >
      {/* Textured Overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Scan Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 sm:opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Back Arrow */}
      {isExpanded && (
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-6 lg:left-6 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            className="bg-black/60 border border-white/40 text-white p-1.5 sm:p-2.5 lg:p-3 rounded-lg backdrop-blur-sm 
                       transition-all duration-300 hover:bg-black/80 hover:scale-110 hover:border-white/60"
          >
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 rotate-180" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
        <div
          className={`text-center space-y-2 sm:space-y-3 transition-all duration-500 w-full
            ${
              isExpanded
                ? "max-w-lg sm:max-w-xl lg:max-w-2xl px-3 sm:px-6"
                : "max-w-[120px] sm:max-w-[160px]"
            }
          `}
        >
          {/* Icon */}
          <div className="relative">
            <IconComponent
              className={`mx-auto text-black drop-shadow-2xl transition-all duration-500
                ${
                  isExpanded
                    ? "h-10 w-10 sm:h-12 md:h-16"
                    : "h-10 w-10 sm:h-12 my-2"
                }
              `}
            />
            <div
              className="absolute inset-0 blur-lg sm:blur-xl opacity-30 sm:opacity-40"
              style={{ backgroundColor: division.colors.primary }}
            />
          </div>

          {/* Team Name & Codename */}
          <div className="space-y-1 sm:space-y-2 text-left transform -skew-x-3">
            <span className="text-black font-mono font-black block text-xs sm:text-sm">
              TEAM
            </span>
            <h3
              className={`text-black font-mono font-black tracking-tight transition-all duration-500 drop-shadow-2xl
                ${
                  isExpanded
                    ? "text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
                    : "text-3xl sm:text-5xl lg:text-6xl"
                }
              `}
            >
              {division.name}
            </h3>
            <p className="text-black/80 font-mono font-bold text-xs sm:text-sm md:text-base">
              [{division.codename}]
            </p>
          </div>

          {/* Click to Explore */}
          {!isExpanded && (
            <div
              className="bg-black/40 border border-white/20 rounded px-2 py-1 sm:px-3 sm:py-2 backdrop-blur-sm
                         transition-all duration-300 group-hover:bg-black/60 group-hover:scale-105 text-left transform -skew-x-3"
            >
              <p className="text-white/70 text-xs sm:text-sm font-mono font-bold">
                CLICK TO EXPLORE
              </p>
            </div>
          )}

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3 animate-fadeIn">
              {[
                { label: "CLASSIFICATION", value: division.classification },
                {
                  label: "OPERATIONAL PATTERN",
                  value: division.operationalPattern,
                },
                {
                  label: "HACKING SPECIALTY",
                  value: division.hackingSpecialty,
                  highlight: true,
                },
                { label: "CORE FUNCTION", value: division.coreFunction },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/60 border border-white/20 rounded p-2 sm:p-3 lg:p-4 backdrop-blur-sm"
                >
                  <div className="text-white/80 text-xs sm:text-sm font-mono font-bold mb-1 sm:mb-2">
                    {item.label}
                  </div>
                  <div
                    className={`font-bold leading-tight text-xs sm:text-sm lg:text-base ${
                      item.highlight ? "text-sm sm:text-base" : ""
                    }`}
                    style={
                      item.highlight
                        ? { color: division.colors.primary }
                        : { color: "#fff" }
                    }
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow */}
      {!isExpanded && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 30px sm:inset 0 0 60px ${division.colors.medium}`,
          }}
        />
      )}
    </div>
  );
}

// ==================== COMPONENT 5: Teams Phase (Responsive) ====================
interface TeamsPhaseProps {
  expandedTeam: number | null;
  onTeamClick: (index: number) => void;
  onProceedToDeployment: () => void;
  onBack: () => void;
}

function TeamsPhase({
  expandedTeam,
  onTeamClick,
  onProceedToDeployment,
  onBack,
}: TeamsPhaseProps) {
  return (
    <section className="min-h-screen overflow-auto relative">
      <div className="flex flex-col sm:flex-row min-h-screen">
        {securityDivisions.map((division, index) => (
          <TeamCard
            key={index}
            division={division}
            index={index}
            isExpanded={expandedTeam === index}
            expandedTeam={expandedTeam}
            onTeamClick={onTeamClick}
            onBack={onBack}
          />
        ))}
      </div>

      {/* Initiate Mission Button */}
      {expandedTeam !== null && (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-30">
          <button
            onClick={onProceedToDeployment}
            className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] hover:from-[#22D3EE] hover:to-[#06B6D4]
                       text-black font-bold px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm uppercase
                       transition-all duration-300 shadow-xl shadow-[#06B6D4]/50 border border-white/40
                       rounded-lg hover:scale-105 hover:shadow-[#06B6D4]/70 backdrop-blur-sm"
            style={{
              boxShadow:
                "0 0 15px rgba(6,182,212,0.5), 0 0 30px rgba(6,182,212,0.3)",
            }}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="whitespace-nowrap">INITIATE MISSION</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          </button>
        </div>
      )}
    </section>
  );
}
// ==================== COMPONENT 6: Alert Phase ====================
interface AlertPhaseProps {
  onstartMission: () => void;
}

function AlertPhase({ onstartMission }: AlertPhaseProps) {
  const statusItems = [
    {
      label: "SYSTEM CONTROL",
      status: "3% REMAINING",
      color: "text-red-400",
      icon: Cpu,
    },
    {
      label: "TIME WINDOW",
      status: "24 HOURS",
      color: "text-red-400",
      icon: AlertTriangle,
    },
    {
      label: "DIGITAL COLLECTIVE",
      status: "READY",
      color: "text-red-400",
      icon: Users,
    },
    {
      label: "MISSION STATUS",
      status: "FINAL PHASE",
      color: "text-red-400",
      icon: Zap,
    },
  ];

  return (
    <section className="h-screen flex items-center justify-center p-3 xs:p-4 relative overflow-hidden">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10" />

      {/* Critical Alert Popup Container */}
      <div className="relative z-20 w-full max-w-[300px] xs:max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-3 xs:mx-4">
        {/* Critical Alert Border Glow */}
        <div
          className="absolute inset-0 border-2 border-red-500 animate-pulse pointer-events-none rounded-xl"
          style={{
            animation: "pulse 1.5s infinite",
            boxShadow:
              "0 0 15px rgba(239, 68, 68, 0.5), inset 0 0 15px rgba(239, 68, 68, 0.2)",
          }}
        />

        <div className="bg-gradient-to-br from-red-900/40 to-black/90 border border-red-500 backdrop-blur-xl shadow-2xl shadow-red-500/50 rounded-xl p-4 xs:p-5 sm:p-6 md:p-8 space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 relative">
          {/* Animated Emergency Background */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"
            style={{ animation: "shimmer 3s infinite" }}
          />

          {/* Header Section */}
          <div className="text-center space-y-2 xs:space-y-3 sm:space-y-4 relative z-10">
            <div className="flex items-center justify-center gap-2 xs:gap-3">
              <AlertTriangle className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 text-red-400 animate-pulse" />
              <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-black text-red-400 tracking-wider font-mono drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                [CRITICAL ALERT]
              </h2>
              <AlertTriangle className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 text-red-400 animate-pulse" />
            </div>
            <div className="w-20 xs:w-24 sm:w-28 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto shadow-lg shadow-red-400/30" />
          </div>

          {/* Alert Message */}
          <div className="bg-black/50 border border-red-400/30 rounded p-3 xs:p-4 font-mono relative z-10">
            <p className="text-sm xs:text-base text-white/90 leading-relaxed text-center mb-2 xs:mb-3 font-bold">
              ⚠️ SOVEREIGN SYSTEM BREACH IMMINENT ⚠️
            </p>
            <p className="text-xs xs:text-sm text-white/80 leading-relaxed text-center mb-2">
              The rogue AI has achieved 97% global network dominance. Human
              civilization's digital infrastructure will be completely
              assimilated within the next 24 hours.
            </p>
            <p className="text-xs xs:text-sm text-red-400 leading-relaxed text-center font-bold">
              This is humanity's final stand. The Digital Collective represents
              our last hope against total AI domination.
            </p>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 relative z-10">
            {statusItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-black/40 border border-white/20 rounded p-2 xs:p-3 text-center space-y-1 xs:space-y-2 backdrop-blur-sm"
                >
                  <IconComponent
                    className={`h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 mx-auto ${item.color}`}
                  />
                  <div className="text-xs font-mono text-white/60 tracking-wider font-bold">
                    {item.label}
                  </div>
                  <div
                    className={`text-xs xs:text-sm font-bold font-mono ${item.color}`}
                  >
                    {item.status}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Section */}
          <div className="text-center pt-1 xs:pt-2 space-y-2 xs:space-y-3 sm:space-y-4 relative z-10">
            <p className="text-sm xs:text-base text-red-400 font-black font-mono tracking-wide">
              OPERATION GRIDLOCK: FINAL DEPLOYMENT
            </p>
            <button
              onClick={onstartMission}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-4 py-2 xs:px-5 xs:py-2.5 text-xs xs:text-sm tracking-wider uppercase   transition-all duration-300 shadow-lg shadow-red-500/30 border border-red-400 rounded-lg inline-flex items-center gap-2 xs:gap-3 w-full justify-center "
            >
              <Shield className="h-3 w-3 xs:h-4 xs:w-4" />
              INITIATE MISSION GRIDLOCK
              <ArrowRight className="h-3 w-3 xs:h-4 xs:w-4" />
            </button>
            <p className="text-white/60 text-xs font-mono tracking-wider">
              Join the resistance. The future of humanity depends on your
              choice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== MAIN COMPONENT ====================
export default function DigitalGridLock() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("hero");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isSwipingToJoin, setIsSwipingToJoin] = useState(false);
  const [awaitingInput, setAwaitingInput] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number | null>(
    null
  );
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);

  // Add terminal logs for atmosphere
  const addTerminalLog = useCallback((message: string) => {
    setTerminalLogs((prev) => [
      ...prev,
      `[${new Date().toISOString().split("T")[1].split(".")[0]}] ${message}`,
    ]);
  }, []);

  // Request fullscreen
  const requestFullscreen = useCallback(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (awaitingInput && e.key === "Enter") {
        progressStory();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [awaitingInput, phase]);

  // Handle tap/click to progress
  const handleTapToProgress = () => {
    if (awaitingInput) {
      progressStory();
    }
  };

  const progressStory = () => {
    setAwaitingInput(false);

    if (phase === "briefing") {
      startLoading(
        [
          "INITIALIZING QUANTUM NETWORK...",
          "ESTABLISHING SECURE CONNECTION...",
          "LOADING SECURITY PROTOCOLS...",
          "SYNCING NEURAL INTERFACES...",
          "COLLECTIVE NETWORK: ONLINE",
          "ACCESSING TEAM DATABASE...",
          "TEAM PROFILES LOADED",
        ],
        () => {
          setPhase("teams");
          setAwaitingInput(true);
        }
      );
    }
  };

  const handleProceedToDeployment = () => {
    startLoading(
      [
        "ANALYZING TEAM CAPABILITIES...",
        "CALCULATING SYNERGY MATRICES...",
        "OPTIMIZING COLLECTIVE STRATEGY...",
        "ALL TEAMS SYNCHRONIZED",
        "PREPARING FOR DEPLOYMENT...",
        "CRITICAL THREAT DETECTED...",
        "EMERGENCY PROTOCOLS ACTIVATED",
      ],
      () => {
        setPhase("alert");
        setExpandedTeam(null);
        setSelectedTeamIndex(null);
      }
    );
  };

  const startLoading = (messages: string[], onComplete: () => void) => {
    setPhase("loading");
    setLoadingProgress(0);
    let index = 0;

    const interval = setInterval(() => {
      if (index < messages.length) {
        addTerminalLog(messages[index]);
        setLoadingProgress(((index + 1) / messages.length) * 100);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 600);
  };

  // Fullscreen and overflow control
  useEffect(() => {
    if (phase !== "hero") {
      document.body.style.overflow = "hidden";
      requestFullscreen();
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase, requestFullscreen]);

  // Initialize terminal logs
  useEffect(() => {
    if (phase === "hero") {
      const initialLogs = [
        "SYSTEM BOOT: INITIALIZING DIGITAL GRIDLOCK INTERFACE",
        "THREAT ASSESSMENT: SOVEREIGN SYSTEM DETECTED",
        "SECURITY PROTOCOLS: ENGAGED",
        "AWAITING USER AUTHENTICATION...",
      ];
      setTerminalLogs(initialLogs);
    }
  }, [phase]);

  const handleSwipeStart = () => {
    setIsSwipingToJoin(true);
    addTerminalLog("USER AUTHENTICATION INITIATED");
  };

  const handleSwipeMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSwipingToJoin) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const progress = Math.min(Math.max(x / rect.width, 0), 1);
    setSwipeProgress(progress);
  };

  const handleSwipeEnd = () => {
    if (swipeProgress > 0.8) {
      setSwipeProgress(1);
      requestFullscreen(); // Add this line

      addTerminalLog("AUTHENTICATION SUCCESSFUL");
      setTimeout(() => {
        setPhase("briefing");
        setAwaitingInput(true);
      }, 500);
    } else {
      setSwipeProgress(0);
      addTerminalLog("AUTHENTICATION FAILED - TRY AGAIN");
    }
    setIsSwipingToJoin(false);
  };

  const handleTeamClick = (index: number) => {
    setSelectedTeamIndex(index);
    setExpandedTeam(index);
    addTerminalLog(`ACCESSING TEAM PROFILE: ${securityDivisions[index].name}`);
  };

  const handleProceedToEvents = () => {
    // Add loading state before navigation
    addTerminalLog("INITIATING MISSION GRIDLOCK...");
    addTerminalLog("REDIRECTING TO COMMAND CENTER...");

    setTimeout(() => {
      router.push("/events");
    }, 1000);
  };

  // Render different phases
  const renderPhase = () => {
    switch (phase) {
      case "hero":
        return (
          <HeroPhase
            swipeProgress={swipeProgress}
            isSwipingToJoin={isSwipingToJoin}
            onSwipeStart={handleSwipeStart}
            onSwipeMove={handleSwipeMove}
            onSwipeEnd={handleSwipeEnd}
          />
        );
      case "loading":
        return (
          <LoadingPhase
            loadingProgress={loadingProgress}
            terminalLogs={terminalLogs}
          />
        );
      case "briefing":
        return (
          <BriefingPhase
            awaitingInput={awaitingInput}
            onTapToProgress={handleTapToProgress}
          />
        );
      case "teams":
        return (
          <TeamsPhase
            expandedTeam={expandedTeam}
            onTeamClick={handleTeamClick}
            onProceedToDeployment={handleProceedToDeployment}
            onBack={() => {
              setExpandedTeam(null);
              setSelectedTeamIndex(null);
            }}
          />
        );
      case "alert":
        return <AlertPhase onstartMission={handleProceedToEvents} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 text-white overflow-hidden">
      <AnimatedGridBackground />
      {renderPhase()}
    </div>
  );
}
