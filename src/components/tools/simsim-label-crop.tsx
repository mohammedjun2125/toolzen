
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label', dimensions: { x: 10, y: 10, width: 400, height: 580 } },
];

export default function SimsimLabelCrop() {
    return (
        <LabelCropper
            platformName="SIMSIM"
            croppingInstructions="Process your SIMSIM video commerce shipping labels by uploading the PDF here."
            cropPresets={presets}
        />
    );
}
