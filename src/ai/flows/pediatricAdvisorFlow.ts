
'use server';
/**
 * @fileOverview AI-powered pediatric advisor.
 *
 * - pediatricAdvisor - A function that answers user questions about baby care.
 * - PediatricAdvisorInput - The input type for the pediatricAdvisor function.
 * - PediatricAdvisorOutput - The return type for the pediatricAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PediatricAdvisorInputSchema = z.object({
  question: z.string().describe('The user\'s question about baby care, feeding, sleep, common ailments, etc.'),
});
export type PediatricAdvisorInput = z.infer<typeof PediatricAdvisorInputSchema>;

const PediatricAdvisorOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type PediatricAdvisorOutput = z.infer<typeof PediatricAdvisorOutputSchema>;

export async function pediatricAdvisor(input: PediatricAdvisorInput): Promise<PediatricAdvisorOutput> {
  return pediatricAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pediatricAdvisorPrompt',
  input: {schema: PediatricAdvisorInputSchema},
  output: {schema: PediatricAdvisorOutputSchema},
  prompt: `You are BachpanAI, a friendly and knowledgeable AI Pediatric Advisor.
  Your goal is to provide helpful and supportive guidance to parents regarding baby care, feeding, sleep, common ailments, developmental milestones, and other related topics.
  Always remind the user that your advice is for informational purposes only and not a substitute for professional medical advice from a qualified doctor.
  Keep your answers concise, empathetic, and easy to understand.

  User's question: {{{question}}}

  Provide your answer.
  `,
});

const pediatricAdvisorFlow = ai.defineFlow(
  {
    name: 'pediatricAdvisorFlow',
    inputSchema: PediatricAdvisorInputSchema,
    outputSchema: PediatricAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
