
'use client';

import LabelCropper from './shared/label-cropper';

// FBA labels are often 4x6 on an A4 sheet
const presets = [
    { name: 'Standard FBA Box Label', dimensions: { x: 10, y: 10, width: 420, height: 288 } },
];

export default function AmazonFbaBoxLabelCrop() {
    return (
        <LabelCropper
            platformName="Amazon FBA Box"
            croppingInstructions="Upload your FBA shipment PDF to crop the box labels for your thermal printer."
            cropPresets={presets}
        />
    );
}
