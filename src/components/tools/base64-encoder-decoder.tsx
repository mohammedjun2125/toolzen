'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch (error) {
      setOutput('Invalid input for Base64 encoding.');
      toast({ variant: 'destructive', title: 'Encoding Error', description: 'Input contains characters that cannot be encoded.' });
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch (error) {
      setOutput('Invalid Base64 string.');
      toast({ variant: 'destructive', title: 'Decoding Error', description: 'The input is not a valid Base64 string.' });
    }
  };

  const handleCopy = () => {
      if(output){
          navigator.clipboard.writeText(output);
          toast({title: 'Output copied to clipboard!'});
      }
  }

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Base64 Encoder / Decoder</CardTitle>
        <CardDescription>Easily encode to and decode from Base64 format.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="input-area">Input</Label>
            <Textarea
                id="input-area"
                placeholder="Enter text or Base64 here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
            />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleEncode} className="w-full">Encode</Button>
          <Button onClick={handleDecode} className="w-full" variant="outline">Decode</Button>
        </div>

        <div className="space-y-2">
            <Label htmlFor="output-area">Output</Label>
            <Textarea
                id="output-area"
                readOnly
                value={output}
                placeholder="Result will appear here..."
                rows={6}
            />
        </div>

        <Button onClick={handleCopy} disabled={!output} className="w-full" variant="secondary">Copy Output</Button>
      </CardContent>
    </Card>
  );
}