
/** @type {import('next-sitemap').IConfig} */

// Dynamically import from ESM modules
const getToolsAndCategories = async () => {
    const { tools, categories } = await import('./src/lib/tools.ts');
    return { tools, categories };
};

const getBlogPosts = async () => {
    const { mockPosts } = await import('./src/lib/blog.ts');
    return mockPosts;
}

module.exports = {
  siteUrl: 'https://www.toolzenweb.com',
  generateRobotsTxt: true,
  outDir: './out',
  
  // This function now generates the full, absolute URLs for all dynamic pages
  additionalPaths: async (config) => {
    const { tools, categories } = await getToolsAndCategories();
    const posts = await getBlogPosts();
    const { siteUrl } = config;
    
    const toolPaths = tools.map(tool => ({
      loc: `${siteUrl}/tools/${tool.id}`, // Prepend siteUrl here
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));

    const categoryPaths = categories.map(category => ({
      loc: `${siteUrl}/category/${category.id}`, // Prepend siteUrl here
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
    
    const blogPaths = posts.map(post => ({
      loc: `${siteUrl}/blog/${post.slug}`, // Prepend siteUrl here
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(post.date).toISOString(),
    }));

    return [...toolPaths, ...categoryPaths, ...blogPaths];
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
       {
        userAgent: '*',
        disallow: ['/products/'],
      },
    ],
    additionalSitemaps: [
      'https://www.toolzenweb.com/sitemap.xml',
    ],
  },
};
