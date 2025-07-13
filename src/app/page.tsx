import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, Camera, Clapperboard, Share2, Sparkles, Zap } from 'lucide-react';
import Logo from '@/components/logo';

export default function LandingPage() {
  const features = [
    {
      icon: <Camera className="size-8 text-primary" />,
      title: 'Scan Anything',
      description: 'Snap a picture of your notes, textbook, or any document.',
    },
    {
      icon: <Sparkles className="size-8 text-primary" />,
      title: 'AI Quiz Magic',
      description: 'Our AI generates challenging quizzes from your materials in seconds.',
    },
    {
      icon: <Zap className="size-8 text-primary" />,
      title: 'Timed Challenges',
      description: 'Practice under pressure with timed quizzes to sharpen your recall.',
    },
    {
      icon: <BrainCircuit className="size-8 text-primary" />,
      title: 'Concept Maps',
      description: 'Visualize connections and understand the bigger picture effortlessly.',
    },
     {
      icon: <Clapperboard className="size-8 text-primary" />,
      title: 'Voice-to-Quiz',
      description: 'Dictate your thoughts or record passages to create quizzes on the fly.',
    },
    {
      icon: <Share2 className="size-8 text-primary" />,
      title: 'Share & Compete',
      description: 'Challenge your friends by sharing quizzes and compete for the top score.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-20 text-center md:py-32">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Turn Your Notes into Knowledge
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Jolt uses AI to transform your study materials into interactive quizzes and flashcards. Study smarter, not harder.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start for Free <ArrowRight className="ml-2 size-5" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="container py-20 md:py-24">
           <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Powerful Features to Supercharge Your Learning</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to conquer your exams and master new subjects.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col items-center justify-center p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-20 text-center md:py-32">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Jolt Your Memory?</h2>
            <p className="mt-4 text-muted-foreground">
              Stop re-reading and start recalling. Sign up now and experience a new way to learn.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                 <Link href="/signup">Create Your First Quiz <Sparkles className="ml-2 size-5" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex h-16 items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Jolt. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
