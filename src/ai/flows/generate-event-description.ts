'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating concise and engaging event descriptions using AI.
 *
 * It includes:
 * - generateEventDescription - A function that takes event details as input and returns a generated description.
 * - GenerateEventDescriptionInput - The input type for the generateEventDescription function.
 * - GenerateEventDescriptionOutput - The return type for the generateEventDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventDescriptionInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventDetails: z.string().describe('Key details about the event, including the date, time, location, and main activities.'),
  targetAudience: z.string().describe('The target audience for the event.'),
});
export type GenerateEventDescriptionInput = z.infer<typeof GenerateEventDescriptionInputSchema>;

const GenerateEventDescriptionOutputSchema = z.object({
  description: z.string().describe('A concise and engaging description of the event.'),
});
export type GenerateEventDescriptionOutput = z.infer<typeof GenerateEventDescriptionOutputSchema>;

export async function generateEventDescription(input: GenerateEventDescriptionInput): Promise<GenerateEventDescriptionOutput> {
  return generateEventDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventDescriptionPrompt',
  input: {schema: GenerateEventDescriptionInputSchema},
  output: {schema: GenerateEventDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating engaging event descriptions.

  Based on the following event details, generate a concise and engaging description of the event that will attract the target audience.

  Event Name: {{{eventName}}}
  Event Details: {{{eventDetails}}}
  Target Audience: {{{targetAudience}}}

  Focus on brevity and impact, aiming for a short summary that informs and excites potential attendees.
  `,
});

const generateEventDescriptionFlow = ai.defineFlow(
  {
    name: 'generateEventDescriptionFlow',
    inputSchema: GenerateEventDescriptionInputSchema,
    outputSchema: GenerateEventDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
