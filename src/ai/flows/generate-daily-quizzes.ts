// src/ai/flows/generate-daily-quizzes.ts
'use server';

/**
 * @fileOverview Generates a daily quiz for the user based on previously provided material.
 *
 * - generateDailyQuiz - A function that generates a daily quiz.
 * - GenerateDailyQuizInput - The input type for the generateDailyQuiz function.
 * - GenerateDailyQuizOutput - The return type for the generateDailyQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyQuizInputSchema = z.object({
  material: z
    .string()
    .describe(
      'The study material based on which the quiz will be generated.'
    ),
  numQuestions: z.number().min(3).max(10).default(5).describe('The number of questions to generate for the quiz.'),
  difficulty: z.enum(['basic', 'intermediate', 'advanced']).default('intermediate').describe('The difficulty level of the quiz.'),
});
export type GenerateDailyQuizInput = z.infer<typeof GenerateDailyQuizInputSchema>;

const GenerateDailyQuizOutputSchema = z.object({
  quiz: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The multiple-choice options for the question.'),
      answer: z.string().describe('The correct answer to the question.'),
      explanation: z.string().optional().describe('Explanation of the correct answer.'),
    })
  ).describe('The generated quiz questions.'),
});
export type GenerateDailyQuizOutput = z.infer<typeof GenerateDailyQuizOutputSchema>;

export async function generateDailyQuiz(input: GenerateDailyQuizInput): Promise<GenerateDailyQuizOutput> {
  return generateDailyQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyQuizPrompt',
  input: {schema: GenerateDailyQuizInputSchema},
  output: {schema: GenerateDailyQuizOutputSchema},
  prompt: `You are an expert quiz generator. You will generate a quiz based on the study material provided.

Study Material: {{{material}}}
Number of Questions: {{{numQuestions}}}
Difficulty: {{{difficulty}}}

Generate a quiz with the specified number of multiple-choice questions based on the provided study material. Each question should have multiple-choice options, with one correct answer.

Difficulty levels:
- basic: Simple, recall-based questions.
- intermediate: Questions that require understanding and application of concepts.
- advanced: Complex, critical thinking-based questions that might integrate multiple concepts.

Make sure that the output is in the JSON format:
${JSON.stringify(GenerateDailyQuizOutputSchema.shape, null, 2)}`,
});

const generateDailyQuizFlow = ai.defineFlow(
  {
    name: 'generateDailyQuizFlow',
    inputSchema: GenerateDailyQuizInputSchema,
    outputSchema: GenerateDailyQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
