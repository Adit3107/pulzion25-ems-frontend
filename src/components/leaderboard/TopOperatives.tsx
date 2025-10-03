"use client";

import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface Operative {
  id: string;
  name: string;
  codename: string;
  avatar?: string;
  specialty?: string;
}

interface StealthRating {
  nyxPoints: number;
  intelPoints: number;
  neuralNetScore: number;
}

const topOperatives: Operative[] = [
  { id: '1', name: 'OPERATIVE NAME', codename: 'SHADOW', specialty: 'INFILTRATION' },
  { id: '2', name: 'OPERATIVE NAME', codename: 'CIPHER', specialty: 'CRYPTOGRAPHY' },
  { id: '3', name: 'OPERATIVE NAME', codename: 'GHOST', specialty: 'RECONNAISSANCE' },
  { id: '4', name: 'OPERATIVE NAME', codename: 'VIPER', specialty: 'SABOTAGE' },
  { id: '5', name: 'ELITES SAGE', codename: 'SAGE', specialty: 'STRATEGY' },
  { id: '6', name: 'OPERATIVE NAME', codename: 'RAVEN', specialty: 'INTELLIGENCE' },
];

const stealthRating: StealthRating = {
  nyxPoints: 755,
  intelPoints: 890,
  neuralNetScore: 644,
};

export function TopOperatives() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Enhanced Cyberpunk Container with Red Accent - Dark Prominent Border */}
      <div className="relative border-2 border-red-400 shadow-2xl shadow-red-400/30 overflow-hidden" style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
      }}>
        {/* Enhanced Red Corner Accents with Glow */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-400 shadow-lg shadow-red-400/50"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-red-400 shadow-lg shadow-red-400/50"></div>
        </div>
        
        <div className="absolute top-0 right-0 w-12 h-12">
          <div className="absolute top-0 right-0 w-full h-1 bg-red-400 shadow-lg shadow-red-400/50"></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-red-400 shadow-lg shadow-red-400/50"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-12 h-12">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-red-400 shadow-lg shadow-red-400/50"></div>
          <div className="absolute bottom-0 left-0 w-1 h-full bg-red-400 shadow-lg shadow-red-400/50"></div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-12 h-12">
          <div className="absolute bottom-0 right-0 w-full h-1 bg-red-400 shadow-lg shadow-red-400/50"></div>
          <div className="absolute bottom-0 right-0 w-1 h-full bg-red-400 shadow-lg shadow-red-400/50"></div>
        </div>

        <div className="p-6 relative z-10">
          {/* Clean Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex items-center"
          >
            <div className="w-1 h-6 bg-red-400 mr-3"></div>
            <h2 className="text-sm font-bold text-red-400 tracking-wider uppercase">
              TOP OPERATIVES
            </h2>
            <div className="flex-1 ml-3 h-px bg-red-400/30"></div>
          </motion.div>

          {/* Enhanced Operatives Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {topOperatives.map((operative, index) => (
              <motion.div
                key={operative.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
              >
                {/* Enhanced operative card with smart contrast */}
                <motion.div 
                  className="relative border-2 border-red-400 bg-black/70 backdrop-blur-sm p-3 hover:border-red-300 transition-all duration-300 hover:shadow-xl hover:shadow-red-400/50 hover:bg-black/80"
                  whileHover={{ 
                    borderColor: '#fca5a5',
                    boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.4), 0 10px 10px -5px rgba(239, 68, 68, 0.2)'
                  }}
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
                  }}>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-red-400/10 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                  
                  {/* Operative avatar */}
                  <div className="flex flex-col items-center relative z-10">
                    <motion.div 
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 180,
                        transition: { duration: 0.4 }
                      }}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-300 ${
                        index < 3 ? 'border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50' : 
                        index === 4 ? 'border-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-400/50' : 'border-red-400 group-hover:shadow-lg group-hover:shadow-red-400/50'
                      }`}>
                      {operative.avatar ? (
                        <img src={operative.avatar} alt={operative.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className={`w-6 h-6 transition-all duration-300 ${
                          index < 3 ? 'text-cyan-400' : 
                          index === 4 ? 'text-yellow-400' : 'text-red-400'
                        }`} />
                      )}
                    </motion.div>
                    
                    {/* Operative name and details */}
                    <div className="text-center">
                      <p className="text-xs text-white font-bold tracking-wide mb-1">
                        {operative.name}
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                        {operative.codename}
                      </p>
                      {operative.specialty && (
                        <p className="text-[9px] text-cyan-300 uppercase tracking-wider mt-1 font-mono">
                          {operative.specialty}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Stealth Rating Section - Matching Reference Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="border-t border-red-400/60 pt-4 mt-4"
          >
            <div className="flex items-center mb-3">
              <div className="w-1 h-4 bg-red-400 mr-2"></div>
              <h3 className="text-xs font-bold text-red-400 tracking-wider uppercase">
                STEALTH RATING
              </h3>
              <div className="flex-1 ml-3 h-px bg-red-400/30"></div>
            </div>
            
            <div className="space-y-2">
              {/* NYX Points */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-white uppercase tracking-wider">NYX POINTS</span>
                <span className="text-sm font-bold text-white">755</span>
              </div>
              
              {/* Intel Points */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-white uppercase tracking-wider">INTEL POINTS</span>
                <span className="text-sm font-bold text-white">890</span>
              </div>
              
              {/* Neural Net Score */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-white uppercase tracking-wider">NEURAL NET SCORE</span>
                <span className="text-sm font-bold text-white">644</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}