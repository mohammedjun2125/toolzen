
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const currencies = [
    { value: 'USD', label: '$ USD' },
    { value: 'EUR', label: '€ EUR' },
    { value: 'GBP', label: '£ GBP' },
    { value: 'INR', label: '₹ INR' },
    { value: 'JPY', label: '¥ JPY' },
];

export default function LoanEmiCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [interest, setInterest] = useState(10.5);
    const [tenure, setTenure] = useState(12); // in months
    const [currency, setCurrency] = useState('USD');

    const emiResult = useMemo(() => {
        const p = principal;
        const r = interest / 12 / 100;
        const n = tenure;
        if (p > 0 && r > 0 && n > 0) {
            const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayable = emi * n;
            const totalInterest = totalPayable - p;
            return {
                emi: emi,
                totalPayable: totalPayable,
                totalInterest: totalInterest,
            };
        }
        return null;
    }, [principal, interest, tenure]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Loan / EMI Calculator</CardTitle>
                <CardDescription>Calculate your Equated Monthly Installment (EMI) for loans.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                           <Label htmlFor="principal">Loan Amount</Label>
                           <div className="flex items-center gap-2">
                                <Select value={currency} onValueChange={setCurrency}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currencies.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                               <Input
                                   type="number"
                                   value={principal}
                                   onChange={(e) => setPrincipal(Number(e.target.value))}
                                   className="w-36"
                               />
                           </div>
                        </div>
                        <Slider
                            id="principal"
                            value={[principal]}
                            onValueChange={(v) => setPrincipal(v[0])}
                            min={1000}
                            max={5000000}
                            step={1000}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <Label htmlFor="interest">Interest Rate (% p.a.)</Label>
                             <Input
                                type="number"
                                value={interest}
                                onChange={(e) => setInterest(Number(e.target.value))}
                                className="w-24"
                                step="0.1"
                            />
                        </div>
                        <Slider
                            id="interest"
                            value={[interest]}
                            onValueChange={(v) => setInterest(v[0])}
                            min={1}
                            max={30}
                            step={0.1}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                           <Label htmlFor="tenure">Tenure (Months)</Label>
                            <Input
                                type="number"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-24"
                            />
                        </div>
                        <Slider
                            id="tenure"
                            value={[tenure]}
                            onValueChange={(v) => setTenure(v[0])}
                            min={1}
                            max={360}
                            step={1}
                        />
                    </div>
                </div>

                {emiResult && (
                    <div className="p-6 bg-muted/50 rounded-lg text-center space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-muted-foreground">Monthly EMI</h3>
                            <p className="text-4xl font-bold text-primary">{formatCurrency(emiResult.emi)}</p>
                        </div>
                        <div className="flex justify-around flex-wrap gap-4">
                            <div>
                                <h4 className="text-sm text-muted-foreground">Total Interest</h4>
                                <p className="text-lg font-semibold">{formatCurrency(emiResult.totalInterest)}</p>
                            </div>
                            <div>
                                <h4 className="text-sm text-muted-foreground">Total Payable</h4>
                                <p className="text-lg font-semibold">{formatCurrency(emiResult.totalPayable)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
