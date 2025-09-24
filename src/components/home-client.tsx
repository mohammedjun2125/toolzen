
'use client';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categories, tools } from '@/lib/tools';
import type { LucideIcon } from 'lucide-react';
import {
    Image as ImageIcon, FileText, Mic, Palette, Ruler, QrCode, Sigma, CaseSensitive, Link as LinkIcon,
    Calendar, Calculator, Lock, FileCode, Braces, Hash, Binary, BookType, Clock, Crop, Percent, Landmark,
    Barcode, Sparkles, Merge, RotateCw, Trash2, Split, Shield, SquarePen, FileScan, FileKey2, Beaker,
    FileCog, Paintbrush, Bot, Sun, Wand, Rows, Columns, MousePointer, UtilityPole, Webhook,
    NotepadText, CheckCheck, KeyRound, Globe, Component, FileType as GifIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { ToolSearch } from './tool-search';

export const iconMap: { [key: string]: LucideIcon } = {
    'image': ImageIcon,
    'file-text': FileText,
    'notepad-text': NotepadText,
    'calculator': Calculator,
    'sparkles': Sparkles,
    'paintbrush': Paintbrush,
    'utility-pole': UtilityPole,
    'image-icon': ImageIcon,
    'crop': Crop,
    'palette': Palette,
    'file-scan': FileScan,
    'gif-icon': GifIcon,
    'component': Component,
    'bot': Bot,
    'merge': Merge,
    'split': Split,
    'trash-2': Trash2,
    'square-pen': SquarePen,
    'rotate-cw': RotateCw,
    'file-key-2': FileKey2,
    'file-cog': FileCog,
    'sigma': Sigma,
    'braces': Braces,
    'case-sensitive': CaseSensitive,
    'mic': Mic,
    'rows': Rows,
    'link-icon': LinkIcon,
    'binary': Binary,
    'file-code': FileCode,
    'webhook': Webhook,
    'percent': Percent,
    'landmark': Landmark,
    'calendar': Calendar,
    'ruler': Ruler,
    'lock': Lock,
    'qr-code': QrCode,
    'book-type': BookType,
    'hash': Hash,
    'barcode': Barcode,
    'wand': Wand,
    'key-round': KeyRound,
    'globe': Globe,
    'shield': Shield,
    'sun': Sun,
    'columns': Columns,
    'mouse-pointer': MousePointer,
};

function ToolCategoryNav() {
  return (
    <section className="w-full pb-16 pt-8 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Tool Categories</h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Click a category to jump to the tools you need.
            </p>
        </div>
        <div className="flex justify-center flex-wrap gap-4">
            {categories.map(category => {
                const CategoryIcon = iconMap[category.icon as keyof typeof iconMap] as React.ElementType;
                return (
                    <Button asChild key={category.id} variant="outline" size="lg">
                        <Link href={`#${category.id}`}>
                           {CategoryIcon && <CategoryIcon className="mr-2 h-5 w-5" />} 
                           {category.name}
                        </Link>
                    </Button>
                );
            })}
        </div>
    </section>
  )
}

export function HomeClient() {
    return (
        <>
        <ToolCategoryNav />
        <ToolSearch />
        <section className="w-full pb-20 md:pb-32 lg:pb-40 container mx-auto px-4 md:px-6">
            {categories.map((category) => {
              const categoryTools = tools.filter(tool => tool.category.id === category.id);
              if (categoryTools.length === 0) return null;
              
              const CategoryIcon = iconMap[category.icon as keyof typeof iconMap] as React.ElementType;

              return (
                <div key={category.id} id={category.id} className="mb-16 scroll-mt-24">
                  <header className="text-center mb-12">
                      {CategoryIcon && <CategoryIcon className="h-12 w-12 text-primary mx-auto mb-4" />}
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                          {category.name}
                      </h2>
                      <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                          {category.description_short}
                      </p>
                  </header>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryTools.map((tool) => {
                      const ToolIcon = iconMap[tool.icon as keyof typeof iconMap] as React.ElementType;
                      return (
                          <Link href={tool.href} key={tool.id} className="group">
                              <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 bg-card/60 backdrop-blur-lg">
                                  <CardHeader className="p-6">
                                      <div className="flex items-start gap-4">
                                          <div className="bg-primary/10 p-3 rounded-lg">
                                              {ToolIcon && <ToolIcon className="h-6 w-6 text-primary" />}
                                          </div>
                                          <div className="flex-1">
                                              <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                                              <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-2">{tool.description}</CardDescription>
                                          </div>
                                      </div>
                                  </CardHeader>
                              </Card>
                          </Link>
                      );
                    })}
                  </div>
                  
                  {/* Ad Placeholder */}
                  <div className="my-12 h-24 flex items-center justify-center rounded-lg">
                      {/* Future ad content goes here */}
                  </div>

                </div>
              );
            })}
          </section>
          </>
    )
}
