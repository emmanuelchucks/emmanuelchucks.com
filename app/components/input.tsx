import { css, cx } from "hono/css";
import type { JSX } from "hono/jsx";

export function Input({
	class: className,
	...rest
}: JSX.IntrinsicElements["input"]) {
	return (
		<input
			class={cx(
				"px-4 py-2",
				"w-full rounded-md",
				"bg-neutral-100 dark:bg-neutral-800",
				"placeholder:text-neutral-400 placeholder:dark:text-neutral-600",
				"outliine-neutral-700 dark:outline-neutral-300",
				"[&::-webkit-search-cancel-button]:ms-4",

				css`
					[type="search"]::-webkit-search-cancel-button {
						filter: brightness(0) saturate(100%) invert(26%)
							sepia(0%) saturate(1051%) hue-rotate(135deg)
							brightness(85%) contrast(89%);
					}

					@media (prefers-color-scheme: dark) {
						[type="search"]::-webkit-search-cancel-button {
							filter: brightness(0) saturate(100%) invert(94%)
								sepia(15%) saturate(0%) hue-rotate(176deg)
								brightness(89%) contrast(92%);
						}
					}
				`,

				className,
			)}
			{...rest}
		/>
	);
}
