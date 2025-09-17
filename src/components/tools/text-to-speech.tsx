'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, StopCircle } from 'lucide-react';

export default function TextToSpeech() {
  const [text, setText] = useState('Hello, welcome to Toolzen. You can convert any text into speech here.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        const defaultVoice = availableVoices.find(voice => voice.default) || availableVoices[0];
        setSelectedVoice(defaultVoice.name);
      }
    };
    
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
    }
  }, []);
  
  const handleSpeak = () => {
    if (!text) {
        toast({ variant: 'destructive', title: 'Please enter some text.' });
        return;
    }
    
    if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsSpeaking(true);
        return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if(voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (e) => {
        toast({variant: 'destructive', title: 'An error occurred', description: e.error});
        setIsSpeaking(false);
        setIsPaused(false);
    }
    window.speechSynthesis.speak(utterance);
  };
  
  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Text to Speech</CardTitle>
        <CardDescription>Convert written text into natural-sounding speech.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Voice</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Pitch: {pitch.toFixed(1)}</Label>
            <Slider value={[pitch]} onValueChange={(v) => setPitch(v[0])} min={0} max={2} step={0.1} />
          </div>
          <div className="space-y-2">
            <Label>Speed: {rate.toFixed(1)}</Label>
            <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={0.1} max={2} step={0.1} />
          </div>
        </div>
        <div className="flex gap-2">
          {!isSpeaking ? (
            <Button onClick={handleSpeak} className="flex-1">
              <Play className="mr-2 h-4 w-4" /> {isPaused ? 'Resume' : 'Speak'}
            </Button>
          ) : (
            <Button onClick={handlePause} className="flex-1">
              <Pause className="mr-2 h-4 w-4" /> Pause
            </Button>
          )}
          <Button onClick={handleStop} variant="outline" disabled={!isSpeaking && !isPaused} className="flex-1">
            <StopCircle className="mr-2 h-4 w-4" /> Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
