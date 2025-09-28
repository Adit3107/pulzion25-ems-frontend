"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Trophy, Zap, Target, Lock, Wrench } from 'lucide-react';
import GlitchText from './GlitchText';

interface TeamData {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  specialization: string;
  description: string;
  currentMissions: number;
  completedMissions: number;
  activeMember: number;
  rank: number;
}

const teams: TeamData[] = [
  {
    id: 'CHARLIE',
    name: 'FACTION CHARLIE',
    color: '#00ff41',
    icon: <Lock size={24} />,
    specialization: 'DECRYPTION DIVISION',
    description: 'Elite code breakers and algorithm specialists tasked with infiltrating The Collective\'s encrypted systems.',
    currentMissions: 3,
    completedMissions: 12,
    activeMember: 89,
    rank: 1
  },
  {
    id: 'ECHO',
    name: 'FACTION ECHO', 
    color: '#4fe6ee',
    icon: <Zap size={24} />,
    specialization: 'RECON DIVISION',
    description: 'Intelligence gathering specialists who analyze data patterns and predict The Collective\'s movements.',
    currentMissions: 3,
    completedMissions: 10,
    activeMember: 73,
    rank: 2
  },
  {
    id: 'BRAVO',
    name: 'FACTION BRAVO',
    color: '#ff6b35',
    icon: <Wrench size={24} />,
    specialization: 'ENGINEERING DIVISION', 
    description: 'Hardware specialists and systems engineers who develop countermeasures against AI infrastructure.',
    currentMissions: 3,
    completedMissions: 9,
    activeMember: 65,
    rank: 3
  },
  {
    id: 'DELTA',
    name: 'FACTION DELTA',
    color: '#ff073a', 
    icon: <Target size={24} />,
    specialization: 'FIELD OPS DIVISION',
    description: 'Tactical operatives specializing in direct action and covert operations against Collective assets.',
    currentMissions: 3,
    completedMissions: 8,
    activeMember: 58,
    rank: 4
  }
];

interface TeamDashboardProps {
  userTeam?: string;
  className?: string;
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({ 
  userTeam = 'CHARLIE', 
  className = '' 
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string>(userTeam);
  
  const selectedTeamData = teams.find(team => team.id === selectedTeam);

  const getRankSuffix = (rank: number) => {
    const suffixes = ['st', 'nd', 'rd', 'th'];
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return suffixes[3];
    }
    return suffixes[lastDigit - 1] || suffixes[3];
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Your Faction Header */}
      <div className="text-center">
        <h3 className="text-2xl font-headline font-bold mb-2">
          <GlitchText text="YOUR FACTION" glitchIntensity="low" />
        </h3>
        <p className="text-gray-400 font-mono text-sm">
          OPERATIVE DIVISION ASSIGNMENT
        </p>
      </div>

      {/* Team Selection Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setSelectedTeam(team.id)}
            className={`px-4 py-2 rounded-full font-mono text-sm font-semibold transition-all duration-200 border-2 
                       ${selectedTeam === team.id ? 'transform scale-105' : 'hover:scale-105'}`}
            style={{
              backgroundColor: selectedTeam === team.id ? `${team.color}20` : 'transparent',
              borderColor: team.color,
              color: selectedTeam === team.id ? team.color : '#9ca3af'
            }}
          >
            {team.id}
          </button>
        ))}
      </div>

      {/* Selected Team Display */}
      {selectedTeamData && (
        <div 
          className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-xl 
                     border-2 p-6 relative overflow-hidden"
          style={{ 
            borderColor: selectedTeamData.color,
            boxShadow: `0 0 30px ${selectedTeamData.color}20`
          }}
        >
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                ${selectedTeamData.color} 20px,
                ${selectedTeamData.color} 22px
              )`
            }}
          />

          {/* Header */}
          <div className="relative flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center backdrop-blur-sm"
              style={{ 
                background: `${selectedTeamData.color}20`,
                border: `2px solid ${selectedTeamData.color}60`
              }}
            >
              <div style={{ color: selectedTeamData.color }}>
                {selectedTeamData.icon}
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-headline font-bold" style={{ color: selectedTeamData.color }}>
                {selectedTeamData.name}
              </h4>
              <div className="text-sm font-mono text-gray-400">
                {selectedTeamData.specialization}
              </div>
            </div>

            {/* Rank Badge */}
            <div className="ml-auto">
              <div 
                className="px-3 py-1 rounded-full font-mono text-sm font-bold border"
                style={{ 
                  backgroundColor: `${selectedTeamData.color}20`,
                  borderColor: selectedTeamData.color,
                  color: selectedTeamData.color
                }}
              >
                #{selectedTeamData.rank} RANK
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed">
            {selectedTeamData.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy size={20} style={{ color: selectedTeamData.color }} />
              </div>
              <div className="text-xs text-gray-400 font-mono">COMPLETED</div>
              <div 
                className="text-xl font-bold font-mono"
                style={{ color: selectedTeamData.color }}
              >
                {selectedTeamData.completedMissions}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users size={20} style={{ color: selectedTeamData.color }} />
              </div>
              <div className="text-xs text-gray-400 font-mono">ACTIVE</div>
              <div 
                className="text-xl font-bold font-mono"
                style={{ color: selectedTeamData.color }}
              >
                {selectedTeamData.activeMember}
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield size={20} style={{ color: selectedTeamData.color }} />
              </div>
              <div className="text-xs text-gray-400 font-mono">MISSIONS</div>
              <div 
                className="text-xl font-bold font-mono"
                style={{ color: selectedTeamData.color }}
              >
                {selectedTeamData.currentMissions}
              </div>
            </div>
          </div>

          {/* User Assignment Message */}
          {selectedTeam === userTeam && (
            <div 
              className="mt-6 p-4 rounded-lg border"
              style={{ 
                backgroundColor: `${selectedTeamData.color}10`,
                borderColor: `${selectedTeamData.color}40`
              }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: selectedTeamData.color }}
                />
                <span className="text-sm font-mono" style={{ color: selectedTeamData.color }}>
                  <GlitchText text="YOU ARE ASSIGNED TO THIS FACTION" glitchIntensity="low" />
                </span>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-6">
            <Link href="/events" className="block">
              <button
                className="w-full py-3 px-6 rounded-lg font-semibold font-mono tracking-wider 
                         transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: selectedTeamData.color,
                  color: '#000'
                }}
              >
                [ VIEW FACTION MISSIONS ]
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* All Factions Leaderboard */}
      <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-primary/30 p-6">
        <h4 className="text-lg font-headline font-bold mb-4 text-center">
          <GlitchText text="FACTION STANDINGS" glitchIntensity="low" />
        </h4>
        
        <div className="space-y-3">
          {teams.sort((a, b) => a.rank - b.rank).map((team, index) => (
            <div 
              key={team.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-900/50 border"
              style={{ borderColor: `${team.color}20` }}
            >
              <div className="text-2xl">
                {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎖️'}
              </div>
              
              <div className="flex-grow">
                <div className="font-semibold" style={{ color: team.color }}>
                  {team.name}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {team.completedMissions} missions completed
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-mono font-bold" style={{ color: team.color }}>
                  #{team.rank}
                </div>
                <div className="text-xs text-gray-400">
                  {team.activeMember} active
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;