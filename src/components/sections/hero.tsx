"use client";

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';
import { GlitchEffect } from '@/components/ui/glitch-effect';
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
    <AnimatedSection 
      id="home" 
      className="container grid lg:grid-cols-1 gap-10 items-center justify-center py-20 md:py-32 min-h-screen relative"
    >
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/demo2.png" 
          alt="Landing Background"
          className="fixed inset-0 w-screen h-screen object-cover"
          style={{
            filter: 'brightness(0.6) contrast(1.2) saturate(1.0)',
            opacity: 0.8,
            width: '100vw',
            height: '100vh',
            objectPosition: 'center center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1
          }}
        />
        {/* Overlay for better text readability */}
        <div className="fixed inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" style={{ zIndex: -1 }} />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 text-center z-10 relative"
      >
        <GlitchEffect>
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter bg-gradient-to-r from-team-charlie via-team-delta to-team-bravo bg-clip-text text-transparent drop-shadow-[0_0_15px_theme(colors.primary)]">
              PULZION'25
            </h1>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground tracking-[0.2em]">
              The Ai Gridlock
            </h2>
          </motion.div>
        </GlitchEffect>
        
        <motion.p 
            variants={itemVariants}
            className="max-w-lg mx-auto font-code text-foreground/80"
        >
            // SYSTEM ALERT: Anomaly detected. Gridlock protocol initiated. Operative, your intervention is required.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex justify-center">
          <Button size="lg" asChild className="font-bold font-headline tracking-widest border-2 border-primary text-primary-foreground bg-primary hover:bg-primary/90 hover:shadow-[0_0_25px_theme(colors.primary)] transition-all duration-300">
            <Link href="/register">[ JOIN THE RESISTANCE ]</Link>
          </Button>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
