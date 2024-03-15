import { cx } from "hono/css"
import { useReducer, type Child } from "hono/jsx"

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
				"data-[theme=light]:bg-white data-[theme=light]:text-neutral-950",
				"data-[theme=dark]:bg-neutral-900 data-[theme=dark]:text-neutral-50",
				"sm:p-16",
			)}
		>
			<button onClick={toggleDarkMode}>
				{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			</button>
			{props.children}
		</div>
	)
}
