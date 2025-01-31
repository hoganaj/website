/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://cdn.sanity.io;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https://res.cloudinary.com https://cdn.sanity.io https://ardslot.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://api.example.com https://*.sanity.io;
              frame-src https://*.sanity.io;
            `.replace(/\s{2,}/g, " "), // Minify policy to avoid issues
          },
        ],
      },
    ];
  },
};

export default nextConfig;
