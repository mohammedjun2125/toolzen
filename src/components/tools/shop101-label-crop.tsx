
'use client';

import LabelCropper from './shared/label-cropper';

const presets = [
    { name: 'Standard Label', dimensions: { x: 1, y: 1, width: 420, height: 594 } },
];

export default function Shop101LabelCrop() {
    return (
        <LabelCropper
            platformName="Shop101"
            croppingInstructions="Easily crop your Shop101 shipping labels for reselling. Upload the PDF to get started."
            cropPresets={presets}
        />
    );
}
