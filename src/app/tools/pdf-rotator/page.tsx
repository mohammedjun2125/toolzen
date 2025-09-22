
'use client';

import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, RotateCw, RotateCcw } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Progress } from '@/components/ui/progress';

export default function PdfRotatorPage() {
    const [file, setFile] = useState<File | null>(null);
    const [pagePreviews, setPagePreviews] = useState<string[]>([]);
    const [pageRotations, setPageRotations] = useState<number[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const renderPdf = useCallback(async (file: File) => {
        setIsProcessing(true);
        setProgress(0);
        setPagePreviews([]);
        setPageRotations([]);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const numPages = pdfDoc.getPageCount();
            const rotations = Array(numPages).fill(0);
            setPageRotations(rotations);

            const previews: string[] = [];
            for (let i = 0; i < numPages; i++) {
                const newDoc = await PDFDocument.create();
                const [copiedPage] = await newDoc.copyPages(pdfDoc, [i]);
                newDoc.addPage(copiedPage);
                const pdfBytes = await newDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                previews.push(URL.createObjectURL(blob));
                setProgress(Math.round(((i + 1) / numPages) * 100));
            }
            setPagePreviews(previews);

        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: "Error loading PDF", description: "The file might be corrupted or password-protected." });
            resetState();
        } finally {
            setIsProcessing(false);
        }
    }, [toast]);
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Only PDF files are accepted.' });
                return;
            }
            setFile(selectedFile);
            renderPdf(selectedFile);
        }
    };
    
    const rotatePage = (index: number, direction: 'cw' | 'ccw') => {
        setPageRotations(prev => {
            const newRotations = [...prev];
            const change = direction === 'cw' ? 90 : -90;
            newRotations[index] = (newRotations[index] + change) % 360;
            return newRotations;
        });
    };

    const handleApplyChanges = async () => {
        if (!file) return;

        setIsProcessing(true);
        setProgress(0);
        toast({ title: 'Applying rotations...' });

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            
            pageRotations.forEach((rotation, index) => {
                if (rotation !== 0) {
                    const page = pdfDoc.getPage(index);
                    const currentRotation = page.getRotation().angle;
                    page.setRotation(degrees(currentRotation + rotation));
                }
            });

            const pdfBytes = await pdfDoc.save();
            saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `rotated-${file.name}`);
            toast({ title: 'Success!', description: 'Your PDF has been rotated and downloaded.' });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Apply Changes', description: 'An error occurred while saving the PDF.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const resetState = () => {
        setFile(null);
        setPagePreviews([]);
        setPageRotations([]);
        setIsProcessing(false);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Rotate PDF</CardTitle>
                <CardDescription>Rotate pages in your PDF document. All processing is done securely in your browser.</CardDescription>
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
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Rotate Pages</h3>
                        {isProcessing && progress < 100 ? (
                             <Progress value={progress} className="w-full" />
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {pagePreviews.map((previewUrl, index) => (
                                    <div key={index} className="relative group border rounded-lg p-2 flex flex-col items-center gap-2 bg-muted/20">
                                        <iframe src={`${previewUrl}#toolbar=0&navpanes=0`} className="w-full aspect-[3/4] border-none" title={`Page ${index + 1}`} />
                                        <p className="text-sm text-muted-foreground">Page {index + 1}</p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" onClick={() => rotatePage(index, 'ccw')}>
                                                <RotateCcw className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" onClick={() => rotatePage(index, 'cw')}>
                                                <RotateCw className="h-4 w-4" />
                                            </Button>
                                        </div>
                                         {pageRotations[index] !== 0 && (
                                            <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {pageRotations[index]/90}
                                            </div>
                                         )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Button onClick={resetState} variant="outline" size="sm">
                            <X className="mr-2 h-4 w-4" /> Change File
                        </Button>
                    </div>
                )}
                
                {isProcessing && file && <Progress value={progress} className="w-full" />}

                <Button onClick={handleApplyChanges} disabled={!file || isProcessing} className="w-full">
                    {isProcessing ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                        <><Download className="mr-2 h-4 w-4" /> Apply Changes & Download</>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
