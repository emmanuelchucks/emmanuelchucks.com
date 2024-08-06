import { cx } from "hono/css";
import type { JSX } from "hono/jsx";

export function Button({
	class: className,
	...rest
}: JSX.IntrinsicElements["button"]) {
	return (
		<button
			class={cx(
				"cursor-default rounded-md",
				"outline-neutral-700 dark:outline-neutral-300",
				className,
			)}
			{...rest}
		/>
	);
}
