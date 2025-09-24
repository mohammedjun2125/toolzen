
'use client';

import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Sparkles, Loader2, Image as ImageIcon } from 'lucide-react';
import { saveAs } from 'file-saver';
import removeBackground from '@imgly/background-removal';
import Image from 'next/image';
import Link from 'next/link';

export default function AiBackgroundRemover() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload an image file (PNG, JPG, etc.).' });
                return;
            }
            setImageFile(file);
            setProcessedImage(null);
            const reader = new FileReader();
            reader.onload = (event) => setOriginalImage(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };
    
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
             if (!file.type.startsWith('image/')) {
                toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload an image file (PNG, JPG, etc.).' });
                return;
            }
            setImageFile(file);
            setProcessedImage(null);
            const reader = new FileReader();
            reader.onload = (event) => setOriginalImage(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };
    
    const handleRemoveBackground = async () => {
        if (!imageFile) {
            toast({ variant: 'destructive', title: 'No Image Selected', description: 'Please upload an image first.' });
            return;
        }

        setIsProcessing(true);
        const { dismiss } = toast({ 
            title: 'AI is removing the background...', 
            description: 'The model is loading on your device. This may take a moment.',
            duration: Infinity,
        });

        try {
            const resultBlob = await removeBackground(imageFile);
            const resultUrl = URL.createObjectURL(resultBlob);
            setProcessedImage(resultUrl);
            toast({ title: 'Success!', description: 'Background removed. You can now download the image.' });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Processing Failed', description: 'An error occurred while removing the background.' });
        } finally {
            setIsProcessing(false);
            dismiss();
        }
    };

    const handleDownload = (format: 'png' | 'jpeg') => {
        if (!processedImage || !imageFile) return;
        
        if (format === 'png') {
            saveAs(processedImage, `${imageFile.name.split('.')[0]}_transparent.png`);
        } else {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new window.Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx!.fillStyle = 'white';
                ctx!.fillRect(0, 0, canvas.width, canvas.height);
                ctx!.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    if(blob) {
                        saveAs(blob, `${imageFile.name.split('.')[0]}_white_bg.jpg`);
                    }
                }, 'image/jpeg', 0.95);
            };
            img.src = processedImage;
        }
    };


    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">AI Background Remover Online Free</CardTitle>
                <CardDescription>Automatically **remove the background from any image** with AI. Create a **transparent background** online for free, with no watermarks and 100% privacy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!originalImage ? (
                    <div
                        className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                    >
                        <Upload className="h-12 w-12 text-muted-foreground" alt="Upload an image to remove the background"/>
                        <p className="mt-4 text-muted-foreground">Click to upload or drag and drop an image</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG, WEBP supported</p>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col items-center">
                            <h3 className="font-semibold mb-2">Original Image</h3>
                            <Image src={originalImage} width={400} height={400} alt="Original image before background removal" className="rounded-lg object-contain max-h-80 w-auto" />
                        </div>
                        <div className="flex flex-col items-center">
                             <h3 className="font-semibold mb-2">Result</h3>
                            {isProcessing ? (
                                <div className="w-full h-80 rounded-lg bg-muted flex flex-col items-center justify-center">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="mt-4 text-sm text-muted-foreground">AI is working...</p>
                                </div>
                            ) : processedImage ? (
                                <div className="w-full h-80 rounded-lg p-2" style={{backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='10' height='10' fill='%23f1f5f9'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f1f5f9'/%3e%3c/svg%3e")`}}>
                                    <Image src={processedImage} width={400} height={400} alt="Image with background removed" className="object-contain h-full w-auto mx-auto" />
                                </div>
                            ) : (
                                <div className="w-full h-80 rounded-lg bg-muted flex items-center justify-center">
                                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {originalImage && (
                     <div className="flex flex-col gap-4">
                        <Button onClick={handleRemoveBackground} disabled={isProcessing} className="w-full text-lg py-6">
                            {isProcessing ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Removing Background...</>
                            ) : (
                                <><Sparkles className="mr-2 h-4 w-4" /> Remove Background with AI</>
                            )}
                        </Button>
                        {processedImage && (
                             <div className="grid grid-cols-2 gap-4">
                                <Button onClick={() => handleDownload('png')} variant="outline"><Download className="mr-2 h-4 w-4" /> Download PNG</Button>
                                <Button onClick={() => handleDownload('jpeg')} variant="outline"><Download className="mr-2 h-4 w-4" /> Download JPG</Button>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">The Best Free AI Background Remover Online</h2>
            <p>Need to **remove the background from an image**? Whether you're a designer creating a new graphic, an e-commerce seller preparing product photos, or just someone wanting to make a fun sticker, a clean, transparent background is essential. Our **free AI Background Remover tool** makes it easy to get a professional result in seconds, with no watermarks and no sign-up required. This **background eraser tool** runs entirely in your browser, guaranteeing your images remain 100% private.</p>
            
            <h3>Key Features of Our Background Eraser Tool</h3>
            <ul>
                <li><strong>AI-Powered Precision:</strong> Our tool uses an advanced AI model to intelligently detect the main subject and accurately remove the background, even around tricky areas like hair and fur.</li>
                <li><strong>Completely Free, No Watermarks:</strong> Get high-quality results without any cost. The downloaded image is clean, with no watermarks.</li>
                <li><strong>100% Private and Secure:</strong> This is a **client-side image processing tool**. Your photos are never uploaded to a server. All processing happens on your device, ensuring your data is safe.</li>
                <li><strong>Instant Transparent Background:</strong> Create a transparent PNG perfect for layering in designs, or download a JPG with a clean white background.</li>
            </ul>

            <h2 className="text-2xl font-bold">How to Remove an Image Background Online Fast & Free</h2>
            <ol>
                <li><strong>Step 1: Upload Your Photo:</strong> Drag and drop your image file (JPG, PNG, etc.) or click to select it from your device.</li>
                <li><strong>Step 2: Let the AI Work:</strong> Click the "Remove Background with AI" button. The tool will load its AI model (this may take a moment on the first run) and automatically process your image.</li>
                <li><strong>Step 3: Preview and Download:</strong> A preview of your image with the background removed will appear. You can then choose to **download a transparent PNG** or a JPG with a white background.</li>
            </ol>

            <h3>Common Use Cases</h3>
            <ul>
                <li>**E-commerce:** Create clean, professional product photos for Amazon, Shopify, or any online store.</li>
                <li>**Graphic Design:** Easily isolate objects or people to use in new designs, logos, or marketing materials.</li>
                <li>**Personal Photos:** Make profile pictures pop or create fun stickers for social media.</li>
                <li>**Presentations:** Remove distracting backgrounds from images to keep your slides looking clean and professional.</li>
            </ul>

            <h2>Frequently Asked Questions (FAQs)</h2>
            <h3>How do I remove a background from an image without losing quality?</h3>
            <p>Our **AI background remover online** is designed to preserve the quality of the foreground subject. It creates a precise cutout without degrading the resolution of the main object in your photo, giving you a high-quality result.</p>
            <h3>Is this a free background remover without a watermark?</h3>
            <p>Yes, absolutely. Our tool is completely free to use, and the final image you download will not have any watermarks. It's perfect for both personal and commercial projects.</p>
            <h3>How is this tool private if it's online?</h3>
            <p>Our tool uses a modern technology called WebAssembly (WASM) to run a sophisticated AI model directly in your web browser. This means your image file is processed on your own computer and is never sent over the internet, making it the most secure way to **remove a background online**.</p>
            
             <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">More Image Editing Tools</h3>
                <p>Once your background is removed, you may want to make other edits:</p>
                <ul className="list-disc list-inside">
                    <li><Link href="/tools/image-resizer" className="text-primary hover:underline">Resize your image</Link> to the perfect dimensions for social media.</li>
                    <li><Link href="/tools/image-compressor" className="text-primary hover:underline">Compress your image</Link> to reduce file size for faster web loading.</li>
                </ul>
            </div>
        </article>
        </>
    );
}
