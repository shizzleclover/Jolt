'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating multiple-choice quiz questions from an image.
 *
 * - generateQuizQuestions - A function that takes an image as input and returns a set of quiz questions.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  imageUri: z
    .string()
    .describe(
      "A photo of study material, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  numQuestions: z
    .number()
    .min(3)
    .max(10)
    .default(5) // Setting a default number of questions
    .describe('The number of multiple-choice questions to generate (between 3 and 10).'),
  difficulty: z.enum(['basic', 'intermediate', 'advanced']).default('intermediate').describe('The difficulty level of the questions.'),
});
export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The multiple-choice options.'),
      correctAnswerIndex: z.number().describe('The index of the correct answer in the options array.'),
      explanation: z.string().optional().describe('Explanation of why the answer is correct or wrong.')
    })
  ).describe('An array of multiple-choice quiz questions.'),
});
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;


export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const generateQuizQuestionsPrompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert educator who generates multiple-choice quiz questions from provided text.  The user will provide a picture of their notes.

  Based on the notes, generate {{{numQuestions}}} multiple-choice questions. Each question should have several options, and you should mark the index of the correct answer.
  The difficulty of the questions should be {{{difficulty}}}.
  You should also provide a short explanation of why each answer is correct or wrong. 

  Here are the notes:
  {{media url=imageUri}}

  Make sure that the response can be parsed as valid JSON.
  `,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateQuizQuestionsPrompt(input);
    return output!;
  }
);
