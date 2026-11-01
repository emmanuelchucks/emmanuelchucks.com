import { defineConfig } from "astro/config";

const tailnetHost = "devbox-01.tail455001.ts.net";

export default defineConfig({
  site: "https://emmanuelchucks.com",
  output: "static",
  // Cloudflare serves posts/x.html at /posts/x; directory output would redirect to /posts/x/.
  build: { format: "file" },
  trailingSlash: "never",
  vite: {
    server: { allowedHosts: [tailnetHost, "devbox-01"] },
    preview: { allowedHosts: [tailnetHost, "devbox-01"] },
  },
});
