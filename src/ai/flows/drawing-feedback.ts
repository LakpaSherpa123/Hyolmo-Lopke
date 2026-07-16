'use server';

/**
 * @fileOverview Provides AI-powered feedback on Sherpa character drawing.
 *
 * - getDrawingFeedback - A function that analyzes a user's drawing and provides feedback.
 * - DrawingFeedbackInput - The input type for the getDrawingFeedback function.
 * - DrawingFeedbackOutput - The return type for the getDrawingFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DrawingFeedbackInputSchema = z.object({
  userDrawingDataUri: z
    .string()
    .describe(
      "The user's drawing of the character, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>."
    ),
  characterToDraw: z.string().describe('The Sherpa character the user was supposed to draw.'),
});
export type DrawingFeedbackInput = z.infer<typeof DrawingFeedbackInputSchema>;

const DrawingFeedbackOutputSchema = z.object({
  score: z
    .number()
    .describe('A score from 0 to 1 indicating how accurately the user drew the character. 1 is a perfect match.'),
  feedback: z
    .string()
    .describe('Specific, constructive feedback on how to improve the drawing of the character. Focus on stroke order, proportions, and overall shape.'),
});
export type DrawingFeedbackOutput = z.infer<typeof DrawingFeedbackOutputSchema>;

export async function getDrawingFeedback(
  input: DrawingFeedbackInput
): Promise<DrawingFeedbackOutput> {
  return drawingFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'drawingFeedbackPrompt',
  input: {schema: DrawingFeedbackInputSchema},
  output: {schema: DrawingFeedbackOutputSchema},
  prompt: `You are an expert calligrapher and tutor for the Sherpa language script. Your task is to analyze a user's attempt at drawing a Sherpa character and provide feedback.

The user was asked to draw the character: '{{{characterToDraw}}}'

Here is the user's drawing:
{{media url=userDrawingDataUri}}

Please provide a score from 0 (completely incorrect) to 1 (a perfect representation) and constructive feedback. The feedback should be concise and helpful, focusing on aspects like stroke order, proportions, and the overall shape of the character.`,
});

const drawingFeedbackFlow = ai.defineFlow(
  {
    name: 'drawingFeedbackFlow',
    inputSchema: DrawingFeedbackInputSchema,
    outputSchema: DrawingFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
