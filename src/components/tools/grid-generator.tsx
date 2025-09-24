
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

export default function GridGenerator() {
    const [columns, setColumns] = useState(4);
    const [rows, setRows] = useState(2);
    const [colGap, setColGap] = useState(16);
    const [rowGap, setRowGap] = useState(16);
    const { toast } = useToast();

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        columnGap: `${colGap}px`,
        rowGap: `${rowGap}px`,
    };

    const cssToCopy = `
.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${rowGap}px ${colGap}px;
}
    `.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(cssToCopy);
        toast({ title: 'CSS copied to clipboard!' });
    };
    
    const totalItems = columns * rows;

    return (
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">CSS Grid Generator</CardTitle>
                <CardDescription>Visually create CSS Grid layouts and copy the generated code.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                        <div 
                            className="bg-muted p-4 rounded-lg min-h-[300px]"
                            style={gridStyle as any}
                        >
                            {Array.from({ length: totalItems }).map((_, i) => (
                                <div key={i} className="bg-primary text-primary-foreground p-4 rounded text-center flex items-center justify-center">
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/3 space-y-6">
                        <ControlSlider label="Columns" value={columns} setValue={setColumns} min={1} max={12} />
                        <ControlSlider label="Rows" value={rows} setValue={setRows} min={1} max={12} />
                        <ControlSlider label="Column Gap (px)" value={colGap} setValue={setColGap} min={0} max={50} />
                        <ControlSlider label="Row Gap (px)" value={rowGap} setValue={setRowGap} min={0} max={50} />
                    </div>
                </div>
                 <div className="mt-6 relative bg-background rounded-lg p-4 border">
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">{cssToCopy}</pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function ControlSlider({ label, value, setValue, min, max }: { label: string, value: number, setValue: (val: number) => void, min: number, max: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label>{label}</Label>
                <Input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="w-20 h-8" />
            </div>
            <Slider value={[value]} onValueChange={(v) => setValue(v[0])} min={min} max={max} />
        </div>
    );
}
