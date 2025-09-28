"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MissionCard } from './MissionCard';

const missions = [
  {
    title: "CODEFURY",
    objective: "Neutralize the AI's defensive subroutines with flawless code."
  },
  {
    title: "DATASPHERE",
    objective: "Navigate a corrupt data labyrinth to extract critical packets."
  },
  {
    title: "ENIGMA ECHO",
    objective: "Decrypt complex ciphers to expose the AI's hidden protocols."
  },
  {
    title: "CYBERSPARK",
    objective: "Deploy a counter-AI agent to disable a key component of the gridlock."
  },
  {
    title: "LOGIC VAULT",
    objective: "Bypass quantum encryption to retrieve a Master Key fragment."
  },
  {
    title: "NEURAL INFILTRATION",
    objective: "Mind-meld with the AI's network to exploit its vulnerability."
  },
  {
    title: "GHOST PROTOCOL",
    objective: "Execute a stealthy data-sync operation without detection."
  },
  {
    title: "SYSTEM SHOCK",
    objective: "Overload the AI's power relays in a high-stakes challenge."
  },
  {
    title: "QUANTUM BREAKDOWN",
    objective: "Decipher quantum signatures to initiate a system collapse."
  },
  {
    title: "VIRTUAL FRONTIER",
    objective: "Compete in a simulated arena to secure your team's ranking."
  },
  {
    title: "RESISTANCE PROTOCOL",
    objective: "Forge alliances and fortify the resistance network."
  },
  {
    title: "THE FINAL LOCKOUT",
    objective: "Confront the rogue AI in a final, all-out challenge."
  }
];

export const CommandCenter = () => {
  const [currentMission, setCurrentMission] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  const navigateToMission = (direction: 'prev' | 'next') => {
    setGlitchActive(true);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentMission((prev) => (prev + 1) % missions.length);
      } else {
        setCurrentMission((prev) => (prev - 1 + missions.length) % missions.length);
      }
      setGlitchActive(false);
    }, 200);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-transparent backdrop-blur-[1px]"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-destructive/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary tracking-widest">[ MISSIONS ]</h2>
        </div>

        <div className="w-full max-w-4xl px-8">
            
            <div className="flex justify-between items-center mb-8">
              <Button
                onClick={() => navigateToMission('prev')}
                className="bg-card/80 backdrop-blur-sm border border-secondary hover:bg-secondary/20 hover:shadow-[0_0_15px_theme(colors.secondary)] transition-all duration-300"
                size="lg"
              >
                <ChevronLeft className="mr-2" />
                <span className="font-headline font-bold">PREVIOUS MISSION</span>
              </Button>

              <div className="text-center">
                <div className="text-sm text-secondary font-code mb-1">
                  MISSION SEQUENCE
                </div>
                <div className="text-2xl font-bold font-headline text-foreground">
                  {String(currentMission + 1).padStart(2, '0')} / {String(missions.length).padStart(2, '0')}
                </div>
              </div>

              <Button
                onClick={() => navigateToMission('next')}
                className="bg-card/80 backdrop-blur-sm border border-secondary hover:bg-secondary/20 hover:shadow-[0_0_15px_theme(colors.secondary)] transition-all duration-300"
                size="lg"
              >
                <span className="font-headline font-bold">NEXT MISSION</span>
                <ChevronRight className="ml-2" />
              </Button>
            </div>

            <div className={`transition-all duration-300 ${glitchActive ? 'animate-glitch' : ''}`}>
              <MissionCard
                title={missions[currentMission].title}
                objective={missions[currentMission].objective}
                isActive={true}
              />
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              {missions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMission 
                      ? 'bg-secondary shadow-[0_0_10px_hsl(var(--secondary))] animate-pulse' 
                      : 'bg-foreground/20'
                  }`}
                />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};
