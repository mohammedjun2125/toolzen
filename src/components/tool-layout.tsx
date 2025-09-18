'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

type ToolLayoutProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    faq: { question: string; answer: string }[];
};

export function ToolLayout({ children, title, description, faq }: ToolLayoutProps) {
    const [showAdModal, setShowAdModal] = useState(true);
    
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
             <Dialog open={showAdModal} onOpenChange={setShowAdModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Advertisement</DialogTitle>
                         <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DialogClose>
                    </DialogHeader>
                    <div className="min-h-[250px] w-full flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg p-4">
                        <div className="text-center">
                            <p>Medium Rectangle Ad</p>
                            <p className="text-xs">(e.g., 300x250 or 336x280)</p>
                        </div>
                        <ins className="adsbygoogle"
                            style={{ display: 'none' }}
                            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                            data-ad-slot="1234567890"
                            data-ad-format="auto"
                            data-full-width-responsive="true"></ins>
                    </div>
                </DialogContent>
            </Dialog>

             <Button asChild variant="ghost" className="mb-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <main className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                
                <div id="ad-tool-page" className="min-h-[100px] min-w-[320px] max-w-full mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                   <div className="text-center">
                     <p>Tool Page Ad</p>
                     <p className="text-xs">(e.g., 728x90)</p>
                   </div>
                    <ins className="adsbygoogle"
                         style={{ display: 'none' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="1234567890"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                </div>
                
                {children}

                <section className="related-articles mt-12">
                    <Card className="bg-card/60 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>Related Articles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li><Link href="/blog/how-to-compress-images-online" className="text-primary hover:underline">How to Compress Images Online Without Losing Quality</Link></li>
                                <li><Link href="/blog/online-pdf-merge-guide" className="text-primary hover:underline">How to Merge PDFs Safely</Link></li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {faq.length > 0 && (
                  <div className="mt-12">
                      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                      <Accordion type="single" collapsible className="w-full">
                          {faq.map((item, index) => (
                              <AccordionItem value={`item-${index}`} key={index}>
                                  <AccordionTrigger>{item.question}</AccordionTrigger>

                                  <AccordionContent>{item.answer}</AccordionContent>
                              </AccordionItem>
                          ))}
                      </Accordion>
                  </div>
                )}
            </main>
        </div>
    )
}
