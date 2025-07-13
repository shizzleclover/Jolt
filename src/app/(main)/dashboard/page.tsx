import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import PerformanceChart from "@/components/dashboard/performance-chart";
import ActivityHeatmap from "@/components/dashboard/activity-heatmap";

export default function DashboardPage() {
    const recentQuizzes = [
        { id: 1, title: "Biology: Cell Structure", score: "8/10", date: "2d ago" },
        { id: 2, title: "History: The Roman Empire", score: "9/10", date: "4d ago" },
        { id: 3, title: "Physics: Kinematics", score: "6/10", date: "1w ago" },
    ];

    const username = "Alex";

    return (
        <div className="flex flex-col gap-8 pb-16 md:pb-8">
            <header>
                <h1 className="text-3xl font-bold font-headline">Welcome back, {username}!</h1>
                <p className="text-muted-foreground">Ready to jolt your memory? Let's get learning.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col justify-between bg-primary text-primary-foreground shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Star className="size-6 fill-current" />
                            <CardTitle className="font-headline text-2xl">Daily Quiz Challenge</CardTitle>
                        </div>
                        <CardDescription className="text-primary-foreground/80">A fresh quiz on your past topics, generated just for you.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full" asChild>
                            <Link href="/quiz/daily">Start Challenge <Sparkles className="ml-2 size-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline">Activity</CardTitle>
                        <CardDescription>Your learning consistency over the last year.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ActivityHeatmap />
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold font-headline mb-4">Recent Quizzes</h2>
                    <div className="space-y-4">
                        {recentQuizzes.map(quiz => (
                            <Card key={quiz.id} className="transition-shadow hover:shadow-md">
                                <CardContent className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <FileText className="size-6 text-primary" />
                                        <div>
                                            <p className="font-semibold">{quiz.title}</p>
                                            <p className="text-sm text-muted-foreground">Completed {quiz.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-semibold text-lg">{quiz.score}</p>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/quiz/${quiz.id}`}>Review</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                 <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold font-headline mb-4">Performance</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quiz Accuracy</CardTitle>
                            <CardDescription>Your scores over the last 7 days.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PerformanceChart />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
