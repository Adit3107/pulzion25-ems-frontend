import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnimatedSection } from '@/components/ui/animated-section';

const faqs = [
  {
    question: 'What is the AI GridLock Portal?',
    answer: 'It is a premier event for AI enthusiasts, professionals, and researchers to explore the latest trends and innovations in artificial intelligence.',
  },
  {
    question: 'Who should attend?',
    answer: 'Anyone with an interest in AI, including developers, data scientists, researchers, students, and business leaders.',
  },
  {
    question: 'How can I register for an event?',
    answer: 'You can register for any event by clicking the "Register Now" or "Know More" buttons on the event cards. This will redirect you to the registration page.',
  },
  {
    question: 'Is there a code of conduct?',
    answer: 'Yes, we are committed to providing a safe and welcoming environment for all participants. You can find our full code of conduct on the event details page.',
  },
  {
    question: 'Can I become a sponsor?',
    answer: 'Absolutely! We have various sponsorship packages available. Please contact us through the "Sponsor" section for more information.',
  },
];

export default function Faq() {
  return (
    <AnimatedSection id="faq" className="py-20 md:py-32">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Frequently Asked Questions</h2>
          <p className="text-foreground/80">
            Find answers to common questions about our events and platform.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-primary/20">
              <AccordionTrigger className="font-headline text-lg hover:no-underline text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AnimatedSection>
  );
}
