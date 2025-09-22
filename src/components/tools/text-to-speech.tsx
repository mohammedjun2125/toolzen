'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

export default function TextToSpeech() {
  const [text, setText] = useState('Hello, welcome to Toolzen. You can convert any text into speech here.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
        const defaultVoice = voiceList.find(voice => voice.lang.includes('en') && voice.localService) || voiceList[0];
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.name);
        }
      }
    };
    
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = getVoices;
    } 
    getVoices();

    return () => {
        window.speechSynthesis.cancel();
        if ('onvoiceschanged' in window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = null;
        }
    }
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'Please enter some text.' });
      return;
    }

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }
    
    if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.pitch = pitch;
    utterance.rate = rate;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (event) => {
        toast({variant: 'destructive', title: 'An error occurred', description: event.error});
        setIsSpeaking(false);
        setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };
  
  const handleStop = () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
  }
  
  const voiceGroups = voices.reduce((acc, voice) => {
    const lang = voice.lang;
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(voice);
    return acc;
  }, {} as Record<string, SpeechSynthesisVoice[]>);


  return (
    <>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 md:col-span-3">
                <Label htmlFor="voice-select">Voice</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select">
                        <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        {Object.keys(voiceGroups).length > 0 ? (
                           Object.entries(voiceGroups).map(([lang, voices]) => (
                            <div key={lang}>
                                <Label className="px-2 py-1.5 text-xs font-semibold">{lang}</Label>
                                {voices.map(voice => (
                                    <SelectItem key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</SelectItem>
                                ))}
                            </div>
                           ))
                        ) : (
                            <SelectItem value="loading" disabled>Loading voices...</SelectItem>
                        )}
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
              {isSpeaking && !isPaused ? (
                <><Pause className="mr-2 h-4 w-4" /> Pause</>
              ) : (
                <><Play className="mr-2 h-4 w-4" /> {isPaused ? 'Resume' : 'Play'}</>
              )}
            </Button>
            <Button onClick={handleStop} variant="outline" disabled={!isSpeaking}>
                <Square className="mr-2 h-4 w-4"/> Stop
            </Button>
        </div>
      </CardContent>
    </Card>
    
    <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
        <h2 className="text-2xl font-bold">Hear Your Words Come to Life</h2>
        <p>Text-to-Speech (TTS) technology has revolutionized how we interact with digital content. It provides a voice to the written word, making information more accessible and easier to consume for everyone. Our free online Text-to-Speech tool leverages your browser's built-in synthesis engine to provide high-quality, natural-sounding speech instantly and privately.</p>
        
        <h3>Key Features and Benefits</h3>
        <ul>
            <li><strong>Natural Voices:</strong> Access a wide range of voices available in your operating system, covering various languages and accents.</li>
            <li><strong>Customizable Speech:</strong> Easily adjust the pitch and speed (rate) of the voice to match your preference, whether you need slow, clear narration or want to quickly listen to a long article.</li>
            <li><strong>Complete Privacy:</strong> Our tool is 100% client-side. The text you enter is processed directly on your device and is never sent to our servers. This guarantees that your data remains confidential.</li>
            <li><strong>No Limits:</strong> Convert as much text as you want, as often as you want. There are no character limits or daily usage caps.</li>
        </ul>

        <h3>Practical Applications of Text-to-Speech</h3>
        <ol>
            <li><strong>Accessibility:</strong> It's an essential tool for individuals with visual impairments or reading difficulties like dyslexia, providing them with access to written content.</li>
            <li><strong>Proofreading:</strong> Hearing your own writing read aloud is a powerful way to catch typos, grammatical mistakes, and awkward phrasing that your eyes might miss.</li>
            <li><strong>Learning & Language:</strong> For language learners, listening to text can help improve pronunciation, intonation, and comprehension.</li>
            <li><strong>Multitasking:</strong> Turn any article, report, or email into a podcast. Listen to content while you're driving, exercising, or cooking, making you more productive.</li>
        </ol>
    </div>
    </>
  );
}
