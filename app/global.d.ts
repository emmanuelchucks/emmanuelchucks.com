/// <reference types="@cloudflare/workers-types" />
/// <reference types="vite/client" />
/// <reference types="node" />

import "hono"

type Head = {
	title?: string
	meta?: { name: string; content: string }[]
}

declare module "hono" {
	interface Env {
		Variables: {}
		Bindings: {}
	}
	interface ContextRenderer {
		(
			content: string | Promise<string>,
			head?: Head,
		): Response | Promise<Response>
	}
}
