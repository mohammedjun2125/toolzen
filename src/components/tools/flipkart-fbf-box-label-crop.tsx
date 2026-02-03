
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
     { name: 'Standard FBF Box Label', dimensions: { x: 10, y: 10, width: 420, height: 288 } },
];

export default function FlipkartFbfBoxLabelCrop() {
    return (
        <LabelCropper
            platformName="Flipkart FBF Box"
            croppingInstructions="Upload your Flipkart Fulfilled by Flipkart (FBF) box label PDF to crop it for printing."
            cropPresets={presets}
        />
    );
}
