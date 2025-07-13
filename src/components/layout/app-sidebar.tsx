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
  { href: '/login', label: 'Logout', icon: LogOut },
]

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="size-5" />
                  <span className="flex-1">
                    {item.label}
                    {item.isNew && <Badge variant="secondary" className="ml-2">New</Badge>}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarSeparator />
         <SidebarMenu>
            {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    variant="ghost"
                    className="justify-start"
                >
                    <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
