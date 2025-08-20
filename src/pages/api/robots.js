// /pages/api/robots.ts

const SITE_URL = "https://www.rakaya.sa";
export default function handler(req, res) {
  const robots = `
  User-agent: *
  Disallow: 
  Sitemap: ${SITE_URL}/sitemap.xml
  `;

  res.send(robots);
}
