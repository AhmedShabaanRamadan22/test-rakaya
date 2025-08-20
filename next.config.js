/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  //...
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    defaultLocale: "en", // Set your default locale
    locales: ["en", "ar"], // Add other supported languages here
  },
  output: "standalone", // Use standalone output for better performance
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      // You can add more rewrite rules here
    ];
  },
};

module.exports = withPWA(nextConfig);
