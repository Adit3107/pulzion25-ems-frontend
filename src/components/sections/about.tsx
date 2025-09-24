import { AnimatedSection } from '@/components/ui/animated-section';
import { Counter } from '@/components/ui/counter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typewriter } from '@/components/ui/typewriter';

const stats = [
  { value: '13', label: 'ACTIVE MISSIONS' },
  { value: '300', label: 'REGISTERED OPERATIVES' },
  { value: '8000', label: 'NETWORK AGENTS', suffix: '+' },
];

const organizations = [
    {
        id: 'pasc',
        title: 'PASC',
        description: 'PICT ACM Student\'s Chapter (PASC) is the most active ACM chapter in India. #UnitedWeStand At PASC, we all work together, as a team. We take utmost efforts for the success of each and every member of PASC.',
    },
    {
        id: 'acm-w',
        title: 'ACM-W',
        description: 'With the objective to support and celebrate the full engagement of women in all aspects of computing field, we conducted an event ACM Pune \'Celebration of Women in Computing\' (APCWIC-2018) in association with ACM-W India and ACM Pune Professional Chapter.',
    },
    {
        id: 'acm',
        title: 'ACM',
        description: 'The Association for Computing Machinery (ACM) is the world\'s largest educational and scientific society uniting professionals, educators and researchers in the field of computer science to inspire dialogue, share resources and address the challenges in the domain.',
    }
];

export default function About() {
  return (
    <AnimatedSection id="about" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary tracking-widest">[ THE DEBRIEF ]</h2>
        </div>

        <div className="bg-background/50 border border-primary/20 p-6 md:p-8 backdrop-blur-sm font-code text-base md:text-lg mb-16">
            <div className='border-b-2 border-dashed border-primary/30 pb-4 mb-4'>
                <p className="text-primary"><Typewriter text="> STATUS: SYNCING MISSION DATA..." delay={20} /></p>
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-baseline">
                        <p className="text-foreground/80">{`> ${stat.label.padEnd(25, '.')}`}</p>
                        <span className="text-2xl font-bold text-secondary font-headline ml-2">
                           <Counter value={parseInt(stat.value)} />
                           {stat.suffix || ''}
                        </span>
                    </div>
                ))}
            </div>
            <div className="space-y-2 text-foreground/90">
                <p><Typewriter text="// LOG_ENTRY_01: PULZION IS THE ANNUAL FLAGSHIP EVENT ORGANIZED BY THE PICT ACM STUDENT CHAPTER (PASC). IT COMPRISES MULTIPLE EVENTS IN TECHNICAL AND NON-TECHNICAL DOMAINS, INCLUDING CODING COMPETITIONS, MOCK PLACEMENT INTERVIEWS, BUSINESS MANAGEMENT-BASED EVENTS, DESIGN AND DEVELOPMENT CONTESTS, AND QUIZZING EVENTS." delay={5} /></p>
                <p><Typewriter text="// LOG_ENTRY_02: IT IS ONE OF THE MOST ANTICIPATED EVENTS AT PICT. THIS YEAR, PULZION IS GOING GLOBAL TO ENCOURAGE STUDENTS OF VARIED BACKGROUNDS TO PARTICIPATE AND COMPETE. WITH SINCERITY, DEDICATION, AND HIGH ASPIRATIONS, OUR CHAPTER HOPES TO ADD VALUE TO OUR COLLEGE AND THE COMMUNITY." delay={5} startDelay={1000} /></p>
            </div>
        </div>

        <Tabs defaultValue="pasc" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                {organizations.map(org => (
                    <TabsTrigger key={org.id} value={org.id}>[ {org.title} ]</TabsTrigger>
                ))}
            </TabsList>
            {organizations.map(org => (
                 <TabsContent key={org.id} value={org.id}>
                    <div className="p-6 bg-background/50 border border-primary/20 backdrop-blur-sm mt-4">
                        <p className="text-foreground/80 text-center font-code text-sm md:text-base">{org.description}</p>
                    </div>
                </TabsContent>
            ))}
        </Tabs>
      </div>
    </AnimatedSection>
  );
}
