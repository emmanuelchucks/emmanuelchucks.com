import pages from "@hono/vite-cloudflare-pages"
import mdx from "@mdx-js/rollup"
import rehypeShiki from "@shikijs/rehype"
import honox from "honox/vite"
import client from "honox/vite/client"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkReadingTime from "remark-reading-time"
import remarkMdxReadingTime from "remark-reading-time/mdx"
import { defineConfig } from "vite"
import { imagetools } from "vite-imagetools"

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [client()],
		}
	}

	return {
		plugins: [
			honox(),
			pages(),
			imagetools(),
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
	}
})
