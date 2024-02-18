import {} from "hono"

type Head = {
	title?: string
	description?: string
}

declare module "hono" {
	type Env = {
		Variables: unknown
		Bindings: unknown
	}
	/* eslint-disable-next-line @typescript-eslint/consistent-type-definitions */
	interface ContextRenderer {
		/* eslint-disable-next-line @typescript-eslint/prefer-function-type */
		(
			content: string | Promise<string>,
			props: Head,
		): Response | Promise<Response>
	}
}
