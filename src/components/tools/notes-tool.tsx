
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'toolzen-notes';

export default function NotesTool() {
  const [note, setNote] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedNote) {
        setNote(savedNote);
      }
    } catch (error) {
      console.warn("Could not access localStorage for notes.");
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, note);
    } catch (error) {
        console.warn("Could not access localStorage to save notes.");
    }
  }, [note]);

  const handleClear = () => {
    setNote('');
    toast({ title: 'Note cleared.' });
  };
  
  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Simple Notes</CardTitle>
        <CardDescription>
            A private notepad in your browser. Your notes are automatically saved to your device and are never uploaded.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Start typing your notes here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={15}
          className="resize-y text-base"
        />
        <Button onClick={handleClear} variant="destructive" className="w-full">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Note
        </Button>
      </CardContent>
    </Card>
  );
}
