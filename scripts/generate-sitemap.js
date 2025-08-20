const fs = require("fs");
const { create } = require("xmlbuilder2");

const urls = [
  { loc: "https://www.rakaya.sa/", lastmod: "2024-03-04", priority: 1.0 },
  { loc: "https://www.rakaya.sa/rakaya", lastmod: "2024-03-04", priority: 0.8 },
  {
    loc: "https://www.rakaya.sa/rakaya/our-pillars",
    lastmod: "2024-03-04",
    priority: 0.7,
  },
  {
    loc: "https://www.rakaya.sa/rakaya/Our-work",
    lastmod: "2024-03-04",
    priority: 0.6,
  },
  {
    loc: "https://www.rakaya.sa/rakaya/our-services",
    lastmod: "2024-03-04",
    priority: 0.5,
  },
  {
    loc: "https://www.rakaya.sa/rakaya/our-products",
    lastmod: "2024-03-04",
    priority: 0.4,
  },
  {
    loc: "https://www.rakaya.sa/rakaya/feedbacks",
    lastmod: "2024-03-04",
    priority: 0.4,
  },
  {
    loc: "https://www.rakaya.sa/rakaya/applications",
    lastmod: "2024-03-04",
    priority: 0.4,
  },
  {
    loc: "https://www.rakaya.sa/rakaya/sessions",
    lastmod: "2024-03-04",
    priority: 0.4,
  },
  {
    loc: "https://www.rakaya.sa/rakaya-studio",
    lastmod: "2024-03-04",
    priority: 0.3,
  },
  { loc: "https://www.rakaya.sa/jobs", lastmod: "2024-03-04", priority: 0.4 },
  {
    loc: "https://www.rakaya.sa/our-way",
    lastmod: "2024-03-04",
    priority: 0.2,
  },
  {
    loc: "https://www.rakaya.sa/contact-us",
    lastmod: "2024-03-04",
    priority: 0.1,
  },
];

const root = create({ version: "1.0", encoding: "UTF-8" }).ele("urlset", {
  xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
});

urls.forEach(({ loc, lastmod, priority }) => {
  const urlElement = root.ele("url");
  urlElement.ele("loc").txt(loc);
  urlElement.ele("lastmod").txt(lastmod);
  urlElement.ele("priority").txt(priority);
});

const xml = root.end({ prettyPrint: true });

fs.writeFileSync("public/sitemap.xml", xml);
