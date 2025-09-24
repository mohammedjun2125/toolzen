
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export default function BorderRadiusGenerator() {
    const [topLeft, setTopLeft] = useState(30);
    const [topRight, setTopRight] = useState(30);
    const [bottomRight, setBottomRight] = useState(30);
    const [bottomLeft, setBottomLeft] = useState(30);
    const [allCorners, setAllCorners] = useState(30);
    const [isLinked, setIsLinked] = useState(true);
    const { toast } = useToast();

    const handleAllCornersChange = (value: number) => {
        const val = Math.max(0, value);
        setAllCorners(val);
        setTopLeft(val);
        setTopRight(val);
        setBottomLeft(val);
        setBottomRight(val);
    };
    
    const borderRadiusStyle = isLinked 
        ? `${allCorners}px` 
        : `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

    const cssToCopy = `border-radius: ${borderRadiusStyle};`;

    const handleCopy = () => {
        navigator.clipboard.writeText(cssToCopy);
        toast({ title: 'CSS copied to clipboard!' });
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">CSS Border Radius Generator</CardTitle>
                <CardDescription>Visually create custom border radii for your elements and copy the CSS.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-center p-8">
                    <div 
                        className="w-48 h-48 bg-primary flex items-center justify-center transition-all"
                        style={{ borderRadius: borderRadiusStyle }}
                    >
                        <span className="text-primary-foreground font-medium">Preview</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <Label>Adjust Corners</Label>
                       <div className="flex items-center space-x-2">
                           <Label htmlFor="link-corners">Link All</Label>
                           <Switch id="link-corners" checked={isLinked} onCheckedChange={setIsLinked} />
                       </div>
                    </div>
                    {isLinked ? (
                        <div className="space-y-2">
                           <Label htmlFor="all-corners">All Corners (px)</Label>
                           <Input 
                                id="all-corners" 
                                type="number" 
                                value={allCorners} 
                                onChange={(e) => handleAllCornersChange(Number(e.target.value))} 
                           />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="top-left">Top Left</Label>
                                <Input id="top-left" type="number" value={topLeft} onChange={e => setTopLeft(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="top-right">Top Right</Label>
                                <Input id="top-right" type="number" value={topRight} onChange={e => setTopRight(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bottom-left">Bottom Left</Label>
                                <Input id="bottom-left" type="number" value={bottomLeft} onChange={e => setBottomLeft(Number(e.target.value))} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="bottom-right">Bottom Right</Label>
                                <Input id="bottom-right" type="number" value={bottomRight} onChange={e => setBottomRight(Number(e.target.value))} />
                            </div>
                        </div>
                    )}
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
