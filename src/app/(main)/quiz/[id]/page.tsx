'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Loader2, Send } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const dummyQuiz = {
    id: "123",
    title: "Biology: Cell Structure",
    questions: [
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"],
            correctAnswerIndex: 2,
            explanation: "The mitochondrion is known as the powerhouse of the cell because it generates most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
        },
        {
            question: "Which organelle is responsible for protein synthesis?",
            options: ["Lysosome", "Ribosome", "Endoplasmic Reticulum", "Vacuole"],
            correctAnswerIndex: 1,
            explanation: "Ribosomes are the sites of protein synthesis (translation) in the cell. They link amino acids together in the order specified by messenger RNA (mRNA) molecules."
        },
        {
            question: "What contains the cell's genetic material?",
            options: ["Cytoplasm", "Nucleus", "Mitochondrion", "Cell membrane"],
            correctAnswerIndex: 1,
            explanation: "The nucleus contains the cell's chromosomes, which are made of DNA and carry the genetic instructions for the development, functioning, growth, and reproduction of the organism."
        }
    ]
};

const TIME_LIMIT_SECONDS = 300; // 5 minutes

export default function QuizPlayerPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState<typeof dummyQuiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
    const [showResultsDialog, setShowResultsDialog] = useState(false);

    useEffect(() => {
        // Simulate fetching quiz data
        setTimeout(() => {
            setQuiz(dummyQuiz);
            setLoading(false);
        }, 1000);
    }, [params.id]);

    useEffect(() => {
        if (loading || showResultsDialog) return;
        
        if (timeLeft === 0) {
            setShowResultsDialog(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, loading, showResultsDialog]);

    const handleOptionSelect = (index: number) => {
        if (!isAnswered) {
            setSelectedOption(index);
        }
    };

    const handleSubmitAnswer = () => {
        if (selectedOption === null) return;

        setIsAnswered(true);
        if (selectedOption === quiz?.questions[currentQuestionIndex].correctAnswerIndex) {
            setScore(prevScore => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz!.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResultsDialog(true);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!quiz) {
        return <div>Quiz not found.</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between sm:items-center">
                        <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
                        <div className="flex items-center gap-2 text-muted-foreground self-end">
                            <Clock className="size-5" />
                            <span className="font-mono text-lg tabular-nums">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Progress value={progress} />
                        <p className="text-sm text-muted-foreground mt-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <p className="text-lg font-semibold">{currentQuestion.question}</p>
                        <RadioGroup onValueChange={(value) => handleOptionSelect(parseInt(value))} className="space-y-3" disabled={isAnswered}>
                            {currentQuestion.options.map((option, index) => {
                                const isCorrect = index === currentQuestion.correctAnswerIndex;
                                const isSelected = index === selectedOption;
                                
                                return (
                                <Label key={index} htmlFor={`option-${index}`} className={cn(
                                    "flex items-center gap-4 rounded-md border p-4 transition-colors cursor-pointer",
                                    !isAnswered && "hover:bg-accent/50 has-[[data-state=checked]]:bg-accent",
                                    isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                                    isAnswered && !isCorrect && isSelected && "border-red-500 bg-red-500/10",
                                    isAnswered && "cursor-not-allowed"
                                )}>
                                    <RadioGroupItem value={String(index)} id={`option-${index}`} />
                                    {option}
                                </Label>
                            )})}
                        </RadioGroup>

                        {isAnswered && (
                             <div className="rounded-lg border bg-muted/50 p-4 text-sm">
                                <p className="font-semibold">Explanation:</p>
                                <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                            </div>
                        )}

                        <div className="flex justify-end">
                           {isAnswered ? (
                                <Button size="lg" onClick={handleNextQuestion}>
                                    {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                </Button>
                           ) : (
                                <Button size="lg" onClick={handleSubmitAnswer} disabled={selectedOption === null}>
                                    Submit <Send className="ml-2 size-4"/>
                                </Button>
                           )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={showResultsDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="font-headline text-2xl">Quiz Complete!</AlertDialogTitle>
                    <AlertDialogDescription>
                        You've finished the quiz. Here's how you did.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4 text-center">
                        <p className="text-muted-foreground">Your Score</p>
                        <p className="text-5xl font-bold">{score} / {quiz.questions.length}</p>
                    </div>
                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
                        <Button onClick={() => window.location.reload()}>Try Again</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
