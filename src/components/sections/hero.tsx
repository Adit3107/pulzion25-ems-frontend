"use client";

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';
import { SplineRobot } from '@/components/ui/spline-robot';
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
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
            -The Ai Gridlock-
          </h2>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
          <Button size="lg" asChild className="bg-gradient-to-r from-purple-500 to-indigo-600 text-primary-foreground font-bold hover:opacity-90 transition-opacity">
            <Link href="/register">Participate Now</Link>
          </Button>
        </motion.div>
      </motion.div>
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full lg:h-[calc(100%_-_56px)] mt-14 z-0 scale-90">
        <SplineRobot />
      </div>
    </AnimatedSection>
  );
}
