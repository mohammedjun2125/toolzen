
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import JsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';

export default function GenerateAmazonFbaSticker() {
    const [fnsku, setFnsku] = useState('X0012345AB');
    const [productName, setProductName] = useState('Example Product Title That Might Be Quite Long');
    const [condition, setCondition] = useState('New');
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (canvasRef.current && fnsku) {
            try {
                JsBarcode(canvasRef.current, fnsku, {
                    format: 'CODE128',
                    width: 2,
                    height: 50,
                    displayValue: true,
                    fontOptions: 'bold',
                    fontSize: 18
                });
            } catch (error) {
                console.error("Barcode generation failed", error);
            }
        }
    }, [fnsku]);

    const handleGeneratePdf = () => {
        if (!fnsku || !productName) {
            toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out all fields.' });
            return;
        }

        setIsGenerating(true);
        try {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const barcodeDataUrl = canvas.toDataURL('image/png');
            
            // Standard FBA label size is roughly 2.625 x 1 inch (or 66.7 x 25.4 mm)
            // jsPDF uses points (1pt = 1/72 inch).
            const labelWidth = 2.625 * 72; // ~189 pts
            const labelHeight = 1 * 72; // 72 pts
            
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'pt',
                format: [labelWidth, labelHeight]
            });
            
            // Product Name (can wrap)
            doc.setFontSize(8);
            const splitTitle = doc.splitTextToSize(productName, labelWidth - 10);
            doc.text(splitTitle, 5, 12);

            // Barcode
            doc.addImage(barcodeDataUrl, 'PNG', 15, 25, labelWidth - 30, 30);
            
            // Condition
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.text(`Condition: ${condition}`, 5, labelHeight - 5);

            doc.save('fba-sticker.pdf');
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Generate PDF', description: 'An unexpected error occurred.' });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Amazon FBA Sticker Generator</CardTitle>
                <CardDescription>Create and download standard FNSKU item labels for your FBA products.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fnsku">FNSKU</Label>
                        <Input id="fnsku" value={fnsku} onChange={(e) => setFnsku(e.target.value)} placeholder="e.g., X0012345AB" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Textarea id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Your full product title..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Input id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="e.g., New" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Barcode Preview</Label>
                    <div className="p-4 bg-white rounded-lg flex justify-center">
                        <canvas ref={canvasRef} />
                    </div>
                </div>

                <Button onClick={handleGeneratePdf} disabled={isGenerating} className="w-full text-lg py-6">
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    Generate & Download PDF
                </Button>
            </CardContent>
        </Card>
    );
}
