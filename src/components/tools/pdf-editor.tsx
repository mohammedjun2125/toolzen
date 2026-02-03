'use client';

import { useState, useRef, useCallback, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, MousePointer, Type, Image as ImageIcon, Pencil, Trash2, RotateCw } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { saveAs } from 'file-saver';
import { Progress } from '../ui/progress';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

type Tool = 'select' | 'text' | 'image' | 'draw';

type PDFObject = {
    id: number;
    type: 'text' | 'image' | 'drawing';
    x: number;
    y: number;
    text?: string;
    fontSize?: number;
    color?: string;
    imageData?: Uint8Array;
    imageType?: 'png' | 'jpeg';
    width?: number;
    height?: number;
    path?: { x: number; y: number }[];
    strokeColor?: string;
    strokeWidth?: number;
};

export default function PdfEditor() {
    const [file, setFile] = useState<File | null>(null);
    const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [objects, setObjects] = useState<Record<number, PDFObject[]>>({});
    const [activeTool, setActiveTool] = useState<Tool>('select');
    
    const [drawColor, setDrawColor] = useState('#ef4444');
    const [drawWidth, setDrawWidth] = useState(3);
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const renderPage = useCallback(async (pageNumber: number) => {
        if (!pdfDoc || !canvasRef.current) return;
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if(!context) return;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = { canvasContext: context, viewport: viewport };
        await page.render(renderContext).promise;
    }, [pdfDoc]);

    const redrawDrawingCanvas = useCallback(() => {
        const canvas = drawingCanvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const pageObjects = objects[currentPage] || [];
        pageObjects.forEach(obj => {
            if (obj.type === 'drawing' && obj.path && obj.path.length > 1) {
                context.strokeStyle = obj.strokeColor || '#000000';
                context.lineWidth = obj.strokeWidth || 2;
                context.lineJoin = 'round';
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(obj.path[0].x, obj.path[0].y);
                for (let i = 1; i < obj.path.length; i++) {
                    context.lineTo(obj.path[i].x, obj.path[i].y);
                }
                context.stroke();
            } else if(obj.type === 'text' && obj.text) {
                context.font = `${obj.fontSize || 16}px Arial`;
                context.fillStyle = obj.color || '#000000';
                context.fillText(obj.text, obj.x, obj.y);
            }
        });
    }, [objects, currentPage]);


    useEffect(() => {
        if (pdfDoc) {
            renderPage(currentPage);
        }
    }, [pdfDoc, currentPage, renderPage]);

    useEffect(() => {
        const mainCanvas = canvasRef.current;
        const drawingCanvas = drawingCanvasRef.current;
        if (mainCanvas && drawingCanvas) {
            drawingCanvas.width = mainCanvas.width;
            drawingCanvas.height = mainCanvas.height;
        }
        redrawDrawingCanvas();
    }, [pdfDoc, currentPage, renderPage, redrawDrawingCanvas]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                toast({ variant: 'destructive', title: 'Invalid File Type' });
                return;
            }
            setFile(selectedFile);
            setIsProcessing(true);
            try {
                const arrayBuffer = await selectedFile.arrayBuffer();
                const loadingTask = pdfjsLib.getDocument(arrayBuffer);
                const pdf = await loadingTask.promise;
                setPdfDoc(pdf);
                setTotalPages(pdf.numPages);
                setCurrentPage(1);
                setObjects({});
            } catch (error) {
                toast({ variant: 'destructive', title: 'Error loading PDF' });
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (activeTool === 'text') {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const text = prompt("Enter text:");
            if (text) {
                const newObject: PDFObject = { id: Date.now(), type: 'text', x, y, text, fontSize: 24, color: '#000000' };
                setObjects(prev => ({...prev, [currentPage]: [...(prev[currentPage] || []), newObject]}));
            }
        }
    };

    const handleDrawingStart = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if(activeTool !== 'draw') return;
        setIsDrawing(true);
        const { offsetX, offsetY } = e.nativeEvent;
        const newPath: PDFObject = { id: Date.now(), type: 'drawing', path: [{ x: offsetX, y: offsetY }], strokeColor: drawColor, strokeWidth: drawWidth };
        setObjects(prev => ({...prev, [currentPage]: [...(prev[currentPage] || []), newPath]}));
    };

    const handleDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || activeTool !== 'draw') return;
        setObjects(prev => {
            const newObjects = {...prev};
            const currentPath = newObjects[currentPage][newObjects[currentPage].length - 1];
            if (currentPath && currentPath.type === 'drawing' && currentPath.path) {
                const { offsetX, offsetY } = e.nativeEvent;
                currentPath.path.push({ x: offsetX, y: offsetY });
            }
            return newObjects;
        });
        redrawDrawingCanvas();
    };

    const handleDrawingEnd = () => {
        setIsDrawing(false);
    };

    const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (imageFile && (imageFile.type === 'image/png' || imageFile.type === 'image/jpeg')) {
            const imageData = await imageFile.arrayBuffer();
            const newObject: PDFObject = {
                id: Date.now(), type: 'image', x: 50, y: 50, width: 200, 
                imageData: new Uint8Array(imageData),
                imageType: imageFile.type === 'image/png' ? 'png' : 'jpeg'
            };
            setObjects(prev => ({...prev, [currentPage]: [...(prev[currentPage] || []), newObject]}));
            // Image positioning is simplified here. A real implementation would allow drag/drop.
            toast({title: "Image added. Note: Image placement is fixed in this version."})
        } else {
            toast({variant: 'destructive', title: 'Please select a PNG or JPG file.'})
        }
    }
    
    const handleSave = async () => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const existingPdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            for(const pageNumStr in objects) {
                const pageNum = parseInt(pageNumStr);
                const page = pdfDoc.getPage(pageNum - 1);
                const {width, height} = page.getSize();
                const pageObjects = objects[pageNum];

                for(const obj of pageObjects) {
                    const y = height - obj.y;
                    if(obj.type === 'text' && obj.text) {
                        page.drawText(obj.text, { x: obj.x, y, size: obj.fontSize, font, color: rgb(0,0,0) });
                    } else if (obj.type === 'image' && obj.imageData) {
                        const image = obj.imageType === 'png' 
                            ? await pdfDoc.embedPng(obj.imageData)
                            : await pdfDoc.embedJpg(obj.imageData);
                        page.drawImage(image, { x: obj.x, y, width: obj.width, height: obj.height });
                    } else if (obj.type === 'drawing' && obj.path) {
                        const path = obj.path.map(p => `L ${p.x} ${height - p.y}`).join(' ').replace('L', 'M');
                        page.drawSvgPath(path, { borderColor: rgb(1,0,0), borderWidth: obj.strokeWidth });
                    }
                }
            }
            
            const pdfBytes = await pdfDoc.save();
            saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `edited-${file.name}`);
            toast({ title: 'PDF Saved Successfully!' });

        } catch(e) {
            toast({ variant: 'destructive', title: 'Failed to save PDF' });
        } finally {
            setIsProcessing(false);
        }
    };

    const deletePage = async (pageNumber: number) => {
        if(!file) return;
        const existingPdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(existingPdfBytes);
        if(pdf.getPageCount() <= 1) {
            toast({variant: 'destructive', title: "Cannot delete the last page"});
            return;
        }
        pdf.removePage(pageNumber - 1);
        const pdfBytes = await pdf.save();
        const newFile = new File([pdfBytes], file.name, {type: 'application/pdf'});
        setFile(newFile);
        const loadingTask = pdfjsLib.getDocument(pdfBytes);
        const newPdfDoc = await loadingTask.promise;
        setPdfDoc(newPdfDoc);
        setTotalPages(newPdfDoc.numPages);
        setCurrentPage(p => Math.min(p, newPdfDoc.numPages));
        toast({title: `Page ${pageNumber} deleted`})
    }

    const rotatePage = async (pageNumber: number) => {
        if(!file) return;
        const existingPdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(existingPdfBytes);
        const page = pdf.getPage(pageNumber - 1);
        page.setRotation(degrees(page.getRotation().angle + 90));
        const pdfBytes = await pdf.save();
        const newFile = new File([pdfBytes], file.name, {type: 'application/pdf'});
        setFile(newFile);
        const loadingTask = pdfjsLib.getDocument(pdfBytes);
        const newPdfDoc = await loadingTask.promise;
        setPdfDoc(newPdfDoc);
        renderPage(currentPage);
        toast({title: `Page ${pageNumber} rotated`})
    }


    const resetState = () => {
        setFile(null);
        setPdfDoc(null);
        setTotalPages(0);
        setCurrentPage(1);
        setObjects({});
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Free Online PDF Editor</CardTitle>
                <CardDescription>Add text, images, and drawings to your PDF. Your files are processed securely in your browser.</CardDescription>
            </CardHeader>
            <CardContent>
                {!file ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Click to upload or drag & drop a PDF</p>
                        <Input ref={fileInputRef} type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Sidebar */}
                        <div className="w-full md:w-48 border-r pr-4 space-y-2">
                             <h3 className="font-semibold">Pages</h3>
                             <div className="space-y-2 max-h-96 overflow-y-auto">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                    <div key={pageNum} className={`p-2 border rounded cursor-pointer ${currentPage === pageNum ? 'border-primary' : ''}`} onClick={() => setCurrentPage(pageNum)}>
                                        <p className="text-sm text-center mb-1">Page {pageNum}</p>
                                        <div className="flex justify-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); rotatePage(pageNum) }}><RotateCw className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); deletePage(pageNum) }}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Main Editor */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="flex items-center gap-2 border p-2 rounded-lg mb-4 flex-wrap">
                                <Button variant={activeTool === 'select' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTool('select')}><MousePointer className="mr-2 h-4 w-4" />Select</Button>
                                <Button variant={activeTool === 'text' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTool('text')}><Type className="mr-2 h-4 w-4" />Text</Button>
                                <Button variant={activeTool === 'image' ? 'secondary' : 'ghost'} size="sm" asChild>
                                    <label>
                                        <ImageIcon className="mr-2 h-4 w-4" />Image
                                        <Input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleAddImage} />
                                    </label>
                                </Button>
                                <Button variant={activeTool === 'draw' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTool('draw')}><Pencil className="mr-2 h-4 w-4" />Draw</Button>
                                <Input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="w-8 h-8 p-1" disabled={activeTool !== 'draw'} />
                                <div className="ml-auto flex gap-2">
                                  <Button onClick={handleSave} size="sm" disabled={isProcessing}>{isProcessing ? 'Saving...': 'Save & Download'}</Button>
                                  <Button onClick={resetState} size="sm" variant="outline">Reset</Button>
                                </div>
                            </div>
                            
                            {isProcessing ? (
                                <div className="flex items-center justify-center h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>
                            ) : (
                                <div className="relative w-full h-auto" style={{ cursor: activeTool === 'draw' ? 'crosshair' : 'default' }}>
                                    <canvas ref={canvasRef} className="border rounded-lg w-full h-auto" />
                                    <canvas 
                                        ref={drawingCanvasRef} 
                                        className="absolute top-0 left-0 w-full h-full"
                                        onClick={handleCanvasClick}
                                        onMouseDown={handleDrawingStart}
                                        onMouseMove={handleDrawing}
                                        onMouseUp={handleDrawingEnd}
                                        onMouseLeave={handleDrawingEnd}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
