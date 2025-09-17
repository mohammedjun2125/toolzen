'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightIn, setHeightIn] = useState(''); // For imperial inches
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBmi = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    let calculatedBmi: number | null = null;
    
    if (unit === 'metric' && h > 0 && w > 0) {
      const heightInMeters = h / 100;
      calculatedBmi = w / (heightInMeters * heightInMeters);
    } else if (unit === 'imperial' && h > 0 && w > 0) {
      const hIn = parseFloat(heightIn) || 0;
      const totalHeightInInches = (h * 12) + hIn;
      calculatedBmi = (w / (totalHeightInInches * totalHeightInInches)) * 703;
    }
    
    if (calculatedBmi !== null) {
      setBmi(calculatedBmi);
      if (calculatedBmi < 18.5) setCategory('Underweight');
      else if (calculatedBmi < 25) setCategory('Normal weight');
      else if (calculatedBmi < 30) setCategory('Overweight');
      else setCategory('Obese');
    } else {
        setBmi(null);
        setCategory('');
    }
  };

  const getCategoryColor = () => {
      if (!category) return 'text-foreground';
      switch(category) {
          case 'Underweight': return 'text-yellow-400';
          case 'Normal weight': return 'text-green-400';
          case 'Overweight': return 'text-orange-400';
          case 'Obese': return 'text-red-500';
          default: return 'text-foreground';
      }
  }

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Label htmlFor="unit-switch">Imperial</Label>
          <Switch
            id="unit-switch"
            checked={unit === 'metric'}
            onCheckedChange={(checked) => setUnit(checked ? 'metric' : 'imperial')}
          />
          <Label htmlFor="unit-switch">Metric</Label>
        </div>

        {unit === 'metric' ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height-cm">Height (cm)</Label>
              <Input id="height-cm" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight-kg">Weight (kg)</Label>
              <Input id="weight-kg" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Height</Label>
              <div className="flex gap-2">
                <Input type="number" placeholder="ft" value={height} onChange={(e) => setHeight(e.target.value)} />
                <Input type="number" placeholder="in" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight-lb">Weight (lb)</Label>
              <Input id="weight-lb" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
          </div>
        )}

        <Button onClick={calculateBmi} className="w-full">Calculate BMI</Button>

        {bmi !== null && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Your BMI is</h3>
            <p className="text-5xl font-bold">{bmi.toFixed(1)}</p>
            <p className={`text-xl font-semibold mt-2 ${getCategoryColor()}`}>{category}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
