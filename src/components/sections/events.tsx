"use client";

import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/ui/animated-section';
import { EventIcon, type IconName } from '@/components/ui/event-icon';
import { CardSpotlight } from '../ui/card-spotlight';

const technicalEvents = [
  { name: 'Codex', icon: 'codex' },
  { name: 'Codelicious', icon: 'codelicious' },
  { name: 'Compute and Compete', icon: 'compute' },
  { name: 'Dataquest', icon: 'dataquest' },
  { name: 'Web n App', icon: 'webapp' },
  { name: 'Electroquest', icon: 'electroquest' },
  { name: 'Hire Hustle', icon: 'hirehustle' },
  { name: 'Dextrous', icon: 'dextrous' },
  { name: 'Paper Presentation', icon: 'paper' },
  { name: 'Innowave', icon: 'innowave' },
] as { name: string; icon: IconName }[];

const nonTechnicalEvents = [
    { name: 'Fandom tmkoc', icon: 'fandom' },
    { name: 'Fandom cricket', icon: 'fandom' },
    { name: 'Fandom football', icon: 'fandom' },
    { name: 'Fandom sitcom', icon: 'fandom' },
    { name: 'Fandom anime', icon: 'fandom' },
    { name: 'Insight', icon: 'insight' },
    { name: 'Freeze the second', icon: 'freeze' },
] as { name: string; icon: IconName }[];


export default function Events() {
  return (
    <AnimatedSection id="events" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary tracking-widest">[ MISSION BRIEFINGS ]</h2>
          <p className="max-w-2xl mx-auto text-foreground/80 font-code">
            // ANALYZE THE AVAILABLE MISSIONS. CHOOSE YOUR OBJECTIVES. EXECUTE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div id="technical-missions">
              <h3 className="text-2xl md:text-3xl font-headline text-secondary mb-8 text-center">[ TECHNICAL OPERATIONS ]</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technicalEvents.map((event) => (
                  <CardSpotlight key={event.name}>
                    <Card className="bg-transparent border-primary/30 h-full w-full">
                       <CardContent className="p-4 flex flex-col items-center justify-center text-center aspect-square">
                        <div className="p-3 bg-primary/10 mb-3 border border-primary/30 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_theme(colors.primary)] transition-all duration-300">
                          <EventIcon name={event.icon} className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-headline text-base text-primary/90">{event.name}</h4>
                      </CardContent>
                    </Card>
                  </CardSpotlight>
                ))}
              </div>
          </div>
          
          <div id="non-technical-missions">
              <h3 className="text-2xl md:text-3xl font-headline text-secondary mb-8 text-center">[ NON-TECHNICAL OPERATIONS ]</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nonTechnicalEvents.map((event) => (
                  <CardSpotlight key={event.name}>
                     <Card className="bg-transparent border-primary/30 h-full w-full">
                       <CardContent className="p-4 flex flex-col items-center justify-center text-center aspect-square">
                        <div className="p-3 bg-primary/10 mb-3 border border-primary/30 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_theme(colors.primary)] transition-all duration-300">
                          <EventIcon name={event.icon} className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-headline text-base text-primary/90">{event.name}</h4>
                      </CardContent>
                    </Card>
                  </CardSpotlight>
                ))}
              </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
