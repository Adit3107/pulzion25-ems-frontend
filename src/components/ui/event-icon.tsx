import { Code, TestTube, Search, Tv, Cpu, Briefcase, Lightbulb, FileText, BrainCircuit, LineChart, MessageSquare, Building, Feather, Camera, Gamepad2 } from "lucide-react";

export type IconName = 
  | 'codex' | 'codelicious' | 'compute' | 'dataquest' | 'webapp' 
  | 'electroquest' | 'hirehustle' | 'dextrous' | 'paper' | 'innowave'
  | 'quiz' | 'bplan' | 'wallstreet' | 'panel' | 'fandom' | 'insight' | 'freeze';

const CodeliciousIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.2 2.2c.2-.5.5-.9.9-1.1.4-.3.9-.4 1.4-.4.5 0 1 .1 1.4.4.4.3.7.7.9 1.1l.6 1.6c.1.3.3.6.5.8.2.2.5.4.8.5l1.6.6c.5.2.9.5 1.1.9.3.4.4.9.4 1.4s-.1 1-.4 1.4c-.3.4-.7.7-1.1.9l-1.6.6c-.3.1-.6.3-.8.5-.2.2-.4.5-.5.8l-.6 1.6c-.2.5-.5.9-1 .1-1.1-.3-.4-1-.4-1.4 0-.5.1-1 .4-1.4.2-.4.6-.7.9-1l1.6-.6c.3-.1.5-.3.7-.6.2-.2.3-.5.3-.8l.6-1.6c.1-.5-.1-1-.4-1.3-.3-.3-.8-.4-1.3-.4l-1.6.6c-.3.1-.6.3-.8.5s-.4.5-.5.8l-.6 1.6c-.2.5-.5.9-.9 1.1-.4.3-.9.4-1.4.4s-1-.1-1.4-.4c-.4-.3-.7-.7-.9-1.1l-.6-1.6c-.1-.3-.3-.6-.5-.8-.2-.2-.5-.4-.8-.5l-1.6-.6c-.5-.2-1-.5-1.1-1-.3-.4-.4-.9-.4-1.4s.1-1 .4-1.4c.3-.4.7-.7 1.1-.9l1.6-.6c.3-.1.6-.3.8-.5.2-.2.4-.5.5-.8l.6-1.6z"/>
        <path d="M4.2 12.2c-1.3 1.3-1.3 3.4 0 4.7s3.4 1.3 4.7 0"/>
        <path d="M15.1 12.2c1.3 1.3 1.3 3.4 0 4.7s-3.4 1.3-4.7 0"/>
        <path d="M12 17.5v2.5"/>
        <path d="M9.5 17.5v2.5"/>
        <path d="M14.5 17.5v2.5"/>
    </svg>
);


const icons: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  codex: (props) => <Code {...props} />,
  codelicious: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.2 8.7c.3-.6.9-1.1 1.5-1.4C5.4 7 6.1 6.9 6.8 7c.7.1 1.3.4 1.9.8.5.4.9 1 1.2 1.7" />
        <path d="M5 12v3.8c0 1.4.9 2.6 2.2 3s2.9.1 3.8-.9" />
        <path d="M10.1 12.2a2.4 2.4 0 0 1-1.3-4.3 2.4 2.4 0 0 1 4.3 1.3" />
        <path d="M14 18.2c1 .9 2.5 1.1 3.8.1s2.2-2.6.9-3.8-.5-1-1.2-1.7c-.6-.4-1.2-.7-1.9-.8-.7-.1-1.4 0-2.1.2-.6.3-1.2.8-1.5 1.4" />
        <path d="M14 12v3.8c0 .9-.5 1.6-1.2 2.1s-1.6.5-2.5 0" />
        <path d="M18.8 8.7c-.3-.6-.9-1.1-1.5-1.4-.7-.3-1.4-.4-2.1-.2-.7.1-1.3.4-1.9.8-.5.4-.9 1-1.2 1.7" />
        <path d="M13.2 2.2c.4.2.8.5 1.1 1s.5.9.6 1.4c.1.5.1 1.1-.1 1.6-.2.5-.5.9-.9 1.3-.4.3-.9.6-1.4.8" />
        <path d="M11 2.2c-.4.2-.8.5-1.1 1s-.5.9-.6 1.4c-.1.5-.1 1.1.1 1.6.2.5.5.9.9 1.3.4.3.9.6 1.4.8" />
    </svg>
  ),
  compute: (props) => <Cpu {...props} />,
  dataquest: (props) => <Search {...props} />,
  webapp: (props) => <Tv {...props} />,
  electroquest: (props) => <TestTube {...props} />,
  hirehustle: (props) => <Briefcase {...props} />,
  dextrous: (props) => <Lightbulb {...props} />,
  paper: (props) => <FileText {...props} />,
  innowave: (props) => <BrainCircuit {...props} />,
  quiz: (props) => <MessageSquare {...props} />,
  bplan: (props) => <Building {...props} />,
  wallstreet: (props) => <LineChart {...props} />,
  panel: (props) => <Code {...props} />,
  fandom: (props) => <Gamepad2 {...props} />,
  insight: (props) => <Feather {...props} />,
  freeze: (props) => <Camera {...props} />,
};

interface EventIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export function EventIcon({ name, ...props }: EventIconProps) {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
}
