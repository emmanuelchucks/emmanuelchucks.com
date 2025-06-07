import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkReadingTime from "remark-reading-time";
import remarkMdxReadingTime from "remark-reading-time/mdx";
import { redwood } from "rwsdk/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    redwood(),
    tailwindcss(),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkReadingTime,
        remarkMdxReadingTime,
      ],
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
