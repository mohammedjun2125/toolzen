
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, RotateCw } from 'lucide-react';

export default function TextReverser() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleReverse = () => {
    setText(text.split('').reverse().join(''));
  };

  const copyToClipboard = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast({ title: 'Text copied to clipboard!' });
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Text Reverser</CardTitle>
        <CardDescription>Instantly reverse any text string. Great for fun or for formatting data.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to reverse..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button onClick={handleReverse}>
                <RotateCw className="mr-2 h-4 w-4" /> Reverse Text
            </Button>
            <Button onClick={copyToClipboard} variant="outline">
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={clearText} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
