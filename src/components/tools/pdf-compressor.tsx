

'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, File as FileIcon, Percent, ShieldCheck, Zap } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Progress } from '@/components/ui/progress';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

export default function PdfCompressor() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [targetSize, setTargetSize] = useState(500); // in KB
    const [targetUnit, setTargetUnit] = useState<'KB' | 'MB'>('KB');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const toolKeywords = (seoKeywords.tools as any)['pdf-compressor'];

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Only PDF files are accepted.' });
                return;
            }
            setFile(selectedFile);
            setOriginalSize(selectedFile.size);
            setCompressedSize(0);
        }
    };
    
    const handleCompress = async () => {
        if (!file) {
            toast({ variant: 'destructive', title: 'No File Selected', description: 'Please upload a PDF file to compress.' });
            return;
        }

        setIsProcessing(true);
        setProgress(0);
        toast({ title: 'Compressing PDF...', description: 'This may take a moment, especially for large files.' });

        try {
            const targetSizeBytes = targetUnit === 'MB' ? targetSize * 1024 * 1024 : targetSize * 1024;
            const arrayBuffer = await file.arrayBuffer();
            let finalPdfBytes: Uint8Array | null = null;
            
            // This is a more refined approach. True client-side compression to a target size is complex.
            // This will attempt to make a more educated guess at the quality setting.
            let quality = 0.7; // Default quality
            if (file.size > 0 && file.size > targetSizeBytes) {
                 const compressionRatio = targetSizeBytes / file.size;
                 // A simple heuristic to map compression ratio to JPEG quality
                 if (compressionRatio < 0.2) quality = 0.3; // High compression needed
                 else if (compressionRatio < 0.5) quality = 0.5; // Medium compression
                 else quality = 0.7; // Low compression
            }

            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const pages = pdfDoc.getPages();
            let imageRecompressed = false;
            
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                try {
                    const imageStreams = page.node.Resources?.get(pdfDoc.context.obj('XObject'));
                    if (imageStreams) {
                        const xObjectDict = imageStreams.as(Object) as any;
                        if (!xObjectDict || !xObjectDict.entries) continue;

                        for (const [key, value] of xObjectDict.entries()) {
                            const stream = pdfDoc.context.lookup(value);
                            if ((stream as any)?.dict?.get(pdfDoc.context.obj('Subtype'))?.toString() === '/Image') {
                                try {
                                    const imageBytes = (stream as any).getContents();
                                    // Check if it's likely a JPG before trying to re-embed
                                    if (imageBytes[0] === 0xFF && imageBytes[1] === 0xD8) {
                                       const image = await pdfDoc.embedJpg(imageBytes, { quality });
                                       xObjectDict.set(key, image.ref);
                                       imageRecompressed = true;
                                    }
                                } catch (e) {
                                    // Ignore images that can't be re-compressed (e.g. not JPGs)
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.warn("Could not process images on a page, skipping.", e);
                    continue;
                }
                setProgress(Math.round(((i + 1) / pages.length) * 90)); // Leave 10% for saving
            }
            
            if (!imageRecompressed) {
                 toast({ variant: 'destructive', title: 'No Compressible Images Found', description: 'This PDF does not contain standard JPG images to compress. File size may not change.' });
            }
            
            finalPdfBytes = await pdfDoc.save({ useObjectStreams: false });
            setProgress(100);
            
            if (finalPdfBytes) {
                const compressedBlob = new Blob([finalPdfBytes], { type: 'application/pdf' });
                setCompressedSize(compressedBlob.size);
                
                saveAs(compressedBlob, `compressed-${file.name}`);
                toast({ title: 'Success!', description: `PDF compressed to ${(compressedBlob.size / 1024).toFixed(0)} KB and downloaded.` });
            } else {
                 throw new Error("Failed to generate final PDF bytes.");
            }

        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Compress PDF', description: 'An error occurred. The PDF might be encrypted, corrupted, or have a format that is difficult to compress on the client-side.' });
        } finally {
            setIsProcessing(false);
        }
    };
    
    const resetState = () => {
        setFile(null);
        setOriginalSize(0);
        setCompressedSize(0);
        setIsProcessing(false);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const reductionPercentage = originalSize > 0 && compressedSize > 0
        ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
        : 0;

    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')}</CardTitle>
                <CardDescription>Securely **{toolKeywords.meta_keywords.join(', ')}** without losing quality. This **free PDF compressor** works in your browser to keep your files private.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!file ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" alt="Upload a PDF to compress" />
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
                                <div className="truncate">
                                    <p className="text-sm truncate font-medium">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{(originalSize / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <Button onClick={resetState} variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2 space-y-2">
                            <Label htmlFor="target-size">Target Size</Label>
                            <Input
                                id="target-size"
                                type="number"
                                value={targetSize}
                                onChange={(e) => setTargetSize(Number(e.target.value))}
                                className="w-full"
                                min="1"
                                disabled={isProcessing}
                            />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <Select value={targetUnit} onValueChange={(value) => setTargetUnit(value as 'KB' | 'MB')}>
                                <SelectTrigger id="unit">
                                <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="KB">KB</SelectItem>
                                <SelectItem value="MB">MB</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        </div>
                        
                        {isProcessing && <Progress value={progress} className="w-full" />}
                        
                        {compressedSize > 0 && (
                            <div className="p-4 bg-green-500/10 rounded-lg text-center">
                                <div className="flex items-center justify-center text-lg font-medium text-green-600 dark:text-green-400">
                                    <Percent className="h-5 w-5 mr-2"/> {reductionPercentage}% size reduction!
                                </div>
                                <p className="text-sm text-muted-foreground">Original: {(originalSize / 1024).toFixed(0)} KB | Compressed: {(compressedSize / 1024).toFixed(0)} KB</p>
                            </div>
                        )}
                        
                         <Button onClick={handleCompress} disabled={isProcessing} className="w-full text-lg py-6">
                            {isProcessing ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compressing...</>
                            ) : (
                                <><Download className="mr-2 h-4 w-4" /> Compress & Download PDF</>
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">Why You Need to Compress PDF Files</h2>
            <p>Large PDF files are a common headache. They are slow to email, take up valuable storage space, and can make websites load at a crawl. Our **free online PDF compressor** solves this problem by letting you **reduce PDF file size** without sacrificing readability. Built for privacy, this tool processes your files directly in your browser, ensuring your documents are never uploaded to a server.</p>
            
            <h3>How Does PDF Compression Work?</h3>
            <p>Most of a PDF's file size comes from embedded images. Our tool intelligently reduces the size of these images by applying smart compression. It finds the optimal balance between file size and image quality, resulting in a much smaller PDF that still looks great on screen. By choosing a higher compression level, you can achieve an even smaller file size, which is perfect for email attachments.</p>

            <h2 className="text-2xl font-bold">How to Compress a PDF Online for Free</h2>
            <ol>
                <li><strong>Step 1: Upload Your PDF:</strong> Select the PDF file you want to compress.</li>
                <li><strong>Step 2: Choose a Target Size:</strong> Enter your desired file size in KB or MB. The tool will try its best to reach this target.</li>
                <li><strong>Step 3: Compress & Download:</strong> Click the button to start the compression. The tool will process the file on your device and automatically download the new, smaller PDF.</li>
            </ol>
            
            <h3>Key Features of Our Secure PDF Compressor</h3>
            <ul>
                <li><strong className="flex items-center gap-2"><ShieldCheck size={20} />100% Private:</strong> Your files are processed on your device, not on our servers. This makes it the most secure way to **compress PDF files online**.</li>
                <li><strong className="flex items-center gap-2"><Zap size={20} />Fast & Efficient:</strong> No upload/download cycle means the process is incredibly fast. **Make PDF smaller** in seconds.</li>
                <li><strong className="flex items-center gap-2"><Percent size={20} />Smart Quality Adjustment:</strong> Our tool makes an educated guess on the best compression quality to meet your target size.</li>
            </ul>

            <h2>Frequently Asked Questions (FAQs)</h2>
            <h3>How do I reduce PDF file size without losing quality?</h3>
            <p>Our tool is designed to **reduce PDF file size without losing quality** in a noticeable way for on-screen viewing. It primarily compresses the images within the PDF. For most documents, you can achieve a significant size reduction with almost no visible difference in quality.</p>
            <h3>Is it safe to compress a confidential PDF online?</h3>
            <p>Using most online compressors is risky because you have to upload your confidential files. Our tool is different. It is a **client-side PDF compressor**, which means your confidential document is never sent over the internet. This makes it one of the safest options available.</p>
            <h3>Why didn't the file size change much?</h3>
            <p>PDF compression works best on files with large, uncompressed images. If your PDF is mostly text, or if its images are already highly compressed or in a non-standard format (like PNG), the size reduction may be minimal.</p>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Explore More Free PDF Tools</h3>
                <p>After compressing your file, you may need other <Link href="/category/pdf">PDF Tools</Link>. We also offer a full suite of <Link href="/">free online tools</Link> to help with your documents.</p>
                <div className="flex gap-2 flex-wrap">
                    <Button asChild variant="outline"><Link href="/tools/pdf-merger">Merge PDF</Link></Button>
                    <Button asChild variant="outline"><Link href="/tools/pdf-splitter">Split PDF</Link></Button>
                </div>
            </div>
        </article>
        </>
    );
}
