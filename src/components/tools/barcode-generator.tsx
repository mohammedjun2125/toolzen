
'use client';

import { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';

const barcodeFormats = [
    "CODE128", "CODE39", "EAN13", "EAN8", "UPC", "ITF", "MSI", "Pharmacode"
];

export default function BarcodeGenerator() {
    const [text, setText] = useState('Toolzen-12345');
    const [format, setFormat] = useState('CODE128');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (canvasRef.current) {
            try {
                JsBarcode(canvasRef.current, text, {
                    format: format,
                    displayValue: true,
                    lineColor: '#000',
                    background: '#FFF',
                });
            } catch (error) {
                // The error is handled by JsBarcode by rendering an invalid barcode.
                // We could add a toast here, but it can be noisy as the user types.
            }
        }
    }, [text, format]);

    const handleDownload = () => {
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'barcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast({ title: 'Barcode downloaded as PNG.' });
        }
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Barcode Generator</CardTitle>
                <CardDescription>Create downloadable barcodes in various formats.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="text-input">Text to Encode</Label>
                        <Input
                            id="text-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text or numbers"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="format-select">Barcode Format</Label>
                        <Select value={format} onValueChange={setFormat}>
                            <SelectTrigger id="format-select">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {barcodeFormats.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg flex justify-center">
                    <canvas ref={canvasRef} />
                </div>

                <Button onClick={handleDownload} className="w-full" disabled={!text}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PNG
                </Button>
            </CardContent>
        </Card>
    );
}
