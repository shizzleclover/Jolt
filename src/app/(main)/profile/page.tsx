import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Calendar, Edit, Flame, Shield, Trophy } from "lucide-react";
import Link from "next/link";
import ActivityHeatmap from "@/components/dashboard/activity-heatmap";

export default function ProfilePage() {
    const user = {
        name: "Alex Doe",
        email: "alex.doe@jolt.app",
        avatar: "https://placehold.co/128x128",
        joinDate: "March 15, 2024",
    };

    const stats = [
        { label: "Quizzes Taken", value: "124", icon: <Trophy className="size-6 text-yellow-500" /> },
        { label: "Current Streak", value: "12 Days", icon: <Flame className="size-6 text-orange-400" /> },
        { label: "Joined", value: "3 Months Ago", icon: <Calendar className="size-6 text-blue-400" /> },
    ];

    return (
        <div className="flex flex-col gap-8 pb-16 md:pb-8">
            <header className="mb-4">
                <h1 className="text-4xl font-bold font-headline">Profile</h1>
                <p className="text-muted-foreground mt-2">Manage your account and track your progress.</p>
            </header>

            <Card className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="bg-muted h-24" />
                    <div className="flex flex-col items-center gap-4 p-6 -mt-16 sm:flex-row sm:items-end sm:-mt-12">
                        <Avatar className="h-28 w-28 border-4 border-background bg-background">
                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="profile picture" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left">
                            <CardTitle className="text-3xl font-headline flex items-center gap-2 justify-center sm:justify-start">
                                {user.name} <BadgeCheck className="size-6 text-blue-500" />
                            </CardTitle>
                            <CardDescription className="mt-1">{user.email}</CardDescription>
                        </div>
                        <Button variant="outline" className="w-full sm:w-auto" asChild>
                           <Link href="/settings"><Edit className="mr-2 size-4"/> Edit Profile</Link>
                        </Button>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    {stats.map(stat => (
                        <div key={stat.label} className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 border">
                             {stat.icon}
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Activity</CardTitle>
                    <CardDescription>Your learning consistency over the past year.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ActivityHeatmap />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Account Security</CardTitle>
                    <CardDescription>Manage your security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                        <Button variant="outline">Change Password</Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Keep your account extra secure.</p>
                        </div>
                        <Button variant="outline">Enable 2FA</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
