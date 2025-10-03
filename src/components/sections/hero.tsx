"use client";

import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
    <AnimatedSection id="home" className="relative container grid lg:grid-cols-1 gap-10 items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8 text-center z-10 relative"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center">
            <Image
                src="https://i.postimg.cc/YSz4S1h5/PULZION-25-LOGO-HERO.png"
                alt="PULZION 25 LOGO"
                width={800}
                height={400}
                className="max-w-full h-auto"
                priority
            />
        </motion.div>
        
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
