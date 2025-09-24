import { AnimatedSection } from '@/components/ui/animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Counter } from '@/components/ui/counter';

const stats = [
  { value: '13', label: 'MISSIONS' },
  { value: '300', label: 'OPERATIVES' },
  { value: '8000', label: 'NETWORK AGENTS' },
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
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary tracking-widest">[ THE DEBRIEF ]</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-background/50 border border-secondary/20 p-6 backdrop-blur-sm">
                    <h3 className="text-5xl font-bold text-secondary font-headline">
                      <Counter value={parseInt(stat.value)} />
                      {stat.label === 'NETWORK AGENTS' ? '+' : ''}
                    </h3>
                    <p className="text-primary/80 mt-2 font-code tracking-widest">{stat.label}</p>
                </div>
            ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-lg text-foreground/90 mb-20 space-y-4 font-code">
            <p>// PULZION IS THE ANNUAL FLAGSHIP EVENT ORGANIZED BY THE PICT ACM STUDENT CHAPTER (PASC). IT COMPRISES MULTIPLE EVENTS IN TECHNICAL AND NON-TECHNICAL DOMAINS, INCLUDING CODING COMPETITIONS, MOCK PLACEMENT INTERVIEWS, BUSINESS MANAGEMENT-BASED EVENTS, DESIGN AND DEVELOPMENT CONTESTS, AND QUIZZING EVENTS.</p>
            <p>// IT IS ONE OF THE MOST ANTICIPATED EVENTS AT PICT. THIS YEAR, PULZION IS GOING GLOBAL TO ENCOURAGE STUDENTS OF VARIED BACKGROUNDS TO PARTICIPATE AND COMPETE. WITH SINCERITY, DEDICATION, AND HIGH ASPIRATIONS, OUR CHAPTER HOPES TO ADD VALUE TO OUR COLLEGE AND THE COMMUNITY.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizations.map((org) => (
                <Card key={org.title} className="bg-background/50 border-secondary/20 hover:border-secondary/50 transition-all duration-300 group transform hover:-translate-y-2 backdrop-blur-sm overflow-hidden">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl text-center group-hover:text-secondary transition-colors">{org.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/80 text-center font-code text-sm">{org.description}</p>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </Card>
            ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
