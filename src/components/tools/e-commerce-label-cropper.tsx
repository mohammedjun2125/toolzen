'use client'

import { useState, useRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Upload, Download, Scissors, Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { autoCropEcommerceLabel } from '@/ai/flows/auto-crop-ecommerce-label'

export default function LabelCropper() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalPreview, setOriginalPreview] = useState<string | null>(null)
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null)
  const [isCropping, setIsCropping] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        toast({
          variant: 'destructive',
          title: 'Unsupported file type',
          description: 'Please upload an image or PDF file.',
        });
        return;
      }
      setOriginalFile(file)
      setCroppedPreview(null)
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalPreview(reader.result as string);
      };
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        setOriginalPreview('/pdf-placeholder.png'); // Or some pdf icon
      }
    }
  }

  const handleCrop = async () => {
    if (!originalFile || !originalPreview) {
        toast({ variant: 'destructive', title: 'Please upload a file first.'})
        return;
    }

    setIsCropping(true);
    setCroppedPreview(null);
    toast({ title: 'AI is cropping your label...', description: 'This might take a moment.' });

    try {
        const reader = new FileReader();
        reader.readAsDataURL(originalFile);
        reader.onload = async (e) => {
            const labelDataUri = e.target?.result as string;
            if (!labelDataUri) {
                toast({ variant: 'destructive', title: 'Could not read file.'})
                setIsCropping(false);
                return;
            }
            const result = await autoCropEcommerceLabel({ labelDataUri });
            setCroppedPreview(result.croppedLabelDataUri);
            toast({ title: 'Label cropped successfully!' });
        };
        reader.onerror = () => {
            toast({ variant: 'destructive', title: 'Error reading file.'})
        }
    } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Cropping Failed', description: 'An unexpected error occurred.'})
    } finally {
        setIsCropping(false);
    }
  }

  const handleDownload = () => {
    if (croppedPreview) {
      const link = document.createElement('a')
      link.href = croppedPreview
      const extension = croppedPreview.startsWith('data:image/png') ? 'png' : 'jpg';
      link.download = `cropped-label.${extension}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">AI E-commerce Label Cropper</CardTitle>
        <CardDescription>
          Automatically crop e-commerce shipping labels from images or PDFs. Our AI tool removes unnecessary parts for a clean, ready-to-use label.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Click to upload a label</p>
          <p className="text-sm text-muted-foreground">Image or PDF</p>
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
        </div>
        
        {originalFile && <p className="text-center text-sm text-muted-foreground">Selected: {originalFile.name}</p>}

        <Button onClick={handleCrop} disabled={isCropping || !originalFile} className="w-full">
          {isCropping ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cropping with AI...</> : <><Scissors className="mr-2 h-4 w-4" /> Crop Label</>}
        </Button>

        {croppedPreview && (
          <div className="space-y-4">
            <h3 className="font-semibold text-center">Cropped Preview</h3>
            <div className="flex justify-center bg-muted/20 p-4 rounded-lg">
              <img
                src={croppedPreview}
                alt="Cropped label"
                className="rounded-lg max-w-full h-auto shadow-md"
              />
            </div>
            <Button onClick={handleDownload} className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Cropped Label
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
