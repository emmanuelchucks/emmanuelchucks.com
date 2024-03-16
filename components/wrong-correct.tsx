export async function Wrong(props: { heading: string; children: JSX.Element }) {
	const id = String(Math.random()).substring(2, 6)
	return (
		<section aria-labelledby={`wrong-section-heading-${id}`}>
			<h3 id={`wrong-section-heading-${id}`} class="text-base font-medium">
				<span aria-hidden="true">❌</span> Wrong
				<span class="sr-only"> version for {props.heading}</span>
			</h3>
			{props.children}
		</section>
	)
}

export async function Correct(props: {
	heading: string
	children: JSX.Element
}) {
	const id = String(Math.random()).substring(2, 6)
	return (
		<section aria-labelledby={`correct-section-heading-${id}`}>
			<h3 id={`correct-section-heading-${id}`} class="text-base font-medium">
				<span aria-hidden="true">✅</span> Correct
				<span class="sr-only"> version for {props.heading}</span>
			</h3>
			{props.children}
		</section>
	)
}
