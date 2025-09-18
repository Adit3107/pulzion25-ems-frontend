import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Events from '@/components/sections/events';
import Glimpses from '@/components/sections/glimpses';
import Sponsors from '@/components/sections/sponsors';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import ParticleBackground from '@/components/ui/particle-background';
import Header from '@/components/layout/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ParticleBackground />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Events />
        <Glimpses />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
