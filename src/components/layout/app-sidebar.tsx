'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  User,
  Settings,
  LogOut,
  BarChart3,
  Users
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/create', label: 'New Quiz', icon: PlusCircle },
  { href: '/flashcards', label: 'Flashcards', icon: BookOpen },
  { href: '/tracking', label: 'Tracking', icon: BarChart3 },
  { href: '/multiplayer', label: 'Multiplayer', icon: Users, isNew: true },
];

const bottomMenuItems = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '#', label: 'Logout', icon: LogOut },
]

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="size-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.isNew && <Badge variant="secondary">New</Badge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40" alt="@username" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold">User Name</span>
                <span className="text-sm text-muted-foreground">user@jolt.app</span>
            </div>
        </div>
         <SidebarMenu className="mt-4">
            {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    variant="ghost"
                    className="justify-start"
                >
                    <Link href={item.href}>
                    <item.icon className="size-5" />
                    {item.label}
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
