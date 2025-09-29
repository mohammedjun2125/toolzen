
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
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

export default function PdfRotator() {
    const [file, setFile] = useState<File | null>(null);
    const [pagePreviews, setPagePreviews] = useState<string[]>([]);
    const [pageRotations, setPageRotations] = useState<number[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const toolKeywords = (seoKeywords.tools as any)['pdf-rotator'];

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
            newRotations[index] = (newRotations[index] + 360 + change) % 360;
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
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')}</CardTitle>
                <CardDescription>Easily **{toolKeywords.meta_keywords.join(', ')}** clockwise or counterclockwise. Fix the orientation of your PDF documents securely in your browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!file ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" alt="Upload a PDF to rotate its pages" />
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
                            <h3 className="font-semibold text-lg">Rotate Pages in: {file.name}</h3>
                            <Button onClick={resetState} variant="outline" size="sm">
                                <X className="mr-2 h-4 w-4" /> Change File
                            </Button>
                        </div>
                        {isProcessing && progress < 100 ? (
                             <Progress value={progress} className="w-full" />
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                                            <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                                                {pageRotations[index]}°
                                            </div>
                                         )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                
                {file && (
                    <Button onClick={handleApplyChanges} disabled={isProcessing} className="w-full text-lg py-6">
                        {isProcessing ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                        ) : (
                            <><Download className="mr-2 h-4 w-4" /> Apply Changes & Download PDF</>
                        )}
                    </Button>
                )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">Instantly Fix PDF Page Orientation</h2>
            <p>Scanned a document upside down? Is a page in your report sideways? Our **free online PDF rotator** lets you **turn PDF pages** to the correct orientation in seconds. This **PDF editor free** tool works entirely in your browser, ensuring your files are processed quickly and privately without needing to install any software.</p>
            
            <h3>Features of Our PDF Page Rotation Tool</h3>
            <ul>
                <li><strong>Individual Page Control:</strong> Rotate specific pages or all pages at once. You have full control to **rotate PDF pages online**.</li>
                <li><strong>90, 180, or 270 Degrees:</strong> Turn pages clockwise or counterclockwise in 90-degree increments to get the perfect orientation.</li>
                <li><strong>100% Secure & Private:</strong> This is a **client-side PDF tool**. Your PDF is never uploaded to a server. All processing happens on your computer.</li>
                <li><strong>Fast and Free:</strong> No signups, no watermarks, no limits. A truly **free PDF utility** for everyone.</li>
            </ul>

            <h2 className="text-2xl font-bold">How to Rotate PDF Pages Online for Free</h2>
            <ol>
                <li><strong>Step 1: Upload Your PDF:</strong> Click the upload box to select your PDF file.</li>
                <li><strong>Step 2: Preview and Rotate:</strong> See a preview of every page. Use the rotate buttons under each page to turn it left or right. A badge will show the current rotation angle.</li>
                <li><strong>Step 3: Apply Changes:</strong> Once you've corrected the orientation for all necessary pages, click the "Apply Changes & Download" button.</li>
                <li><strong>Step 4: Download Your Rotated PDF:</strong> Your new, correctly oriented PDF will be saved to your device instantly.</li>
            </ol>

            <h3>Common Use Cases</h3>
            <ul>
                <li>**Scanned Documents:** Quickly fix scanned receipts, forms, or photos that were scanned in the wrong orientation.</li>
                <li>**Presentations:** Ensure all slides and pages in your **PDF pages for presentations or reports** are facing the right way.</li>
                <li>**Digital Booklets:** Correct the layout of digital catalogs or brochures where some pages might be landscape and others portrait.</li>
            </ul>

            <h2>Frequently Asked Questions (FAQs)</h2>
            <h3>How do you turn PDF pages?</h3>
            <p>Our tool makes it easy. After uploading your PDF, you'll see a preview of each page. Simply click the clockwise or counterclockwise rotate buttons below a page to turn it. You can rotate pages by 90, 180, or 270 degrees.</p>
            <h3>Is it free to rotate pages in a PDF?</h3>
            <p>Yes, our **PDF page rotation free** tool is completely free to use. There are no hidden costs or limitations on the number of files or pages you can rotate.</p>
            <h3>Will rotating a PDF reduce its quality?</h3>
            <p>No, rotating a PDF is a lossless operation. It only changes the metadata for the page's orientation. The quality of the text, images, and other content on the page will remain exactly the same.</p>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Other Free PDF Editing Tools</h3>
                <p>Once your pages are rotated, you may need to perform other edits. Try our other **online PDF tools**:</p>
                <div className="flex gap-2 flex-wrap">
                    <Button asChild variant="outline"><Link href="/tools/pdf-merger">Merge PDF</Link></Button>
                    <Button asChild variant="outline"><Link href="/tools/pdf-deleter">Delete PDF Pages</Link></Button>
                </div>
            </div>
        </article>
        </>
    );
}
