import { getContext } from "hono/context-storage";

interface HonoEnv {
	Bindings: Env;
}

export async function getFormattedViewsCount(id: string): Promise<string> {
	const c = getContext<HonoEnv>();
	const viewsCount = Number((await c.env.VIEWS_COUNTER.get(id)) ?? 2);
	return new Intl.NumberFormat().format(viewsCount);
}
