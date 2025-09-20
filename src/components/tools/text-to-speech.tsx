'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Download, Loader2, Volume2 } from 'lucide-react';
import { generateSpeech } from '@/ai/flows/text-to-speech-flow';

export default function TextToSpeech() {
  const [text, setText] = useState('Hello, welcome to Toolzen. You can convert any text into speech here.');
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'Please enter some text.' });
      return;
    }

    setIsLoading(true);
    setAudioUrl(null);
    try {
      const result = await generateSpeech(text);
      if (result.media) {
        setAudioUrl(result.media);
        toast({ title: 'Speech generated successfully!' });
      } else {
        throw new Error('No audio data returned.');
      }
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Speech Generation Failed', description: 'Could not generate audio. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Text to Speech</CardTitle>
        <CardDescription>Convert text into high-quality, downloadable audio using AI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          disabled={isLoading}
        />
        
        <Button onClick={handleGenerateSpeech} disabled={isLoading || !text} className="w-full">
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Volume2 className="mr-2 h-4 w-4" /> Generate Speech</>
          )}
        </Button>
        
        {audioUrl && (
          <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center gap-4">
            <audio controls src={audioUrl} className="w-full">
              Your browser does not support the audio element.
            </audio>
            <a href={audioUrl} download="speech.wav">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download WAV
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
