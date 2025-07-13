'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Home, PlusCircle, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/tracking', label: 'Tracking', icon: BarChart3 },
  { href: '/create', label: 'Create', icon: PlusCircle, isCentral: true },
  { href: '/multiplayer', label: 'Friends', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background/80 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary'
              )}
            >
              {item.isCentral ? (
                <div className="flex size-16 -translate-y-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg border-4 border-background">
                  <item.icon className="size-8" />
                </div>
              ) : (
                <>
                  <item.icon className="size-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
