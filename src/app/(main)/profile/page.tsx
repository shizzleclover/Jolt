import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account and track your goals.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This is where you'll be able to see your detailed stats, set goals, and manage your profile information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Stay tuned for updates!</p>
        </CardContent>
      </Card>
    </div>
  );
}
