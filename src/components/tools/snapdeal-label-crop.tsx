
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label (1 per page)', dimensions: { x: 1, y: 1, width: 594, height: 420 } },
];

export default function SnapdealLabelCrop() {
    return (
        <LabelCropper
            platformName="Snapdeal"
            croppingInstructions="Upload your Snapdeal shipping label PDF to quickly crop it for printing."
            cropPresets={presets}
        />
    );
}
