import { technicalEvents, nonTechnicalEvents } from '../page';
import { EventIcon, type IconName } from '@/components/ui/event-icon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Phone, Users, Calendar } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { NetworkBackground } from '@/components/ui/network-background';

const allEvents = [...technicalEvents, ...nonTechnicalEvents];

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = allEvents.find((e) => e.slug === params.slug);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center text-center">
            <div className="relative z-10">
                <h1 className="text-4xl font-headline text-destructive">[ 404: MISSION NOT FOUND ]</h1>
                <p className="text-foreground/80 mt-4">The requested event data could not be retrieved from the archives.</p>
            </div>
            <NetworkBackground />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow relative overflow-hidden py-16 md:py-24">
            <NetworkBackground />
            <div className="container relative z-10">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-1 bg-card/50 backdrop-blur-sm border border-secondary/20 p-8 flex flex-col items-center text-center">
                        <div className="mb-4">
                            <EventIcon name={event.icon as IconName} className="w-24 h-24 text-primary" />
                        </div>
                        <h1 className="text-4xl font-headline font-bold text-foreground mb-6">{event.name}</h1>
                        
                        <div className="flex justify-around w-full mb-6 text-center">
                            <div>
                                <p className="text-lg font-semibold">{event.mode}</p>
                                <p className="text-sm text-muted-foreground">Location</p>
                            </div>
                            <div className="border-l border-border h-10"></div>
                            <div>
                                <p className="text-lg font-semibold">{event.price}</p>
                                <p className="text-sm text-muted-foreground">Price</p>
                            </div>
                        </div>

                        <Button size="lg" className="w-full font-bold font-headline tracking-widest border-2 border-primary text-primary-foreground bg-primary hover:bg-primary/90 hover:shadow-[0_0_25px_theme(colors.primary)] transition-all duration-300 mb-8">
                            [ REGISTER ]
                        </Button>
                        
                        <Separator className="w-full bg-border/50 mb-6" />

                        <div className="space-y-4 text-left w-full font-code">
                            {event.contacts.map(contact => (
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
                                    <p className="text-sm text-muted-foreground">{event.teamDistribution}</p>
                                </div>
                            </div>
                        </div>

                         <Separator className="w-full bg-border/50 my-6" />

                        <div className="space-y-2 text-left w-full font-code">
                             <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-primary" />
                                <div>
                                    <p className="font-semibold text-sm">Timeline:</p>
                                    <p className="text-sm text-muted-foreground">{event.timeline}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-headline text-secondary mb-4">[ Rounds ]</h2>
                            <p className="text-foreground/80 leading-relaxed">{event.rounds}</p>
                        </div>
                         <Separator className="bg-border/30" />
                        <div>
                            <h2 className="text-2xl font-headline text-secondary mb-4">[ Rules ]</h2>
                            <ul className="space-y-3 list-decimal list-inside text-foreground/80 leading-relaxed">
                                {event.rules.map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ul>
                        </div>
                         <Separator className="bg-border/30" />
                        <div>
                            <h2 className="text-2xl font-headline text-secondary mb-4">[ Event Combos ]</h2>
                            <p className="text-foreground/80 leading-relaxed">{event.combos}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
}
