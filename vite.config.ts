import { defineConfig } from "@solidjs/start/config"

export default defineConfig({
	start: {
		server: {
			preset: "cloudflare-module",
			rollupConfig: {
				external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
			},
		},
	},
})
