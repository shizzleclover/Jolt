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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  avatar: z.any(),
})

const notificationsFormSchema = z.object({
  communicationEmails: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  socialEmails: z.boolean().default(true),
  securityEmails: z.boolean().default(true),
})

const displayFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  font: z.enum(["inter", "manrope", "system"]),
})

export default function SettingsPage() {
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Doe",
      email: "alex.doe@jolt.app",
    },
  })

  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      communicationEmails: false,
      marketingEmails: false,
      socialEmails: true,
      securityEmails: true,
    },
  })

  const displayForm = useForm<z.infer<typeof displayFormSchema>>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: {
      theme: "light",
      font: "inter",
    },
  })

  function onProfileSubmit(data: z.infer<typeof profileFormSchema>) {
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  function onNotificationsSubmit(data: z.infer<typeof notificationsFormSchema>) {
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved.",
    })
  }

  function onDisplaySubmit(data: z.infer<typeof displayFormSchema>) {
    toast({
      title: "Display settings updated",
      description: "Your display preferences have been saved.",
    })
  }

  return (
    <div className="flex flex-col gap-8 pb-16 md:pb-8">
      <header>
        <h1 className="text-4xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and set e-mail preferences.
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
            <form onSubmit={displayForm.handleSubmit(onDisplaySubmit)} className="space-y-8">
              <FormField
                control={displayForm.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the theme for the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update display</Button>
            </form>
          </Form>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure how you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...notificationsForm}>
            <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <FormField
                    control={notificationsForm.control}
                    name="communicationEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Communication emails
                          </FormLabel>
                          <FormDescription>
                            Receive emails about your account activity.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={notificationsForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Marketing emails
                          </FormLabel>
                          <FormDescription>
                            Receive emails about new products, features, and more.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              <Button type="submit">Update notifications</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
