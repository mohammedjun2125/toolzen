
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
import Link from 'next/link';

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
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Delete PDF Pages Online for Free</CardTitle>
                <CardDescription>Securely **remove pages from PDF free** with our easy-to-use online tool. Your files are processed in your browser for 100% privacy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!file ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" alt="Upload PDF to delete pages" />
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
                    <Button onClick={handleApplyChanges} disabled={isProcessing || pagesToDelete.size === 0} className="w-full text-lg py-6">
                        {isProcessing ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                        ) : (
                            <><Trash2 className="mr-2 h-4 w-4" /> Delete {pagesToDelete.size} Page(s) & Download</>
                        )}
                    </Button>
                )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">The Safest Way to Delete Unwanted PDF Pages</h2>
            <p>Have a PDF with extra blank pages, irrelevant sections, or sensitive information you need to remove? Our tool to **delete PDF pages online** is the perfect solution. This **free PDF editor** lets you **remove pages from a PDF** with just a few clicks. Because it's a **client-side PDF tool**, all processing happens securely in your browser, ensuring your document's privacy.</p>
            
            <h3>Benefits of Using Our PDF Page Remover</h3>
            <ul>
                <li><strong>Visual Page Selection:</strong> Easily preview all pages in your document and select the ones you want to delete.</li>
                <li><strong>Fast & Free:</strong> This is a **fast PDF converter** and editor that's completely free to use, with no limits.</li>
                <li><strong>No Software Installation:</strong> **Edit PDF pages** without downloading any software. Our tool works on all modern browsers.</li>
                <li><strong>Completely Private:</strong> Your files are never uploaded. This **online PDF tool** guarantees the confidentiality of your documents.</li>
            </ul>

            <h2 className="text-2xl font-bold">How to Delete Pages from a PDF Online</h2>
            <ol>
                <li><strong>Step 1: Upload Your PDF File:</strong> Drag and drop your PDF into the upload area, or click to select it from your device.</li>
                <li><strong>Step 2: Select Pages to Remove:</strong> A preview of each page will be displayed. Simply click on the pages you wish to delete. Selected pages will be marked for deletion.</li>
                <li><strong>Step 3: Process the PDF:</strong> Click the "Delete Page(s) & Download" button. The tool will instantly create a new PDF without the selected pages.</li>
                <li><strong>Step 4: Download Your New PDF:</strong> The modified PDF, with the pages removed, will be automatically saved to your computer.</li>
            </ol>

            <h3>Common Use Cases</h3>
            <ul>
                <li>**Reports:** Remove unnecessary cover pages or blank pages from a report before sending.</li>
                <li>**Confidential Documents:** **Delete unwanted pages from PDF online** that contain sensitive information before sharing the document.</li>
                <li>**Manuals:** Create a shorter version of a user manual by removing irrelevant sections.</li>
            </ul>

            <h2>Frequently Asked Questions (FAQs)</h2>
            <h3>How can I remove pages from a PDF for free?</h3>
            <p>Our tool offers a simple and free way to **remove pages from PDF free**. Upload your file, select the pages you don't want, and download the new, edited PDF. There are no fees or sign-ups required.</p>
            <h3>Is it safe to delete PDF pages online?</h3>
            <p>Yes. Our tool is one of the safest ways to **edit PDF pages** because it processes files directly on your device. Your PDF never reaches our servers, protecting your privacy completely.</p>
            <h3>Can I recover a page after I delete it?</h3>
            <p>Once you download the new PDF, the deleted pages are gone from that version. However, your original file remains untouched on your computer, so you can always re-upload it to start over if you make a mistake.</p>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Other Powerful PDF Utilities</h3>
                <p>After deleting pages, you may need to further edit your document:</p>
                <ul className="list-disc list-inside">
                    <li><Link href="/tools/pdf-merger" className="text-primary hover:underline">Merge PDF</Link> - Combine the edited PDF with other files.</li>
                    <li><Link href="/tools/pdf-splitter" className="text-primary hover:underline">Split PDF</Link> - If you need to break the PDF into more pieces.</li>
                </ul>
            </div>
        </article>
        </>
    );
}
