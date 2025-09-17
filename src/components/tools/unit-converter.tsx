'use client';

import { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const lengthUnits = { m: 'Meters', km: 'Kilometers', cm: 'Centimeters', mm: 'Millimeters', mi: 'Miles', yd: 'Yards', ft: 'Feet', in: 'Inches' };
const weightUnits = { kg: 'Kilograms', g: 'Grams', mg: 'Milligrams', lb: 'Pounds', oz: 'Ounces' };
const tempUnits = { c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin' };

const conversionFactors = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
};

function ConverterTab({ units, conversionFn }: { units: Record<string, string>, conversionFn: (val: number, from: string, to: string) => number }) {
  const unitKeys = Object.keys(units);
  const [fromUnit, setFromUnit] = useState(unitKeys[0]);
  const [toUnit, setToUnit] = useState(unitKeys[1]);
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState(conversionFn(1, unitKeys[0], unitKeys[1]).toString());

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFromValue(val);
    if(val === '' || isNaN(parseFloat(val))) {
      setToValue('');
      return;
    }
    setToValue(conversionFn(parseFloat(val), fromUnit, toUnit).toString());
  };
  
  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setToValue(val);
    if(val === '' || isNaN(parseFloat(val))) {
      setFromValue('');
      return;
    }
    setFromValue(conversionFn(parseFloat(val), toUnit, fromUnit).toString());
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    if(fromValue === '' || isNaN(parseFloat(fromValue))) return;
    setToValue(conversionFn(parseFloat(fromValue), unit, toUnit).toString());
  }
  
  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    if(fromValue === '' || isNaN(parseFloat(fromValue))) return;
    setToValue(conversionFn(parseFloat(fromValue), fromUnit, unit).toString());
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
      <div className="space-y-2">
        <Label>From</Label>
        <Input type="number" value={fromValue} onChange={handleFromChange} />
        <UnitSelect units={units} value={fromUnit} onChange={handleFromUnitChange} />
      </div>
      <div className="space-y-2">
        <Label>To</Label>
        <Input type="number" value={toValue} onChange={handleToChange} />
        <UnitSelect units={units} value={toUnit} onChange={handleToUnitChange} />
      </div>
    </div>
  );
}

function UnitSelect({ units, value, onChange }: { units: Record<string, string>, value: string, onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select unit" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(units).map(([key, name]) => (
          <SelectItem key={key} value={key}>{name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function UnitConverter() {
  
  const convertLength = (val: number, from: string, to: string) => {
    const fromFactor = conversionFactors.length[from as keyof typeof conversionFactors.length];
    const toFactor = conversionFactors.length[to as keyof typeof conversionFactors.length];
    return val * fromFactor / toFactor;
  };
  
  const convertWeight = (val: number, from: string, to: string) => {
    const fromFactor = conversionFactors.weight[from as keyof typeof conversionFactors.weight];
    const toFactor = conversionFactors.weight[to as keyof typeof conversionFactors.weight];
    return val * fromFactor / toFactor;
  };
  
  const convertTemp = (val: number, from: string, to: string) => {
    if (from === to) return val;
    let celsius: number;
    // Convert input to Celsius
    if (from === 'f') celsius = (val - 32) * 5/9;
    else if (from === 'k') celsius = val - 273.15;
    else celsius = val;

    // Convert Celsius to output unit
    if (to === 'f') return (celsius * 9/5) + 32;
    if (to === 'k') return celsius + 273.15;
    return celsius;
  }

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
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
          <TabsContent value="length" className="mt-6">
            <ConverterTab units={lengthUnits} conversionFn={convertLength} />
          </TabsContent>
          <TabsContent value="weight" className="mt-6">
             <ConverterTab units={weightUnits} conversionFn={convertWeight} />
          </TabsContent>
          <TabsContent value="temperature" className="mt-6">
            <ConverterTab units={tempUnits} conversionFn={convertTemp} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}