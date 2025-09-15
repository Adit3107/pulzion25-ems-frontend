"use client";

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';
import { SplineRobot } from '@/components/ui/spline-robot';

export default function Hero() {
  return (
    <AnimatedSection id="home" className="container grid lg:grid-cols-2 gap-10 items-center py-20 md:py-32 min-h-screen">
      <div className="space-y-6 text-center lg:text-left z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-headline font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0">
        <SplineRobot />
      </div>
    </AnimatedSection>
  );
}
