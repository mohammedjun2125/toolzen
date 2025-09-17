'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TimezoneConverter() {
    const [timezones, setTimezones] = useState<string[]>([]);
    const [fromTimezone, setFromTimezone] = useState<string>('');
    const [toTimezone, setToTimezone] = useState<string>('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');

    useEffect(() => {
        const availableTimezones = Intl.supportedValuesOf('timeZone');
        setTimezones(availableTimezones);
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFromTimezone(userTz);
        // Set a common default 'to' timezone
        const defaultTo = 'Europe/London';
        setToTimezone(availableTimezones.includes(defaultTo) ? defaultTo : availableTimezones[0]);

        // Set initial time
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setFromTime(`${hours}:${minutes}`);
    }, []);
    
    useEffect(() => {
        if (!fromTime || !fromTimezone || !toTimezone) {
            setToTime('');
            return;
        }

        const [hours, minutes] = fromTime.split(':').map(Number);
        const fromDate = new Date();
        fromDate.setHours(hours, minutes, 0, 0);

        try {
            const fromDateString = new Intl.DateTimeFormat('en-US', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false, timeZone: fromTimezone
            }).format(fromDate);
            
            // This is a trick to parse the date in the "from" timezone correctly
            const parts = new Intl.DateTimeFormat('en-US', {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: false, timeZone: fromTimezone
            }).formatToParts(fromDate);
            
            const dateInFromTz = new Date(
                `${parts.find(p => p.type === 'year')?.value}-${String(parts.find(p => p.type === 'month')?.value).padStart(2,'0')}-${String(parts.find(p => p.type === 'day')?.value).padStart(2,'0')}T${fromTime}:00`
            );

            const toTimeString = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: toTimezone
            }).format(dateInFromTz);

            setToTime(toTimeString.replace('24:', '00:'));
        } catch (error) {
            console.error("Time conversion error:", error);
            setToTime('Invalid Time');
        }

    }, [fromTime, fromTimezone, toTimezone]);

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Time Zone Converter</CardTitle>
                <CardDescription>Easily convert times between different parts of the world.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="from-time">From</Label>
                        <Input id="from-time" type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
                        <Select value={fromTimezone} onValueChange={setFromTimezone}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                                {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="to-time">To</Label>
                        <Input id="to-time" type="time" value={toTime} readOnly />
                        <Select value={toTimezone} onValueChange={setToTimezone}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                                {timezones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='text-center text-muted-foreground text-sm'>
                    Current time is based on your browser settings.
                </div>
            </CardContent>
        </Card>
    );
}
