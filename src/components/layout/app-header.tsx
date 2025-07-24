'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { BadgeCheck, Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { useAuth } from '@/components/auth-provider';
import { signOut } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const getTitleFromPathname = (pathname: string): string => {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/create') return 'Create Quiz';
  if (pathname === '/flashcards') return 'Flashcards';
  if (pathname === '/tracking') return 'Tracking';
  if (pathname === '/multiplayer') return 'Multiplayer';
  if (pathname === '/profile') return 'Profile';
  if (pathname === '/settings') return 'Settings';
  if (pathname.startsWith('/quiz')) return 'Quiz Time!';
  return 'Jolt';
};

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const title = getTitleFromPathname(pathname);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Logout failed',
          description: error.message,
        });
        return;
      }
      
      toast({
        title: 'Logged out successfully',
        description: 'You have been signed out of your account.',
      });
      
      router.push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Please try again.',
      });
    }
  };

  // Get user display name
  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userInitials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="hidden text-xl font-semibold md:block">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url} 
                  alt={displayName}
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none flex items-center gap-1.5">
                  {displayName}
                  {user?.email_confirmed_at && (
                    <BadgeCheck className="size-4 text-blue-500" />
                  )}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
