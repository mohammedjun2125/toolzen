
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2, Download, Shield, File as FileIcon } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Label } from '../ui/label';

export default function ProtectPdf() {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
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
        }
    };
    
    const handleProtect = async () => {
        if (!file) {
            toast({ variant: 'destructive', title: 'No File Selected', description: 'Please upload a PDF file.' });
            return;
        }
        if (!password) {
            toast({ variant: 'destructive', title: 'No Password Entered', description: 'Please enter a password to protect your PDF.' });
            return;
        }

        setIsProcessing(true);
        toast({ title: 'Encrypting your PDF...' });

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            
            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password,
                permissions: {},
            });

            const pdfBytes = await pdfDoc.save();
            saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `protected-${file.name}`);
            toast({ title: 'Success!', description: 'Your PDF has been encrypted and downloaded.' });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Failed to Protect PDF', description: 'An error occurred while encrypting the file.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const resetState = () => {
        setFile(null);
        setPassword('');
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Protect PDF with a Password</CardTitle>
                <CardDescription>Add a password to your PDF to encrypt it and prevent unauthorized access. The entire process is secure and private.</CardDescription>
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
                    <div className="border rounded-lg p-4 flex items-center justify-between gap-4 bg-muted/20">
                        <div className="flex items-center gap-4 truncate">
                            <FileIcon className="h-6 w-6 text-primary" />
                            <p className="text-sm truncate">{file.name}</p>
                        </div>
                        <Button onClick={resetState} variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                
                {file && (
                    <div className="space-y-2">
                        <Label htmlFor="password">Set a Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a strong password"
                        />
                    </div>
                )}
                
                <Button onClick={handleProtect} disabled={!file || !password || isProcessing} className="w-full">
                    {isProcessing ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Encrypting...</>
                    ) : (
                        <><Shield className="mr-2 h-4 w-4" /> Protect & Download PDF</>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
