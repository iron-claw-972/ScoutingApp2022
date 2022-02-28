const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://backend:8000/:path*/'
      }
    ]
  },
  experimental: {
    styledComponents: true
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.ENV === 'dev',
  },
})
