
'use client';

import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, Trash2, CheckSquare } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Progress } from '@/components/ui/progress';

export default function PdfDeleter() {
    const [file, setFile] = useState<File | null>(null);
    const [pagePreviews, setPagePreviews] = useState<string[]>([]);
    const [pagesToDelete, setPagesToDelete] = useState<Set<number>>(new Set());
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const renderPdf = useCallback(async (file: File) => {
        setIsProcessing(true);
        setProgress(0);
        setPagePreviews([]);
        setPagesToDelete(new Set());

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const numPages = pdfDoc.getPageCount();
            
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
    
    const togglePageSelection = (index: number) => {
        setPagesToDelete(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const handleApplyChanges = async () => {
        if (!file || pagesToDelete.size === 0) {
             toast({ variant: 'destructive', title: 'No Pages Selected', description: 'Please select at least one page to delete.' });
            return;
        }

        setIsProcessing(true);
        setProgress(0);
        toast({ title: 'Deleting pages...' });

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            
            const indicesToKeep = Array.from(Array(pdfDoc.getPageCount()).keys()).filter(i => !pagesToDelete.has(i));

            const newDoc = await PDFDocument.create();
            const copiedPages = await newDoc.copyPages(pdfDoc, indicesToKeep);
            copiedPages.forEach(page => newDoc.addPage(page));

            const pdfBytes = await newDoc.save();
            saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `deleted-${file.name}`);
            toast({ title: 'Success!', description: 'Your new PDF has been downloaded.' });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Delete Pages', description: 'An error occurred while modifying the PDF.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const resetState = () => {
        setFile(null);
        setPagePreviews([]);
        setPagesToDelete(new Set());
        setIsProcessing(false);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Delete PDF Pages</CardTitle>
                <CardDescription>Securely remove unwanted pages from your PDF documents directly in your browser.</CardDescription>
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
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Select pages to delete from: {file.name}</h3>
                            <Button onClick={resetState} variant="outline" size="sm">
                                <X className="mr-2 h-4 w-4" /> Change File
                            </Button>
                        </div>
                        {isProcessing && progress < 100 ? (
                             <Progress value={progress} className="w-full" />
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {pagePreviews.map((previewUrl, index) => (
                                    <div 
                                        key={index}
                                        className="relative group border-2 rounded-lg p-2 flex flex-col items-center gap-2 cursor-pointer"
                                        onClick={() => togglePageSelection(index)}
                                        style={{ borderColor: pagesToDelete.has(index) ? 'hsl(var(--destructive))' : 'hsl(var(--border))' }}
                                    >
                                        <iframe src={`${previewUrl}#toolbar=0&navpanes=0`} className="w-full aspect-[3/4] border-none pointer-events-none" title={`Page ${index + 1}`} />
                                        <p className="text-sm text-muted-foreground">Page {index + 1}</p>
                                         {pagesToDelete.has(index) && (
                                            <div className="absolute inset-0 bg-destructive/80 flex items-center justify-center">
                                                <Trash2 className="h-16 w-16 text-destructive-foreground" />
                                            </div>
                                         )}
                                          <div className="absolute top-2 right-2 bg-background/80 rounded-sm p-1">
                                             <CheckSquare className={`h-5 w-5 ${pagesToDelete.has(index) ? 'text-destructive' : 'text-muted-foreground'}`}/>
                                          </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                
                {file && (
                    <Button onClick={handleApplyChanges} disabled={isProcessing || pagesToDelete.size === 0} className="w-full">
                        {isProcessing ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                        ) : (
                            <><Trash2 className="mr-2 h-4 w-4" /> Delete {pagesToDelete.size} Page(s) & Download</>
                        )}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
