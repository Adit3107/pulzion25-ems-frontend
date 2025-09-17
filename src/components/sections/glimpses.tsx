import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/ui/animated-section';

const galleryImages = [
  PlaceHolderImages.find(img => img.id === 'gallery1'),
  PlaceHolderImages.find(img => img.id === 'gallery2'),
  PlaceHolderImages.find(img => img.id === 'gallery3'),
  PlaceHolderImages.find(img => img.id === 'gallery4'),
  PlaceHolderImages.find(img => img.id === 'gallery5'),
  PlaceHolderImages.find(img => img.id === 'gallery6'),
  PlaceHolderImages.find(img => img.id === 'gallery7'),
  PlaceHolderImages.find(img => img.id === 'gallery8'),
].filter(Boolean) as ImagePlaceholder[];

export default function Glimpses() {
  return (
    <AnimatedSection id="glimpses" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Glimpses of Pulzion</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            A look back at the moments that made last year's event unforgettable.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={image.imageHint}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
