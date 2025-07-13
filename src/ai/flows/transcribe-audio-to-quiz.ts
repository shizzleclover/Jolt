'use server';
/**
 * @fileOverview A flow that transcribes audio and generates a quiz from the transcribed text.
 *
 * - transcribeAudioToQuiz - A function that handles the audio transcription and quiz generation process.
 * - TranscribeAudioToQuizInput - The input type for the transcribeAudioToQuiz function.
 * - TranscribeAudioToQuizOutput - The return type for the transcribeAudioToQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranscribeAudioToQuizInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "Audio data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  numberOfQuestions: z
    .number()
    .min(3)
    .max(10)
    .default(5) // Setting a default number of questions
    .describe('The number of multiple-choice questions to generate (3-10).'),
  difficultyLevel: z
    .enum(['basic', 'intermediate', 'advanced'])
    .default('intermediate')
    .describe('The difficulty level of the quiz questions.'),
});
export type TranscribeAudioToQuizInput = z.infer<typeof TranscribeAudioToQuizInputSchema>;

const TranscribeAudioToQuizOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswerIndex: z.number().min(0),
      explanation: z.string().optional(), // Explanation for the correct answer
    })
  ),
});
export type TranscribeAudioToQuizOutput = z.infer<typeof TranscribeAudioToQuizOutputSchema>;

export async function transcribeAudioToQuiz(input: TranscribeAudioToQuizInput): Promise<TranscribeAudioToQuizOutput> {
  return transcribeAudioToQuizFlow(input);
}

const transcribeAudioPrompt = ai.definePrompt({
  name: 'transcribeAudioPrompt',
  input: {schema: z.object({audioDataUri: z.string()})},
  output: {schema: z.object({transcription: z.string()})},
  prompt: `Transcribe the following audio recording to text. Return ONLY the text transcription.

Audio: {{media url=audioDataUri}}`,
});

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: z.object({transcription: z.string(), numberOfQuestions: z.number(), difficultyLevel: z.enum(['basic', 'intermediate', 'advanced'])})},
  output: {schema: TranscribeAudioToQuizOutputSchema},
  prompt: `You are an expert quiz generator. You will generate a quiz based on the provided text transcription. The quiz should have the specified number of multiple-choice questions and difficulty level.

Transcription: {{{transcription}}}
Number of Questions: {{{numberOfQuestions}}}
Difficulty Level: {{{difficultyLevel}}}

Each question must have exactly 4 options, and one correct answer.  Provide an explanation for each correct answer.

Return the questions in JSON format.

Example output:
{
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Paris", "London", "Rome"],
      "correctAnswerIndex": 1,
      "explanation": "Paris is the capital and most populous city of France."
    },
    {
      "question": "What is the highest mountain in the world?",
      "options": ["K2", "Kangchenjunga", "Matterhorn", "Mount Everest"],
      "correctAnswerIndex": 3,
      "explanation": "Mount Everest is the world's highest mountain above sea level."
    }
  ]
}
`,
});

const transcribeAudioToQuizFlow = ai.defineFlow(
  {
    name: 'transcribeAudioToQuizFlow',
    inputSchema: TranscribeAudioToQuizInputSchema,
    outputSchema: TranscribeAudioToQuizOutputSchema,
  },
  async input => {
    // Transcribe the audio
    const {output: transcriptionOutput} = await transcribeAudioPrompt({
      audioDataUri: input.audioDataUri,
    });

    // Generate quiz questions based on the transcription
    const {output: quizOutput} = await generateQuizPrompt({
      transcription: transcriptionOutput!.transcription,
      numberOfQuestions: input.numberOfQuestions,
      difficultyLevel: input.difficultyLevel,
    });

    return quizOutput!;
  }
);
