
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label (from Amazon)', dimensions: { x: 1, y: 1, width: 420, height: 594 } },
];

export default function GlowroadLabelCrop() {
    return (
        <LabelCropper
            platformName="Glowroad"
            croppingInstructions="Glowroad labels are often similar to Amazon Easy Ship. Upload your PDF and select the 'Left Half' preset."
            cropPresets={presets}
        />
    );
}
