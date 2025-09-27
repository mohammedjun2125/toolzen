
const { tools, categories } = require('./src/lib/tools.ts');
const { mockPosts } = require('./src/lib/blog.ts');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.toolzenweb.com',
  generateRobotsTxt: true,
  outDir: './out',
  
  // Exclude all paths by default and generate them manually
  exclude: ['/products*'], 

  // Manually generate all paths to ensure correctness
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },

  additionalPaths: async (config) => {
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
    
    // Using a Set to ensure all paths are unique
    const uniquePaths = [...new Set(allPaths)];

    return uniquePaths.map(path => ({
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
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
