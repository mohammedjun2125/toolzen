
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
  exclude: ['/products/*'], // Exclude any static pages that might exist
  
  // This function now generates the full, absolute URLs for all dynamic pages
  additionalPaths: async (config) => {
    const { tools, categories } = await getToolsAndCategories();
    const posts = await getBlogPosts();
    
    const toolPaths = tools.map(tool => ({
      loc: `/tools/${tool.id}`,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }));

    const categoryPaths = categories.map(category => ({
      loc: `/category/${category.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
    
    const blogPaths = posts.map(post => ({
      loc: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(post.date).toISOString(),
    }));

    // This ensures only the correct paths are returned
    return [...toolPaths, ...categoryPaths, ...blogPaths];
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://www.toolzenweb.com/sitemap.xml',
    ],
  },
};
