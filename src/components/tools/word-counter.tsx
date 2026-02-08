
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';
import { Button } from '../ui/button';

function StatCard({ title, value }: { title: string, value: number }) {
    return (
        <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const toolKeywords = (seoKeywords.tools as any)['word-counter'];

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === '') {
        return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0, paragraphs: 0 };
    }
    const words = trimmedText.split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmedText.match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g)?.length || 0;
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.trim() !== '').length;

    return { words, characters, charactersNoSpaces, sentences, paragraphs };
  }, [text]);

  return (
    <>
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Online Word Count Tool</CardTitle>
        <CardDescription>Get instant statistics for your text. This **{toolKeywords.meta_keywords.join(', ')}** calculates characters, sentences, and paragraphs in real-time, all securely in your browser.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Start typing or paste your text here to count words and characters..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="resize-y text-lg"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard title="Words" value={stats.words} />
          <StatCard title="Characters" value={stats.characters} />
          <StatCard title="Characters (no spaces)" value={stats.charactersNoSpaces} />
          <StatCard title="Sentences" value={stats.sentences} />
          <StatCard title="Paragraphs" value={stats.paragraphs} />
        </div>
      </CardContent>
    </Card>
    <article className="prose dark:prose-invert max-w-none mx-auto mt-16 text-lg">
        <h2 className="text-3xl font-serif">The Essential Online Word Count Tool for Writers and Professionals</h2>
        <p>In the world of content creation, every word matters. Whether you're a student striving to meet the length requirements of an essay, a marketer crafting the perfect tweet, or a blogger optimizing an article for SEO, precision is key. Our **Online Word Count Tool** is a simple yet powerful utility designed to provide instant, accurate, and comprehensive statistics about your text. It's more than just a word counter; it's a real-time text analysis dashboard that helps you refine and perfect your writing.</p>

        <h3 className="font-serif">How the Word Counter Works</h3>
        <p>This tool is engineered for speed and privacy. When you type or paste text into the editor, a series of JavaScript functions run instantly in your browser to analyze the content. It splits the text by spaces and line breaks to count words, iterates through characters to get character counts, and uses regular expressions to identify sentence and paragraph breaks. Because this all happens on the **client-side**, your text is never sent to our servers. It remains completely private and secure on your device, making it safe for sensitive or proprietary content.</p>

        <h3 className="font-serif">Step-by-Step Guide to Analyzing Your Text</h3>
        <ol>
            <li><strong>Enter Your Text:</strong> Simply begin typing directly into the large text area, or copy and paste your content from another application like Microsoft Word, Google Docs, or a notes app.</li>
            <li><strong>View Real-Time Statistics:</strong> As you type, you'll notice the stat cards below the text area update instantly. There is no need to click a "submit" or "calculate" button.</li>
            <li><strong>Analyze and Refine:</strong> Use the live data to guide your writing process. Check if you're meeting word count targets, see if your sentences are too long, or ensure your social media post fits within character limits.</li>
        </ol>

        <h3 className="font-serif">Practical Use Cases</h3>
        <ul>
            <li><strong>Academic Writing:</strong> Students and researchers can use the word and character count to ensure their essays, dissertations, and research papers adhere to strict submission guidelines.</li>
            <li><strong>SEO and Content Marketing:</strong> Bloggers and SEO specialists can craft articles that meet ideal length requirements for search engine rankings. It's also perfect for writing meta titles and descriptions that fit within Google's display limits.</li>
            <li><strong>Social Media Management:</strong> Quickly compose posts for platforms with character limits, like X (formerly Twitter), ensuring your message is concise and effective without being cut off.</li>
            <li><strong>Professional Communication:</strong> Draft emails, reports, and presentations with clarity and brevity. The paragraph and sentence counters help you structure your thoughts for maximum impact.</li>
            <li><strong>Translation and Localization:</strong> Translators can use the character and word counts to provide accurate quotes for their services.</li>
        </ul>

        <h3 className="font-serif">Advantages and Limitations</h3>
        <p><strong>Advantages:</strong> Our tool is extremely fast, 100% private, and completely free with no limits on use. It provides a comprehensive set of statistics beyond just word count. <strong>Limitations:</strong> The sentence and paragraph detection relies on standard punctuation and formatting. It may not be perfectly accurate with unconventional text structures. For highly specialized linguistic analysis, a dedicated academic tool may be required.</p>

        <h3 className="font-serif">Frequently Asked Questions (FAQs)</h3>
        <dl>
            <dt>1. Is this online word count tool free to use?</dt>
            <dd>Yes, it is completely free and unlimited. You can analyze as much text as you want, as often as you want, without any cost or registration.</dd>
            <dt>2. Does this tool store my text?</dt>
            <dd>No. Your privacy is our priority. All counting and analysis are performed in your browser. Your text is never sent to or stored on our servers.</dd>
            <dt>3. How does the tool count words?</dt>
            <dd>The tool counts words by splitting the text by one or more spaces or line breaks. This is a standard method that provides an accurate count for most languages.</dd>
            <dt>4. What is the difference between "Characters" and "Characters (no spaces)"?</dt>
            <dd>"Characters" is the total count of all characters in the text box, including spaces, letters, numbers, and punctuation. "Characters (no spaces)" gives you the count excluding all whitespace, which is a useful metric for certain content limits.</dd>
            <dt>5. Can this tool handle very large documents?</dt>
            <dd>Yes. Since it runs on your device, it can handle very large texts, such as a full-length novel. The performance will depend on the processing power of your computer, but it is designed to be highly efficient.</dd>
            <dt>6. Does the sentence count work for different languages?</dt>
            <dd>The sentence counter primarily looks for standard terminal punctuation like periods (.), question marks (?), and exclamation marks (!). It works well for English and many other languages that use similar sentence structures.</dd>
        </dl>

        <h3 className="font-serif">Best Practices for Writing</h3>
        <ul>
            <li><strong>Vary Sentence Length:</strong> Use the sentence counter to check your work. A good mix of long and short sentences makes writing more engaging.</li>
            <li><strong>Keep Paragraphs Focused:</strong> The paragraph counter can help you see if your text is well-structured. Aim for one main idea per paragraph to improve readability.</li>
            <li><strong>Be Concise:</strong> Use the word counter to challenge yourself to say more with fewer words. This is especially important for web content and professional emails.</li>
        </ul>

        <div className="not-prose mt-8">
            <h3 className="text-xl font-semibold">Related Text & Data Tools</h3>
            <p>Enhance your writing and data processing with our other free utilities:</p>
            <div className="flex gap-2 flex-wrap">
                <Button asChild variant="outline"><Link href="/tools/case-converter">Case Converter</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/remove-duplicate-lines">Remove Duplicate Lines</Link></Button>
                <Button asChild variant="outline"><Link href="/tools/text-to-speech">Text to Speech</Link></Button>
            </div>
        </div>
    </article>
    </>
  );
}
