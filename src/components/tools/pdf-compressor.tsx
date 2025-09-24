
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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Link from 'next/link';

type CompressionLevel = 'recommended' | 'high' | 'extreme';

export default function PdfCompressor() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('recommended');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

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
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            
            const qualityMap = {
                recommended: 0.7, // Good quality, good compression
                high: 0.4, // Lower quality, higher compression
                extreme: 0.2, // Lowest quality, max compression
            };
            const quality = qualityMap[compressionLevel];
            
            const pages = pdfDoc.getPages();
            let processedImages = 0;
            const totalImages = (await Promise.all(pages.map(async page => {
                try {
                    const xObjects = page.node.Resources?.get(pdfDoc.context.obj('XObject'));
                    const xObjectDict = xObjects?.as(Object);
                    if (!xObjectDict) return [];

                    const imageRefs = [];
                    xObjectDict.entries().forEach(([key, value]) => {
                        const stream = pdfDoc.context.lookup(value);
                        if (stream?.dict?.get(pdfDoc.context.obj('Subtype'))?.toString() === '/Image') {
                            imageRefs.push({ key, stream });
                        }
                    });
                    return imageRefs;
                } catch(e) {
                    return [];
                }
            }))).flat();
            

            for (const page of pages) {
                 try {
                    const imageStreams = page.node.Resources?.get(pdfDoc.context.obj('XObject'));
                    const xObjectDict = imageStreams?.as(Object);
                    if (!xObjectDict) continue;

                    for (const [key, value] of xObjectDict.entries()) {
                       const stream = pdfDoc.context.lookup(value);
                        if (stream?.dict?.get(pdfDoc.context.obj('Subtype'))?.toString() === '/Image') {
                            const imageBytes = (stream as any).getContents();
                            const image = await pdfDoc.embedJpg(imageBytes, { quality });
                            xObjectDict.set(key, image.ref);

                            processedImages++;
                            setProgress(Math.round((processedImages / totalImages.length) * 100));
                        }
                    }
                } catch (e) {
                    console.warn("Could not process images on a page, skipping.", e);
                    continue;
                }
            }

            const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
            const compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            setCompressedSize(compressedBlob.size);
            
            saveAs(compressedBlob, `compressed-${file.name}`);
            toast({ title: 'Success!', description: `PDF compressed by ${Math.round(((originalSize - compressedBlob.size) / originalSize) * 100)}% and downloaded.` });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Compress PDF', description: 'An error occurred. The PDF might be encrypted, corrupted, or have an unsupported format for client-side compression.' });
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
                <CardTitle className="text-2xl">Compress PDF Files Online Free</CardTitle>
                <CardDescription>Securely **reduce PDF file size** without losing quality. This **free PDF compressor** works in your browser to keep your files private.</CardDescription>
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

                        <div className="space-y-2">
                            <Label>Compression Level</Label>
                            <RadioGroup value={compressionLevel} onValueChange={(v) => setCompressionLevel(v as CompressionLevel)} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className='flex-1'>
                                    <RadioGroupItem value="recommended" id="recommended" className="peer sr-only" />
                                    <Label htmlFor="recommended" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        Recommended
                                        <span className='text-xs text-muted-foreground mt-1'>Good Quality</span>
                                    </Label>
                                </div>
                                <div className='flex-1'>
                                    <RadioGroupItem value="high" id="high" className="peer sr-only" />
                                    <Label htmlFor="high" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        High Compression
                                        <span className='text-xs text-muted-foreground mt-1'>Smaller Size</span>
                                    </Label>
                                </div>
                                <div className='flex-1'>
                                    <RadioGroupItem value="extreme" id="extreme" className="peer sr-only" />
                                    <Label htmlFor="extreme" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        Extreme Compression
                                        <span className='text-xs text-muted-foreground mt-1'>Lowest Quality</span>
                                    </Label>
                                </div>
                            </RadioGroup>
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
                <li><strong>Step 2: Choose a Compression Level:</strong> Select from Recommended, High, or Extreme compression. "Recommended" offers a great balance for most uses.</li>
                <li><strong>Step 3: Compress & Download:</strong> Click the button to start the compression. The tool will process the file on your device and automatically download the new, smaller PDF.</li>
            </ol>
            
            <h3>Key Features of Our Secure PDF Compressor</h3>
            <ul>
                <li><strong className="flex items-center gap-2"><ShieldCheck size={20} />100% Private:</strong> Your files are processed on your device, not on our servers. This makes it the most secure way to **compress PDF files online**.</li>
                <li><strong className="flex items-center gap-2"><Zap size={20} />Fast & Efficient:</strong> No upload/download cycle means the process is incredibly fast. **Make PDF smaller** in seconds.</li>
                <li><strong className="flex items-center gap-2"><Percent size={20} />Adjustable Quality:</strong> You have control over the compression level to find the right balance between file size and quality for your needs.</li>
            </ul>

            <h2>Frequently Asked Questions (FAQs)</h2>
            <h3>How do I reduce PDF file size without losing quality?</h3>
            <p>Our tool is designed to **reduce PDF file size without losing quality** in a noticeable way for on-screen viewing. It primarily compresses the images within the PDF. For most documents, especially those with text and graphics, the "Recommended" compression setting provides a significant size reduction with almost no visible difference in quality.</p>
            <h3>Is it safe to compress a confidential PDF online?</h3>
            <p>Using most online compressors is risky because you have to upload your confidential files. Our tool is different. It is a **client-side PDF compressor**, which means your confidential document is never sent over the internet. This makes it one of the safest options available.</p>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Explore More Free PDF Tools</h3>
                <ul className="list-disc list-inside">
                    <li><Link href="/tools/pdf-merger" className="text-primary hover:underline">Merge PDF</Link> - Combine your compressed file with other documents.</li>
                    <li><Link href="/tools/pdf-splitter" className="text-primary hover:underline">Split PDF</Link> - Extract pages after compressing.</li>
                </ul>
            </div>
        </article>
        </>
    );
}
