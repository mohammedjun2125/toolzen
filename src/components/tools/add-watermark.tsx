
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
import Link from 'next/link';

export default function AddWatermark() {
    const [file, setFile] = useState<File | null>(null);
    const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
    const [opacity, setOpacity] = useState(0.5);
    const [fontSize, setFontSize] = useState(120);
    const [rotation, setRotation] = useState(-45);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const generatePdfWithWatermark = async () => {
        if (!file) return null;
        
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const pages = pdfDoc.getPages();

        for (const page of pages) {
            const { width, height } = page.getSize();
            
            const textWidth = helveticaFont.widthOfTextAtSize(watermarkText.toUpperCase(), fontSize);
            const textHeight = helveticaFont.heightAtSize(fontSize);

            page.drawText(watermarkText.toUpperCase(), {
                x: width / 2 - textWidth / 2,
                y: height / 2 + textHeight / 4,
                font: helveticaFont,
                size: fontSize,
                color: rgb(0.5, 0.5, 0.5),
                opacity: opacity,
                rotate: degrees(rotation),
            });
        }

        return await pdfDoc.saveAsBase64({ dataUri: true });
    }
    
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
            const pdfDataUri = await generatePdfWithWatermark();
            if (pdfDataUri) {
                const pdfBytes = await fetch(pdfDataUri).then(res => res.arrayBuffer());
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
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Add Watermark to PDF Online Free</CardTitle>
                <CardDescription>Easily **add a text watermark to PDF online** with custom rotation, size, and opacity. This **free PDF utility** is fast, secure, and works in your browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!file ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" alt="Upload PDF to add watermark"/>
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
                         <Button onClick={handleDownload} disabled={isProcessing} className="w-full text-lg py-6">
                            {isProcessing ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Applying Watermark...</>
                            ) : (
                                <><Download className="mr-2 h-4 w-4" /> Apply Watermark & Download</>
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">Protect and Brand Your PDFs with a Custom Watermark</h2>
            <p>Need to **add a watermark to a PDF online**? Whether you're marking a document as "DRAFT," "CONFIDENTIAL," or adding your company's name for branding, our tool makes it easy. This **free PDF utility** lets you apply a **text watermark to your PDF for free**, with full control over its appearance. And because it's a **client-side PDF tool**, your documents are always secure.</p>
            
            <h3>Features of Our Free Watermark Tool</h3>
            <ul>
                <li><strong>Custom Text:</strong> Add any text as a watermark. The tool automatically converts it to uppercase for professional consistency.</li>
                <li><strong>Adjustable Appearance:</strong> Control the font size, opacity (transparency), and rotation angle to get the exact look you want.</li>
                <li><strong>Full Privacy:</strong> Your PDF is never uploaded to a server. All processing is done in your browser, guaranteeing your information is secure.</li>
                <li><strong>No Software Needed:</strong> This **online PDF tool** works on any device with a modern web browser, with no installation required.</li>
            </ul>

            <h2 className="text-2xl font-bold">How to Add a Text Watermark to a PDF Online</h2>
            <ol>
                <li><strong>Step 1: Upload Your PDF:</strong> Select the PDF file you want to watermark.</li>
                <li><strong>Step 2: Configure Your Watermark:</strong> Enter the desired text for your watermark. Use the sliders to adjust the font size, opacity, and rotation angle to fit your needs.</li>
                <li><strong>Step 3: Apply and Download:</strong> Click the "Apply Watermark & Download" button. Our tool will instantly add the watermark to every page of your document.</li>
                <li><strong>Step 4: Save Your Protected PDF:</strong> Your newly watermarked PDF will be downloaded to your device immediately.</li>
            </ol>

            <h3>Common Use Cases for Watermarking PDFs</h3>
            <ul>
                <li>**Branding:** Add your company name or website URL to reports and proposals to reinforce your brand identity.</li>
                <li>**Document Status:** Clearly mark documents as "DRAFT," "FINAL," "CONFIDENTIAL," or "FOR REVIEW."</li>
                <li>**Copyright Protection:** **Protect your PDF with a watermark** to discourage unauthorized distribution of your original work.</li>
            </ul>

            <h2>Frequently Asked Questions (FAQs)</h2>
            <h3>How do I add a watermark to a PDF without software?</h3>
            <p>Our tool allows you to **add a watermark to a PDF online** directly from your web browser. Simply upload your file, customize your text watermark using the provided controls, and download the finished document without needing to install any software like Adobe Acrobat.</p>
            <h3>Is it free to add a text watermark to a PDF?</h3>
            <p>Yes, our tool is completely free. You can add a **text watermark to your PDF for free**, with no limits on the number of files you can process. There are no hidden fees or sign-ups.</p>
            <h3>Can I add an image watermark?</h3>
            <p>Currently, our tool specializes in adding text-based watermarks. A feature to add image watermarks (like logos) is on our roadmap for future updates!</p>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Enhance Your PDF Further</h3>
                <p>After adding a watermark, explore our other **free PDF utilities**:</p>
                <ul className="list-disc list-inside">
                    <li><Link href="/tools/pdf-merger" className="text-primary hover:underline" prefetch={false}>Merge PDF</Link> - Combine your watermarked file with other documents.</li>
                    <li><Link href="/tools/pdf-deleter" className="text-primary hover:underline" prefetch={false}>Delete PDF Pages</Link> - Remove any pages you no longer need.</li>
                </ul>
            </div>
        </article>
        </>
    );
}
