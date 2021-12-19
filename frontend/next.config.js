/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
    domains: [
      {
        domain: "xodius.io",
        defaultLocale: "en-US",
        locales: ["en-US"],
      },
    ],
  },
};
