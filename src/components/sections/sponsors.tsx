import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent } from '@/components/ui/card';

const sponsors = ['Company A', 'Company B', 'Company C'];

export default function Sponsors() {
  return (
    <AnimatedSection id="sponsors" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Sponsors</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            We are proud to be supported by these innovative companies.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sponsors.map((name) => (
            <div key={name} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Card className="relative bg-card h-full flex items-center justify-center">
                <CardContent className="p-6">
                  <p className="text-2xl font-bold text-center text-foreground">{name}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
