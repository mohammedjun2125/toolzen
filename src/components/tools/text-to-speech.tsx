'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
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
        // Find a default US English voice if possible, otherwise first default or first voice
        const defaultUsVoice = availableVoices.find(voice => voice.lang === 'en-US' && voice.default);
        const defaultVoice = availableVoices.find(voice => voice.default);
        setSelectedVoice(defaultUsVoice?.name || defaultVoice?.name || availableVoices[0].name);
      }
    };
    
    // onvoiceschanged is the correct event to listen for
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial call in case voices are already loaded

    return () => {
        window.speechSynthesis.onvoiceschanged = null; // Clean up listener
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel(); // Stop any speech on component unmount
        }
    }
  }, []);

  const groupedVoices = useMemo(() => {
    const groups: { [key: string]: SpeechSynthesisVoice[] } = {};
    voices.forEach(voice => {
        const lang = voice.lang;
        if (!groups[lang]) {
            groups[lang] = [];
        }
        groups[lang].push(voice);
    });
    return groups;
  }, [voices]);
  
  const handleSpeak = () => {
    if (!text.trim()) {
        toast({ variant: 'destructive', title: 'Please enter some text.' });
        return;
    }
    
    if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsSpeaking(true);
        return;
    }
    
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if(voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (e) => {
        toast({variant: 'destructive', title: 'An error occurred', description: `This voice may not be supported by your browser. Error: ${e.error}`});
        setIsSpeaking(false);
        setIsPaused(false);
    }
    window.speechSynthesis.speak(utterance);
  };
  
  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
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
          disabled={isSpeaking || isPaused}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Voice</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={voices.length === 0 || isSpeaking || isPaused}>
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {Object.keys(groupedVoices).sort().map(lang => (
                    <SelectGroup key={lang}>
                        <SelectLabel>{new Intl.DisplayNames(['en'], { type: 'language' }).of(lang) || lang}</SelectLabel>
                        {groupedVoices[lang].map(voice => (
                            <SelectItem key={voice.name} value={voice.name}>
                                {voice.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
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
        <div className="flex gap-2 justify-center">
            <Button onClick={handleSpeak} disabled={isSpeaking && !isPaused} size="lg">
              <Play className="mr-2 h-4 w-4" /> {isPaused ? 'Resume' : 'Play'}
            </Button>
            <Button onClick={handlePause} disabled={!isSpeaking || isPaused} variant="outline" size="lg">
              <Pause className="mr-2 h-4 w-4" /> Pause
            </Button>
            <Button onClick={handleStop} variant="destructive" size="lg" disabled={!isSpeaking && !isPaused}>
                <StopCircle className="mr-2 h-4 w-4" /> Stop
            </Button>
        </div>
        {voices.length === 0 && <p className="text-center text-sm text-muted-foreground">Loading voices... If no voices appear, your browser may not support the Web Speech API.</p>}
      </CardContent>
    </Card>
  );
}
