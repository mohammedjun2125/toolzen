'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Download, Upload, X } from 'lucide-react';
import { saveAs } from 'file-saver';

export default function MemeGenerator() {
    const [image, setImage] = useState<string | null>(null);
    const [topText, setTopText] = useState('Top Text');
    const [bottomText, setBottomText] = useState('Bottom Text');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            toast({ variant: 'destructive', title: 'Invalid File', description: 'Please upload a valid image file.' });
        }
    };

    const drawMeme = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !image) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            const MAX_WIDTH = 800;
            const scale = Math.min(MAX_WIDTH / img.width, 1);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const fontSize = canvas.width / 12;
            ctx.font = `bold ${fontSize}px Impact`;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = fontSize / 20;
            ctx.textAlign = 'center';

            // Top text
            ctx.textBaseline = 'top';
            ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 10);
            ctx.fillText(topText.toUpperCase(), canvas.width / 2, 10);

            // Bottom text
            ctx.textBaseline = 'bottom';
            ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
            ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
        };
    };

    const handleDownload = () => {
        drawMeme();
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, 'meme.png');
                    toast({ title: 'Meme downloaded!' });
                }
            });
        }
    };
    
    // Redraw meme whenever image or text changes
    useState(() => {
        if (image) drawMeme();
    });

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Meme Generator</CardTitle>
                <CardDescription>Create your own memes. Upload an image, add text, and download.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 {!image ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Click to upload an image</p>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-center border p-2 rounded-lg bg-muted/20">
                           <canvas ref={canvasRef} />
                        </div>
                        <Button onClick={() => setImage(null)} variant="outline" className="w-full">
                            <X className="mr-2 h-4 w-4" /> Change Image
                        </Button>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="top-text">Top Text</Label>
                        <Input id="top-text" value={topText} onChange={(e) => setTopText(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bottom-text">Bottom Text</Label>
                        <Input id="bottom-text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
                    </div>
                </div>
                
                <Button onClick={drawMeme} variant="secondary" className="w-full">
                    Update Meme Preview
                </Button>

                <Button onClick={handleDownload} disabled={!image} className="w-full text-lg py-6">
                    <Download className="mr-2 h-4 w-4" /> Download Meme
                </Button>
            </CardContent>
        </Card>
    );
}
