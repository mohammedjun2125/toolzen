
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, File as FileIcon, Loader2, Download, ShieldCheck, Zap } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function PdfMerger() {
    const [files, setFiles] = useState<File[]>([]);
    const [isMerging, setIsMerging] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []).filter(file => file.type === 'application/pdf');
        if (newFiles.length !== (e.target.files?.length || 0)) {
            toast({
                variant: 'destructive',
                title: 'Invalid File Type',
                description: 'Only PDF files are accepted.'
            });
        }
        setFiles(prev => [...prev, ...newFiles]);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };
    
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
        if (newFiles.length !== e.dataTransfer.files.length) {
            toast({
                variant: 'destructive',
                title: 'Invalid File Type',
                description: 'Only PDF files are accepted.'
            });
        }
        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };
    
    const handleMerge = async () => {
        if (files.length < 2) {
            toast({
                variant: 'destructive',
                title: 'Not Enough Files',
                description: 'Please select at least two PDF files to merge.'
            });
            return;
        }

        setIsMerging(true);
        setProgress(0);
        toast({ title: "Starting PDF merge..." });
        
        try {
            const mergedPdf = await PDFDocument.create();
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
                setProgress(Math.round(((i + 1) / files.length) * 100));
            }

            const mergedPdfBytes = await mergedPdf.save();
            saveAs(new Blob([mergedPdfBytes], { type: 'application/pdf' }), 'merged-document.pdf');
            toast({ title: "Success!", description: "Your PDFs have been merged and downloaded." });

        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Merge Failed',
                description: 'An error occurred while merging the PDFs. Please ensure they are valid, unencrypted files.'
            });
        } finally {
            setIsMerging(false);
        }
    };


    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Merge PDFs Online - Free & Secure PDF Combiner</CardTitle>
                <CardDescription>Combine multiple PDF files into one single document. This fast, free PDF utility works in your browser with no signup required.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div
                    className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                >
                    <Upload className="h-12 w-12 text-muted-foreground" alt="Upload PDF files to merge" />
                    <p className="mt-4 text-muted-foreground">Click to upload or drag and drop PDFs</p>
                    <p className="text-sm text-muted-foreground">Your files are processed on your device and never uploaded.</p>
                    <Input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </div>

                {files.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Files to Merge ({files.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {files.map((file, index) => (
                                <div key={index} className="relative group border rounded-lg p-4 flex items-center gap-4 bg-muted/20">
                                    <FileIcon className="h-6 w-6 text-primary" />
                                    <p className="text-sm truncate flex-1">{file.name}</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-50 group-hover:opacity-100"
                                        onClick={() => removeFile(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {isMerging && <Progress value={progress} className="w-full" />}

                <Button onClick={handleMerge} disabled={files.length < 2 || isMerging} className="w-full text-lg py-6">
                    {isMerging ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Merging PDFs...</>
                    ) : (
                        <><Download className="mr-2 h-4 w-4" /> Merge PDFs & Download Instantly</>
                    )}
                </Button>
            </CardContent>
        </Card>

        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">What is the PDF Merger Tool?</h2>
            <p>The PDF Merger is a free online utility that allows you to combine multiple PDF files into one single, organized document. Whether you're compiling reports, archiving invoices, or submitting a project with multiple parts, this tool simplifies the process. It's designed to be fast, secure, and incredibly easy to use, processing all your files directly in your web browser without ever uploading them to a server.</p>
            
            <h3 className="text-xl font-bold">How to Use the PDF Merger</h3>
            <ol>
                <li><strong>Upload Your PDFs:</strong> Drag and drop your documents into the upload area, or click to select multiple files from your computer.</li>
                <li><strong>Order Your Files:</strong> The files will be merged in the order they are listed. A future update will allow you to drag and drop to reorder them.</li>
                <li><strong>Click 'Merge PDFs':</strong> Press the button to start the process. The tool will begin to join the PDFs immediately.</li>
                <li><strong>Download Your Combined PDF:</strong> Your merged PDF will be ready for download instantly.</li>
            </ol>

            <h3 className="text-xl font-bold">Key Features of Our PDF Combiner</h3>
            <ul>
                <li><strong>Unlimited Merges:</strong> Combine as many PDF files as you need in a single session.</li>
                <li><strong className="flex items-center gap-2"><ShieldCheck size={20} />Total Privacy:</strong> Your files are never uploaded. All merging happens on your device, ensuring your confidential documents remain secure.</li>
                <li><strong className="flex items-center gap-2"><Zap size={20} />Blazing-Fast Speed:</strong> With no uploads required, the process is incredibly fast.</li>
                <li><strong>No Software or Signup:</strong> This is a completely browser-based utility. No installation or registration is needed.</li>
            </ul>

            <h3 className="text-xl font-bold">Common Use Cases for Merging PDFs</h3>
            <ul>
                <li><strong>Business Reports:</strong> Combine a cover page, executive summary, main body, and appendices into a single, polished report.</li>
                <li><strong>Academic Submissions:</strong> Merge your essay, bibliography, and any supplementary materials into one file for easy submission.</li>
                <li>**Financial Archiving:** Join monthly bank statements, credit card bills, and receipts into a single PDF for tax season.</li>
                <li>**Portfolios:** Combine multiple project examples or case studies into a single, comprehensive portfolio document.</li>
            </ul>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Related PDF Tools</h3>
                <p>After merging your file, you may need to make other changes:</p>
                <div className="flex gap-2 flex-wrap">
                    <Button asChild variant="outline"><Link href="/tools/pdf-splitter">Split PDF</Link></Button>
                    <Button asChild variant="outline"><Link href="/tools/add-watermark">Add Watermark to PDF</Link></Button>
                    <Button asChild variant="outline"><Link href="/tools/pdf-compressor">Compress PDF</Link></Button>
                </div>
            </div>
        </article>
        </>
    );
}
