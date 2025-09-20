
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, X, AspectRatio } from 'lucide-react';

export default function ImageResizer() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string | null>(null);
    const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
    
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [resizedPreview, setResizedPreview] = useState<string | null>(null);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast({ variant: 'destructive', title: 'Invalid File', description: 'Please upload an image file.' });
                return;
            }
            setOriginalFile(file);
            setResizedPreview(null);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalDimensions({ w: img.width, h: img.height });
                    setWidth(img.width);
                    setHeight(img.height);
                };
                img.src = e.target?.result as string;
                setOriginalPreview(img.src);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newWidth = parseInt(e.target.value, 10) || 0;
        setWidth(newWidth);
        if (maintainAspectRatio && originalDimensions && originalDimensions.w > 0) {
            const ratio = originalDimensions.h / originalDimensions.w;
            setHeight(Math.round(newWidth * ratio));
        }
    };

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newHeight = parseInt(e.target.value, 10) || 0;
        setHeight(newHeight);
        if (maintainAspectRatio && originalDimensions && originalDimensions.h > 0) {
            const ratio = originalDimensions.w / originalDimensions.h;
            setWidth(Math.round(newHeight * ratio));
        }
    };

    const handleResize = () => {
        if (!originalPreview || width <= 0 || height <= 0) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select an image and set valid dimensions.' });
            return;
        }

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            setResizedPreview(canvas.toDataURL(originalFile?.type));
            toast({ title: 'Success', description: 'Image resized. You can now download it.' });
        };
        img.src = originalPreview;
    };
    
    const handleDownload = () => {
        if (resizedPreview) {
            const link = document.createElement('a');
            link.href = resizedPreview;
            link.download = `resized-${originalFile?.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const reset = () => {
        setOriginalFile(null);
        setOriginalPreview(null);
        setResizedPreview(null);
        setOriginalDimensions(null);
        setWidth(0);
        setHeight(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Image Resizer</CardTitle>
                <CardDescription>Resize your images to any dimension. Processing is done in your browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!originalPreview ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">JPG, PNG, WEBP supported</p>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <img src={resizedPreview || originalPreview} alt="Preview" className="max-h-64 rounded-lg" />
                    </div>
                )}
                
                {originalPreview && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="width">Width (px)</Label>
                                <Input id="width" type="number" value={width} onChange={handleWidthChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height">Height (px)</Label>
                                <Input id="height" type="number" value={height} onChange={handleHeightChange} />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="aspect-ratio" checked={maintainAspectRatio} onCheckedChange={setMaintainAspectRatio} />
                            <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
                        </div>
                        <div className="flex gap-2">
                           <Button onClick={handleResize} className="w-full">Resize Image</Button>
                           <Button onClick={handleDownload} disabled={!resizedPreview} className="w-full" variant="outline"><Download className="mr-2 h-4 w-4"/>Download</Button>
                           <Button onClick={reset} variant="ghost" size="icon"><X/></Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
