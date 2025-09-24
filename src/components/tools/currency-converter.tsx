
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://api.frankfurter.app/latest';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState('1');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [rates, setRates] = useState<{[key: string]: number} | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchRates = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch rates');
                const data = await response.json();
                setRates({ ...data.rates, [data.base]: 1 });
            } catch (error) {
                toast({ variant: 'destructive', title: 'Error', description: 'Could not load exchange rates. Please try again later.' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchRates();
    }, [toast]);

    const convertedAmount = useMemo(() => {
        if (!rates) return '';
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) return '';

        const rateFrom = rates[fromCurrency];
        const rateTo = rates[toCurrency];
        
        if (rateFrom && rateTo) {
            // All rates are based on EUR, so convert from -> EUR -> to
            const amountInEur = numAmount / rateFrom;
            const finalAmount = amountInEur * rateTo;
            return finalAmount.toFixed(4);
        }
        return '';

    }, [amount, fromCurrency, toCurrency, rates]);
    
    const swapCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };
    
    const currencyList = rates ? Object.keys(rates).sort() : [];

    if (isLoading) {
        return (
             <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg flex items-center justify-center min-h-[300px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading latest exchange rates...</span>
                </div>
            </Card>
        )
    }

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Currency Converter</CardTitle>
                <CardDescription>Get real-time exchange rates and convert between major world currencies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="from-amount">Amount</Label>
                        <Input id="from-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {currencyList.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-center">
                        <Button variant="ghost" size="icon" onClick={swapCurrencies}>
                            <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label>Converted Amount</Label>
                        <Input value={convertedAmount} readOnly className="font-bold text-lg" />
                         <Select value={toCurrency} onValueChange={setToCurrency}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {currencyList.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                    Exchange rates are updated daily. For informational purposes only.
                </p>
            </CardContent>
        </Card>
    );
}
