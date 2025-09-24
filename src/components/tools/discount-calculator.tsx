
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState('100');
    const [discount, setDiscount] = useState('20');

    const calculation = useMemo(() => {
        const price = parseFloat(originalPrice);
        const disc = parseFloat(discount);

        if (isNaN(price) || isNaN(disc)) {
            return { finalPrice: 0, savedAmount: 0 };
        }
        
        const savedAmount = (price * disc) / 100;
        const finalPrice = price - savedAmount;
        
        return { finalPrice, savedAmount };

    }, [originalPrice, discount]);

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Discount Calculator</CardTitle>
                <CardDescription>Quickly calculate the final price after a discount.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="original-price">Original Price ($)</Label>
                        <Input
                            id="original-price"
                            type="number"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(e.target.value)}
                            placeholder="e.g., 100"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="discount">Discount (%)</Label>
                        <Input
                            id="discount"
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                             placeholder="e.g., 20"
                        />
                    </div>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg text-center space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground">Final Price</h3>
                        <p className="text-4xl font-bold text-primary">${calculation.finalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                        <h4 className="text-sm text-muted-foreground">You Save</h4>
                        <p className="text-lg font-semibold">${calculation.savedAmount.toFixed(2)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
