
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label', dimensions: { x: 10, y: 10, width: 575, height: 400 } },
];

export default function LimeroadLabelCrop() {
    return (
        <LabelCropper
            platformName="Limeroad"
            croppingInstructions="Upload your Limeroad shipping label PDF to crop it for your printer."
            cropPresets={presets}
        />
    );
}
