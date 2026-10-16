import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the supplied banner lettering sharp through the image optimizer.
  images: { qualities: [75, 90] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
