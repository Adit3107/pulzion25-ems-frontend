"use client";

import { EventIcon, type IconName } from '@/components/ui/event-icon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Phone, Users, Calendar } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { NetworkBackground } from '@/components/ui/network-background';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { useEvents } from '@/context/EventContext';


export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { events, loading, loadEvents } = useEvents();
  const { isLoggedIn } = useAuth();
  const [adding, setAdding] = useState(false);

  const hasData = events.technical.length > 0 || events.nontechnical.length > 0;

  useEffect(() => {
    if (!hasData && !loading) {
      void loadEvents();
    }
  }, [hasData, loading, loadEvents]);

  const allEvents = [...events.technical, ...events.nontechnical];

  // Try both string and number comparison
  const event = hasData ? allEvents.find((e) => {
    return e.id === Number(id) || String(e.id) === id;
  }) : undefined;

  // Debug: Add this temporarily to see what's happening
  useEffect(() => {
    console.log('=== DEBUG INFO ===');
    console.log('URL id:', id, typeof id);
    console.log('Has data:', hasData);
    console.log('Loading:', loading);
    console.log('All events:', allEvents);
    console.log('All event IDs:', allEvents.map(e => ({ id: e.id, type: typeof e.id })));
    console.log('Found event:', event);
    console.log('==================');
  }, [id, hasData, loading, allEvents, event]);

  if (loading || !hasData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center">
          <p className="text-foreground/80">[ LOADING EVENTS... ]</p>
        </main>
        <Footer />
      </div>
    );
  }

  const onAddToCart = async () => {
    if (!event?.id) {
      console.warn('Missing event id for cart');
      return;
    }
    try {
      setAdding(true);
      const response = await api.post('/cart', { event_id: event.id });
      alert('Event added to cart successfully' + response.data);
    } catch (err) {
      console.error('Add to cart failed', err);
    } finally {
      setAdding(false);
    }
  };

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center">
          <div className="relative z-10">
            <h1 className="text-4xl font-headline text-destructive">[ 404: MISSION NOT FOUND ]</h1>
            <p className="text-foreground/80 mt-4">The requested event data could not be retrieved from the archives.</p>
            {/* Debug info */}
            <p className="text-sm text-muted-foreground mt-4">
              Looking for ID: {id} | Total events: {allEvents.length}
            </p>
          </div>
          <NetworkBackground />
        </main>
        <Footer />
      </div>
    );
  }

  const renderFormattedText = (text?: string | null) => {
    return (text ?? '').split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const renderRules = (rules?: string | null) => {
    return (rules ?? '').split('\n').map((rule, index) => (
      <li key={index}>{rule}</li>
    ));
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative overflow-hidden py-16 md:py-24">
        <NetworkBackground />
        <div className="container relative z-10">
          <div className="bg-card/30 backdrop-blur-md border border-primary/20 p-8 shadow-[0_0_25px_theme(colors.primary/0.5)]">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Column */}
              <div className="lg:col-span-1 flex flex-col items-center text-center">
                <div className="mb-4">
                  <EventIcon name={(event as any).icon as IconName} className="w-24 h-24 text-primary" />
                </div>
                <h1 className="text-4xl font-headline font-bold text-foreground mb-6">{event.name}</h1>

                <div className="flex justify-around w-full mb-6 text-center">
                  <div>
                    <p className="text-lg font-semibold">{event.mode as any}</p>
                    <p className="text-sm text-muted-foreground">Location</p>
                  </div>
                  <div className="border-l border-border h-10"></div>
                  <div>
                    <p className="text-lg font-semibold">{(event as any).price ?? event.price}</p>
                    <p className="text-sm text-muted-foreground">Price</p>
                  </div>
                </div>

                {isLoggedIn ? (
                  <Button
                    size="lg"
                    className="w-full font-bold font-headline tracking-widest border-2 border-primary text-primary-foreground bg-primary hover:bg-primary/90 hover:shadow-[0_0_25px_theme(colors.primary)] transition-all duration-300 mb-8"
                    onClick={onAddToCart}
                    disabled={adding}
                  >
                    {adding ? '[ ADDING... ]' : '[ ADD TO CART ]'}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full font-bold font-headline tracking-widest border-2 border-primary text-primary-foreground bg-primary hover:bg-primary/90 hover:shadow-[0_0_25px_theme(colors.primary)] transition-all duration-300 mb-8"
                  >
                    [ REGISTER ]
                  </Button>
                )}

                <Separator className="w-full bg-border/50 mb-6" />

                <div className="space-y-4 text-left w-full font-code">
                  {(event as any).contacts?.map((contact: any) => (
                    <div key={contact.name} className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <p className="text-sm">{contact.name}: <span className="text-muted-foreground">{contact.phone}</span></p>
                    </div>
                  ))}
                </div>

                <Separator className="w-full bg-border/50 my-6" />

                <div className="space-y-2 text-left w-full font-code">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Team Distribution:</p>
                      <p className="text-sm text-muted-foreground">{renderFormattedText((event as any).teamDistribution)}</p>
                    </div>
                  </div>
                </div>

                <Separator className="w-full bg-border/50 my-6" />

                <div className="space-y-2 text-left w-full font-code">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Timeline:</p>
                      <p className="text-sm text-muted-foreground">{renderFormattedText((event as any).timeline)}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-2xl font-headline text-secondary mb-4">[ Rounds ]</h2>
                  <p className="text-foreground/80 leading-relaxed">{renderFormattedText(event.rounds)}</p>
                </div>
                <Separator className="bg-border/30" />
                <div>
                  <h2 className="text-2xl font-headline text-secondary mb-4">[ Rules ]</h2>
                  <ul className="space-y-3 list-decimal list-inside text-foreground/80 leading-relaxed">
                    {renderRules(event.rules)}
                  </ul>
                </div>
                <Separator className="bg-border/30" />
                <div>
                  <h2 className="text-2xl font-headline text-secondary mb-4">[ Event Combos ]</h2>
                  <p className="text-foreground/80 leading-relaxed">{(event as any).combos}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}