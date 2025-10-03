
export async function GET() {
  const adsTxtContent = 'google.com, pub-8015189558686269, DIRECT, f08c47fec0942fa0';
  
  return new Response(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
