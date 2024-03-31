/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/ban-types, @typescript-eslint/prefer-function-type */
import "hono"

type Head = {
	title: string
	description: string
}

declare module "hono" {
	interface Env {
		Variables: {}
		Bindings: {
			VIEWS_COUNTER: KVNamespace
		}
	}
	interface ContextRenderer {
		(
			content: string | Promise<string>,
			head?: Head,
		): Response | Promise<Response>
	}
}
