
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.toolzenweb.com/sitemap.xml
    `.trim();

    return new NextResponse(robotsTxt, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
            'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
        },
    });
}
