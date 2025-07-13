// Summarize Text Explanation Flow
'use server';

/**
 * @fileOverview Generates an AI-powered explanation of why an answer to a quiz question is correct or incorrect.
 *
 * - generateAnswerExplanation - A function that generates the explanation.
 * - GenerateAnswerExplanationInput - The input type for the generateAnswerExplanation function.
 * - GenerateAnswerExplanationOutput - The return type for the generateAnswerExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnswerExplanationInputSchema = z.object({
  question: z.string().describe('The quiz question.'),
  answer: z.string().describe('The user\'s answer to the question.'),
  isCorrect: z.boolean().describe('Whether the answer is correct or not.'),
  contextText: z.string().describe('Relevant text from which the question was derived.'),
});
export type GenerateAnswerExplanationInput = z.infer<typeof GenerateAnswerExplanationInputSchema>;

const GenerateAnswerExplanationOutputSchema = z.object({
  explanation: z.string().describe('The AI-generated explanation of why the answer was correct or incorrect.'),
});
export type GenerateAnswerExplanationOutput = z.infer<typeof GenerateAnswerExplanationOutputSchema>;

export async function generateAnswerExplanation(input: GenerateAnswerExplanationInput): Promise<GenerateAnswerExplanationOutput> {
  return generateAnswerExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnswerExplanationPrompt',
  input: {schema: GenerateAnswerExplanationInputSchema},
  output: {schema: GenerateAnswerExplanationOutputSchema},
  prompt: `You are an AI assistant designed to explain why answers to quiz questions are correct or incorrect.

  Question: {{{question}}}
  Answer: {{{answer}}}
  Is Correct: {{{isCorrect}}}
  Context Text: {{{contextText}}}

  Generate a concise and helpful explanation of why the provided answer is correct or incorrect, using the context text to support your explanation. Focus on clarifying the underlying concepts.
  `,
});

const generateAnswerExplanationFlow = ai.defineFlow(
  {
    name: 'generateAnswerExplanationFlow',
    inputSchema: GenerateAnswerExplanationInputSchema,
    outputSchema: GenerateAnswerExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
