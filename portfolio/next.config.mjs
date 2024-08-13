/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/helper/imageLoader.ts',
  },
};

export default nextConfig;
