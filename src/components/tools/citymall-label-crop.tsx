
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label', dimensions: { x: 1, y: 1, width: 594, height: 420 } },
];

export default function CitymallLabelCrop() {
    return (
        <LabelCropper
            platformName="Citymall"
            croppingInstructions="Crop your Citymall community group buying labels. Upload the PDF to start."
            cropPresets={presets}
        />
    );
}
