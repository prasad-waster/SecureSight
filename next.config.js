/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ["@prisma/client"],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },
};

module.exports = nextConfig;
