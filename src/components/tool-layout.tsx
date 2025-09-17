import Link from 'next/link';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ToolLayoutProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    faq: { question: string; answer: string }[];
};

export function ToolLayout({ children, title, description, faq }: ToolLayoutProps) {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4">
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
                
                <div id="ad-tool-page" className="min-h-[100px] min-w-[300px] mx-auto flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">
                    {/* <!-- Tool Page - Medium Rectangle --> */}
                    <ins className="adsbygoogle"
                         style={{ display: 'block' }}
                         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                         data-ad-slot="1234567890"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                    <Script id="init-tool-ad">
                        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                    </Script>
                </div>
                
                {children}

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
