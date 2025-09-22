
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, File as FileIcon, Loader2, Download } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Progress } from '@/components/ui/progress';

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
                const pdf = await PDFDocument.load(arrayBuffer);
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
                description: 'An error occurred while merging the PDFs. Please ensure they are valid files.'
            });
        } finally {
            setIsMerging(false);
        }
    };


    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">PDF Merger</CardTitle>
                <CardDescription>Combine multiple PDF files into one single document. Fast, private, and free.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div
                    className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                >
                    <Upload className="h-12 w-12 text-muted-foreground" />
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

                <Button onClick={handleMerge} disabled={files.length < 2 || isMerging} className="w-full">
                    {isMerging ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Merging...</>
                    ) : (
                        <><Download className="mr-2 h-4 w-4" /> Merge PDFs & Download</>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
