'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { intervalToDuration } from 'date-fns';

type Age = {
    years: number;
    months: number;
    days: number;
}

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<Age | null>(null);

  const calculateAge = () => {
    if (dob) {
      const birthDate = new Date(dob);
      const now = new Date();
      if(birthDate > now) {
          setAge(null);
          return;
      }
      const duration = intervalToDuration({ start: birthDate, end: now });
      setAge({
          years: duration.years || 0,
          months: duration.months || 0,
          days: duration.days || 0
      });
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Age Calculator</CardTitle>
        <CardDescription>Find out your exact age in years, months, and days.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dob">Enter your Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <Button onClick={calculateAge} className="w-full">Calculate Age</Button>
        {age && (
            <div className="p-6 bg-muted/50 rounded-lg text-center">
                <h3 className="text-lg font-semibold mb-2">Your Age is</h3>
                <div className="flex justify-center items-baseline gap-4">
                    <div>
                        <span className="text-4xl font-bold text-primary">{age.years}</span>
                        <span className="text-muted-foreground"> Years</span>
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-primary">{age.months}</span>
                        <span className="text-muted-foreground"> Months</span>
                    </div>
                    <div>
                        <span className="text-4xl font-bold text-primary">{age.days}</span>
                        <span className="text-muted-foreground"> Days</span>
                    </div>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}