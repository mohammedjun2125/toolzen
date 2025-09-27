
'use client';

import { useState, useRef, ChangeEvent, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, File as FileIcon, Type, Square, Image as ImageIcon, MousePointer } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Progress } from '@/components/ui/progress';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Draggable from 'react-draggable';

type Annotation = {
  id: number;
  type: 'text';
  x: number;
  y: number;
  text: string;
  font: keyof typeof StandardFonts;
  size: number;
  color: string;
} | {
    id: number;
    type: 'rect';
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
};

let annotationId = 0;

export default function PdfEditor() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    
    const [pagePreviews, setPagePreviews] = useState<string[]>([]);
    const [activePage, setActivePage] = useState(0);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    
    const [tool, setTool] = useState<'select' | 'text' | 'rect'>('select');

    const renderPdf = useCallback(async (file: File) => {
        setIsProcessing(true);
        setProgress(0);
        setPagePreviews([]);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            const numPages = pdfDoc.getPageCount();
            
            const previews: string[] = [];
            for (let i = 0; i < numPages; i++) {
                const page = pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context!,
                    viewport: viewport
                };
                // This part requires pdfjs-dist, which is a heavy dependency.
                // For a simpler approach, we'll create blank page previews and draw on them.
                // This is a placeholder for a more complex rendering. For now, let's keep it simple.
                 previews.push(''); // Placeholder for actual page render
                
                setProgress(Math.round(((i + 1) / numPages) * 100));
            }
            // For now, let's just use the file URL directly for rendering in an iframe.
            const fileUrl = URL.createObjectURL(file);
            setPagePreviews(Array(numPages).fill(fileUrl));


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
            setAnnotations([]);
            setActivePage(0);
            renderPdf(selectedFile);
        }
    };
    
    const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (tool === 'text') {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const newText: Annotation = {
                id: annotationId++,
                type: 'text',
                x,
                y,
                text: 'New Text',
                font: 'Helvetica',
                size: 12,
                color: '#000000',
            };
            setAnnotations(prev => [...prev, newText]);
        }
    };
    
    const handleDownload = async () => {
        if (!file) return;

        setIsProcessing(true);
        toast({ title: 'Applying edits and generating PDF...' });

        try {
            const existingPdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();

            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            for(const annotation of annotations) {
                 const page = pages[activePage];
                 const { height } = page.getSize();
                
                 if (annotation.type === 'text') {
                    page.drawText(annotation.text, {
                        x: annotation.x,
                        y: height - annotation.y - annotation.size, // Y is from bottom in PDF-lib
                        font: helveticaFont,
                        size: annotation.size,
                        color: rgb(
                            parseInt(annotation.color.slice(1,3), 16) / 255,
                            parseInt(annotation.color.slice(3,5), 16) / 255,
                            parseInt(annotation.color.slice(5,7), 16) / 255
                        ),
                    });
                }
            }

            const pdfBytes = await pdfDoc.save();
            saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `edited-${file.name}`);
            toast({ title: 'Success!', description: 'Your edited PDF has been downloaded.' });

        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Save PDF', description: 'An error occurred while saving your changes.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const resetState = () => {
        setFile(null);
        setPagePreviews([]);
        setAnnotations([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };


    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">PDF Editor / Annotator</CardTitle>
                <CardDescription>Add text, shapes, and annotations to your PDF. Your files are processed securely in your browser.</CardDescription>
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
                            <h3 className="font-semibold text-lg truncate pr-4">Editing: {file.name}</h3>
                             <Button onClick={resetState} variant="outline" size="sm">
                                <X className="mr-2 h-4 w-4" /> Change File
                            </Button>
                        </div>
                        
                        <div className="flex gap-2 p-2 rounded-lg bg-muted border">
                             <Button variant={tool === 'select' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('select')}><MousePointer/></Button>
                             <Button variant={tool === 'text' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('text')}><Type/></Button>
                             <Button variant={tool === 'rect' ? 'secondary' : 'ghost'} size="icon" onClick={() => setTool('rect')}><Square/></Button>
                             <div className="flex-grow" />
                             <Button onClick={handleDownload} disabled={isProcessing}>
                                <Download className="mr-2 h-4 w-4"/> Download PDF
                             </Button>
                        </div>
                        
                        {isProcessing ? (
                             <div className="flex flex-col items-center justify-center h-96">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <p className="mt-2 text-muted-foreground">Loading PDF...</p>
                                <Progress value={progress} className="w-1/2 mt-4" />
                             </div>
                        ): (
                            <div className="flex gap-4">
                                <div className="w-1/4 space-y-2">
                                     <Label>Pages</Label>
                                     <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {pagePreviews.map((_, index) => (
                                            <div 
                                                key={index}
                                                onClick={() => setActivePage(index)}
                                                className={`border-2 rounded-md p-1 cursor-pointer ${activePage === index ? 'border-primary' : 'border-border'}`}
                                            >
                                               <iframe src={`${pagePreviews[index]}#page=${index+1}&toolbar=0&navpanes=0`} className="w-full aspect-[3/4] border-none pointer-events-none" title={`Page ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-3/4 relative bg-muted rounded-lg" onClick={handleCanvasClick}>
                                    <iframe src={`${pagePreviews[activePage]}#page=${activePage + 1}&toolbar=0`} className="w-full h-full border-none" title={`Active Page ${activePage + 1}`} />
                                    <div className="absolute inset-0">
                                         {annotations.map(anno => {
                                             if (anno.type === 'text') {
                                                 return (
                                                     <Draggable key={anno.id} defaultPosition={{x: anno.x, y: anno.y}} disabled={tool !== 'select'}>
                                                        <input 
                                                            type="text"
                                                            defaultValue={anno.text}
                                                            onChange={(e) => {
                                                                const newText = e.target.value;
                                                                setAnnotations(prev => prev.map(a => a.id === anno.id ? {...a, text: newText} : a));
                                                            }}
                                                            style={{
                                                                position: 'absolute',
                                                                background: 'transparent',
                                                                border: '1px dashed #999',
                                                                fontSize: anno.size,
                                                                color: anno.color,
                                                                fontFamily: anno.font,
                                                                cursor: tool === 'select' ? 'move' : 'default',
                                                            }}
                                                            className="p-0"
                                                        />
                                                     </Draggable>
                                                 )
                                             }
                                             return null;
                                         })}
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </CardContent>
        </Card>
    );
}

