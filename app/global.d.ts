import "hono";

type Head = {
	title: string;
	description: string;
};

declare module "hono" {
	interface Env {
		Bindings: {
			VIEWS_COUNTER: KVNamespace;
		};
	}
	interface ContextRenderer {
		// biome-ignore lint/style/useShorthandFunctionType: No alternative
		(
			content: string | Promise<string>,
			head?: Head,
		): Response | Promise<Response>;
	}
}
