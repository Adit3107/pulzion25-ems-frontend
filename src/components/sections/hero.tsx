"use client";

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import GlitchText from '@/components/ui/GlitchText';
import { motion } from 'framer-motion';
import { SplineRobot } from '@/components/ui/spline-robot';
import { Shield, AlertTriangle, Zap } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
};

export default function Hero() {
  return (
    <AnimatedSection id="home" className="container grid lg:grid-cols-2 gap-10 items-center py-20 md:py-32 min-h-[calc(100vh_-_56px)]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 text-center lg:text-left z-10 lg:pl-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-headline font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
            PULZION'25
          </h1>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground mb-2">
            <GlitchText text="-The AI Gridlock-" glitchIntensity="medium" />
          </h2>
          
          {/* Mission Status Indicator */}
          <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-red-900/20 border border-red-500/30 rounded-lg">
            <AlertTriangle className="text-red-400" size={16} />
            <span className="text-red-300 font-mono text-sm">
              <GlitchText text="GLOBAL SYSTEMS COMPROMISED" glitchIntensity="high" />
            </span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Mission Briefing */}
          <p className="text-lg text-foreground/80 max-w-lg font-mono">
            The Collective has initiated a <span className="text-red-400 font-bold">Digital Lockout</span>. 
            Join the resistance and help extract <span className="text-purple-400 font-bold">The Master Key</span> 
            to neutralize the rogue AI threat.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-indigo-600 text-primary-foreground font-bold hover:opacity-90 transition-all duration-200 hover:scale-105 font-mono tracking-wider">
              <Link href="/events">[ JOIN MISSION ]</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/50 hover:border-primary text-primary hover:bg-primary/10 font-bold transition-all duration-200 hover:scale-105 font-mono tracking-wider">
              <Link href="/register">[ REGISTER OPERATIVE ]</Link>
            </Button>
          </div>
          
          {/* Operative Stats */}
          <div className="flex items-center gap-6 text-sm font-mono pt-4">
            <div className="flex items-center gap-2">
              <Shield className="text-green-400" size={16} />
              <span className="text-gray-400">247 OPERATIVES ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-yellow-400" size={16} />
              <span className="text-gray-400">85% SYSTEM INTEGRITY</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full lg:h-[calc(100%_-_56px)] mt-14 z-0 scale-90">
        <SplineRobot />
      </div>
    </AnimatedSection>
  );
}
