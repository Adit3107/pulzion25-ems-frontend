import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Interactive3D } from '@/components/ui/interactive-3d';

export default function Hero() {
  return (
    <AnimatedSection id="home" className="container grid lg:grid-cols-2 gap-10 items-center py-20 md:py-32">
      <div className="space-y-6 text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          AI GridLock Portal
        </h1>
        <p className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground md:text-xl">
          Experience the future. A symposium of innovation, where the brightest minds in artificial intelligence converge to shape tomorrow's world.
        </p>
        <div className="space-x-4">
          <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-secondary))] text-accent-foreground font-bold hover:opacity-90 transition-opacity">
            Register for Event
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
      <div className="relative w-full h-96 lg:h-[500px]">
        <Interactive3D />
      </div>
    </AnimatedSection>
  );
}
