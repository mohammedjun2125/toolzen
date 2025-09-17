import Link from 'next/link';
import { MountainIcon } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/60 backdrop-blur-lg sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold text-foreground">Toolzen</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4">
        <ThemeToggle />
      </nav>
    </header>
  );
}