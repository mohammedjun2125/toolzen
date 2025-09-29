
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { seoKeywords } from '@/lib/seo-keywords';

const animations = {
  'fade-in': { name: 'Fade In', keyframes: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }' },
  'slide-in-left': { name: 'Slide In From Left', keyframes: '@keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }' },
  'slide-in-right': { name: 'Slide In From Right', keyframes: '@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }' },
  'bounce': { name: 'Bounce', keyframes: '@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-30px); } 60% { transform: translateY(-15px); } }' },
  'pulse': { name: 'Pulse', keyframes: '@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }' },
};

const easings = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];

export default function AnimationGenerator() {
    const [animationName, setAnimationName] = useState('fade-in');
    const [duration, setDuration] = useState(1);
    const [delay, setDelay] = useState(0);
    const [iteration, setIteration] = useState('1');
    const [easing, setEasing] = useState('ease');
    const [key, setKey] = useState(0);
    const { toast } = useToast();

    const toolKeywords = (seoKeywords.tools as any)['animation-generator'];

    const selectedAnimation = animations[animationName as keyof typeof animations];

    const animationStyle = {
        animationName: animationName,
        animationDuration: `${duration}s`,
        animationTimingFunction: easing,
        animationDelay: `${delay}s`,
        animationIterationCount: iteration === 'infinite' ? 'infinite' : Number(iteration),
    };

    const cssToCopy = `
${selectedAnimation.keyframes}

.animated-element {
  animation-name: ${animationName};
  animation-duration: ${duration}s;
  animation-timing-function: ${easing};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iteration};
  animation-fill-mode: both; /* Ensures element stays at the end state */
}
    `.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(cssToCopy);
        toast({ title: 'CSS copied to clipboard!' });
    };

    const triggerAnimation = () => {
        setKey(prev => prev + 1); // Remounts the preview element to replay animation
    };

    return (
        <>
        <Card className="w-full shadow-lg rounded-lg bg-card/60 backdrop-blur-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{toolKeywords.title_keywords.join(' - ')}</CardTitle>
                <CardDescription>Visually **{toolKeywords.meta_keywords.join(', ')}**. This **free CSS animation generator online** helps you design and copy the code instantly.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex items-center justify-center p-8 bg-muted rounded-lg h-64">
                    <style>{selectedAnimation.keyframes}</style>
                    <div 
                        key={key}
                        className="w-24 h-24 bg-primary rounded-lg flex items-center justify-center"
                        style={animationStyle}
                    >
                        <span className="text-primary-foreground font-medium text-center" alt="Preview of CSS animation">Animate Me</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button onClick={triggerAnimation} size="sm" className="w-full">
                        <Play className="mr-2 h-4 w-4" /> Replay Animation
                    </Button>
                    <div className="space-y-2">
                        <Label>Animation Type</Label>
                        <Select value={animationName} onValueChange={setAnimationName}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.entries(animations).map(([key, {name}]) => (
                                    <SelectItem key={key} value={key}>{name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <ControlSlider label="Duration (s)" value={duration} setValue={setDuration} min={0.1} max={5} step={0.1} />
                    <ControlSlider label="Delay (s)" value={delay} setValue={setDelay} min={0} max={5} step={0.1} />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label>Iteration Count</Label>
                           <Input value={iteration} onChange={e => setIteration(e.target.value)} placeholder="e.g., 1 or infinite" />
                        </div>
                         <div className="space-y-2">
                           <Label>Easing</Label>
                           <Select value={easing} onValueChange={setEasing}>
                             <SelectTrigger><SelectValue /></SelectTrigger>
                             <SelectContent>
                               {easings.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                             </SelectContent>
                           </Select>
                        </div>
                    </div>
                    
                </div>
                <div className="md:col-span-2 space-y-2">
                    <Label>Generated CSS</Label>
                    <div className="relative bg-background rounded-lg p-4 border mt-2">
                        <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">{cssToCopy}</pre>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
        <article className="prose dark:prose-invert max-w-none mx-auto mt-12">
            <h2 className="text-2xl font-bold">Why Use a CSS Animation Generator?</h2>
            <p>CSS animations bring websites to life, but writing keyframes from scratch can be complex and time-consuming. A **free CSS animation generator online** makes this process visual and intuitive. Instead of tweaking values in a stylesheet and refreshing your browser, you can adjust sliders and see the results instantly. This **CSS animation** tool is perfect for both beginners learning about **keyframe animations for websites** and experienced developers who want to prototype quickly.</p>
            
            <h3>How to Create a CSS Animation</h3>
            <ol>
                <li>**Choose an Animation Type:** Select a base animation like "Fade In" or "Slide In" to get started.</li>
                <li>**Customize Properties:** Use the sliders to adjust the duration, delay, and other parameters to fit your design.</li>
                <li>**Preview in Real-Time:** Watch your animation play out in the preview window. Click "Replay" to see it again.</li>
                <li>**Copy the Code:** Once you're happy with the result, copy the generated `@keyframes` and CSS class to your project.</li>
            </ol>

            <div className="not-prose mt-8">
                <h3 className="text-xl font-semibold">Explore More CSS Tools</h3>
                <div className="flex gap-2 flex-wrap">
                    <Button asChild variant="outline"><Link href="/tools/gradient-generator">CSS Gradient Generator</Link></Button>
                    <Button asChild variant="outline"><Link href="/tools/box-shadow-generator">CSS Box Shadow Generator</Link></Button>
                </div>
            </div>
        </article>
        </>
    );
}

function ControlSlider({ label, value, setValue, min, max, step = 1 }: { label: string, value: number, setValue: (val: number) => void, min: number, max: number, step?: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label>{label}</Label>
                <span className="text-sm font-mono bg-muted px-2 py-1 rounded-md">{value.toFixed(1)}</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => setValue(v[0])} min={min} max={max} step={step} />
        </div>
    );
}
