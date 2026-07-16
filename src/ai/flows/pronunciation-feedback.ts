'use server';

/**
 * @fileOverview Provides AI-powered feedback on Sherpa pronunciation.
 *
 * - getPronunciationFeedback - A function that analyzes pronunciation and provides feedback.
 * - PronunciationFeedbackInput - The input type for the getPronunciationFeedback function.
 * - PronunciationFeedbackOutput - The return type for the getPronunciationFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const PronunciationFeedbackInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'The audio data URI of the user speaking, must include MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  textToPronounce: z.string().describe('The Sherpa text the user is pronouncing.'),
});
export type PronunciationFeedbackInput = z.infer<typeof PronunciationFeedbackInputSchema>;

const PronunciationFeedbackOutputSchema = z.object({
  score: z
    .number()
    .describe('A score from 0 to 1 indicating the accuracy of the pronunciation.'),
  feedback: z
    .string()
    .describe('Specific areas for improvement to achieve a more native-like Sherpa pronunciation.'),
});
export type PronunciationFeedbackOutput = z.infer<typeof PronunciationFeedbackOutputSchema>;

export async function getPronunciationFeedback(
  input: PronunciationFeedbackInput
): Promise<PronunciationFeedbackOutput> {
  return pronunciationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pronunciationFeedbackPrompt',
  input: {schema: PronunciationFeedbackInputSchema},
  output: {schema: PronunciationFeedbackOutputSchema},
  prompt: `You are an expert Sherpa language tutor providing feedback on pronunciation.

You will analyze the user's pronunciation of the Sherpa text provided and provide a score and specific areas for improvement.

Text to pronounce: {{{textToPronounce}}}
Audio: {{media url=audioDataUri}}.

Score (0-1): the score of the user pronunciation, from 0 being completely wrong to 1 being perfect native pronunciation.
Feedback: specific areas for improvement to achieve a more native-like Sherpa pronunciation.`,
});

const pronunciationFeedbackFlow = ai.defineFlow(
  {
    name: 'pronunciationFeedbackFlow',
    inputSchema: PronunciationFeedbackInputSchema,
    outputSchema: PronunciationFeedbackOutputSchema,
  },
  async input => {
    // Consider converting audio to WAV if not already in that format for better compatibility.
    // You may also want to process the audio (e.g., noise reduction) to improve accuracy.
    const {output} = await prompt(input);
    return output!;
  }
);
