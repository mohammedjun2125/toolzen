
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { seoKeywords } from '@/lib/seo-keywords';

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState('https://www.toolzenweb.com/search?q=free tools');
  const [output, setOutput] = useState('');
  const toolKeywords = (seoKeywords.tools as any)['url-encoder-decoder'];

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
    <>
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' & ')}</CardTitle>
        <CardDescription>Safely **{toolKeywords.meta_keywords[0]}** or **{toolKeywords.meta_keywords[1]}** for use in URLs. This tool performs **percent-encoding** to ensure your data is web-safe, an essential utility for developers and SEOs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor='input-text'>Input</Label>
            <Textarea
            id="input-text"
            placeholder="Enter URL or text to encode or decode"
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
    <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">What is URL Encoding?</h2>
        <p>URL encoding, also known as **percent-encoding**, is the process of converting characters into a format that can be safely transmitted over the internet. URLs can only contain a specific set of characters (ASCII letters, numbers, and a few reserved symbols). Any character outside this set, such as spaces, ampersands, or non-English letters, must be encoded. This is done by replacing the character with a `%` sign followed by its two-digit hexadecimal code.</p>
        <p>For example, a space character is encoded as `%20`. So, the search query `free tools` becomes `free%20tools` when placed in a URL. Our **free URL encoder** automates this process for you.</p>

        <h3>Why is URL Encoding Important?</h3>
        <ul>
            <li><strong>Data Integrity:</strong> It ensures that the web server correctly interprets the data being sent in a URL's query string. For example, an ampersand (`&`) is used to separate URL parameters, so a literal ampersand in a value must be encoded as `%26` to avoid breaking the URL structure.</li>
            <li><strong>Compatibility:</strong> It allows for the inclusion of a wide range of characters in URLs, including international characters, in a way that all web servers and browsers can understand.</li>
            <li>**SEO & Web Development:** Developers and SEOs must use a **URL encode tool** to ensure that dynamic URLs with query parameters are structured correctly and can be properly crawled and indexed by search engines.</li>
        </ul>

        <h2 className="text-2xl font-bold">URL Decoding</h2>
        <p>**URL decoding** is the reverse process. It takes a percent-encoded string and converts it back into its original, human-readable form. This is useful for developers when they need to inspect parameters from an incoming request or for analysts trying to understand tracking URLs. Our **free URL decoder** makes this process instant.</p>
    </article>
    </>
  );
}
