import { createUniqueId, splitProps, type JSX } from "solid-js"

export function Demo(props: DemoProps) {
	const id = createUniqueId()
	const [local, rest] = splitProps(props, ["heading", "children"])
	return (
		<section
			aria-labelledby={id}
			class="max-h-96 min-h-72 overflow-y-auto rounded-md bg-white px-8 py-2 sm:px-24 sm:py-8 dark:bg-neutral-900"
			{...rest}
		>
			<h3 id={id} class="sr-only">
				Demo for {local.heading}
			</h3>
			{local.children}
		</section>
	)
}

type DemoProps = JSX.IntrinsicElements["section"] & {
	heading: string
	children: JSX.Element
}
