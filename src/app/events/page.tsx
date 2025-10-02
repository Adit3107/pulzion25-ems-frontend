"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { NetworkBackground } from "@/components/ui/network-background";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { technicalEvents, nonTechnicalEvents } from "./data";
import Events from '@/components/sections/events';


const EventCarousel = ({ events }: { events: (typeof technicalEvents | typeof nonTechnicalEvents) }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  const scrollTo = React.useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect);
    emblaApi.on('reInit', onSelect)
    
    onSelect();
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full max-w-7xl">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4">
          {events.map((event, index) => (
            <div className="flex-[0_0_90%] md:flex-[0_0_40%] lg:flex-[0_0_33.33%] pl-4" key={event.name + index}>
              <EventCard event={event} isActive={index === selectedIndex} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center space-x-6 mt-12">
        <Button onClick={scrollPrev} variant="outline" className="font-code hover:bg-primary/10">{"< PREV"}</Button>
        <div className="flex items-center justify-center space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-secondary shadow-[0_0_10px_hsl(var(--secondary))]'
                  : 'bg-foreground/20'
              }`}
            />
          ))}
        </div>
        <Button onClick={scrollNext} variant="outline" className="font-code hover:bg-primary/10">{"NEXT >"}</Button>
      </div>
    </div>
  )
}

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8">
        <NetworkBackground />
        <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-8">
            <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-headline font-bold text-primary tracking-widest">[ MISSIONS ]</h1>
            </div>

            <Tabs defaultValue="tech" className="w-full flex flex-col items-center">
                <TabsList>
                    <TabsTrigger value="tech">[ TECH OPS ]</TabsTrigger>
                    <TabsTrigger value="non-tech">[ NON-TECH OPS ]</TabsTrigger>
                </TabsList>
                <TabsContent value="tech" className="w-full mt-8">
                  <div className="flex justify-center">
                    <EventCarousel events={technicalEvents} />
                  </div>
                </TabsContent>
                <TabsContent value="non-tech" className="w-full mt-8">
                  <div className="flex justify-center">
                    <EventCarousel events={nonTechnicalEvents} />
                  </div>
                </TabsContent>
            </Tabs>
        </div>
        <Events />
      </main>
      <Footer />
    </div>
  );
}
