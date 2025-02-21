/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "resend.com",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    return config;
  },
  headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://diegogtz.dev',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
