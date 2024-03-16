import { cx } from "hono/css"
import { type Child } from "hono/jsx"

/* eslint-disable-next-line @typescript-eslint/promise-function-async */
export function DemoBox(props: { heading: string; children: Child }) {
	const id = String(Math.random()).substring(2, 6)
	return (
		<section
			aria-labelledby={`demo-heading-${id}`}
			class={cx("overflow-clip rounded-md bg-white", "dark:bg-neutral-900")}
		>
			<h3 id={`demo-heading-${id}`} class="sr-only">
				Demo for {props.heading}
			</h3>
			{props.children}
		</section>
	)
}
