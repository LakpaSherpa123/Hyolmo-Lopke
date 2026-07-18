'use server';

/**
 * @fileOverview AI Copilot for contributors to generate script drafts.
 * 
 * - suggestScripts - Takes a Hyolmo phrase (in Devanagari) and suggests Tibetan script and Romanization.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslationCopilotInputSchema = z.object({
  hyolmoDevanagari: z.string().describe('The Hyolmo phrase written in Devanagari script.'),
});
export type TranslationCopilotInput = z.infer<typeof TranslationCopilotInputSchema>;

const TranslationCopilotOutputSchema = z.object({
  tibetanScript: z.string().describe('The equivalent phrase in Tibetan (Sambhota) script.'),
  romanization: z.string().describe('A phonetic English Romanization for learners.'),
});
export type TranslationCopilotOutput = z.infer<typeof TranslationCopilotOutputSchema>;

export async function suggestScripts(input: TranslationCopilotInput): Promise<TranslationCopilotOutput> {
  return translationCopilotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translationCopilotPrompt',
  input: {schema: TranslationCopilotInputSchema},
  output: {schema: TranslationCopilotOutputSchema},
  prompt: `You are an expert linguist specializing in the Hyolmo language of Nepal.
A contributor has provided a phrase in Devanagari script.
Phrase: "{{{hyolmoDevanagari}}}"

Please provide:
1. The standard Tibetan (Sambhota) script for this phrase.
2. A clean, phonetic English Romanization (using dashes to separate syllables if necessary, e.g., "ta-shi de-lek").

Be precise and follow standard transliteration rules for Himalayan languages.`,
});

const translationCopilotFlow = ai.defineFlow(
  {
    name: 'translationCopilotFlow',
    inputSchema: TranslationCopilotInputSchema,
    outputSchema: TranslationCopilotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
