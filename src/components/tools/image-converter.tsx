
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, X, Loader2, FileImage } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

type OutputFormat = 'jpeg' | 'png' | 'webp';

export default function ImageConverter() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string | null>(null);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>('png');
    const [quality, setQuality] = useState(0.9);
    const [isConverting, setIsConverting] = useState(false);
    
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
            const reader = new FileReader();
            reader.onload = (e) => setOriginalPreview(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleConvertAndDownload = () => {
        if (!originalPreview || !originalFile) {
            toast({ variant: 'destructive', title: 'No Image', description: 'Please upload an image to convert.' });
            return;
        }

        setIsConverting(true);
        toast({ title: 'Converting image...', description: 'Please wait a moment.' });

        const img = new window.Image();
        img.src = originalPreview;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                toast({ variant: 'destructive', title: 'Error', description: 'Could not process the image.' });
                setIsConverting(false);
                return;
            }
            ctx.drawImage(img, 0, 0);
            
            const mimeType = `image/${outputFormat}`;
            const dataUrl = canvas.toDataURL(mimeType, quality);

            const link = document.createElement('a');
            link.href = dataUrl;
            
            const originalName = originalFile.name.split('.').slice(0, -1).join('.');
            link.download = `${originalName}.${outputFormat}`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsConverting(false);
            toast({ title: 'Success!', description: 'Your converted image has been downloaded.' });
        };
        img.onerror = () => {
            setIsConverting(false);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load the image for conversion.' });
        }
    };

    const reset = () => {
        setOriginalFile(null);
        setOriginalPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Image Converter</CardTitle>
                <CardDescription>Convert your images to JPG, PNG, or WEBP. Fast, free, and completely client-side.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!originalPreview ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">JPG, PNG, WEBP, GIF supported</p>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative aspect-video w-full max-w-lg mx-auto rounded-lg overflow-hidden border">
                             <Image src={originalPreview} alt="Image preview" fill className="object-contain" />
                        </div>
                        <div className="flex justify-end">
                            <Button variant="ghost" size="icon" onClick={reset}><X/></Button>
                        </div>
                    </div>
                )}
                
                {originalPreview && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="format-select">Convert to</Label>
                                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
                                    <SelectTrigger id="format-select">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="png">PNG</SelectItem>
                                        <SelectItem value="jpeg">JPG</SelectItem>
                                        <SelectItem value="webp">WEBP</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
                                <div className="space-y-2">
                                    <Label>Quality: {Math.round(quality * 100)}%</Label>
                                    <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={0.1} max={1} step={0.05} />
                                </div>
                            )}
                        </div>
                        
                        <Button onClick={handleConvertAndDownload} disabled={isConverting} className="w-full text-lg py-6">
                            {isConverting ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Converting...</>
                            ) : (
                                <><Download className="mr-2 h-4 w-4" /> Convert & Download</>
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
