
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label (1 per page)', dimensions: { x: 5, y: 5, width: 585, height: 832 } },
];

export default function JiomartLabelCrop() {
    return (
        <LabelCropper
            platformName="Jiomart"
            croppingInstructions="Upload your Jiomart seller portal PDF to crop the shipping label."
            cropPresets={presets}
        />
    );
}
