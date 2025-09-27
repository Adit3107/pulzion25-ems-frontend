"use client";

import Events from '@/components/sections/events';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function EventsPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'missionSelectBg');

  return (
    <div className="flex flex-col min-h-screen scanlines">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          quality={100}
          className="absolute inset-0 z-0 opacity-30 object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Events />
        </main>
        <Footer />
      </div>
    </div>
  );
}
