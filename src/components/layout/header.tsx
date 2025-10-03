"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { Menu, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { name: 'EVENTS', href: '/events' },
  { name: 'GRIDLOCK', href: '/gridlock' },
  { name: 'GLIMPSES', href: '/glimpses' },
  { name: 'SPONSORS', href: '/sponsors' },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/40"
    >
      <div className="container flex h-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mr-4 flex items-center"
        >
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl">PULZION</span>
          </Link>
        </motion.div>
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.3 }}
          className="hidden md:flex flex-1 items-center justify-center space-x-10 text-base font-medium uppercase tracking-wider"
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={linkVariants}>
              <Link
                href={link.href}
                className="group relative transition-all duration-300 ease-in-out text-foreground hover:text-primary font-bold hover:scale-110 hover:-translate-y-1 block"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          {isLoggedIn && (
            <motion.div key="MYCARTS" variants={linkVariants}>
              <Link
                href="/mycarts"
                className="group relative transition-all duration-300 ease-in-out text-foreground hover:text-primary font-bold hover:scale-110 hover:-translate-y-1 block"
              >
                MY CARTS
              </Link>
            </motion.div>
          )}
          {isLoggedIn && (
            <motion.div key="ORDERS" variants={linkVariants}>
              <Link
                href="/orders"
                className="group relative transition-all duration-300 ease-in-out text-foreground hover:text-primary font-bold hover:scale-110 hover:-translate-y-1 block"
              >
                ORDERS
              </Link>
            </motion.div>
          )}
        </motion.nav>
        <div className="flex flex-1 md:flex-initial items-center justify-end space-x-4">
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isLoggedIn ? (
              <Link href="/profile" aria-label="Profile" className="inline-flex items-center justify-center rounded-full w-10 h-10 border hover:bg-accent transition-colors">
                <UserIcon className="h-5 w-5" />
              </Link>
            ) : (
              <Button asChild variant="default" className="font-bold uppercase bg-secondary text-secondary-foreground border-2 border-transparent transition-all duration-300 hover:bg-transparent hover:text-secondary hover:border-secondary hover:shadow-[0_0_15px_theme(colors.secondary)]">
                <Link href="/login">Login now</Link>
              </Button>
            )}
          </motion.div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-primary" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b border-primary/20">
                    <h2 className="font-bold font-headline text-lg">NAVIGATION</h2>
                  </div>
                  <nav className="flex-grow flex flex-col items-center justify-center gap-8 text-lg uppercase tracking-wider">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Link
                          href={link.href}
                          className="transition-colors hover:text-primary text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                    {isLoggedIn && (
                      <SheetClose asChild>
                        <Link
                          href="/mycarts"
                          className="transition-colors hover:text-primary text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          MY CARTS
                        </Link>
                      </SheetClose>
                    )}
                    {isLoggedIn && (
                      <SheetClose asChild>
                        <Link
                          href="/orders"
                          className="transition-colors hover:text-primary text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          ORDERS
                        </Link>
                      </SheetClose>
                    )}
                    {isLoggedIn ? (
                      <SheetClose asChild>
                        <Link
                          href="/profile"
                          className="transition-colors hover:text-primary text-foreground mt-4 flex items-center gap-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <UserIcon className="h-5 w-5" /> Profile
                        </Link>
                      </SheetClose>
                    ) : (
                      <SheetClose asChild>
                        <Button asChild variant="default" className="font-bold uppercase bg-secondary text-secondary-foreground border-2 border-transparent transition-all duration-300 hover:bg-transparent hover:text-secondary hover:border-secondary hover:shadow-[0_0_15px_theme(colors.secondary)] mt-4">
                          <Link href="/login">Login now</Link>
                        </Button>
                      </SheetClose>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
