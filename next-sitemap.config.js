
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.toolzenweb.com',
  generateRobotsTxt: true,
  outDir: './out',
  // Exclude any paths that are not meant to be in the sitemap.
  // This is a failsafe, but the primary mechanism will be the build process.
  exclude: ['/products/*', '/products'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      // You can add more specific rules here if needed in the future
      // For example, to disallow crawling of a specific directory:
      // { userAgent: '*', disallow: '/private/' },
    ],
    additionalSitemaps: [
      'https://www.toolzenweb.com/sitemap.xml',
    ],
  },
};
