import { cx } from "hono/css";
import { type PropsWithChildren, useReducer } from "hono/jsx";
import { Button } from "~/components/button";

export default function DarkModeSwitcher({ children }: PropsWithChildren) {
	const [isDarkMode, toggleDarkMode] = useReducer(
		(isDarkMode) => !isDarkMode,
		true,
	);

	return (
		<div
			data-theme={isDarkMode ? "dark" : "light"}
			class={cx(
				"p-8 sm:p-16",
				"overflow-y-auto",
				"max-h-96 min-h-72",
				"data-[theme=light]:text-neutral-950 data-[theme=dark]:text-neutral-50",
				"data-[theme=light]:bg-white data-[theme=dark]:bg-neutral-900",
				"data-[theme=light]:[color-scheme:light] data-[theme=dark]:[color-scheme:dark]",
			)}
		>
			<Button
				type="button"
				onClick={toggleDarkMode}
				data-theme={isDarkMode ? "dark" : "light"}
				class={cx(
					"px-4 py-2",
					"data-[theme=light]:bg-neutral-100 data-[theme=dark]:bg-neutral-800",
					"data-[theme=light]:border-neutral-700 data-[theme=dark]:border-neutral-300",
				)}
			>
				{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			</Button>

			{children}
		</div>
	);
}
