import { useId } from "hono/jsx"

export function Wrong(props: {
	heading: string
	children: JSX.Element
}): JSX.Element {
	const wrongSectionHeading = useId()
	return (
		<section aria-labelledby={wrongSectionHeading}>
			<h3 id={wrongSectionHeading} class="text-base font-medium">
				<span aria-hidden="true">❌</span> Wrong
				<span class="sr-only"> version for '{props.heading}'</span>
			</h3>
			{props.children}
		</section>
	)
}

export function Correct(props: {
	heading: string
	children: JSX.Element
}): JSX.Element {
	const correctSectionHeading = useId()
	return (
		<section aria-labelledby={correctSectionHeading}>
			<h3 id={correctSectionHeading} class="text-base font-medium">
				<span aria-hidden="true">✅</span> Correct
				<span class="sr-only"> version for '{props.heading}'</span>
			</h3>
			{props.children}
		</section>
	)
}
