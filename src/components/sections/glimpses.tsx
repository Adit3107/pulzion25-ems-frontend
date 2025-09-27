"use client";

import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/ui/animated-section';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const galleryImages = [
  PlaceHolderImages.find(img => img.id === 'gallery1'),
  PlaceHolderImages.find(img => img.id === 'gallery2'),
  PlaceHolderImages.find(img => img.id === 'gallery3'),
  PlaceHolderImages.find(img => img.id === 'gallery4'),
  PlaceHolderImages.find(img => img.id === 'gallery5'),
  PlaceHolderImages.find(img => img.id === 'gallery6'),
  PlaceHolderImages.find(img => img.id === 'gallery7'),
  PlaceHolderImages.find(img => img.id === 'gallery8'),
].filter(Boolean) as ImagePlaceholder[];

export default function Glimpses() {
  return (
    <AnimatedSection id="glimpses" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary tracking-widest">[ ARCHIVED FOOTAGE ]</h2>
          <p className="max-w-2xl mx-auto text-foreground/80 font-code">
            // A look back at the moments that made last year's event unforgettable.
          </p>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {galleryImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="relative aspect-[4/3] p-0">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </AnimatedSection>
  );
}
