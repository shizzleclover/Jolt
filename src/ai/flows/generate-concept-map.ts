'use server';

/**
 * @fileOverview Concept map generator AI agent.
 *
 * - generateConceptMap - A function that handles the concept map generation process.
 * - GenerateConceptMapInput - The input type for the generateConceptMap function.
 * - GenerateConceptMapOutput - The return type for the generateConceptMap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConceptMapInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of notes, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateConceptMapInput = z.infer<typeof GenerateConceptMapInputSchema>;

const GenerateConceptMapOutputSchema = z.object({
  conceptMap: z.string().describe('A concept map generated from the notes.'),
});
export type GenerateConceptMapOutput = z.infer<typeof GenerateConceptMapOutputSchema>;

export async function generateConceptMap(input: GenerateConceptMapInput): Promise<GenerateConceptMapOutput> {
  return generateConceptMapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConceptMapPrompt',
  input: {schema: GenerateConceptMapInputSchema},
  output: {schema: GenerateConceptMapOutputSchema},
  prompt: `You are an expert note taker. You will receive a photo of notes, and you will respond with a concept map of the notes.\n\nUse the following as the primary source of information about the plant.\n\nPhoto: {{media url=photoDataUri}}`,
});

const generateConceptMapFlow = ai.defineFlow(
  {
    name: 'generateConceptMapFlow',
    inputSchema: GenerateConceptMapInputSchema,
    outputSchema: GenerateConceptMapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
