import { css, cx } from "hono/css";

export function A(props: JSX.IntrinsicElements["a"]): JSX.Element {
	return (
		<a
			{...props}
			class={cx(
				"rounded-sm underline decoration-2 underline-offset-2 outline-none ring-neutral-700",
				"dark:ring-neutral-300",
				"focus-visible:ring-2",
				props.class,
			)}
		/>
	);
}

export function Button(props: JSX.IntrinsicElements["button"]): JSX.Element {
	return (
		<button
			{...props}
			class={cx(
				"cursor-default rounded-md outline-none ring-neutral-700",
				"dark:ring-neutral-300",
				"focus-visible:ring-2",
				props.class,
			)}
		/>
	);
}

export function Input(props: JSX.IntrinsicElements["input"]): JSX.Element {
	return (
		<input
			{...props}
			class={cx(
				"w-full rounded-md bg-neutral-100 px-4 py-2 outline-none ring-neutral-700",
				"dark:bg-neutral-800 dark:ring-neutral-300",
				"placeholder:text-neutral-400 placeholder:dark:text-neutral-600",
				"focus-visible:ring-2",
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
				props.class,
			)}
		/>
	);
}
