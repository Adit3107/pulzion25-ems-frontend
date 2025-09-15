"use client";

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';
import { SplineRobot } from '@/components/ui/spline-robot';

export default function Hero() {
  return (
    <AnimatedSection id="home" className="container grid lg:grid-cols-2 gap-10 items-center py-20 md:py-32 min-h-[calc(100vh_-_56px)]">
      <div className="space-y-6 text-center lg:text-left z-10 lg:pl-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center lg:items-start"
        >
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PULZION'25
          </h1>
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-muted-foreground">
            -The Ai Gridlock-
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center lg:justify-start"
          >
          <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-secondary))] text-accent-foreground font-bold hover:opacity-90 transition-opacity">
            Register for Event
          </Button>
        </motion.div>
      </div>
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full lg:h-[calc(100%_-_56px)] mt-14 z-0 scale-90">
        <SplineRobot />
      </div>
    </AnimatedSection>
  );
}
