
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Puzzle, Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/blog', text: 'Blog' },
    { href: '/about', text: 'About' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/60 backdrop-blur-lg sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>
        <Puzzle className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold text-foreground">Toolzen</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        {navLinks.map(link => (
          <Button variant="ghost" asChild key={link.href}>
            <Link href={link.href}>{link.text}</Link>
          </Button>
        ))}
        <ThemeToggle />
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 pt-8">
              {navLinks.map(link => (
                <Button variant="ghost" asChild key={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href={link.href}>{link.text}</Link>
                </Button>
              ))}
              <div className="mt-4 flex justify-center">
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
