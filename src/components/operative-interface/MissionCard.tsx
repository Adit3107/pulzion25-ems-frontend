"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface MissionCardProps {
  title: string;
  objective: string;
  isActive: boolean;
}

export const MissionCard = ({ title, objective, isActive }: MissionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleMissionInitiate = () => {
    const card = document.querySelector('.mission-card.active');
    if (card) {
      card.classList.add('animate-glitch');
      setTimeout(() => {
        card.classList.remove('animate-glitch');
        toast({
            title: `Mission ${title} Initiated`,
            description: "Redirecting to mission briefing...",
        });
      }, 300);
    }
  };

  return (
    <Card 
      className={`mission-card relative p-8 bg-card/90 backdrop-blur-sm border-2 transition-all duration-500 ${
        isActive ? 'active scale-100 opacity-100 border-secondary shadow-[0_0_20px_hsl(var(--secondary))]' : 'scale-95 opacity-70 border-border'
      } ${isActive && isHovered ? 'shadow-[0_0_30px_hsl(var(--secondary))]' : ''}`}
      style={{
        background: isActive 
          ? 'linear-gradient(135deg, hsl(var(--secondary) / 0.15), hsl(var(--primary) / 0.1))' 
          : 'hsl(var(--card))'
      }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className={`text-3xl font-bold font-headline mb-2 ${
            isActive ? 'text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]' : 'text-foreground'
          }`}>
            MISSION: {title}
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
        </div>

        <div className="space-y-4">
          <div className="text-lg">
            <span className="text-secondary font-bold font-headline tracking-widest">[ OBJECTIVE ]</span>
          </div>
          <p className="text-foreground/90 text-lg leading-relaxed font-code">
            {objective}
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={handleMissionInitiate}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={!isActive}
            size="lg"
            variant={isActive ? 'default' : 'secondary'}
            className={`
              text-lg font-bold font-headline transition-all duration-300
              ${isActive 
                ? 'bg-primary text-primary-foreground hover:shadow-[0_0_25px_theme(colors.primary)] hover:scale-105' 
                : 'cursor-not-allowed'
              }
              ${isHovered && isActive ? 'animate-pulse' : ''}
            `}
          >
            {isActive ? '> INITIATE MISSION PROTOCOL' : '> MISSION LOCKED'}
          </Button>
        </div>

        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-secondary opacity-50"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-secondary opacity-50"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-secondary opacity-50"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-secondary opacity-50"></div>
      </div>
    </Card>
  );
};
