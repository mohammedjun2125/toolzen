
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function LoanEmiCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [interest, setInterest] = useState(10.5);
    const [tenure, setTenure] = useState(12); // in months

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
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
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
                        <Label htmlFor="principal">Loan Amount: {formatCurrency(principal)}</Label>
                        <Slider
                            id="principal"
                            value={[principal]}
                            onValueChange={(v) => setPrincipal(v[0])}
                            min={1000}
                            max={1000000}
                            step={1000}
                        />
                    </div>
                    <div>
                        <Label htmlFor="interest">Interest Rate: {interest.toFixed(2)} %</Label>
                        <Slider
                            id="interest"
                            value={[interest]}
                            onValueChange={(v) => setInterest(v[0])}
                            min={1}
                            max={25}
                            step={0.1}
                        />
                    </div>
                    <div>
                        <Label htmlFor="tenure">Tenure (Months): {tenure}</Label>
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
                        <div className="flex justify-around">
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
