
import { tools, categories } from '@/lib/tools';
import { mockPosts } from '@/lib/blog';

const URL = 'https://www.toolzenweb.com';

function generateSitemap() {
  const staticPaths = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/disclaimer',
    '/privacy',
    '/terms',
  ];

  const toolPaths = tools.map(tool => tool.href);
  const categoryPaths = categories.map(category => `/category/${category.id}`);
  const blogPostPaths = mockPosts.map(post => `/blog/${post.slug}`);

  const allPaths = [...staticPaths, ...toolPaths, ...categoryPaths, ...blogPostPaths];
  const uniquePaths = [...new Set(allPaths)];
  const lastModified = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${uniquePaths
       .map((path) => {
         return `
           <url>
               <loc>${`${URL}${path}`}</loc>
               <lastmod>${lastModified}</lastmod>
               <changefreq>daily</changefreq>
               <priority>0.7</priority>
           </url>
         `;
       })
       .join('')}
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
