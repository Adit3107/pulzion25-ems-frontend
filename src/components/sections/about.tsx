
"use client";

import * as React from "react";
import { AnimatedSection } from '@/components/ui/animated-section';
import { Counter } from '@/components/ui/counter';
import { Typewriter } from '@/components/ui/typewriter';
import { LiveTimestamp } from '@/components/ui/live-timestamp';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { CardSpotlight } from "../ui/card-spotlight";

const stats = [
  { value: '13', label: 'ACTIVE MISSIONS' },
  { value: '300', label: 'REGISTERED OPERATIVES' },
  { value: '8000', label: 'NETWORK AGENTS', suffix: '+' },
];

const organizations = [
    {
        id: 'pasc',
        title: 'PASC',
        description: 'PICT ACM Student\'s Chapter (PASC) is the most active ACM chapter in India. #UnitedWeStand At PASC, we all work together, as a team. We take utmost efforts for the success of each and every member of PASC.',
    },
    {
        id: 'acm-w',
        title: 'ACM-W',
        description: 'With the objective to support and celebrate the full engagement of women in all aspects of computing field, we conducted an event ACM Pune \'Celebration of Women in Computing\' (APCWIC-2018) in association with ACM-W India and ACM Pune Professional Chapter.',
    },
    {
        id: 'acm',
        title: 'ACM',
        description: 'The Association for Computing Machinery (ACM) is the world\'s largest educational and scientific society uniting professionals, educators and researchers in the field of computer science to inspire dialogue, share resources and address the challenges in the domain.',
    }
];

const Metadata = () => (
    <div className='font-code text-sm text-foreground/70 space-y-1'>
        <p className='text-secondary font-bold tracking-widest'>// METADATA</p>
        <p>TRANSMISSION ID: PZN25-DBRF-001</p>
        <p>SOURCE: PASC Command</p>
        <LiveTimestamp />
        <p>STATUS: SECURE // DECRYPTED</p>
    </div>
);

export default function About() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  return (
    <AnimatedSection id="about" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary tracking-widest">[ THE DEBRIEF ]</h2>
        </div>

        <div className="bg-background/50 border border-primary/20 p-6 md:p-8 backdrop-blur-sm font-code text-base md:text-lg mb-16">
            <div className='border-b-2 border-dashed border-primary/30 pb-4 mb-4'>
                <p className="text-primary"><Typewriter text="> STATUS: SYNCING MISSION DATA..." delay={20} /></p>
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-baseline">
                        <p className="text-foreground/80">{`> ${stat.label.padEnd(25, '.')}`}</p>
                        <span className="text-2xl font-bold text-secondary font-headline ml-2">
                           <Counter value={parseInt(stat.value)} />
                           {stat.suffix || ''}
                        </span>
                    </div>
                ))}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Metadata />
                </div>
                <div className="md:col-span-2 space-y-6 text-foreground/90">
                    <div>
                        <h3 className='font-bold text-primary tracking-widest mb-2'>[ MISSION OVERVIEW ]</h3>
                        <p>Pulzion is the annual flagship event organized by the PICT ACM Student Chapter (PASC). It comprises multiple events in technical and non-technical domains, including coding competitions, mock placement interviews, business management-based events, design and development contests, and quizzing events.</p>
                    </div>
                     <div>
                        <h3 className='font-bold text-primary tracking-widest mb-2'>[ STRATEGIC OBJECTIVE ]</h3>
                        <p>It is one of the most anticipated events at PICT. This year, Pulzion is going global to encourage students of varied backgrounds to participate and compete. With sincerity, dedication, and high aspirations, our chapter hopes to add value to our college and the community.</p>
                    </div>
                </div>
            </div>
        </div>

        <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
                {organizations.map((org) => (
                    <CarouselItem key={org.id} className="md:basis-1/2 lg:basis-1/3">
                         <CardSpotlight className="h-full">
                            <Card className="h-full flex flex-col justify-center bg-background/50 border border-primary/20 backdrop-blur-sm">
                                <CardContent className="p-6 text-center space-y-4">
                                    <h3 className="text-2xl font-headline text-secondary">[ {org.title} ]</h3>
                                    <p className="text-foreground/80 font-code text-sm md:text-base min-h-[150px]">{org.description}</p>
                                </CardContent>
                            </Card>
                        </CardSpotlight>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center items-center gap-4 mt-6 font-code text-primary">
                <CarouselPrevious>
                    <Button variant="ghost" className="hover:bg-primary/10">{"< PREV_ENTITY"}</Button>
                </CarouselPrevious>
                <div className="text-center text-sm text-foreground/70">
                    [ {String(current).padStart(2, '0')} / {String(count).padStart(2, '0')} ]
                </div>
                <CarouselNext>
                    <Button variant="ghost" className="hover:bg-primary/10">{"NEXT_ENTITY >"}</Button>
                </CarouselNext>
            </div>
        </Carousel>

      </div>
    </AnimatedSection>
  );
}
