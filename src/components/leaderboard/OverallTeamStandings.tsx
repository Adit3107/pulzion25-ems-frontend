"use client";

import { motion } from 'framer-motion';
import { Eye, Info } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface OverallTeamStandingsProps {
  selectedTeam: string;
  onTeamSelect: (teamId: string) => void;
}

const teams: Team[] = [
  { id: 'charlie', name: 'TEAM CHARLIE', score: 1250, rank: 1 },
  { id: 'delta', name: 'TEAM DELTA', score: 1100, rank: 2 },
  { id: 'echo', name: 'TEAM ECHO', score: 950, rank: 3 },
  { id: 'charlie2', name: 'TEAM CHARLIE', score: 800, rank: 4 },
];

export function OverallTeamStandings({ selectedTeam, onTeamSelect }: OverallTeamStandingsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Enhanced Cyberpunk Container - Dark Prominent Border */}
      <div className="relative border-2 border-cyan-400 shadow-2xl shadow-cyan-400/30 overflow-hidden" style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
      }}>
        {/* Enhanced Corner Accents with Glow */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
        </div>
        
        <div className="absolute top-0 right-0 w-12 h-12">
          <div className="absolute top-0 right-0 w-full h-1 bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-12 h-12">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute bottom-0 left-0 w-1 h-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-1 bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute bottom-0 right-0 w-1 h-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
        </div>

        <div className="p-6 relative z-10">
          {/* Clean Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex items-center"
          >
            <div className="w-1 h-6 bg-cyan-400 mr-3"></div>
            <h2 className="text-sm font-bold text-cyan-400 tracking-wider uppercase">
              OVERALL TEAM STANDINGS
            </h2>
            <div className="flex-1 ml-3 h-px bg-cyan-400/30"></div>
          </motion.div>

          {/* Enhanced Team Cards */}
          <div className="space-y-4">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative group cursor-pointer transition-all duration-300 border-2 border-cyan-400 bg-black/70 backdrop-blur-sm p-5 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-400/50 hover:bg-black/80 ${
                  selectedTeam === team.id 
                    ? 'border-cyan-300 shadow-xl shadow-cyan-400/60 bg-black/80 ring-1 ring-cyan-400/30' 
                    : ''
                }`}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                }}
                onClick={() => onTeamSelect(team.id)}
              >
                {/* Enhanced glow effect with pulse animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    {/* Rank Circle with hover animation */}
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                        team.rank === 1 ? 'border-cyan-400 text-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50' :
                        team.rank === 2 ? 'border-cyan-300 text-cyan-300 group-hover:shadow-lg group-hover:shadow-cyan-300/50' :
                        team.rank === 3 ? 'border-cyan-200 text-cyan-200 group-hover:shadow-lg group-hover:shadow-cyan-200/50' :
                        'border-gray-400 text-gray-300 group-hover:shadow-lg group-hover:shadow-gray-400/50'
                    }`}>
                      {team.rank}
                    </motion.div>
                    
                    {/* Team Info - Proper spacing and structure */}
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1 tracking-wide">{team.name}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-mono">GRIDLOCK SCORE</p>
                    </div>
                  </div>

                  {/* Score and Actions - Enhanced */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-cyan-400 font-mono tracking-tight">{team.score.toLocaleString()}</div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">POINTS</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg border-2 border-cyan-400/60 flex items-center justify-center text-cyan-400 hover:border-cyan-400 transition-all duration-300 bg-black/30 backdrop-blur-sm"
                        title="View Team Details"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(156, 163, 175, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg border-2 border-gray-500/60 flex items-center justify-center text-gray-300 hover:border-gray-400 transition-all duration-300 bg-black/30 backdrop-blur-sm"
                        title="Team Information"
                      >
                        <Info className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}