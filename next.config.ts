import type { NextConfig } from "next";

const nextConfig = {
  images: {
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dpd52zzi6t5tf.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
