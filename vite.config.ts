import pages from "@hono/vite-cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import honox from "honox/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkReadingTime from "remark-reading-time";
import remarkMdxReadingTime from "remark-reading-time/mdx";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		pages(),
		imagetools(),
		tsconfigPaths(),
		honox({
			devServer: {
				adapter,
			},
			client: {
				input: ["app/style.css"],
			},
		}),
		mdx({
			jsxImportSource: "hono/jsx",
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
	build: {
		assetsDir: "static",
		ssrEmitAssets: true,
	},
});
