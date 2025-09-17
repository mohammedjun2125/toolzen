'use client';

import { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const conversionFactors = {
  length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254,
  },
  weight: {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495,
  },
};

type UnitData = { [key: string]: number | string };

const initialUnits = {
    length: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, yd: 1.09361, ft: 3.28084, in: 39.3701 },
    weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
    temperature: { c: 0, f: 32, k: 273.15 },
};

function UnitInput({ unit, value, onChange }: { unit: string, value: number | string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor={unit} className="text-right">{unit.toUpperCase()}</Label>
            <Input id={unit} name={unit} value={value} onChange={onChange} type="number" />
        </div>
    );
}

export default function UnitConverter() {
  const [length, setLength] = useState<UnitData>(initialUnits.length);
  const [weight, setWeight] = useState<UnitData>(initialUnits.weight);
  const [temperature, setTemperature] = useState<UnitData>(initialUnits.temperature);

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valueNum = parseFloat(value);
    if (isNaN(valueNum)) {
        setLength(Object.keys(length).reduce((acc, key) => ({...acc, [key]: ''}), {}));
        return;
    };

    const valueInMeters = valueNum * conversionFactors.length[name as keyof typeof conversionFactors.length];
    const newLengths: UnitData = {};
    for (const unit in conversionFactors.length) {
      newLengths[unit] = valueInMeters / conversionFactors.length[unit as keyof typeof conversionFactors.length];
    }
    setLength(newLengths);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valueNum = parseFloat(value);
    if (isNaN(valueNum)) {
        setWeight(Object.keys(weight).reduce((acc, key) => ({...acc, [key]: ''}), {}));
        return;
    };

    const valueInKg = valueNum * conversionFactors.weight[name as keyof typeof conversionFactors.weight];
    const newWeights: UnitData = {};
    for (const unit in conversionFactors.weight) {
      newWeights[unit] = valueInKg / conversionFactors.weight[unit as keyof typeof conversionFactors.weight];
    }
    setWeight(newWeights);
  };
  
  const handleTempChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valueNum = parseFloat(value);
    if (isNaN(valueNum)) {
        setTemperature(Object.keys(temperature).reduce((acc, key) => ({...acc, [key]: ''}), {}));
        return;
    }
    
    let celsius;
    if (name === 'c') celsius = valueNum;
    else if (name === 'f') celsius = (valueNum - 32) * 5/9;
    else if (name === 'k') celsius = valueNum - 273.15;
    else return;

    setTemperature({
        c: celsius,
        f: (celsius * 9/5) + 32,
        k: celsius + 273.15
    });
  }

  return (
    <Card className="w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Unit Converter</CardTitle>
        <CardDescription>Real-time conversion for length, weight, and temperature.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="length" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="length">Length</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
          </TabsList>
          <TabsContent value="length" className="mt-6 space-y-4">
            {Object.entries(length).map(([unit, value]) => (
                <UnitInput key={unit} unit={unit} value={Number(value).toPrecision(6)} onChange={handleLengthChange} />
            ))}
          </TabsContent>
          <TabsContent value="weight" className="mt-6 space-y-4">
            {Object.entries(weight).map(([unit, value]) => (
                <UnitInput key={unit} unit={unit} value={Number(value).toPrecision(6)} onChange={handleWeightChange} />
            ))}
          </TabsContent>
          <TabsContent value="temperature" className="mt-6 space-y-4">
            <UnitInput unit="c" value={Number(temperature.c).toFixed(2)} onChange={handleTempChange} />
            <UnitInput unit="f" value={Number(temperature.f).toFixed(2)} onChange={handleTempChange} />
            <UnitInput unit="k" value={Number(temperature.k).toFixed(2)} onChange={handleTempChange} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
