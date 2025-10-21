/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['eng-ae', 'fra-fr', 'deu-de'], // use real language-region codes
    defaultLocale: 'eng-ae',
    localeDetection: true, // detects browser language
  },
};

export default nextConfig;
