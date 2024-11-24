/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Uncomment this line if you want to allow all Cloudinary paths
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
