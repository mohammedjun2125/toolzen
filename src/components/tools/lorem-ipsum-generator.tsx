'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const loremIpsumWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generateLoremIpsum(count: number, type: 'paragraphs' | 'sentences' | 'words') {
    let result = '';
    if (type === 'words') {
        for (let i = 0; i < count; i++) {
            result += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + ' ';
        }
        return result.trim();
    }
    if (type === 'sentences') {
        for (let i = 0; i < count; i++) {
            let sentence = '';
            const sentenceLength = Math.floor(Math.random() * 10) + 5;
            for (let j = 0; j < sentenceLength; j++) {
                sentence += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + ' ';
            }
            result += sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1) + '. ';
        }
        return result.trim();
    }
    if (type === 'paragraphs') {
        for (let i = 0; i < count; i++) {
            let paragraph = '';
            const paragraphLength = Math.floor(Math.random() * 5) + 3;
            for (let j = 0; j < paragraphLength; j++) {
                let sentence = '';
                const sentenceLength = Math.floor(Math.random() * 10) + 8;
                for (let k = 0; k < sentenceLength; k++) {
                    sentence += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + ' ';
                }
                paragraph += sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1) + '. ';
            }
            result += paragraph.trim() + '\n\n';
        }
        return result.trim();
    }
    return '';
}

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [generatedText, setGeneratedText] = useState('');
  const { toast } = useToast();

  const handleGenerate = useCallback(() => {
    setGeneratedText(generateLoremIpsum(count, type));
  }, [count, type]);

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast({ title: 'Text copied to clipboard!' });
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Lorem Ipsum Generator</CardTitle>
        <CardDescription>Generate placeholder text for your designs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="count">Count</Label>
                <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10)))}
                min="1"
                />
            </div>
            <div className="space-y-2 col-span-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as any)}>
                    <SelectTrigger id="type">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                        <SelectItem value="sentences">Sentences</SelectItem>
                        <SelectItem value="words">Words</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <Button onClick={handleGenerate} className="w-full">Generate</Button>

        {generatedText && (
          <div className="relative">
            <Textarea
              readOnly
              value={generatedText}
              rows={10}
              className="pr-12"
            />
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}