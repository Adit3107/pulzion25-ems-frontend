import Events from '@/components/sections/events';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen scanlines">
      <Image
        src="/mission-select-bg.jpg"
        alt="Select your mission background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0 opacity-30"
      />
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
