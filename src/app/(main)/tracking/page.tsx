import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BookOpenCheck, Calendar, TrendingUp } from "lucide-react";
import ActivityHeatmap from "@/components/dashboard/activity-heatmap";
import PerformanceChart from "@/components/dashboard/performance-chart";

const trackingStats = [
    { label: "Total Study Sessions", value: "212", icon: <BookOpenCheck className="size-8 text-blue-500" /> },
    { label: "Average Score", value: "88%", icon: <BarChart className="size-8 text-green-500" /> },
    { label: "Best Subject", value: "Biology", icon: <TrendingUp className="size-8 text-purple-500" /> },
    { label: "Longest Streak", value: "21 Days", icon: <Calendar className="size-8 text-orange-500" /> },
];

const subjectPerformance = [
    { subject: 'Biology', score: 92 },
    { subject: 'History', score: 85 },
    { subject: 'Physics', score: 78 },
    { subject: 'Chemistry', score: 90 },
    { subject: 'Literature', score: 81 },
]

export default function TrackingPage() {
  return (
    <div className="flex flex-col gap-8 pb-16 md:pb-8">
      <header className="mb-4">
        <h1 className="text-4xl font-bold font-headline">Learning Analytics</h1>
        <p className="text-muted-foreground mt-2">Track your progress and stay motivated.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trackingStats.map((stat) => (
            <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="font-headline">Activity Heatmap</CardTitle>
                <CardDescription>Your study consistency over the last year.</CardDescription>
            </CardHeader>
            <CardContent>
                <ActivityHeatmap />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline">Weekly Performance</CardTitle>
                <CardDescription>Average quiz scores over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <PerformanceChart />
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Performance by Subject</CardTitle>
            <CardDescription>See how you're doing in different areas.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {subjectPerformance.map(item => (
                    <div key={item.subject} className="flex items-center gap-4">
                        <p className="w-24 font-medium">{item.subject}</p>
                        <div className="flex-1 bg-muted rounded-full h-4">
                            <div 
                                className="bg-primary h-4 rounded-full" 
                                style={{ width: `${item.score}%` }}
                            />
                        </div>
                        <p className="w-12 text-right font-semibold">{item.score}%</p>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
