/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.toolzenweb.com',
  generateRobotsTxt: true,
  // The default file name for the sitemap index is sitemap.xml
  // No need to specify sitemapName unless you want something different.
  // The library will automatically generate sitemap-0.xml, sitemap-1.xml, etc.
  // and reference them in the main sitemap.xml index.
};
