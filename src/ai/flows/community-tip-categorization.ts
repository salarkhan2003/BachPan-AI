// src/ai/flows/community-tip-categorization.ts
'use server';
/**
 * @fileOverview AI-powered categorization of community tips based on symptoms, age range, and location.
 *
 * - categorizeCommunityTip - A function that categorizes a community tip.
 * - CategorizeCommunityTipInput - The input type for the categorizeCommunityTip function.
 * - CategorizeCommunityTipOutput - The return type for the categorizeCommunityTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeCommunityTipInputSchema = z.object({
  tipText: z.string().describe('The text content of the community tip.'),
  location: z.string().describe('The geographical location relevant to the tip.'),
});
export type CategorizeCommunityTipInput = z.infer<typeof CategorizeCommunityTipInputSchema>;

const CategorizeCommunityTipOutputSchema = z.object({
  symptoms: z.array(z.string()).describe('List of symptoms the tip addresses.'),
  ageRange: z.string().describe('The age range for which the tip is most relevant (e.g., 0-6 months, 6-12 months, 1-3 years).'),
  location: z.string().describe('The geographical location relevant to the tip.'),
  categories: z.array(z.string()).describe('List of categories the tip belongs to (e.g., feeding, sleep, health).'),
});
export type CategorizeCommunityTipOutput = z.infer<typeof CategorizeCommunityTipOutputSchema>;

export async function categorizeCommunityTip(input: CategorizeCommunityTipInput): Promise<CategorizeCommunityTipOutput> {
  return categorizeCommunityTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeCommunityTipPrompt',
  input: {schema: CategorizeCommunityTipInputSchema},
  output: {schema: CategorizeCommunityTipOutputSchema},
  prompt: `You are an expert pediatrician tasked with categorizing community tips provided by parents.

  Given the following community tip, extract the relevant symptoms, age range, location, and categories.

  Tip Text: {{{tipText}}}
  Location: {{{location}}}

  Output the information in a structured JSON format.
  `,
});

const categorizeCommunityTipFlow = ai.defineFlow(
  {
    name: 'categorizeCommunityTipFlow',
    inputSchema: CategorizeCommunityTipInputSchema,
    outputSchema: CategorizeCommunityTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
