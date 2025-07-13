import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreationForm from "@/components/quiz/creation-form";
import { Camera, Clapperboard, BrainCircuit } from "lucide-react";

export default function CreateQuizPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Create a New Study Set</h1>
        <p className="text-muted-foreground mt-2">Choose your source and let our AI do the rest.</p>
      </header>

      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="image">
            <Camera className="mr-2 size-4" />
            From Image
          </TabsTrigger>
          <TabsTrigger value="voice">
            <Clapperboard className="mr-2 size-4" />
            From Voice
          </TabsTrigger>
          <TabsTrigger value="concept-map">
            <BrainCircuit className="mr-2 size-4" />
            Concept Map
          </TabsTrigger>
        </TabsList>

        <Card className="mt-4">
          <TabsContent value="image" className="m-0">
            <CardHeader>
              <CardTitle className="font-headline">Upload Your Notes</CardTitle>
              <CardDescription>Snap a photo of your textbook or notes. Clear, well-lit images work best.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreationForm type="image" />
            </CardContent>
          </TabsContent>
          <TabsContent value="voice" className="m-0">
             <CardHeader>
              <CardTitle className="font-headline">Record Your Voice</CardTitle>
              <CardDescription>Dictate a passage or record a lecture snippet to generate a quiz.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreationForm type="voice" />
            </CardContent>
          </TabsContent>
          <TabsContent value="concept-map" className="m-0">
             <CardHeader>
              <CardTitle className="font-headline">Generate a Concept Map</CardTitle>
              <CardDescription>Upload your study material to create a visual map of key ideas.</CardDescription>
            </CardHeader>
            <CardContent>
              <CreationForm type="concept-map" />
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
