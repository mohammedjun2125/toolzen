/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.toolzenweb.com',
  generateRobotsTxt: true, 
  // optional
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     'https://www.toolzenweb.com/my-custom-sitemap-1.xml',
  //     'https://www.toolzenweb.com/my-custom-sitemap-2.xml',
  //     'https://www.toolzenweb.com/my-custom-sitemap-3.xml',
  //   ],
  // },
};
