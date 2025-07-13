import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// This is a placeholder component. In a real app, this would be a client component
// fetching quiz data and managing state.

export default function QuizPlayerPage({ params }: { params: { id: string } }) {
    const quiz = {
        title: "Biology: Cell Structure",
        questions: [
            {
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"],
                correctAnswerIndex: 2
            }
        ]
    };
    
    const currentQuestion = quiz.questions[0];

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="size-5" />
                            <span className="font-mono text-lg">04:32</span>
                        </div>
                    </div>
                    <div className="pt-4">
                        <Progress value={10} />
                        <p className="text-sm text-muted-foreground mt-2">Question 1 of 10</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <p className="text-lg font-semibold">{currentQuestion.question}</p>
                        <RadioGroup defaultValue="option-one" className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <Label key={index} htmlFor={`option-${index}`} className="flex items-center gap-4 rounded-md border p-4 hover:bg-accent/50 has-[[data-state=checked]]:bg-accent transition-colors cursor-pointer">
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    {option}
                                </Label>
                            ))}
                        </RadioGroup>
                        <div className="flex justify-end">
                            <Button size="lg">Next Question</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
