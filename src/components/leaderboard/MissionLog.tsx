"use client";

import { motion } from 'framer-motion';
import { Terminal, Clock } from 'lucide-react';

interface MissionEntry {
  id: string;
  timestamp: string;
  team: string;
  action: string;
  points: number;
  category: 'success' | 'breach' | 'intel' | 'bonus';
}

const missionEntries: MissionEntry[] = [
  {
    id: '1',
    timestamp: '[17:34]',
    team: 'TEAM CHARLIE',
    action: 'Cracked Quantum Usantum Firwall',
    points: 500,
    category: 'success'
  },
  {
    id: '2',
    timestamp: '[17:34]',
    team: 'TEAM CHARLIE',
    action: 'Cracked Data Up F151J/001',
    points: 500,
    category: 'success'
  },
  {
    id: '3',
    timestamp: '[17:34]',
    team: 'TEAM CHARLIE',
    action: 'Secured Struwall',
    points: 300,
    category: 'intel'
  },
  {
    id: '4',
    timestamp: '[17:34]',
    team: 'TEAM CHARLIE',
    action: 'Cracked Quantum Quantum Firwall',
    points: 300,
    category: 'success'
  },
  {
    id: '5',
    timestamp: '[17:34]',
    team: 'TEAM CHARLIE',
    action: 'Cracked Secured Quantum Firwall // Unwall',
    points: 300,
    category: 'success'
  },
  {
    id: '6',
    timestamp: '[17:34]',
    team: 'TEAM CHARLIE',
    action: 'Cracked Secured Quan Flatat UpLink',
    points: 700,
    category: 'bonus'
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'success':
      return 'text-green-400';
    case 'breach':
      return 'text-red-400';
    case 'intel':
      return 'text-cyan-400';
    case 'bonus':
      return 'text-yellow-400';
    default:
      return 'text-foreground';
  }
};

const getCategoryPrefix = (category: string) => {
  switch (category) {
    case 'success':
      return '[SUCCESS]';
    case 'breach':
      return '[BREACH]';
    case 'intel':
      return '[INTEL]';
    case 'bonus':
      return '[BONUS]';
    default:
      return '[SYSTEM]';
  }
};

export function MissionLog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative"
    >
      {/* Enhanced Cyberpunk border container */}
      <div className="relative bg-background/60 backdrop-blur-sm border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20">
        {/* Enhanced corner decorations */}
        <div className="absolute top-0 left-0 w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-cyan-300"></div>
        </div>
        
        {/* Top-right corner */}
        <div className="absolute top-0 right-0 w-24 h-24">
          <div className="absolute top-0 right-0 w-full h-3 bg-gradient-to-l from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-b from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-cyan-300"></div>
        </div>
        
        {/* Bottom-left corner */}
        <div className="absolute bottom-0 left-0 w-24 h-24">
          <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute bottom-0 left-0 w-3 h-full bg-gradient-to-t from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-cyan-300"></div>
        </div>
        
        {/* Bottom-right corner */}
        <div className="absolute bottom-0 right-0 w-24 h-24">
          <div className="absolute bottom-0 right-0 w-full h-3 bg-gradient-to-l from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute bottom-0 right-0 w-3 h-full bg-gradient-to-t from-cyan-400 via-cyan-300 to-transparent shadow-lg shadow-cyan-400/50"></div>
          <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-cyan-300"></div>
        </div>

        <div className="p-8 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-400/50"></div>
            <Terminal className="w-7 h-7 text-cyan-400" />
            <h2 className="text-2xl font-bold font-mono text-cyan-400 tracking-wider uppercase">
              MISSION LOG
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
            <Clock className="w-6 h-6 text-cyan-400/70" />
          </motion.div>

          {/* Enhanced Terminal-style Mission Entries */}
          <div className="bg-black/70 border-2 border-cyan-400/50 rounded-lg p-6 font-mono text-sm max-h-80 overflow-y-auto shadow-inner">
            {/* Terminal header bar */}
            <div className="flex items-center justify-between border-b border-cyan-400/30 pb-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-cyan-400/70">SECURE_TERMINAL_v2.4.1</span>
            </div>
            
            <div className="space-y-3">
              {missionEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 hover:bg-cyan-400/10 transition-all duration-300 p-3 rounded-lg border border-gray-600/50 hover:border-cyan-400/30 relative"
                >
                  {/* Left accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
                  
                  <span className="text-cyan-400 shrink-0 font-bold pl-4">{entry.timestamp}</span>
                  <span className="text-white shrink-0 font-semibold">{entry.team}:</span>
                  <span className={`${getCategoryColor(entry.category)} font-semibold`}>{getCategoryPrefix(entry.category)}</span>
                  <span className="text-gray-300 flex-1">{entry.action}</span>
                  <span className="text-green-400 shrink-0 font-bold bg-green-400/10 px-2 py-1 rounded border border-green-400/30">
                    +{entry.points} PTS
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Blinking cursor */}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-cyan-400 mt-2"
            />
          </div>

          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground"
          >
            <div className="flex items-center gap-4">
              <span>LIVE FEED ACTIVE</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>MONITORING 4 TEAMS</span>
              </div>
            </div>
            <span>LAST UPDATE: 2 SECONDS AGO</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}