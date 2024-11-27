import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
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
		build(),
		imagetools(),
		tsconfigPaths(),
		tailwindcss(),
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
