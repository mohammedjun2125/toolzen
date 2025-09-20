
'use client';

import { useState, useEffect, useRef } from 'react';
import type JsBarcode from 'jsbarcode';
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
    const [isValid, setIsValid] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const jsBarcodeRef = useRef<typeof JsBarcode | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        import('jsbarcode').then(module => {
            jsBarcodeRef.current = module.default;
        });
    }, []);

    useEffect(() => {
        if (canvasRef.current && jsBarcodeRef.current) {
            try {
                jsBarcodeRef.current(canvasRef.current, text, {
                    format: format,
                    displayValue: true,
                    background: 'transparent',
                    lineColor: '#000000', // Always render black for consistency
                    fontOptions: 'bold',
                    font: 'monospace',
                    valid: (valid) => setIsValid(valid),
                });
            } catch (error) {
                setIsValid(false);
            }
        }
    }, [text, format]);

    const handleDownload = () => {
        if (!isValid || !canvasRef.current || !jsBarcodeRef.current) {
            toast({ variant: 'destructive', title: 'Invalid Barcode', description: 'Cannot download an invalid or empty barcode.' });
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        
        const originalCanvas = canvasRef.current;
        canvas.width = originalCanvas.width;
        canvas.height = originalCanvas.height;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let downloadIsValid = true;
        jsBarcodeRef.current(canvas, text, {
            format: format,
            displayValue: true,
            lineColor: '#000000',
            background: '#FFFFFF',
            fontOptions: 'bold',
            font: 'monospace',
            valid: (valid) => { downloadIsValid = valid; }
        });
        
        if (!downloadIsValid) {
             toast({ variant: 'destructive', title: 'Download Failed', description: 'The barcode data is invalid for the selected format.' });
             return;
        }

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `barcode-${text}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: 'Barcode downloaded as PNG.' });
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

                <div className="p-4 rounded-lg flex justify-center bg-white dark:bg-white">
                    <canvas ref={canvasRef} />
                </div>
                 {!isValid && (
                    <div className="text-center text-red-500 text-sm">
                        Invalid input for the selected barcode format. Please check the format's requirements.
                    </div>
                 )}

                <Button onClick={handleDownload} className="w-full" disabled={!text || !isValid}>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PNG
                </Button>
            </CardContent>
        </Card>
    );
}
