import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { AnimatedSection } from '@/components/ui/animated-section';
import { AIGenerator } from '@/components/ai-generator';
import { Badge } from '@/components/ui/badge';

const events = [
  {
    title: 'Global AI Summit 2024',
    date: 'October 26-28, 2024',
    description: 'Join the world\'s leading AI experts for three days of groundbreaking talks, workshops, and networking opportunities.',
    image: PlaceHolderImages.find(img => img.id === 'event1'),
    tags: ['Conference', 'AI', 'Networking']
  },
  {
    title: 'ML Ops Deep Dive',
    date: 'November 12, 2024',
    description: 'A one-day intensive workshop focused on the practical aspects of deploying, monitoring, and maintaining machine learning models.',
    image: PlaceHolderImages.find(img => img.id === 'event2'),
    tags: ['Workshop', 'ML Ops', 'Deep Learning']
  },
  {
    title: 'InnovateAI Hackathon',
    date: 'December 1-3, 2024',
    description: 'A 48-hour hackathon to build the next generation of AI-powered applications. Prizes, mentorship, and fun guaranteed.',
    image: PlaceHolderImages.find(img => img.id === 'event3'),
    tags: ['Hackathon', 'Competition', 'Development']
  }
].filter(event => event.image) as Array<{ title: string; date: string; description: string; image: ImagePlaceholder; tags: string[] }>;


export default function Events() {
  return (
    <AnimatedSection id="events" className="py-20 md:py-32 bg-card">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Upcoming Events</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Explore our curated list of events. Don't forget to use our AI tool to generate catchy descriptions for your own events!
          </p>
          <AIGenerator />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="flex flex-col bg-background/50 border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image.imageUrl}
                    alt={event.description}
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint={event.image.imageHint}
                  />
                </div>
                <CardTitle className="pt-4 font-headline">{event.title}</CardTitle>
                <div className="text-sm text-muted-foreground">{event.date}</div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{event.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {event.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Know More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
