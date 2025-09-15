import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Events from '@/components/sections/events';
import Faq from '@/components/sections/faq';
import Sponsors from '@/components/sections/sponsors';
import Footer from '@/components/layout/footer';
import ParticleBackground from '@/components/ui/particle-background';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ParticleBackground />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Events />
        <Faq />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
