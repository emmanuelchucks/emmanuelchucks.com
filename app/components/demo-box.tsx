import { cx } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";

export function DemoBox({
	heading,
	children,
}: PropsWithChildren<{
	heading: string;
}>) {
	return (
		<div class={cx("overflow-clip rounded-md", "bg-white dark:bg-neutral-900")}>
			<p class="sr-only">Demo for '{heading}'</p>
			{children}
		</div>
	);
}
