module.exports = {
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
}
