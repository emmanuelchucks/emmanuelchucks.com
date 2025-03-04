import type { JSX } from "hono/jsx";
import { cx } from "hono/css";

export function A({ class: className, ...rest }: JSX.IntrinsicElements["a"]) {
	return (
		<a
			class={cx(
				"rounded-sm",
				"underline decoration-2 underline-offset-2",
				"outline-offset-4 outline-neutral-700 dark:outline-neutral-300",
				className,
			)}
			{...rest}
		/>
	);
}
