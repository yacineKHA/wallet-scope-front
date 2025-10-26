import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL ?? "http://localhost:3005"}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.moralis.io", // URL de logo de crypto
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.moralis.io", // URL de logo de crypto
        port: "",
        pathname: "/**",
      }
    ],
  }
};

export default nextConfig;
