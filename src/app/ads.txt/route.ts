import { NextResponse } from 'next/server';

const adsTxtContent = `google.com, pub-8015189558686269, DIRECT, f08c47fec0942fa0`;

export async function GET() {
  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
