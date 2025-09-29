
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grip } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { mockPosts } from '@/lib/blog';
import type { ToolCategoryInfo } from '@/lib/tools';

type ToolLayoutProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    faq: { question: string; answer: string }[];
    categoryId: ToolCategoryInfo['id'];
};

export function ToolLayout({ children, title, description, faq, categoryId }: ToolLayoutProps) {
    // Find related articles based on keywords in title
    const keywords = title.toLowerCase().split(' ').filter(kw => kw.length > 3);
    const relatedArticles = mockPosts.filter(post => 
        keywords.some(keyword => post.title.toLowerCase().includes(keyword) || post.content.toLowerCase().includes(keyword))
    ).slice(0, 4);

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
             <div className="flex justify-between items-center mb-4">
                <Button asChild variant="ghost">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href={`/category/${categoryId}`}>
                        <Grip className="mr-2 h-4 w-4" />
                        Back to Category
                    </Link>
                </Button>
            </div>
            <main className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                
                {children}

                {/* Ad Placeholder */}
                <div className="my-8 h-24 flex items-center justify-center bg-muted/20 rounded-lg">
                    <span className="text-muted-foreground text-sm">Ad Placeholder</span>
                </div>

                {relatedArticles.length > 0 && (
                  <section className="related-articles mt-12">
                      <Card className="bg-card/60 backdrop-blur-lg">
                          <CardHeader>
                              <CardTitle>Helpful Guides & Articles</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <ul className="space-y-2">
                                  {relatedArticles.map(post => (
                                      <li key={post.slug}>
                                          <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                                              {post.title}
                                          </Link>
                                      </li>
                                  ))}
                              </ul>
                          </CardContent>
                      </Card>
                  </section>
                )}


                {faq.length > 0 && (
                  <div className="mt-12">
                      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                      <Accordion type="single" collapsible className="w-full">
                          {faq.map((item, index) => (
                              <AccordionItem value={`item-${index}`} key={index}>
                                  <AccordionTrigger>{item.question}</AccordionTrigger>

                                  <AccordionContent><p className="prose dark:prose-invert max-w-none">{item.answer}</p></AccordionContent>
                              </AccordionItem>
                          ))}
                      </Accordion>
                  </div>
                )}
            </main>
        </div>
    )
}
