'use server';

/**
 * @fileOverview Rash analysis AI agent.
 *
 * - rashAnalysis - A function that handles the rash analysis process.
 * - RashAnalysisInput - The input type for the rashAnalysis function.
 * - RashAnalysisOutput - The return type for the rashAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RashAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a rash, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' /* base64 string */
    ),
});
export type RashAnalysisInput = z.infer<typeof RashAnalysisInputSchema>;

const RashAnalysisOutputSchema = z.object({
  possibleConditions: z
    .array(z.string())
    .describe('A list of possible skin conditions.'),
  recommendedNextSteps: z
    .string()
    .describe('Recommended next steps for the user.'),
});
export type RashAnalysisOutput = z.infer<typeof RashAnalysisOutputSchema>;

export async function rashAnalysis(input: RashAnalysisInput): Promise<RashAnalysisOutput> {
  return rashAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rashAnalysisPrompt',
  input: {schema: RashAnalysisInputSchema},
  output: {schema: RashAnalysisOutputSchema},
  prompt: `You are a pediatric dermatologist specializing in diagnosing skin conditions from images.

You will use the image to identify possible skin conditions and recommend next steps for the user.

Analyze the following image of a rash:

{{media url=photoDataUri}}

Based on the image, provide a list of possible skin conditions and recommend next steps for the user.

Ensure that the output is in JSON format.`, // Ensure that the output is in JSON format.
});

const rashAnalysisFlow = ai.defineFlow(
  {
    name: 'rashAnalysisFlow',
    inputSchema: RashAnalysisInputSchema,
    outputSchema: RashAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
