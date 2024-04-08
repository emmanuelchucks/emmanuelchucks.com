import { cx } from "hono/css"
import { useId, type Child } from "hono/jsx"

export function DemoBox(props: {
	heading: string
	children: Child
}): JSX.Element {
	const demoHeading = useId()
	return (
		<section
			aria-labelledby={demoHeading}
			class={cx(
				"overflow-clip rounded-md bg-white",
				"dark:bg-neutral-900",
			)}
		>
			<h3 id={demoHeading} class="sr-only">
				Demo for '{props.heading}'
			</h3>
			{props.children}
		</section>
	)
}
