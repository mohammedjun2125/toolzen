
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const containerProps = {
  justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
  alignItems: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
  flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
  flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
  alignContent: ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'],
};

export default function FlexboxPlayground() {
    const [styles, setStyles] = useState({
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignContent: 'stretch',
    });
    
    const handleStyleChange = (prop: keyof typeof styles, value: string) => {
        setStyles(prev => ({ ...prev, [prop]: value }));
    };

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">CSS Flexbox Playground</CardTitle>
                <CardDescription>Experiment with Flexbox properties and see the results in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 space-y-4">
                        <h3 className="font-semibold text-lg">Container Properties</h3>
                        {Object.entries(containerProps).map(([prop, values]) => (
                            <div key={prop} className="space-y-2">
                                <Label className="capitalize">{prop.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                <Select 
                                    value={styles[prop as keyof typeof styles]} 
                                    onValueChange={(val) => handleStyleChange(prop as keyof typeof styles, val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {values.map(val => <SelectItem key={val} value={val}>{val}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}
                    </div>
                    <div className="md:w-2/3">
                        <div 
                            className="bg-muted p-4 rounded-lg min-h-[300px] flex transition-all"
                            style={styles as any}
                        >
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-primary text-primary-foreground p-4 rounded text-center w-20 h-20 flex items-center justify-center m-2">
                                    Item {i}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-background p-4 rounded-lg border">
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">{`.container {\n  display: flex;\n${Object.entries(styles).map(([k, v]) => `  ${k.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}: ${v};`).join('\n')}\n}`}</pre>
                </div>
            </CardContent>
        </Card>
    );
}
