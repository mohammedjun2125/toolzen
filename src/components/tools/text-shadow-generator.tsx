
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';

export default function TextShadowGenerator() {
    const [hOffset, setHOffset] = useState(4);
    const [vOffset, setVOffset] = useState(4);
    const [blur, setBlur] = useState(6);
    const [color, setColor] = useState('#000000');
    const [opacity, setOpacity] = useState(0.5);
    const { toast } = useToast();

    const hexToRgb = (hex: string) => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    
    const rgb = hexToRgb(color);
    const rgbaColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;

    const textShadowStyle = `${hOffset}px ${vOffset}px ${blur}px ${rgbaColor}`;
    const cssToCopy = `text-shadow: ${textShadowStyle};`;
    
    const handleCopy = () => {
        navigator.clipboard.writeText(cssToCopy);
        toast({ title: 'CSS copied to clipboard!' });
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">CSS Text Shadow Generator</CardTitle>
                <CardDescription>Visually design text shadow effects and copy the CSS code.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex items-center justify-center p-8 bg-muted rounded-lg h-48">
                    <h2 
                        className="text-5xl font-bold text-card-foreground transition-all"
                        style={{ textShadow: textShadowStyle }}
                    >
                        Preview
                    </h2>
                </div>

                <div className="space-y-4">
                    <ControlSlider label="Horizontal Offset" value={hOffset} setValue={setHOffset} min={-20} max={20} />
                    <ControlSlider label="Vertical Offset" value={vOffset} setValue={setVOffset} min={-20} max={20} />
                    <ControlSlider label="Blur Radius" value={blur} setValue={setBlur} min={0} max={40} />
                    <ControlSlider label="Opacity" value={opacity} setValue={setOpacity} min={0} max={1} step={0.01} />
                    
                    <div className="flex items-center justify-between">
                        <Label>Shadow Color</Label>
                        <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 h-10 p-1" />
                    </div>
                </div>
                <div className="md:col-span-2 relative bg-background rounded-lg p-4 border mt-4">
                    <pre className="text-sm font-mono overflow-x-auto">{cssToCopy}</pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function ControlSlider({ label, value, setValue, min, max, step = 1 }: { label: string, value: number, setValue: (val: number) => void, min: number, max: number, step?: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label>{label}</Label>
                <span className="text-sm font-mono bg-muted px-2 py-1 rounded-md">{value}{label.toLowerCase().includes('opacity') ? '' : 'px'}</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => setValue(v[0])} min={min} max={max} step={step} />
        </div>
    );
}
