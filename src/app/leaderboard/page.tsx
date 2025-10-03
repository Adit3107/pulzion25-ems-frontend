"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { OverallTeamStandings } from '@/components/leaderboard/OverallTeamStandings';
import { TopOperatives } from '@/components/leaderboard/TopOperatives';

export default function LeaderboardPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate brightness based on scroll position
  const calculateBrightness = () => {
    const maxScroll = 200; // Pixels to scroll before reaching minimum brightness
    const maxBrightness = 1.2;
    const minBrightness = 0.4;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    return maxBrightness - (scrollProgress * (maxBrightness - minBrightness));
  };

  // Calculate opacity based on scroll position
  const calculateOpacity = () => {
    const maxScroll = 200;
    const maxOpacity = 0.95;
    const minOpacity = 0.7;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    return maxOpacity - (scrollProgress * (maxOpacity - minOpacity));
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Cyberpunk World Map Background */}
      <div className="fixed inset-0 z-0">
        {/* Enhanced background image with dynamic dimming */}
        <img 
          src="/demo3.png" 
          alt="Demo Background"
          className="fixed inset-0 w-screen h-screen object-cover"
          style={{
            filter: `brightness(${calculateBrightness()}) contrast(1.2) saturate(1.1) hue-rotate(8deg)`,
            opacity: calculateOpacity(),
            width: '100vw',
            height: '100vh',
            objectPosition: 'center center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
            transition: 'filter 0.3s ease-out, opacity 0.3s ease-out'
          }}
          onError={(e) => {
            console.error('Background image failed to load:', e);
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            // Show fallback background
            const fallback = target.parentElement?.querySelector('.fallback-bg') as HTMLElement;
            if (fallback) {
              fallback.style.display = 'block';
            }
          }}
          onLoad={() => {
            console.log('Background image loaded successfully');
          }}
        />
        {/* Fallback background pattern */}
        <div className="fallback-bg absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-black hidden" />
      </div>
      
      <Header />
      <main className="relative z-20">
        {/* Spacer to push content down */}
        <div className="pt-80"></div>
        
        {/* Main Leaderboard Content - Moved to bottom position */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pb-16 mt-auto"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 max-w-7xl mx-auto">
              {/* Left Side - Overall Team Standings */}
              <OverallTeamStandings selectedTeam={selectedTeam} onTeamSelect={setSelectedTeam} />
              
              {/* Right Side - Top Operatives */}
              <TopOperatives />
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}