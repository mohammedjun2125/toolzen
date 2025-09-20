'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

export default function TextToSpeech() {
  const [text, setText] = useState('Hello, welcome to Toolzen. You can convert any text into speech here.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const getVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      if (voiceList.length > 0) {
        setVoices(voiceList);
        // Set a default voice, prefer a local English one
        const defaultVoice = voiceList.find(voice => voice.lang.includes('en') && voice.localService) || voiceList[0];
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.name);
        }
      }
    };
    
    // Voices are loaded asynchronously
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = getVoices;
    } else {
        getVoices(); // For browsers that don't support the event
    }

    // Cleanup
    return () => {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
    }
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'Please enter some text.' });
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
      return;
    }
    
    window.speechSynthesis.cancel(); // Clear any previous utterance

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.pitch = pitch;
    utterance.rate = rate;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
        toast({variant: 'destructive', title: 'An error occurred', description: event.error});
        setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };
  
  const handleStop = () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
  }
  
  // Group voices by language
  const voiceGroups = voices.reduce((acc, voice) => {
    const lang = voice.lang;
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(voice);
    return acc;
  }, {} as Record<string, SpeechSynthesisVoice[]>);


  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Text to Speech Online</CardTitle>
        <CardDescription>Convert any text into natural-sounding speech with various voice controls.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="voice-select">Voice</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select">
                        <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        {Object.entries(voiceGroups).map(([lang, voices]) => (
                            <div key={lang}>
                                <Label className="px-2 py-1.5 text-xs font-semibold">{lang}</Label>
                                {voices.map(voice => (
                                    <SelectItem key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</SelectItem>
                                ))}
                            </div>
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
            <Button onClick={handleSpeak} disabled={!text} className="w-full">
              {isSpeaking ? (
                <><Pause className="mr-2 h-4 w-4" /> Pause</>
              ) : (
                <><Play className="mr-2 h-4 w-4" /> Play</>
              )}
            </Button>
            <Button onClick={handleStop} variant="outline">
                <Square className="mr-2 h-4 w-4"/> Stop
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
