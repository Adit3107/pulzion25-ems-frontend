import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Events from '@/components/sections/events';
import Sponsors from '@/components/sections/sponsors';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen scanlines">
      <div className="relative">
         <Image
            src="https://i.postimg.cc/BZd65Y9g/command-center.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0 opacity-30"
            priority
        />
        <Header />
        <Hero />
      </div>
      <main className="flex-grow">
        <About />
        <Events />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
