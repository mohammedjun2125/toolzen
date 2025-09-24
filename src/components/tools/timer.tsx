
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Timer() {
    const [initialTime, setInitialTime] = useState(300); // 5 minutes in seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio('/sounds/notification.mp3'); 
        }
    }, []);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            if (audioRef.current) {
                audioRef.current.play();
            }
            toast({ title: "Time's up!", description: "The timer has finished." });
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning, timeLeft, toast]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(initialTime);
    };
    
    const handleTimeInputChange = (part: 'h' | 'm' | 's', value: string) => {
        const numericValue = parseInt(value, 10) || 0;
        const currentHours = Math.floor(initialTime / 3600);
        const currentMinutes = Math.floor((initialTime % 3600) / 60);
        const currentSeconds = initialTime % 60;

        let newTotalSeconds = 0;
        if(part === 'h') newTotalSeconds = numericValue * 3600 + currentMinutes * 60 + currentSeconds;
        if(part === 'm') newTotalSeconds = currentHours * 3600 + numericValue * 60 + currentSeconds;
        if(part === 's') newTotalSeconds = currentHours * 3600 + currentMinutes * 60 + numericValue;
        
        setInitialTime(newTotalSeconds);
        if(!isRunning) setTimeLeft(newTotalSeconds);
    };

    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return {
            h: String(hours).padStart(2, '0'),
            m: String(minutes).padStart(2, '0'),
            s: String(seconds).padStart(2, '0'),
        };
    };

    const { h, m, s } = formatTime(timeLeft);
    const initialFormatted = formatTime(initialTime);

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Countdown Timer</CardTitle>
                <CardDescription>Set a timer for any task. Get an audio notification when time is up.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!isRunning && timeLeft === initialTime ? (
                    <div className="grid grid-cols-3 gap-2">
                         <div className="space-y-1 text-center">
                            <Label htmlFor="hours">Hours</Label>
                            <Input id="hours" type="number" value={initialFormatted.h} onChange={(e) => handleTimeInputChange('h', e.target.value)} className="text-2xl text-center h-16"/>
                         </div>
                          <div className="space-y-1 text-center">
                            <Label htmlFor="minutes">Minutes</Label>
                            <Input id="minutes" type="number" value={initialFormatted.m} onChange={(e) => handleTimeInputChange('m', e.target.value)} className="text-2xl text-center h-16"/>
                         </div>
                          <div className="space-y-1 text-center">
                            <Label htmlFor="seconds">Seconds</Label>
                            <Input id="seconds" type="number" value={initialFormatted.s} onChange={(e) => handleTimeInputChange('s', e.target.value)} className="text-2xl text-center h-16"/>
                         </div>
                    </div>
                ) : (
                    <div className="text-center bg-muted/50 p-8 rounded-lg">
                        <p className="text-6xl md:text-8xl font-mono tracking-tighter">{h}:{m}:{s}</p>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Button onClick={handleStartPause} size="lg">
                        {isRunning ? <Pause className="mr-2 h-5 w-5"/> : <Play className="mr-2 h-5 w-5"/>}
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                     <Button onClick={handleReset} variant="outline" size="lg">
                         <RotateCw className="mr-2 h-5 w-5"/> Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
