
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileClock } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoonTool() {
    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">This Tool is Coming Soon!</CardTitle>
                <CardDescription>We're working hard to build this new utility for you.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center">
                    <FileClock className="h-16 w-16 text-primary" />
                    <p className="mt-4 text-muted-foreground">
                        This tool is under construction. It will be a fast, free, and private utility, just like all our other tools.
                        Check back soon!
                    </p>
                </div>
                 <div className="text-center mt-6">
                    <p className="text-muted-foreground mb-4">In the meantime, explore our other free tools:</p>
                    <Link href="/" className="text-primary hover:underline font-semibold">
                        Back to Homepage
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
