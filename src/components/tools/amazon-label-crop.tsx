
'use client';

import LabelCropper from './shared/label-cropper';

// A4: 595x842 pts. Amazon often puts the label on one half.
const presets = [
    { name: 'Easy Ship - Left Half', dimensions: { x: 1, y: 1, width: 420, height: 594 } },
    { name: 'Easy Ship - Right Half', dimensions: { x: 421, y: 1, width: 420, height: 594 } },
    { name: 'Self-Ship - Full A4', dimensions: { x: 0, y: 0, width: 595, height: 842 } },
];

export default function AmazonLabelCrop() {
    return (
        <LabelCropper
            platformName="Amazon"
            croppingInstructions="Upload your Amazon shipping label PDF (e.g., Easy Ship). Select the correct format to crop."
            cropPresets={presets}
        />
    );
}
