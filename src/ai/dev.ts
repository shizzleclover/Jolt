import { config } from 'dotenv';
config();

import '@/ai/flows/generate-quiz-questions.ts';
import '@/ai/flows/generate-spaced-repetition-reminders.ts';
import '@/ai/flows/transcribe-audio-to-quiz.ts';
import '@/ai/flows/summarize-text-explanation.ts';
import '@/ai/flows/generate-daily-quizzes.ts';
import '@/ai/flows/generate-concept-map.ts';