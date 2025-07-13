import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FlashcardsPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Flashcards</h1>
        <p className="text-muted-foreground mt-2">Review your materials with flashcards.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This is where your study sets will be available as flashcards for quick review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Stay tuned for updates!</p>
        </CardContent>
      </Card>
    </div>
  );
}
