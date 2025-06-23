import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { redwood } from "rwsdk/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    redwood(),
    tailwindcss(),
    contentCollections(),
    cloudflare({
      viteEnvironment: {
        name: "worker",
      },
    }),
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            themes: {
              light: "github-light",
              dark: "github-dark",
            },
          },
        ],
      ],
    }),
  ],
});
