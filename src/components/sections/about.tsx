import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { value: '13', label: 'Events' },
  { value: '300', label: 'Volunteers' },
  { value: '8,000', label: 'Footfall' },
];

const organizations = [
    {
        title: 'PASC',
        description: 'PICT ACM Student\'s Chapter (PASC) is the most active ACM chapter in India. #UnitedWeStand At PASC, we all work together, as a team. We take utmost efforts for the success of each and every member of PASC.',
    },
    {
        title: 'ACM-W',
        description: 'With the objective to support and celebrate the full engagement of women in all aspects of computing field, we conducted an event ACM Pune \'Celebration of Women in Computing\' (APCWIC-2018) in association with ACM-W India and ACM Pune Professional Chapter.',
    },
    {
        title: 'ACM',
        description: 'The Association for Computing Machinery (ACM) is the world\'s largest educational and scientific society uniting professionals, educators and researchers in the field of computer science to inspire dialogue, share resources and address the challenges in the domain.',
    }
]

export default function About() {
  return (
    <AnimatedSection id="about" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">About Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-card/50 border border-primary/20 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-5xl font-bold text-primary">{stat.value}</h3>
                    <p className="text-muted-foreground mt-2">{stat.label}</p>
                </div>
            ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-lg text-foreground/90 mb-20 space-y-4">
            <p>Pulzion is the annual flagship event organized by PICT ACM Student Chapter (PASC). Pulzion consists of multiple events in technical as well as non-technical domains includes coding competitions, mock placement interviews, business management-based events, design and development-based contests, and quizzing events.</p>
            <p>It is one of the most anticipated events taking place at PICT. This year, Pulzion is going global to encourage students of varied backgrounds to participate and compete. With sincerity, dedication, and high aspirations, our chapter hopes to add value to our college and the community.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizations.map((org) => (
                <Card key={org.title} className="bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 group transform hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl text-center group-hover:text-primary transition-colors">{org.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-center">{org.description}</p>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </Card>
            ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
