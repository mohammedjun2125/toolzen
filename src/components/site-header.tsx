
'use client';

import Link from 'next/link';
import { Menu, ChevronDown, Puzzle } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { categories } from '@/lib/tools';
import { iconMap } from '@/components/icon-map';

export function SiteHeader() {
  const mainNavLinks = [
    { href: '/blog', text: 'Blog' },
    { href: '/about', text: 'About' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/60 backdrop-blur-lg sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
        <Puzzle className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-foreground">Toolzen</span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              Tools <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map(category => {
               const CategoryIcon = iconMap[category.icon];
               return (
                 <DropdownMenuItem key={category.id} asChild>
                   <Link href={`/category/${category.id}`}>
                      {CategoryIcon && <CategoryIcon className="mr-2 h-4 w-4" />}
                      {category.name}
                  </Link>
                </DropdownMenuItem>
               )
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {mainNavLinks.map(link => (
          <Button variant="ghost" asChild key={link.href}>
            <Link href={link.href}>{link.text}</Link>
          </Button>
        ))}
        <ThemeToggle />
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
             <nav className="flex flex-col gap-4 pt-8">
                <SheetClose asChild>
                  <Link href="/" className="flex items-center justify-center gap-2 mb-4" prefetch={false}>
                    <Puzzle className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold text-foreground">Toolzen</span>
                  </Link>
                </SheetClose>

                {categories.map(category => {
                   const CategoryIcon = iconMap[category.icon];
                   return (
                      <SheetClose asChild key={category.id}>
                       <Link href={`/category/${category.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted font-semibold text-lg">
                          {CategoryIcon && <CategoryIcon className="h-5 w-5 text-primary" />}
                          <span>{category.name}</span>
                      </Link>
                     </SheetClose>
                   )
                })}

                {mainNavLinks.map(link => (
                  <SheetClose asChild key={link.href}>
                    <Link href={link.href} className="font-semibold text-lg py-2 px-4 rounded-md hover:bg-muted">{link.text}</Link>
                  </SheetClose>
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
