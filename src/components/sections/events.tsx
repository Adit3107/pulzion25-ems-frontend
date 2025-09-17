"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/ui/animated-section';
import { EventIcon, type IconName } from '@/components/ui/event-icon';

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
    { name: 'Biz-Quiz', icon: 'quiz' },
    { name: 'B-Plan', icon: 'bplan' },
    { name: 'Wallstreet', icon: 'wallstreet' },
    { name: 'Panel Discussion', icon: 'panel' },
] as { name: string; icon: IconName }[];


export default function Events() {
  return (
    <AnimatedSection id="events" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Events</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            Explore our curated list of events, separated into technical and non-technical categories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="flex flex-col bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="pt-4 font-headline text-2xl text-center">Technical Events</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {technicalEvents.map((event) => (
                  <div key={event.name} className="flex flex-col items-center gap-3 p-4 rounded-lg bg-card/30 hover:bg-primary/20 transition-colors duration-300">
                    <EventIcon name={event.icon} className="w-12 h-12 text-primary" />
                    <h4 className="font-semibold">{event.name}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <CardTitle className="pt-4 font-headline text-2xl text-center">Non-Technical Events</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {nonTechnicalEvents.map((event) => (
                   <div key={event.name} className="flex flex-col items-center gap-3 p-4 rounded-lg bg-card/30 hover:bg-primary/20 transition-colors duration-300">
                    <EventIcon name={event.icon} className="w-12 h-12 text-primary" />
                    <h4 className="font-semibold">{event.name}</h4>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
}
