import type { Env } from "hono";
import { useRequestContext } from "hono/jsx-renderer";

export async function getViewsCount(id: string): Promise<string> {
	const c = useRequestContext<Env>();
	const viewsCount = Number((await c.env.VIEWS_COUNTER.get(id)) ?? 2);
	void c.env.VIEWS_COUNTER.put(id, String(viewsCount + 1));
	return new Intl.NumberFormat().format(viewsCount);
}
