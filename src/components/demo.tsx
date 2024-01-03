import { createUniqueId, type JSX } from "solid-js"

export function Demo(props: { heading: string; children: JSX.Element }) {
	const id = createUniqueId()
	return (
		<section
			aria-labelledby={id}
			class="max-h-96 min-h-72 overflow-y-auto rounded-md bg-neutral-100 px-8 py-2 sm:px-24 sm:py-8 dark:bg-neutral-900"
		>
			<h3 id={id} class="sr-only">
				Demo for {props.heading}
			</h3>
			{props.children}
		</section>
	)
}
