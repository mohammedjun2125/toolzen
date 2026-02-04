

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2, Check, X } from 'lucide-react';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('{"example": "paste your json here"}');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();
  const toolKeywords = (seoKeywords.tools as any)['json-formatter'];

  const handleFormat = () => {
    if (!jsonInput.trim()) {
      setIsValid(null);
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      toast({ title: 'JSON formatted successfully!' });
    } catch (error) {
      setIsValid(false);
      toast({ variant: 'destructive', title: 'Invalid JSON', description: (error as Error).message });
    }
  };
  
  const copyToClipboard = () => {
    if (jsonInput) {
        navigator.clipboard.writeText(jsonInput);
        toast({ title: 'JSON copied to clipboard!' });
    } else {
        toast({ variant: 'destructive', title: 'Nothing to copy!' });
    }
  };

  const clearText = () => {
    setJsonInput('');
    setIsValid(null);
  };
  
  const getBorderColor = () => {
      if (isValid === true) return 'border-green-500';
      if (isValid === false) return 'border-red-500';
      return '';
  }

  return (
    <>
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' & ')}</CardTitle>
        <CardDescription>Paste your JSON data to {toolKeywords.meta_keywords.join(', ')}. This free online JSON viewer and linter works securely in your browser to make debugging easy.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
            <Textarea
            placeholder='Paste your JSON here...'
            value={jsonInput}
            onChange={(e) => {
                setJsonInput(e.target.value);
                setIsValid(null);
            }}
            rows={15}
            className={`resize-y ${getBorderColor()}`}
            />
            {isValid === true && <Check className="absolute top-3 right-3 text-green-500" />}
            {isValid === false && <X className="absolute top-3 right-3 text-red-500" />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button onClick={handleFormat} className="md:col-span-1">Format/Validate JSON</Button>
            <Button onClick={copyToClipboard} variant="outline">
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={clearText} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
        </div>
      </CardContent>
    </Card>
    <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">What is a JSON Formatter & Validator?</h2>
        <p>A JSON Formatter (also known as a "Beautifier" or "Prettifier") is an essential developer tool that takes messy, unformatted JSON data and transforms it into a clean, indented, human-readable format. At the same time, it also acts as a JSON Validator (or "Linter") by parsing the data. If there are any syntax errors, it immediately flags them. This dual function makes it indispensable for anyone working with APIs, configuration files, or other data sources that use JSON.</p>
        
        <h3 className="text-xl font-bold">How to Use the JSON Formatter and Validator</h3>
        <ol>
            <li><strong>Paste Your JSON:</strong> Copy your raw JSON data and paste it into the text area.</li>
            <li><strong>Format & Validate:</strong> Press the "Format/Validate JSON" button.</li>
            <li><strong>Review the Output:</strong>
                <ul>
                  <li>If your JSON is valid, it will be instantly beautified with proper indentation. A green checkmark will appear to confirm its validity.</li>
                  <li>If your JSON is invalid, an error message will appear, and the text area will be highlighted in red. This helps you quickly identify issues like missing commas, incorrect quotes, or mismatched brackets.</li>
                </ul>
            </li>
            <li><strong>Copy or Clear:</strong> Once formatted, you can easily copy the clean JSON to your clipboard or clear the editor to start over.</li>
        </ol>

        <h3 className="text-xl font-bold">Key Features</h3>
        <ul>
            <li><strong>Instant Formatting:</strong> Cleans up minified or messy JSON in a single click.</li>
            <li><strong>Real-time Validation:</strong> Immediately alerts you to syntax errors.</li>
            <li><strong>Secure & Private:</strong> 100% client-side processing. Your data is never uploaded to a server, ensuring confidentiality.</li>
            <li><strong>Simple Interface:</strong> A large text area and clear buttons make the tool easy and efficient to use.</li>
            <li><strong>Copy & Clear:</strong> Quickly copy the formatted output or clear the editor with convenient buttons.</li>
        </ul>

        <h3 className="text-xl font-bold">Common Use Cases</h3>
        <ul>
            <li><strong>API Development:</strong> Prettify raw API responses to understand their structure and find the data you need.</li>
            <li><strong>Debugging:</strong> Quickly find and fix syntax errors in your JSON files or data strings.</li>
            <li><strong>Configuration Files:</strong> Keep `package.json`, `tsconfig.json`, and other configuration files clean and readable.</li>
            <li><strong>Learning:</strong> A great tool for students and new developers to learn the proper syntax and structure of JSON.</li>
        </ul>
        
        <div className="not-prose mt-8">
            <h3 className="text-xl font-semibold">Related Developer Tools</h3>
            <p>Streamline your workflow with our other text and data utilities:</p>
            <div className="flex gap-2 flex-wrap">
                <Button asChild variant="outline"><Link href="/tools/base64-encoder-decoder">Base64 Encoder/Decoder</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/url-encoder-decoder">URL Encoder/Decoder</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/hash-generator">Hash Generator</Link></Button>
            </div>
        </div>
    </article>
    </>
  );
}
