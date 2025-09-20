
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function PercentageOfNumber() {
    const [percent, setPercent] = useState('10');
    const [number, setNumber] = useState('50');

    const result = useMemo(() => {
        const p = parseFloat(percent);
        const n = parseFloat(number);
        if (!isNaN(p) && !isNaN(n)) {
            return (p / 100) * n;
        }
        return '';
    }, [percent, number]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Input type="number" value={percent} onChange={e => setPercent(e.target.value)} />
                <Label>% of</Label>
                <Input type="number" value={number} onChange={e => setNumber(e.target.value)} />
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
                <Label>Result</Label>
                <p className="text-2xl font-bold">{result}</p>
            </div>
        </div>
    );
}

function NumberIsWhatPercentOf() {
    const [num1, setNum1] = useState('5');
    const [num2, setNum2] = useState('50');

    const result = useMemo(() => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        if (!isNaN(n1) && !isNaN(n2) && n2 !== 0) {
            return (n1 / n2) * 100;
        }
        return '';
    }, [num1, num2]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Input type="number" value={num1} onChange={e => setNum1(e.target.value)} />
                <Label>is what % of</Label>
                <Input type="number" value={num2} onChange={e => setNum2(e.target.value)} />
            </div>
            <div className="p-4 bg-muted/50 rounded-lg text-center">
                <Label>Result</Label>
                <p className="text-2xl font-bold">{result !== '' ? `${result.toFixed(2)}%` : ''}</p>
            </div>
        </div>
    );
}

function PercentageIncreaseDecrease() {
    const [from, setFrom] = useState('40');
    const [to, setTo] = useState('50');

    const result = useMemo(() => {
        const f = parseFloat(from);
        const t = parseFloat(to);
        if (!isNaN(f) && !isNaN(t) && f !== 0) {
            const change = ((t - f) / f) * 100;
            return {
                value: change,
                type: change >= 0 ? 'Increase' : 'Decrease',
            };
        }
        return null;
    }, [from, to]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Label>From</Label>
                <Input type="number" value={from} onChange={e => setFrom(e.target.value)} />
                <Label>to</Label>
                <Input type="number" value={to} onChange={e => setTo(e.target.value)} />
            </div>
            {result && (
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <Label>Result</Label>
                    <p className={`text-2xl font-bold ${result.type === 'Increase' ? 'text-green-500' : 'text-red-500'}`}>
                        {result.value.toFixed(2)}% {result.type}
                    </p>
                </div>
            )}
        </div>
    );
}


export default function PercentageCalculator() {
    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Percentage Calculator</CardTitle>
                <CardDescription>A simple tool to perform various percentage calculations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="percentOf" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="percentOf">What is X% of Y?</TabsTrigger>
                        <TabsTrigger value="isWhatPercent">X is what % of Y?</TabsTrigger>
                        <TabsTrigger value="incDec">% Change</TabsTrigger>
                    </TabsList>
                    <TabsContent value="percentOf" className="mt-6">
                        <PercentageOfNumber />
                    </TabsContent>
                    <TabsContent value="isWhatPercent" className="mt-6">
                        <NumberIsWhatPercentOf />
                    </TabsContent>
                    <TabsContent value="incDec" className="mt-6">
                        <PercentageIncreaseDecrease />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
