'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

function StatCard({ title, value }: { title: string, value: number }) {
    return (
        <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = trimmedText.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = trimmedText.split(/\n+/).filter(Boolean).length;

    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Word Counter</CardTitle>
        <CardDescription>Get instant statistics for your text.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="resize-y"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Words" value={stats.words} />
          <StatCard title="Characters" value={stats.characters} />
          <StatCard title="Sentences" value={stats.sentences} />
          <StatCard title="Paragraphs" value={stats.paragraphs} />
        </div>
      </CardContent>
    </Card>
  );
}
