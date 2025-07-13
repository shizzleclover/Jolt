'use server';
/**
 * @fileOverview Generates spaced repetition reminders based on user's quiz performance.
 *
 * - generateSpacedRepetitionReminders - A function that generates spaced repetition reminders.
 * - SpacedRepetitionRemindersInput - The input type for the generateSpacedRepetitionReminders function.
 * - SpacedRepetitionRemindersOutput - The return type for the generateSpacedRepetitionReminders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpacedRepetitionRemindersInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate reminders.'),
  pastQuizPerformance: z
    .array(z.object({
      question: z.string(),
      answer: z.string(),
      correct: z.boolean(),
    }))
    .describe(
      'An array of past quiz questions, answers, and whether the answer was correct.'
    ),
  numReminders: z
    .number()
    .min(1)
    .max(10)
    .default(3)
    .describe('The number of reminders to generate.'),
});
export type SpacedRepetitionRemindersInput = z.infer<
  typeof SpacedRepetitionRemindersInputSchema
>;

const SpacedRepetitionRemindersOutputSchema = z.object({
  reminders: z
    .array(z.string())
    .describe(
      'An array of reminders, each being a string suggesting when and what to review.'
    ),
});
export type SpacedRepetitionRemindersOutput = z.infer<
  typeof SpacedRepetitionRemindersOutputSchema
>;

export async function generateSpacedRepetitionReminders(
  input: SpacedRepetitionRemindersInput
): Promise<SpacedRepetitionRemindersOutput> {
  return generateSpacedRepetitionRemindersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'spacedRepetitionRemindersPrompt',
  input: {schema: SpacedRepetitionRemindersInputSchema},
  output: {schema: SpacedRepetitionRemindersOutputSchema},
  prompt: `You are an AI assistant designed to generate spaced repetition reminders based on a user's quiz performance on a specific topic.

      Given the following topic and the user's past quiz performance, generate {{numReminders}} reminders. The reminders should be spaced out in time, focusing on questions the user answered incorrectly more frequently.

      Topic: {{topic}}
      Past Quiz Performance:
      {{#each pastQuizPerformance}}
        Question: {{this.question}}
        Answer: {{this.answer}}
        Correct: {{this.correct}}
      {{/each}}

      Reminders should be clear, concise, and actionable, suggesting specific areas to review. Return them as an array of strings.
      Make use of spaced repetition principles: material missed should appear again sooner than material correctly answered.
      Do not include any introductory or concluding remarks, only the array of strings.
      Ensure the reminders vary and aren't repetitive.
      Do not make assumptions about the user's level of knowledge beyond the provided quiz performance.
      If past quiz performance is empty, provide generic reminders to review fundamental concepts of the topic.
      If all questions were answered correctly, provide reminders to review advanced topics, if applicable, or to test knowledge with more difficult questions.
      If the topic involves problem solving, generate reminders to re-attempt a question.
      Focus on generating effective reminders to help user retain knowledge over time.
      Return your answer in JSON format.
`,  
});

const generateSpacedRepetitionRemindersFlow = ai.defineFlow(
  {
    name: 'generateSpacedRepetitionRemindersFlow',
    inputSchema: SpacedRepetitionRemindersInputSchema,
    outputSchema: SpacedRepetitionRemindersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
