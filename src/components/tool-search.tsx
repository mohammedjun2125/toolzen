
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { iconMap } from './home-client';
import { SearchIcon } from 'lucide-react';

export function ToolSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = searchTerm.trim() ? tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <section id="tool-search" className="container mx-auto px-4 md:px-6 mb-16">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for any tool..."
            className="w-full pl-10 text-lg py-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm.trim() && (
            <div className="mt-4 border rounded-lg bg-card/80 backdrop-blur-lg max-h-96 overflow-y-auto">
                {filteredTools.length > 0 ? (
                     <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredTools.map((tool) => {
                            const ToolIcon = iconMap[tool.icon as keyof typeof iconMap] as React.ElementType;
                            return (
                            <Link href={tool.href} key={tool.id} className="group">
                                <Card className="h-full transition-all duration-300 ease-in-out hover:bg-muted/50">
                                    <CardHeader className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-primary/10 p-3 rounded-lg">
                                                {ToolIcon && <ToolIcon className="h-6 w-6 text-primary" />}
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-md font-semibold">{tool.name}</CardTitle>
                                                <CardDescription className="mt-1 text-xs text-muted-foreground line-clamp-2">{tool.description}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-8 text-center text-muted-foreground">
                        No tools found for "{searchTerm}".
                    </div>
                )}
            </div>
        )}
      </div>
    </section>
  );
}
