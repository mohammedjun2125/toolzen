
'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2 } from 'lucide-react';
import type JsBarcode from 'jsbarcode';
import { Skeleton } from '../ui/skeleton';

const barcodeFormats = [
    "CODE128", "CODE39", "EAN13", "EAN8", "UPC", "ITF", "MSI", "Pharmacode"
];

function BarcodeGeneratorComponent({ JsBarcode }: { JsBarcode: typeof JsBarcode }) {
    const [text, setText] = useState('Toolzen-12345');
    const [format, setFormat] = useState('CODE128');
    const [isValid, setIsValid] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (canvasRef.current) {
            try {
                JsBarcode(canvasRef.current, text, {
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
    }, [text, format, JsBarcode]);

    const handleDownload = () => {
        if (!isValid || !canvasRef.current || !JsBarcode) {
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
        JsBarcode(canvas, text, {
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

const BarcodeGenerator = () => {
    const [JsBarcode, setJsBarcode] = useState<typeof JsBarcode | null>(null);

    useEffect(() => {
        import('jsbarcode').then(module => setJsBarcode(() => module.default));
    }, []);

    if (!JsBarcode) {
        return (
            <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Barcode Generator</CardTitle>
                    <CardDescription>Create downloadable barcodes in various formats.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        );
    }

    return <BarcodeGeneratorComponent JsBarcode={JsBarcode} />;
};

export default BarcodeGenerator;
