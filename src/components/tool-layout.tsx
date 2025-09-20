
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import Balancer from 'react-wrap-balancer';

type ToolLayoutProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    faq: { question: string; answer: string }[];
};

export function ToolLayout({ children, title, description, faq }: ToolLayoutProps) {
    const [showAdModal, setShowAdModal] = useState(false);
    
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
                    <h1 className="text-3xl font-bold tracking-tight"><Balancer>{title}</Balancer></h1>
                    <p className="text-muted-foreground"><Balancer>{description}</Balancer></p>
                </div>
                
                {children}

                 <div className="my-8 text-center bg-muted/30 p-8 rounded-lg">
                    <h3 className="font-bold text-lg">Advertisement</h3>
                    <div className="w-full max-w-[728px] h-[90px] mx-auto bg-background/50 my-2 flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Leaderboard Ad (728x90)</p>
                    </div>
                </div>

                <section className="related-articles mt-12">
                    <Card className="bg-card/60 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>Related Articles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li><Link href="/blog/how-to-compress-images-online" className="text-primary hover:underline">How to Compress Images Online Without Losing Quality</Link></li>
                                <li><Link href="/blog/how-to-merge-pdfs-safely" className="text-primary hover:underline">How to Merge PDFs Safely</Link></li>
                                <li><Link href="/blog/how-to-resize-images-online" className="text-primary hover:underline">How to Resize Images Without Losing Quality</Link></li>
                                <li><Link href="/blog/how-to-calculate-percentages-quickly" className="text-primary hover:underline">How to Calculate Percentages Quickly</Link></li>
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
