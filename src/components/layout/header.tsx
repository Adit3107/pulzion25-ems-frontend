"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Sponsors', href: '#sponsors' },
];

const navVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mr-4 flex items-center"
        >
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-lg">Pulzion</span>
          </Link>
        </motion.div>
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.3 }}
          className="hidden md:flex items-center space-x-6 text-sm font-medium"
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={linkVariants}>
              <Link
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-secondary))] text-accent-foreground font-bold hover:opacity-90 transition-opacity">
              Register Now
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
