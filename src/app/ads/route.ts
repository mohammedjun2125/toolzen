
import { NextResponse } from 'next/server';

export async function GET() {
  const adsTxtContent = 'google.com, pub-8015189558686269, DIRECT, f08c47fec0942fa0';
  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
