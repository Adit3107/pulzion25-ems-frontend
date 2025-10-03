"use client";
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Sponsors from '@/components/sections/sponsors';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { useEffect } from 'react';
import { useEvents } from '@/context/EventContext';

export default function Home() {
  const { loadEvents } = useEvents();

  useEffect(() => {
    // Fetch events when Home mounts (AuthContext is already provided in layout)
    loadEvents();
  }, [loadEvents]);
  return (
    <div className="flex flex-col min-h-screen scanlines">
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="https://i.postimg.cc/BZd65Y9g/command-center.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      
      <Header />
      <div className="relative z-10">
        <Hero />
      </div>

      <main className="flex-grow relative z-10">
        <About />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
