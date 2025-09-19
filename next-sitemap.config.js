/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://toolzen.com',
  generateRobotsTxt: true, 
  // optional
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     'https://toolzen.com/my-custom-sitemap-1.xml',
  //     'https://toolzen.com/my-custom-sitemap-2.xml',
  //     'https://toolzen.com/my-custom-sitemap-3.xml',
  //   ],
  // },
};
