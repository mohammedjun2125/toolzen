'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TimezoneConverterClient() {
    const [timezones, setTimezones] = useState<string[]>([]);
    const [fromTimezone, setFromTimezone] = useState<string>('');
    const [toTimezone, setToTimezone] = useState<string>('');
    const [fromTime, setFromTime] = useState('');
    const [toTime, setToTime] = useState('');

    useEffect(() => {
        // This code now runs only on the client
        const availableTimezones = Intl.supportedValuesOf('timeZone');
        setTimezones(availableTimezones);
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFromTimezone(userTz);
        
        const defaultTo = 'Europe/London';
        setToTimezone(availableTimezones.includes(defaultTo) ? defaultTo : availableTimezones[0]);

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

        try {
            const [hours, minutes] = fromTime.split(':').map(Number);
            
            // Create a date object in the "from" timezone's local time
            const nowInFromTz = new Date(new Date().toLocaleString('en-US', { timeZone: fromTimezone }));
            nowInFromTz.setHours(hours, minutes, 0, 0);

            // Now, format this date into the "to" timezone.
            // This is the most reliable way to convert between timezones.
            const toTimeString = new Intl.DateTimeFormat('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: toTimezone
            }).format(nowInFromTz);

            setToTime(toTimeString.replace('24:', '00:'));
        } catch (error) {
            console.error("Time conversion error:", error);
            setToTime('Invalid');
        }

    }, [fromTime, fromTimezone, toTimezone]);

    return (
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
    );
}
