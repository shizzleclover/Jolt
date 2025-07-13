import { Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-bold font-headline", className)}>
      <div className="flex items-center justify-center rounded-lg bg-primary p-1.5">
        <Zap className="size-5 text-primary-foreground fill-primary-foreground" />
      </div>
      Jolt
    </Link>
  );
}
