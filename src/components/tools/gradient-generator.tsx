
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function GradientGenerator() {
    const [color1, setColor1] = useState('#8a2be2');
    const [color2, setColor2] = useState('#00ced1');
    const [angle, setAngle] = useState(90);
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
    const { toast } = useToast();

    const gradientStyle = gradientType === 'linear' 
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle, ${color1}, ${color2})`;
        
    const cssToCopy = `background: ${gradientStyle};`;

    const handleCopy = () => {
        navigator.clipboard.writeText(cssToCopy);
        toast({ title: 'CSS copied to clipboard!' });
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">CSS Gradient Generator</CardTitle>
                <CardDescription>Create beautiful CSS gradients visually and copy the code.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div
                    className="w-full h-64 rounded-lg flex items-center justify-center"
                    style={{ background: gradientStyle }}
                >
                    <span className="text-white font-bold text-2xl" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>Preview</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label>Gradient Type</Label>
                        <Select value={gradientType} onValueChange={(v) => setGradientType(v as any)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="linear">Linear</SelectItem>
                                <SelectItem value="radial">Radial</SelectItem>
                            </SelectContent>
                        </Select>

                         {gradientType === 'linear' && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label>Angle</Label>
                                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded-md">{angle}°</span>
                                </div>
                                <Slider value={[angle]} onValueChange={(v) => setAngle(v[0])} min={0} max={360} />
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        <Label>Colors</Label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 h-12 p-1" />
                                <span className="font-mono text-sm">{color1}</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <Input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 h-12 p-1" />
                                <span className="font-mono text-sm">{color2}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative bg-muted/50 rounded-lg p-4">
                    <pre className="text-sm font-mono overflow-x-auto">{cssToCopy}</pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
