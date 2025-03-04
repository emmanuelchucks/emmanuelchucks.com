import "hono";

interface Head {
	title: string;
	description: string;
}

declare module "hono" {
	interface Env {
		Variables: object;
		Bindings: {
			VIEWS_COUNTER: KVNamespace;
		};
	}
	interface ContextRenderer {
		(
			content: string | Promise<string>,
			head?: Head,
		): Response | Promise<Response>;
	}
}
