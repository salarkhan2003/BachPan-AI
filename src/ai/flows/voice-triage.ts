// 'use server';
/**
 * @fileOverview Implements voice-based symptom triage for PulseCare AI, providing potential causes and recommended actions based on spoken symptoms.
 *
 * - voiceTriage - A function that processes spoken symptoms and returns potential causes and actions.
 * - VoiceTriageInput - The input type for the voiceTriage function.
 * - VoiceTriageOutput - The return type for the voiceTriage function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceTriageInputSchema = z.object({
  symptom: z
    .string()
    .describe('The symptom described by the parent, using voice input.'),
  isOnline: z
    .boolean()
    .describe(
      'Whether the device is currently online. Determines the depth of analysis.'
    ),
});
export type VoiceTriageInput = z.infer<typeof VoiceTriageInputSchema>;

const VoiceTriageOutputSchema = z.object({
  potentialCauses: z
    .array(z.string())
    .describe('A list of potential causes for the symptom.'),
  recommendedActions: z
    .array(z.string())
    .describe('Recommended actions for the parent to take.'),
  analysisDepth: z
    .string()
    .describe('The depth of the analysis, either "offline" or "online".'),
});
export type VoiceTriageOutput = z.infer<typeof VoiceTriageOutputSchema>;

export async function voiceTriage(input: VoiceTriageInput): Promise<VoiceTriageOutput> {
  return voiceTriageFlow(input);
}

const voiceTriagePrompt = ai.definePrompt({
  name: 'voiceTriagePrompt',
  input: {schema: VoiceTriageInputSchema},
  output: {schema: VoiceTriageOutputSchema},
  prompt: `You are a helpful AI assistant for parents. A parent will describe a symptom their baby is experiencing.

You will provide a list of potential causes for the symptom, and a list of recommended actions for the parent to take.

Consider the isOnline parameter when providing your response. If the device is online, you can provide a more detailed analysis and recommendations.

Symptom: {{{symptom}}}
Is Online: {{{isOnline}}}

Output the potential causes and recommended actions in JSON format:

Potential Causes:

Recommended Actions: `,
});

const voiceTriageFlow = ai.defineFlow(
  {
    name: 'voiceTriageFlow',
    inputSchema: VoiceTriageInputSchema,
    outputSchema: VoiceTriageOutputSchema,
  },
  async input => {
    const {output} = await voiceTriagePrompt(input);
    return {
      ...output!,
      analysisDepth: input.isOnline ? 'online' : 'offline',
    };
  }
);
