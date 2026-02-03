
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2 } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const barcodeFormats = ["CODE128", "CODE39", "EAN13", "UPC", "ITF", "MSI"];

export default function GenerateLabelSticker() {
    const [text, setText] = useState('My Product Sticker');
    const [barcodeData, setBarcodeData] = useState('1234567890');
    const [barcodeFormat, setBarcodeFormat] = useState('CODE128');
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (canvasRef.current && barcodeData) {
            try {
                JsBarcode(canvasRef.current, barcodeData, {
                    format: barcodeFormat,
                    width: 2,
                    height: 40,
                    displayValue: true
                });
            } catch (error) {
                // Invalid data for format, clear canvas
                const ctx = canvasRef.current.getContext('2d');
                ctx?.clearRect(0,0, canvasRef.current.width, canvasRef.current.height);
                console.warn("Barcode generation failed", error);
            }
        }
    }, [barcodeData, barcodeFormat]);

    const handleGeneratePdf = () => {
        if (!barcodeData) {
            toast({ variant: 'destructive', title: 'Missing Barcode Data' });
            return;
        }

        setIsGenerating(true);
        try {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const barcodeDataUrl = canvas.toDataURL('image/png');
            
            // Generic 3x2 inch label
            const labelWidth = 3 * 72; // 216 pts
            const labelHeight = 2 * 72; // 144 pts
            
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'pt',
                format: [labelWidth, labelHeight]
            });
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            const splitTitle = doc.splitTextToSize(text, labelWidth - 10);
            doc.text(splitTitle, labelWidth / 2, 20, { align: 'center' });

            doc.addImage(barcodeDataUrl, 'PNG', (labelWidth - 150) / 2, 40, 150, 50);

            doc.save('custom-sticker.pdf');

        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Generate PDF' });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Custom Label Sticker Generator</CardTitle>
                <CardDescription>Create your own printable product or inventory labels with custom text and barcodes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="text">Label Text</Label>
                        <Input id="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g., My Awesome Product" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="barcode-data">Barcode Data</Label>
                        <Input id="barcode-data" value={barcodeData} onChange={(e) => setBarcodeData(e.target.value)} placeholder="e.g., 123456789" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="barcode-format">Barcode Format</Label>
                        <Select value={barcodeFormat} onValueChange={setBarcodeFormat}>
                            <SelectTrigger id="barcode-format"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {barcodeFormats.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                            </SelectContent>
                        </Select>
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
                    Generate & Download PDF Sticker
                </Button>
            </CardContent>
        </Card>
    );
}
