import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'utfs.io',
        port:''
      }
    ]
  }
};

export default nextConfig;
