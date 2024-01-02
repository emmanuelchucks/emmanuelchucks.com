import { defineConfig } from "@solidjs/start/config"
// @ts-expect-error - no types yet
import mdx from "@vinxi/plugin-mdx"
import rehypeShikiji from "rehype-shikiji"
import remarkReadingTime from "remark-reading-time"
import readingMdxTime from "remark-reading-time/mdx"

export default defineConfig({
	start: {
		extensions: ["mdx", "md"],
		server: {
			preset: "cloudflare-module",
			rollupConfig: {
				external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
			},
		},
	},
	plugins: [
		/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
		mdx.withImports({})({
			jsx: true,
			jsxImportSource: "solid-js",
			providerImportSource: "solid-mdx",
			remarkPlugins: [remarkReadingTime, readingMdxTime],
			rehypePlugins: [
				[
					rehypeShikiji,
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
})
