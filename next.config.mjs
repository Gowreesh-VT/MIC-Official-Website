import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'h8z6stjynz.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'cdn.phototourl.com',
      },
    ],
  },
};

export default nextConfig;
