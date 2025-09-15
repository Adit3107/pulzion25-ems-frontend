"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateEventDescription } from '@/ai/flows/generate-event-description';
import { Loader2, Wand2, Copy } from 'lucide-react';
import { Label } from './ui/label';

const formSchema = z.object({
  eventName: z.string().min(2, 'Event name must be at least 2 characters.'),
  eventDetails: z.string().min(10, 'Please provide more details about the event.'),
  targetAudience: z.string().min(2, 'Target audience must be at least 2 characters.'),
});

export function AIGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: '',
      eventDetails: '',
      targetAudience: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setGeneratedDescription('');
    try {
      const result = await generateEventDescription(values);
      setGeneratedDescription(result.description);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error generating description',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  }
  
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedDescription);
      toast({
        title: 'Copied to clipboard!',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-secondary))] text-accent-foreground font-bold hover:opacity-90 transition-opacity">
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Event Description
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2"><Wand2 /> AI Description Generator</DialogTitle>
          <DialogDescription>
            Fill in the details below and let our AI craft the perfect, catchy description for your event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Global AI Summit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Date, time, location, main activities, speakers..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Developers, researchers, entrepreneurs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isGenerating} className="w-full">
              {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 'Generate'}
            </Button>
          </form>
        </Form>
        {generatedDescription && (
          <div className="mt-6 space-y-2">
            <Label>Generated Description</Label>
            <div className="relative">
              <Textarea readOnly value={generatedDescription} className="pr-10 bg-background" rows={5}/>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
