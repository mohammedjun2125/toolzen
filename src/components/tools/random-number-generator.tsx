
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';

export default function RandomNumberGenerator() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const { toast } = useToast();

    const generateRandomNumber = () => {
        const minVal = Math.ceil(min);
        const maxVal = Math.floor(max);
        if (minVal > maxVal) {
            toast({ variant: 'destructive', title: 'Invalid Range', description: 'Min value cannot be greater than max value.' });
            return;
        }
        const result = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        setRandomNumber(result);
    };

    const copyToClipboard = () => {
        if (randomNumber !== null) {
            navigator.clipboard.writeText(randomNumber.toString());
            toast({ title: `Copied ${randomNumber} to clipboard!` });
        }
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Random Number Generator</CardTitle>
                <CardDescription>Generate a random number within a specified range.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="min-val">Min Value</Label>
                        <Input
                            id="min-val"
                            type="number"
                            value={min}
                            onChange={(e) => setMin(parseInt(e.target.value, 10))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="max-val">Max Value</Label>
                        <Input
                            id="max-val"
                            type="number"
                            value={max}
                            onChange={(e) => setMax(parseInt(e.target.value, 10))}
                        />
                    </div>
                </div>

                <Button onClick={generateRandomNumber} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Number
                </Button>

                {randomNumber !== null && (
                    <div className="p-6 bg-muted/50 rounded-lg text-center relative">
                        <p className="text-6xl font-bold text-primary tracking-tighter">{randomNumber}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={copyToClipboard}
                        >
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
