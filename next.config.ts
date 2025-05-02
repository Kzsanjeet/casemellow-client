

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // Accept any hostname
//         pathname: "/**", // Allow images from any path
//       },
//     ],
//   },
//   // Other configurations can go here
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Accept any hostname
        pathname: "/**", // Allow images from any path
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ⛔ Skip ESLint errors during builds
  },
};

export default nextConfig;




