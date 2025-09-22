
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const pdfTools = [
    { name: 'Merge PDF', href: '/tools/pdf-merger', description: 'Combine multiple PDFs into one.' },
    // { name: 'Split PDF', href: '/tools/pdf-splitter', description: 'Extract pages from a PDF.' },
    // { name: 'Compress PDF', href: '/tools/pdf-compressor', description: 'Reduce the file size of your PDF.' },
];


export default function PdfToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4">
             <Button asChild variant="ghost" className="mb-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <aside className="md:col-span-3">
                     <Card className="sticky top-20 bg-card/60 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>PDF Tools</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <nav className="flex flex-col gap-2">
                                {pdfTools.map(tool => (
                                    <Button asChild variant="ghost" className="justify-start" key={tool.href}>
                                        <Link href={tool.href}>
                                            {tool.name}
                                        </Link>
                                    </Button>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                </aside>
                <main className="md:col-span-9">
                    {children}
                </main>
            </div>
        </div>
    );
}
