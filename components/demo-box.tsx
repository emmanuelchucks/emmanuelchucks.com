import { cx } from "hono/css"

export async function DemoBox(props: {
	heading: string
	children: JSX.Element
}) {
	return (
		<section
			class={cx(
				"max-h-96 min-h-72 overflow-y-auto rounded-md bg-white px-8 py-2 outline-none ring-neutral-700",
				"dark:bg-neutral-900 dark:ring-neutral-300",
				"focus-visible:ring-2",
				"sm:px-24 sm:py-8",
			)}
			tabindex={0}
		>
			<h3 class="sr-only">Demo for {props.heading}</h3>
			{props.children}
		</section>
	)
}
