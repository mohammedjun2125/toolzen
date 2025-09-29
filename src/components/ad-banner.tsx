
'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

export function AdBanner() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="w-full text-center my-4">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-8015189558686269"
                data-ad-slot="7621555552"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
}
