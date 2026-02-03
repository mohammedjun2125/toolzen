
'use client';

import LabelCropper from './shared/label-cropper';

// A4: 595x842 pts. 4x6 inch label is approx 288x432 pts.
const presets = [
    { name: 'A4 - Full Page Label', dimensions: { x: 0, y: 0, width: 595, height: 842 } },
    { name: 'A4 - Top Half (Landscape)', dimensions: { x: 0, y: 0, width: 842, height: 297 } },
    { name: 'A4 - 4x6 on A4 (Center)', dimensions: { x: 153, y: 205, width: 288, height: 432 } },
    { name: '4x6 Label - Full Area', dimensions: { x: 0, y: 0, width: 288, height: 432 } },
];

export default function OtherLabelCrop() {
    return (
        <LabelCropper
            platformName="Generic"
            croppingInstructions="A generic tool for cropping shipping labels from any platform. Select the format that best fits your PDF."
            cropPresets={presets}
        />
    );
}
