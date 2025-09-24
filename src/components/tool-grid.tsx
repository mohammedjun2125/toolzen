
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools, categories, ToolCategoryInfo } from '@/lib/tools';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { iconMap } from './home-client';

export function ToolGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredTools = tools.filter(
    (tool) =>
      (activeCategory === 'All' || tool.category.id === activeCategory) &&
      (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="w-full pb-20 md:pb-32 lg:pb-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 max-w-lg mx-auto">
          <Input
            type="search"
            placeholder="Search for a tool..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-8">
            <Button
                variant={activeCategory === 'All' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('All')}
            >
                All
            </Button>
            {categories.map(category => (
                <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setActiveCategory(category.id)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const ToolIcon = iconMap[tool.icon as keyof typeof iconMap] as React.ElementType;
            return (
              <Link href={tool.href} key={tool.href} className="group">
                <Card className="h-full transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 bg-card/60 backdrop-blur-lg">
                  <CardHeader className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        {ToolIcon && <ToolIcon className="h-6 w-6 text-primary" />}
                      </div>
                      <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                    </div>
                    <CardDescription className="mt-4 text-sm text-muted-foreground">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
        {filteredTools.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No tools found.</p>
        )}
      </div>
    </section>
  );
}
