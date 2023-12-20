import pages from "@sonikjs/cloudflare-pages"
import sonik from "sonik/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [sonik(), pages()],
})
