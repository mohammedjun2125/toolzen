
'use client';

import LabelCropper from './shared/label-cropper';

// A4: 595x842 pts.
const presets = [
    { name: 'Standard Label (1 per page)', dimensions: { x: 1, y: 1, width: 594, height: 420 } },
    { name: 'Two Labels per Page - Top', dimensions: { x: 1, y: 1, width: 594, height: 420 } },
    { name: 'Two Labels per Page - Bottom', dimensions: { x: 1, y: 421, width: 594, height: 420 } },
];

export default function FlipkartLabelCrop() {
    return (
        <LabelCropper
            platformName="Flipkart"
            croppingInstructions="Upload your Flipkart shipping label PDF. Choose the format that matches your label sheet."
            cropPresets={presets}
        />
    );
}
