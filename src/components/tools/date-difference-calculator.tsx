
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, intervalToDuration } from 'date-fns';

type Duration = {
    years?: number;
    months?: number;
    days?: number;
}

export default function DateDifferenceCalculator() {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [difference, setDifference] = useState<Duration | null>(null);

    const calculateDifference = () => {
        if (startDate && endDate) {
            if (startDate > endDate) {
                setDifference(intervalToDuration({ start: endDate, end: startDate }));
            } else {
                setDifference(intervalToDuration({ start: startDate, end: endDate }));
            }
        }
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Date Difference Calculator</CardTitle>
                <CardDescription>Calculate the duration between two dates in years, months, and days.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <Button onClick={calculateDifference} className="w-full">Calculate Difference</Button>

                {difference && (
                    <div className="p-6 bg-muted/50 rounded-lg text-center">
                        <h3 className="text-lg font-semibold mb-2">Difference</h3>
                        <div className="flex justify-center items-baseline gap-4 flex-wrap">
                            <div>
                                <span className="text-4xl font-bold text-primary">{difference.years || 0}</span>
                                <span className="text-muted-foreground"> Years</span>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-primary">{difference.months || 0}</span>
                                <span className="text-muted-foreground"> Months</span>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-primary">{difference.days || 0}</span>
                                <span className="text-muted-foreground"> Days</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
