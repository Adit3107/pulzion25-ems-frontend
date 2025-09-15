import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/ui/animated-section';

const sponsors = [
  PlaceHolderImages.find(img => img.id === 'sponsor1'),
  PlaceHolderImages.find(img => img.id === 'sponsor2'),
  PlaceHolderImages.find(img => img.id === 'sponsor3'),
  PlaceHolderImages.find(img => img.id === 'sponsor4'),
  PlaceHolderImages.find(img => img.id === 'sponsor5'),
  PlaceHolderImages.find(img => img.id === 'sponsor6'),
].filter(Boolean) as ImagePlaceholder[];

export default function Sponsors() {
  return (
    <AnimatedSection id="sponsors" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Our Sponsors</h2>
          <p className="text-foreground/80">
            We are proud to be supported by these innovative companies.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="relative h-16 w-40 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={sponsor.imageUrl}
                alt={sponsor.description}
                fill
                className="object-contain"
                data-ai-hint={sponsor.imageHint}
              />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
