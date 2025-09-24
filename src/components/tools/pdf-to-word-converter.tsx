
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, FileIcon, Copy } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import * as pdfjs from 'pdfjs-dist';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfToWordConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    
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
            handleExtractText(selectedFile);
        }
    };
    
    const handleExtractText = async (pdfFile: File) => {
        setIsProcessing(true);
        setExtractedText('');
        toast({ title: 'Extracting text from PDF...' });

        try {
            const arrayBuffer = await pdfFile.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            let fullText = '';

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
                fullText += pageText + '\n\n'; // Add space between pages
            }
            
            setExtractedText(fullText.trim());
            toast({ title: 'Success!', description: 'Text has been extracted from the PDF.' });

        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Extract Text', description: 'The PDF might be corrupted, encrypted, or contain only images.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!extractedText) {
            toast({ variant: 'destructive', title: 'No Text to Download', description: 'There is no extracted text to save.' });
            return;
        }

        const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const originalName = file?.name.split('.').slice(0, -1).join('.') || 'document';
        link.download = `${originalName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: 'Text file downloaded.' });
    };

    const handleCopy = () => {
        if (!extractedText) {
            toast({ variant: 'destructive', title: 'Nothing to Copy' });
            return;
        }
        navigator.clipboard.writeText(extractedText);
        toast({ title: 'Text copied to clipboard!' });
    };

    const resetState = () => {
        setFile(null);
        setExtractedText('');
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">PDF to Word (Text Extraction)</CardTitle>
                <CardDescription>Extract all text from your PDF into an editable format. This tool works in your browser, keeping your files private.</CardDescription>
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
                         <div className="border rounded-lg p-4 flex items-center justify-between gap-4 bg-muted/20">
                            <div className="flex items-center gap-4 truncate">
                                <FileIcon className="h-6 w-6 text-primary" />
                                <p className="text-sm truncate">{file.name}</p>
                            </div>
                            <Button onClick={resetState} variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {isProcessing ? (
                             <div className="flex items-center justify-center h-48">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : (
                            <Textarea
                                readOnly={!extractedText}
                                value={extractedText || "No text could be extracted. The PDF might be image-based."}
                                rows={12}
                                placeholder="Extracted text will appear here..."
                            />
                        )}
                        
                         <div className="flex gap-2">
                           <Button onClick={handleCopy} disabled={!extractedText} className="w-full">
                                <Copy className="mr-2 h-4 w-4" /> Copy Text
                           </Button>
                           <Button onClick={handleDownload} disabled={!extractedText} variant="outline" className="w-full">
                               <Download className="mr-2 h-4 w-4" /> Download as .txt
                           </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
