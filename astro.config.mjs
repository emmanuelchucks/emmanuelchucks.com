import { defineConfig, sharpImageService } from "astro/config";

const tailnetHost = "devbox-01.tail455001.ts.net";

export default defineConfig({
  site: "https://emmanuelchucks.com",
  output: "static",
  // Cloudflare serves posts/x.html at /posts/x; directory output would redirect to /posts/x/.
  build: { format: "file" },
  trailingSlash: "never",
  // Screens are mostly small text on flat colour: WebP's default halves colour detail, which smears it.
  // AVIF at effort 2 encodes in about a second (5 s at the default 4) for 12% more bytes; the dev server
  // encodes on every request, so the default left phone screens blank for seconds.
  image: { service: sharpImageService({ webp: { smartSubsample: true }, avif: { effort: 2 } }) },
  vite: {
    server: { allowedHosts: [tailnetHost, "devbox-01"] },
    preview: { allowedHosts: [tailnetHost, "devbox-01"] },
  },
});
