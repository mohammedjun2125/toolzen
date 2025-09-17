'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (error) {
      setOutput('Invalid input for encoding.');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input.replace(/\+/g, ' ')));
    } catch (error) {
      setOutput('Invalid input for decoding.');
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">URL Encoder / Decoder</CardTitle>
        <CardDescription>Encode or decode your text strings for URLs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor='input-text'>Input</Label>
            <Textarea
            id="input-text"
            placeholder="Enter text to encode or decode"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            />
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={handleEncode}>Encode</Button>
          <Button onClick={handleDecode} variant="outline">Decode</Button>
        </div>
        <div className="space-y-2">
            <Label htmlFor='output-text'>Output</Label>
            <Textarea
            id="output-text"
            placeholder="Result will appear here"
            value={output}
            readOnly
            rows={6}
            />
        </div>
      </CardContent>
    </Card>
  );
}