import type { NextConfig } from "next";

// When building for GitHub Pages (GITHUB_PAGES=true), emit a fully static
// export served from a subpath (https://<user>.github.io/<repo>/).
// Local `npm run dev` / `npm run build && npm start` are unaffected.
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isGitHubPages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
