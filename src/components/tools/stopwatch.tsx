
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCw, Flag } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps(prevLaps => [...prevLaps, time]);
    };

    const formatTime = (timeInMillis: number) => {
        const milliseconds = `0${(timeInMillis % 1000) / 10}`.slice(-2);
        const seconds = `0${Math.floor((timeInMillis / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((timeInMillis / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor(timeInMillis / 3600000)}`.slice(-2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Online Stopwatch</CardTitle>
                <CardDescription>A simple, accurate stopwatch to time anything. With lap functionality.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center bg-muted/50 p-8 rounded-lg">
                    <p className="text-6xl md:text-7xl font-mono tracking-tighter">{formatTime(time)}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button onClick={handleStartPause} className="md:col-span-2">
                        {isRunning ? <Pause className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4"/>}
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                    <Button onClick={handleLap} variant="outline" disabled={!isRunning}>
                         <Flag className="mr-2 h-4 w-4"/> Lap
                    </Button>
                     <Button onClick={handleReset} variant="destructive">
                         <RotateCw className="mr-2 h-4 w-4"/> Reset
                    </Button>
                </div>

                {laps.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="font-semibold">Laps</h3>
                        <ScrollArea className="h-40 w-full rounded-md border p-4">
                           <ul className="space-y-2">
                            {laps.slice().reverse().map((lap, index) => (
                                <li key={index} className="flex justify-between items-center text-sm font-mono">
                                    <span>Lap {laps.length - index}</span>
                                    <span>{formatTime(lap - (laps[laps.length - index - 2] || 0))}</span>
                                    <span>{formatTime(lap)}</span>
                                </li>
                            ))}
                           </ul>
                        </ScrollArea>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
