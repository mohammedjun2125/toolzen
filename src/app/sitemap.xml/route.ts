
import { tools, categories } from '@/lib/tools';
import { mockPosts } from '@/lib/blog';

const URL = 'https://www.toolzenweb.com';

export const runtime = 'edge';

function generateSitemap() {
  const lastModified = new Date().toISOString();

  // Core static pages
  const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/about', priority: 0.8 },
    { url: '/blog', priority: 0.8 },
    { url: '/contact', priority: 0.8 },
    { url: '/disclaimer', priority: 0.8 },
    { url: '/privacy', priority: 0.8 },
    { url: '/terms', priority: 0.8 },
  ];

  const sitemapEntries = staticPages.map(page => `
    <url>
        <loc>${`${URL}${page.url}`}</loc>
        <lastmod>${lastModified}</lastmod>
        <priority>${page.priority.toFixed(2)}</priority>
    </url>
  `).join('');

  // Tool pages
  const toolEntries = tools.map(tool => `
    <url>
        <loc>${`${URL}${tool.href}`}</loc>
        <lastmod>${lastModified}</lastmod>
        <priority>0.80</priority>
    </url>
  `).join('');

  // Category pages
  const categoryEntries = categories.map(category => `
    <url>
        <loc>${`${URL}/category/${category.id}`}</loc>
        <lastmod>${lastModified}</lastmod>
        <priority>0.64</priority>
    </url>
  `).join('');
  
  // Blog post pages
  const blogEntries = mockPosts.map(post => `
    <url>
        <loc>${`${URL}/blog/${post.slug}`}</loc>
        <lastmod>${lastModified}</lastmod>
        <priority>0.64</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${sitemapEntries}
     ${toolEntries}
     ${categoryEntries}
     ${blogEntries}
   </urlset>
  `;
}

export async function GET() {
    const body = generateSitemap();
    return new Response(body, {
        status: 200,
        headers: {
            'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
            'content-type': 'application/xml',
        },
    });
}
