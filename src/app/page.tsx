import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Events from '@/components/sections/events';
import Faq from '@/components/sections/faq';
import Sponsors from '@/components/sections/sponsors';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Events />
        <Faq />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
