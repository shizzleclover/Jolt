import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MultiplayerPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Multiplayer</h1>
        <p className="text-muted-foreground mt-2">Challenge your friends and learn together.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The multiplayer mode is under construction. Soon you'll be able to challenge your friends to quiz battles!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get ready to compete!</p>
        </CardContent>
      </Card>
    </div>
  );
}
