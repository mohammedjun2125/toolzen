'use client';

import { useState, ChangeEvent, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/button';

const lengthUnits = { m: 'Meters', km: 'Kilometers', cm: 'Centimeters', mm: 'Millimeters', mi: 'Miles', yd: 'Yards', ft: 'Feet', in: 'Inches' };
const weightUnits = { kg: 'Kilograms', g: 'Grams', mg: 'Milligrams', lb: 'Pounds', oz: 'Ounces', t: 'Tonnes' };
const tempUnits = { c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin' };
const areaUnits = { sqm: 'Square Meters', sqkm: 'Square Kilometers', sqmi: 'Square Miles', sqft: 'Square Feet', acre: 'Acres' };
const volumeUnits = { l: 'Liters', ml: 'Milliliters', gal: 'Gallons (US)', m3: 'Cubic Meters' };

const conversionFactors = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495, t: 1000 },
  area: { sqm: 1, sqkm: 1e6, sqmi: 2.59e6, sqft: 0.092903, acre: 4046.86 },
  volume: { l: 1, ml: 0.001, gal: 3.78541, m3: 1000 },
};

function formatNumber(num: number) {
    if (Math.abs(num) < 1e-6 && num !== 0) return num.toExponential(4);
    if (Math.abs(num) > 1e6) return num.toExponential(4);
    return parseFloat(num.toFixed(6)).toString();
}

function ConverterTab({ title, units, conversionFn }: { title: string, units: Record<string, string>, conversionFn: (val: number, from: string, to: string) => number }) {
  const unitKeys = Object.keys(units);
  const [fromUnit, setFromUnit] = useState(unitKeys[0]);
  const [toUnit, setToUnit] = useState(unitKeys[1]);
  const [fromValue, setFromValue] = useState('1');

  const toValue = useMemo(() => {
    const val = parseFloat(fromValue);
    if (isNaN(val)) return '';
    return formatNumber(conversionFn(val, fromUnit, toUnit));
  }, [fromValue, fromUnit, toUnit, conversionFn]);

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };
  
  const swapUnits = () => {
    setFromValue(toValue);
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
  }

  return (
    <div className="space-y-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2 md:col-span-2">
                <Label>From</Label>
                <Input type="number" value={fromValue} onChange={handleFromChange} />
                <UnitSelect units={units} value={fromUnit} onChange={setFromUnit} />
            </div>
            
            <div className="flex items-center justify-center">
                 <Button variant="ghost" size="icon" onClick={swapUnits}>
                    <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                </Button>
            </div>

            <div className="space-y-2 md:col-span-2">
                <Label>To</Label>
                <Input type="number" value={toValue} readOnly />
                <UnitSelect units={units} value={toUnit} onChange={setToUnit} />
            </div>
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
  
  const convertByFactor = (val: number, from: string, to: string, factors: Record<string, number>) => {
    const fromFactor = factors[from as keyof typeof factors];
    const toFactor = factors[to as keyof typeof factors];
    return val * fromFactor / toFactor;
  };
  
  const convertTemp = (val: number, from: string, to: string) => {
    if (from === to) return val;
    let celsius: number;
    if (from === 'f') celsius = (val - 32) * 5/9;
    else if (from === 'k') celsius = val - 273.15;
    else celsius = val;

    if (to === 'f') return (celsius * 9/5) + 32;
    if (to === 'k') return celsius + 273.15;
    return celsius;
  }

  const tabs = [
      { id: 'length', title: 'Length', units: lengthUnits, fn: (v,f,t) => convertByFactor(v, f, t, conversionFactors.length) },
      { id: 'weight', title: 'Weight', units: weightUnits, fn: (v,f,t) => convertByFactor(v, f, t, conversionFactors.weight) },
      { id: 'temperature', title: 'Temperature', units: tempUnits, fn: convertTemp },
      { id: 'area', title: 'Area', units: areaUnits, fn: (v,f,t) => convertByFactor(v, f, t, conversionFactors.area) },
      { id: 'volume', title: 'Volume', units: volumeUnits, fn: (v,f,t) => convertByFactor(v, f, t, conversionFactors.volume) },
  ]

  return (
    <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Unit Converter</CardTitle>
        <CardDescription>Real-time conversion for length, weight, temperature, and more.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="length" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
            {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id}>{tab.title}</TabsTrigger>)}
          </TabsList>
          {tabs.map(tab => (
             <TabsContent key={tab.id} value={tab.id} className="mt-6">
                <ConverterTab title={tab.title} units={tab.units} conversionFn={tab.fn} />
            </TabsContent>
          ))}
        </Tabs>

        <div className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">Your All-in-One Conversion Hub</h2>
            <p>In a world of different measurement systems, a reliable unit converter is an indispensable tool. Whether you're a student working on a science project, a chef following a recipe from another country, a traveler planning a trip, or an engineer working with international specifications, our Unit Converter is designed to provide fast, accurate, and easy-to-understand conversions across a wide range of categories.</p>
            <h3>Why Use a Digital Unit Converter?</h3>
            <ul>
                <li><strong>Accuracy:</strong> Manual conversions are prone to errors. Our tool uses precise, standardized conversion factors to ensure your results are always correct.</li>
                <li><strong>Speed:</strong> Get instant answers without having to remember formulas or perform complex calculations. The real-time updates save you valuable time.</li>
                <li><strong>Convenience:</strong> Access a comprehensive set of conversions—from length and weight to temperature and volume—all in one place. No need to search for separate calculators for each unit type.</li>
                <li><strong>Privacy-Focused:</strong> All calculations are performed directly in your browser. Your data is never sent to our servers, making it a completely private and secure experience.</li>
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
