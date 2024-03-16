import { cx } from "hono/css"
import { useReducer, type Child } from "hono/jsx"
import { Button } from "../../components/primitives"

/* eslint-disable-next-line @typescript-eslint/promise-function-async */
export default function DarkModeSwitcher(props: { children: Child }) {
	const [isDarkMode, toggleDarkMode] = useReducer(
		(isDarkMode) => !isDarkMode,
		true,
	)

	return (
		<div
			data-theme={isDarkMode ? "dark" : "light"}
			class={cx(
				"max-h-96 min-h-72 overflow-y-auto p-8",
				"data-[theme=light]:bg-white data-[theme=light]:text-neutral-950 data-[theme=light]:[color-scheme:light]",
				"data-[theme=dark]:bg-neutral-900 data-[theme=dark]:text-neutral-50 data-[theme=dark]:[color-scheme:dark]",
				"sm:p-16",
			)}
		>
			<Button
				onClick={toggleDarkMode}
				data-theme={isDarkMode ? "dark" : "light"}
				class={cx(
					"px-4 py-2",
					"data-[theme=light]:bg-neutral-100",
					"data-[theme=dark]:bg-neutral-800",
					"data-[theme=light]:border-neutral-700 data-[theme=light]:ring-neutral-700 data-[theme=light]:ring-offset-white",
					"data-[theme=dark]:border-neutral-300 data-[theme=dark]:ring-neutral-300 data-[theme=dark]:ring-offset-neutral-900",
				)}
			>
				{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			</Button>
			{props.children}
		</div>
	)
}
