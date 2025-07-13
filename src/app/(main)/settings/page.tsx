// src/app/(main)/settings/page.tsx
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, Upload } from "lucide-react"
import { useTheme } from "next-themes"

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  avatar: z.any(),
})

const displayFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
})

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Doe",
      email: "alex.doe@jolt.app",
    },
  })

  const displayForm = useForm<z.infer<typeof displayFormSchema>>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: {
      theme: (theme as "light" | "dark" | "system") || "system",
    },
  })

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    displayForm.setValue("theme", newTheme);
    toast({
      title: `Theme changed to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`,
      description: "Your display preferences have been saved.",
    });
  }


  return (
    <div className="flex flex-col gap-8 pb-16 md:pb-8">
      <header>
        <h1 className="text-4xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            This is how others will see you on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
              <FormField
                control={profileForm.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://placehold.co/128x128" alt="Avatar" data-ai-hint="profile picture" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <FormControl>
                      <Button type="button" variant="outline">
                        <Upload className="mr-2 size-4" />
                        Change Photo
                      </Button>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can manage verified email addresses in your email settings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update profile</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Display</CardTitle>
          <CardDescription>
            Customize the appearance of the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...displayForm}>
            <form className="space-y-8">
              <FormField
                control={displayForm.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                     <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={theme === 'light' ? 'default' : 'outline'}
                        onClick={() => handleThemeChange('light')}
                        className="flex-1"
                      >
                        <Sun className="mr-2 size-4" /> Light
                      </Button>
                      <Button
                        type="button"
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        onClick={() => handleThemeChange('dark')}
                        className="flex-1"
                      >
                        <Moon className="mr-2 size-4" /> Dark
                      </Button>
                    </div>
                    <FormDescription>
                      Select the theme for the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
