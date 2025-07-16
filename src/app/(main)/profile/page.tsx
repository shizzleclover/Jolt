'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Calendar, Edit, Flame, Trophy, Shield, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { format } from "date-fns";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Get user display data
    const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
    const userInitials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const joinedDate = user.created_at 
        ? format(new Date(user.created_at), 'MMMM yyyy')
        : 'Recently';

    const userStats = [
        {
            icon: Trophy,
            label: "Quizzes Completed",
            value: "124", // This would come from your database
            color: "text-yellow-600"
        },
        {
            icon: Flame,
            label: "Day Streak",
            value: "12", // This would come from your database
            color: "text-orange-500"
        },
        {
            icon: Calendar,
            label: "Member Since",
            value: joinedDate,
            color: "text-blue-500"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 max-w-2xl">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your account and view your progress
                    </p>
                </div>

                {/* Profile Header Card */}
                <Card className="mb-6">
                    <div className="relative">
                        {/* Cover Background */}
                        <div className="h-32 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-t-lg"></div>
                        
                        {/* Profile Content */}
                        <div className="px-6 pb-6">
                            <div className="flex flex-col items-center -mt-16">
                                {/* Avatar */}
                                <Avatar className="w-24 h-24 border-4 border-background mb-4">
                                    <AvatarImage src={user.user_metadata?.avatar_url} alt={displayName} />
                                    <AvatarFallback className="text-2xl font-semibold">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>

                                {/* User Info */}
                                <div className="text-center mb-4">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <h2 className="text-2xl font-bold">{displayName}</h2>
                                        {user.email_confirmed_at && (
                                            <BadgeCheck className="w-6 h-6 text-blue-500" />
                                        )}
                                    </div>
                                    <p className="text-muted-foreground">{user.email}</p>
                                    {!user.email_confirmed_at && (
                                        <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-800">
                                            Email not verified
                                        </Badge>
                                    )}
                                </div>

                                {/* Edit Button */}
                                <Button asChild className="w-full">
                                    <Link href="/settings">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Stats Cards */}
                <div className="grid gap-4 mb-6">
                    {userStats.map((stat, index) => (
                        <Card key={index}>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>
                            Manage your account settings and security
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start" asChild>
                            <Link href="/settings">
                                <Edit className="w-4 h-4 mr-2" />
                                Account Settings
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <Shield className="w-4 h-4 mr-2" />
                            Security Settings
                        </Button>
                    </CardContent>
                </Card>

                {/* Account Status */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Account Status</h3>
                                <p className="text-sm text-muted-foreground">
                                    {user.email_confirmed_at 
                                        ? "Your account is verified and active 🎉"
                                        : "Please verify your email to activate all features"
                                    }
                                </p>
                            </div>
                            <Badge 
                                variant="secondary" 
                                className={
                                    user.email_confirmed_at 
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }
                            >
                                {user.email_confirmed_at ? "Verified" : "Pending"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 