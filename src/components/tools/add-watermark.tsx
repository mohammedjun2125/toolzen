
'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, File as FileIcon } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

export default function AddWatermark() {
    const [file, setFile] = useState<File | null>(null);
    const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
    const [opacity, setOpacity] = useState(0.5);
    const [fontSize, setFontSize] = useState(50);
    const [rotation, setRotation] = useState(-45);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [generatingPreview, setGeneratingPreview] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const generatePdfWithWatermark = async () => {
        if (!file) return null;
        
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();

        const textColor = rgb(0.5, 0.5, 0.5); // A semi-transparent gray color

        for (const page of pages) {
            const { width, height } = page.getSize();
            page.drawText(watermarkText, {
                x: width / 2,
                y: height / 2,
                font: helveticaFont,
                size: fontSize,
                color: textColor,
                opacity: opacity,
                rotate: degrees(rotation),
                xSkew: degrees(0),
                ySkew: degrees(0),
            });
        }
        return await pdfDoc.save();
    }

    useEffect(() => {
        if (!file) return;

        const timer = setTimeout(async () => {
            setGeneratingPreview(true);
            try {
                const pdfBytes = await generatePdfWithWatermark();
                if (pdfBytes) {
                    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(URL.createObjectURL(blob));
                }
            } catch (error) {
                console.error("Failed to generate preview", error);
                toast({ variant: 'destructive', title: 'Preview Error', description: 'Could not generate a preview.' });
            } finally {
                setGeneratingPreview(false);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file, watermarkText, opacity, fontSize, rotation]);
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Only PDF files are accepted.' });
                return;
            }
            setFile(selectedFile);
        }
    };
    
    const handleDownload = async () => {
        if (!file || !watermarkText.trim()) {
            toast({ variant: 'destructive', title: 'Missing Information', description: 'Please select a file and enter watermark text.' });
            return;
        }

        setIsProcessing(true);
        toast({ title: 'Applying watermark to your PDF...' });

        try {
            const pdfBytes = await generatePdfWithWatermark();
            if (pdfBytes) {
                saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `watermarked-${file.name}`);
                toast({ title: 'Success!', description: 'Your PDF has been watermarked and downloaded.' });
            }
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Add Watermark', description: 'An error occurred while processing the file.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const resetState = () => {
        setFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Add Watermark to PDF</CardTitle>
                <CardDescription>Stamp a text watermark onto your PDF and see a live preview of your changes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!file ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Click to upload or drag and drop a PDF</p>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                             <div className="border rounded-lg p-4 flex items-center justify-between gap-4 bg-muted/20">
                                <div className="flex items-center gap-4 truncate">
                                    <FileIcon className="h-6 w-6 text-primary" />
                                    <p className="text-sm truncate">{file.name}</p>
                                </div>
                                <Button onClick={resetState} variant="ghost" size="icon">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="watermark-text">Watermark Text</Label>
                                <Input
                                    id="watermark-text"
                                    value={watermarkText}
                                    onChange={(e) => setWatermarkText(e.target.value)}
                                    placeholder="e.g., DRAFT, CONFIDENTIAL"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Font Size: {fontSize}px</Label>
                                <Slider value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} min={10} max={200} step={2} />
                            </div>
                             <div className="space-y-2">
                                <Label>Opacity: {opacity.toFixed(2)}</Label>
                                <Slider value={[opacity]} onValueChange={(v) => setOpacity(v[0])} min={0.1} max={1} step={0.05} />
                            </div>
                             <div className="space-y-2">
                                <Label>Rotation: {rotation}°</Label>
                                <Slider value={[rotation]} onValueChange={(v) => setRotation(v[0])} min={-90} max={90} step={5} />
                            </div>
                             <Button onClick={handleDownload} disabled={isProcessing} className="w-full">
                                {isProcessing ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Applying Watermark...</>
                                ) : (
                                    <><Download className="mr-2 h-4 w-4" /> Apply & Download</>
                                )}
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <Label>Live Preview</Label>
                            <div className="border rounded-lg aspect-[3/4] w-full relative">
                                {generatingPreview && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                                        <Loader2 className="h-8 w-8 animate-spin" />
                                    </div>
                                )}
                                {previewUrl ? (
                                    <embed src={previewUrl} type="application/pdf" className="w-full h-full border-none rounded-lg" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted/30 rounded-lg">
                                       <p className="text-muted-foreground text-sm">Preview will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
