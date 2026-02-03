
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label (1 per page)', dimensions: { x: 5, y: 5, width: 585, height: 410 } },
];

export default function MyntraLabelCrop() {
    return (
        <LabelCropper
            platformName="Myntra"
            croppingInstructions="Upload your Myntra shipping label PDF to crop it for 4x6 thermal printers."
            cropPresets={presets}
        />
    );
}
