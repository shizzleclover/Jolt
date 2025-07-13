'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Mic, Sparkles, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// import { generateQuizAction } from '@/lib/actions'; // This would be the server action

interface CreationFormProps {
  type: 'image' | 'voice' | 'concept-map';
}

const formSchema = z.object({
  numQuestions: z.number().min(3).max(10).default(5),
  difficulty: z.enum(['basic', 'intermediate', 'advanced']).default('intermediate'),
  file: z.any().refine(file => file instanceof File, { message: 'File is required.' }).optional(),
});

export default function CreationForm({ type }: CreationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const isQuiz = type === 'image' || type === 'voice';
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numQuestions: 5,
      difficulty: 'intermediate',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue('file', file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Placeholder for calling server action
    console.log(`Generating ${type} with values:`, values);

    try {
        // const result = await generateQuizAction({ ...values, type });
        // Faking a successful API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        toast({
            title: "Generation Complete!",
            description: `Your ${type} has been created successfully.`,
        });

        if (isQuiz) {
            // Placeholder: redirect to quiz page with new quiz ID
            router.push('/quiz/123'); 
        } else {
            // Placeholder: redirect to concept map page
             router.push('/concept-map/123');
        }

    } catch (error) {
        toast({
            variant: "destructive",
            title: "Generation Failed",
            description: "Something went wrong. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type !== 'voice' && (
           <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Upload Material</FormLabel>
                    <FormControl>
                        <Label htmlFor="file-upload" className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-10 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <Upload className="mb-3 size-8 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or PDF</p>
                            {fileName && <p className="mt-2 text-sm text-primary">{fileName}</p>}
                        </Label>
                    </FormControl>
                    <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                    <FormMessage />
                </FormItem>
            )}
           />
        )}
        
        {type === 'voice' && (
          <div className="flex flex-col items-center gap-4">
            <Button type="button" size="icon" className="size-20 rounded-full bg-red-500 hover:bg-red-600">
              <Mic className="size-10"/>
            </Button>
            <p className="text-sm text-muted-foreground">Click to start recording</p>
          </div>
        )}

        {isQuiz && (
            <>
                <FormField
                  control={form.control}
                  name="numQuestions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions: {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          min={3}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 size-4" />
              Generate {isQuiz ? 'Quiz' : 'Concept Map'}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
