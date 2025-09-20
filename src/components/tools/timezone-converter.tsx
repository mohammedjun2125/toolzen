'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const TimezoneConverterClient = dynamic(() => import('./timezone-converter-client'), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  ),
});

export default function TimezoneConverter() {
  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Time Zone Converter</CardTitle>
        <CardDescription>Easily convert times between different parts of the world.</CardDescription>
      </CardHeader>
      <CardContent>
        <TimezoneConverterClient />
        <div className="text-center text-muted-foreground text-sm mt-6">
          Current time is based on your browser settings.
        </div>
      </CardContent>
    </Card>
  );
}
