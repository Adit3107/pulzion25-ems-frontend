import Glimpses from '@/components/sections/glimpses';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function GlimpsesPage() {
  return (
    <div className="flex flex-col min-h-screen scanlines">
      <Header />
      <main className="flex-grow">
        <Glimpses />
      </main>
      <Footer />
    </div>
  );
}
