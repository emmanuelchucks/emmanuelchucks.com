import { cx } from "hono/css"
import { type Child } from "hono/jsx"

/* eslint-disable-next-line @typescript-eslint/promise-function-async */
export function DemoBox(props: { heading: string; children: Child }) {
	return (
		<section
			class={cx("overflow-clip rounded-md bg-white", "dark:bg-neutral-900")}
		>
			<h3 class="sr-only">Demo for {props.heading}</h3>
			{props.children}
		</section>
	)
}
