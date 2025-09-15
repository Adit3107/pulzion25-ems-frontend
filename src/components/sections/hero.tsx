"use client";

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';
import { AIRoboBody } from '@/components/ui/ai-robo-body';
import { GridlockModel } from '@/components/ui/gridlock-model';

export default function Hero() {
  return (
    <AnimatedSection id="home" className="container grid lg:grid-cols-2 gap-10 items-center py-20 md:py-32 relative">
       <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-30">
        <AIRoboBody />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 opacity-50">
        <GridlockModel />
      </div>

      <div className="space-y-6 text-center lg:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-headline font-bold tracking-tighter bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          AI GridLock Portal
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-xl">
          Experience the future. A symposium of innovation, where the brightest minds in artificial intelligence converge to shape tomorrow's world.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-x-4">
          <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-secondary))] text-accent-foreground font-bold hover:opacity-90 transition-opacity">
            Register for Event
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </motion.div>
      </div>
      <div className="relative w-full h-96 lg:h-[500px]">
        {/* This div is now a placeholder for spacing, 3D models are in the background */}
      </div>
    </AnimatedSection>
  );
}
