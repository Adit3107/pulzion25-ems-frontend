
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const contactDetails = [
    {
        icon: <Phone className="h-6 w-6 text-primary" />,
        title: "Harsha Pareek:",
        text: "(+91) 93226 78365",
    },
    {
        icon: <Phone className="h-6 w-6 text-primary" />,
        title: "Aashlesh Wawge:",
        text: "(+91) 94203 24148",
    },
    {
        icon: <Mail className="h-6 w-6 text-primary" />,
        title: "Email:",
        text: "acm.pict@gmail.com",
    },
    {
        icon: <MapPin className="h-6 w-6 text-primary" />,
        title: "Address:",
        text: "Pune Institute of Computer Technology, Behind Bharati Vidyapeeth, Dhankawadi, Pune, Maharashtra-411043",
    },
];

const socialLinks = [
    { icon: <Facebook className="h-6 w-6" />, href: "#" },
    { icon: <Instagram className="h-6 w-6" />, href: "#" },
    { icon: <Linkedin className="h-6 w-6" />, href: "#" },
    { icon: <Twitter className="h-6 w-6" />, href: "#" },
];

export default function Contact() {
  return (
    <AnimatedSection id="contact" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">Contact Us</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-card/50 border-primary/20 backdrop-blur-sm p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              {contactDetails.map((detail, index) => (
                <div key={index} className="flex items-start gap-4">
                  {detail.icon}
                  <div>
                    <h4 className="font-semibold">{detail.title}</h4>
                    <p className="text-foreground/80">{detail.text}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-primary/20 backdrop-blur-sm p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-headline text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" className="bg-background/50"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your Email" className="bg-background/50"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your Message" className="bg-background/50" rows={4}/>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-bold hover:opacity-90 transition-opacity">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-20">
          <h3 className="text-2xl font-headline font-bold mb-6">Follow Us</h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors duration-300">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
