import type { Env } from "hono";
import { getContext } from "hono/context-storage";

export async function getViewsCount(id: string): Promise<string> {
	const c = getContext<Env>();
	const viewsCount = Number((await c.env.VIEWS_COUNTER.get(id)) ?? 2);
	c.executionCtx.waitUntil(c.env.VIEWS_COUNTER.put(id, String(viewsCount + 1)));
	return new Intl.NumberFormat().format(viewsCount);
}
