import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "scontent-fra5-2.xx.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent-lhr8-2.xx.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent-lhr6-1.xx.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent-lhr8-1.xx.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent-lhr6-2.xx.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/bac-francais-etranger",
        destination: "/autres-pays",
        permanent: true,
      },
      {
        source: "/bac-francais-tunisie",
        destination: "/tunisie",
        permanent: true,
      },
      {
        source: "/preparation-bac-francais-en-ligne",
        destination: "/en-ligne",
        permanent: true,
      },
      {
        source: "/inscription-bac-francais-candidat-libre",
        destination: "/inscription-candidat-libre",
        permanent: true,
      },
      {
        source: "/bac-francais-candidat-libre",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
