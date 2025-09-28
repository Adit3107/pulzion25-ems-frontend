import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Events from '@/components/sections/events';
import Sponsors from '@/components/sections/sponsors';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen scanlines">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Events />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
