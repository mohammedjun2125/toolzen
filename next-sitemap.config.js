/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.toolzenweb.com',
  generateRobotsTxt: true,
  outDir: './out',
  trailingSlash: true,
  exclude: ['/products*'],
};
