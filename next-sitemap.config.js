
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.toolzenweb.com',
  generateRobotsTxt: true,
  outDir: './out',
  // Exclude any paths that are not meant to be in the sitemap.
  exclude: ['/products', '/products/*'],
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
